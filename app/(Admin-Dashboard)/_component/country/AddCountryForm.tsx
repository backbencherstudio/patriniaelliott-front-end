"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToken } from '@/hooks/useToken'
import { UserService } from '@/service/user/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'


type CountryPayload = {
  name: string
  country_code: string
  dial_code: string
}

type AddCountryFormProps = {
  initialData?: Partial<CountryPayload> & { id?: string | number }
  open: boolean
  onOpenChange: (open: boolean) => void
}

function AddCountryForm({ initialData, open, onOpenChange }: AddCountryFormProps) {
  const isEditMode = Boolean(initialData?.id)
  const { token } = useToken()
  const queryClient = useQueryClient()
const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CountryPayload>({
    defaultValues: {
      name: initialData?.name || '',
      country_code: initialData?.country_code || '',
      dial_code: initialData?.dial_code || '',
    }
  })

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      country_code: initialData?.country_code || '',
      dial_code: initialData?.dial_code || '',
    })
  }, [initialData, reset])

  const createMutation = useMutation({
    mutationFn: async (payload: CountryPayload) => {
      return await UserService.createData('/admin/country', payload, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countryData'] })
      onOpenChange(false)
      setLoading(false)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async (payload: CountryPayload) => {
      return await UserService.updateData(`/admin/country/${initialData?.id}`, payload, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['countryData'] })
      onOpenChange(false)
      setLoading(false)
    },
  })

  const onSubmit = (data: CountryPayload) => {
    setLoading(true)
    if (isEditMode) {
      return updateMutation.mutate(data)
    }
    return createMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Update Country' : 'Add Country'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Yemen" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country_code">Country Code</Label>
            <Input id="country_code" placeholder="YE" {...register('country_code', { required: 'Country code is required' })} />
            {errors.country_code && <p className="text-sm text-red-600">{errors.country_code.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dial_code">Dial Code</Label>
            <Input type='number' id="dial_code" placeholder="+967" {...register('dial_code', { required: 'Dial code is required' })} />
            {errors.dial_code && <p className="text-sm text-red-600">{errors.dial_code.message}</p>}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting || createMutation.isPending || updateMutation.isPending || loading} className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white'>
              {isEditMode ? loading ?<div className='flex items-center gap-2'><Loader2 size={18} className="text-whiteColor animate-spin" /> Updating...</div>  : 'Update'  : loading ? <div className='flex items-center gap-2'><Loader2 size={18} className="text-whiteColor animate-spin" /> Creating...</div> : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCountryForm;
