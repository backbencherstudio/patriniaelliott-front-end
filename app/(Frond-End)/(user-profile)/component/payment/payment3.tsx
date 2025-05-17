import React from 'react'
import Image from 'next/image'

export default function Payment3() {
  return (
    <div className="w-[960px] p-6 bg-white rounded-xl flex flex-col gap-6 my-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-[#22262e] text-2xl font-medium">Add payment cards</h2>
        <p className="text-[#777980] text-base">Save your passport details for use when booking your next stay, flight.</p>
      </div>

      <div className="p-2.5 rounded-lg border border-[#e9e9ea] flex justify-between items-center">
        <div className="flex items-center gap-12">
          <span className="text-[#4a4c56] text-lg">Payment card</span>
          
          {/* Mastercard Logo */}
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

        <button className="p-3 rounded-lg shadow-sm">
          <span className="text-[#fe5050] text-base font-medium">Delete</span>
        </button>
      </div>

      <div className="flex justify-end items-center gap-6">
        <span className="text-[#777980] text-base">Pay with new card</span>
        <button className="px-8 py-3 rounded-lg border border-[#0068ef]">
          <span className="text-[#0068ef] text-base font-medium">Add card</span>
        </button>
      </div>
    </div>
  )
}
