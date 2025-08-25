'use client';
import { BookingProvider } from '@/provider/BookingProvider';
import { ToureBookingProvider } from '@/provider/TourBookingProvider';

export default function ClientProviders({ children }) {
  return (
    <div>
         <BookingProvider>
                <ToureBookingProvider>
                    {children}
                </ToureBookingProvider>
            </BookingProvider>
    </div>
  );
}