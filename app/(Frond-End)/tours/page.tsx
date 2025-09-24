"use client"
import FilterHeader from "@/components/filter/FilterHeader";
import TureAllPackage from "@/components/toure/TureAllPackage";

import { toursData } from "@/DemoAPI/toureData";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useEffect, useRef, useState } from "react";



function TourePage() {
  const [currentPage, setCurrentPage] = useState(1);
const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[pagination , setPagination] = useState({});
  const {token} = useToken()
  const swiperRef = useRef<any>(null);
 const endpoint = `/admin/vendor-package?type=tour&limit=${10}&page=${1}`
  useEffect(() => {
    if (!endpoint ) return; // Skip if URL or token is missing

    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting request
        const response = await UserService.getData(endpoint,token)
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

  
  return (
    <div className="pb-10 lg:pb-20">
      <FilterHeader title="Tour" data={toursData}/>
      <TureAllPackage data={data?.data} pagination={pagination} loading={loading} error={error} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default TourePage;
