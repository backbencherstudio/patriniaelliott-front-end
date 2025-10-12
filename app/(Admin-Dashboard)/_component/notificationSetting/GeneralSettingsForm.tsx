"use client";

import { useForm } from "react-hook-form";

const cancellationOptions = [
  "Failure to check in or attend without cancellation results in no refund",
  "Non-refundable after 24 hours",
  "Approved refunds (if applicable) are processed within 5-10 business days after cancellation",
  "Modification Instead of Cancellation",
];

type FormData = {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  bookingPolicy: string;
};

export default function GeneralSettingsForm() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <h2 className="text-xl font-semibold">General Settings</h2>

      {/* Site Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Site Name</label>
        <input
          {...register("siteName")}
          type="text"
          placeholder="Travel Booking"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Site Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Site Description</label>
        <input
          {...register("siteDescription")}
          type="text"
          placeholder="Your Ultimate Travel Booking Platform"
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Contact Email</label>
          <input
            {...register("contactEmail")}
            type="email"
            placeholder="support@travelbooking.com"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Phone</label>
          <input
            {...register("contactPhone")}
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      {/* Booking Cancellation Policy */}
      <div>
        <label className="block text-sm font-medium mb-1">Booking Cancellation Policy</label>
        <select
          {...register("bookingPolicy")}
          className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          {cancellationOptions.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        aria-label="Save Settings"
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Settings
      </button>
    </form>
  );
}

