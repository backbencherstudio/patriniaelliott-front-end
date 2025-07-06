'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  payoutMethod: string;
  paypalEmail: string;
  accountHolderName: string;
  taxInformation: string;
  billingAddress: string;
}

const paymentMethods = [
  'PayPal',
  'Bank Transfer',
  'Stripe',
  'Wise'
]

export default function PaymentPage() {
  const [showSaveButton, setShowSaveButton] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      payoutMethod: 'PayPal',
      paypalEmail: '',
      accountHolderName: '',
      taxInformation: '',
      billingAddress: ''
    }
  })

  const selectedMethod = watch('payoutMethod')

  const onSubmit = (data: FormData) => {
    console.log(data)
    setShowSaveButton(false)
  }

  const handleFieldFocus = () => setShowSaveButton(true)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:px-6 px-4 py-6 bg-white rounded-2xl flex flex-col gap-6">
      <div>
        <h2 className="text-[#070707] text-2xl font-medium">Payment details</h2>
        <p className="text-[#777980] text-sm mt-1">Enter your payment and payout details for ensuring smooth payout processing and tax compliance.</p>
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Preferred Payout Method</label>
        <Select
          value={selectedMethod}
          onValueChange={val => {
            setValue('payoutMethod', val)
            handleFieldFocus()
          }}
        >
          <SelectTrigger className="w-full !h-13 px-4 rounded-lg border text-[#777980] text-sm">
            <SelectValue placeholder="Select payout method" />
          </SelectTrigger>
          <SelectContent className=''>
            {paymentMethods.map(method => (
              <SelectItem key={method} value={method} className=' hover:!bg-secondaryColor/20 !h-10 cursor-pointer !pl-2'>{method}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">PayPal Email</label>
        <input
          {...register('paypalEmail', { required: 'PayPal email is required' })}
          type="email"
          placeholder="Enter your PayPal email"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.paypalEmail && <span className="text-red-500 text-sm">{errors.paypalEmail.message}</span>}
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Account Holder Name</label>
        <input
          {...register('accountHolderName', { required: 'Account holder name is required' })}
          type="text"
          placeholder="Enter account holder name"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.accountHolderName && <span className="text-red-500 text-sm">{errors.accountHolderName.message}</span>}
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Tax Information</label>
        <input
          {...register('taxInformation', { required: 'Tax information is required' })}
          type="text"
          placeholder="Enter your VAT ID or tax information"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.taxInformation && <span className="text-red-500 text-sm">{errors.taxInformation.message}</span>}
      </div>

      <div>
        <label className="text-[#070707] text-base mb-2 block">Billing Address</label>
        <input
          {...register('billingAddress', { required: 'Billing address is required' })}
          type="text"
          placeholder="Enter your billing address"
          className="p-4 rounded-lg border text-[#777980] text-sm w-full"
          onFocus={handleFieldFocus}
        />
        {errors.billingAddress && <span className="text-red-500 text-sm">{errors.billingAddress.message}</span>}
      </div>

      <div className='flex justify-end'>
        <button
          type="submit"
          className="md:mt-4 bg-[#0068ef] text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:bg-[#0051bc] transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}
