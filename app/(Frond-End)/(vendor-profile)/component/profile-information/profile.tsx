import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string;
  email: string;
  phoneNumber: string;
  password: string;
  businessWebsite: string;
  vendorType: string;
  taxId: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsEditing(false);
  };

  return (
    <>
      <div className="self-stretch px-7 py-6 bg-white rounded-2xl outline-1 outline-offset-[-1px] flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-3">
          <div className="self-stretch flex gap-3">
            <div className="flex-1 flex flex-col gap-4">
              <div className="text-2xl font-medium text-[#070707]">Profile Information</div>
              <div className="text-sm text-[#777980]">Update your info and get started as a vendor.</div>
            </div>
            <div className="w-[62px] h-[62px] relative">
              <div className="w-[46px] h-[46px] left-[8px] top-0 absolute">
                <img 
                  className="w-[46px] h-[46px] rounded-full" 
                  src="/vendor/avatar.png" 
                  alt="Vendor avatar"
                />
                <div className="w-2.5 h-4 left-[18px] top-[15px] absolute outline-2 outline-[#1a1d2a]" />
              </div>
              <div className="w-5 h-5 left-[37px] top-[31.50px] absolute bg-[#0068ef] rounded-full">
                <img 
                  src="/vendor/camera.svg" 
                  alt="Camera icon"
                  className="w-[10.70px] h-[10.70px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
          <div className="w-[632px] px-4 py-3 bg-[#fffbee] rounded-xl flex gap-1.5">
            <img 
              src="/vendor/error.svg" 
              alt="Error icon"
              className="w-4 h-4"
            />
            <div className="flex-1 text-sm text-[#fe5050]">
              Complete vendor verification to comply with various legal and regulatory requirements.
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6 my-10">
          <div className="flex justify-between items-start">
            <div className="text-2xl font-medium text-[#22262e]">Personal Information</div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="pl-1.5 pr-2 py-1.5 bg-[#0068ef] rounded flex items-center gap-2"
              >
                <img 
                  src="/vendor/edit.svg" 
                  alt="Edit icon"
                  className="w-5 h-5"
                />
                <div className="text-sm text-white">Edit</div>
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-5 pb-4">
            <div className="h-[70px] flex flex-col gap-2">
              <div className="text-base text-[#070707]">First name</div>
              <div className={`p-4 rounded-lg ${isEditing ? 'border' : 'outline-1'} ${isEditing ? 'border-[#e9e9ea]' : 'outline-[#e9e9ea]'}`}>
                {isEditing ? (
                  <input
                    {...register('firstName')}
                    className="w-full text-sm bg-transparent outline-none"
                    placeholder="Enter your first name"
                  />
                ) : (
                  <div className="text-sm text-[#777980]">Enter your first name</div>
                )}
              </div>
            </div>

            <div className="h-[70px] flex flex-col gap-2">
              <div className="text-base text-[#070707]">Email address</div>
              <div className={`p-4 rounded-lg ${isEditing ? 'border' : 'outline-1'} ${isEditing ? 'border-[#e9e9ea]' : 'outline-[#e9e9ea]'}`}>
                {isEditing ? (
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full text-sm bg-transparent outline-none"
                    placeholder="Enter your email address"
                  />
                ) : (
                  <div className="text-sm text-[#777980]">Enter your email address</div>
                )}
              </div>
            </div>

            <div className="h-[70px] flex flex-col gap-2">
              <div className="text-base text-[#070707]">Phone number</div>
              <div className={`p-4 rounded-lg ${isEditing ? 'border' : 'outline-1'} ${isEditing ? 'border-[#d2d2d5]' : 'outline-[#d2d2d5]'}`}>
                {isEditing ? (
                  <input
                    {...register('phoneNumber')}
                    className="w-full text-sm bg-transparent outline-none"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="text-sm text-[#777980]">Enter your phone number</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch p-6 bg-white rounded-xl flex flex-col gap-6">
          <div className="text-2xl font-medium text-[#22262e]">Business Details</div>
          
          <div className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div className="text-base text-[#070707]">Password</div>
                  <div className="h-[50px] px-4 rounded-lg border border-[#e9e9ea] flex items-center">
                    {isEditing ? (
                      <input 
                        {...register('password')}
                        type="password"
                        className="flex-1 text-sm bg-transparent outline-none"
                        placeholder="Enter your password"
                      />
                    ) : (
                      <input 
                        type="password"
                        className="flex-1 text-sm text-[#777980] bg-transparent outline-none"
                        placeholder="Enter your password"
                        readOnly
                      />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-[5px]">
                  <img 
                    src="/vendor/whiteerror.svg"
                    alt="Info icon"
                    className="w-4 h-4"
                  />
                  <div className="text-sm text-[#777980]">Applicable for those that operate under a company</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex gap-0.5">
                  <div className="text-base text-[#070707]">Business website</div>
                  <div className="text-base text-[#777980]">(optional)</div>
                </div>
                <div className="h-[50px] px-4 rounded-lg border border-[#e9e9ea]">
                  <input 
                    {...register('businessWebsite')}
                    type="text"
                    className="w-full h-full text-sm text-[#777980] bg-transparent outline-none"
                    placeholder="Enter business website"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-[448px] flex flex-col gap-2">
                <div className="text-base text-[#070707]">Vendor Type</div>
                <div className="h-[50px] px-4 rounded-lg border border-[#e9e9ea] flex items-center justify-between">
                  {isEditing ? (
                    <select 
                      {...register('vendorType')}
                      className="w-full text-sm bg-transparent outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Select vendor type</option>
                      <option value="Property Manager">Property Manager</option>
                      <option value="Real Estate Agent">Real Estate Agent</option>
                      <option value="Property Owner">Property Owner</option>
                    </select>
                  ) : (
                    <>
                      <div className="text-sm text-[#777980]">Select vendor type</div>
                      <img 
                        src="/vendor/downarrow.svg"
                        alt="Dropdown icon"
                        className="w-4 h-4"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <div className="text-base text-[#070707]">Business Tax Identification Number</div>
                <div className="h-[50px] px-4 rounded-lg border border-[#d2d2d5] flex items-center">
                  <input 
                    {...register('taxId')}
                    type="text"
                    className="w-full text-sm text-[#777980] bg-transparent outline-none"
                    placeholder="Enter business tax ID"
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end my-10">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg outline-1 outline-offset-[-1px] outline-[#0068ef] flex justify-center items-center gap-1.5 overflow-hidden"
            >
              <div className="justify-start text-[#0068ef] text-base font-medium font-['Inter'] leading-none">Save</div>
            </button>
          </div>
        )}
      </form>
    </>
  )
}
