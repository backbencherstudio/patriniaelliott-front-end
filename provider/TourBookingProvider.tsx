"use client"
import { createContext, useContext, useState } from "react";

// Create the context
const ToureBookingContext = createContext(null);

// LocalStorage keys
const STORAGE_KEYS = {
  SINGLE_TOURE: 'toure_booking_single_toure',
  TRAVEL_PRICE: 'toure_booking_travel_price',
  START_DATE: 'toure_booking_start_date',
  END_DATE: 'toure_booking_end_date',
  TRAVEL_COUNT: 'toure_booking_travel_count'
};

// Helper functions for localStorage
const getFromStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return defaultValue;
  }
};

const setToStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
  }
};

// Create a provider component
export const ToureBookingProvider = ({ children }) => {
  const [singleToure, setSingleToure] = useState(() =>
    getFromStorage(STORAGE_KEYS.SINGLE_TOURE, null)
  );
  const [travelprice, setTravelPrice] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRAVEL_PRICE, 0)
  );
  const [startDate, setStartDate] = useState<any>(() => {
    const stored = getFromStorage(STORAGE_KEYS.START_DATE, null);
    return stored ? new Date(stored) : null;
  });
  const [endDate, setEndDate] = useState<any>(() => {
    const stored = getFromStorage(STORAGE_KEYS.END_DATE, null);
    return stored ? new Date(stored) : null;
  });
  const [bookingData, setBookingData] = useState(null);
  const [travelCount, setTravelCount] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRAVEL_COUNT, 1)
  );
  const totalDay = startDate && endDate ? (endDate - startDate) / (1000 * 3600 * 24) : 0;
  const servicefee = 40;

  // Wrapper functions with localStorage persistence
  const handleSetSingleToure = (toure) => {
    setSingleToure(toure);
    setToStorage(STORAGE_KEYS.SINGLE_TOURE, toure);
  };

  const handleSetTravelPrice = (price) => {
    setTravelPrice(price);
    setToStorage(STORAGE_KEYS.TRAVEL_PRICE, price);
  };

  const handleSetStartDate = (date) => {
    setStartDate(date);
    if (date) {
      setToStorage(STORAGE_KEYS.START_DATE, date.toISOString());
    }
  };

  const handleSetEndDate = (date) => {
    setEndDate(date);
    if (date) {
      setToStorage(STORAGE_KEYS.END_DATE, date.toISOString());
    }
  };

  const handleSetTravelCount = (count) => {
    setTravelCount(count);
    setToStorage(STORAGE_KEYS.TRAVEL_COUNT, count);
  };

  // Update travel price when singleToure changes
  const updateTravelPrice = (price) => {
    if (price) {
      handleSetTravelPrice(Number(price));
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
        setSingleToure: handleSetSingleToure,
        startDate,
        setStartDate: handleSetStartDate,
        endDate,
        travelprice,
        setTravelPrice: handleSetTravelPrice,
        updateTravelPrice,
        setEndDate: handleSetEndDate,
        servicefee,
        totalDay,
        totalPrice,
        calculateTotal,
        handleBookNow,
        bookingData,
        discountNumber,
        discount,
        travelCount, 
        setTravelCount: handleSetTravelCount
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
