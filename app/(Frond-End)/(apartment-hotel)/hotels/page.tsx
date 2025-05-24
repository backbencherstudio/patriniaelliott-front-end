'use client';

import HotelCard from "@/components/card/HotelCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import { accommodationsData } from "@/DemoAPI/accommodationsData";
import { hotelData } from "@/DemoAPI/hotelData";
import { useState } from 'react';

const HotelsPerPage = 6;

function HotelPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total pages
  const totalPages = Math.ceil(hotelData.length / HotelsPerPage);

  // Paginated data for the current page
  const currentData = hotelData.slice(
    (currentPage - 1) * HotelsPerPage,
    currentPage * HotelsPerPage
  );


  return (
    <div>
      <FilterHeader title="Hotel" data={hotelData}/>

      <div className="">
        {currentData.map((tour:any, index) => (
          <div key={index} className=" py-4">
            <HotelCard hotel={tour} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="">

      <PaginationPage totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
     
    </div>
  );
}

export default HotelPage;
