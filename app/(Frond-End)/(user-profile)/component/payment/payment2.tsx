'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Please enter a valid 16-digit card number"),
  expiryDate: z.string()
    .refine((val) => val && /^\d{4}-\d{2}$/.test(val), "Please select a valid expiry date")
    .transform((val) => {
      const [year, month] = val.split('-')
      return new Date(Number(year), Number(month) - 1) // Ensure it's a Date object
    })
    .refine((date: Date) => {
      const today = new Date()
      today.setDate(1)
      today.setHours(0, 0, 0, 0)
      const maxDate = new Date(today)
      maxDate.setFullYear(today.getFullYear() + 5)
      return date > today && date <= maxDate
    }, "Please enter a valid future date within 5 years"),
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

type PaymentFormInput = z.input<typeof paymentSchema>
type PaymentFormValues = z.output<typeof paymentSchema>

const countryOptions = [
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  // Add more as needed
]

export default function Payment2() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<PaymentFormInput, any, PaymentFormValues>({
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
const router = useRouter()
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = match.match(/.{1,4}/g)
    return parts?.join(' ') || value
  }

  const onSubmit = (data: PaymentFormValues) => {
    // expiryDate is now a Date object!
    console.log('Form submitted:', data)
   router.push("/payment/card-list")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-xl flex flex-col gap-8">
      <h2 className="text-[#22262e] text-2xl font-medium">
        Add card details
      </h2>
      
      {/* Card Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card Number Field */}
        <div className="col-span-1 md:col-span-2">
          <label className="text-[#070707] text-base font-normal mb-2 block">
            Card number
          </label>
          <input
            {...register("cardNumber")}
            onChange={(e) => setValue("cardNumber", formatCardNumber(e.target.value))}
            className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
            placeholder="0000 0000 0000 0000"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
          )}
        </div>

        {/* Expiry Date and CVV */}
        <div>
          <label className="text-[#070707] text-base font-normal mb-2 block">
            Expiry Date
          </label>
          <input
            {...register("expiryDate")}
            type="month"
            className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
            placeholder="MM/YY"
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
          )}
        </div>

        <div>
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

      {/* Billing Address Section */}
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="text-[#22262e] text-2xl font-medium">
          Billing address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label className="text-[#070707] text-base font-normal mb-2 block">
              Country
            </label>
            <Select
              value={watch("country")}
              onValueChange={val => setValue("country", val)}
            >
              <SelectTrigger className="!h-14 !text-base px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className='!text-base'>
                {countryOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
            )}
          </div>

          {/* Street Address */}
          <div>
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

          {/* Apt and City */}
          <div>
            <label className="text-[#070707] text-base font-normal mb-2 block">
              Apt, suite. (optional)
            </label>
            <input
              {...register("aptSuite")}
              className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] w-full"
              placeholder="e.g. Apt #123"
            />
          </div>

          {/* City */}
          <div>
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

          {/* State */}
          <div>
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

          {/* Zip code */}
          <div>
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
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <Link href="/payment"
          type="button"
          
          className="px-8 py-3 rounded-lg outline-1 outline-[#0068ef] text-[#0068ef] text-base font-medium cursor-pointer hover:bg-[#0068ef]/5 transition-all duration-200 "
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-8 py-3 bg-[#0068ef] rounded-lg text-white text-base font-medium cursor-pointer hover:bg-[#0068ef]/90 transition-all duration-200 "
        >
          Done
        </button>
      </div>
    </form>
  )
}
