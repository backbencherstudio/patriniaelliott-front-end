"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";

interface EditTourDialogProps {
  data: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditTourDialog({
  data,
  open,
  onOpenChange,
}: EditTourDialogProps) {

    
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: data?.userId || "#0002",
      duration: data?.tourDetails?.duration || "3days",
      inclusive: data?.tourDetails?.inclusive || "Hotel + All Included",
      status: data?.status || "Available",
    },
  });

  const onSubmit = (formData: any) => {
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-[28px] font-semibold mb-2">
            Edit Tour Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* User ID */}
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">
              User Id <BiEditAlt className="text-grayColor1 text-xl" />
            </label>
            <input
          
              className="block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3"
              placeholder="#0002"
              {...register("userId")}
            />
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">
              Duration <BiEditAlt className="text-grayColor1 text-xl" />
            </label>
            <input
              className="block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3"
              placeholder="3days"
              {...register("duration")}
            />
          </div>

          {/* Inclusive */}
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">
              Inclusive <BiEditAlt className="text-grayColor1 text-xl" />
            </label>
            <input
              className="block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3"
              placeholder="Hotel + All Included"
              {...register("inclusive")}
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">
              Status <BiEditAlt className="text-grayColor1 text-xl" />
            </label>
            <input
              className="block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3"
              placeholder="Available"
              {...register("status")}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
                aria-label="Save Changes"
                type="submit"
              className="bg-primaryColor cursor-pointer text-white px-6 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
