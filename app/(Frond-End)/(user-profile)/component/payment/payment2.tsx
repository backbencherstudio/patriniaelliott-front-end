'use client'
import React from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface Payment2Props {
  onSave: () => void
  onCancel: () => void
}

// Form validation schema
const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Please enter a valid 16-digit card number"),
  expiryDate: z.string()
    .refine((value) => {
      // Check format
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
        return false;
      }
      
      // Extract month and year
      const [month, year] = value.split('/');
      const expMonth = parseInt(month);
      const expYear = parseInt(year) + 2000; // Convert to full year (e.g., 23 -> 2023)
      
      // Create date objects for comparison
      const today = new Date();
      const expiryDate = new Date(expYear, expMonth - 1); // Month is 0-based in Date constructor
      
      // Set both dates to the first of their respective months to compare
      today.setDate(1);
      today.setHours(0, 0, 0, 0);
      expiryDate.setDate(1);
      expiryDate.setHours(0, 0, 0, 0);
      
      // Card should not be expired and not more than 10 years in future
      return expiryDate > today && expYear <= today.getFullYear() + 10;
    }, "Please enter a valid future date within 10 years"),
  cvv: z.string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  aptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string()
    .regex(/^\d{4,6}$/, "Please enter a valid zip code (4-6 digits)")
})

type PaymentFormValues = z.infer<typeof paymentSchema>

export default function Payment2({ onSave, onCancel }: Payment2Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      country: '',
      streetAddress: '',
      aptSuite: '',
      city: '',
      state: '',
      zipCode: ''
    }
  })

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = match.match(/.{1,4}/g)
    return parts?.join(' ') || value
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    
    // Handle backspace and deletion
    if (v.length === 0) return '';
    
    // Add slash after month if not already there
    if (v.length >= 2) {
      const month = v.substring(0, 2);
      const year = v.substring(2, 4);
      
      // Validate month
      if (parseInt(month) > 12) {
        return '12/' + year;
      }
      if (parseInt(month) === 0) {
        return '01/' + year;
      }
      
      return month + '/' + year;
    }
    
    // Handle single digit
    if (v.length === 1 && parseInt(v) > 1) {
      return '0' + v;
    }
    
    return v;
  }

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Form submitted:', data)
    onSave()
  }

  return (
    <>
      {/* Card Details Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-xl flex flex-col gap-8">
        <h2 className="text-[#22262e] text-2xl font-medium">
          Add card details
        </h2>
        
        <div className="flex flex-col gap-3">
          {/* Card Number Field */}
          <div className="w-full">
            <label className="text-[#070707] text-base font-normal mb-2 block">
              Card number
            </label>
            <input
              {...register("cardNumber")}
              onChange={(e) => {
                setValue("cardNumber", formatCardNumber(e.target.value))
              }}
              className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
              placeholder="0000 0000 0000 0000"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          {/* Expiry Date and CVV */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                Expiry Date
              </label>
              <input
                {...register("expiryDate")}
                onChange={(e) => {
                  setValue("expiryDate", formatExpiryDate(e.target.value))
                }}
                maxLength={5}
                className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                CVV
              </label>
              <input
                {...register("cvv")}
                type="password"
                maxLength={4}
                className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                placeholder="•••"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Billing Address Section */}
        <div className="w-full flex flex-col gap-8 mt-10">
          <h2 className="text-[#22262e] text-2xl font-medium">
            Billing address
          </h2>

          <div className="flex flex-col gap-3">
            {/* Country and Street Address */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[#070707] text-base font-normal mb-2 block">
                  Country
                </label>
                <select
                  {...register("country")}
                  className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                >
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  {/* Add more countries as needed */}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-[#070707] text-base font-normal mb-2 block">
                  Street address
                </label>
                <input
                  {...register("streetAddress")}
                  className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                  placeholder="e.g. 123 Main St."
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.streetAddress.message}</p>
                )}
              </div>
            </div>

            {/* Apt and City */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[#070707] text-base font-normal mb-2 block">
                  Apt, suite. (optional)
                </label>
                <input
                  {...register("aptSuite")}
                  className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                  placeholder="e.g. Apt #123"
                />
              </div>

              <div className="flex-1">
                <label className="text-[#070707] text-base font-normal mb-2 block">
                  City
                </label>
                <input
                  {...register("city")}
                  className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                  placeholder="Enter city"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* State and Zip Code */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[#070707] text-base font-normal mb-2 block">
                  State / Province / County / Region
                </label>
                <input
                  {...register("state")}
                  className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                  placeholder="Enter state"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                )}
              </div>

              <div className="flex-1">
                <label className="text-[#070707] text-base font-normal mb-2 block">
                  Zip code
                </label>
                <input
                  {...register("zipCode")}
                  className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
                  placeholder="Enter zip code"
                  maxLength={6}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-3 rounded-lg outline-1 outline-[#0068ef] text-[#0068ef] text-base font-medium cursor-pointer hover:bg-[#0068ef]/5 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-[#0068ef] rounded-lg text-white text-base font-medium cursor-pointer hover:bg-[#0068ef]/90 transition-all duration-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
