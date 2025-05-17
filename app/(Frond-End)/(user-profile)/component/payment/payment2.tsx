import React from 'react'
import Image from 'next/image'

export default function Payment2() {
  return (
    <>
      {/* Card Details Section */}
      <div className="p-6 bg-white rounded-xl flex flex-col gap-8">
        <h2 className="text-[#22262e] text-2xl font-medium">
          Add card details
        </h2>
        
        <div className="flex flex-col gap-3">
          {/* Card Number Field */}
          <div className="w-full">
            <label className="text-[#070707] text-base font-normal mb-2 block">
              Card number
            </label>
            <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5]">
              <span className="text-[#777980] text-sm font-normal">
                3897 22XX 1900 3890
              </span>
            </div>
          </div>

          {/* Expiry Date and CVV */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                Expiry Date
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5]">
                <span className="text-[#a5a5ab] text-sm font-normal">
                  MM/DD
                </span>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                CVV
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5]">
                <span className="text-[#a5a5ab] text-sm font-normal">
                  •••
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>










      {/* Billing Address Section */}
      <div className="w-full p-6 bg-white rounded-xl flex flex-col gap-8 mt-10">
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
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex justify-between items-center">
                <span className="text-[#777980] text-sm font-normal">
                  United states
                </span>
                <Image 
                  src="/usericon/downarrow.svg" 
                  alt="Down Arrow" 
                  width={16} 
                  height={16} 
                  className="rotate-0"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                Street address
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex justify-between items-center">
                <span className="text-[#777980] text-sm font-normal whitespace-nowrap">
                  e.g. 123 Main St.
                </span>
                <div className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Apt and City */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                Apt, suite. (optional)
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex items-center">
                <span className="text-[#777980] text-sm font-normal whitespace-nowrap">
                  e.g. Apt #123
                </span>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                City
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex justify-between items-center">
                <span className="text-[#777980] text-sm font-normal">
                  New York
                </span>
                <div className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* State and Zip Code */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                State / Province / County / Region
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex items-center">
                <span className="text-[#777980] text-sm font-normal whitespace-nowrap">
                  e.g. State #123
                </span>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-[#070707] text-base font-normal mb-2 block">
                Zip code
              </label>
              <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex justify-between items-center">
                <span className="text-[#777980] text-sm font-normal">
                  726 664 074
                </span>
                <div className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button className="px-8 py-3 rounded-lg outline-1 outline-[#0068ef] text-[#0068ef] text-base font-medium">
              Cancel
            </button>
            <button className="px-8 py-3 bg-[#0068ef] rounded-lg text-white text-base font-medium">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
