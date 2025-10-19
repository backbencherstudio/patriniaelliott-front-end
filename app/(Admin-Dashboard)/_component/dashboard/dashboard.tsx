"use client";
import Loader from "@/components/reusable/Loader";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import DynamicTableWithPagination from "../common/DynamicTable";
import Usermodal from "../modal/usermodal";
import StateSection from "./StateSection";
import { Loader2 } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string; // format: MM/DD/YYYY
  status: "Active" | "Inactive" | "Banned";
}


export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "15" | "30">(
    "all"
  );
  const { token } = useToken();
  const [selectedRole, setSelectedRole] = React.useState<
    "All" | "vendor" | "user"
  >("All");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  // React Query for fetching users data
  const getUsersData = async () => {
    const endpoint = selectedRole === "All" 
      ? `/admin/user/all-users?limit=${itemsPerPage}&page=${currentPage}` 
      : `/admin/user/all-users?type=${selectedRole}&limit=${itemsPerPage}&page=${currentPage}`;
    
    const response = await UserService?.getData(endpoint, token);
    return response?.data;
  };

  const { data: usersData, error: apiError, isLoading } = useQuery({
    queryKey: ["usersData", selectedRole, currentPage, itemsPerPage],
    queryFn: getUsersData,
    enabled: !!token,
  });

  const data = usersData?.data || [];
  const totalPages = usersData?.pagination?.totalPages || 0;

  const columns = [
    // { label: "User ID", accessor: "id" },
    { label: "User Name", accessor: "name" ,width : "130px"},
    { label: "Email", accessor: "email" ,width : "220px" },
    { label: "Number", accessor: "phone_number" ,width : "180px"},
    { label: "Role", accessor: "type" ,width : "100px"},
    {
      label: "Join Date", accessor: "created_at",width : "150px",
      formatter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      label: "Action", accessor: "actions",width : "150px",
      formatter: (_, row) => (
        <div className="flex items-center gap-2">
          <button aria-label="View"  onClick={() => handleViewDetails(row)}
        className="text-primaryColor  underline transition-all cursor-pointer" >
             View details
          </button>
         <button aria-label="Delete" disabled={deletingUserId === row.id} className="hover:text-redColor text-[#777980] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"  onClick={() => handleDelete(row.id)}>
           {deletingUserId === row.id ? <Loader2 size={18} className="text-primaryColor" /> : <RiDeleteBin6Line
              size={18} className="text-redColor" />}
           </button>
          </div>
      ),
    },


  ];
  // React Query mutation for deleting user
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      setDeletingUserId(userId);
      const response = await UserService.deleteData(`/admin/user/${userId}`, token);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["usersData"] });
      setDeletingUserId(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete user. Please try again.");
      setDeletingUserId(null);
    }
  });

  const handleDelete = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const handleViewDetails = async (user: UserData) => {
     try {
      const response = await UserService.getData(`/admin/user/${user?.id}`,token);
      setSelectedUser(response?.data?.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error",error);
    }
    
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };


  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4  mx-auto">
        <h2 className="text-2xl font-medium text-[#22262e] mb-1">Overview</h2>
        <p className="text-base text-[#777980] mb-4">
          View list of total customer and hosts
        </p>
        <StateSection/>
      </div>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <Usermodal
          onClose={handleCloseModal}
          userData={selectedUser}
        />
      )}

      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex gap-2 whitespace-nowrap md:gap-4">
            {["All", "vendor", "user"].map((role) => (
              <button
                aria-label="Role"
                key={role}
                onClick={() =>
                  setSelectedRole(role as "All" | "vendor" | "user")
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${selectedRole === role
                    ? "border-b-2 border-[#d6ae29] text-[#070707]"
                    : "border-b text-[#777980]"
                  }`}
              >
                {role === "All" && "All users"}
                {role === "vendor" && "Host"}
                {role === "user" && "Guest"}
              </button>
            ))}
          </div>

          {/* Date Range Dropdown */}
          <div className=" items-center flex gap-1  md:gap-2 text-sm text-[#0068ef] border p-2 rounded">
            <Image
              src="/dashboard/icon/filter.svg"
              alt="filter"
              width={14}
              height={14}
            />
            <select
              aria-label="Date range"
              value={dateRange}
              onChange={(e) =>
                setDateRange(e.target.value as "all" | "7" | "15" | "30")
              }
              className="bg-transparent text-[#0068ef] text-sm md:text-base  cursor-pointer"
            >
              <option className="text-xs" value="all">All Time</option>
              <option className="text-xs" value="7">7 days</option>
              <option className="text-xs" value="15">15 days</option>
              <option className="text-xs" value="30">30 days</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div>
          <DynamicTableWithPagination
            columns={columns}
            data={data}
            currentPage={currentPage}
            itemsPerPage={8}
            loading={isLoading || !data}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
           
            editLoading={deletingUserId !== null}
          />
        </div>
      </div>
    </div>
  );
}
