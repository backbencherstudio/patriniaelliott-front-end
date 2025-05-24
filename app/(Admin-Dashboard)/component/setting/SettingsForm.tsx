"use client";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

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
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      siteName: "Travel Booking",
      siteDescription: "Your Ultimate Travel Booking Platform",
      contactEmail: "support@travelbooking.com",
      contactPhone: "+1 (555) 123-4567",
      bookingPolicy: cancellationOptions[1],
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-1">
      <div className="space-y-4 bg-white rounded-2xl p-6">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">General Settings</h3>

        {/* Site Name */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Site Name</label>
          <Controller
            name="siteName"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 placeholder:text-grayColor1 text-[#777980]"
                placeholder="Travel Booking"
              />
            )}
          />
        </div>

        {/* Site Description */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Site Description</label>
          <Controller
            name="siteDescription"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 placeholder:text-grayColor1 text-[#777980]"
                placeholder="Your Ultimate Travel Booking Platform"
              />
            )}
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Contact Email</label>
            <Controller
              name="contactEmail"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  {...field}
                  className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 placeholder:text-grayColor1 text-[#777980]"
                  placeholder="support@travelbooking.com"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Contact Phone</label>
            <Controller
              name="contactPhone"
              control={control}
              render={({ field }) => (
                <input
                  type="tel"
                  {...field}
                  className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 placeholder:text-grayColor1 text-[#777980]"
                  placeholder="+1 (555) 123-4567"
                />
              )}
            />
          </div>
        </div>

        {/* Booking Cancellation Policy */}
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Booking Cancellation Policy</label>
          <Controller
            name="bookingPolicy"
            control={control}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border rounded-lg px-3 py-2 lg:py-3 !h-10 lg:!h-12 mt-2 placeholder:text-grayColor1 text-[#777980]">
                  <span>{field.value}</span>
                </SelectTrigger>
                <SelectContent>
                  {cancellationOptions.map((item, index) => (
                   <SelectItem
                   key={index}
                   value={item}
                   className="!h-12 text-[#777980] data-[highlighted]:border-l-2 data-[highlighted]:rounded-none transition-all duration-100 data-[highlighted]:border-secondaryColor data-[highlighted]:bg-secondaryColor/10 data-[highlighted]:text-headerColor"
                 >
                   {item}
                 </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </form>
  );
}
