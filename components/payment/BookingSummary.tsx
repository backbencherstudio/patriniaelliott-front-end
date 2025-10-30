"use client";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { LucideCalendarDays } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaStar } from "react-icons/fa6";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BookingSummary = ({ activeTab, setActiveTab, setTotalAmount }: any) => {
  const { token } = useToken()
  const [bookingId, setBookingId] = useState(null)
  useEffect(() => {
    const id = localStorage.getItem("bookingId")
    setBookingId(id)
  }, [])


  const fetchBookingData = async () => {
    if (!token) return
    const data = await UserService?.getData(`/booking/${bookingId}`, token)
    return data?.data?.data
  }
  const { data: bookingData, isLoading: bookingLoading } = useQuery({
    queryKey: ["bookingData", bookingId],
    queryFn: fetchBookingData,
    enabled: !!bookingId,
  })


  // Show loading state if no apartment data
  if (!bookingData) {
    return (
      <div>
      {
      !bookingLoading ?
        <Card className="max-w-md border border-yellow-400 rounded-xl shadow-md">
          <CardContent className="p-5 space-y-4">
            {/* Top section: image + text */}
            <div className="flex gap-4">
              <Skeleton className="h-40 w-1/2 rounded-xl" />
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-7 w-full rounded-md" />
                <Skeleton className="h-5 w-2/3 rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
                <Skeleton className="h-6 w-full rounded-md mt-8" />
              </div>
            </div>
            <Skeleton className="h-40 w-full rounded-xl" />
            {/* Lower section */}
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card> :
        <div className="rounded-xl border border-secondaryColor bg-secondaryColor/5 p-4 shadow-md text-sm font-medium text-gray-800">
          <div className="text-center py-8">
            <p className="text-grayColor1 text-lg">No booking data available</p>
            <p className="text-sm text-grayColor1 mt-2">Please select an apartment and configure your booking first.</p>
          </div>
        </div>
        }
        </div>
    );
  }


  return (

    <div className="rounded-xl border border-secondaryColor bg-secondaryColor/5 p-4 shadow-md text-sm font-medium text-gray-800">

      <div>
        {/* Apartment Header */}
        <div className="flex flex-col  md:flex-row items-center md:items-start gap-4">
          <div className=" w-[180px] h-[163px]">
            <Image
              src={bookingData?.file_url ? bookingData?.file_url : "/empty.png"}
              alt={bookingData?.booking_items?.package?.name ? bookingData?.booking_items?.package?.name : ""}
              width={180}
              height={163}
              className=" w-full h-full  rounded-md object-cover"
            />
          </div>

          <div>
            <p className="text-[40px] lg:text-3xl xl:text-[40px] font-bold text-black">
              ${bookingData?.booking_items?.price || 0}
              <span className="text-lg font-medium text-descriptionColor">
                /per night
              </span>
            </p>
            <h3 className="font-medium text-xl lg:text-lg xl:text-xl mt-1 text-black">{bookingData?.booking_items?.package?.name ? bookingData?.booking_items?.package?.name : ""}</h3>
            <div className="flex gap-2 mt-2">
              <Image
                src="/profile.png"
                alt="hosted"
                width={24}
                height={24}
                className=" rounded-full"
              />
              <p className="text-xs text-grayColor1 mt-1">
                Hosted by{" "}
                <span className="font-semibold text-headerColor">{bookingData?.vendor?.name}</span>
              </p>
            </div>

            <p className="flex items-center gap-1 text-sm text-headerColor mt-2">
              <FaStar className="text-yellow-400" /> {bookingData?.rating_summary?.averageRating || 0}{" "}
              <span className="text-grayColor1">
                ({bookingData?.rating_summary?.totalReviews || 0} reviews)
              </span>
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className=" mt-6  border-b py-4 ">
          <div className="flex w-[80%]  text-xs text-black">
            <div>
              <div className="flex gap-2 text-sm font-semibold pr-5 lg:pr-10 border-r border-grayColor1/20">
                <LucideCalendarDays className="w-6 h-6 text-secondaryColor mt-2" />
                <div>
                  <p className="text-sm text-descriptionColor"> Check-in</p>
                  <p className=" text-base font-semibold text-headerColor">
                    {bookingData?.booking_items?.start_date
                      ? new Date(bookingData?.booking_items?.start_date).toDateString()
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
                    {bookingData?.booking_items?.end_date ? new Date(bookingData?.booking_items?.end_date).toDateString() : "Not selected"}
                  </p>
                  <p className="text-grayColor1 text-sm  ">11:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        <div className="mt-4">
          <h5 className="text-2xl font-medium text-headerColor mt-2">Price details</h5>
          <p className=" text-base font-medium text-grayColor1">Enter discount code</p>
          {/* Discount Input (static for now) */}
          <div className="relative mt-2 mb-4">
            <input
              type="text"
              placeholder="Enter discount code"
              defaultValue="ef@distour62"
              className="w-full border border-secbg-secondaryColor rounded-md py-4 px-4 pr-10 text-sm focus:outline-none"
            />
            <button className="absolute top-1/2 right-3 -translate-y-1/2 bg-secondaryColor p-2 rounded-full text-white text-xs ">
              <FaArrowRightLong className=" text-headerColor" />
            </button>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className=" text-descriptionColor">
                ${bookingData?.price_breakdown?.package_price} × {bookingData?.booking_items?.quantity} nights
              </span>
              <span>${Number(bookingData?.price_breakdown?.package_price) * Number(bookingData?.booking_items?.quantity)}</span>
            </div>

            {/* Example static discount - make dynamic later */}
            <div className="flex justify-between text-base text-headerColor">
              <span className=" text-descriptionColor">{bookingData?.booking_items?.package?.discount || 0}% campaign discount</span>
              <span>- ${bookingData?.price_breakdown?.discount_amount || 0}</span>
            </div>

            <div className="flex text-base text-headerColor  justify-between">
              <span className=" text-descriptionColor">Booking Fees</span>
              <span>Free</span>
            </div>
            {bookingData?.booking_extra_services?.map((service: any) => (
              <div key={service.id} className="flex justify-between text-headerColor">
                <span className="text-descriptionColor">
                  {service?.extra_service?.name}{" "}
                  <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
                </span>
                <span>${service?.price || 0}</span>
              </div>
            ))}

            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor">Service fee</span>
              <span>${bookingData?.service_fee || 0}</span>
            </div>
          </div>
          {/* Total */}
          <div className="flex justify-between mt-4 text-base font-semibold text-black border-t pt-3">
            <span>Total</span>
            <span>${bookingData?.price_breakdown?.final_total || 0}</span>
          </div>
        </div>
        {/* Proceed Button */}
        {
          activeTab !== "step2" && <button onClick={() => setActiveTab("step2")} className="w-full mt-4 bg-secondaryColor cursor-pointer text-headerColor font-medium  py-4 px-4 rounded-full text-base">
            Proceed To Payments
          </button>
        }
      </div>
    </div>
  );
};

export default BookingSummary;
