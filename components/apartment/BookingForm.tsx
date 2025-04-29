"use client";
import { LucideCalendarDays } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDone } from "react-icons/md"; // For the checked icon
import Rating from "../reusable/Rating";

const BookingForm = ({ singleApartment }: any) => {
  const { title,cancellation, reviews, price, rating, image, location } = singleApartment;
  const [startDate, setStartDate] = useState(null);
  const[carRent, setCarRent]=useState(150)
  const[dinnerPrice, setDinnerPrice]=useState(150)
  const [endDate, setEndDate] = useState(null);
  const [selectedServices, setSelectedServices] = useState({
    breakfast: false,
    groceryDelivery: false,
    dailyHousekeeping: true, // Default checked
    chauffeur: false,
    fullCleaning: false,
  });

  // Pricing for services
  const servicePrices = {
    breakfast: 50,
    groceryDelivery: 30,
    dailyHousekeeping: 40,
    chauffeur: 100,
    fullCleaning: 60,
  };

  // Handle service checkbox change
  const handleServiceChange = (service) => {
    setSelectedServices((prevState) => ({
      ...prevState,
      [service]: !prevState[service],
    }));
  };

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Calculate total price
  const calculateTotal = () => {
    const basePrice = 378; // Base price per night
    const daysStayed =
      startDate && endDate ? (endDate - startDate) / (1000 * 3600 * 24) : 0;
    const serviceCost = Object.keys(selectedServices)
      .filter((service) => selectedServices[service])
      .reduce((total, service) => total + servicePrices[service], 0);

    return basePrice * daysStayed + serviceCost +carRent +dinnerPrice;
  };

  return (
    <div className=" p-6 bg-[#D6AE29]/8 shadow-xl border border-secondaryColor rounded-lg space-y-4">
      <div className="text-center border-b border-grayColor1/20 pb-3">
        <h2 className=" text-2xl  lg:text-[32px] font-bold text-headerColor leading-[150%]">
          Book Your Flat
        </h2>
        <p className="text-sm text-grayColor1 mt-2">
          Reserve your ideal room early for a hassle-free trip; secure comfort
          and convenience!
        </p>
      </div>

      {/* Starting Form */}
      <div>
        <p className=" text-xs text-grayColor1">Starting Form</p>
        <div className="flex items-center ">
          <h5 className="text-2xl lg:text-[32px] font-semibold text-headerColor">
            {price}
          </h5>
          <span className="text-sm text-headerColor">/per night</span>
        </div>
      </div>

      {/* Start Date */}
      <div
        className="flex cursor-pointer items-center justify-between border border-secondaryColor rounded-md p-2"
        onClick={() => {
          // Trigger date picker on input focus (clicking the input)
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
          onChange={handleStartDateChange}
          placeholderText="Select a date"
          className="hidden"
        />
        <LucideCalendarDays className="text-secondaryColor" />
      </div>
      {/* End Date */}
      <div
        className="flex items-center cursor-pointer justify-between border border-secondaryColor rounded-md p-2"
        onClick={() => {
          // Trigger date picker on input focus (clicking the input)
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
          onChange={handleEndDateChange}
          placeholderText="Select a date"
          className="hidden"
        />
        <LucideCalendarDays className="text-secondaryColor" />
      </div>

      <div>
        <div className="flex gap-2 items-center">
          <span className="text-headerColor text-sm">{rating}</span>
          <div className="flex gap-1">
            <Rating rating={rating} />
          </div>
        </div>
         <div className="flex mt-1 items-center gap-2 text-sm text-[#0068EF] ">
          Cancellation Policy{" "}
          <span className="text-xs text-gray-400">({cancellation})</span>
        </div>
      </div>
       
      {/* Extra Services */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-700">Extra Services</h3>
        <div className="space-y-[10px] mt-3">
          {/* Service: Daily Housekeeping */}
          <label className="flex items-center gap-3 cursor-pointer  rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.dailyHousekeeping}
              onChange={() => handleServiceChange("dailyHousekeeping")}
              className="peer hidden"
            />
            <div className="h-4 w-4 flex items-center justify-center border-1 border-gray-300 rounded-xs peer-checked:bg-green-600 peer-checked:border-green-600 transition-all">
              {selectedServices.dailyHousekeeping && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Daily housekeeping</span>
          </label>
          {/* Service: Breakfast Included */}
          <label className="flex items-center gap-3 cursor-pointer  rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.breakfast}
              onChange={() => handleServiceChange("breakfast")}
              className="peer hidden"
            />
            <div className="h-4 w-4 flex items-center justify-center border-1 border-gray-300 rounded-xs peer-checked:bg-green-600 peer-checked:border-green-600 transition-all">
              {selectedServices.breakfast && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Breakfast included</span>
          </label>
          {/* Service: Grocery Delivery */}
          <label className="flex items-center gap-3 cursor-pointer rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.groceryDelivery}
              onChange={() => handleServiceChange("groceryDelivery")}
              className="peer hidden"
            />
            <div className="h-4 w-4 flex items-center justify-center border-1 border-gray-300 rounded-xs peer-checked:bg-green-600 peer-checked:border-green-600 transition-all">
              {selectedServices.groceryDelivery && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Grocery delivery</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer  rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.chauffeur}
              onChange={() => handleServiceChange("chauffeur")}
              className="peer hidden"
            />
            <div className="h-4 w-4 flex items-center justify-center border-1 border-gray-300 rounded-xs peer-checked:bg-green-600 peer-checked:border-green-600 transition-all">
              {selectedServices.chauffeur && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Chauffeur-driven car</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer  rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.fullCleaning}
              onChange={() => handleServiceChange("fullCleaning")}
              className="peer hidden"
            />
            <div className="h-4 w-4 flex items-center justify-center border-1 border-gray-300 rounded-xs peer-checked:bg-green-600 peer-checked:border-green-600 transition-all">
              {selectedServices.fullCleaning && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Full apartment cleaning</span>
          </label>
          {/* Other services can be added similarly */}
        </div>
      </div>
      {/* Pricing Summary */}
      <div className="mt-6 bg-secondaryColor/10 rounded-lg p-4">
        <h3 className="text-xl font-semibold text-headerColor">Pricing summary</h3>
        <div className="mt-5 text-base space-y-2">
          <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
            <span>
              {startDate && endDate
                ? (endDate - startDate) / (1000 * 3600 * 24)
                : 0}{" "}
              Days Stay
            </span>
            <span>${378 * ((endDate - startDate) / (1000 * 3600 * 24))}</span>
          </div>
         
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Car Rental</span>
              <span>${carRent}</span>
            </div>
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Buffet Dinner</span>
              <span>${dinnerPrice}</span>
            </div>
         
          {selectedServices.dailyHousekeeping && (
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Daily housekeeping</span>
              <span>${servicePrices.dailyHousekeeping}</span>
            </div>
          )}
          {selectedServices.breakfast && (
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Breakfast included</span>
              <span>${servicePrices.breakfast}</span>
            </div>
          )}
          {selectedServices.groceryDelivery && (
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Grocery delivery</span>
              <span>${servicePrices.groceryDelivery}</span>
            </div>
          )}
          {selectedServices.chauffeur && (
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Chauffeur-driven car</span>
              <span>${servicePrices.chauffeur}</span>
            </div>
          )}
          {selectedServices.groceryDelivery && (
            <div className="flex justify-between text-descriptionColor border-b border-grayColor1/20 py-2">
              <span>Full apartment cleaning</span>
              <span>${servicePrices.fullCleaning}</span>
            </div>
          )}
          {/* Add other services */}
        </div>
        <div className="flex justify-between mt-4 text-base ">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>

      {/* Book Now Button */}
      <button className="w-full py-3 bg-secondaryColor text-blackColor font-medium cursor-pointer rounded-full mt-6 text-base hover:bg-secondaryColor transition">
        Book Now
      </button>
    </div>
  );
};

export default BookingForm;
