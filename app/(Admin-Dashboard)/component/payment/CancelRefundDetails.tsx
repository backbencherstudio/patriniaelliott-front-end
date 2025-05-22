"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";


export default function CancelRefundDetails({
  open,
  data,
  onOpenChange,
}:any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm pt-12 p-6 rounded-xl">
        <DialogHeader className="flex justify-between items-center">
          <div >
           <h3 className="text-xl lg:text-[28px] leading-[100%] font-semibold text-center w-full"> Refund Details</h3>
           <p className="text-sm lg:text-base text-center text-gray-500 mt-2 mb-4">
          Transaction ID: TXN23415439
        </p>
          </div>
          
        </DialogHeader>
   <div className=" p-4 rounded-md border border-black/10">
   <div className="pb-4  border-b border-black/10">
          <h4 className="text-lg lg:text-xl pt-3 border-t border-black/10 font-semibold mb-2 text-gray-800">
            Tour Package Details
          </h4>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-3">
            <span>Request Date</span>
            <span className="text-gray-900 ">28-04-24</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-3">
            <span>Guest Name</span>
            <span className="text-gray-900 ">{data.name}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-3">
            <span>Refund Amount</span>
            <span className="text-gray-900 ">${data.price}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600">
            <span>Refund Status</span>
            <span className="text-red-500 font-medium">Canceled</span>
          </div>
        </div>

       
        <div>
          <h4 className="text-lg lg:text-xl pt-3 border-t border-black/10 font-semibold mb-2 text-gray-800">Note</h4>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-3">
            <span>Request Date</span>
            <span className="text-gray-900 ">28-04-24</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600">
            <span>Guest Name</span>
            <span className="text-gray-900 ">{data.name}</span>
          </div>
        </div>
   </div>
     
      
      </DialogContent>
    </Dialog>
  );
}

