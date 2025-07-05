import Image from 'next/image';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { COUNTRIES } from '../../vendor-verification/constants';
import StepIndicator from './StepIndicator';

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

interface Step1Props {
  onNext: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export default function Step1({ onNext, currentStep, onStepClick, formData, updateFormData }: Step1Props) {
  const { register, watch, setValue } = useFormContext();
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const selectedCountry = watch('country');

  return (
    <div className="flex flex-col gap-4">
      <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />

      <div className=" p-6 bg-white rounded-xl flex flex-col gap-6">
        <div className=" px-4 py-3 bg-[#fffbee] rounded-xl flex gap-1.5">
          <div className="flex gap-2.5">
            <Image
              src="/vendor/error.svg"
              alt="Error icon"
              width={16}
              height={16}
            />
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-[#fe5050] text-sm leading-[14px]">Property address</div>
              <div className="text-[#777980] text-sm leading-[14px]">Make sure you provide us your property's registered address.</div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col gap-6">
          <div className="text-[#22262e] text-2xl font-medium leading-[30.24px]">Property details</div>
          <div className=" flex flex-col gap-3">
            <div className=" flex flex-col gap-3">
              <div className=" flex items-center gap-2">
                <div className="text-[#070707] text-base leading-none">Full name of the accommodation</div>
              </div>
              <input
                {...register('propertyName')}
                type="text"
                placeholder="Enter accommodation name"
                className=" px-5 py-[15px] rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
              />
            </div>

            <div className=" flex flex-col gap-3">
              <div className=" flex items-center gap-2">
                <div className="text-[#070707] text-base leading-none">Address (street name and house number)</div>
              </div>
              <input
                {...register('address')}
                type="text"
                placeholder="Enter street address"
                className=" px-5 py-[15px] rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
              />
            </div>

            <div className=" flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <div className="text-[#070707] text-base leading-none">Unit number</div>
                <div className="text-[#777980] text-base leading-none">(optional)</div>
              </div>
              <input
                {...register('unitNumber')}
                type="text"
                placeholder="Enter unit number"
                className=" px-5 py-[15px] rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
              />
            </div>

            <div className=" flex gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-[#070707] text-base leading-none">Zip code</div>
                <input
                  {...register('zipCode')}
                  type="text"
                  placeholder="Enter zip code"
                  className=" px-5 py-[15px] rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-[#070707] text-base leading-none">Town/City</div>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Enter city name"
                  className=" px-5 py-[15px] rounded-lg border border-[#d2d2d5] text-sm focus:outline-none focus:border-[#0068ef]"
                />
              </div>
            </div>

            <div className=" flex flex-col gap-3">
              <div className="text-[#070707] text-base leading-none">Country</div>
              <div className="relative">
                <div
                  className=" px-5 py-[15px] rounded-lg border border-[#d2d2d5] cursor-pointer hover:border-[#0068ef] transition-colors"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                >
                  <div className=" flex justify-between items-center">
                    <div className="text-[#070707] text-sm">
                      {selectedCountry || 'Select country'}
                    </div>
                    <Image
                      src="/vendor/downarrow.svg"
                      alt="Down arrow"
                      width={16}
                      height={16}
                      className={`transition-transform ${isCountryDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </div>
                </div>
                {isCountryDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-[#d2d2d5] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {COUNTRIES.map((country) => (
                      <div
                        key={country}
                        className="px-5 py-3 hover:bg-[#f5f8ff] cursor-pointer text-sm"
                        onClick={() => {
                          setValue('country', country);
                          setIsCountryDropdownOpen(false);
                        }}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full mt-5">
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

