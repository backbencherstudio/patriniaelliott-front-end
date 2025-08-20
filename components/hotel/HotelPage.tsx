'use client';

import HotelCard from "@/components/card/HotelCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import useFetchData from "@/hooks/useFetchData";
import { useState } from 'react';
import Loader from "../reusable/Loader";



function HotelPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6
    const endpoint = `/admin/vendor-package?type=hotel&limit=${itemsPerPage}&page=${currentPage}`
    const { data, loading, error } = useFetchData(endpoint);
    const totalPages = data?.meta?.totalPages
    const packageData = data ? data?.data : []


    console.log("hello");
    return (
        <div>
            <FilterHeader title="Hotel" data={packageData} />

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
