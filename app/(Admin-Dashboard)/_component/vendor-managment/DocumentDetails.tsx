"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

interface DocumentDetailsProps {
  open: boolean;
  setIsModalOpen: (open: boolean) => void;
  data:any
}

const DocumentDetails = ({
  open,
  setIsModalOpen,
  data,
} :DocumentDetailsProps) => {
 
  console.log("check data",data);
  return (
    <Dialog open={open} onOpenChange={setIsModalOpen}>
     
      <DialogContent className="w-full overflow-y-auto  max-h-[90vh] max-w-[320px] lg:max-w-[736px]  p-4 md:p-6  rounded-xl bg-white"
 >
     <div>
      <h2 className="text-[20px] md:text-[24px]  text-[#070707] font-medium leading-[126%] tracking-[-0.84px] font-inter">{data?.type} approval details</h2>
    </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left - Image */}
          <div className="h-[250px] col-span-1  md:h-full">
            <Image
              src={data?.image_url || "/empty.png"}
              alt="Room"
              width={500}
              height={500}
              className="w-full h-full rounded-md object-cover"
            />
          </div>

          {/* Right - Info */}
          <div className=" col-span-2 space-y-4">
            {/* Title & User */}
            <div className="flex justify-between mt-3 lg:mt-0  items-start gap-4">
              <div>
                <h2 className="text-base md:text-lg lg:text-2xl font-medium">{data?.user?.name}</h2>
              </div>
              
            </div>
            <div className=" lg:grid  grid-cols-3 gap-4">
            <div className=" col-span-3 p-5  border border-blackColor/8 rounded-2xl  ">
            {/* Details */}
            <div className="text-sm ">
              <div>
                <h5 className="text-lg font-medium text-blackColor  mb-4 lg:text-xl">{data?.type} Approval Details</h5>
              </div>
              <div className="space-y-2">
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">User ID:</p> <p className="text-blackColor/80">{data?.user?.id}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Email:</p> <p className="text-blackColor/80">{data?.user?.email}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Phone:</p> <p className="text-blackColor/80">{data?.number}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Address:</p> <p className="text-blackColor/80">{data?.user?.address}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Status:</p> <p className="text-blackColor/80">{data?.status}</p>
              </div>
              
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

export default DocumentDetails;

