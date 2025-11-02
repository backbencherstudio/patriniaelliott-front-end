"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetchData from "@/hooks/useFetchData";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import DynamicTableWithPagination from "../common/DynamicTable";
import FeedbackChart from "./FeedbackChart";
import ReviewAction from "./ReviewAction";
import ReviewDetails from "./ReviewDetails";
import ReviewStatuse from "./ReviewStatuse";
import SatisfactionCard from "./SatisfactionCard";
import TotalReview from "./TotalReview";
import DateFilter from "@/components/reusable/DateFilter";
import { useSearchParams } from "next/navigation";


export default function ReviewPage() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const {token} = useToken()
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "All" | "Approved" | "Pending" | "Rejected"
  >("All");
  const searchParams= useSearchParams()
  const dateFilter = searchParams.get("dateFilter")
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const handleViewDetails = (user: any) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };
  // React Query for fetching reviews data
  const getReviewsData = async () => {
    const response = await UserService.getData(`/admin/reviews?page=${currentPage}&limit=${10}&${dateFilter ? `dateFilter=${dateFilter}` : ''}`, token);
    return response?.data;
  };

  const { data: reviewsResponse, error: apiError, isLoading } = useQuery({
    queryKey: ["reviewsData", currentPage,dateFilter ],
    queryFn: getReviewsData,
    enabled: !!token,
  });

  // React Query for fetching review statistics
  const {data: reviewDataData, loading: reviewLoading} = useFetchData(`/admin/reviews/statistics`);

  // Delete review mutation
  const deleteReviewMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      setDeletingReviewId(reviewId);
      const response = await UserService.deleteData(`/admin/reviews/${reviewId}`, token);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Review deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["reviewsData"] });
      setDeletingReviewId(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete review. Please try again.");
      setDeletingReviewId(null);
    }
  });

  const handleDelete = (id: any) => {
    deleteReviewMutation.mutate(id);
  };    
 

  const reviewData = reviewsResponse?.data || [];
  const totalPages = reviewsResponse?.pagination?.total_pages || 0;
  const totalItems = reviewsResponse?.pagination?.total_items || 0;
const columns = [
    { label: "User Name", accessor: "user", width:"168px" ,
      formatter: (value, row) => (
        <div className=" flex gap-2 items-center"><div className=" w-6 h-6 rounded-full overflow-hidden ">
           <Image src={row?.avatar?.url || "/empty.png"} alt={row?.name} width={24} height={24} />
           </div> <span className="text-headerColor text-xs">{value?.name}</span> </div>
      ),
    },
    { label: "Reservation", accessor: "reservation" ,width:"238px",
      formatter: (value, row) => (
        <div className=" flex gap-2 items-center"><div className=" w-17 h-10 rounded-md overflow-hidden ">
           <Image src={value?.package_image?.url || "/empty.png"} alt={value?.name} width={68} height={40} className="w-full h-full object-cover" />
           </div><div>
           <p className="text-headerColor font-medium text-xs">{value?.package_name}</p>
           <p className=" text-xs mt-1">{row?.package_type}</p>
            </div> </div>
      ),
    },
    {
      label: "Review",
      accessor: "review",
      width:"214px",
      formatter: (value, row) => (
        <div className=" flex items-center">
         
           <p className=" text-xs text-headerColor">{value?.comment}</p>
            </div> 
      ),
     
    },
    { label: "Rating", accessor: "review" , width:"80px",
      formatter: (value, row) => (
        <div className=" flex gap-1 text-xs text-headerColor items-center"><FaRegStar className=" text-base text-yellow-400" /> {value.rating}</div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width:"134px",
      formatter: (value, row) => <ReviewStatuse status={value?.text} />,
    },
    {
      label: "Action",
      accessor: "status",
      width:"125px",
      formatter: (value, row) => (
        <ReviewAction 
          onView={handleViewDetails}  
          onDelete={handleDelete}  
          status={value} 
          data={row}
          isDeleting={deleteReviewMutation.isPending && deletingReviewId === row.id}
        />
      ),
    },
];
 
useEffect(() => {
  setCurrentPage(1);
}, [dateFilter]);

  
  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4  mx-auto">
        <h2 className="text-2xl font-medium text-[#22262e] mb-1">
          Manage Reviews
        </h2>
        <p className="text-base text-[#777980] mb-4">
          Check up on your latest reviews and history.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TotalReview data={reviewDataData?.data}/>
            <FeedbackChart data={reviewDataData?.data}/>
            <SatisfactionCard data={reviewDataData?.data}/>
         {/* <SatisfactionCard/> */}
        </div>
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["All", "Approved", "Pending","Rejected"].map((role) => (
              <button
                aria-label={role}
                key={role}
                onClick={() =>
                  setSelectedRole(role as "All" | "Approved" | "Pending" | "Rejected")
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${
                  selectedRole === role
                    ? "border-b-2 border-[#d6ae29] text-[#070707]"
                    : "border-b text-[#777980]"
                }`}
              >
                {role === "All" ? "All reviews" : role}
              </button>
            ))}
          </div>

          {/* Date Range Dropdown */}
         <DateFilter/>
        </div>

        {/* Table */}
        <div>
          {selectedRole  && (
            <DynamicTableWithPagination
            data={reviewData}
            columns={columns}
            currentPage={currentPage}
            loading={isLoading || !reviewData}
            totalPages={totalPages}
            itemsPerPage={10}
            onPageChange={(page) => setCurrentPage(page)}
            totalItems={totalItems}
          />
          )}
         
        </div>

    
      </div>
<div>
   {isModalOpen &&
            selectedData &&(
              <ReviewDetails
                open={isModalOpen}
                data={selectedData}
                onOpenChange={setIsModalOpen}
              />
            )}
</div>
      
    </div>
  );
}
