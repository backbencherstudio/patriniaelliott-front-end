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
import { FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import DynamicTableWithPagination from "../common/DynamicTable";
import FeedbackChart from "./FeedbackChart";
import ReviewAction from "./ReviewAction";
import ReviewDetails from "./ReviewDetails";
import ReviewStatuse from "./ReviewStatuse";
import SatisfactionCard from "./SatisfactionCard";
import TotalReview from "./TotalReview";


export default function ReviewPage() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const {token} = useToken()
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "All" | "Approved" | "Pending" | "Rejected"
  >("All");
  const [dateRange, setDateRange] = useState<"all" | "7" | "15" | "30">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [reviewData, setReviewData] = useState<any>([])
  const handleViewDetails = (user: any) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };
  const handleDelete = async(id: any) => {
    try {
      const res = await UserService.deleteData(`/admin/reviews/${id}`,token);
      if (res?.data?.success) {
        toast.success(res?.data?.message)
        const updateUser = reviewData?.filter((item: any) => item.id !== id)
        setReviewData(updateUser)
      }
    } catch (error) {
      console.log(error);
    }
  };

 const {data:reviewDataData,loading:reviewLoading} = useFetchData(`/admin/reviews/statistics`)

useEffect(()=>{
  const fetchData = async()=>{
    setLoading(true)
try {
  const res = await UserService.getData(`/admin/reviews?page=${currentPage}&limit=${10}`,token)
  setReviewData(res?.data?.data)
} catch (error) {
  console.log(error);
  
}finally{
  setLoading(false)
}

}
if(token){
  fetchData()
}
},[currentPage,token])    
 

const columns = [
    { label: "User Name", accessor: "user", width:"168px" ,
      formatter: (value, row) => (
        <div className=" flex gap-2 items-center"><div className=" w-6 h-6 rounded-full overflow-hidden ">
           <Image src={row?.avatar} alt={row?.name} width={24} height={24} />
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
        <ReviewAction onView={handleViewDetails}  onDelete={handleDelete}  status={value} data={row} />
      ),
    },
];
 

  
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
          <div className=" mt-4 md:mt-0 justify-end flex gap-2">
           
            <div className=" items-center flex gap-1  md:gap-2 text-sm ">
              <Select
                value={dateRange}
                onValueChange={(value) =>
                  setDateRange(value as "all" | "7" | "15" | "30")
                }
              >
                <SelectTrigger aria-label="Date range" className="rounded-sm border border-[#0068ef] text-[#0068ef] bg-transparent ">
                  <Image
                    src="/dashboard/icon/filter.svg"
                    alt="filter"
                    width={14}
                    height={14}
                  />
                  <SelectValue
                    placeholder="All Time"
                    className="text-[#0068ef]"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="PayPal">Last 7 days</SelectItem>
                  <SelectItem value="Credit Card">Last 15 days</SelectItem>
                  <SelectItem value="Stripe">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          {selectedRole  && (
            <DynamicTableWithPagination
            data={reviewData}
            columns={columns}
            currentPage={currentPage}
            loading={loading }
            totalPages={reviewData?.pagination?.total_pages || 0}
            itemsPerPage={10}
            onPageChange={(page) => setCurrentPage(page)}
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
