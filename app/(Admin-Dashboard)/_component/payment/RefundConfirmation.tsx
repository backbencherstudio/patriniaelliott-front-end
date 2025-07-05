"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { useState } from "react";

interface RefundConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data:any;
}

export default function RefundConfirmation({
  open,
  onOpenChange,
  data,
}: RefundConfirmationModalProps) {
  const [partialRefund, setPartialRefund] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95%] max-w-sm rounded-xl md:px-6 px-4 py-6 md:py-8">
        <DialogHeader>
        <div  className=" mt-3">
           <h3 className="text-xl lg:text-[28px] leading-[100%] font-medium text-center w-full"> Refund payment</h3>
           <p className="text-base  text-center text-gray-500 mt-3 mb-3">
           Booking ID: {data?.userId}
        </p>
          </div>
        </DialogHeader>

        <p className=" text-base lg:text-lg  ">
          Refund <span className="">${data.price}</span> to{" "}
          <span className="">{data?.name}</span>?
        </p>

        <div className="flex items-center space-x-2  ">
          <Checkbox
            id="partialRefund"
            checked={partialRefund}
            onCheckedChange={() => setPartialRefund(!partialRefund)}
          />
          <label
            htmlFor="partialRefund"
            className="text-sm md:text-base text-grayColor1 leading-none peer-disabled:cursor-not-allowed"
          >
            Partial refund
          </label>
        </div>

        <div className="flex justify-center w-full gap-4 mt-4">
          <button className="bg-[#0068EF] w-full py-2.5 rounded-md text-white cursor-pointer  block">Refund</button>
          <button
            
            className="text-red-500 block border border-red-500  w-full rounded-md cursor-pointer hover:bg-red-50"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
