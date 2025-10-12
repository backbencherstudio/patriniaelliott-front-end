"use client"
import FilterHeader from "@/components/filter/FilterHeader";
import TureAllPackage from "@/components/toure/TureAllPackage";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function TourePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchName = searchParams.get("q");
  const destinations = searchParams.get("destinations");
  const people = searchParams.get("people");
  const rooms = searchParams.get("rooms");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const allParams = Array.from(searchParams.entries());
  const ratings = allParams
    .filter(([key]) => key === "ratings")
    .map(([, value]) => value);
  const itemsPerPage = 6
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const { token } = useToken()
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    const itemsPerPage = 6
    // Always include these parameters
    params.append('type', 'tour');
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
  const swiperRef = useRef<any>(null);
  const endpoint = `/application/packages?${buildQueryParams()}`
  useEffect(() => {
    if (!endpoint) return; // Skip if URL or token is missing

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting request
        const response = await UserService.getData(endpoint, token)
        setData(response.data); // Save the response data
        setPagination(response?.data?.meta)
      } catch (err) {
        setError(err.message || "Something went wrong"); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token]);

  const filterData = data?.data && data?.data?.length > 0 ? data?.data : []
  return (
    <div className="pb-10 lg:pb-20">
      <FilterHeader title="Tour" data={filterData} />
      <TureAllPackage data={data?.data} pagination={pagination} loading={loading} error={error} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default TourePage;
