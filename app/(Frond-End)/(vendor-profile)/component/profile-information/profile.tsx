"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useVendorProfile } from '../../../../../hooks/useVendorProfile';
import { useMyProfile } from '../../../../../hooks/useMyProfile';

const vendorTypeOptions = [
  { value: "Property Manager", label: "Property Manager" },
  { value: "Real Estate Agent", label: "Real Estate Agent" },
  { value: "Property Owner", label: "Property Owner" },
];

interface FormData {
  firstName: string;
  email: string;
  phoneNumber: string;
  // password: string;
  address: string;
  businessWebsite: string;
  vendorType: string;
  taxId: string;
  avatar?: File | null;
}

interface VendorData {
  vendor_verification: {
    id: string;
    user_id: string;
    first_name: string;
    phone_number: string;
    business_website: string;
    vendor_type: string;
    TIN: string;
    property_name: string;
    address: string;
    unit_number: string;
    postal_code: string;
    city: string;
    country: string;
    owner_type: string;
    owner_first_name: string;
    owner_last_name: string;
    owner_phone_numbers: string;
    owner_alt_names: string;
    manager_name: string;
    is_govt_representation: boolean;
    payment_method: string;
    payment_email: string;
    payment_account_name: string;
    payment_TIN: string;
    billing_address: string;
    status: string;
    created_at: string;
    updated_at: string;
    verified_at: string | null;
  };
  user_info: {
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    country: string;
    city: string;
    address: string;
    zip_code: string;
    gender: string;
    date_of_birth: string;
    nationality: string;
    passport_number: string;
    passport_first_name: string;
    passport_last_name: string;
    passport_issuing_country: string;
    passport_expiry_date: string;
    street_address: string;
    apt_suite_unit: string;
    display_name: string;
    state: string;
    type: string;
    created_at: string;
    updated_at: string;
    avatar?: string;
    avatar_url?: string;
  };
  has_verification: boolean;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      email: '',
      phoneNumber: '',
      address: '',
      businessWebsite: '',
      vendorType: '',
      taxId: ''
    }
  });
  const [avatarPreview, setAvatarPreview] = useState<string>("/vendor/avatar.png");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUploading, setAvatarUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the vendor profile hook
  const vendorId = "cmfz8mc480019jv5c9w296eoh"; // Updated to match API response
  const { vendorData, loading, error, fetchVendorData, updateVendorData } = useVendorProfile(vendorId);

  // Get current logged-in user to use their id as vendor_id for packages
  const { me } = useMyProfile();
  const currentUserId = me?.id || me?.data?.id || null;

  // State for "Your Submitted Packages"
  const [packages, setPackages] = useState<any[] | null>(null);
  const [packagesLoading, setPackagesLoading] = useState<boolean>(false);
  const [packagesError, setPackagesError] = useState<string | null>(null);

  // Fetch packages by user id from external admin endpoint
  const fetchMyPackages = async () => {
    if (!currentUserId) return;
    try {
      setPackagesLoading(true);
      setPackagesError(null);
      const url = `https://https://humanitarian-crimes-too-producing.trycloudflare.com/api/admin/package/my-packages?vendor_id=${currentUserId}`;
      const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
      const data = await res.json().catch(() => null);
      const list = data?.data ?? data ?? [];
      setPackages(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setPackagesError(e?.message || 'Failed to load packages');
      setPackages([]);
    } finally {
      setPackagesLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  // Populate form when vendor data is loaded
  useEffect(() => {
    if (!vendorData) {
      return;
    }
    
    
    
    // Populate form with vendor data from new API structure
    const firstName = vendorData.vendor_verification?.first_name || vendorData.user_info?.first_name || '';
    const email = vendorData.user_info?.email || '';
    const phoneNumber = vendorData.vendor_verification?.phone_number || vendorData.user_info?.phone_number || '';
    
    // Business Details - get from vendor_verification
    const address = vendorData.vendor_verification?.address || vendorData.user_info?.address || '';
    const businessWebsite = vendorData.vendor_verification?.business_website || '';
    const vendorType = vendorData.vendor_verification?.vendor_type || '';
    const taxId = vendorData.vendor_verification?.TIN || '';
    
    // Set avatar preview from avatar_url or avatar field
    if (vendorData.user_info?.avatar_url) {
      setAvatarPreview(vendorData.user_info.avatar_url);
    } else if (vendorData.user_info?.avatar) {
      // If we have avatar filename but no URL, construct the URL
      const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || "https://honors-whale-even-inspiration.trycloudflare.com";
      setAvatarPreview(`${baseUrl}/public/storage/avatar/${vendorData.user_info.avatar}`);
    } else {
      // Keep default avatar if no avatar is set
      setAvatarPreview("/vendor/avatar.png");
    }
    
    
    
    setValue('firstName', firstName);
    setValue('email', email);
    setValue('phoneNumber', phoneNumber);
    setValue('address', address);
    setValue('businessWebsite', businessWebsite);
    setValue('vendorType', vendorType);
    setValue('taxId', taxId);
    
  }, [vendorData, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!vendorData?.vendor_verification?.id) {
        return;
      }

      // Prepare update data for the new API structure
      const updateData: any = {
        first_name: data.firstName,
        phone_number: data.phoneNumber,
        business_website: data.businessWebsite,
        vendor_type: data.vendorType,
        TIN: data.taxId,
        address: data.address,
        // User info updates should be sent separately or in the same level
        email: data.email,
      };

      // Add avatar file if selected
      if (avatarFile) {
        updateData.avatar = avatarFile;
        setAvatarUploading(true);
      }

      

      // Update vendor profile using the hook
      const result = await updateVendorData(updateData);
      
      // Update avatar preview if avatar was uploaded
      if (avatarFile && result?.data?.user_info?.avatar_url) {
        setAvatarPreview(result.data.user_info.avatar_url);
      }
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      
    } catch (error: any) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setAvatarUploading(false);
    }
  };

  // Show error if API fails
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-600">Loading profile information...</div>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes('not logged in') || error.includes('session has expired');
    
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error}</div>
          <div className="flex gap-3 justify-center">
            {isAuthError ? (
              <>
                <button
                  aria-label="Go to Login"
                  onClick={() => window.location.href = '/auth/login'}
                  className="bg-blueColor text-white px-4 py-2 rounded-lg hover:bg-[#0051bc] transition-colors"
                >
                  Go to Login
                </button>
                <button
                  aria-label="Clear Cookies and Retry"
                  onClick={() => {
                    // Clear any stale tokens and reload
                    document.cookie.split(";").forEach(function(c) { 
                      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                    });
                    window.location.reload();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear Cookies & Retry
                </button>
              </>
            ) : (
              <button
                aria-label="Retry"
                onClick={() => fetchVendorData()}
                className="bg-blueColor text-white px-4 py-2 rounded-lg hover:bg-[#0051bc] transition-colors"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className=" md:px-7 py-6 bg-white rounded-2xl  gap-4">
                  <div className="flex flex-col gap-3 p-3 w-full md:w-auto">
            <div className="flex   gap-3 w-full md:w-auto items-start md:justify-between">
              <div className="flex flex-col gap-4">
                <div className="text-2xl font-medium text-[#070707]">Profile Information</div>
                <div className="text-sm text-[#777981]">Update your info and get started as a vendor.</div>
              </div>
                            <div className="flex gap-2">
                {/* Debug button for development */}
                {process.env.NODE_ENV === 'development' && (
                  <>


                  </>
                )}
              </div>
              <div className=" relative  sm:mt-0">
              <Image
                className="w-[46px]  h-[46px]  rounded-full object-cover"
                src={avatarPreview}
                alt="Vendor avatar"
                width={62}
                height={62}
              />
              <button
                type="button"
                className={`w-5 h-5 absolute top-[25.5px] right-0.5 md:-right-1.5 bg-[#0068ef] rounded-full flex items-center justify-center ${isEditing ? 'cursor-pointer hover:bg-[#0051bc]' : 'cursor-not-allowed opacity-50'}`}
                onClick={handleAvatarClick}
                tabIndex={0}
                aria-label={isEditing ? "Change avatar" : "Avatar editing disabled"}
                disabled={!isEditing}
              >
                {avatarUploading ? (
                  <div className="w-[10.7px] h-[10.7px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Image
                    src="/vendor/camera.svg"
                    alt="Camera icon"
                    className="w-[10.7px] h-[10.7px]"
                    width={20}
                    height={20}
                  />
                )}
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
        </div>
      </div>

      <form key={`${vendorData?.id || 'loading'}-${JSON.stringify(vendorData)}`} onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="p-4 md:p-6 bg-white rounded-xl flex flex-col gap-6 my-10 w-full ">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="text-2xl font-medium text-[#22262e]">Personal Information</div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  
                  // Force form to re-populate with current data
                  if (vendorData) {
                    
                    const firstName = vendorData.vendor_verification?.first_name || vendorData.user_info?.first_name || '';
                    const email = vendorData.user_info?.email || '';
                    const phoneNumber = vendorData.vendor_verification?.phone_number || vendorData.user_info?.phone_number || '';
                    const address = vendorData.vendor_verification?.address || vendorData.user_info?.address || '';
                    const businessWebsite = vendorData.vendor_verification?.business_website || '';
                    const vendorType = vendorData.vendor_verification?.vendor_type || '';
                    const taxId = vendorData.vendor_verification?.TIN || '';
                    
                    setValue('firstName', firstName);
                    setValue('email', email);
                    setValue('phoneNumber', phoneNumber);
                    setValue('address', address);
                    setValue('businessWebsite', businessWebsite);
                    setValue('vendorType', vendorType);
                    setValue('taxId', taxId);
                    
                  }
                }}
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
                    defaultValue={vendorData?.vendor_verification?.first_name || vendorData?.user_info?.first_name || ''}
                  />
                ) : (
                  <div className="text-sm text-[#777980]">{vendorData?.vendor_verification?.first_name || vendorData?.user_info?.first_name || 'Enter your first name'}</div>
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
                    defaultValue={vendorData?.user_info?.email || ''}
                  />
                ) : (
                  <div className="text-sm text-[#777980]">{vendorData?.user_info?.email || 'Enter your email address'}</div>
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
                    defaultValue={vendorData?.vendor_verification?.phone_number || vendorData?.user_info?.phone_number || ''}
                  />
                ) : (
                  <div className="text-sm text-[#777980]">{vendorData?.vendor_verification?.phone_number || vendorData?.user_info?.phone_number || 'Enter your phone number'}</div>
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
                  <div className="text-base text-[#070707]">Address</div>
                  <div className="h-[50px] px-4 rounded-lg border border-[#e9e9ea] flex items-center">
                    {isEditing ? (
                      <input
                        {...register('address')}
                        type="text"
                        className="flex-1 text-sm bg-transparent outline-none"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="flex-1 text-sm text-[#777980]">
                        {vendorData?.vendor_verification?.address || vendorData?.user_info?.address || 'Enter your address'}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                <div className="flex gap-0.5">
                  <div className="text-base text-[#070707]">Business website</div>
                  <div className="text-base text-[#777980]">(optional)</div>
                </div>
                <div className="h-[50px] px-4 rounded-lg border border-[#e9e9ea] flex items-center">
                  {isEditing ? (
                    <input
                      {...register('businessWebsite')}
                      type="text"
                      className="flex-1 text-sm bg-transparent outline-none"
                      placeholder="Enter business website"
                      defaultValue={vendorData?.vendor_verification?.business_website || ''}
                    />
                  ) : (
                    <div className="flex-1 text-sm text-[#777980]">{vendorData?.vendor_verification?.business_website || 'Enter business website'}</div>
                  )}
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
                    <div className="text-sm text-[#777980]">{vendorData?.vendor_verification?.vendor_type || watch('vendorType') || 'Select vendor type'}</div>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                <div className="text-base text-[#070707]">Business Tax Identification Number</div>
                <div className="h-[50px] px-4 rounded-lg border border-[#d2d2d5] flex items-center">
                  {isEditing ? (
                    <input
                      {...register('taxId')}
                      type="text"
                      className="flex-1 text-sm bg-transparent outline-none"
                      placeholder="Enter business tax ID"
                      defaultValue={vendorData?.vendor_verification?.TIN || ''}
                    />
                  ) : (
                    <div className="flex-1 text-sm text-[#777980]">{vendorData?.vendor_verification?.TIN || 'Enter business tax ID'}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className='flex justify-end gap-3 mt-4'>
            <button
              aria-label="Cancel Changes"
              type="button"
                              onClick={() => {
                  setIsEditing(false);
                  
                  // Reset form to original vendor data
                  if (vendorData) {
                    
                    const firstName = vendorData.vendor_verification?.first_name || vendorData.user_info?.first_name || '';
                    const email = vendorData.user_info?.email || '';
                    const phoneNumber = vendorData.vendor_verification?.phone_number || vendorData.user_info?.phone_number || '';
                    const address = vendorData.vendor_verification?.address || vendorData.user_info?.address || '';
                    const businessWebsite = vendorData.vendor_verification?.business_website || '';
                    const vendorType = vendorData.vendor_verification?.vendor_type || '';
                    const taxId = vendorData.vendor_verification?.TIN || '';
                    
                    setValue('firstName', firstName);
                    setValue('email', email);
                    setValue('phoneNumber', phoneNumber);
                    setValue('address', address);
                    setValue('businessWebsite', businessWebsite);
                    setValue('vendorType', vendorType);
                    setValue('taxId', taxId);
                    
                  }
                }}
              className="md:mt-4 bg-gray-500 text-white py-2 md:py-3 px-5 md:px-8 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              aria-label="Save Changes"
              type="submit"
              disabled={loading || avatarUploading}
              className="md:mt-4 bg-blueColor text-white py-2 md:py-3 px-5 md:px-8 rounded-lg hover:bg-[#0051bc] transition-colors disabled:opacity-50"
            >
              {loading || avatarUploading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </form>
    </>
  );
}
