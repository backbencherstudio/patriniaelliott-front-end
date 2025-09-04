"use client";
import { useToken } from "@/hooks/useToken";
import { useToureBookingContext } from "@/provider/TourBookingProvider";
import { LucideCalendarDays, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import Rating from "../reusable/Rating";

const ToureBookingForm = ({ singlToureDetails }: any) => {
  const {
    setSingleToure,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    servicefee,
    totalDay,
    totalPrice,
    calculateTotal,
    handleBookNow,
    bookingData,
    discountNumber,
    travelprice,
    setTravelPrice,
    discount,
    travelCount, setTravelCount

  } = useToureBookingContext();

  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    const durationDays = parseInt(duration) || 4; // Default to 4 if duration is not provided
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + durationDays);
    setEndDate(endDate);
  }, [setStartDate, setEndDate]);

  // ✅ Fix: useEffect এ state update করা
  useEffect(() => {
    setSingleToure(singlToureDetails);
  }, [singlToureDetails, setSingleToure]);

  const router = useRouter()
  const { token } = useToken()
  const { title, cancellation, duration, reviews, price, rating, image, location } =
    singlToureDetails;
  setTravelPrice(price * travelCount)
     const handleBook = () => {

     if (token) {
       // ✅ Ensure tour data is saved to localStorage before proceeding
       setSingleToure(singlToureDetails);
       // If token exists, proceed to the booking page
       handleBookNow();
       router.push(`/toure/${singlToureDetails?.id}/booking`);
     } else {
       // If token doesn't exist, redirect to login page with current page as a redirect
       const currentUrl = window.location.pathname + window.location.search;
       router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
     }

   };
  return (
    <div className="p-6 bg-[#D6AE29]/8 shadow-xl border border-secondaryColor rounded-lg space-y-4">
      <div className="text-center border-b border-grayColor1/20 pb-3">
        <h2 className="text-2xl lg:text-[32px] font-bold text-headerColor leading-[150%]">
          Book Your Package
        </h2>
        <p className="text-sm text-grayColor1 mt-2">
          Enhance your travel experience by customizing your tour package with exclusive add-ons.
        </p>
      </div>

      {/* Starting Form */}
      <div>
        <p className="text-xs text-grayColor1">Starting Form</p>
        <div className="flex items-center">
          <h5 className="text-2xl lg:text-[32px] font-semibold text-headerColor">
            ${price}
          </h5>
          <span className="text-sm text-headerColor">/per person</span>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <span className="text-headerColor text-sm">{rating}</span>
          <div className="flex gap-1">
            <Rating rating={rating} />
          </div>
        </div>

      </div>
      <div>
        <p className="text-grayColor1 text-base"><span className="text-headerColor font-medium">{totalDay} Nights</span> in {location} Tour Package</p>
        <div className="flex mt-1 items-center gap-2 text-base text-[#0068EF] ">
          Cancellation Policy{" "}
          <span className="text-sm text-gray-400">({cancellation})</span>
        </div>
      </div>

      {/* Start Date */}
      <div
        className="flex cursor-pointer items-center justify-between border border-secondaryColor rounded-md p-2"
        onClick={() => {
          const input = document.getElementById("start-date-picker");
          input?.click();
        }}
      >
        <input
          type="text"
          placeholder="Start date"
          value={startDate ? startDate.toLocaleDateString() : ""}
          readOnly
          className="border-0 outline-none text-gray-700 text-sm w-full"
        />
        <DatePicker
          id="start-date-picker"
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Select a date"
          className="hidden"
        />
        <LucideCalendarDays className="text-secondaryColor" />
      </div>

      {/* End Date */}
      <div
        className="flex items-center cursor-pointer justify-between border border-secondaryColor rounded-md p-2"
        onClick={() => {
          const input = document.getElementById("end-date-picker");
          input?.click();
        }}
      >
        <input
          type="text"
          value={endDate ? endDate.toLocaleDateString() : ""}
          placeholder="End date"
          readOnly
          className="border-0 outline-none text-gray-700 text-sm w-full"
        />
        <DatePicker
          id="end-date-picker"
          selected={endDate}
          onChange={setEndDate}
          placeholderText="Select a date"
          className="hidden"
        />
        <LucideCalendarDays className="text-secondaryColor" />
      </div>

      <div className=" flex justify-between text-sm py-2 px-4 rounded-md border border-secondaryColor">
        <span className=" text-grayColor1">Add your traveler</span>
        <div className=" flex items-center  gap-3">
          <button onClick={() => setTravelCount((prev) => prev == 0 ? 0 : prev - 1)} className=" cursor-pointer p-1 rounded-full border border-secondaryColor "><FiMinus /></button>
          <p>{travelCount}</p>
          <button onClick={() => setTravelCount((prev) => prev + 1)} className=" cursor-pointer p-1 rounded-full border border-secondaryColor "><FiPlus /></button>
        </div>

      </div>




      {/* Pricing Summary */}
      <div className="mt-6 bg-secondaryColor/10 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-headerColor">
          Pricing summary
        </h3>
        <div className="mt-5 text-base space-y-2">
          <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
            <span className=" items-center gap-1 flex">
              Package 1 <X size={16} /> {travelCount}
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
          <span>${calculateTotal() - discount}</span>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBook}
        className="w-full py-3 bg-secondaryColor text-blackColor font-medium cursor-pointer rounded-full mt-6 text-base hover:bg-secondaryColor transition"
      >
        Book Now
      </button>
    </div>
  );
};

export default ToureBookingForm;
