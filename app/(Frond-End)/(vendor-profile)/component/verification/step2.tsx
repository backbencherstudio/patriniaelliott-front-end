import React, { useState } from 'react'
import Image from 'next/image'
import { OWNERSHIP_TYPES } from '../../vendor-verification/page'

interface FormData {
  ownershipType: string;
  firstName: string;
  lastName: string;
  alternativeName: string;
}

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const StepIndicator = ({ number, text, isClickable, isActive, onClick }: { 
  number: string, 
  text: string, 
  isClickable: boolean,
  isActive: boolean,
  onClick: () => void 
}) => {
  const baseStyle = "flex items-center gap-3 transition-opacity";
  const clickableStyle = isClickable ? "cursor-pointer hover:opacity-80" : "opacity-30";
  const activeStyle = isActive ? "" : "opacity-30";
  
  return (
    <div 
      className={`${baseStyle} ${isClickable ? clickableStyle : activeStyle}`}
      onClick={onClick}
    >
      <div className="w-6 h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex items-center justify-center">
        <span className="text-[#070707] text-base">{number}</span>
      </div>
      <span className="text-[#070707] text-base">{text}</span>
    </div>
  );
};

const Divider = () => (
  <div className="w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
);

const InputField = ({ label, value, onChange, placeholder }: { 
  label: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder: string 
}) => (
  <div className="flex-1 flex flex-col gap-3">
    <label className="text-[#070707] text-base">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-5 py-4 rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
    />
  </div>
);

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
      <label className="text-[#070707] text-base">{label}</label>
      <div className="relative">
        <div 
          className="px-5 py-[15px] rounded-lg border border-[#d2d2d5] cursor-pointer hover:border-[#0068ef] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <span className="text-[#070707] text-sm">{value || placeholder}</span>
            <Image 
              src="/vendor/downarrow.svg" 
              alt="down arrow" 
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

export default function Step2({ onNext, onBack, currentStep, onStepClick, formData, updateFormData }: Step2Props) {
  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [field]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Progress Steps */}
      <div className="w-full flex justify-center">
        <div className="inline-flex items-center gap-2">
          <StepIndicator 
            number="1" 
            text="Property details" 
            isClickable={1 <= currentStep}
            isActive={1 === currentStep}
            onClick={() => onStepClick(1)}
          />
          <Divider />
          <StepIndicator 
            number="2" 
            text="Owner's details" 
            isClickable={2 <= currentStep}
            isActive={2 === currentStep}
            onClick={() => onStepClick(2)}
          />
          <Divider />
          <StepIndicator 
            number="3" 
            text="Manager's details" 
            isClickable={3 <= currentStep}
            isActive={3 === currentStep}
            onClick={() => onStepClick(3)}
          />
          <Divider />
          <StepIndicator 
            number="4" 
            text="Confirmation" 
            isClickable={4 <= currentStep}
            isActive={4 === currentStep}
            onClick={() => onStepClick(4)}
          />
        </div>
      </div>

      {/* Main Form */}
      <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6 mt-6">
        <h2 className="text-[#22262e] text-2xl font-medium">Owner's details</h2>
        
        <div className="flex flex-col gap-4">
          <DropdownField 
            label="Who owns the property?" 
            value={formData.ownershipType}
            placeholder="Select ownership type"
            options={OWNERSHIP_TYPES}
            onSelect={(value) => updateFormData({ ownershipType: value })}
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <InputField 
                label="First name" 
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                placeholder="Enter first name"
              />
              <InputField 
                label="Last name" 
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                placeholder="Enter last name"
              />
            </div>

            <button className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] bg-[#d6ae29] rounded-[9px] flex items-center justify-center">
                <div className="w-2 h-2 outline-[1.12px] outline-offset-[-0.56px] outline-[#141b34]" />
              </div>
              <span className="text-[#070707] text-sm">Add another</span>
            </button>
          </div>

          <InputField 
            label="If any owners go by an alternative name(s), provide those details" 
            value={formData.alternativeName}
            onChange={handleInputChange('alternativeName')}
            placeholder="Enter alternative name"
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end items-center gap-4 mt-8">
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
    </div>
  )
}
