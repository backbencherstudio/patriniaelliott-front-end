'use client';

import PaginationPage from "@/components/reusable/PaginationPage";
import TourCardTwo from "../card/TourCardTwo";
import BigCardSkleton from "../apartment/BigCardSkleton";

function TureAllPackage({data, loading,pagination, error, currentPage, setCurrentPage}: {data: any, loading: any, pagination: any, error: any, currentPage: any, setCurrentPage: any}) {
    const HotelsPerPage = 4;
   
console.log(pagination);
console.log(data);

  
  return (
    <div>
       <div className="">
       <div className="">
                {loading ?
                    <div className="grid grid-cols-1 gap-5 pb-10">
                        {Array.from({ length: 5 }, (_, i) => (
                            <BigCardSkleton key={i} />
                        ))}
                    </div>
                    : data.length < 0 ? <div>Not found data !</div> : data.map((tour: any, index) => (
                        <div key={index} className=" py-4">
                            <TourCardTwo tour={tour} />
                        </div>
                    ))}
            </div>
      </div>

      {/* Pagination Controls */}
    <PaginationPage totalPages={pagination?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default TureAllPackage
