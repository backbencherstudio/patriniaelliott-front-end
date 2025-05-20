import React from 'react'
import Image from 'next/image'

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step4({ onNext, onBack }: Step4Props) {
  return (
    <div className="flex flex-col gap-6">
      <div data-property-1="step 4" className="inline-flex justify-start items-center gap-2">
        <div className="opacity-30 flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="text-[#070707] text-base leading-none">1</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Property details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]"></div>
        <div className="opacity-30 flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="text-[#070707] text-base leading-none">2</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Owner's details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]"></div>
        <div className="opacity-30 flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="text-[#070707] text-base leading-none">3</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Manager's details</div>
        </div>
        <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]"></div>
        <div className="flex justify-start items-center gap-3">
          <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl inline-flex flex-col justify-center items-center gap-2.5">
            <div className="text-[#070707] text-base leading-none">4</div>
          </div>
          <div className="text-[#070707] text-base leading-none">Confirmation</div>
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className="self-stretch flex flex-col gap-6">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-[#22262e] text-2xl font-medium leading-normal">Review and submit your details</div>
            <div data-property-1="default" className="pl-1.5 pr-2 py-1.5 rounded outline-1 outline-offset-[-1px] outline-[#0068ef] flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Image 
                  src="/vendor/edit.svg" 
                  alt="Edit" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 [filter:invert(31%)_sepia(98%)_saturate(3696%)_hue-rotate(206deg)_brightness(97%)_contrast(107%)]"
                />
                <div className="text-[#0068ef] text-sm leading-[14px]">Edit</div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col gap-2">
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Before submitting the form, check all the info you entered is correct.</div>
              <div className="text-[#4a4c56] text-sm leading-snug">Elizabeth Sarah</div>
            </div>
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Address (street name and house number)</div>
              <div className="text-[#4a4c56] text-sm leading-snug">1226 University Drive</div>
            </div>
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex items-center gap-2.5">
              <div className="text-[#070707] text-sm leading-snug">Unit number</div>
            </div>
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Zip code</div>
              <div className="text-[#4a4c56] text-sm leading-snug">CA 94025</div>
            </div>
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Town/City</div>
              <div className="text-[#4a4c56] text-sm leading-snug">Menlo Park</div>
            </div>
            <div className="self-stretch pt-3 border-b flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Country</div>
              <div className="text-[#4a4c56] text-sm leading-snug">United States of America</div>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className="self-stretch flex flex-col gap-6">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-[#22262e] text-2xl font-medium leading-normal">Owner's details</div>
            <div data-property-1="default" className="pl-1.5 pr-2 py-1.5 rounded outline-1 outline-offset-[-1px] outline-[#0068ef] flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Image 
                  src="/vendor/edit.svg" 
                  alt="Edit" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 [filter:invert(31%)_sepia(98%)_saturate(3696%)_hue-rotate(206deg)_brightness(97%)_contrast(107%)]"
                />
                <div className="text-[#0068ef] text-sm leading-[14px]">Edit</div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col gap-2">
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Who owns the property?</div>
              <div className="text-[#4a4c56] text-sm leading-snug">I'm an individual running a business</div>
            </div>
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Your Full Name</div>
              <div className="text-[#4a4c56] text-sm leading-snug">Elizabeth Sarah</div>
            </div>
            <div className="self-stretch pt-3 flex items-center gap-2.5">
              <div className="text-[#070707] text-sm leading-snug">If any owners go by an alternative name(s), provide those details</div>
            </div>
          </div>
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className="self-stretch flex flex-col gap-6">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="text-[#22262e] text-2xl font-medium leading-normal">Manager's details</div>
            <div data-property-1="default" className="pl-1.5 pr-2 py-1.5 rounded outline-1 outline-offset-[-1px] outline-[#0068ef] flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Image 
                  src="/vendor/edit.svg" 
                  alt="Edit" 
                  width={20} 
                  height={20}
                  className="w-5 h-5 [filter:invert(31%)_sepia(98%)_saturate(3696%)_hue-rotate(206deg)_brightness(97%)_contrast(107%)]"
                />
                <div className="text-[#0068ef] text-sm leading-[14px]">Edit</div>
              </div>
            </div>
          </div>

          <div className="self-stretch flex flex-col gap-2">
            <div className="self-stretch py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Who owns the property?</div>
              <div className="text-[#4a4c56] text-sm leading-snug">I'm an individual running a business</div>
            </div>
            <div className="self-stretch pt-3 flex justify-between items-center">
              <div className="w-[666px] text-[#070707] text-sm leading-snug">
                Is a government agency, government official, or close family members of a
                government official involved in the ownership, control, or management of the
                accommodation?
              </div>
              <div className="text-[#4a4c56] text-sm leading-snug">Elizabeth Sarah</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-6">
        <button 
          onClick={onBack}
          data-property-1="Default_Settings button" 
          className="px-8 py-3 rounded-lg outline-1 outline-offset-[-1px] outline-[#0068ef] flex justify-center items-center gap-1.5"
        >
          <div className="text-[#0068ef] text-base font-medium leading-none">Back</div>
        </button>
        <button 
          onClick={onNext}
          data-property-1="Active_Settings button" 
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex justify-center items-center gap-1.5"
        >
          <div className="text-white text-base font-medium leading-none">Submit</div>
        </button>
      </div>
    </div>
  )
}
