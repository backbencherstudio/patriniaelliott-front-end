"use client";

import Rating from "@/components/reusable/Rating";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import dayjs from "dayjs";
import Image from "next/image";
function ReviewDetails({
    open,
    onOpenChange,
    data,
  } :any) {

    console.log("check review data",data);
    

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
       
        <DialogContent className="w-full overflow-y-auto max-h-[90vh] max-w-[320px] lg:max-w-[936px] p-4 md:p-6  rounded-xl bg-white"
   >
       <div>
        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] text-[#070707] font-medium leading-[126%] tracking-[-0.84px] font-inter">Property details</h2>
      </div>
          <div className="grid grid-cols-1 lg:grid-cols-9 items-center gap-4">
            {/* Left - Image */}
            <div className="h-[250px] col-span-4  md:h-full">
              <Image
                src={data?.reservation?.package_image?.url || "/empty.png"}
                alt="Room"
                width={500}
                height={500}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
  
            {/* Right - Info */}
            <div className=" col-span-5 space-y-3">
              {/* Title & User */}
              <div className="flex justify-between mt-3 lg:mt-0  items-start gap-4">
                <div>
                  <h2 className="text-base md:text-lg lg:text-2xl font-medium">{data?.reservation?.package_name}</h2>
                </div>
                <p className="text-base md:text-lg lg:text-2xl font-medium text-right">
                  $314
                  <span className="text-xs md:text-sm font-normal text-muted-foreground ml-1">
                    /per night
                  </span>
                </p>
              </div>

              <div className="  space-y-2.5 rounded-2xl">
                <Rating rating={data?.review?.rating}/>

                <p className=" text-descriptionColor text-base md:text-lg">{data?.review?.comment}</p>
                <p className="text-grayColor1 text-base "> {dayjs(data?.created_at).format("MMMM D, YYYY HH:mm")}</p>
               <div className=" flex justify-between mt-5">
                 <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 overflow-hidden  rounded-full">
                        <Image src={data?.user?.avatar || "/profile.png"} alt={data?.user?.name} width={36} height={36} className="w-full h-full"/>
                      </div>
                      <h5 className=" text-base md:text-lg font-medium text-headerColor">{data?.user?.name}</h5>
                 </div>
                 <div>
                     {/* <div className="flex items-center space-x-2">
                                 
                                  <button
                                    className={`
                                     border text-base border-blackColor/20 text-[#8F6F65] px-3 py-1 rounded-sm flex items-center space-x-1`}
                                   
                                  >
                                    <span> <BiSolidLike  className=" text-blue-600 text-xl"/> </span>
                                    <span className="text-descriptionColor">{data?.review?.likes}</span>
                                  </button>
                                  <button
                                    className={`
                                     border text-base border-blackColor/20 text-[#8F6F65] px-3 py-1 rounded-sm flex items-center space-x-1`}
                                   
                                  >
                                    <span> <AiOutlineDislike className="text-blackColor text-xl" /></span>
                                    <span className="text-descriptionColor">{data?.review?.dislikes}</span>
                                  </button>
                                 
                                </div> */}
                 </div>
               </div>
              </div>
             
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  

export default ReviewDetails
