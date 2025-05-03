"use client"
import { createContext, useContext, useState } from "react";

// Create the context
const ToureBookingContext = createContext(null);

// Create a provider component
export const ToureBookingProvider = ({ children }) => {
  const [singleToure, setSingleToure] = useState(null);
  const [travelprice, setTravelPrice] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  
  const totalDay = startDate && endDate ? (endDate - startDate) / (1000 * 3600 * 24) : 0;
  const servicefee = 40;

  // Update travel price when singleToure changes
  const updateTravelPrice = (price) => {
    if (price) {
      setTravelPrice(Number(price));
    }
  };
  
  const calculateTotal = () => {
    return travelprice + servicefee;
  };

  const totalPrice = calculateTotal();
  const discountNumber = 10;
  const percentage = discountNumber / 100;
  const discount = Number((totalPrice * percentage).toFixed(2));

  const handleBookNow = () => {
    const bookingDetails = {
      toure: singleToure,
      startDate,
      endDate,
      servicefee,
      totalPrice,
      discount
    };
    setBookingData(bookingDetails);
    console.log("toure confirmed:", bookingDetails);
  };

  return (
    <ToureBookingContext.Provider
      value={{
        singleToure,
        setSingleToure,
        startDate,
        setStartDate,
        endDate,
        travelprice,
        setTravelPrice,
        updateTravelPrice,
        setEndDate,
        servicefee,
        totalDay,
        totalPrice,
        calculateTotal,
        handleBookNow,
        bookingData,
        discountNumber,
        discount
      }}
    >
      {children}
    </ToureBookingContext.Provider>
  );
};

// Custom hook to use the BookingContext
export const useToureBookingContext = () => {
  return useContext(ToureBookingContext);
};
