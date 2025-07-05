import Image from 'next/image';

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

  // Step 3 - Manager's details
  propertyManager: string;
  governmentInvolvement: boolean;
}

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
}

export default function Step4({ onNext, onBack, currentStep, onStepClick, formData }: Step4Props) {
  const getStepStyle = (step: number) => {
    const isClickable = step <= currentStep;
    const isActive = step === currentStep;
    const baseStyle = "flex items-center gap-3 transition-opacity";
    const clickableStyle = isClickable ? "cursor-pointer hover:opacity-80" : "opacity-30";
    const activeStyle = isActive ? "" : "opacity-30";

    return `${baseStyle} ${isClickable ? clickableStyle : activeStyle}`;
  };

  return (
    <div className="flex flex-col gap-6">
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

      <div className=" p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className=" flex flex-col gap-6">
          <div className=" inline-flex justify-between items-center">
            <div className="text-[#22262e] text-2xl font-medium leading-normal">Review and submit your details</div>
            <button
              onClick={() => onStepClick(1)}
              className="pl-1.5 pr-2 py-1.5 rounded border border-[#0068ef] flex items-center gap-2 cursor-pointer hover:bg-[#f5f8ff] transition-colors"
            >
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
            <div className="text-[#22262e] text-2xl font-medium leading-normal">Owner's details</div>
            <button
              onClick={() => onStepClick(2)}
              className="pl-1.5 pr-2 py-1.5 rounded border border-[#0068ef] flex items-center gap-2 cursor-pointer hover:bg-[#f5f8ff] transition-colors"
            >
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
            </button>
          </div>

          <div className=" flex flex-col gap-2">
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Who owns the property?</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.ownershipType}</div>
            </div>
            <div className=" py-3 border-b border-[#e9e9ea] flex justify-between items-center">
              <div className="text-[#070707] text-sm leading-snug">Your Full Name</div>
              <div className="text-[#4a4c56] text-sm leading-snug">{`${formData.firstName} ${formData.lastName}`}</div>
            </div>
            {formData.alternativeName && (
              <div className=" pt-3 flex justify-between items-center">
                <div className="text-[#070707] text-sm leading-snug">Alternative Name</div>
                <div className="text-[#4a4c56] text-sm leading-snug">{formData.alternativeName}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className=" flex flex-col gap-6">
          <div className=" inline-flex justify-between items-center">
            <div className="text-[#22262e] text-2xl font-medium leading-normal">Manager's details</div>
            <button
              onClick={() => onStepClick(3)}
              className="pl-1.5 pr-2 py-1.5 rounded border border-[#0068ef] flex items-center gap-2 cursor-pointer hover:bg-[#f5f8ff] transition-colors"
            >
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
              <div className="text-[#4a4c56] text-sm leading-snug">{formData.governmentInvolvement ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-3">
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
          Submit
        </button>
      </div>
    </div>
  )
}
