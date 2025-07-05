"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

interface BookingDetailsDialogProps {
  open: boolean;
  setIsModalOpen: (open: boolean) => void;
  data: {
    image: string;
    name: string;
    email: string;
    bookingId: string;
    guestCount: number;
    checkIn: string;
    checkOut: string;
    status: string;
    payment: string;
    price: string;
    title: string;
  };
}

const BookingDetailsDialog: React.FC<BookingDetailsDialogProps> = ({
  open,
  setIsModalOpen,
  data,
}) => {
  return (
    <Dialog open={open} onOpenChange={setIsModalOpen}>
     
      <DialogContent className="w-full overflow-y-auto max-h-[90vh] max-w-[320px] lg:max-w-[936px] p-4 md:p-6  rounded-xl bg-white"
 >
     <div>
      <h2 className="text-[20px] md:text-[24px] lg:text-[28px] text-[#070707] font-medium leading-[126%] tracking-[-0.84px] font-inter">Booking details</h2>
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left - Image */}
          <div className="h-[250px]  md:h-full">
            <Image
              src={data?.image}
              alt="Room"
              width={500}
              height={500}
              className="w-full h-full rounded-md object-cover"
            />
          </div>

          {/* Right - Info */}
          <div className=" space-y-4">
            {/* Title & User */}
            <div className="flex justify-between mt-3 lg:mt-0  items-start gap-4">
              <div>
                <h2 className="text-base md:text-lg lg:text-2xl font-medium">{data?.title}</h2>
                
              </div>
              <p className="text-base md:text-lg lg:text-2xl font-medium text-right">
                ${data?.price}
                <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                  /per night
                </span>
              </p>
            </div>
            <div className=" p-5 bg-bgColor rounded-2xl">
            <div className="flex items-center gap-2 border-b border-blackColor/10 pb-4">
                  <Image
                    src="/usericon/avatar.png"
                    alt="Guest"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium text-base lg:text-lg">{data?.name}</p>
                    <p className="text-sm text-muted-foreground">{data?.email}</p>
                  </div>
                </div>
            {/* Divider */}

           

            {/* Details */}
            <div className="text-sm  mt-4">
              <div>
                <h5 className="text-lg font-medium text-blackColor  mb-4 lg:text-xl">Reservation Details</h5>
              </div>
              <div className="space-y-2">
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Guest:</p> <p>{data?.name}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Reservation ID:</p> <p>{data?.bookingId}</p>
              </div>
             
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Guests:</p> <p>{data?.guestCount}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Check in/Check out:</p> <p>{data?.checkIn} / {data?.checkOut}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Status:</p> <p>{data?.status}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Payment:</p> <p>{data?.payment}</p>
              </div>

              </div>
            </div>
            </div>
          
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsDialog;
