'use client';

import ApartmentCard from "@/components/card/ApartmentCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import { accommodationsData } from "@/DemoAPI/accommodationsData";
import { useState } from 'react';

const HotelsPerPage = 6;

function HotelPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total pages
  const totalPages = Math.ceil(accommodationsData.length / HotelsPerPage);

  // Paginated data for the current page
  const currentData = accommodationsData.slice(
    (currentPage - 1) * HotelsPerPage,
    currentPage * HotelsPerPage
  );

  return (
    <div>
      <FilterHeader title="Apartment" data={accommodationsData}/>

      <div className="">
        {currentData.map((tour:any, index) => (
          <div key={index} className="px-4 py-4">
            <ApartmentCard hotel={tour} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
    <PaginationPage totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default HotelPage;
