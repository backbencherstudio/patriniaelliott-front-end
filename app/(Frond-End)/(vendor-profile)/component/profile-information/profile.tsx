"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const vendorTypeOptions = [
  { value: "Property Manager", label: "Property Manager" },
  { value: "Real Estate Agent", label: "Real Estate Agent" },
  { value: "Property Owner", label: "Property Owner" },
];

interface FormData {
  firstName: string;
  email: string;
  phoneNumber: string;
  password: string;
  businessWebsite: string;
  vendorType: string;
  taxId: string;
  avatar?: File | null;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();
  const [avatarPreview, setAvatarPreview] = useState<string>("/vendor/avatar.png");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (data: FormData) => {
    // Attach avatar file to data
    data.avatar = avatarFile;
    console.log(data);
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className=" md:px-7 py-6 bg-white rounded-2xl flex flex-col md:flex-row flex-wrap justify-between items-start gap-4">
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-start">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-medium text-[#070707]">Profile Information</div>
              <div className="text-sm text-[#777980]">Update your info and get started as a vendor.</div>
            </div>
            <div className="w-[62px] h-[62px] relative mt-4 sm:mt-0">
              <img
                className="w-[46px] h-[46px] rounded-full object-cover"
                src={avatarPreview}
                alt="Vendor avatar"
              />
              <button
                type="button"
                className="w-5 h-5 absolute top-[31.5px] right-0 bg-[#0068ef] rounded-full flex items-center justify-center"
                onClick={handleAvatarClick}
                tabIndex={0}
                aria-label="Change avatar"
              >
                <img
                  src="/vendor/camera.svg"
                  alt="Camera icon"
                  className="w-[10.7px] h-[10.7px]"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </button>
            </div>
          </div>
          <div className="w-full md:w-[632px] px-4 py-3 bg-[#fffbee] rounded-xl flex gap-1.5 mt-4">
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

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="p-4 md:p-6 bg-white rounded-xl flex flex-col gap-6 my-10 w-full ">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
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

          <div className="flex flex-col gap-5 pb-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="text-base text-[#070707]">First name</div>
              <div className={`p-4 rounded-lg ${isEditing ? 'border' : 'outline-1'} ${isEditing ? 'border-[#e9e9ea]' : 'outline-[#e9e9ea]'} w-full`}>
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

            <div className="flex flex-col gap-2 w-full">
              <div className="text-base text-[#070707]">Email address</div>
              <div className={`p-4 rounded-lg ${isEditing ? 'border' : 'outline-1'} ${isEditing ? 'border-[#e9e9ea]' : 'outline-[#e9e9ea]'} w-full`}>
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

            <div className="flex flex-col gap-2 w-full">
              <div className="text-base text-[#070707]">Phone number</div>
              <div className={`p-4 rounded-lg ${isEditing ? 'border' : 'outline-1'} ${isEditing ? 'border-[#d2d2d5]' : 'outline-[#d2d2d5]'} w-full`}>
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

        <div className="p-4 md:p-6 bg-white rounded-xl flex flex-col gap-6 w-full ">
          <div className="text-2xl font-medium text-[#22262e]">Business Details</div>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full">
              <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
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
              </div>

              <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
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

            <div className="flex flex-col md:flex-row gap-4 flex-wrap w-full">
              <div className="w-full md:w-1/2 flex flex-col gap-2 min-w-[200px]">
                <div className="text-base text-[#070707]">Vendor Type</div>
                <div className="h-[50px] px-4 rounded-lg border border-[#e9e9ea] flex items-center justify-between">
                  {isEditing ? (
                    <Select
                      value={watch('vendorType')}
                      onValueChange={val => setValue('vendorType', val)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="w-full h-full p-0 border-none shadow-none bg-transparent outline-none">
                        <SelectValue placeholder="Select vendor type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vendorTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm text-[#777980]">{watch('vendorType') || 'Select vendor type'}</div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
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
          <div className="flex justify-end my-10 w-full max-w-3xl mx-auto">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg outline-1 outline-offset-[-1px] outline-[#0068ef] flex justify-center items-center gap-1.5"
            >
              <div className="text-[#0068ef] text-base font-medium">Save</div>
            </button>
          </div>
        )}
      </form>
    </>
  );
}
