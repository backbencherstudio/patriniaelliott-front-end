import { BiEditAlt } from "react-icons/bi";
import StepIndicator from './StepIndicator';
interface FormData {
  // Step 1 - Property details
  propertyName: string;
  address: string;
  unitNumber: string;
  zipCode: string;
  city: string;
  country: string;

  // Step 2 - Owner's details
  ownershipType: string;
  firstName: string;
  lastName: string;
  alternativeName: string;
  owners: Array<{ firstName: string; lastName: string }>;

  // Step 3 - Manager's details
  propertyManager: string;
  governmentInvolvement: string;
}

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  isSubmitting?: boolean;
}

export default function Step4({ onNext, onBack, currentStep, onStepClick, formData, updateFormData, isSubmitting = false }: Step4Props) {
  const getStepStyle = (step: number) => {
    const isClickable = step <= currentStep;
    const isActive = step === currentStep;
    const baseStyle = "flex items-center gap-3 transition-opacity";
    const clickableStyle = isClickable ? "cursor-pointer hover:opacity-80" : "opacity-30";
    const activeStyle = isActive ? "" : "opacity-30";

    return `${baseStyle} ${isClickable ? clickableStyle : activeStyle}`;
  };

  const handleSubmit = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      'Are you sure you want to submit your vendor verification? Please make sure all information is correct.'
    );
    
    if (isConfirmed) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex justify-center">
     <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />
      </div>

      <div className=" md:p-6 p-4 bg-white rounded-xl flex flex-col gap-6">
        <div className=" flex flex-col gap-6">
          <div className=" inline-flex justify-between items-center">
            <div className="text-[#22262e] text-lg md:text-2xl font-medium leading-normal">Review and submit your details</div>
            <button
              aria-label="Edit Step 1"
              onClick={() => onStepClick(1)}
              className="text-[#0068ef] py-1.5 px-1.5 gap-1 rounded border border-[#0068ef] flex items-center  cursor-pointer hover:bg-[#f5f8ff] transition-colors"
            >
        
              <BiEditAlt/>
                <div className=" text-sm leading-[14px]">Edit</div>
            
            </button>
          </div>

          <div className=" flex flex-col gap-2">
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Full name of the accommodation</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.propertyName}</div>
            </div>
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Address (street name and house number)</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.address}</div>
            </div>
            {formData.unitNumber && (
              <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
                <div className="text-[#070707] text-sm leading-snug">Unit number</div>
                <div className="text-[#4a4c56] text-sm leading-snug">{formData.unitNumber}</div>
              </div>
            )}
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Zip code</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.zipCode}</div>
            </div>
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Town/City</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.city}</div>
            </div>
            <div className=" pt-3 border-b flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Country</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.country}</div>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className=" flex flex-col gap-6">
          <div className=" inline-flex justify-between items-center">
            <div className="text-[#22262e] text-lg md:text-2xl font-medium leading-normal">Owner's details</div>
            <button
              aria-label="Edit Step 2"
              onClick={() => onStepClick(2)}
              className="text-[#0068ef] py-1.5 px-1.5 gap-1 rounded border border-[#0068ef] flex items-center  cursor-pointer hover:bg-[#f5f8ff] transition-colors"
            >
        
              <BiEditAlt/>
                <div className=" text-sm leading-[14px]">Edit
              </div>
            </button>
          </div>

          <div className=" flex flex-col gap-2">
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Who owns the property?</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.ownershipType}</div>
            </div>
            {formData.owners && formData.owners.length > 0 && formData.owners.map((owner, index) => (
              <div key={index} className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
                <div className="text-[#070707] text-sm leading-snug">Owner {index + 1}</div>
                <div className="text-[#4a4c56] text-sm leading-snug">{`${owner.firstName} ${owner.lastName}`}</div>
              </div>
            ))}
            {formData.alternativeName && (
              <div className=" pt-3 flex justify-between items-center">
                <div className="text-[#070707] text-sm leading-snug">Alternative Name</div>
                <div className="text-[#4a4c56] text-sm leading-snug">{formData.alternativeName}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" md:p-6 p-4 bg-white rounded-xl flex flex-col gap-6">
        <div className=" flex flex-col gap-6">
          <div className=" inline-flex justify-between items-center">
            <div className="text-[#22262e] text-lg md:text-2xl font-medium leading-normal">Manager's details</div>
            <button
              aria-label="Edit Step 3"
              onClick={() => onStepClick(3)}
              className="text-[#0068ef] py-1.5 px-1.5 gap-1 rounded border border-[#0068ef] flex items-center  cursor-pointer hover:bg-[#f5f8ff] transition-colors"
            >
        
              <BiEditAlt/>
                <div className=" text-sm leading-[14px]">Edit</div>
          
            </button>
          </div>

          <div className=" flex flex-col gap-2">
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Who manages the property?</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.propertyManager}</div>
            </div>
            <div className=" pt-3 flex justify-between items-center">
              <div className="w-[666px] text-[#070707] text-sm leading-snug">
                Is a government agency, government official, or close family members of a
                government official involved in the ownership, control, or management of the
                accommodation?
              </div>
              <div className="text-[#4a4c56] text-sm leading-snug">
                {formData.governmentInvolvement === 'yes' ? 'Yes' : formData.governmentInvolvement === 'no' ? 'No' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-3">
        <button
          aria-label="Previous Step"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-8 py-3 rounded-lg border border-[#0068ef] flex items-center gap-1.5 text-[#0068ef] text-base font-medium cursor-pointer hover:bg-[#f5f8ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          aria-label="Submit Verification"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 bg-[#0068ef] rounded-lg flex items-center gap-1.5 text-white text-base font-medium cursor-pointer hover:bg-[#0051bd] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  )
}
