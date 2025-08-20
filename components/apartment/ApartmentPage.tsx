'use client';

import ApartmentCard from "@/components/card/ApartmentCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import { accommodationsData } from "@/DemoAPI/accommodationsData";
import useFetchData from "@/hooks/useFetchData";
import { useState } from 'react';
import Loader from "../reusable/Loader";

const HotelsPerPage = 6;

function ApartmentPage() {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total pages
    const totalPages = Math.ceil(accommodationsData.length / HotelsPerPage);
    const endpoint = `/admin/vendor-package?type=apartment&limit=${20}&page=${1}`
    const { data, loading, error } = useFetchData(endpoint);
    const packageData = data ? data?.data : []
    console.log("============hotel data ", packageData);

    // Paginated data for the current page
    const currentData = accommodationsData.slice(
        (currentPage - 1) * HotelsPerPage,
        currentPage * HotelsPerPage
    );

    return (
        <div>
            <FilterHeader title="Apartment" data={packageData} />

            <div className="">
                {loading ? <Loader /> : packageData.length < 0 ? <div>Not found data !</div> : packageData.map((tour: any, index) => (
                    <div key={index} className=" py-4">
                        <ApartmentCard hotel={tour} />
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {!loading && <PaginationPage totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    );
}

export default ApartmentPage;
