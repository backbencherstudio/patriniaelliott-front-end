'use client';

import ApartmentCard from "@/components/card/ApartmentCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import useFetchData from "@/hooks/useFetchData";
import { useSearchParams } from "next/navigation";
import { useState } from 'react';
import BigCardSkleton from "./BigCardSkleton";



function ApartmentPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const searchName = searchParams.get("destination");
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
        params.append('type', 'apartment');
        params.append('limit', itemsPerPage.toString());
        params.append('page', currentPage.toString());
        // Only add parameters that have values
        if (startDate) params.append('duration_start', startDate);
        if (endDate) params.append('duration_end', endDate);
        if (min) params.append('budget_start', min);
        if (max) params.append('budget_end', max);
         if (searchName) params.append('q', searchName);
        // Add each rating as a separate parameter
        if (ratings && ratings.length > 0) {
            ratings.forEach(rating => {
                params.append('ratings', rating);
            });
        }
        return params.toString();
    };

    const endpoint = `/application/packages?${buildQueryParams()}`
    const { data, loading, error } = useFetchData(endpoint);
    const totalPages = data?.meta?.totalPages
    const packageData = data ? data?.data : []

    return (
        <div>
            <FilterHeader title="Apartment" data={packageData} />

            <div className="">
                {loading ?
                    <div className="grid grid-cols-1 gap-5 pb-10">
                        {Array.from({ length: 5 }, (_, i) => (
                            <BigCardSkleton key={i} />
                        ))}
                    </div>
                    : packageData.length < 0 ? <div>Not found data !</div> : packageData.map((tour: any, index) => (
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
