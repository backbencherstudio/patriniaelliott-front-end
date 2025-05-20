import React from 'react'
import { X } from 'lucide-react'

export default function ViewModal() {
  const withdrawData = {
    header: {
      title: "Withdraw Details",
      transactionId: "TXN123456"
    },
    packageTitle: "Tour Package Details",
    details: [
      { label: "Requested On", value: "30th July 2024, 12:15 PM" },
      { label: "Invoice No.", value: "7565654322" },
      { label: "Payment Method", value: "PayPal" },
      { label: "Account Number", value: "3897 2256 1900 3***" },
      { label: "Status:", value: "Completed", isStatus: true },
      { label: "Requested Amount", value: "$4,000" }
    ],
    action: {
      buttonText: "Download Invoice"
    }
  }

  return (
    <div className="w-[536px] px-6 pt-12 pb-8 relative bg-white rounded-3xl inline-flex flex-col justify-center items-center gap-8">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <h2 className="text-center text-[#070707] text-[32px] font-medium leading-10">
          {withdrawData.header.title}
        </h2>
        <p className="text-center text-[#777980] text-base leading-normal">
          Transaction ID: {withdrawData.header.transactionId}
        </p>
      </div>

      <div className="self-stretch p-4 rounded-xl outline-1 outline-offset-[-1px] outline-[#f3f3f4] flex flex-col justify-start items-start gap-4">
        <h3 className="text-[#070707] text-xl leading-[30px]">
          {withdrawData.packageTitle}
        </h3>
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            {withdrawData.details.map((item) => (
              <div key={item.label} className="text-[#777980] text-base leading-none">
                {item.label}
              </div>
            ))}
          </div>
          <div className="w-[252px] inline-flex flex-col justify-center items-end gap-5">
            {withdrawData.details.map((item) => (
              <div 
                key={item.label} 
                className={`${item.isStatus ? 'text-[#299c46]' : 'text-[#4a4c56]'} text-base leading-none`}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="self-stretch">
        <button className="w-full pl-5 pr-[19.19px] py-5 bg-[#d6ae29] rounded-[50px] outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex justify-center items-center">
          <span className="text-[#23262f] text-base font-medium">
            {withdrawData.action.buttonText}
          </span>
        </button>
      </div>

      <button className="absolute right-6 top-6 p-2 bg-[#e9e9ea] hover:bg-[#d1d1d2] rounded-full transition-colors">
        <X className="h-5 w-5 text-[#09080d]" />
      </button>
    </div>
  )
}
