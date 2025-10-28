'use client';

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from 'react';
import BigCardSkleton from "../apartment/BigCardSkleton";
import HotelCard from "../card/HotelCard";
import FilterHeader from "../filter/FilterHeader";
import PaginationPage from "../reusable/PaginationPage";



function HotelPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const searchName = searchParams.get("q");
    const destinations = searchParams.get("destinations");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const people = searchParams.get("people");
    const rooms = searchParams.get("rooms");
    const { token } = useToken()
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
        if (searchName) params.append('q', searchName);
        if (destinations) params.append('destinations', destinations);
        if (people) params.append('max_capacity', people);
        if (rooms) params.append('total_bedrooms', rooms);
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

    // React Query for fetching hotel data
    const getHotelData = async () => {
        const endpoint = `/application/packages?${buildQueryParams()}`;
        const response = await UserService.getData(endpoint, token);
        return response?.data;
    };

    const { data: hotelResponse, isLoading } = useQuery({
        queryKey: ["hotelData", currentPage, startDate, endDate, searchName, destinations, min, max, people, rooms, ratings],
        queryFn: getHotelData,
    });

    const data = hotelResponse?.data || [];
    const pagination = hotelResponse?.meta;

    return (
        <div>
            <FilterHeader title="Hotel" data={data} />

            <div className="">
                {isLoading ? 
                <div className="grid grid-cols-1 gap-5 pb-10">
                    {Array.from({ length: 5 }, (_, i) => (
                        <BigCardSkleton key={i} />
                    ))}
                </div> 
                : 
                data?.length > 0 ? data?.map((tour: any, index) => (
                    <div key={index} className=" py-4">
                        <HotelCard hotel={tour} />
                    </div>
                )) 
                : 
                <div className="text-center text-2xl font-bold text-grayColor1 py-10">Not found data !</div>
                }
            </div>

            {/* Pagination Controls */}
            <div className="">
                <PaginationPage totalPages={pagination?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

        </div>
    );
}

export default HotelPage;
