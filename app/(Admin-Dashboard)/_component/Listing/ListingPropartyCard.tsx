"use client";

import TotalReviewStats from "@/components/reusable/TotalReviewStats";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import Image from "next/image";

interface ListingPropartyCardProps {
  open: boolean;
  setIsModalOpen: (open: boolean) => void;
  data:any
}

const ListingPropartyCard = ({
  open,
  setIsModalOpen,
  data,
} :any) => {

  console.log("check data",data);
  return (
    <Dialog open={open} onOpenChange={setIsModalOpen}>
     
      <DialogContent className="w-full overflow-y-auto max-h-[90vh] max-w-[320px] lg:max-w-[936px] p-4 md:p-6  rounded-xl bg-white"
 >
     <div>
      <h2 className="text-[20px] md:text-[24px] lg:text-[28px] text-[#070707] font-medium leading-[126%] tracking-[-0.84px] font-inter">{data?.type} details</h2>
    </div>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Left - Image */}
          <div className="h-[250px]  md:h-full col-span-3">
                <Image
                  src={data?.package_files[0]?.file_url || "/empty.png"}
                  alt="Room"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-md object-cover"
                />
          </div>

          {/* Right - Info */}
          <div className=" col-span-4 space-y-4">
            {/* Title & User */}
            <div className="flex justify-between mt-3 lg:mt-0  items-start gap-4">
              <div>
                
                    <h2 className="text-base md:text-lg lg:text-xl font-medium">{data?.name}</h2>
               
              </div>
              
                  <p className="text-base md:text-lg lg:text-2xl font-medium text-right">
                    ${data?.price}
                    <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                      /per night
                    </span>
                  </p>
            
            </div>
            <div className=" p-5  border border-blackColor/8 rounded-2xl mt-4 lg:mt-0">
            {/* Details */}
            <div className="text-sm ">
              <div>

                    <h5 className="text-lg font-medium text-blackColor  mb-4 lg:text-xl">{data?.type} Details</h5>

              </div>
              <div className="space-y-2">
              <div className=" flex justify-between text-grayColor1">
                      <p className=" ">User ID:</p> <p>{data?.user_id}</p>

              </div>
              <div className=" flex justify-between text-grayColor1">
                      <p className=" ">Listing date:</p> <p>{dayjs(data?.created_at).format("YYYY-MM-DD")}</p>
              </div>
             
              <div className=" flex justify-between text-grayColor1">
                    <p className=" ">Status:</p> <p>{data?.status}</p>
              </div>
              <div className=" flex justify-between text-grayColor1">
                    <p className=" ">Location:</p> <p>{`${data?.city}, ${data?.country}`}</p>
              </div>
              </div>
            </div>
            </div>
            <div className=" p-4 rounded-2xl bg-secondaryColor/15 mt-4 lg:mt-0">
                    <TotalReviewStats averageRating={data?.averageRating} totalReviews={data?.totalReviews}/>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingPropartyCard;

