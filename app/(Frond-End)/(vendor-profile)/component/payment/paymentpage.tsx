'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  payoutMethod: string;
  paypalEmail: string;
  accountHolderName: string;
  taxInformation: string;
  billingAddress: string;
}

export default function PaymentPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('PayPal')
  const [showSaveButton, setShowSaveButton] = useState(false)

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<FormData>({
    defaultValues: {
      payoutMethod: 'PayPal',
      paypalEmail: '',
      accountHolderName: '',
      taxInformation: '',
      billingAddress: ''
    }
  })

  const paymentMethods = [
    'PayPal',
    'Bank Transfer',
    'Stripe',
    'Wise'
  ]

  const onSubmit = (data: FormData) => {
    console.log(data)
    setShowSaveButton(false)
  }

  const handleFieldFocus = () => {
    setShowSaveButton(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" px-7 py-6 bg-white rounded-2xl  outline-offset-[-1px] outline-[#e9e9ea] flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-[#070707] text-2xl font-medium">Payment details</h2>
        <p className="text-[#777980] text-sm">Enter your payment and payout details for ensuring smooth payout processing and tax compliance.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[#070707] text-base">Preferred Payout Method</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen)
                    handleFieldFocus()
                  }}
                  className="w-full px-4 py-[15px] rounded-lg border outline-offset-[-1px] outline-[#0068ef] flex items-center justify-between"
                >
                  <span className="text-[#777980] text-sm">{selectedMethod}</span>
                  <Image
                    src="/vendor/downarrow.svg"
                    alt="Down Arrow"
                    width={16}
                    height={16}
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg  outline-[#e9e9ea] z-10">
                    {paymentMethods.map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => {
                          setSelectedMethod(method)
                          setIsDropdownOpen(false)
                          handleFieldFocus()
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#070707] text-base">PayPal Email</label>
            <input
              {...register('paypalEmail', { required: 'PayPal email is required' })}
              type="email"
              placeholder="Enter your PayPal email"
              className="p-4 rounded-lg border outline-offset-[-1px] outline-[#e9e9ea] text-[#777980] text-sm"
              onFocus={handleFieldFocus}
              onClick={handleFieldFocus}
            />
            {errors.paypalEmail && <span className="text-red-500 text-sm">{errors.paypalEmail.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#070707] text-base">Account Holder Name</label>
            <input
              {...register('accountHolderName', { required: 'Account holder name is required' })}
              type="text"
              placeholder="Enter account holder name"
              className="p-4 rounded-lg border outline-offset-[-1px] outline-[#e9e9ea] text-[#777980] text-sm"
              onFocus={handleFieldFocus}
              onClick={handleFieldFocus}
            />
            {errors.accountHolderName && <span className="text-red-500 text-sm">{errors.accountHolderName.message}</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#070707] text-base">Tax Information</label>
        <input
          {...register('taxInformation', { required: 'Tax information is required' })}
          type="text"
          placeholder="Enter your VAT ID or tax information"
          className="p-4 rounded-lg border outline-offset-[-1px] outline-[#e9e9ea] text-[#777980] text-sm"
          onFocus={handleFieldFocus}
          onClick={handleFieldFocus}
        />
        {errors.taxInformation && <span className="text-red-500 text-sm">{errors.taxInformation.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#070707] text-base">Billing Address</label>
        <input
          {...register('billingAddress', { required: 'Billing address is required' })}
          type="text"
          placeholder="Enter your billing address"
          className="p-4 rounded-lg border outline-offset-[-1px] outline-[#e9e9ea] text-[#777980] text-sm"
          onFocus={handleFieldFocus}
          onClick={handleFieldFocus}
        />
        {errors.billingAddress && <span className="text-red-500 text-sm">{errors.billingAddress.message}</span>}
      </div>

      {showSaveButton && (
        <button
          type="submit"
          className="mt-4 bg-[#0068ef] text-white py-3 px-6 rounded-lg hover:bg-[#0051bc] transition-colors"
        >
          Save Changes
        </button>
      )}
    </form>
  )
}
