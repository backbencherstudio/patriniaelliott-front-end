'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMyProfile } from '@/hooks/useMyProfile';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { LuPencilLine } from 'react-icons/lu';
import './my-profile-select.css';

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
  placeholder: string;
  icon: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  nationality: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: Date | null;
  country: string;
  streetAddress: string;
  aptSuite: string;
  city: string;
  stateProvince: string;
  zipCode: string;
  passportFirstName: string;
  passportLastName: string;
  issuingCountry: string;
  passportNumber: string;
  passportExpiryDate: Date | null;
  consent: boolean;
  profileImage: File | null;
}

export default function MyProfile() {
  const { register, control, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      displayName: '',
      nationality: '',
      email: '',
      phone: '',
      gender: '',
      dateOfBirth: null,
      country: '',
      streetAddress: '',
      aptSuite: '',
      city: '',
      stateProvince: '',
      zipCode: '',
      passportFirstName: '',
      passportLastName: '',
      issuingCountry: '',
      passportNumber: '',
      passportExpiryDate: null,
      consent: false,
      profileImage: null,
    }
  });

  const consentValue = watch('consent');

  // Add state for dropdown selections
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIssuingCountry, setSelectedIssuingCountry] = useState('');
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isIssuingCountryOpen, setIsIssuingCountryOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load authenticated user's profile and populate inputs
  const { me, loading: meLoading, updateMe, updateMeWithAvatar, fetchMe } = useMyProfile();

  useEffect(() => {
    if (!me) return;
    // Normalize API shape -> form fields
    setValue('firstName', me.first_name ?? me.name ?? '');
    setValue('lastName', me.last_name ?? '');
    setValue('displayName', me.display_name ?? '');
    setValue('nationality', me.nationality ?? '');
    setValue('email', me.email ?? '');
    setValue('phone', me.phone_number ?? '');
    setValue('gender', me.gender ?? '');
    setValue('dateOfBirth', me.date_of_birth ? new Date(me.date_of_birth) : null);
    setValue('country', me.country ?? '');
    setValue('streetAddress', me.street_address ?? '');
    setValue('aptSuite', me.apt_suite_unit ?? '');
    setValue('city', me.city ?? '');
    setValue('stateProvince', me.state ?? '');
    setValue('zipCode', me.zip_code ?? '');
    setValue('passportFirstName', me.passport_first_name ?? '');
    setValue('passportLastName', me.passport_last_name ?? '');
    setValue('issuingCountry', me.passport_issuing_country ?? '');
    setValue('passportNumber', me.passport_number ?? '');
    setValue('passportExpiryDate', me.passport_expiry_date ? new Date(me.passport_expiry_date) : null);
    // avatar preview if available - use avatar_url if available, otherwise use avatar
    if (me.avatar_url) {
      setPreviewImage(me.avatar_url);
    } else if (me.avatar) {
      setPreviewImage(me.avatar);
    }
  }, [me, setValue]);

  // Options for dropdowns
  const genderOptions = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
  const countryOptions = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 
    'Germany', 'France', 'Japan', 'China', 'India', 'Brazil',
    'Mexico', 'Spain', 'Italy', 'Netherlands', 'Singapore'
  ];

  // Custom dropdown component
  const CustomDropdown = ({ 
    options, 
    value, 
    onChange, 
    isOpen, 
    setIsOpen, 
    placeholder 
  }) => {
    return (
      <div className="relative">
        <div 
          className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-gray-500">{value || placeholder}</span>
          <Image 
            src="/usericon/downarrow.svg" 
            alt="Down Arrow" 
            width={16} 
            height={16} 
            className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-5 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Custom input component for the date picker ()
  const CustomDateInput = React.forwardRef<HTMLDivElement, CustomDateInputProps>(
    ({ value, onClick, placeholder, icon }, ref) => (
      <div
        className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex items-center gap-3 cursor-pointer"
        onClick={onClick}
        ref={ref}
      >
        <Image src={icon} alt="Calendar" width={20} height={20} />
        <span className="text-gray-500">{value || placeholder}</span>
      </div>
    )
  );

  CustomDateInput.displayName = 'CustomDateInput';

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        display_name: data.displayName,
        nationality: data.nationality,
        email: data.email,
        phone_number: data.phone,
        gender: data.gender || null,
        date_of_birth: data.dateOfBirth ? data.dateOfBirth.toISOString().split('T')[0] : null,
        country: data.country,
        street_address: data.streetAddress,
        apt_suite_unit: data.aptSuite,
        city: data.city,
        state: data.stateProvince,
        zip_code: data.zipCode,
        passport_first_name: data.passportFirstName,
        passport_last_name: data.passportLastName,
        passport_issuing_country: data.issuingCountry,
        passport_number: data.passportNumber,
        passport_expiry_date: data.passportExpiryDate ? data.passportExpiryDate.toISOString().split('T')[0] : null,
      };

      // Use updateMeWithAvatar if there's a profile image, otherwise use regular updateMe
      if (data.profileImage) {
        await updateMeWithAvatar(payload, data.profileImage);
      } else {
        await updateMe(payload);
      }
      
      await fetchMe();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const formValues = watch();


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
      <Toaster position="top-right" />
      {/* Profile Header */}
      <div className="p-7 bg-white rounded-2xl flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium">{me?.first_name} {me?.last_name}</h2>
          <p className="text-gray-500">Update your info and find out how it's used.</p>
        </div>
        <div className="relative">
          <div
            className="w-[46px] h-[46px] rounded-full relative border border-black/10 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors"
            title={isEditing ? "Click to change avatar" : "Click to edit profile"}
            onClick={() => {
              if (isEditing && fileInputRef.current) {
                fileInputRef.current.click();
              } else if (!isEditing) {
                // If not in edit mode, enter edit mode first
                setIsEditing(true);
              }
            }}
          >
            <Image
              src={previewImage || "/usericon/avatar.png"}
              alt="Profile"
              width={46}
              height={46}
              className="rounded-full w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default avatar if image fails to load
                e.currentTarget.src = "/usericon/avatar.png";
              }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  setValue('profileImage', file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
              disabled={!isEditing}
            />
          </div>
          <div
            className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            title={isEditing ? "Click to change avatar" : "Click to edit profile"}
            onClick={() => {
              if (isEditing && fileInputRef.current) {
                fileInputRef.current.click();
              } else if (!isEditing) {
                // If not in edit mode, enter edit mode first
                setIsEditing(true);
              }
            }}
          >
            <Image src="/usericon/camera.svg" alt="Camera" width={11} height={11} className="z-10" />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="md:p-6 p-4 bg-white rounded-xl">
        <div className="flex  justify-between mb-8 md:gap-4">
          <h2 className="text-xl md:text-2xl font-medium">Personal Information</h2>
          <button
            aria-label={isEditing ? "Cancel Edit" : "Edit Profile"}
            type="button"
            className="flex items-center gap-1 md:gap-2 bg-blue-600 whitespace-nowrap text-white px-2 py-1.5 rounded"
            onClick={() => {
              setIsEditing(prev => !prev);
              if (isEditing) {
                // Reset to original avatar when canceling
                if (me?.avatar_url) {
                  setPreviewImage(me.avatar_url);
                } else if (me?.avatar) {
                  setPreviewImage(me.avatar);
                } else {
                  setPreviewImage(null);
                }
                // Reset the file input
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                setValue('profileImage', null);
              }
            }}
          >
            <LuPencilLine />
            <span>{isEditing ? "Cancel" : "Edit"}</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Fields */}
          <div className="flex flex-col gap-2">
            <label className="text-base">First name</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="Elisabeth"
                {...register('firstName')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Last name</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="Sarah"
                {...register('lastName')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Display Name & Nationality */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Display name</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="Choose display name"
                {...register('displayName')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Nationality</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="American"
                {...register('nationality')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Email address</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="email"
                placeholder="elisabeth_sarah@gmail.com"
                {...register('email')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Phone number</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="tel"
                placeholder="+6726 664 074"
                {...register('phone')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Gender & Date */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Gender</label>
            <Controller
              name="gender"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange} disabled={!isEditing}>
                  <SelectTrigger className="select-input h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Date of birth</label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  dateFormat="dd/MM/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="DD/MM/YYYY"
                  customInput={
                    <CustomDateInput
                      icon="/usericon/calendar.svg"
                      placeholder="DD/MM/YYYY"
                    />
                  }
                  disabled={!isEditing}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="p-6 bg-white rounded-xl">
        <h2 className="text-xl md:text-2xl font-medium mb-8">Address Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country & Street */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange} disabled={!isEditing}>
                  <SelectTrigger className="select-input h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Street address</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="e.g. 123 Main St."
                {...register('streetAddress')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Apt & City */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Apt, suite. (optional)</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="e.g. Apt #123"
                {...register('aptSuite')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">City</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="e.g. America #123"
                {...register('city')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* State & Zip */}
          <div className="flex flex-col gap-2">
            <label className="text-base">State / Province / Region</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="e.g. State #123"
                {...register('stateProvince')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Zip code</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input
                type="text"
                placeholder="726 664 074"
                {...register('zipCode')}
                className="w-full text-gray-500 outline-none h-full leading-[56px]"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Passport Details */}
      <div className="p-6 bg-white rounded-xl">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4">Passport details</h2>
          <p className="text-gray-500">Save your passport details for use when booking your next stay, flight.</p>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-base">First name</label>
                <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                  <input
                    type="text"
                    placeholder="Elisabeth"
                    {...register('passportFirstName')}
                    className="w-full text-gray-500 outline-none h-full leading-[56px]"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base">Last name</label>
                <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                  <input
                    type="text"
                    placeholder="Sarah"
                    {...register('passportLastName')}
                    className="w-full text-gray-500 outline-none h-full leading-[56px]"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">Enter the name exactly as it's written on the passport or other official travel document.</p>
          </div>

          {/* Country & Passport */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base">Issuing country</label>
              <Controller
                name="issuingCountry"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange} disabled={!isEditing}>
                    <SelectTrigger className="select-input h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                      <SelectValue placeholder="Select issuing country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base">Passport number</label>
              <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                <input
                  type="text"
                  placeholder="Enter document number"
                  {...register('passportNumber')}
                  className="w-full text-gray-500 outline-none h-full leading-[56px]"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-base">Expiration date</label>
              <Controller
                name="passportExpiryDate"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                    placeholderText="DD/MM/YYYY"
                    minDate={new Date()}
                    customInput={
                      <CustomDateInput
                        icon="/usericon/calendar.svg"
                        placeholder="DD/MM/YYYY"
                      />
                    }
                    disabled={!isEditing}
                  />
                )}
              />
            </div>
            <p className="text-sm text-gray-500">We'll store this data safely and remove It after two years of inactivity.</p>
          </div>

          {/* Consent */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="checkbox"
                {...register('consent')}
                className="w-5 h-5 rounded border border-gray-400 cursor-pointer"
                disabled={!isEditing}
              />
              <div className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center pointer-events-none">
                {/* Custom checkmark */}
                <svg
                  className={`w-3 h-3 text-blue-600 ${consentValue ? 'opacity-100' : 'opacity-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-700">
              I consent to "TravelBooking" storing my passport information in accordance with the 
              <span className="text-blue-600 ml-1">privacy statement</span>.
            </p>
          </div>

          {/* Save Button */}
          {isEditing && (
            <button
              aria-label="Save Profile Changes"
              type="submit"
              className="w-fit px-8 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
