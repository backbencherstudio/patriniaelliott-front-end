"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader
} from "@/components/ui/dialog";
import { GoCheckCircle } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import { RiRefund2Fill } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
interface RefundDetailsModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  data:any;
}

export default function ConfirmRefundDetails({
  open,
  data,
  onOpenChange,
}: RefundDetailsModalProps) {
  const refundTimeline = [
    {
      status: "Refund requested",
      description: "Customer submitted refund request",
      date: "July 8, 2024",
      time: "14:00",
      icon: <RiRefund2Fill  className="text-green-500  text-lg lg:text-2xl" />,
    },
    {
      status: "Under Review",
      description: "Refund request is reviewed by admin",
      date: "July 9, 2024",
      time: "12:00",
      icon: <LuSearch  className="text-green-500  text-lg lg:text-2xl" />,
    },
    {
      status: "Processing",
      description: "Refund has been processed after approval",
      date: "July 10, 2024",
      time: "09:00",
      icon: <TfiReload  className="text-green-500  text-lg lg:text-xl" />,
    },
    {
      status: "Completed",
      description: "Reservation confirmation sent to customer",
      date: "July 11, 2024",
      time: "11:00",
      icon: <GoCheckCircle className="text-green-500  text-lg lg:text-2xl" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
     <DialogContent className="md:max-w-md lg:max-w-lg p-0 md:p-0 rounded-xl">
     <div className=" max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader>
        <div >
           <h3 className="text-xl lg:text-[28px] leading-[100%] font-semibold text-center w-full">Refund Details</h3>
           <p className="text-sm lg:text-base text-center text-gray-500 mt-2 mb-4">
           Transaction ID: TXN123456
        </p>
          </div>
         
        </DialogHeader>

       

        {/* Timeline */}
        <div className=" border border-gray-200 rounded-md p-4">
          <h4 className="text-lg lg:text-xl  font-semibold mb-3 text-headerColor">
          Refund Timeline
          </h4>
          <ol className="relative border-l border-green-300 ml-3 md:ml-4">
            {refundTimeline.map((step, index) => (
              <li key={index} className="mb-4 ml-7">
                <div className="absolute -left-4.5 md:-left-5  bg-white rounded-full">
                <span className="relative -left-0 p-2  flex items-center justify-center  text-xl bg-greenColor/20 rounded-full">
                  {step.icon}
                </span>
                </div>
                
                <h5 className="text-base  font-medium text-headerColor">
                  {step.status}
                </h5>
                <p className="text-sm md:text-base   text-descriptionColor">{step.description}</p>
                <p className="text-sm text-grayColor1 mt-1">
                  {step.date} · {step.time}
                </p>
              </li>
            ))}
          </ol>

          <div className="pb-4  ">
          <h4 className="text-lg lg:text-xl pt-3 border-t border-black/10 font-semibold mb-2 text-headerColor">
           {data.type} Package Details
          </h4>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-2">
            <span>Request Date</span>
            <span className="text-gray-900 ">28-04-24</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-2">
            <span>Guest Name</span>
            <span className="text-gray-900 ">{data.name}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-2">
            <span>Refund Amount</span>
            <span className="text-gray-900 ">${data.price}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600">
            <span>Refund Status</span>
            <span className="text-greenColor font-medium">Complete</span>
          </div>
        </div>
        </div>
        {/* Download Button */}
        <div className="mt-4">
          <button className="w-full cursor-pointer bg-secondaryColor  text-base text-black font-semibold py-2 lg:py-4 rounded-full">
            Download Invoice
          </button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
