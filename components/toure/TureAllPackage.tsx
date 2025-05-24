'use client';

import TourCardTwo from "@/components/card/TourCardTwo";
import PaginationPage from "@/components/reusable/PaginationPage";

import { toursData } from "@/DemoAPI/toureData";
import { useState } from 'react';
function TureAllPackage() {
    const HotelsPerPage = 4;
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
  )
}

export default TureAllPackage
