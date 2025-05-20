import React from 'react'
import Image from 'next/image'

interface Step1Props {
  onNext: () => void;
}

export default function Step1({ onNext }: Step1Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex justify-start items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex-col flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">1</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Property details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
        <div className="opacity-30 flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex-col flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">2</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Owner's details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
        <div className="opacity-30 flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex-col flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">3</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Manager's details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
        <div className="opacity-30 flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex-col flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">4</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Confirmation</div>
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className="self-stretch px-4 py-3 bg-[#fffbee] rounded-xl flex gap-1.5">
          <div className="flex gap-2.5">
            <Image 
              src="/vendor/error.svg"
              alt="Error icon"
              width={16}
              height={16}
            />
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-[#fe5050] text-sm leading-[14px]">Property address</div>
              <div className="text-[#777980] text-sm leading-[14px]">Make sure you provide us your property's registered address.</div>
            </div>
          </div>
        </div>

        <div className="self-stretch flex flex-col gap-6">
          <div className="text-[#22262e] text-2xl font-medium leading-[30.24px]">Property details</div>
          <div className="self-stretch flex flex-col gap-3">
            <div className="w-[912px] flex flex-col gap-3">
              <div className="self-stretch flex items-center gap-2">
                <div className="text-[#070707] text-base leading-none">Full name of the accommodation</div>
              </div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline-1 outline-[#d2d2d5]">
                <div className="text-[#777980] text-sm leading-[14px]">Elisabeth</div>
              </div>
            </div>

            <div className="w-[912px] flex flex-col gap-3">
              <div className="self-stretch flex items-center gap-2">
                <div className="text-[#070707] text-base leading-none">Address (street name and house number)</div>
              </div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline-1 outline-[#d2d2d5]">
                <div className="text-[#777980] text-sm leading-[14px]">Choose display name</div>
              </div>
            </div>

            <div className="w-[912px] flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <div className="text-[#070707] text-base leading-none">Unit number</div>
                <div className="text-[#777980] text-base leading-none">(optional)</div>
              </div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline-1 outline-[#d2d2d5]">
                <div className="text-[#777980] text-sm leading-[14px]">Unit 1205</div>
              </div>
            </div>

            <div className="self-stretch flex gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-[#070707] text-base leading-none">Zip code</div>
                <div className="self-stretch px-5 py-[15px] rounded-lg outline-1 outline-[#d2d2d5]">
                  <div className="flex items-center gap-2">
                    <div className="text-[#777980] text-sm leading-[14px]">CA 94025</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-[#070707] text-base leading-none">Town/City</div>
                <div className="self-stretch px-5 py-[15px] rounded-lg outline-1 outline-[#d2d2d5]">
                  <div className="text-[#777980] text-sm leading-[14px]">Menlo Park</div>
                </div>
              </div>
            </div>

            <div className="w-[912px] flex flex-col gap-3">
              <div className="text-[#070707] text-base leading-none">Country</div>
              <div className="self-stretch px-5 py-[15px] rounded-lg outline-1 outline-[#d2d2d5]">
                <div className="self-stretch flex justify-between items-center">
                  <div className="text-[#777980] text-sm leading-[14px]">United States of America</div>
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
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex items-center gap-1.5 text-white text-base font-medium"
        >
          Next
        </button>
      </div>
    </div>
  )
}

