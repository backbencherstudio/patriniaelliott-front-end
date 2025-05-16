import React from 'react';
import Image from 'next/image';

export default function MyProfile() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Profile Header */}
      <div className="p-7 bg-white rounded-2xl flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium">Elisabeth Sarah</h2>
          <p className="text-gray-500">Update your info and find out how it's used.</p>
        </div>
        <div className="relative">
          <div className="w-[46px] h-[46px] rounded-full border border-black/10">
            <Image src="/usericon/avatar.png" alt="Profile" width={46} height={46} className="rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full">
            <Image src="/usericon/camera.svg" alt="Camera" width={11} height={11} className="z-10" />
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="p-6 bg-white rounded-xl">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-medium">Personal Information</h2>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-2 py-1.5 rounded">
            <Image src="/usericon/edit.svg" alt="Edit" width={20} height={20} />
            <span>Edit</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name Fields */}
          <div className="flex flex-col gap-2">
            <label className="text-base">First name</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="Elisabeth" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Last name</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="Sarah" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>

          {/* Display Name & Nationality */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Display name</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="Choose display name" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Nationality</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="American" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Email address</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="email" placeholder="elisabeth_sarah@gmail.com" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Phone number</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="tel" placeholder="+6726 664 074" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>

          {/* Gender & Date */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Gender</label>
            <div className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex justify-between items-center">
              <span className="text-gray-500">Female</span>
              <Image src="/usericon/downarrow.svg" alt="Down Arrow" width={16} height={16} className="rotate-90" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Date of birth</label>
            <div className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex items-center gap-3">
              <Image src="/usericon/calendar.svg" alt="Calendar" width={20} height={20} />
              <span className="text-gray-500">DD/MM/YYYY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="p-6 bg-white rounded-xl">
        <h2 className="text-2xl font-medium mb-8">Address Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Country & Street */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Country</label>
            <div className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex justify-between items-center">
              <span className="text-gray-500">United states</span>
              <Image src="/usericon/downarrow.svg" alt="Down Arrow" width={16} height={16} className="rotate-90" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Street address</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="e.g. 123 Main St." className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>

          {/* Apt & City */}
          <div className="flex flex-col gap-2">
            <label className="text-base">Apt, suite. (optional)</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="e.g. Apt #123" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">City</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="e.g. America #123" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>

          {/* State & Zip */}
          <div className="flex flex-col gap-2">
            <label className="text-base">State / Province / Region</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="e.g. State #123" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base">Zip code</label>
            <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
              <input type="text" placeholder="726 664 074" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Passport Details */}
      <div className="p-6 bg-white rounded-xl">
        <div className="mb-8">
          <h2 className="text-2xl font-medium mb-4">Passport details</h2>
          <p className="text-gray-500">Save your passport details for use when booking your next stay, flight.</p>
        </div>

        <div className="flex flex-col gap-7">
          {/* Names Section */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-base">First name(s) <span className="text-red-500">*</span></label>
                <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                  <input type="text" placeholder="Elisabeth" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base">Last name(s) <span className="text-red-500">*</span></label>
                <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                  <input type="text" placeholder="Sarah" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">Enter the name exactly as it's written on the passport or other official travel document.</p>
          </div>

          {/* Country & Passport */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-base">Issuing country <span className="text-red-500">*</span></label>
              <div className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex justify-between items-center">
                <span className="text-gray-500">Select issuing country</span>
                <Image src="/usericon/downarrow.svg" alt="Down Arrow" width={16} height={16} className="rotate-90" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base">Passport number <span className="text-red-500">*</span></label>
              <div className="h-14 px-5 rounded-lg border border-gray-200 focus-within:border-blue-600">
                <input type="text" placeholder="Enter document number" className="w-full text-gray-500 outline-none h-full leading-[56px]" />
              </div>
            </div>
          </div>

          {/* Expiration Date */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-base">Expiration date <span className="text-red-500">*</span></label>
              <div className="h-14 px-5 py-3 rounded-lg border border-gray-200 focus-within:border-blue-600 flex items-center gap-3">
                <Image src="/usericon/calendar.svg" alt="Calendar" width={20} height={20} />
                <span className="text-gray-500">DD/MM/YYYY</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">We'll store this data safely and remove It after two years of inactivity.</p>
          </div>

          {/* Consent */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-gray-400"></div>
            <p className="text-gray-700">
              I consent to "TravelBooking" storing my passport information in accordance with the 
              <span className="text-blue-600 ml-1">privacy statement</span>.
            </p>
          </div>

          {/* Save Button */}
          <button className="w-fit px-8 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
