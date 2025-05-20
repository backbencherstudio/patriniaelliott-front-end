import React from 'react'
import Image from 'next/image'

export default function Step5() {
  return (
    <div className="w-[960px] px-7 py-6 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-[#e9e9ea] flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <Image
              src="/vendor/bluetik.svg"
              alt="Vendor verification icon"
              width={32}
              height={32}
            />
          </div>
          <h2 className="text-2xl font-medium text-[#070707]">Vendor verification</h2>
        </div>
        <p className="text-sm text-[#777980]">
          Your vendor verification process is now complete, and your account is fully activated. This means you can confidently list your properties, start accepting bookings from travelers, and receive payouts securely through your preferred payment method.
        </p>
      </div>
      <div className="flex items-end gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-base font-medium text-[#070707]">Update changes</h3>
          <p className="text-sm text-[#777980] leading-[14px]">
            Need to update your verification details? You can edit and resubmit any section for review.
          </p>
        </div>
        <button className="px-8 py-3 rounded-lg outline-1 outline-[#0068ef] text-[#0068ef] text-base font-medium">
          Edit
        </button>
      </div>
    </div>
  )
}
