"use client";
import { useBookingContext } from "@/provider/BookingProvider";
import { LucideCalendarDays } from "lucide-react";
import Image from "next/image";
import { FaArrowRightLong, FaStar } from "react-icons/fa6";

const BookingSummary = () => {
  const {
    singleApartment,
    selectedServices,
    startDate,
    endDate,
    servicePrices,
    carRent,
    dinnerPrice,
    totalPrice,
    totalDay,
    calculateTotal,
  } = useBookingContext();
  console.log(singleApartment);
console.log(totalPrice);
 if (!singleApartment) return null;
  let discountNumber = 10
  let persentage = discountNumber/100
  const { title, reviews, price, rating, image } = singleApartment;
const discount =(totalPrice * persentage).toFixed(2)
  return (
   
    <div className="rounded-xl border border-secondaryColor bg-secondaryColor/5 p-4 shadow-md text-sm font-medium text-gray-800">
         {
        !singleApartment ? "Apartment data not available."  :
        <div>
             {/* Apartment Header */}
      <div className="flex items-start gap-4">
        <div className=" w-[180px] h-[163px]">
          <img
            src={image.src || "/apartment.jpg"}
            alt={title ? title : ""}
            width={180}
            height={163}
            className=" w-full h-full  rounded-md object-cover"
          />
        </div>

        <div>
          <p className="text-[40px] font-bold text-black">
            ${price || 0}
            <span className="text-lg font-medium text-descriptionColor">
              /per night
            </span>
          </p>
          <h3 className="font-medium text-xl mt-1 text-black">{ title ? title : ""}</h3>
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
              <span className="font-semibold text-headerColor">Michalle</span>
            </p>
          </div>

          <p className="flex items-center gap-1 text-sm text-headerColor mt-2">
            <FaStar className="text-yellow-400" /> {rating || 0}{" "}
            <span className="text-grayColor1">
              ({reviews?.length || 0} reviews)
            </span>
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className=" mt-6  border-b py-4 ">
        <div className="flex w-[80%]  text-xs text-black">
          <div>
            <div className="flex gap-2 text-sm font-semibold pr-10 border-r border-grayColor1/20">
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
            <FaArrowRightLong  className=" text-headerColor"/>
          </button>
        </div>

        {/* Pricing Breakdown */}
        <div className="space-y-3 text-base">
          <div className="flex justify-between">
            <span className=" text-descriptionColor">
              ${price} × {totalDay} nights
            </span>
            <span>${(price * totalDay).toFixed(2)}</span>
          </div>

          {/* Example static discount - make dynamic later */}
          <div className="flex justify-between text-base text-headerColor">
            <span className=" text-descriptionColor">{discountNumber}% campaign discount</span>
            <span>- ${discount}</span>
          </div>

          <div className="flex text-base text-headerColor  justify-between">
            <span className=" text-descriptionColor">Booking Fees</span>
            <span>Free</span>
          </div>

          {selectedServices.dailyHousekeeping && (
            <div className="flex justify-between text-headerColor">
              <span className="text-descriptionColor">
                Daily housekeeping{" "}
               <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${servicePrices?.dailyHousekeeping || 40}</span>
            </div>
          )}

     
            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor" >
                Buffet Dinner{" "}
               <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${dinnerPrice}</span>
            </div>
        
          {selectedServices.breakfast && (
            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor">
               Breakfast included{" "}
                <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${servicePrices.breakfast || 0}</span>
            </div>
          )}
          {selectedServices.groceryDelivery && (
            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor">
               Grocery delivery{" "}
                <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${servicePrices.groceryDelivery || 0}</span>
            </div>
          )}
          {selectedServices.fullCleaning && (
            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor">
              Chauffeur-driven car{" "}
                <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${servicePrices.fullCleaning}</span>
            </div>
          )}
          {selectedServices.chauffeur && (
            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor">
               Full apartment cleaning{" "}
                <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${servicePrices.chauffeur}</span>
            </div>
          )}
         
            <div className="flex text-base text-headerColor justify-between">
              <span className=" !text-descriptionColor" >
                Car Rental{" "}
                <span className="text-grayColor1 bg-secondaryColor/20 px-3 pb-[3px] py-[2px] leading-[100%] rounded-full text-sm">Extra</span>
              </span>
              <span>${carRent}</span>
            </div>
          <div className="flex text-base text-headerColor justify-between">
            <span className=" !text-descriptionColor">Service fee</span>
            <span>$170</span>
          </div>
        </div>
        {/* Total */}
        <div className="flex justify-between mt-4 text-base font-semibold text-black border-t pt-3">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2) -Number(discount)}</span>
        </div>
      </div>
      {/* Proceed Button */}
      <button className="w-full mt-4 bg-secondaryColor cursor-pointer text-headerColor font-medium  py-4 px-4 rounded-full text-base">
        Proceed To Payments
      </button>
        </div>
    }
     
    </div>
  );
};

export default BookingSummary;
