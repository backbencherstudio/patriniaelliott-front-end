import React from 'react'
import Image from 'next/image'

export default function Hotel() {
  const hotelData = [
    {
      id: 1,
      name: "Mandarin Oriental",
      image: "https://placehold.co/24x24",
      bookingDate: "Feb 6, 2022",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 2,
      name: "The Knicker Hotel",
      image: "https://placehold.co/24x24",
      bookingDate: "April 16, 2022",
      amount: "$2999",
      status: "Canceled"
    },
    {
      id: 3,
      name: "The Beverly Hills Hotel",
      image: "https://placehold.co/24x24",
      bookingDate: "May 22, 2023",
      amount: "$3559",
      status: "Completed"
    },
    {
      id: 4,
      name: "The Hopkins Hotel",
      image: "https://placehold.co/24x24",
      bookingDate: "Jun 5, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 5,
      name: "The Plaza Hotel",
      image: "https://placehold.co/24x24",
      bookingDate: "Sep 9, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 6,
      name: "The Greenbrier",
      image: "https://placehold.co/24x24",
      bookingDate: "Jan 8, 2025",
      amount: "$2999",
      status: "Completed"
    }
  ];

  return (
    <div className="w-[960px] inline-flex flex-col justify-start items-center my-10">
      <div className="self-stretch px-4 py-6 bg-white rounded-tl-xl rounded-tr-xl inline-flex justify-between items-start">
        <div className="w-[339px] inline-flex flex-col justify-start items-start gap-[15px]">
          <div className="self-stretch justify-center text-[#070707] text-2xl font-medium font-['Inter'] leading-normal">Hotel reservation list</div>
          <div className="self-stretch justify-center text-[#777980] text-base font-normal font-['Inter'] leading-none tracking-tight">Check up on your latest reservations.</div>
        </div>
        <div data-property-1="default" className="pl-1.5 pr-2 py-1.5 rounded outline outline-1 outline-offset-[-1px] outline-[#0068ef] flex justify-start items-center gap-2">
          <div className="flex justify-start items-center gap-2">
            <div className="w-5 h-5 relative overflow-hidden">
              <Image src="/booking/calender.svg" alt="Calendar" width={18} height={18} className='object-cover'/>
            </div>
            <div className="justify-start text-[#0068ef] text-sm font-normal font-['Inter'] leading-[14px]">Date & Time</div>
          </div>
        </div>
      </div>
      <div className="self-stretch px-4 pb-4 bg-white rounded-bl-xl rounded-br-xl inline-flex justify-start items-center">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch h-14 p-4 bg-neutral-50 rounded-tl-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Hotel list</div>
          </div>
          {hotelData.map((hotel) => (
            <div key={hotel.id} className="self-stretch p-4 border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
              <div className="w-6 h-6 relative">
                <img className="w-6 h-6 left-0 top-0 absolute rounded-full" src={hotel.image} />
              </div>
              <div className="justify-center text-[#070707] text-xs font-normal font-['Inter'] leading-3">{hotel.name}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch h-14 p-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Booking date</div>
          </div>
          {hotelData.map((hotel) => (
            <div key={hotel.id} className="self-stretch px-4 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
              <div className="justify-center text-[#777980] text-xs font-normal font-['Inter'] leading-3">{hotel.bookingDate}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch h-14 p-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Booking amount</div>
          </div>
          {hotelData.map((hotel) => (
            <div key={hotel.id} className="self-stretch px-4 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
              <div className="justify-center text-[#777980] text-xs font-normal font-['Inter'] leading-3">{hotel.amount}</div>
            </div>
          ))}
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch h-14 p-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Status</div>
          </div>
          {hotelData.map((hotel) => (
            <div key={hotel.id} className="self-stretch p-4 border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
              <div className={`pl-1.5 pr-2 py-1.5 ${hotel.status === "Completed" ? "bg-[#38c976]/10 outline-[#abefc6]" : "bg-[#fe5050]/10 outline-[#fe5050]"} rounded-2xl outline outline-1 outline-offset-[-1px] flex justify-start items-center gap-1`}>
                <div className="w-3 h-3 relative overflow-hidden">
                  <Image 
                    src={hotel.status === 'Completed' ? "/booking/check.svg" : "/booking/redx.svg"} 
                    alt={hotel.status} 
                    width={16}
                    height={16}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className={`text-center justify-start text-xs ${hotel.status === 'Completed' ? 'text-[#067647]' : 'text-[#fe5050]'} font-normal font-['Inter'] leading-3`}>{hotel.status}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch h-14 p-4 bg-neutral-50 rounded-tr-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Action</div>
          </div>
          {hotelData.map((hotel) => (
            <div key={hotel.id} className="self-stretch px-4 py-5 border-b border-[#eaecf0] inline-flex justify-start items-center gap-8">
              <div className="justify-center text-[#777980] text-xs font-normal font-['Inter'] underline leading-3">View details</div>
              <div className="w-4 h-4 relative overflow-hidden">
                <Image src="/booking/delete.svg" alt="Delete" width={16} height={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
