"use client"
import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Create the context
const BookingContext = createContext(null);

// LocalStorage keys
const STORAGE_KEYS = {
  SELECTED_SERVICES: 'booking_selected_services',
  CAR_RENT: 'booking_car_rent',
  DINNER_PRICE: 'booking_dinner_price',
  START_DATE: 'booking_start_date',
  END_DATE: 'booking_end_date'
};

// Default values
const DEFAULT_SERVICES = {
  breakfast: false,
  groceryDelivery: false,
  dailyHousekeeping: true,
  chauffeur: false,
  fullCleaning: false,
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
export const BookingProvider = ({ children }) => {
  // Initialize state from localStorage
  const [singleApartment, setSingleApartment] = useState(null);
  
  const [selectedServices, setSelectedServices] = useState(() => 
    getFromStorage(STORAGE_KEYS.SELECTED_SERVICES, DEFAULT_SERVICES)
  );
  
  const [startDate, setStartDate] = useState(() => {
    const stored = getFromStorage(STORAGE_KEYS.START_DATE, null);
    return stored ? new Date(stored) : null;
  });
  
  const [endDate, setEndDate] = useState(() => {
    const stored = getFromStorage(STORAGE_KEYS.END_DATE, null);
    return stored ? new Date(stored) : null;
  });
  
  const [carRent, setCarRent] = useState(() => 
    getFromStorage(STORAGE_KEYS.CAR_RENT, 150)
  );
  
  const [dinnerPrice, setDinnerPrice] = useState(() => 
    getFromStorage(STORAGE_KEYS.DINNER_PRICE, 150)
  );
  
  const [bookingData, setBookingData] = useState(null);

  // ✅ Optimized day calculation with useMemo
  const totalDay = useMemo(() => {
    if (!startDate || !endDate) return 1;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // ✅ Simple approach: endDate - startDate
    const daysDiff = end.getDate() - start.getDate();
    
    // ✅ Fix: Return clean integer, no floating point
    return Math.max(1, Math.abs(daysDiff));
  }, [startDate, endDate]);

  // ✅ Optimized service prices with useMemo
  const servicePrices = useMemo(() => ({
    breakfast: 50,
    groceryDelivery: 30,
    dailyHousekeeping: 40,
    chauffeur: 100,
    fullCleaning: 60,
  }), []);

  // ✅ Optimized price calculation - ensure integer
  const price = useMemo(() => {
    const apartmentPrice = singleApartment ? Number(singleApartment.price) : 0;
    // ✅ Fix: Return clean integer, no floating point
    return Math.floor(apartmentPrice);
  }, [singleApartment]);

  // ✅ Optimized total calculation with useMemo
  const totalPrice = useMemo(() => {
    const daysStayed = totalDay;
    const serviceCost = Object.entries(selectedServices)
      .filter(([_, isSelected]) => isSelected)
      .reduce((total, [service]) => total + servicePrices[service], 0);

    const calculatedTotal = price * daysStayed + serviceCost + carRent + dinnerPrice;
    // ✅ Fix: Return clean integer, no floating point
    return Math.floor(calculatedTotal);
  }, [price, totalDay, selectedServices, servicePrices, carRent, dinnerPrice]);

  // ✅ Optimized discount calculation
  const discount = useMemo(() => {
    const discountNumber = 10;
    const percentage = discountNumber / 100;
    const calculatedDiscount = totalPrice * percentage;
    // ✅ Fix: Return clean integer, no floating point
    return Math.floor(calculatedDiscount);
  }, [totalPrice]);

  // ✅ Optimized service change handler with useCallback
  const handleServiceChange = useCallback((service) => {
    setSelectedServices((prevState) => {
      const newState = {
        ...prevState,
        [service]: !prevState[service],
      };
      // Save to localStorage
      setToStorage(STORAGE_KEYS.SELECTED_SERVICES, newState);
      return newState;
    });
  }, []);

  // ✅ Optimized date setters with localStorage
  const handleStartDateChange = useCallback((date) => {
    setStartDate(date);
    if (date) {
      setToStorage(STORAGE_KEYS.START_DATE, date.toISOString());
    }
  }, []);

  const handleEndDateChange = useCallback((date) => {
    setEndDate(date);
    if (date) {
      setToStorage(STORAGE_KEYS.END_DATE, date.toISOString());
    }
  }, []);

  // ✅ Optimized car rent setter
  const handleCarRentChange = useCallback((value) => {
    setCarRent(value);
    setToStorage(STORAGE_KEYS.CAR_RENT, value);
  }, []);

  // ✅ Optimized dinner price setter
  const handleDinnerPriceChange = useCallback((value) => {
    setDinnerPrice(value);
    setToStorage(STORAGE_KEYS.DINNER_PRICE, value);
  }, []);

  // ✅ Optimized book now handler
  const handleBookNow = useCallback(() => {
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
    setBookingData(bookingDetails);
    console.log("Booking confirmed:", bookingDetails);
  }, [singleApartment, startDate, endDate, selectedServices, carRent, dinnerPrice, totalPrice, discount]);

  // ✅ Clear all stored data
  const clearStoredData = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    setSelectedServices(DEFAULT_SERVICES);
    setStartDate(null);
    setEndDate(null);
    setCarRent(150);
    setDinnerPrice(150);
  }, []);

  // ✅ Context value with useMemo
  const contextValue = useMemo(() => ({
    singleApartment,
    setSingleApartment,
    selectedServices,
    handleServiceChange,
    startDate,
    setStartDate: handleStartDateChange,
    endDate,
    setEndDate: handleEndDateChange,
    servicePrices,
    carRent,
    setCarRent: handleCarRentChange,
    dinnerPrice,
    setDinnerPrice: handleDinnerPriceChange,
    totalDay,
    totalPrice,
    calculateTotal: () => totalPrice,
    handleBookNow,
    bookingData,
    discountNumber: 10,
    discount,
    clearStoredData
  }), [
    singleApartment,
    selectedServices,
    handleServiceChange,
    startDate,
    endDate,
    servicePrices,
    carRent,
    dinnerPrice,
    totalDay,
    totalPrice,
    handleBookNow,
    bookingData,
    discount,
    handleStartDateChange,
    handleEndDateChange,
    handleCarRentChange,
    handleDinnerPriceChange,
    clearStoredData
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

