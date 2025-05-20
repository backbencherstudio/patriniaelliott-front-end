import React from 'react'
import Image from 'next/image'

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step3({ onNext, onBack }: Step3Props) {
  return (
    <>
      <div className="inline-flex justify-start items-center gap-2">
        <div className="opacity-30 flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">1</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Property details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
        <div className="opacity-30 flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">2</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Owner's details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">3</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Manager's details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
        <div className="opacity-30 flex items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
            <div className="text-[#070707] text-base leading-none">4</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Confirmation</div>
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-[#22262e] text-2xl font-medium leading-[30.24px]">Manager's details</div>
          <div className="w-[912px] flex flex-col gap-3">
            <div className="text-[#070707] text-base leading-normal">Who manages the property?</div>
            <div className="self-stretch h-14 px-5 py-[13px] rounded-lg outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex items-center">
              <div className="flex items-center justify-between w-full">
                <div className="text-[#777980] text-sm leading-snug">Owner</div>
                <Image 
                  src="/vendor/downarrow.svg" 
                  alt="dropdown" 
                  width={16} 
                  height={16} 
                  className="rotate-0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[#22262e] text-2xl font-medium leading-[30.24px]">Government representation</div>
          <div className="w-[912px] h-20 flex flex-col gap-3">
            <div className="text-[#070707] text-sm leading-[21px]">
              Is a government agency, government official, or close family members of a government
              official involved in the ownership, control, or management of the accommodation?
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 relative">
                  <div className="w-6 h-6 absolute rounded-full border-2 border-[#d2d2d5]" />
                </div>
                <div className="text-[#070707] text-sm leading-[21px]">Yes</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 relative">
                  <div className="w-6 h-6 absolute rounded-full border-2 border-[#d6ae29]" />
                  <div className="w-3 h-3 absolute left-[6px] top-[6px] bg-[#d6ae29] rounded-full" />
                </div>
                <div className="text-[#070707] text-sm leading-[21px]">No</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center gap-4 mt-6">
        <button 
          onClick={onBack}
          className="px-8 py-3 rounded-lg outline-1 outline-offset-[-1px] outline-[#0068ef] flex items-center gap-1.5"
        >
          <span className="text-[#0068ef] text-base font-medium leading-none">Back</span>
        </button>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex items-center gap-1.5"
        >
          <span className="text-white text-base font-medium leading-none">Next</span>
        </button>
      </div>
    </>
  )
}
