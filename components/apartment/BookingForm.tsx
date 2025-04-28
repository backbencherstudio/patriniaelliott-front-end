"use client";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDone } from "react-icons/md"; // For the checked icon

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
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

    return basePrice * daysStayed + serviceCost;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-[#D6AE29]/10 shadow-xl rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Book Your Flat</h2>
      <p className="text-sm text-gray-500">
        Reserve your ideal room early for a hassle-free trip; secure comfort and convenience!
      </p>

      {/* Starting Form */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold text-grebg-green-600">$378</span>
        <span className="text-sm text-gray-600">/per night</span>
      </div>
  {/* Start Date */}
          <div className="flex cursor-pointer items-center justify-between border border-gray-300 rounded-md p-2" onClick={() => {
            // Trigger date picker on input focus (clicking the input)
            const input = document.getElementById('start-date-picker');
            input?.click();
          }}>
            <input
              type="text"
              placeholder="Start date"
              value={startDate ? startDate.toLocaleDateString() : ''}
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
            <CalendarIcon className="text-sebg-secondaryColor" />
          </div>
          {/* End Date */}
          <div className="flex items-center cursor-pointer justify-between border border-gray-300 rounded-md p-2" onClick={() => {
            // Trigger date picker on input focus (clicking the input)
            const input = document.getElementById('end-date-picker');
            input?.click();
          }}>
            <input
              type="text"
              value={endDate ? endDate.toLocaleDateString() : ''}
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
            <CalendarIcon className="text-sebg-secondaryColor" />
          </div>

      {/* Extra Services */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Extra Services</h3>
        <div className="space-y-4 mt-4">
          {/* Service: Daily Housekeeping */}
          <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.dailyHousekeeping}
              onChange={() => handleServiceChange("dailyHousekeeping")}
              className="peer hidden"
            />
            <div className="h-5 w-5 flex items-center justify-center border-2 border-gray-300 rounded-md peer-checked:bg-green-600 peer-checked:border-grebg-green-600 transition-all">
              {selectedServices.dailyHousekeeping && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Daily housekeeping</span>
          </label>

          {/* Service: Breakfast Included */}
          <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.breakfast}
              onChange={() => handleServiceChange("breakfast")}
              className="peer hidden"
            />
            <div className="h-5 w-5 flex items-center justify-center border-2 border-gray-300 rounded-md peer-checked:bg-green-600 peer-checked:border-grebg-green-600 transition-all">
              {selectedServices.breakfast && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Breakfast included</span>
          </label>

          {/* Service: Grocery Delivery */}
          <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition">
            <input
              type="checkbox"
              checked={selectedServices.groceryDelivery}
              onChange={() => handleServiceChange("groceryDelivery")}
              className="peer hidden"
            />
            <div className="h-5 w-5 flex items-center justify-center border-2 border-gray-300 rounded-md peer-checked:bg-green-600 peer-checked:border-grebg-green-600 transition-all">
              {selectedServices.groceryDelivery && (
                <MdDone className="text-white text-sm" />
              )}
            </div>
            <span className="text-base text-gray-700">Grocery delivery</span>
          </label>

          {/* Other services can be added similarly */}
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800">Pricing summary</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Stay for {startDate && endDate ? (endDate - startDate) / (1000 * 3600 * 24) : 0} nights</span>
            <span>${378 * ((endDate - startDate) / (1000 * 3600 * 24))}</span>
          </div>
          {selectedServices.dailyHousekeeping && (
            <div className="flex justify-between text-gray-600">
              <span>Daily housekeeping</span>
              <span>$40</span>
            </div>
          )}
          {selectedServices.breakfast && (
            <div className="flex justify-between text-gray-600">
              <span>Breakfast included</span>
              <span>$50</span>
            </div>
          )}
          {selectedServices.groceryDelivery && (
            <div className="flex justify-between text-gray-600">
              <span>Grocery delivery</span>
              <span>$30</span>
            </div>
          )}
          {/* Add other services */}
        </div>
        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>

      {/* Book Now Button */}
      <button className="w-full py-3 bg-secondaryColor text-white rounded-lg mt-6 text-xl hover:bg-secondaryColor transition">
        Book Now
      </button>
    </div>
  );
};

export default BookingForm;
