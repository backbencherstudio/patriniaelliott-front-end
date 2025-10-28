"use client"
import { createContext, useContext, useMemo, useState } from "react";

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
}

// Context
const ToureBookingContext = createContext<TourBookingContextType | null>(null);

// Provider Component
export const ToureBookingProvider = ({ children }: { children: React.ReactNode }) => {
  // State
  const [singleToure, setSingleToure] = useState(null);
  const [travelprice, setTravelPrice] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [travelCount, setTravelCount] = useState(1);

  // Computed values
  const totalDay = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  }, [startDate, endDate]);

 

  
  const discount = useMemo(() => 
    Number(((travelprice * singleToure?.discount) / 100).toFixed(2)), 
    [travelprice, singleToure?.discount]
  );

  const calculateTotal = () => {
    return (travelprice + Number(singleToure?.service_fee));
  };
  const totalPrice = calculateTotal();

  // Context value
  const contextValue = useMemo(() => ({
    singleToure,
    setSingleToure,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    travelprice,
    setTravelPrice,
    travelCount,
    setTravelCount,
    totalDay,
    totalPrice,
    servicefee: singleToure?.service_fee,
    discount,
    discountNumber: singleToure?.discount,
    calculateTotal
  }), [
    singleToure,
    startDate,
    endDate,
    travelprice,
    travelCount,
    totalDay,
    totalPrice,
    discount
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