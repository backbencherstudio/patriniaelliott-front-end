"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
export default function EditPropertyDialog({data,
  open,
  onOpenChange,
}: any) {
  const  {token}=useToken()
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      description: data?.description || "description",
      name:data?.name || "Eclipse Haven",
      price: data?.price || "$4999",
      status: data?.status === "Available" ? "1" : "0", // Convert to string for Select
    },
  });

  // React Query mutation for updating property
  const updatePropertyMutation = useMutation({
    mutationFn: async (formData: any) => {
      // Convert status string back to number
      const submitData = {
        ...formData,
        status: parseInt(formData.status) // Convert "0" or "1" to 0 or 1
      };
      const response = await UserService.updateData(`/admin/listing-management/${data?.id}`, submitData, token);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Property updated successfully!");
      onOpenChange(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["listingData"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  });

  const onSubmit = (formData: any) => {
    updatePropertyMutation.mutate(formData);
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
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">Proparty Name <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="Eclipse Haven" {...register("name")} />
          </div>
          {/* <div className="space-y-1">
              <label className="text-sm md:text-base font-medium flex gap-2 items-center">Description <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="Eclipse Haven" {...register("description")} />
          </div> */}

          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">Price <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="$4999" type="text" {...register("price")} />
          </div>

          <div className="space-y-1">
            <label className="text-sm md:text-base font-medium flex gap-2 items-center">Status<span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full !h-12 border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Pending</SelectItem>
                    <SelectItem value="1">Approve</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button aria-label="Save Changes" type="submit" disabled={updatePropertyMutation.isPending} className="bg-primaryColor disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer text-white px-6 py-2 rounded-md">
            {updatePropertyMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
