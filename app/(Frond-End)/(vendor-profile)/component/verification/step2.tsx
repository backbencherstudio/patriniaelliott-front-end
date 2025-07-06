import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from 'react-hook-form';
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

interface FormData {
  propertyName: string;
  address: string;
  unitNumber: string;
  zipCode: string;
  city: string;
  country: string;
  ownershipType: string;
  firstName: string;
  lastName: string;
  alternativeName: string;
  owners: Array<{ firstName: string; lastName: string }>;
  propertyManager: string;
  governmentInvolvement: string;
}

interface Step2Props {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step2({
  onNext,
  onBack,
  currentStep = 2,
  onStepClick = () => {},
  formData,
  updateFormData
}: Step2Props) {
  const { register, setValue, watch } = useFormContext();

  // Add another owner
  const handleAddOwner = () => {
    const currentOwners = watch('owners') || [];
    updateFormData({
      owners: [...currentOwners, { firstName: '', lastName: '' }]
    });
  };

  // Update owner fields
  const handleOwnerChange = (idx: number, field: 'firstName' | 'lastName', value: string) => {
    const currentOwners = watch('owners') || [];
    const updatedOwners = currentOwners.map((owner, i) =>
      i === idx ? { ...owner, [field]: value } : owner
    );
    updateFormData({ owners: updatedOwners });
  };

  // Handle other fields
  const handleChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const currentOwners = watch('owners') || [{ firstName: '', lastName: '' }];

  return (
    <div className="flex flex-col gap-4">
      <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />

      <div className="p-6 bg-white rounded-2xl flex flex-col gap-6">
        <div className="text-[#22262e] text-2xl font-medium">Owner's details</div>
        
        {/* Ownership Type Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-[#070707] text-base mb-1">Who owns the property?</label>
          <Select
            value={watch('ownershipType')}
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
        {currentOwners.map((owner, idx) => (
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

        {/* Alternative Name */}
        <div className="flex flex-col gap-2">
           <label className="text-[#070707] text-base">
           If any owners go by an alternative name(s), provide those details
          </label>
          <input
            {...register('alternativeName')}
            type="text"
            placeholder="Enter alternative name"
            className="px-5 py-4 rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
          />
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
          type="button"
          onClick={onNext}
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex items-center gap-1.5 text-white text-base font-medium cursor-pointer hover:bg-[#0051bd] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}
