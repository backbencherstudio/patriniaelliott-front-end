"use client";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

const SettingsForm = () => {
  // Initialize react hook form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      currency: "USD",
      timezone: "PST",
      language: "English",
      backupData: "**********",
      webhookUrl: "https://api.triptopia.com/webhook",
      apiRateLimit: 100,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data); // Submit form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-1">
      {/* Platform Settings */}
      <div className="space-y-4 bg-white rounded-2xl p-6">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">Platform settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Default Currency</label>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border rounded-lg lg:!h-12 px-3 py-2 lg:py-3 mt-2">
                    <span>{field.value}</span>
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem className="!hover:text-red-500 " value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700">Default Time Zone</label>
            <Controller
              name="timezone"
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 mt-2">
                    <span>{field.value}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="PST">PST</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Set Language</label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 mt-2">
                  <span>{field.value}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* API Settings */}
      <div className="space-y-4 mt-6 bg-white rounded-2xl p-6">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">API Settings</h3>
        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Data Export & Backup</label>
          <Controller
            name="backupData"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                value={field.value}
                onChange={field.onChange} // Allow editing
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">Webhook URL</label>
          <Controller
            name="webhookUrl"
            control={control}
            render={({ field }) => (
              <input
                type="url"
                value={field.value}
                onChange={field.onChange} // Allow editing
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm lg:text-base font-medium text-gray-700">API Rate Limit</label>
          <Controller
            name="apiRateLimit"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                value={field.value}
                onChange={field.onChange} // Allow editing
                className="mt-2 w-full border rounded-lg px-3 py-2 lg:py-3"
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Submit Button */}
      {/* <div className="mt-6 text-right">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Save Settings
        </button>
      </div> */}
    </form>
  );
};

export default SettingsForm;
