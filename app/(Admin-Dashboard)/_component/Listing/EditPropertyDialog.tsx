"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { Controller, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { toast } from "react-toastify";
export default function EditPropertyDialog({data,
  open,
  onOpenChange,
  listingData,
  setListingData,
}: any) {

  console.log(data);
  const  {token}=useToken()
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      description: data?.description || "description",
      name:data?.name || "Eclipse Haven",
      price: data?.price || "$4999",
      status: data?.status === 1 ? "1" : "0", // Convert to string for Select
    },
  });

  const onSubmit = async(formData: any) => {
    // Convert status string back to number
    const submitData = {
      ...formData,
      status: parseInt(formData.status) // Convert "0" or "1" to 0 or 1
    };
  try {
     const response = await UserService.updateData(`/admin/listing-management/${data?.id}`,submitData,token);
     console.log(response);
     
      if(response?.data?.success){
       toast.success(response?.data?.message);
       onOpenChange(false);
  
       // Update the listing data manually
       if(listingData && setListingData) {
         const updatedData = listingData.map((item: any) => {
           if(item.id === data?.id) {
             return {
               ...item,
               name: formData.name,
               description: formData.description,
               price: formData.price,
               status: formData.status == 1 ? "approved" : "pending", // Convert to number
             };
           }
           return item;
         });
         setListingData(updatedData);
       }
       reset();
      }else{
      toast.error(response?.data?.message);
     }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error?.message);
    
  }
    
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
          <div className="space-y-1">
              <label className="text-sm md:text-base font-medium flex gap-2 items-center">Description <span><BiEditAlt className="text-grayColor1 text-xl" /></span></label>
            <input className=" block w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3" placeholder="Eclipse Haven" {...register("description")} />
          </div>

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
                  <SelectTrigger className="w-full border border-grayColor1/80 rounded-md text-base py-2 px-2 lg:py-3 lg:px-3">
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
            <button type="submit" className="bg-primaryColor cursor-pointer text-white px-6 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
