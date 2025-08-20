"use client"
import { createContext, useContext, useState } from "react";

// Create the context
const BookingContext = createContext(null);

// Create a provider component
export const BookingProvider = ({ children }) => {
  const [singleApartment, setSingleApartment] = useState(null);
  const [selectedServices, setSelectedServices] = useState({
    breakfast: false,
    groceryDelivery: false,
    dailyHousekeeping: true,
    chauffeur: false,
    fullCleaning: false,
  });

  // Set initial dates: today and tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  
  const [carRent, setCarRent] = useState(150);
  const [dinnerPrice, setDinnerPrice] = useState(150);
  const [bookingData, setBookingData] = useState(null); // To store the final booking data

  const totalDay = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 1;
  
  // Handle service checkbox change
  const handleServiceChange = (service) => {
    setSelectedServices((prevState) => ({
      ...prevState,
      [service]: !prevState[service],
    }));
  };
  
  // Pricing for services
  const servicePrices = {
    breakfast: 50,
    groceryDelivery: 30,
    dailyHousekeeping: 40,
    chauffeur: 100,
    fullCleaning: 60,
  };
  
  // Calculate total price
  let price;
  if(singleApartment){
    price = Number(singleApartment.price)
  } else {
    price = 0
  }

  const calculateTotal = () => {
    const daysStayed =
      startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 0;
    const serviceCost = Object.keys(selectedServices)
      .filter((service) => selectedServices[service])
      .reduce((total, service) => total + servicePrices[service], 0);

    return price * daysStayed + serviceCost + carRent + dinnerPrice;
  };

  let totalPrice = calculateTotal();
  let discountNumber = 10
  let persentage = discountNumber/100

  const discount = (totalPrice * persentage).toFixed(2)
  
  // Handle "Book Now" click
  const handleBookNow = () => {
    const bookingDetails = {
      apartment: singleApartment,
      startDate,
      endDate,
      selectedServices,
      carRent,
      dinnerPrice,
      totalPrice,
      discount
    };
    setBookingData(bookingDetails); // Store booking data in context
    // Optionally, you can perform other actions such as API calls here
    console.log("Booking confirmed:", bookingDetails);
  };

  return (
    <BookingContext.Provider
      value={{
        singleApartment,
        setSingleApartment,
        selectedServices,
        handleServiceChange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        servicePrices,
        carRent,
        totalDay,
        setCarRent,
        dinnerPrice,
        totalPrice,
        setDinnerPrice,
        calculateTotal,
        handleBookNow,
        bookingData,
        discountNumber,
        discount // Share the booking data
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the BookingContext
export const useBookingContext = () => {
  return useContext(BookingContext);
};
