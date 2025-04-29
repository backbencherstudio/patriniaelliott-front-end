// app/layout.tsx or any other layout file
import ApartmentHotelClient from '@/components/apartment/ApartmentHotelClient';
import { Suspense } from 'react';


export default function ApartmentHotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
    

      {/* Main content */}
      
        <Suspense fallback={<div>Loading...</div>}>
          <ApartmentHotelClient>{children}</ApartmentHotelClient>
        </Suspense>
      
    </div>
  );
}
