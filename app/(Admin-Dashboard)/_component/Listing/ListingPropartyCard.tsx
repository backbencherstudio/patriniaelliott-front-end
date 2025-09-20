"use client";

import TotalReviewStats from "@/components/reusable/TotalReviewStats";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";
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
const listingId = data?.id
  
    const endpoint = `/admin/listing-management/${listingId}`;
  const { data: listingData, loading, error } = useFetchData(endpoint);
console.log("data",listingData);
  return (
    <Dialog open={open} onOpenChange={setIsModalOpen}>
     
      <DialogContent className="w-full overflow-y-auto max-h-[90vh] max-w-[320px] lg:max-w-[936px] p-4 md:p-6  rounded-xl bg-white"
 >
     <div>
      <h2 className="text-[20px] md:text-[24px] lg:text-[28px] text-[#070707] font-medium leading-[126%] tracking-[-0.84px] font-inter">{listingData?.data?.type} details</h2>
    </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left - Image */}
          <div className="h-[250px]  md:h-full">
            {
              loading ? (
                <div className="w-full h-full rounded-md object-cover">
                  <Skeleton className="w-full h-full" />
                </div>
              ) : (
                <Image
                  src={listingData?.data?.imageUrl ? listingData?.data?.imageUrl : "/public/hotel/h1.jpg"}
                  alt="Room"
                  width={500}
                  height={500}
                  className="w-full h-full rounded-md object-cover"
                />
              )
            }
           
          </div>

          {/* Right - Info */}
          <div className=" space-y-4">
            {/* Title & User */}
            <div className="flex justify-between mt-3 lg:mt-0  items-start gap-4">
              <div>
                {
                  loading ? (
                    <Skeleton className="w-full h-5" />
                  ) : (
                    <h2 className="text-base md:text-lg lg:text-2xl font-medium">{listingData?.data?.name}</h2>
                  )
                }
               
              </div>
              {
                loading ? (
                  <Skeleton className="w-full h-5" />
                ) : (
                  <p className="text-base md:text-lg lg:text-2xl font-medium text-right">
                    ${listingData?.data?.price}
                    <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                      /per night
                    </span>
                  </p>
                )
              }
             
            </div>
            <div className=" p-5  border border-blackColor/8 rounded-2xl">
            {/* Details */}
            <div className="text-sm ">
              <div>
                {
                  loading ? (
                    <Skeleton className="w-full h-5" />
                  ) : (
                    <h5 className="text-lg font-medium text-blackColor  mb-4 lg:text-xl">{listingData?.data?.type} Details</h5>
                  )
                }
              </div>
              <div className="space-y-2">
              <div className=" flex justify-between text-grayColor1">
                {
                  loading ? (
                    <Skeleton className="w-full h-5" />
                  ) : (
                    <>
                      <p className=" ">User ID:</p> <p>{data?.displayId}</p>
                    </>
                  )
                }
              </div>
              <div className=" flex justify-between text-grayColor1">
                {
                  loading ? (
                    <Skeleton className="w-full h-5" />
                  ) : (
                    <>                    <p className=" ">Listing date:</p> <p>{dayjs(listingData?.data?.created_at).format("YYYY-MM-DD")}</p>
                    </>

                  )
                }
              </div>
             
              <div className=" flex justify-between text-grayColor1">
                {
                  loading ? (
                    <Skeleton className="w-full h-5" />
                  ) : (
                    <>
                      <p className=" ">Status:</p> <p>{listingData?.data?.status}</p>
                    </>
                  )
                }
              </div>
              <div className=" flex justify-between text-grayColor1">
                {
                  loading ? (
                    <Skeleton className="w-full h-5" />
                  ) : (
                    <>
                    <p className=" ">Location:</p> <p>{`${listingData?.data?.city}, ${listingData?.data?.country}`}</p>
                    </>
                  )
                }
              </div>
              </div>
            </div>
            </div>
            <div className=" p-4 rounded-2xl bg-secondaryColor/15">
                {
                  loading ? (
                    <Skeleton className="w-full h-20" />
                  ) : (
                    <TotalReviewStats averageRating={listingData?.data?.rating_value}/>
                  )
                }
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingPropartyCard;

