"use client";

import { Switch } from "@/components/ui/switch"; // ShadCN UI Switch
import { Controller, useForm } from "react-hook-form";

type EmailForm = {
  smtpHost: string;
  smtpPort: string;
  smtpUsername: string;
  smtpPassword: string;
  emailNotifications: string[];
  hostVerificationRequests: boolean;
  userSupportRequests: boolean;
};

const emailNotificationOptions = [
  "Booking Confirmation",
  "Payment Receipt",
  "Review Reminder",
  "Reported Reviews",
];

export default function EmailNotificationSettingsForm() {
  const { control, handleSubmit, watch, setValue } = useForm<EmailForm>({
    defaultValues: {
      smtpHost: "smtp.travelbooking.com",
      smtpPort: "526",
      smtpUsername: "noreply@travelbooking.com",
      smtpPassword: "********",
      emailNotifications: ["Booking Confirmation", "Payment Receipt", "Review Reminder"],
      hostVerificationRequests: true,
      userSupportRequests: false,
    },
  });

  const selectedNotifications = watch("emailNotifications");

  const toggleNotification = (item: string) => {
    const updated = selectedNotifications.includes(item)
      ? selectedNotifications.filter((i) => i !== item)
      : [...selectedNotifications, item];

    setValue("emailNotifications", updated);
  };

  const onSubmit = (data: EmailForm) => {
    console.log("Submitted data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-1">
      {/* Email Settings */}
      <div className="space-y-4 bg-white rounded-2xl p-6">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">Email Settings</h3>

        {/* SMTP Host */}
        <div>
          <label className="block text-sm lg:text-base  text-headerColor">SMTP Host</label>
          <Controller
            name="smtpHost"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="smtp.travelbooking.com"
              />
            )}
          />
        </div>

        {/* SMTP Port */}
        <div>
          <label className="block text-sm lg:text-base  text-headerColor">SMTP Port</label>
          <Controller
            name="smtpPort"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="526"
              />
            )}
          />
        </div>

        {/* SMTP Username */}
        <div>
          <label className="block text-sm lg:text-base  text-headerColor">SMTP Username</label>
          <Controller
            name="smtpUsername"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="noreply@travelbooking.com"
              />
            )}
          />
        </div>

        {/* SMTP Password */}
        <div>
          <label className="block text-sm lg:text-base  text-headerColor">SMTP Password</label>
          <Controller
            name="smtpPassword"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="********"
              />
            )}
          />
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl p-6 space-y-4">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">Notification Settings</h3>

        {/* Email Notifications List */}
        <div>
          <p className=" text-headerColor mb-4">Email Notifications</p>
          <Controller
            name="emailNotifications"
            control={control}
            render={() => (
              <div className="space-y-3">
                {emailNotificationOptions.map((item) => (
                  <label key={item} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(item)}
                      onChange={() => toggleNotification(item)}
                      className="form-checkbox accent-blue-600 w-5 h-5"
                    />
                    <span className="text-[#777980] text-base">{item}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>

        {/* Host Verification Switch */}
        <div className="flex items-center justify-between ">
          <div>
            <p className=" text-base text-headerColor">Host Verification Requests</p>
            <p className="text-sm mt-2 text-[#9397A4] ">All admin receive email about host verification requests</p>
          </div>
          <Controller
            name="hostVerificationRequests"
            control={control}
            render={({ field }) => (
                <Switch
                checked={field.value}
                onCheckedChange={(value) => {
                  field.onChange(value);
                  handleSubmit(onSubmit)(); // auto-submit on toggle
                }}
              />
            )}
          />
        </div>

        {/* User Support Switch */}
        <div className="flex items-center justify-between">
          <div>
            <p className=" text-base text-headerColor">User Support Requests:</p>
            <p className="text-sm text-[#9397A4] mt-2">All admin receive email about user support requests</p>
          </div>
          <Controller
            name="userSupportRequests"
            control={control}
            
            render={({ field }) => (
                <Switch
                checked={field.value}
                onCheckedChange={(value) => {
                  field.onChange(value);
                  handleSubmit(onSubmit)(); // auto-submit on toggle
                }}
              />
            )}
          />
        </div>
      </div>
      
    </form>
  );
}
