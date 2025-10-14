"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { GoCheckCircle } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";
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
  const invoiceRef = useRef<HTMLDivElement>(null);
 
    console.log("response payment",data);
  const resultObject :any = {};

 data?.timeline?.forEach((item :any) => {
  resultObject[item.step] = {
    step: item.step,
    time: item.time,
    isCompleted: item.isCompleted,
    current: item.current
  };
}); 
// Create base timeline without completed/canceled
const baseTimeline = [
    {
      status:`Refund ${resultObject?.requested?.step}`,
      description: "Customer submitted refund request",
      date: resultObject?.requested?.time,
      time: dayjs(resultObject?.requested?.time).format("hh:mm A"),
      icon: <RiRefund2Fill  className="text-green-500  text-lg lg:text-2xl" />,
      isCompleted:resultObject?.requested?.isCompleted,
    },
    {
      status: `${resultObject?.under_review?.step}`,
      description: "Refund request is reviewed by admin",
      date: resultObject?.under_review?.time,
      time: dayjs(resultObject?.under_review?.time).format("hh:mm A"),
      icon: <LuSearch  className="text-green-500  text-lg lg:text-2xl" />,
      isCompleted:resultObject?.under_review?.isCompleted,
    },
    {
      status: `${resultObject?.processing?.step}`,
      description: "Refund has been processed after approval",
      date: resultObject?.processing?.time,
      time: dayjs(resultObject?.processing?.time).format("hh:mm A"),
      icon: <TfiReload  className="text-green-500  text-lg lg:text-xl" />,
      isCompleted:resultObject?.processing?.isCompleted,
    },
  ];

// Add completed or canceled based on isCompleted status
const finalTimeline = [...baseTimeline];

// Check if completed step exists and is completed
if (resultObject?.completed?.isCompleted === true) {
  finalTimeline.push({
    status: `${resultObject?.completed?.step}`,
    description: "Refund has been completed successfully",
    date: resultObject?.completed?.time,
    time: dayjs(resultObject?.completed?.time).format("hh:mm A"),
    icon: <GoCheckCircle className="text-green-500  text-lg lg:text-2xl" />,
    isCompleted: resultObject?.completed?.isCompleted,
  });
}

// Check if canceled step exists and is not completed (canceled)
if (resultObject?.canceled?.isCompleted === true ) {
  finalTimeline.push({
    status: `${resultObject?.canceled?.step}`,
    description: "Refund request has been canceled",
    date: resultObject?.canceled?.time,
    time: dayjs(resultObject?.canceled?.time).format("hh:mm A"),
    icon: <IoCloseCircleOutline className="text-redColor text-lg lg:text-2xl" />,
    isCompleted: resultObject?.canceled?.isCompleted,
  });
}

const refundTimeline = finalTimeline;

  const downloadInvoice = async () => {
    if (!invoiceRef.current) return;
    
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`invoice-${data?.order_id || 'refund'}-${dayjs().format('YYYY-MM-DD')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
     <DialogContent className="md:max-w-md lg:max-w-lg p-0 md:p-0 rounded-xl">
     <div className=" max-h-[90vh] overflow-y-auto p-4 md:p-6" ref={invoiceRef}>
        <DialogHeader>
        <div >
           <h3 className="text-xl lg:text-[28px] leading-[100%] font-semibold text-center w-full">{data?.status == "approved" ? "Refund Details" : data?.status == "canceled" ? "Cancel Refund Details" : "Payment Details"}</h3>
           <p className="text-sm lg:text-base text-center text-gray-500 mt-2 mb-4">
           Transaction ID: {data?.order_id}
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
                <span className={`relative -left-0 p-2  flex items-center justify-center  text-xl ${step.status == "canceled" ? "bg-redColor/20" : "bg-greenColor/20"} rounded-full`}>
                  {step.icon}
                </span>
                </div>
                
                <h5 className="text-base  font-medium text-headerColor">
                  {step.status}
                </h5>
                <p className="text-sm md:text-base   text-descriptionColor">{step.description}</p>
                <p className="text-sm text-grayColor1 mt-1">
                {dayjs(step.date).format("MMMM DD, YYYY")} · {step.time}
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
            <span className="text-gray-900 ">{dayjs(resultObject?.requested?.time).format("DD-MM-YYYY")}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-2">
            <span>Guest Name</span>
            <span className="text-gray-900 ">{data?.user?.name}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600 mb-2">
            <span>Refund Amount</span>
            <span className="text-gray-900 ">${data.amount}</span>
          </div>
          <div className="flex  justify-between text-sm md:text-base text-gray-600">
            <span>Refund Status</span>
          {data?.status == "approved" || data?.status == "succeeded" && <span className="text-greenColor font-medium"> Complete  </span> }
          {data?.status == "canceled" && <span className="text-redColor font-medium"> Canceled  </span> }
         
          </div>
        </div>
        </div>
        {/* Download Button */}
        <div className="mt-4">
          <button 
            aria-label="Download Invoice"
            onClick={downloadInvoice}
            className="w-full cursor-pointer bg-secondaryColor  text-base text-black font-semibold py-2 lg:py-4 rounded-full hover:bg-secondaryColor/90 transition-colors"
          >
            Download Invoice
          </button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
