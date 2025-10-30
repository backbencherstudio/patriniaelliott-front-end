'use client'
import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import PendingRequestAction from './PendingRequestAction'
import PendingRequestStatus from './PendingRequestStatus'
import PendingRequestEditModal from './PendingRequestEditModal'
import { useVendorApi } from '@/hooks/useVendorApi'
import { VendorService } from '@/service/vendor/vendor.service'
import ConfirmDeleteModal from '../common/ConfirmDeleteModal'
import { useUserType } from '@/hooks/useUserType'

interface PropertyRequest {
  id: string;
  propertyName: string;
  propertyType: string;
  location: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  price: string;
  guestCapacity: number;
  bedrooms: number;
  bathrooms: number;
}

// server data only
const propertyRequests: PropertyRequest[] = [];

export default function PendingRequest() {
  const [activeTab, setActiveTab] = useState<'All Properties' | 'Pending' | 'Approved'>('All Properties')
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | '7' | '15' | '30'>('all')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [packages, setPackages] = useState<PropertyRequest[]>(propertyRequests)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [editOpen, setEditOpen] = useState(false)
  const [editingRaw, setEditingRaw] = useState<any>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [docFront, setDocFront] = useState<File | null>(null)
  const [docBack, setDocBack] = useState<File | null>(null)
  const [docPassport, setDocPassport] = useState<File | null>(null)
  const [mobile, setMobile] = useState<string>('')
  const [submittingDocs, setSubmittingDocs] = useState(false)

  const { loading, error, handleApiCall, clearError } = useVendorApi()
  const { userType, loading: roleLoading, isUser, isVendor } = useUserType()
  const apiListRef = (global as any).prApiListRef || { current: [] as any[] }
  ;(global as any).prApiListRef = apiListRef

  const reload = async (page: number = 1) => {
      try {
        const res: any = await handleApiCall(VendorService.getVendorPackages, { page, limit: 5 })
        const list = (res?.data?.data || res?.data || res) as any[]
        apiListRef.current = list || []
        const mapped: PropertyRequest[] = (list || []).map((item: any) => ({
          id: item.id,
          propertyName: item.name,
          propertyType: item.type,
          location: `${item.city || ''}${item.city && item.country ? ', ' : ''}${item.country || ''}` || item.address || '',
          submittedDate: (item.created_at || '').slice(8,10)+'-'+(item.created_at || '').slice(5,7)+'-'+(item.created_at || '').slice(2,4),
          status: item.status === 1 ? 'Pending' : 'Approved',
          price: item.price ? `$${item.price}` : '-',
          guestCapacity: item.max_guests || item.max_capacity || 0,
          bedrooms: item.total_bedrooms || 0,
          bathrooms: item.bathrooms || 0,
        }))
        setPackages(mapped)
        // derive total count from multiple possible shapes
        const meta = res?.data?.meta || res?.meta
        const headersTotal = res?.headers?.['x-total-count'] || res?.headers?.['X-Total-Count']
        const rootTotal = res?.data?.total ?? res?.total ?? res?.data?.count ?? res?.count
        const itemCount = meta?.total ?? meta?.itemCount ?? rootTotal ?? headersTotal
        const total = Number(itemCount ?? mapped.length)
        setTotalCount(isNaN(total) ? mapped.length : total)
        const pages = Math.max(1, Math.ceil((isNaN(total) ? mapped.length : total) / 5))
        setTotalPages(pages)
      } catch (e) {
        setPackages([])
        setTotalPages(1)
        setTotalCount(0)
      }
  }

  useEffect(() => { reload() }, [handleApiCall])

  // reset to first page when filters change to keep pagination in sync
  useEffect(() => {
    setCurrentPage(1)
    reload(1)
  }, [activeTab, selectedDateRange])

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 days' },
    { value: '15', label: 'Last 15 days' },
    { value: '30', label: 'Last 30 days' }
  ]

  const filteredProperties = packages.filter((property) => {
    const statusMatch = activeTab === 'All Properties' ||
      (activeTab === 'Pending' && property.status === 'Pending') ||
      (activeTab === 'Approved' && property.status === 'Approved');

    let dateMatch = true;
    if (selectedDateRange !== 'all') {
      const [day, month, year] = property.submittedDate.split('-').map(num => parseInt(num));
      const propertyDate = new Date(2000 + year, month - 1, day);
      const today = new Date();
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - parseInt(selectedDateRange));
      dateMatch = propertyDate >= cutoffDate;
    }

    return statusMatch && dateMatch;
  });


  const columns = [
    { label: 'Property Name', accessor: 'propertyName', width: '200px' },
    { label: 'Type', accessor: 'propertyType', width: '120px' },
    { label: 'Location', accessor: 'location', width: '150px' },
    { label: 'Price', accessor: 'price', width: '120px' },
    { label: 'Capacity', accessor: 'guestCapacity', width: '100px' },
    { label: 'Bedrooms', accessor: 'bedrooms', width: '100px' },
    { label: 'Bathrooms', accessor: 'bathrooms', width: '100px' },
    { label: 'Submitted Date', accessor: 'submittedDate', width: '140px' },
    {
      label: 'Status',
      accessor: 'status',
      width: '120px',
      formatter: (value: string) => <PendingRequestStatus status={value} />
    },
    {
      label: 'Action',
      accessor: 'action',
      width: '150px',
      formatter: (_: any, row: any) => (
        <PendingRequestAction
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row.id)}
          property={row}
        />
      )
    }
  ];

  const handleEdit = (property: PropertyRequest) => {
    const raw = (apiListRef.current || []).find((x: any)=> x.id === property.id) || null
    setEditingRaw(raw)
    setEditOpen(true)
  };

  const handleDelete = (propertyId: string) => {
    setDeletingId(propertyId)
    setDeleteOpen(true)
  };

  const handleSubmitDocuments = async () => {
    try {
      setSubmittingDocs(true)
      const form = new FormData()
      if (docFront) form.append('front_image', docFront)
      if (docBack) form.append('back_image', docBack)
      if (docPassport) form.append('passport_image', docPassport)
      form.append('mobile', mobile)
      // Assumed endpoint based on API list: upload document
      // Note: This should be updated to use the proper service method
      console.log('Document upload functionality needs to be implemented with proper service')
      setDocFront(null); setDocBack(null); setDocPassport(null); setMobile('')
    } catch (e) {
      // ignore
    } finally {
      setSubmittingDocs(false)
    }
  }

  // If user type is strictly 'user', show the submission layout. Vendors see the table.
  if (!roleLoading && isUser) {
    const firstRaw: any = (apiListRef.current || [])[0]
    return (
      <div className="w-full mx-auto max-w-[1036px] md:min-w-[1036px] flex flex-col gap-5 px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 bg-white rounded-xl p-4 flex flex-col gap-3">
            <div className="text-lg font-medium text-[#22262e]">Upload ID Documents</div>
            <label className="text-sm">Front side</label>
            <input type="file" accept="image/*" onChange={e=>setDocFront(e.target.files?.[0]||null)} className="p-2 border rounded" />
            <label className="text-sm">Back side</label>
            <input type="file" accept="image/*" onChange={e=>setDocBack(e.target.files?.[0]||null)} className="p-2 border rounded" />
            <label className="text-sm">NID/Driving/Passport</label>
            <input type="file" accept="image/*" onChange={e=>setDocPassport(e.target.files?.[0]||null)} className="p-2 border rounded" />
            <label className="text-sm">Mobile number</label>
            <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="01XXXXXXXXX" className="p-2 border rounded" />
            <button aria-label="Submit Documents" disabled={submittingDocs} onClick={handleSubmitDocuments} className="mt-2 px-4 py-2 rounded bg-[#0068ef] text-white disabled:opacity-60">{submittingDocs? 'Submitting...' : 'Submit'}</button>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl p-4">
            <div className="text-lg font-medium text-[#22262e] mb-3">Already submitted package</div>
            {!firstRaw ? (
              <div className="text-sm text-[#777980]">No package found.</div>
            ) : (
              <div className="flex flex-col gap-2 text-sm">
                <div className="text-base font-medium">{firstRaw.name}</div>
                <div className="text-[#777980]">{firstRaw.city}{firstRaw.city && firstRaw.country ? ', ' : ''}{firstRaw.country}</div>
                <div className="text-[#070707]">Type: {firstRaw.type || '-'}</div>
                <div className="text-[#070707]">Price: {firstRaw.price || '-'}</div>
                {firstRaw.description && (
                  <div className="text-[#4a4c56] whitespace-pre-wrap">{firstRaw.description}</div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  <div className="text-[#070707]"><span className="text-[#777980]">Capacity:</span> {firstRaw.min_capacity || 0}-{firstRaw.max_capacity || firstRaw.max_guests || 0}</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Bathrooms:</span> {firstRaw.bathrooms ?? '-'}</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Bedrooms:</span> {Array.isArray(firstRaw.bedrooms) ? firstRaw.bedrooms.length : (firstRaw.total_bedrooms ?? '-')}</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Booking:</span> {firstRaw.booking_method || '-'}</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Breakfast:</span> {firstRaw.breakfast_available ? 'Yes' : 'No'}</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Commission:</span> {firstRaw.commission_rate ? `${firstRaw.commission_rate}%` : '-'}</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Rating:</span> {firstRaw.rating_summary?.averageRating ?? 0} ({firstRaw.rating_summary?.totalReviews ?? 0})</div>
                  <div className="text-[#070707]"><span className="text-[#777980]">Created:</span> {new Date(firstRaw.created_at).toLocaleDateString()}</div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {(
                    (Array.isArray(firstRaw.roomFiles) && firstRaw.roomFiles.length > 0
                      ? firstRaw.roomFiles
                      : (firstRaw.package_files||[]).map((f:any)=> f?.file_url || f)
                    )
                  ).slice(0,8).map((raw:string, idx:number)=> {
                    const src = (()=>{
                      try { return decodeURI(raw as any) } catch { return raw as any }
                    })();
                    return (
                      <img
                        key={`${src}-${idx}`}
                        src={src}
                        loading="eager"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                        className="w-full h-20 object-cover rounded border"
                        onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display='none' }}
                        alt="package"
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto max-w-[1036px] md:min-w-[1036px] flex flex-col gap-5 px-2 sm:px-4">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="">
            <h2 className="text-2xl font-medium text-[#22262e] mb-1">Pending Request</h2>
            <p className="text-base text-[#777980]">
              Manage your property listing requests and track their approval status.
            </p>
          </div>
        </div>
      </div>


      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="text-sm text-[#777980]">Total items: <span className="text-[#070707] font-medium">{totalCount}</span></div>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {['All Properties', 'Pending', 'Approved'].map((tab) => (
              <button
                aria-label={`Filter ${tab}`}
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-2 md:px-4 py-2 border-b-2 cursor-pointer text-sm md:text-base ${activeTab === tab
                  ? 'border-[#d6ae29] text-[#070707]'
                  : 'border-[#f3f3f4] text-[#777980]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <div
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-3 py-1.5 rounded border border-[#0068ef] flex items-center gap-3 cursor-pointer hover:bg-[#f5f5f5] justify-center md:justify-start"
            >
              <Image
                src="/vendor/date.svg"
                alt="Calendar"
                width={14}
                height={14}
              />
              <span className="text-[#0068ef] text-sm">
                {dateRanges.find(range => range.value === selectedDateRange)?.label}
              </span>
              <Image
                src="/vendor/down.svg"
                alt="Dropdown"
                width={14}
                height={14}
              />
            </div>

            {isDateDropdownOpen && (
              <div className="absolute top-full left-0 md:right-0 mt-1 bg-white rounded-lg shadow-lg border py-1 z-10 w-auto md:w-auto">
                {dateRanges.map((range) => (
                  <div
                    key={range.value}
                    onClick={() => {
                      setSelectedDateRange(range.value as 'all' | '7' | '15' | '30');
                      setIsDateDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-sm text-[#4a4c56]"
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <DynamicTableWithPagination
            loading={loading}
            totalPages={totalPages}
            columns={columns}
            data={filteredProperties}
            currentPage={currentPage}
            itemsPerPage={5}
            totalItems={totalCount}
            onPageChange={(page) => { setCurrentPage(page); reload(page); }}
            noDataMessage="No data found."
          />
        </div>
      </div>

      <PendingRequestEditModal
        open={editOpen}
        onClose={setEditOpen}
        data={editingRaw}
        onSave={async (id, payload) => {
          await handleApiCall(VendorService.updateVendorPackage, id, payload)
          setEditOpen(false)
          // refresh list
          await reload()
        }}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={setDeleteOpen}
        title="Delete package"
        message="Are you sure you want to delete this package? This action cannot be undone."
        onConfirm={async ()=>{
          if (!deletingId) return
          await handleApiCall(VendorService.deleteVendorPackage, deletingId)
          setDeleteOpen(false)
          setDeletingId(null)
          await reload(currentPage)
        }}
      />
    </div>
  )
}