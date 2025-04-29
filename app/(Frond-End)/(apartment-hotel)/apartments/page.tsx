'use client';

import ApartmentCard from "@/components/card/ApartmentCard";
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
      <div className=" items-center mb-4">
        <h4 className="text-2xl font-semibold text-headerColor">
          Hotels found: {accommodationsData.length} available apartments
        </h4>
        <div className=" flex gap-3 mt-2">
          <p className=" text-base text-grayColor1">5 Filters applied</p>
          <button className="text-blueColor text-base cursor-pointer ">Clear All</button>
        </div>
      </div>

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
