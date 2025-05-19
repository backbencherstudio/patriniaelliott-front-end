import React from 'react'
import Image from 'next/image'

export default function Apartment() {
  const apartmentData = [
    {
      id: 1,
      name: "Eclipse Haven Apartment",
      image: "https://placehold.co/24x24",
      bookingDate: "Feb 6, 2022",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 2,
      name: "Lakeside Luxe Flats",
      image: "https://placehold.co/24x24",
      bookingDate: "April 16, 2022",
      amount: "$2999",
      status: "Canceled"
    },
    {
      id: 3,
      name: "The Sapphire Haven",
      image: "https://placehold.co/24x24",
      bookingDate: "May 22, 2023",
      amount: "$3559",
      status: "Completed"
    },
    {
      id: 4,
      name: "Summit View Apartments",
      image: "https://placehold.co/24x24",
      bookingDate: "Jun 5, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 5,
      name: "Aurora Heights",
      image: "https://placehold.co/24x24",
      bookingDate: "Sep 9, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 6,
      name: "Residential Haven",
      image: "https://placehold.co/24x24",
      bookingDate: "Jan 8, 2025",
      amount: "$2999",
      status: "Completed"
    }
  ];

  return (
<>
    <div className="p-4 bg-white rounded-xl my-10">
      <div className="mb-6">
        <h1 className="text-3xl font-medium text-[#070707]">Welcome, Elisabeth!</h1>
        <p className="text-base text-[#777980]">Check up on your latest reservations and history.</p>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="p-6 bg-neutral-50 rounded-lg border flex items-center gap-2.5">
          <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md flex items-center justify-center">
            <Image src="/booking/tik.svg" alt="Total bookings" width={18} height={18} />
          </div>
          <div>
            <div className="text-base font-medium text-[#070707]">16</div>
            <div className="text-xs text-[#777980]">Total bookings</div>
          </div>
        </div>

        <div className="p-6 bg-neutral-50 rounded-lg border flex items-center gap-2.5">
          <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md flex items-center justify-center">
            <Image src="/booking/bed.svg" alt="Completed stays" width={18} height={18} />
          </div>
          <div>
            <div className="text-base font-medium text-[#070707]">14</div>
            <div className="text-xs text-[#777980]">Completed Stays</div>
          </div>
        </div>

        <div className="p-6 bg-neutral-50 rounded-lg border flex items-center gap-2.5">
          <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md flex items-center justify-center">
            <Image src="/booking/wallet.svg" alt="Total spend" width={18} height={18} />
          </div>
          <div>
            <div className="text-base font-medium text-[#070707]">$14,526</div>
            <div className="text-xs text-[#777980]">Total Spend</div>
          </div>
        </div>

        <div className="p-6 bg-neutral-50 rounded-lg border flex items-center gap-2.5">
          <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md flex items-center justify-center">
            <Image src="/booking/tik.svg" alt="Upcoming stays" width={18} height={18} />
          </div>
          <div>
            <div className="text-base font-medium text-[#070707]">2</div>
            <div className="text-xs text-[#777980]">Upcoming Stays</div>
          </div>
        </div>
      </div>
    </div>

{/* ===================== Table Start ======================= */}

<div className="w-[984px] inline-flex flex-col items-center">
  <div className="self-stretch px-4 pt-4 bg-white rounded-tl-xl rounded-tr-xl flex justify-between items-start">
    <div className="w-[339px] flex flex-col gap-[15px]">
      <div className="text-2xl font-medium text-[#070707]">Apartment reservation list</div>
      <div className="text-base text-[#777980]">Check up on your latest reservations.</div>
    </div>
    <div className="pl-1.5 pr-2 py-1.5 rounded outline outline-1 outline-offset-[-1px] outline-[#0068ef] flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 relative overflow-hidden">
          <Image src="/booking/calender.svg" alt="Calendar" width={18} height={18} className='object-cover'/>
        </div>
        <div className="text-sm text-[#0068ef]">Date & Time</div>
      </div>
    </div>
  </div>
  <div className="self-stretch p-4 bg-white rounded-bl-xl rounded-br-xl flex">
    <div className="flex-1 flex flex-col">
      <div className="h-14 p-4 bg-neutral-50 rounded-tl-xl flex items-center">
        <div className="flex-1 text-sm text-[#4a4c56]">Apartment list</div>
      </div>
      {apartmentData.map((apartment) => (
        <div key={apartment.id} className="h-[72px] p-4 border-b border-[#eaecf0] flex items-center">
          <div className="w-6 h-6 relative">
            <img className="w-6 h-6 rounded-full" src={apartment.image} />
          </div>
          <div className="ml-3 text-xs text-[#070707]">{apartment.name}</div>
        </div>
      ))}
    </div>
    <div className="flex-1 flex flex-col">
      <div className="h-14 p-4 bg-neutral-50 flex items-center">
        <div className="flex-1 text-sm text-[#4a4c56]">Booking date</div>
      </div>
      {apartmentData.map((apartment) => (
        <div key={apartment.id} className="h-[72px] px-4 border-b border-[#eaecf0] flex items-center">
          <div className="text-xs text-[#777980]">{apartment.bookingDate}</div>
        </div>
      ))}
    </div>
    <div className="flex-1 flex flex-col">
      <div className="h-14 p-4 bg-neutral-50 flex items-center">
        <div className="flex-1 text-sm text-[#4a4c56]">Booking amount</div>
      </div>
      {apartmentData.map((apartment) => (
        <div key={apartment.id} className="h-[72px] px-4 border-b border-[#eaecf0] flex items-center">
          <div className="text-xs text-[#777980]">{apartment.amount}</div>
        </div>
      ))}
    </div>
    <div className="flex-1 flex flex-col">
      <div className="h-14 p-4 bg-neutral-50 flex items-center">
        <div className="flex-1 text-sm text-[#4a4c56]">Status</div>
      </div>
      {apartmentData.map((apartment) => (
        <div key={apartment.id} className="h-[72px] p-4 border-b border-[#eaecf0] flex items-center">
          <div className={`pl-1.5 pr-2 py-1.5 ${apartment.status === "Completed" ? "bg-[#38c976]/10 outline-[#abefc6]" : "bg-[#fe5050]/10 outline-[#fe5050]"} rounded-2xl outline outline-1 outline-offset-[-1px] flex items-center gap-1`}>
            <div className="w-3 h-3 relative overflow-hidden">
              <Image 
                src={apartment.status === 'Completed' ? "/booking/check.svg" : "/booking/redx.svg"} 
                alt={apartment.status} 
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <div className={`text-xs ${apartment.status === 'Completed' ? 'text-[#067647]' : 'text-[#fe5050]'}`}>{apartment.status}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex-1 flex flex-col">
      <div className="h-14 p-4 bg-neutral-50 rounded-tr-xl flex items-center">
        <div className="text-sm text-[#4a4c56]">Action</div>
      </div>
      {apartmentData.map((apartment) => (
        <div key={apartment.id} className="h-[72px] px-4 border-b border-[#eaecf0] flex items-center gap-8">
          <div className="text-xs text-[#777980] underline">View details</div>
          <div className="w-4 h-4 relative overflow-hidden">
            <Image src="/booking/delete.svg" alt="Delete" width={16} height={16} />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
</>
  )
}
