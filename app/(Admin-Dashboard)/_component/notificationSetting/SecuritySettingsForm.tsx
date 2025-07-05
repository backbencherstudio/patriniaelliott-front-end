"use client";

import { useForm, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type SecurityForm = {
  hostVerification: boolean;
  backupFrequency: string;
  sessionTimeout: string;
  auditLogExport: string;
  passwordExpiry: string;
};

const exportOptions = ["Every 7 days", "Every 15 days", "Every 30 days"];

export default function SecuritySettingsForm() {
  const { control, handleSubmit } = useForm<SecurityForm>({
    defaultValues: {
      hostVerification: false,
      backupFrequency: "Every 7 days",
      sessionTimeout: "30",
      auditLogExport: "Every 7 days",
      passwordExpiry: "90",
    },
  });

  const onSubmit = (data: SecurityForm) => {
    console.log("Security Settings:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4 bg-white rounded-2xl p-6">
        <h3 className="text-xl lg:text-2xl text-headerColor font-medium">Security Settings</h3>

        {/* Host Verification Requests - Switch */}
        <div className="flex items-center justify-between border-b pb-4">
          <p className="text-base text-headerColor">Host Verification Requests</p>
          <Controller
            name="hostVerification"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(value) => {
                  field.onChange(value);
                  handleSubmit(onSubmit)();
                }}
              />
            )}
          />
        </div>

        {/* Data Export & Backup - Select */}
        <div>
          <label className="block text-sm lg:text-base text-headerColor mb-2">
            Data Export & Backup
          </label>
          <Controller
            name="backupFrequency"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]">
                  {field.value}
                </SelectTrigger>
                <SelectContent>
                  {exportOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Session Timeout - Input */}
        <div>
          <label className="block text-sm lg:text-base text-headerColor mb-2">
            Session Timeout (minutes)
          </label>
          <Controller
            name="sessionTimeout"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="30"
              />
            )}
          />
        </div>

        {/* Audit Log Export - Select */}
        <div>
          <label className="block text-sm lg:text-base text-headerColor mb-2">
            Data Export & Backup
          </label>
          <Controller
            name="auditLogExport"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]">
                  {field.value}
                </SelectTrigger>
                <SelectContent>
                  {exportOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Password Expiry - Input */}
        <div>
          <label className="block text-sm lg:text-base text-headerColor mb-2">
            Password Expiry (days)
          </label>
          <Controller
            name="passwordExpiry"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full border rounded-lg px-3 py-2 lg:py-3 lg:!h-12 text-[#777980]"
                placeholder="90"
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
