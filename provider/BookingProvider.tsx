"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Create the context
const BookingContext = createContext(null);

// Helper function to safely get from localStorage
const getFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    return defaultValue;
  }
};

// Create a provider component
export const BookingProvider = ({ children }) => {
  // Initialize state with safe defaults
  const [singleApartment, setSingleApartment] = useState(null);
  const [selectedExtraServices, setSelectedExtraServices] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  // Load data from localStorage on client-side
  useEffect(() => {
    const bookingDetails = getFromLocalStorage("bookingDetails", {});
    if (bookingDetails.apartment) {
      setSingleApartment(bookingDetails.apartment);
    }
   
    if (bookingDetails.startDate) {
      setStartDate(new Date(bookingDetails.startDate));
    }
    if (bookingDetails.endDate) {
      setEndDate(new Date(bookingDetails.endDate));
    }
  }, []);

  // Calculate total days
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  }, [startDate, endDate]);

  // Calculate base price
  const basePrice = useMemo(() => {
    const price = singleApartment ? Number(singleApartment.price) : 0;
    return price * totalDays;
  }, [singleApartment, totalDays]);

  // Calculate extra services total
  const extraServicesTotal = useMemo(() => {
    return selectedExtraServices.reduce((sum, service) => sum + Number(service.price), 0);
  }, [selectedExtraServices]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return basePrice + extraServicesTotal;
  }, [basePrice, extraServicesTotal]);

  const discountNumber = singleApartment?.discount;
  // Calculate discount
  const discount = useMemo(() => {
    return Number((totalPrice * (discountNumber/100)).toFixed(2));
  }, [totalPrice]);

  // Book now handler
  const handleBookNow = () => {
    const bookingDetails = {
      apartment: singleApartment,
      startDate,
      discountNumber,
      endDate,
      selectedExtraServices,
      totalPrice,
      discount,
      totalDays,
      basePrice,
      extraServicesTotal,

    };
    
    // Save to localStorage safely
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
    
    setBookingData(bookingDetails);
  };

  // Clear all data
  const clearStoredData = () => {
    setStartDate(null);
    setEndDate(null);
    setSingleApartment(null);
    setSelectedExtraServices([]);
    setBookingData(null);
    
    // Clear localStorage safely
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem("bookingDetails");
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
  };

  // Context value
  const contextValue = useMemo(() => ({
    singleApartment,
    setSingleApartment,
    selectedExtraServices,
    setSelectedExtraServices,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    totalDays,
    basePrice,
    extraServicesTotal,
    totalPrice,
    discount,
    discountNumber,
    handleBookNow,
    bookingData,
    clearStoredData
  }), [
    singleApartment,
    selectedExtraServices,
    startDate,
    endDate,
    totalDays,
    basePrice,
    extraServicesTotal,
    totalPrice,
    discount,
    discountNumber,
    bookingData
  ]);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the BookingContext
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within BookingProvider');
  }
  return context;
};

