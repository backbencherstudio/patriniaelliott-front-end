import React from 'react'
import { FaStar } from "react-icons/fa6"

const apartmentData = {
  title: "Eclipse Haven Apartment",
  host: "Michalle",
  price: 378,
  rating: 4.8,
  reviews: 256,
  bookingDetails: {
    code: "#021954455",
    date: "30 Apr, 2023",
    total: "$11,500",
    paymentMethod: "Debit card"
  }
}

export default function Details() {
  return (
    <div className="w-full flex flex-col gap-6 ">
      <div className="text-[32px] font-medium">Apartment details</div>
      <div className="p-4 bg-white rounded-xl flex flex-col items-end gap-6">
        <div className="inline-flex items-center gap-3.5">
          <img className="w-[350px] rounded-lg" src="https://placehold.co/320x280" />
          <div className="flex-1 inline-flex flex-col gap-4">
            <div className="inline-flex justify-between items-center">
              <div className="w-[275px] inline-flex flex-col gap-3">
                <div className="text-2xl font-medium whitespace-nowrap">{apartmentData.title}</div>
                <div className="inline-flex items-center gap-1">
                  <div className="w-6 h-6 relative bg-[#e5e8eb] rounded-[64px]">
                    <div className="w-6 h-6 left-0 top-0 absolute bg-[#8bc5e5] rounded-[80px] overflow-hidden">
                      <img className="w-6 h-9 left-0 top-[-6.50px] absolute" src="https://placehold.co/24x36" />
                    </div>
                  </div>
                  <div className="text-xs text-[#777980]">Hosted by</div>
                  <div className="text-xs">{apartmentData.host}</div>
                </div>
              </div>
              <div className="inline-flex flex-col gap-4">
                <div>
                  <span className="text-2xl font-bold">${apartmentData.price}</span>
                  <span className="text-xs">/per night</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <div className="w-12 flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    <div className="text-sm">{apartmentData.rating}</div>
                  </div>
                  <div className="text-sm text-[#777980]">({apartmentData.reviews} reviews)</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#e9e9ea]/20 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#e9e9ea]/50 flex flex-col gap-6">
              <div className="text-2xl font-medium">Booking details</div>
              <div className="inline-flex justify-between items-center">
                <div className="w-[297px] inline-flex flex-col gap-3">
                  <div className="inline-flex items-center gap-3">
                    <div className="text-base text-[#777980]">Booking code:</div>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <div className="text-base text-[#777980]">Date:</div>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <div className="text-base text-[#777980]">Total:</div>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <div className="text-base text-[#777980]">Payment method:</div>
                  </div>
                </div>
                <div className="w-[252px] inline-flex flex-col items-end gap-3">
                  <div className="text-sm text-[#4a4c56]">{apartmentData.bookingDetails.code}</div>
                  <div className="text-sm text-[#4a4c56]">{apartmentData.bookingDetails.date}</div>
                  <div className="text-sm text-[#4a4c56]">{apartmentData.bookingDetails.total}</div>
                  <div className="text-sm text-[#4a4c56]">{apartmentData.bookingDetails.paymentMethod}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-[13px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#0068ef] inline-flex items-center gap-1.5">
          <div className="text-base font-medium text-[#0068ef]">Write a review</div>
        </div>
      </div>
    </div>
  )
}
