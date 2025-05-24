"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
export default function EditPropertyDialog({data,
  open,
  onOpenChange,
}: any) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: data?.userId || "#0011",
      apartmentName:data?.propertyName || "Eclipse Haven",
      price: data?.price || "$4999",
      status: data?.status ||"Available",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" sm:max-w-[480px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl lg:text-[28px] font-semibold mb-2">
            Edit Property Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">User Id <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="#0011" {...register("userId")} />
          </div>

          <div className="space-y-1">
            
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">Apartment Name <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="Eclipse Haven" {...register("apartmentName")} />
          </div>

          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">Price <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="$4999" type="text" {...register("price")} />
          </div>

          <div className="space-y-1">
          <label className="text-sm md:text-base font-medium flex gap-2 items-center">Status<span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="Available" {...register("status")} />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-primaryColor cursor-pointer text-white px-6 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
