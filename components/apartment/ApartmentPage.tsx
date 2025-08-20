'use client';

import ApartmentCard from "@/components/card/ApartmentCard";
import FilterHeader from "@/components/filter/FilterHeader";
import PaginationPage from "@/components/reusable/PaginationPage";
import useFetchData from "@/hooks/useFetchData";
import { useState } from 'react';
import Loader from "../reusable/Loader";



function ApartmentPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6

    const endpoint = `/admin/vendor-package?type=apartment&limit=${itemsPerPage}&page=${currentPage}`
    const { data, loading, error } = useFetchData(endpoint);
    console.log(data?.meta);
    const totalPages = data?.meta?.totalPages

    const packageData = data ? data?.data : []
    console.log("============hotel data ", packageData);



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
