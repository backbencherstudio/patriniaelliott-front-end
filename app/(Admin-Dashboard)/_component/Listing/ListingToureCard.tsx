"use client";

import TotalReviewStats from "@/components/reusable/TotalReviewStats";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ListingToureCardProps {
  open: boolean;
  setIsModalOpen: (open: boolean) => void;
  data:any
}

const ListingToureCard = ({
  open,
  setIsModalOpen,
  data,
} :any) => {
  return (
    <Dialog open={open} onOpenChange={setIsModalOpen}>
     
      <DialogContent className="w-full overflow-y-auto  max-h-[90vh] max-w-[320px] lg:max-w-[936px] xl:max-w-[1070px] p-4 md:p-6  rounded-xl bg-white"
 >
     <div>
      <h2 className="text-[20px] md:text-[24px] lg:text-[28px] text-[#070707] font-medium leading-[126%] tracking-[-0.84px] font-inter">{data?.type} details</h2>
    </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left - Image */}
          <div className="h-[250px] col-span-1  md:h-full">
            <Image
              src={data?.image}
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
                <h2 className="text-base md:text-lg lg:text-2xl font-medium">{data?.propertyName}</h2>
              </div>
              <p className="text-base md:text-lg lg:text-2xl font-medium text-right">
                ${data?.price}
                <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                  /per night
                </span>
              </p>
            </div>
            <div className=" lg:grid  grid-cols-3 gap-4">
            <div className=" col-span-2 p-5  border border-blackColor/8 rounded-2xl  ">
            {/* Details */}
            <div className="text-sm ">
              <div>
                <h5 className="text-lg font-medium text-blackColor  mb-4 lg:text-xl">{data?.type} Package Details</h5>
              </div>
              <div className="space-y-2">
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">User ID:</p> <p className="text-blackColor/80">{data?.userId}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Duration:</p> <p className="text-blackColor/80">{data?.tourDetails.duration}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Group Size:</p> <p className="text-blackColor/80">{data?.tourDetails.groupSize}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Inclusive:</p> <p className="text-blackColor/80">{data?.tourDetails.inclusive}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Status:</p> <p className="text-blackColor/80">{data?.status}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                <p className=" ">Location:</p> <p className="text-blackColor/80">{data?.location}</p>
              </div>
              </div>
            </div>
            </div>
            <div className="col-span-1 p-4 rounded-2xl bg-secondaryColor/15 mt-4 lg:mt-0">
                <TotalReviewStats averageRating={data?.rating}/>
            </div>
            </div>
           
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingToureCard;

