'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function PaymentPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('PayPal')

  const paymentMethods = [
    'PayPal',
    'Bank Transfer',
    'Stripe',
    'Wise'
  ]

  return (
    <div className="w-[960px] px-7 py-6 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-[#e9e9ea] flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-[#070707] text-2xl font-medium">Payment details</h2>
        <p className="text-[#777980] text-sm">Enter your payment and payout details for ensuring smooth payout processing and tax compliance.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[#070707] text-base">Preferred Payout Method</label>
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#0068ef] flex items-center justify-between"
                >
                  <span className="text-[#777980] text-sm">{selectedMethod}</span>
                  <Image 
                    src="/vendor/downarrow.svg" 
                    alt="Down Arrow" 
                    width={16} 
                    height={16} 
                    className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg outline outline-1 outline-[#e9e9ea] z-10">
                    {paymentMethods.map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          setSelectedMethod(method)
                          setIsDropdownOpen(false)
                        }}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#070707] text-base">PayPal Email</label>
            <div className="p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#e9e9ea]">
              <span className="text-[#777980] text-sm">elisabeth_sarah@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#070707] text-base">Account Holder Name</label>
            <div className="p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#e9e9ea]">
              <span className="text-[#777980] text-sm">Elisabeth Sarah</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#070707] text-base">Tax Information</label>
        <div className="p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#e9e9ea]">
          <span className="text-[#777980] text-sm">VAT ID - US123456789</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[#070707] text-base">Billing Address</label>
        <div className="p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#e9e9ea]">
          <span className="text-[#777980] text-sm">45 Ocean Drive, Miami, FL, USA</span>
        </div>
      </div>
    </div>
  )
}
