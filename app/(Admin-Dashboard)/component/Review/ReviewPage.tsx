"use client";
import Image from "next/image";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reviewData } from "@/DemoAPI/reviewData";
import { FaRegStar } from "react-icons/fa";
import DynamicTableTwo from "../common/DynamicTableTwo";
import FeedbackChart from "./FeedbackChart";
import ReviewAction from "./ReviewAction";
import ReviewDetails from "./ReviewDetails";
import ReviewStatuse from "./ReviewStatuse";
import SatisfactionCard from "./SatisfactionCard";
import TotalReview from "./TotalReview";


export default function ReviewPage() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "All" | "Approved" | "Pending" | "Rejected"
  >("All");
  const [dateRange, setDateRange] = useState<"all" | "7" | "15" | "30">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewDetails = (user: any) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };
  const handleDelete = (user: any) => {
    setSelectedData(user);
    
  };
  const columns = [
    { label: "User Name", accessor: "userName", width:"168px" ,
      formatter: (_, row) => (
        <div className=" flex gap-2 items-center"><div className=" w-6 h-6 rounded-full overflow-hidden ">
           <Image src={row?.userImage} alt={row?.userName} width={24} height={24} />
           </div> <span className="text-headerColor text-xs">{row.userName}</span> </div>
      ),
    },
    { label: "Reservation", accessor: "reservation" ,width:"238px",
      formatter: (_, row) => (
        <div className=" flex gap-2 items-center"><div className=" w-17 h-10 rounded-md overflow-hidden ">
           <Image src={row?.propertyImage} alt={row?.userName} width={68} height={40} />
           </div><div>
           <p className="text-headerColor font-medium text-xs">{row.reservation}</p>
           <p className=" text-xs mt-1">{row?.roomStatus}</p>
            </div> </div>
      ),
    },

    {
      label: "Review",
      accessor: "review",
      width:"214px",
      formatter: (_, row) => (
        <div className=" flex items-center">
         
           <p className=" text-xs text-headerColor">{row?.review}</p>
            </div> 
      ),
     
    },
    { label: "Rating", accessor: "rating" , width:"80px",
      formatter: (_, row) => (
        <div className=" flex gap-1 text-xs text-headerColor items-center"><FaRegStar className=" text-base text-yellow-400" /> {row.rating}</div>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      width:"134px",
      formatter: (_, row) => <ReviewStatuse status={row.status} />,
    },
    {
      label: "Action",
      accessor: "status",
      width:"125px",
      formatter: (_, row) => (
        <ReviewAction onView={handleViewDetails}  onDelete={handleDelete}  status={row} />
      ),
    },
  ];
 

  const filteredUsers = reviewData.filter((user) => {
    const roleMatch =
      selectedRole === "All" ||
      user.status === selectedRole 
    
    let dateMatch = true;

    if (dateRange !== "all") {
      const joinDate = new Date(user.joinDate.split("/").reverse().join("-"));
      const today = new Date();
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - parseInt(dateRange));
      dateMatch = joinDate >= cutoffDate;
    }
    return roleMatch && dateMatch ;
  });

  
  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4  mx-auto">
        <h2 className="text-2xl font-medium text-[#22262e] mb-1">
          Transaction history
        </h2>
        <p className="text-base text-[#777980] mb-4">
          Check up on your latest reservations and history.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
            <TotalReview/>
            
            <FeedbackChart/>
            <SatisfactionCard/>
         {/* <SatisfactionCard/> */}
        </div>
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["All", "Approved", "Pending","Rejected"].map((role) => (
              <button
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
                <SelectTrigger className="rounded-sm border border-[#0068ef] text-[#0068ef] bg-transparent ">
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
            <DynamicTableTwo
              columns={columns}
              data={filteredUsers}
              currentPage={currentPage}
              itemsPerPage={5}
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
