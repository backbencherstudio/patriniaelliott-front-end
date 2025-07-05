import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from 'react-hook-form';
import StepIndicator from './StepIndicator';

const MANAGER_TYPES = [
  "Self-managed",
  "Professional manager",
  "Management company",
  "Other"
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

interface Step3Props {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step3({
  onNext,
  onBack,
  currentStep = 3,
  onStepClick = () => {},
  formData,
  updateFormData
}: Step3Props) {
  const { watch } = useFormContext();

  const handleChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />

      <div className="p-6 bg-white rounded-2xl flex flex-col gap-6">
        <div className="text-[#22262e] text-2xl font-medium">Manager's details</div>
        
        {/* Manager Type Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-[#070707] text-base mb-1">Who manages the property?</label>
          <Select
            value={watch('propertyManager')}
            onValueChange={value => handleChange("propertyManager", value)}
          >
            <SelectTrigger className="w-full px-5 py-4 rounded-lg border border-[#d2d2d5] bg-white text-sm focus:outline-none focus:border-[#0068ef] h-auto">
              <SelectValue placeholder="Select manager type" />
            </SelectTrigger>
            <SelectContent>
              {MANAGER_TYPES.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Government Involvement */}
        <div className="flex flex-col gap-2">
          <label className="text-[#070707] text-base mb-1">
            Is a government agency, government official, or close family members of a government official involved in the ownership, control, or management of the accommodation?
          </label>
          <Select
            value={watch('governmentInvolvement')}
            onValueChange={value => handleChange("governmentInvolvement", value)}
          >
            <SelectTrigger className="w-full px-5 py-4 rounded-lg border border-[#d2d2d5] bg-white text-sm focus:outline-none focus:border-[#0068ef] h-auto">
              <SelectValue placeholder="Select answer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
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
