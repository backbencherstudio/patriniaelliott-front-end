'use client';

import HotelCard from "@/components/card/HotelCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import useFetchData from "@/hooks/useFetchData";
import { useSearchParams } from "next/navigation";
import { useState } from 'react';
import BigCardSkleton from "../apartment/BigCardSkleton";



function HotelPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const min = searchParams.get("min");
    const max = searchParams.get("max");

    // Get all ratings parameters (multiple ratings can be selected)
    const allParams = Array.from(searchParams.entries());
    const ratings = allParams
        .filter(([key]) => key === "ratings")
        .map(([, value]) => value);

    const itemsPerPage = 6

    // Build query parameters dynamically
    const buildQueryParams = () => {
        const params = new URLSearchParams();

        // Always include these parameters
        params.append('type', 'hotel');
        params.append('limit', itemsPerPage.toString());
        params.append('page', currentPage.toString());

        // Only add parameters that have values
        if (startDate) params.append('duration_start', startDate);
        if (endDate) params.append('duration_end', endDate);
        if (min) params.append('budget_start', min);
        if (max) params.append('budget_end', max);

        // Add each rating as a separate parameter
        if (ratings && ratings.length > 0) {
            ratings.forEach(rating => {
                params.append('ratings', rating);
            });
        }

        return params.toString();
    };

    const endpoint = `/application/packages/enhanced-search?${buildQueryParams()}`
    const { data, loading, error } = useFetchData(endpoint);
    console.log(data?.meta);
    const totalPages = data?.data?.pagination?.totalPages
    const packageData = data ? data?.data?.packages : []

    console.log("hello=====",totalPages);
    return (
        <div>
            <FilterHeader title="Hotel" data={packageData} />

            <div className="">
                {loading ? <div className="grid grid-cols-1 gap-5 pb-10">
                    {Array.from({ length: 5 }, (_, i) => (
                        <BigCardSkleton key={i} />
                    ))}
                </div> : packageData.length < 0 ? <div>Not found data !</div> : packageData.map((tour: any, index) => (
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
