"use client"
import FilterHeader from "@/components/filter/FilterHeader";
import TureAllPackage from "@/components/toure/TureAllPackage";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function TourePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchName = searchParams.get("q");
  const destinations = searchParams.getAll("destinations");
  const people = searchParams.get("people");
  const rooms = searchParams.get("rooms");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const allParams = Array.from(searchParams.entries());
  const ratings = allParams
    .filter(([key]) => key === "ratings")
    .map(([, value]) => value);
  const itemsPerPage = 6
  const { token } = useToken()
  
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    // Always include these parameters
    params.append('type', 'tour');
    params.append('limit', itemsPerPage.toString());
    params.append('page', currentPage.toString());
    if (searchName) params.append('q', searchName);
    // Add each destination as a separate parameter
    if (destinations && destinations.length > 0) {
      destinations.forEach(destination => {
        params.append('destinations', destination);
      });
    }
    if (people) params.append('max_capacity', people);
    if (rooms) params.append('total_bedrooms', rooms);
    // Only add parameters that have values
    if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
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

  // React Query for fetching tour data
  const getTourData = async () => {
    const endpoint = `/application/packages?${buildQueryParams()}`;
    const response = await UserService.getData(endpoint, token);
    return response?.data;
  };

  const { data: tourResponse, isLoading: loading, error } = useQuery({
    queryKey: ["tourData", currentPage, startDate, endDate, searchName, destinations, people, rooms, min, max, ratings],
    queryFn: getTourData,
  });

  const data = tourResponse;
  const pagination = tourResponse?.meta;
  const filterData = data?.data && data?.data?.length > 0 ? data?.data : []

  return (
    <div className="pb-10 lg:pb-20">
      <FilterHeader title="Tour" data={filterData} />
      <TureAllPackage data={data?.data} pagination={pagination} loading={loading} error={error} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default TourePage;
