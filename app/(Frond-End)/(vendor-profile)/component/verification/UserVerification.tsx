'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import { VendorService } from '@/service/vendor/vendor.service'
import { useVendorApi } from '@/hooks/useVendorApi'

interface VerificationFormData {
  mobile: string
}

interface PackageData {
  id: string
  name: string
  description?: string
  price?: string | number
  computed_price?: number
  discount?: number
  duration?: string | null
  min_capacity?: number
  max_capacity?: number
  type: string
  service_fee?: string | number
  user_id?: string
  user?: { id: string; name: string; type?: string }
  package_files: Array<{ id?: string; file_url: string; file?: string; file_alt?: string }>
  package_trip_plans?: Array<{ id: string; title: string; description?: string }>
  package_policies?: Array<{
    id: string
    description?: string
    package_policies?: Array<{ title: string; description: string }>
  }>
  created_at: string
  approved_at?: string | null
  status: number
}

export default function UserVerification() {
  const [docFront, setDocFront] = useState<File | null>(null)
  const [docBack, setDocBack] = useState<File | null>(null)
  const [docPassport, setDocPassport] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)
  
  const frontRef = useRef<HTMLInputElement>(null)
  const backRef = useRef<HTMLInputElement>(null)
  const passportRef = useRef<HTMLInputElement>(null)
  const isSubmittingRef = useRef<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<VerificationFormData>({
    defaultValues: {
      mobile: ''
    }
  })

  const { handleApiCall } = useVendorApi()

  const handleFileChange = (setter: (file: File | null) => void, files: FileList | null) => {
    if (files && files[0]) {
      setter(files[0])
    }
  }

  // Helper function to safely render values that might be objects
  const safeRender = (value: any): string => {
    if (typeof value === 'string' || typeof value === 'number') {
      return String(value)
    }
    if (Array.isArray(value)) {
      return String(value.length)
    }
    if (typeof value === 'object' && value !== null) {
      return '-'
    }
    return '-'
  }

  // Fetch user's packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        const res: any = await VendorService.getVendorPackages({ page: 1, limit: 10 })
        const packageList = (res?.data?.data || res?.data || res) as PackageData[]
        setPackages(packageList || [])
      } catch (error) {
        console.error('Error fetching packages:', error)
        setPackages([])
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const onSubmit = async (data: VerificationFormData) => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true
    try {
      setSubmitting(true)
      
      // Create FormData for document upload
      const docFormData = new FormData()
      if (docFront) docFormData.append('front_image', docFront)
      if (docBack) docFormData.append('back_image', docBack)
      if (docPassport) docFormData.append('image', docPassport)
      docFormData.append('number', data.mobile)
      docFormData.append('type', 'NID')
      docFormData.append('status', 'pending')

      // Upload documents (same style as packages API call)
      await VendorService.uploadVendorDocuments(docFormData as any)

      toast.success('ID documents submitted successfully!')

      // Reset form values but keep button disabled after success
      setDocFront(null)
      setDocBack(null)
      setDocPassport(null)
      setSubmitted(true)
      // keep submitting=true to disable button
    } catch (error) {
      console.error('Error submitting verification:', error)
      toast.error('Failed to submit documents. Please try again.')
      setSubmitting(false)
      isSubmittingRef.current = false
    }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="w-full mx-auto max-w-[1036px] md:min-w-[1036px] flex flex-col gap-5 px-2 sm:px-4">
        {/* Header */}
        <div className="w-full bg-white rounded-xl p-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-2xl font-medium text-[#22262e] mb-1">User Verification</h2>
              <p className="text-base text-[#777980]">
                Submit your ID documents and package information for verification.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* ID Documents Section */}
          <div className="w-full bg-white rounded-xl p-4">
            <div className="text-xl font-medium text-[#22262e] mb-4">ID Documents</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mobile Number */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#070707]">Mobile Number</label>
                <input
                  {...register('mobile', { required: 'Mobile number is required' })}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className="p-3 rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
                />
                {errors.mobile && <span className="text-red-500 text-xs">{errors.mobile.message}</span>}
              </div>

              {/* ID Front Side */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#070707]">ID Card Front Side</label>
                <div className="flex items-center gap-3">
                  <input
                    ref={frontRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(setDocFront, e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => frontRef.current?.click()}
                    className="px-4 py-2 border border-[#d2d2d5] rounded-lg text-sm hover:bg-[#f5f5f5]"
                  >
                    {docFront ? 'Change File' : 'Choose File'}
                  </button>
                  {docFront && (
                    <span className="text-sm text-[#4a4c56]">{docFront.name}</span>
                  )}
                </div>
              </div>

              {/* ID Back Side */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#070707]">ID Card Back Side</label>
                <div className="flex items-center gap-3">
                  <input
                    ref={backRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(setDocBack, e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => backRef.current?.click()}
                    className="px-4 py-2 border border-[#d2d2d5] rounded-lg text-sm hover:bg-[#f5f5f5]"
                  >
                    {docBack ? 'Change File' : 'Choose File'}
                  </button>
                  {docBack && (
                    <span className="text-sm text-[#4a4c56]">{docBack.name}</span>
                  )}
                </div>
              </div>

              {/* Passport/NID */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#070707]">Passport/NID/Driving License</label>
                <div className="flex items-center gap-3">
                  <input
                    ref={passportRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(setDocPassport, e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => passportRef.current?.click()}
                    className="px-4 py-2 border border-[#d2d2d5] rounded-lg text-sm hover:bg-[#f5f5f5]"
                  >
                    {docPassport ? 'Change File' : 'Choose File'}
                  </button>
                  {docPassport && (
                    <span className="text-sm text-[#4a4c56]">{docPassport.name}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              {submitted ? (
                <button
                  type="button"
                  disabled
                  className="px-8 py-3 bg-[#38c976] text-white rounded-lg text-base font-medium opacity-90 cursor-default flex items-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill="white"/>
                  </svg>
                  Submitted
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 bg-[#0068ef] text-white rounded-lg text-base font-medium hover:bg-[#0051bd] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Documents'}
                </button>
              )}
            </div>
          </div>

          {/* Submitted Packages Section */}
          <div className="w-full bg-white rounded-xl p-4">
            <div className="text-xl font-medium text-[#22262e] mb-4">
              Your Submitted Packages
                  <p className='text-sm text-[#777980]'>You will be able to edit your package data after completing verification...</p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-[#777980]">Loading packages...</div>
              </div>
            ) : packages.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-[#777980]">No packages submitted yet.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="border border-[#e9e9ea] rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-[#22262e]">{pkg.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        pkg.approved_at 
                          ? 'bg-[#38c976]/10 text-[#38c976]' 
                          : 'bg-[#ffa23a]/10 text-[#ffa23a]'
                      }`}>
                        {pkg.approved_at ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    {/* Basic meta */}
                    <div className="text-sm text-[#070707] mb-2">
                      Type: {safeRender(pkg.type)} | Price: $
                      {pkg.computed_price ?? pkg.price ?? '-'}
                      {pkg.discount ? ` (-${pkg.discount}%)` : ''}
                    </div>
                    {pkg.user?.name && (
                      <div className="text-xs text-[#777980] mb-2">Vendor: {pkg.user.name}</div>
                    )}
                    
                    {pkg.description && (
                      <div className="text-sm text-[#4a4c56] mb-3 line-clamp-2">
                        {pkg.description}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#777980] mb-3">
                      <div>Min Capacity: {safeRender(pkg.min_capacity)}</div>
                      <div>Max Capacity: {safeRender(pkg.max_capacity)}</div>
                      <div>Service Fee: {pkg.service_fee ? `$${pkg.service_fee}` : '-'}</div>
                      <div>Created: {new Date(pkg.created_at).toLocaleDateString()}</div>
                    </div>
                    {pkg.approved_at && (
                      <div className="text-xs text-[#777980] mb-3">Approved: {new Date(pkg.approved_at).toLocaleDateString()}</div>
                    )}
                    
                    {pkg.package_files && pkg.package_files.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {pkg.package_files.slice(0, 4).map((file, idx) => (
                          <div key={idx} className="w-full h-16 bg-gray-100 rounded ">
                            <Image
                              src={file.file_url}
                              alt={`Package image ${idx + 1}`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover rounded"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none'
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Policies (flattened key-value) */}
                    {/* {pkg.package_policies && pkg.package_policies.length > 0 && (
                      <div className="mt-3 text-xs text-[#4a4c56] space-y-1">
                        {pkg.package_policies.flatMap((p) => p.package_policies || []).map((p, i) => (
                          <div key={i} className="flex justify-between gap-2">
                            <span className="text-[#777980] capitalize">{p.title.replace(/_/g,' ')}</span>
                            <span>{p.description}</span>
                          </div>
                        ))}
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  )
}