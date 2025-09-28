"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import noimage from "@/public/hotel/h5.jpg";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
interface BookingItem {
  end_date: string;
  package: {
    name: string;
    image: string;
    guest_count:number;
  };
  start_date: string;
}

interface User {
  id: string;
  name: string;
}

interface BookingData {
  id:string;
  address1: string | null;
  address2: string | null;
  booking_items: BookingItem[];
  city: string | null;
  country: string | null;
  created_at: string;
  email: string;
  invoice_number: string;
  payment_status: string;
  phone_number: string;
  state: string | null;
  status: string;
  total_amount: string;
  type: string;
  updated_at: string;
  user: User;
  zip_code: string | null;
}
interface BookingDetailsDialogProps {
  open: boolean;
  setIsModalOpen: (open: boolean) => void;
  data: BookingData;
}

const BookingDetailsDialog: React.FC<any> = ({
  open,
  setIsModalOpen,
  data,
}) => {

  console.log("check booking data",data);
  
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
              src={ noimage}
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
                <h2 className="text-base md:text-lg lg:text-2xl font-medium">{data?.package?.name}</h2>
                
              </div>
              <p className="text-base md:text-lg lg:text-2xl font-medium text-right">
                ${data?.total_amount}
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
                    <p className="font-medium text-base lg:text-lg">{data?.contact?.first_name ? data?.contact?.first_name + " " + data?.contact?.last_name : "Vendor Name"}</p>
                    <p className="text-sm text-muted-foreground">{data?.contact?.email}</p>
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
                <p className=" ">Guest Name:</p> <p>{data?.reservation_details?.guest_name}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Reservation ID:</p> <p>{data?.reservation_details?.reservation_id}</p>
              </div>
             
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Guests:</p> <p>{data?.reservation_details?.guests}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Check in/Check out:</p> <p>{dayjs(data?.reservation_details?.check_in).format("YYYY-MM-DD")} / {dayjs(data?.reservation_details?.check_out).format("YYYY-MM-DD")}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Status:</p> <p>{data?.status}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Payment:</p> <p>{data?.payment_status}</p>
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
