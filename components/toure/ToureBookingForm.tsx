"use client";
import { useToken } from "@/hooks/useToken";
import { useToureBookingContext } from "@/provider/TourBookingProvider";
import { UserService } from "@/service/user/user.service";
import { LucideCalendarDays, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import Rating from "../reusable/Rating";

const ToureBookingForm = ({ singlToureDetails }: any) => {
  const {
    setSingleToure,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    servicefee,
    calculateTotal,

    discountNumber,
    travelprice,
    setTravelPrice,
    discount,
    travelCount, 
    setTravelCount
  } = useToureBookingContext();

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useToken();
  const {  price, } = singlToureDetails;

  // Initialize dates only once when component mounts
  useEffect(() => {
    if (!startDate && singlToureDetails?.calendar_configuration) {
      const calendarStartDate = new Date(singlToureDetails.calendar_configuration.calendar_start_date);
      const calendarEndDate = new Date(singlToureDetails.calendar_configuration.calendar_end_date);
      const today = new Date();
      
      // Set start date to calendar start date or today, whichever is later
      const initialStartDate = calendarStartDate > today ? calendarStartDate : today;
      setStartDate(initialStartDate);
      
      const durationDays = parseInt(singlToureDetails?.duration) || 4;
      const calculatedEndDate = new Date(initialStartDate);
      calculatedEndDate.setDate(initialStartDate.getDate() + durationDays);
      
      // Make sure end date doesn't exceed calendar end date
      const finalEndDate = calculatedEndDate > calendarEndDate ? calendarEndDate : calculatedEndDate;
      setEndDate(finalEndDate);
    }
  }, [singlToureDetails?.calendar_configuration]); // Depend on calendar configuration

  // Auto-update end date when start date changes
  useEffect(() => {
    if (startDate && singlToureDetails?.duration && singlToureDetails?.calendar_configuration) {
      const durationDays = parseInt(singlToureDetails.duration);
      const calendarEndDate = new Date(singlToureDetails.calendar_configuration.calendar_end_date);
      const calculatedEndDate = new Date(startDate);
      calculatedEndDate.setDate(startDate.getDate() + durationDays);
      
      // Make sure end date doesn't exceed calendar end date
      const finalEndDate = calculatedEndDate > calendarEndDate ? calendarEndDate : calculatedEndDate;
      setEndDate(finalEndDate);
    }
  }, [startDate, singlToureDetails?.duration, singlToureDetails?.calendar_configuration, setEndDate]);

  // Update single tour data when it changes
  useEffect(() => {
    if (singlToureDetails) {
      setSingleToure(singlToureDetails);
    }
  }, [singlToureDetails?.id]); // Only depend on tour ID, not the entire object

  // Update travel price when travel count or price changes
  useEffect(() => {
    if (price && travelCount) {
      setTravelPrice(price * travelCount);
    }
  }, [price, travelCount, setTravelPrice]); // Now safe to include setTravelPrice since it's memoized

  const handleBook = async () => {
    setLoading(true);
    
    const bookingData = {
      type: "tour",
      first_name: singlToureDetails?.user?.first_name || "",
      last_name: "",
      email: singlToureDetails?.user?.email || "",
      booking_items: [
        {
          package_id: singlToureDetails?.id,
          start_date: startDate?.toISOString() || "",
          end_date: endDate?.toISOString() || "",
          quantity: travelCount
        }
      ],
      booking_travellers: []
    };

    if (token) {
      try {
        const response = await UserService?.createData(`/booking`, bookingData, token);
        
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          localStorage.setItem("bookingId", response?.data?.data?.booking?.id);
          setSingleToure(singlToureDetails);
          router.push(`/toure/${singlToureDetails?.id}/booking`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Booking failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      const currentUrl = window.location.pathname + window.location.search;
      router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
      setLoading(false);  
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
            ${singlToureDetails?.price}
          </h5>
          <span className="text-sm text-headerColor">/per person</span>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center">
          <span className="text-headerColor text-sm">{singlToureDetails?.rating_summary?.averageRating}</span>
          <div className="flex gap-1">
            <Rating rating={singlToureDetails?.rating_summary?.averageRating} />
          </div>
        </div>

      </div>
      <div>
        <p className="text-grayColor1 text-base"><span className="text-headerColor font-medium">{singlToureDetails?.duration} Days
          {/* {singlToureDetails?.duration_type} */}
          </span> in {singlToureDetails?.city} Tour Package</p>
        <div className="flex mt-1 items-center gap-2 text-base text-[#0068EF] ">
          Cancellation Policy{" "}
          <span className="text-sm text-gray-400">(24 hours)</span>
        </div>
      </div>

      {/* Date Selection Container */}
      <div className="flex border border-secondaryColor rounded-lg overflow-hidden">
        {/* Check-in Date */}
        <div
          className="flex-1 cursor-pointer p-4 border-r border-gray-200 hover:bg-gray-50 transition-colors"
          onClick={() => {
            const input = document.getElementById("start-date-picker");
            input?.click();
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondaryColor rounded-full flex items-center justify-center flex-shrink-0">
              <LucideCalendarDays className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Check-in</p>
              <p className="text-base font-semibold text-gray-900">
                {startDate ? startDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                }) : "Select date"}
              </p>
              <p className="text-sm text-gray-500">12:00 PM</p>
            </div>
          </div>
          <DatePicker
            id="start-date-picker"
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Select a date"
            className="hidden"
            minDate={singlToureDetails?.calendar_configuration?.calendar_start_date ? new Date(singlToureDetails.calendar_configuration.calendar_start_date) : new Date()}
            maxDate={singlToureDetails?.calendar_configuration?.calendar_end_date ? new Date(singlToureDetails.calendar_configuration.calendar_end_date) : null}
          />
        </div>

        {/* Check-out Date - Auto calculated */}
        <div className="flex-1 p-4 bg-gray-50 border-l border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
              <LucideCalendarDays className="text-white text-sm" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">Check-out</p>
              <p className="text-base font-semibold text-gray-900">
                {endDate ? endDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                }) : "Auto calculated"}
              </p>
              <p className="text-sm text-gray-500">11:00 AM</p>
              <p className="text-xs text-gray-400 mt-1">
                Auto: {singlToureDetails?.duration} {singlToureDetails?.duration_type} after check-in
              </p>
            </div>
          </div>
          <DatePicker
            id="start-date-picker"
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Select a date"
            className="hidden"
            minDate={singlToureDetails?.calendar_configuration?.calendar_start_date ? new Date(singlToureDetails.calendar_configuration.calendar_start_date) : new Date()}
            maxDate={singlToureDetails?.calendar_configuration?.calendar_end_date ? new Date(singlToureDetails.calendar_configuration.calendar_end_date) : null}
          />
        </div>
      </div>

      <div className=" flex justify-between text-sm py-2 px-4 rounded-md border border-secondaryColor">
        <span className=" text-grayColor1">Add your traveler</span>
        <div className=" flex items-center  gap-3">
          <button onClick={() => setTravelCount(travelCount === 0 ? 0 : travelCount - 1)} className=" cursor-pointer p-1 rounded-full border border-secondaryColor "><FiMinus /></button>
          <p>{travelCount}</p>
          <button onClick={() => setTravelCount(travelCount + 1)} className=" cursor-pointer p-1 rounded-full border border-secondaryColor "><FiPlus /></button>
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
            <span className=" text-descriptionColor">{discountNumber || 0}% campaign discount</span>
            <span>- ${discount}</span>
          </div>

          <div className="flex text-descriptionColor justify-between text-base border-b border-grayColor1/20 py-2">
            <span className=" ">Service fee</span>
            <span> ${servicefee || 0}</span>
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
        disabled={loading || travelCount === 0}
        className="w-full py-3 bg-secondaryColor disabled:bg-grayColor1 disabled:cursor-not-allowed text-blackColor font-medium cursor-pointer rounded-full mt-6 text-base hover:bg-secondaryColor transition"
      >
        {loading ? "Loading..." : "Book Now"}
      </button>
    </div>
  );
};

export default ToureBookingForm;
