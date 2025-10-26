"use client";
import { useToken } from "@/hooks/useToken";
import { useBookingContext } from "@/provider/BookingProvider";
import { UserService } from "@/service/user/user.service";
import { LucideCalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDone } from "react-icons/md";
import { toast } from "react-toastify";
import Rating from "../reusable/Rating";

const BookingForm = ({ singleApartments, type }: any) => {
  const {
    setSingleApartment,
    selectedExtraServices,
    setSelectedExtraServices,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    discountPrice,
    totalDays,
    basePrice,
    totalPrice,
    handleBookNow
  } = useBookingContext();

  const router = useRouter();
  const { token } = useToken();
  const { price, rating } = singleApartments;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setSingleApartment(singleApartments);
  }, [singleApartments, setSingleApartment]);

  const checkChange = (serviceObject: any) => {
    const serviceExists = selectedExtraServices.some(service => service.id === serviceObject.id);
    if (serviceExists) {
      const updatedServices = selectedExtraServices.filter(service => service.id !== serviceObject.id);
      setSelectedExtraServices(updatedServices);
    } else {
      const updatedServices = [...selectedExtraServices, serviceObject];
      setSelectedExtraServices(updatedServices);
    }
  };


  const handleBook = async() => {
    setLoading(true);
    
    // Fix timezone issue by formatting dates properly
    const formatDateForAPI = (date: Date | null) => {
      if (!date) return "";
      // Get local date components to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const data = {
  type: singleApartments?.type,
  first_name: singleApartments?.user?.first_name,
  last_name: "",
  email: singleApartments?.user?.email,
  booking_items: [
    {
      package_id: singleApartments?.id,
      start_date: formatDateForAPI(startDate),
      end_date: formatDateForAPI(endDate),
      quantity: 1
    }
  ],
 booking_travellers:[]
}
    if (token) {
      try {
        const response = await UserService?.createData(`/booking`,data,token)
        if (response?.data?.success) {
          toast.success(response?.data?.message);
           localStorage.setItem("bookingId", response?.data?.data?.booking?.id);
           setSingleApartment(singleApartments);
           handleBookNow();
            router.push(type === "apartment" ? `/apartment/${singleApartments?.id}/booking` : `/hotel/${singleApartments?.id}/booking`);
              setLoading(false);
        }else{
          toast.error(response?.response?.data?.message?.message);
        }
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.message?.message);
      // router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
          setLoading(false);
      }finally{
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
          Book Your Flat
        </h2>
        <p className="text-sm text-grayColor1 mt-2">
          Reserve your ideal room early for a hassle-free trip; secure comfort and convenience!
        </p>
      </div>

      {/* Price */}
      <div>
        <p className="text-xs text-grayColor1">Starting From</p>
        <div className="flex items-center">
          <h5 className="text-2xl lg:text-[32px] font-semibold text-headerColor">${price}</h5>
          <span className="text-sm text-headerColor">/per night</span>
        </div>
      </div>

      {/* Start Date */}
      <div
        className="flex cursor-pointer items-center justify-between border border-secondaryColor rounded-md p-2"
        onClick={() => document.getElementById("start-date-picker")?.click()}
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
          minDate={new Date()}
        />
        <LucideCalendarDays className="text-secondaryColor" />
      </div>

      {/* End Date */}
      <div
        className="flex items-center cursor-pointer justify-between border border-secondaryColor rounded-md p-2"
        onClick={() => document.getElementById("end-date-picker")?.click()}
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
          minDate={startDate || new Date()}
        />
        <LucideCalendarDays className="text-secondaryColor" />
      </div>

      {/* Rating */}
      <div>
        <div className="flex gap-2 items-center">
          <span className="text-headerColor text-sm">{rating}</span>
          <div className="flex gap-1">
            <Rating rating={rating} />
          </div>
        </div>
        <div className="flex mt-1 items-center gap-2 text-sm text-[#0068EF]">
          Cancellation Policy <span className="text-xs text-gray-400">(Cancel within 24h)</span>
        </div>
      </div>

      {/* Extra Services */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-700">Extra Services</h3>
        <div className="space-y-[10px] mt-3">
          {singleApartments?.package_extra_services?.map((service: any) => (
            <div
              key={service?.id}
              className="flex items-center gap-3 cursor-pointer rounded-md transition"
              onClick={() => checkChange(service?.extra_service)}
            >
              <input
                type="checkbox"
                checked={selectedExtraServices.some(selectedService => selectedService.id === service?.extra_service?.id)}
                onChange={() => checkChange(service?.extra_service)}
                className="peer hidden"
              />
              <div className={`h-4 w-4 flex items-center justify-center border-1 border-gray-300 rounded-xs transition-all ${
                selectedExtraServices.some(selectedService => selectedService.id === service?.extra_service?.id)
                  ? 'bg-green-600 border-green-600' 
                  : 'bg-white border-gray-300'
              }`}>
                {selectedExtraServices.some(selectedService => selectedService.id === service?.extra_service?.id) && (
                  <MdDone className="text-white text-sm" />
                )}
              </div>
              <span className="text-base text-gray-700">{service?.extra_service?.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="mt-6 bg-secondaryColor/10 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-headerColor">Pricing summary</h3>
        <div className="mt-5 text-base space-y-2">
          <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
            <span>{totalDays} Days Stay</span>
            <span>${basePrice}</span>
          </div>
          <div className="flex justify-between border-b border-grayColor1/20 py-2 text-base text-headerColor">
            <span className=" text-descriptionColor">{singleApartments?.discount || 0}% campaign discount</span>
            <span>- ${discountPrice || 0}</span>
          </div>
          
          {selectedExtraServices.map((service) => (
            <div key={service.id} className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>{service.name}</span>
              <span>${service.price}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-base">
          <span>Total</span>
          <span>${totalPrice || 0}</span>
        </div>
      </div>

      {/* Book Now Button */}
       <div>
        { totalDays == 0 && (
          <div className="text-center text-sm text-gray-500">
            <p className="text-red-500">Please select a start and end date</p>
          </div>
        )}
      </div>
      <button
        onClick={ handleBook}
        disabled={totalDays === 0 || loading}
        className="w-full py-3 bg-secondaryColor disabled:bg-grayColor1 disabled:cursor-not-allowed text-blackColor font-medium cursor-pointer rounded-full mt-4 text-base hover:bg-secondaryColor transition"
      >
       {loading ? "Loading..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookingForm;
