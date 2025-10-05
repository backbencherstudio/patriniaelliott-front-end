'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import { UserService } from '@/service/user/user.service'
import { VendorService } from '@/service/vendor/vendor.service'

interface VerificationFormData {
  mobile: string
}

interface PackageData {
  id: string
  name: string
  description: string
  price: string
  type: string
  address: string
  city: string
  country: string
  max_guests: number
  bathrooms: number
  bedrooms: any // Can be number, array, or object
  package_files: Array<{ file_url: string }>
  created_at: string
  status: number
}

export default function UserVerification() {
  const [docFront, setDocFront] = useState<File | null>(null)
  const [docBack, setDocBack] = useState<File | null>(null)
  const [docPassport, setDocPassport] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
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
      
      // Reset form
      setDocFront(null)
      setDocBack(null)
      setDocPassport(null)
      
    } catch (error) {
      console.error('Error submitting verification:', error)
      toast.error('Failed to submit documents. Please try again.')
    } finally {
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
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-[#0068ef] text-white rounded-lg text-base font-medium hover:bg-[#0051bd] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Documents'}
              </button>
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
                        pkg.status === 1 
                          ? 'bg-[#ffa23a]/10 text-[#ffa23a]' 
                          : 'bg-[#38c976]/10 text-[#38c976]'
                      }`}>
                        {pkg.status === 1 ? 'Pending' : 'Approved'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-[#777980] mb-2">
                      {safeRender(pkg.city)}{pkg.city && pkg.country ? ', ' : ''}{safeRender(pkg.country)}
                    </div>
                    
                    <div className="text-sm text-[#070707] mb-2">
                      Type: {safeRender(pkg.type)} | Price: ${safeRender(pkg.price)}
                    </div>
                    
                    {pkg.description && (
                      <div className="text-sm text-[#4a4c56] mb-3 line-clamp-2">
                        {pkg.description}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#777980] mb-3">
                      <div>Max Guests: {safeRender(pkg.max_guests)}</div>
                      <div>Bathrooms: {safeRender(pkg.bathrooms)}</div>
                      <div>Bedrooms: {safeRender(pkg.bedrooms)}</div>
                      <div>Created: {new Date(pkg.created_at).toLocaleDateString()}</div>
                    </div>
                    
                    {pkg.package_files && pkg.package_files.length > 0 && (
                      <div className="grid grid-cols-4 gap-2">
                        {pkg.package_files.slice(0, 4).map((file, idx) => (
                          <div key={idx} className="w-full h-16 bg-gray-100 rounded">
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