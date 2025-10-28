"use client";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useState } from "react";
import { toast } from "react-toastify";
import BookingConfirm from "./BookingConfirm";
export default function BookingFinalStep({ isOpen, setIsOpen, paymentID,paymentMethodId }: any) {
const [isConfirmOpen, setIsConfirmOpen] = useState(false);
const [responseData , setResponseData]= useState()
const [isLoading, setIsLoading] = useState(false);
const {token} = useToken()
const handleConfirm = async() => {
 try {
    setIsLoading(true);
    const endpoint = `/booking/payment/confirm/${paymentID}`
    const payload = {payment_method_id:paymentMethodId }
    const response = await UserService.createData(endpoint,payload,token)

   setResponseData(response?.data?.data)

    if(response?.data?.success){
        toast.success(response?.data?.data?.message);
        setIsConfirmOpen(true)
    }else{
        toast.error(response?.response?.data?.message);
    }
 } catch (error) {
    console.log(error);
 } finally {
    setIsLoading(false);
 }
}
 

  return (
    <div>

    <Dialog  open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className=" " asChild></DialogTrigger>
      
      <DialogContent aria-describedby="confirm-booking" className="sm:max-w-[300px] text-center !px-5 py-7  close">
        <div className="text-lg font-semibold "> <DialogTitle aria-describedby="confirm-booking">Are you sure you want to confirm this booking?</DialogTitle></div>
        <div className="flex items-center justify-between py-2 ">
          
          <button onClick={()=>setIsOpen(false)} className="bg-redColor cursor-pointer hover:shadow-md transition-all hover:shadow-redColor/20 text-whiteColor px-4 py-2 rounded-full">Cancel</button>
          <button disabled={isLoading} onClick={handleConfirm} className="bg-primaryColor disabled:cursor-not-allowed cursor-pointer hover:shadow-md transition-all disabled:bg-grayColor1 hover:shadow-primaryColor/20 text-whiteColor px-4 py-2 rounded-full">{isLoading ? "Loading..." : "Confirm Booking"} </button>
          
        </div>
      </DialogContent>
    </Dialog>
      {isConfirmOpen && <BookingConfirm isOpen={isConfirmOpen} setIsOpen={setIsConfirmOpen} responseData={responseData} />}
    </div>
  );
}
