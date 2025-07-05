import React from 'react'

const refundData = [
  {
    id: 1,
    hotelName: "The Hay-Adams",
    price: "$2000",
    date: "31/12/2024",
    status: "processing",
    refundAmount: "$999",
    image: "https://placehold.co/24x24"
  },
  {
    id: 2,
    hotelName: "The Montage Deer",
    price: "$3500",
    date: "01/01/2025",
    status: "canceled",
    refundAmount: "$699",
    image: "https://placehold.co/24x24"
  },
  {
    id: 3,
    hotelName: "The Jefferson",
    price: "$3500",
    date: "02/01/2025",
    status: "completed",
    refundAmount: "$499",
    image: "https://placehold.co/24x24"
  },
  {
    id: 4,
    hotelName: "The Wigwam Motel",
    price: "$4999",
    date: "02/01/2025",
    status: "completed",
    refundAmount: "$599",
    image: "https://placehold.co/24x24"
  },
  {
    id: 5,
    hotelName: "The Madonna Inn",
    price: "$3500",
    date: "12/01/2025",
    status: "completed",
    refundAmount: "$599",
    image: "https://placehold.co/24x24"
  }
]

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'processing':
      return {
        bg: 'bg-[#ffa23a]/10',
        border: 'outline-[#ffa23a]',
        text: 'text-[#ffa23a]',
        icon: '/booking/processing.svg'
      }
    case 'canceled':
      return {
        bg: 'bg-[#fe5050]/10',
        border: 'outline-[#fe5050]',
        text: 'text-[#fe5050]',
        icon: '/booking/redx.svg'
      }
    case 'completed':
      return {
        bg: 'bg-[#ecfcf2]',
        border: 'outline-[#aaefc6]',
        text: 'text-[#057647]',
        icon: '/booking/check.svg'
      }
    default:
      return {
        bg: 'bg-[#ecfcf2]',
        border: 'outline-[#aaefc6]',
        text: 'text-[#057647]',
        icon: '/booking/check.svg'
      }
  }
}

export default function Refund() {
  return (
    <>
      <div className="w-full px-6 py-[23px] bg-white rounded-xl inline-flex flex-col justify-start items-start gap-6">
        <div className="w-[339px] flex flex-col justify-start items-start gap-[15px]">
          <div className="self-stretch justify-center text-[#070707] text-2xl font-medium ">Refund user</div>
          <div className="self-stretch justify-center text-[#777980] text-base font-normal ">Check up on your latest refund history.</div>
        </div>
        <div className="self-stretch bg-white rounded-xl inline-flex justify-start items-center">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch h-14 p-4 bg-neutral-50 rounded-tl-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal ">Hotel/Tour name</div>
            </div>
            {refundData.map((item) => (
              <div key={item.id} className="self-stretch p-4 border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="w-6 h-6 relative">
                  <img className="w-6 h-6 left-0 top-0 absolute rounded-full" src={item.image} />
                </div>
                <div className="justify-center text-[#070707] text-xs font-normal leading-3">{item.hotelName}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch h-14 p-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal ">Price</div>
            </div>
            {refundData.map((item) => (
              <div key={item.id} className="self-stretch px-4 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="justify-center text-[#777980] text-xs font-normal leading-3">{item.price}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch h-14 p-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal leading-[14px]">Time & Date</div>
            </div>
            {refundData.map((item) => (
              <div key={item.id} className="self-stretch px-4 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="justify-center text-[#777980] text-xs font-normal leading-3">{item.date}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch h-14 p-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal leading-[14px]">Status</div>
            </div>
            {refundData.map((item) => {
              const styles = getStatusStyles(item.status)
              return (
                <div key={item.id} className="self-stretch p-4 border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                  <div className={`pl-1.5 pr-2 py-1.5 ${styles.bg} rounded-2xl outline-1 outline-offset-[-1px] ${styles.border} flex justify-start items-center gap-1`}>
                    <img src={styles.icon} alt={item.status} className="w-3 h-3" />
                    <div className={`text-center justify-start ${styles.text} text-xs font-normal leading-3`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch h-14 p-4 bg-neutral-50 rounded-tr-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="justify-center text-[#4a4c56] text-sm font-normal  leading-[14px]">Refund Amount</div>
            </div>
            {refundData.map((item) => (
              <div key={item.id} className="self-stretch px-4 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="justify-center text-[#777980] text-xs font-normal leading-3">{item.refundAmount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
