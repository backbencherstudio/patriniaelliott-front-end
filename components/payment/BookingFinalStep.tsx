"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useState } from "react";
import { toast } from "react-toastify";
import BookingConfirm from "./BookingConfirm";
export default function BookingFinalStep({ isOpen, setIsOpen, paymentID }: any) {
const [isConfirmOpen, setIsConfirmOpen] = useState(false);
const {token} = useToken()
const handleConfirm = async() => {
 try {
    const endpoint = `/booking/payment/confirm/${paymentID}`
    const response = await UserService.createData(endpoint,{},token)
    console.log("response",response);
    if(response?.data?.success){
        toast.success(response?.data?.data?.message);
        setIsConfirmOpen(true)
    }else{
        toast.error(response?.data?.data?.message);
    }
 } catch (error) {
    console.log(error);
 }
}
  return (
    <div>

    <Dialog  open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className=" " asChild></DialogTrigger>
      
      <DialogContent className="sm:max-w-[300px] text-center !px-5 py-7  close">
        <h3 className="text-lg font-semibold ">Are you sure you want to confirm this booking?</h3>
        <div className="flex items-center justify-between py-2 ">
          
          <button onClick={()=>setIsOpen(false)} className="bg-redColor cursor-pointer hover:shadow-md transition-all hover:shadow-redColor/20 text-whiteColor px-4 py-2 rounded-full">Cancel</button>
          <button onClick={handleConfirm} className="bg-primaryColor cursor-pointer hover:shadow-md transition-all hover:shadow-primaryColor/20 text-whiteColor px-4 py-2 rounded-full">Confirm Booking</button>
        </div>
      </DialogContent>
    </Dialog>
    {isConfirmOpen && <BookingConfirm isOpen={isConfirmOpen} setIsOpen={setIsConfirmOpen}/>}
    </div>
  );
}
