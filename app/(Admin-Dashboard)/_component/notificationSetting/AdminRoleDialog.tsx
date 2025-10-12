"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";

type AccessForm = {
  calendar: boolean;
  inbox: boolean;
  finance: boolean;
  property: boolean;
  reservations: boolean;
  account: boolean;
};

const defaultAccess: AccessForm = {
  calendar: true,
  inbox: false,
  finance: false,
  property: false,
  reservations: false,
  account: false,
};

export default function AdminRoleDialog({ open, onOpenChange }: any) {
  const { control, handleSubmit } = useForm<AccessForm>({
    defaultValues: defaultAccess,
  });

  const onSubmit = (data: AccessForm) => {
    console.log("Updated Access Rights:", data);
    onOpenChange(false); // close modal
  };

  const fields = [
    {
      key: "calendar",
      label: "Calendar & Availability",
      description:
        'The calendar page under the "Rates & Availability" tab and the policies page under the "Property" tab on the Extranet.',
    },
    {
      key: "inbox",
      label: "Inbox",
      description:
        'All messages in the "Inbox" tab on the Extranet. Be aware that only users who have access to the "Reservations" tab can view guest messages.',
    },
    {
      key: "finance",
      label: "Finance",
      description: 'All pages under the "Finance" tab on the Extranet.',
    },
    {
      key: "property",
      label: "Property Details",
      description: 'All pages under the "Property" tab on the Extranet.',
    },
    {
      key: "reservations",
      label: "Reservations",
      description:
        'All property\'s reservations in the "Reservation" tab on the Extranet.',
    },
    {
      key: "account",
      label: "Account",
      description:
        'Specific property-related rights under the "Account" tab on the Extranet.',
    },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:max-w-[655px] p-8 flex flex-col max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col flex-grow"
        >
          {/* Header */}
          <div className="border-b border-border/60 pb-4">
            <h2 className="text-headerColor font-medium text-xl lg:text-2xl">
              Which sections can Elisabeth have access to?
            </h2>
            <p className="text-base text-grayColor1 w-[92%] mt-3">
              Keep in mind that each user will be given the same access rights
              across all properties they’re assigned to.
            </p>
          </div>

          {/* Permissions */}
          <div className="space-y-3 flex-grow">
            {fields.map(({ key, label, description }) => (
              <div
                key={key}
                className="flex items-center justify-between border-b border-border/60 pb-4 gap-10"
              >
                <div className="flex-1">
                  <p className="font-medium text-lg text-headerColor">
                    {label}
                  </p>
                  <p className="text-sm md:text-base text-[#9397A4] mt-1">
                    {description}
                  </p>
                </div>
                <Controller
                  name={key as keyof AccessForm}
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={(val) => field.onChange(val)}
                    />
                  )}
                />
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end items-center gap-2 pt-4 ">
            <button
              aria-label="Cancel"
              type="button"
              onClick={() => onOpenChange(false)}
              className="border border-blueColor lg:py-2.5 lg:px-8 cursor-pointer rounded-md md:text-base py-2 px-6  text-blueColor text-sm"
            >
              Cancel
            </button>
            <button
              aria-label="Update"
              type="submit"
              className="bg-blueColor cursor-pointer lg:py-2.5 lg:px-8 rounded-md md:text-base py-2 px-6  hover:bg-blueColor text-white text-sm"
            >
              Update
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
