import React, { useState } from 'react'
import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { MANAGER_TYPES } from '../../vendor-verification/constants'

interface FormData {
  propertyManager: string;
  governmentInvolvement: boolean;
}

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const DropdownField = ({ 
  label, 
  value, 
  placeholder,
  options,
  onSelect,
}: { 
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onSelect: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-[#070707] text-base leading-normal">{label}</div>
      <div className="relative">
        <div 
          className="self-stretch px-5 py-[15px] rounded-lg border border-[#d2d2d5] cursor-pointer hover:border-[#0068ef] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <div className="text-[#070707] text-sm leading-[21px]">{value || placeholder}</div>
            <Image 
              src="/vendor/downarrow.svg" 
              alt="dropdown" 
              width={16} 
              height={16} 
              className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#d2d2d5] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                className="px-5 py-3 hover:bg-[#f5f8ff] cursor-pointer text-sm"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Step3({ onNext, onBack, currentStep, onStepClick, formData, updateFormData }: Step3Props) {
  const [localGovernmentInvolvement, setLocalGovernmentInvolvement] = useState(formData.governmentInvolvement);

  const handleGovernmentInvolvementChange = (value: boolean) => {
    setLocalGovernmentInvolvement(value);
    updateFormData({ governmentInvolvement: value });
  };

  const getStepStyle = (step: number) => {
    const isClickable = step <= currentStep;
    const isActive = step === currentStep;
    const baseStyle = "flex items-center gap-3 transition-opacity";
    const clickableStyle = isClickable ? "cursor-pointer hover:opacity-80" : "opacity-30";
    const activeStyle = isActive ? "" : "opacity-30";
    
    return `${baseStyle} ${isClickable ? clickableStyle : activeStyle}`;
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="inline-flex items-center gap-2">
          <div 
            className={getStepStyle(1)}
            onClick={() => onStepClick(1)}
          >
            <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
              <div className="text-[#070707] text-base leading-none">1</div>
            </div>
            <div className="text-[#070707] text-base leading-none">Property details</div>
          </div>
          <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
          <div 
            className={getStepStyle(2)}
            onClick={() => onStepClick(2)}
          >
            <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
              <div className="text-[#070707] text-base leading-none">2</div>
            </div>
            <div className="text-[#070707] text-base leading-none">Owner's details</div>
          </div>
          <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
          <div 
            className={getStepStyle(3)}
            onClick={() => onStepClick(3)}
          >
            <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
              <div className="text-[#070707] text-base leading-none">3</div>
            </div>
            <div className="text-[#070707] text-base leading-none">Manager's details</div>
          </div>
          <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
          <div 
            className={getStepStyle(4)}
            onClick={() => onStepClick(4)}
          >
            <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
              <div className="text-[#070707] text-base leading-none">4</div>
            </div>
            <div className="text-[#070707] text-base leading-none">Confirmation</div>
          </div>
        </div>
      </div>

      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="text-[#22262e] text-2xl font-medium leading-[30.24px]">Manager's details</div>
          <DropdownField 
            label="Who manages the property?"
            value={formData.propertyManager}
            placeholder="Select manager type"
            options={MANAGER_TYPES}
            onSelect={(value) => updateFormData({ propertyManager: value })}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-[#22262e] text-2xl font-medium leading-[30.24px]">Government representation</div>
          <div className="flex flex-col gap-3">
            <div className="text-[#070707] text-sm leading-[21px]">
              Is a government agency, government official, or close family members of a government
              official involved in the ownership, control, or management of the accommodation?
            </div>
            <div className="flex items-center gap-6">
              <button 
                type="button"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleGovernmentInvolvementChange(true)}
              >
                <div className="w-6 h-6 relative">
                  <div className={`w-6 h-6 absolute rounded-full border-2 transition-colors ${localGovernmentInvolvement ? 'border-[#d6ae29]' : 'border-[#d2d2d5]'}`}>
                    {localGovernmentInvolvement && (
                      <div className="w-3 h-3 absolute left-[6px] top-[6px] bg-[#d6ae29] rounded-full" />
                    )}
                  </div>
                </div>
                <div className="text-[#070707] text-sm leading-[21px]">Yes</div>
              </button>
              <button 
                type="button"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleGovernmentInvolvementChange(false)}
              >
                <div className="w-6 h-6 relative">
                  <div className={`w-6 h-6 absolute rounded-full border-2 transition-colors ${!localGovernmentInvolvement ? 'border-[#d6ae29]' : 'border-[#d2d2d5]'}`}>
                    {!localGovernmentInvolvement && (
                      <div className="w-3 h-3 absolute left-[6px] top-[6px] bg-[#d6ae29] rounded-full" />
                    )}
                  </div>
                </div>
                <div className="text-[#070707] text-sm leading-[21px]">No</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-6">
        <button 
          onClick={onBack}
          className="px-8 py-3 rounded-lg border border-[#0068ef] flex items-center gap-1.5 text-[#0068ef] text-base font-medium cursor-pointer hover:bg-[#f5f8ff] transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex items-center gap-1.5 text-white text-base font-medium cursor-pointer hover:bg-[#0051bd] transition-colors"
        >
          Next
        </button>
      </div>
    </>
  )
}
