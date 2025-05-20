import React from 'react'
import Image from 'next/image'

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const StepIndicator = ({ number, text, active = false }: { number: string, text: string, active?: boolean }) => (
  <div className={`flex items-center gap-3 ${!active && 'opacity-30'}`}>
    <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex items-center justify-center">
      <span className="text-[#070707] text-base">{number}</span>
    </div>
    <span className="text-[#070707] text-base">{text}</span>
  </div>
)

const Divider = () => (
  <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
)

const InputField = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="flex-1 flex flex-col gap-3">
    <label className="text-[#070707] text-base">{label}</label>
    <div className="px-5 py-4 rounded-lg outline-1 outline-offset-[-1px] outline-[#d2d2d5]">
      <span className="text-[#777980] text-sm">{placeholder}</span>
    </div>
  </div>
)

const DropdownField = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="w-full flex flex-col gap-3">
    <label className="text-[#070707] text-base">{label}</label>
    <div className="px-5 py-[15px] rounded-lg outline-1 outline-offset-[-1px] outline-[#d2d2d5]">
      <div className="flex justify-between items-center">
        <span className="text-[#777980] text-sm">{placeholder}</span>
        <Image src="/vendor/downarrow.svg" alt="down arrow" width={16} height={16} />
      </div>
    </div>
  </div>
)

export default function Step2({ onNext, onBack }: Step2Props) {
  return (
    <div className="flex flex-col min-h-full">
      {/* Progress Steps */}
      <div className="inline-flex items-center gap-2">
        <StepIndicator number="1" text="Property details" />
        <Divider />
        <StepIndicator number="2" text="Owner's details" active />
        <Divider />
        <StepIndicator number="3" text="Manager's details" />
        <Divider />
        <StepIndicator number="4" text="Confirmation" />
      </div>

      {/* Main Form */}
      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6 mt-6">
        <h2 className="text-[#22262e] text-2xl font-medium">Owner's details</h2>
        
        <div className="flex flex-col gap-4">
          <DropdownField 
            label="Who owns the property?" 
            placeholder="I'm an individual running a business" 
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <InputField label="First name" placeholder="CA 94025" />
              <InputField label="Last name" placeholder="Menlo Park" />
            </div>

            <button className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] bg-[#d6ae29] rounded-[9px] flex items-center justify-center">
                <div className="w-2 h-2 outline-[1.12px] outline-offset-[-0.56px] outline-[#141b34]" />
              </div>
              <span className="text-[#070707] text-sm">Add another</span>
            </button>
          </div>

          <DropdownField 
            label="If any owners go by an alternative name(s), provide those details" 
            placeholder="United States of America" 
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end items-center gap-4 mt-10">
        <button 
          onClick={onBack}
          className="px-8 py-3 rounded-lg outline-1 outline-offset-[-1px] outline-[#0068ef] text-[#0068ef] font-medium"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-[#0068ef] rounded-lg text-white font-medium"
        >
          Next
        </button>
      </div>
    </div>
  )
}
