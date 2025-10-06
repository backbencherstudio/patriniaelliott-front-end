"use client"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Types
interface TourBookingContextType {
  singleToure: any;
  setSingleToure: (toure: any) => void;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  travelprice: number;
  setTravelPrice: (price: number) => void;
  travelCount: number;
  setTravelCount: (count: number) => void;
  totalDay: number;
  totalPrice: number;
  servicefee: number;
  discount: number;
  discountNumber: number;
  calculateTotal: () => number;
  handleBookNow: () => void;
  bookingData: any;
}

// Constants
const STORAGE_KEYS = {
  SINGLE_TOURE: 'toure_booking_single_toure',
  TRAVEL_PRICE: 'toure_booking_travel_price',
  START_DATE: 'toure_booking_start_date',
  END_DATE: 'toure_booking_end_date',
  TRAVEL_COUNT: 'toure_booking_travel_count'
} as const;




// Helper functions
const getFromStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    if (!item || item === 'undefined' || item === 'null') {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error);
    localStorage.removeItem(key);
    return defaultValue;
  }
};

const setToStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  
  try {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error);
  }
};

// Context
const ToureBookingContext = createContext<TourBookingContextType | null>(null);

// Provider Component
export const ToureBookingProvider = ({ children }: { children: React.ReactNode }) => {
  // Clean up invalid localStorage data on mount
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item === 'undefined' || item === 'null') {
        localStorage.removeItem(key);
      }
    });
  }

  // State
  const [singleToure, setSingleToure] = useState(() =>
    getFromStorage(STORAGE_KEYS.SINGLE_TOURE, null)
  );
  const [travelprice, setTravelPrice] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRAVEL_PRICE, 0)
  );
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const stored = getFromStorage(STORAGE_KEYS.START_DATE, null);
    return stored ? new Date(stored) : null;
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const stored = getFromStorage(STORAGE_KEYS.END_DATE, null);
    return stored ? new Date(stored) : null;
  });
  const [travelCount, setTravelCount] = useState(() =>
    getFromStorage(STORAGE_KEYS.TRAVEL_COUNT, 1)
  );
  const [bookingData, setBookingData] = useState(null);

  // Hydrate from a single localStorage object (idea from BookingProvider)
  useEffect(() => {
    const stored = getFromStorage("tourBookingDetails", null);
    if (stored) {
      if (stored.toure) {
        setSingleToure(stored.toure);
      }
      if (stored.startDate) {
        setStartDate(new Date(stored.startDate));
      }
      if (stored.endDate) {
        setEndDate(new Date(stored.endDate));
      }
      if (typeof stored.travelprice === 'number') {
        setTravelPrice(stored.travelprice);
      }
      if (typeof stored.travelCount === 'number') {
        setTravelCount(stored.travelCount);
      }
      setBookingData(stored);
    }
  }, []);

  // Computed values
  const totalDay = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  }, [startDate, endDate]);

 

  
  const discount = useMemo(() => 
    Number(((travelprice * singleToure?.discount) / 100).toFixed(2)), 
    [travelprice]
  );
   const calculateTotal = useCallback(() => {
    return (travelprice  + Number(singleToure?.service_fee));
  }, [travelprice]);

  const totalPrice = calculateTotal();
  // Memoized handlers
  const handleSetSingleToure = useCallback((toure: any) => {
    setSingleToure(toure);
    setToStorage(STORAGE_KEYS.SINGLE_TOURE, toure);
  }, []);

  const handleSetTravelPrice = useCallback((price: number) => {
    setTravelPrice(price);
    setToStorage(STORAGE_KEYS.TRAVEL_PRICE, price);
  }, []);

  const handleSetStartDate = useCallback((date: Date | null) => {
    setStartDate(date);
    if (date) {
      setToStorage(STORAGE_KEYS.START_DATE, date.toISOString());
    }
  }, []);

  const handleSetEndDate = useCallback((date: Date | null) => {
    setEndDate(date);
    if (date) {
      setToStorage(STORAGE_KEYS.END_DATE, date.toISOString());
    }
  }, []);

  const handleSetTravelCount = useCallback((count: number) => {
    setTravelCount(count);
    setToStorage(STORAGE_KEYS.TRAVEL_COUNT, count);
  }, []);

  const handleBookNow = useCallback(() => {
    const bookingDetails = {
      toure: singleToure,
      startDate,
      endDate,
      servicefee: singleToure?.service_fee,
      totalPrice,
      discount
    };
    setBookingData(bookingDetails);
  }, [singleToure, startDate, endDate, totalPrice, discount]);

  // Context value
  const contextValue = useMemo(() => ({
    singleToure,
    setSingleToure: handleSetSingleToure,
    startDate,
    setStartDate: handleSetStartDate,
    endDate,
    setEndDate: handleSetEndDate,
    travelprice,
    setTravelPrice: handleSetTravelPrice,
    travelCount,
    setTravelCount: handleSetTravelCount,
    totalDay,
    totalPrice,
    servicefee: singleToure?.service_fee,
    discount,
    discountNumber: singleToure?.discount,
    calculateTotal,
    handleBookNow,
    bookingData
  }), [
    singleToure,
    handleSetSingleToure,
    startDate,
    handleSetStartDate,
    endDate,
    handleSetEndDate,
    travelprice,
    handleSetTravelPrice,
    travelCount,
    handleSetTravelCount,
    totalDay,
    totalPrice,
    discount,
    calculateTotal,
    handleBookNow,
    bookingData
  ]);

  return (
    <ToureBookingContext.Provider value={contextValue}>
      {children}
    </ToureBookingContext.Provider>
  );
};

// Custom hook
export const useToureBookingContext = () => {
  const context = useContext(ToureBookingContext);
  if (!context) {
    throw new Error('useToureBookingContext must be used within a ToureBookingProvider');
  }
  return context;
};