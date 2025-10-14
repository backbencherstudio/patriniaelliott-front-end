"use client";
import Image from 'next/image'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'

interface Payment3Props {
  onAddCard: () => void
}

export default function Payment3() {
  // show success toast if redirected after addingg a card
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    const added = url.searchParams.get('added')
    if (added === '1') {
      // remove the flag so it doesn't re-toast on refresh
      url.searchParams.delete('added')
      window.history.replaceState(null, '', url.toString())
      toast.success('Card saved successfully')
    }
  }
  return (
    <div className="max-w-[960px] p-4 sm:p-6 bg-white rounded-xl flex flex-col gap-6 my-10">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex flex-col gap-4">
        <h2 className="text-[#22262e] text-2xl font-medium">Add payment cards</h2>
        <p className="text-[#777980] text-base">Save your passport details for use when booking your next stay, flight.</p>
      </div>
        <div className=' grid grid-cols-2 gap-2 md:grid-cols-1'>

      <div className="p-2.5  rounded-lg border border-[#e9e9ea] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
          <span className="text-[#4a4c56] text-lg">Payment card</span>
          
          <div className="w-[36px] h-6 bg-white rounded border border-[#d2d2d5] flex items-center justify-center">
            <Image
              src="/usericon/mastercard.svg"
              alt="Mastercard"
              width={24}
              height={16}
              className="object-cover"
            />
          </div>

          <span className="text-[#4a4c56] text-sm">**** **** **** 3890</span>
          <span className="text-[#4a4c56] text-sm">02-2025</span>
        </div>

        <button aria-label="Delete Card" onClick={() => toast.success('Card deleted')} className="p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto">
          <span className="text-[#fe5050] text-base font-medium">Delete</span>
        </button>
      </div>
      <div className="p-2.5  rounded-lg border border-[#e9e9ea] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
          <span className="text-[#4a4c56] text-lg">Payment card</span>
          
          <div className="w-[36px] h-6 bg-white rounded border border-[#d2d2d5] flex items-center justify-center">
            <Image
              src="/usericon/mastercard.svg"
              alt="Mastercard"
              width={24}
              height={16}
              className="object-cover"
            />
          </div>

          <span className="text-[#4a4c56] text-sm">**** **** **** 3890</span>
          <span className="text-[#4a4c56] text-sm">02-2025</span>
        </div>

        <button aria-label="Delete Card" className="p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors w-full sm:w-auto">
          <span className="text-[#fe5050] text-base font-medium">Delete</span>
        </button>
      </div>
        </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-6">
        <span className="text-[#777980] text-base">Pay with new card</span>
        <Link
          aria-label="Add New Card"
          href={"/payment/add-new-card"}
          className="px-8 py-3 rounded-lg text-center border border-[#0068ef] cursor-pointer hover:bg-[#0068ef]/5 transition-colors w-full sm:w-auto"
        >
          <span className="text-[#0068ef] text-base font-medium">Add card</span>
        </Link>
      </div>
    </div>
  )
}
