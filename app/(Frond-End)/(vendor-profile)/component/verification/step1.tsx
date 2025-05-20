import React from 'react'
import Image from 'next/image'

export default function Step1() {
  return (
    <div className="flex flex-col gap-4">
      <div data-property-1="step 1" className="inline-flex justify-start items-center gap-2">
        <div className="flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">1</div>
          </div>
          <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">Property details</div>
        </div>
        <div className="w-[66px] h-0 outline outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]"></div>
        <div className="opacity-30 flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">2</div>
          </div>
          <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">Owner's details</div>
        </div>
        <div className="w-[66px] h-0 outline outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]"></div>
        <div className="opacity-30 flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">3</div>
          </div>
          <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">Manager's details</div>
        </div>
        <div className="w-[66px] h-0 outline outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]"></div>
        <div className="opacity-30 flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">4</div>
          </div>
          <div className="justify-center text-[#070707] text-base font-normal font-['Inter'] leading-none">Confirmation</div>
        </div>
      </div>
      <div className="self-stretch p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-6">
        <div className="self-stretch px-4 py-3 bg-[#fffbee] rounded-xl inline-flex justify-start items-start gap-1.5">
          <div className="flex items-start gap-2.5">
            <Image 
              src="/vendor/error.svg"
              alt="Error icon"
              width={16}
              height={16}
            />
            <div className="flex-1 flex flex-col justify-start items-start gap-2">
              <div className="text-[#fe5050] text-sm font-normal font-['Inter'] leading-[14px]">Property address</div>
              <div className="self-stretch justify-center text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">Make sure you provide us your property's registered address.</div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="justify-center text-[#22262e] text-2xl font-medium font-['Inter'] leading-[30.24px]">Property details</div>
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="w-[912px] flex flex-col justify-start items-start gap-3">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Full name of the accommodation</div>
              </div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">Elisabeth</div>
              </div>
            </div>
            <div className="w-[912px] flex flex-col justify-start items-start gap-3">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Address (street name and house number)</div>
              </div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">Choose display name</div>
              </div>
            </div>
            <div className="w-[912px] flex flex-col justify-start items-start gap-3">
              <div className="inline-flex justify-start items-center gap-1.5">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Unit number</div>
                <div className="justify-start text-[#777980] text-base font-normal font-['Inter'] leading-none">(optional)</div>
              </div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">Unit 1205</div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-4">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Zip code</div>
                <div className="self-stretch px-5 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                  <div className="inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">CA 94025</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-3">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Town/City</div>
                <div className="self-stretch px-5 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                  <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">Menlo Park</div>
                </div>
              </div>
            </div>
            <div className="w-[912px] flex flex-col justify-start items-start gap-3">
              <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Country</div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">United States of America</div>
                  <Image 
                    src="/vendor/downarrow.svg"
                    alt="Down arrow"
                    width={16}
                    height={16}
                    className="rotate-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end w-full">
        <div data-property-1="Active_Settings button" className="px-8 py-3 bg-[#0068ef] rounded-lg inline-flex justify-center items-center gap-1.5 overflow-hidden">
          <div className="justify-start text-white text-base font-medium font-['Inter'] leading-none">Next</div>
        </div>
      </div>
    </div>
  )
}
