"use client";
import { useToureBookingContext } from "@/provider/TourBookingProvider";
import { LucideCalendarDays, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";

const ToureBookingSummary = ({activeTab,setActiveTab}:any) => {
   const {
     singleToure,
     travelCount, 
          startDate,
          endDate,
          servicefee,
          totalDay,
          calculateTotal,
          discountNumber,
          travelprice,
          discount 
      
    } = useToureBookingContext();
  

 if (!singleToure) return null;

  const { title, reviews, price,location, rating, image } = singleToure;
  const [bookingData, setBookingData] = useState<any>()
  useEffect(()=>{
    const data = localStorage.getItem("toure_booking_single_toure")
    setBookingData(JSON.parse(data))
  },[])
  console.log("check booking data",bookingData);
  
  // Show loading state if no apartment data
  if (!bookingData) {
    return (
      <div className="rounded-xl border border-secondaryColor bg-secondaryColor/5 p-4 shadow-md text-sm font-medium text-gray-800">
        <div className="text-center py-8">
          <p className="text-grayColor1 text-lg">No booking data available</p>
          <p className="text-sm text-grayColor1 mt-2">Please select an apartment and configure your booking first.</p>
        </div>
      </div>
    );
  }
  return (
   
    <div className="rounded-xl border border-secondaryColor bg-secondaryColor/5 p-4 shadow-md text-sm font-medium text-gray-800">
         {
        !bookingData ? "Tour data not available."  :
        <div>
             {/* Apartment Header */}
      <div className="flex items-start gap-4">
        <div className=" !w-[40%] h-[163px]">
          <Image
            src={bookingData?.package_files[0]?.file_url || "/apartment.jpg"}
            alt={title ? title : ""}
            width={180}
            height={163}
            className=" w-full h-full  rounded-md object-cover"
          />
        </div>

        <div className=" w-[60%]">
          <p className="text-4xl xl:text-[40px] font-bold text-black">
            ${bookingData?.price || 0}
            <span className="text-lg font-medium text-descriptionColor">
              /per night
            </span>
          </p>
          <h3 className="font-medium text-base xl:text-lg mt-1 text-black">{ bookingData?.name ? bookingData?.name : ""}</h3>
          <div className="flex gap-2 mt-2">
            <p className="text-grayColor1 text-sm"><span className="text-headerColor font-medium">{totalDay} Days</span> in {location} Tour Package</p>
          </div>

          <p className="flex items-center gap-1 text-sm text-headerColor mt-2">
            <FaStar className="text-yellow-400" /> {bookingData?.rating_summary?.averageRating || 0}{" "}
            <span className="text-grayColor1">
              ({bookingData?.rating_summary?.averageReviews || 0} reviews)
            </span>
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className=" mt-6  border-b py-4 border-secondaryColor/20">
        <div className="flex w-[80%]  text-xs text-black">
          <div>
            <div className="flex gap-2 text-sm font-semibold pr-10 border-r border-secondaryColor/20">
              <LucideCalendarDays className="w-6 h-6 text-secondaryColor mt-2" />
              <div>
                <p className="text-sm text-descriptionColor"> Check-in</p>
                <p className=" text-base font-semibold text-headerColor">
                  {startDate
                    ? new Date(startDate).toDateString()
                    : "Not selected"}
                </p>
                <p className="text-grayColor1 text-sm ">12:00 PM</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex  gap-2 text-sm font-semibold pl-5">
              <LucideCalendarDays className="w-6 h-6 text-secondaryColor mt-2" />
              <div>
                <p className="text-sm text-descriptionColor">Check-out</p>
                <p className="text-base font-semibold text-headerColor">
                  {endDate ? new Date(endDate).toDateString() : "Not selected"}
                </p>
                <p className="text-grayColor1 text-sm  ">11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Details */}
      <div className="mt-4">
      <h3 className="text-xl font-semibold text-headerColor">
          Pricing summary
        </h3>


       <div className="mt-6 bg-secondaryColor/10 rounded-lg p-4">
       
        <div className="text-base space-y-2">
          <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
            <span className=" items-center gap-1 flex">
              Package 1 <X size={16}/> {travelCount}
            </span>
            <span>
              ${travelprice}
            </span>
          </div>
          <div className="flex justify-between text-base text-descriptionColor border-b border-grayColor1/20 py-2">
            <span className=" text-descriptionColor">{discountNumber}% campaign discount</span>
            <span>- ${discount}</span>
          </div>
          
          <div className="flex text-descriptionColor justify-between text-base border-b border-grayColor1/20 py-2">
            <span className=" ">Service fee</span>
            <span> ${servicefee}</span>
          </div>
          
        </div>
        <div className="flex justify-between mt-4 font-medium text-base">
          <span>Total</span>
          <span>${calculateTotal() -discount}</span>
        </div>
      </div>
      
      </div>
      {/* Proceed Button */}
      {
        activeTab !=="step2" &&<button onClick={()=>setActiveTab("step2")} className="w-full mt-4 bg-secondaryColor cursor-pointer text-headerColor font-medium  py-4 px-4 rounded-full text-base">
        Proceed To Payments
      </button>
      }
      
        </div>
    }
     
    </div>
  );
};

export default ToureBookingSummary;
