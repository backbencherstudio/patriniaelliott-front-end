'use client';

import HotelCard from "@/components/card/HotelCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import { hotelData } from "@/DemoAPI/hotelData";
import useFetchData from "@/hooks/useFetchData";
import { useState } from 'react';
import Loader from "../reusable/Loader";

const HotelsPerPage = 6;

function HotelPage() {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total pages
    const totalPages = Math.ceil(hotelData.length / HotelsPerPage);
    const endpoint = `/admin/vendor-package?type=hotel&limit=${20}&page=${1}`
    const { data, loading, error } = useFetchData(endpoint);
    const packageData = data ? data?.data : []
    console.log("============hotel data ", packageData);

    // Paginated data for the current page
    const currentData = hotelData.slice(
        (currentPage - 1) * HotelsPerPage,
        currentPage * HotelsPerPage
    );

    console.log("hello");
    return (
        <div>
            <FilterHeader title="Hotel" data={hotelData} />

            <div className="">
                {loading ? <Loader /> : packageData.length < 0 ? <div>Not found data !</div> : packageData.map((tour: any, index) => (
                    <div key={index} className=" py-4">
                        <HotelCard hotel={tour} />
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="">

                <PaginationPage totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

        </div>
    );
}

export default HotelPage;
