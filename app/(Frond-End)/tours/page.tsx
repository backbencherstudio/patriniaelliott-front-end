'use client';

import TourCardTwo from "@/components/card/TourCardTwo";
import PaginationPage from "@/components/reusable/PaginationPage";

import { toursData } from "@/DemoAPI/toureData";
import { useState } from 'react';

const HotelsPerPage = 4;

function TourePage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total pages
  const totalPages = Math.ceil(toursData.length / HotelsPerPage);

  // Paginated data for the current page
  const currentData = toursData.slice(
    (currentPage - 1) * HotelsPerPage,
    currentPage * HotelsPerPage
  );

  return (
    <div>
      <div className=" items-center mb-4">
        <h4 className="text-2xl font-semibold text-headerColor">
           Tour packages found: {toursData.length} available packages
        </h4>
        <div className=" flex gap-3 mt-2">
          <p className=" text-base text-grayColor1">5 Filters applied</p>
          <button className="text-blueColor text-base cursor-pointer ">Clear All</button>
        </div>
      </div>

      <div className="">
        {currentData.map((tour:any, index) => (
          <div key={index} className="px-4 py-4">
            <TourCardTwo tour={tour} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
    <PaginationPage totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default TourePage;
