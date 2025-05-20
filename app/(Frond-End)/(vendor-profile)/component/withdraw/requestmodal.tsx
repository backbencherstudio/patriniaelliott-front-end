import React from 'react'
import { X } from 'lucide-react'

export default function RequestPopup() {
  return (
    <div className="px-6 pt-12 pb-8 relative bg-white rounded-3xl inline-flex flex-col items-center gap-8">
      <div className="self-stretch flex flex-col gap-2">
        <div className="text-[#070707] text-[28px] font-medium leading-9">Withdraw Amount Request</div>
        <div className="text-[#777980] text-base">Available Balance: 20,500 USD</div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-[550px] flex flex-col gap-2">
          <div className="text-[#070707] text-base">Enter Amount</div>
          <div className="px-5 py-4 rounded-lg outline-1 outline-[#e9e9ea]">
            <div className="text-[#4a4c56] text-sm">20,500 USD</div>
          </div>
        </div>

        <div className="w-[550px] flex flex-col gap-2">
          <div className="text-[#070707] text-base">Add Note</div>
          <div className="h-24 px-5 py-4 rounded-lg outline-1 outline-[#e9e9ea]">
            <div className="text-[#4a4c56] text-sm">Your message</div>
          </div>
        </div>
      </div>

      <div className="w-[550px]">
        <div className="pl-5 pr-[19px] py-5 bg-[#d6ae29] rounded-[50px] outline-1 outline-[#d2d2d5] text-center">
          <div className="text-[#23262f] text-base font-medium">Send Request</div>
        </div>
      </div>

      <button className="absolute right-6 top-6 p-2 bg-[#e9e9ea] hover:bg-[#d1d1d2] rounded-full transition-colors">
        <X className="h-5 w-5 text-[#09080d]" />
      </button>
    </div>
  )
}
