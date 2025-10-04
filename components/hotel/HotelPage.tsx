'use client';

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import BigCardSkleton from "../apartment/BigCardSkleton";
import HotelCard from "../card/HotelCard";
import PaginationPage from "../reusable/PaginationPage";



function HotelPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    const {token} = useToken()
    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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

    const endpoint = `/application/packages?${buildQueryParams()}`
   useEffect(() => {
    if (!endpoint ) return; // Skip if URL or token is missing

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting request
        const response = await UserService.getData(endpoint,token)
        setData(response.data?.data); // Save the response data
        console.log(response.data?.data);
        setPagination(response?.data?.data?.meta)
        } catch (err) {
        setError(err.message || "Something went wrong"); // Handle error
      } finally {
        setLoading(false); 
      }
    };
    fetchData(); 
  }, [endpoint]);
   

    return (
        <div>
            {/* <FilterHeader title="Hotel" data={packageData} /> */}

            <div className="">
                {loading ? <div className="grid grid-cols-1 gap-5 pb-10">
                    {Array.from({ length: 5 }, (_, i) => (
                        <BigCardSkleton key={i} />
                    ))}
                </div> : data?.length < 0 ? <div>Not found data !</div> : data?.map((tour: any, index) => (
                    <div key={index} className=" py-4">
                        <HotelCard hotel={tour} />
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="">
                <PaginationPage totalPages={pagination?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>

        </div>
    );
}

export default HotelPage;
