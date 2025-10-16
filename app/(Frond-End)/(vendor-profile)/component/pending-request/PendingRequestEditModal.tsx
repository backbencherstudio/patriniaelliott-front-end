'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useEffect, useMemo, useState } from 'react'

interface PropertyRequestForm {
  id: string
  name: string
  type: string
  city?: string
  country?: string
  address?: string
  price?: string
  max_guests?: number
  total_bedrooms?: number
  bathrooms?: number
  description?: string
  package_files?: { file_url: string }[]
}

export default function PendingRequestEditModal({ open, onClose, data, onSave }: {
  open: boolean
  onClose: (open: boolean) => void
  data: any
  onSave: (id: string, payload: any) => Promise<void>
}) {
  const [form, setForm] = useState<PropertyRequestForm | null>(null)
  const [dirty, setDirty] = useState(false)
  // Images are intentionally not shown in the edit modal to prevent layout shifts

  useEffect(() => {
    if (data) {
      setForm({
        id: data.id,
        name: data.name || '',
        type: data.type || '',
        city: data.city || '',
        country: data.country || '',
        address: data.address || '',
        price: data.price || '',
        max_guests: data.max_guests || data.max_capacity || 0,
        total_bedrooms: data.total_bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        description: data.description || '',
        package_files: data.package_files || []
      })
      setDirty(false)
    }
  }, [data])

  if (!data) return null

  const handleChange = (key: keyof PropertyRequestForm, value: any) => {
    setForm(prev => ({ ...(prev as any), [key]: value }))
    setDirty(true)
  }

  const handleSave = async () => {
    if (!form) return
    await onSave(form.id, {
      name: form.name,
      type: form.type,
      city: form.city,
      country: form.country,
      address: form.address,
      price: form.price,
      // API expects these keys
      max_capacity: form.max_guests,
      bedrooms: form.total_bedrooms,
      bathrooms: form.bathrooms,
      description: form.description,
    })
    setDirty(false)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 bg-transparent flex items-center justify-center">
        <div className="w-[70vw] h-[70vh] bg-white rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="text-xl font-medium">Edit Package</div>
          </div>
          <div className={`flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2`}>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Name</label>
                <input value={form?.name || ''} onChange={e=>handleChange('name', e.target.value)} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Type</label>
                <input value={form?.type || ''} onChange={e=>handleChange('type', e.target.value)} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">City</label>
                <input value={form?.city || ''} onChange={e=>handleChange('city', e.target.value)} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Country</label>
                <input value={form?.country || ''} onChange={e=>handleChange('country', e.target.value)} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm text-[#070707]">Address</label>
                <input value={form?.address || ''} onChange={e=>handleChange('address', e.target.value)} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Price</label>
                <input value={form?.price || ''} onChange={e=>handleChange('price', e.target.value)} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Max Guests</label>
                <input type="number" value={form?.max_guests || 0} onChange={e=>handleChange('max_guests', Number(e.target.value))} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Bedrooms</label>
                <input type="number" value={form?.total_bedrooms || 0} onChange={e=>handleChange('total_bedrooms', Number(e.target.value))} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#070707]">Bathrooms</label>
                <input type="number" value={form?.bathrooms || 0} onChange={e=>handleChange('bathrooms', Number(e.target.value))} className="p-3 rounded border w-full" />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm text-[#070707]">Description</label>
                <textarea value={form?.description || ''} onChange={e=>handleChange('description', e.target.value)} className="p-3 rounded border min-h-[120px] w-full" />
              </div>
            </div>
          </div>
          <div className="p-4 border-t flex justify-end gap-3">
            <button aria-label="Close Modal" onClick={()=>onClose(false)} className="px-4 py-2 rounded border">Close</button>
            {dirty && (
              <button aria-label="Save Changes" onClick={handleSave} className="px-5 py-2 rounded bg-[#0068ef] text-white hover:bg-[#0051bd]">Save</button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

