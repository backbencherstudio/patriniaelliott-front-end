import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from 'react';
import StepIndicator from './StepIndicator';

const OWNERSHIP_TYPES = [
  "I'm an individual running a business",
  "I'm a private individual",
  "A company owns this property",
  "Other"
];

const COUNTRIES = [
  "United States of America",
  "Canada",
  "United Kingdom",
  "Australia",
  "Bangladesh"
];

interface Owner {
  firstName: string;
  lastName: string;
}

interface FormData {
  ownershipType: string;
  alternativeName: string;
  owners: Owner[];
  country: string;
}

interface Step2Props {
  onNext?: () => void;
  onBack?: () => void;
  currentStep?: number;
  onStepClick?: (step: number) => void;
}

export default function Step2({
  onNext,
  onBack,
  currentStep = 2,
  onStepClick = () => {}
}: Step2Props) {
  const [formData, setFormData] = useState<FormData>({
    ownershipType: "",
    alternativeName: "",
    owners: [{ firstName: "", lastName: "" }],
    country: ""
  });

  // Add another owner
  const handleAddOwner = () => {
    setFormData(prev => ({
      ...prev,
      owners: [...prev.owners, { firstName: '', lastName: '' }]
    }));
  };

  // Update owner fields
  const handleOwnerChange = (idx: number, field: keyof Owner, value: string) => {
    setFormData(prev => ({
      ...prev,
      owners: prev.owners.map((owner, i) =>
        i === idx ? { ...owner, [field]: value } : owner
      )
    }));
  };

  // Handle other fields
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    if (onNext) onNext();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />

      <div className="p-6 bg-white rounded-2xl flex flex-col gap-6">
        <div className="text-[#22262e] text-2xl font-medium">Owner's details</div>
        
        {/* Ownership Type Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-[#070707] text-base mb-1">Who owns the property?</label>
          <Select
            value={formData.ownershipType}
            onValueChange={value => handleChange("ownershipType", value)}
          >
            <SelectTrigger className="w-full px-3 !h-13 py-4 rounded-lg border border-[#d2d2d5] bg-white text-sm focus:outline-none focus:border-[#0068ef] ">
              <SelectValue placeholder="Select ownership type" />
            </SelectTrigger>
            <SelectContent>
              {OWNERSHIP_TYPES.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Owner Name Fields */}
        {formData.owners.map((owner, idx) => (
          <div className="flex flex-col md:flex-row gap-4" key={idx}>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[#070707] text-base">First name</label>
              <input
                type="text"
                value={owner.firstName}
                onChange={e => handleOwnerChange(idx, 'firstName', e.target.value)}
                placeholder="First name"
                className="px-5 py-4 rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-[#070707] text-base">Last name</label>
              <input
                type="text"
                value={owner.lastName}
                onChange={e => handleOwnerChange(idx, 'lastName', e.target.value)}
                placeholder="Last name"
                className="px-5 py-4 rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
              />
            </div>
          </div>
        ))}

        {/* Add another */}
        <button
          type="button"
          className="flex items-center gap-2 text-[#070707] text-sm font-medium focus:outline-none"
          style={{ width: "fit-content" }}
          onClick={handleAddOwner}
        >
          <span className="w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#fff7e7] border border-[#d6ae29]">
            <span className="text-[#d6ae29] text-lg font-bold" style={{marginTop: "-2px"}}>+</span>
          </span>
          Add another
        </button>

        {/* Country Select (Bottom input) */}
        <div className="flex flex-col gap-2">
           <label className="text-[#070707] text-base">
           If any owners go by an alternative name(s), provide those details
          </label>
          <Select
            value={formData.country}
            onValueChange={value => handleChange("country", value)}
          >
            <SelectTrigger className="w-full px-3 py-4 !h-13 rounded-lg border border-[#d2d2d5] bg-white text-sm focus:outline-none focus:border-[#0068ef] ">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end items-center gap-4 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 rounded-lg border border-[#0068ef] flex items-center gap-1.5 text-[#0068ef] text-base font-medium cursor-pointer hover:bg-[#f5f8ff] transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex items-center gap-1.5 text-white text-base font-medium cursor-pointer hover:bg-[#0051bd] transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  )
}
