'use client';

import HotelCard from "@/components/card/HotelCard";
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

  // Handle Previous button click
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle Next button click
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle page number click
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-2xl font-medium text-headerColor">
          Hotels found: {accommodationsData.length} available apartments
        </h4>
        <div>
          <p>5 Filters applied</p>
          <button>Clear All</button>
        </div>
      </div>

      <div className="">
        {currentData.map((tour, index) => (
          <div key={index} className="px-4 py-4">
            <HotelCard hotel={tour} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between pl-80 items-center mt-6">
        <button
          onClick={handlePrev}
          className="border border-descriptionColor/20 text-descriptionColor px-4 py-2 rounded-md flex items-center gap-2"
          disabled={currentPage === 1}
        >
          &lt;&lt; Previous
        </button>

       
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3  py-2  rounded-md ${
                currentPage === i + 1
                  ? 'bg-yellow-500 text-white'
                  : 'border border-descriptionColor/20 text-descriptionColor'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="border border-descriptionColor/20 text-descriptionColor px-4 py-2 rounded-md flex items-center gap-2"
          disabled={currentPage === totalPages}
        >
          Next &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default HotelPage;
