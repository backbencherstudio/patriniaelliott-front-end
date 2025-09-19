"use client";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DynamicTableWithPagination from "../common/DynamicTable";
import Usermodal from "../modal/usermodal";
import StatCard from "./StatCard";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinDate: string; // format: MM/DD/YYYY
  status: "Active" | "Inactive" | "Banned";
}

const stats = [
  { title: "All Users", count: 200, iconPath: "/dashboard/icon/all.svg" },
  { title: "Admin", count: 6, iconPath: "/dashboard/icon/admin.svg" },
  { title: "Total Host", count: 40, iconPath: "/dashboard/icon/host.svg" },
  { title: "Total Guest", count: 60, iconPath: "/dashboard/icon/guest.svg" },
];
export default function Dashboard() {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "15" | "30">(
    "all"
  );
  const [data, setData] = useState<any>([]);
  const { token } = useToken();
  const [selectedRole, setSelectedRole] = React.useState<
    "All" | "vendor" | "user"
  >("All");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = selectedRole === "All" ? `/admin/user/all-users?limit=${itemsPerPage}&page=${currentPage}` : `/admin/user/all-users?type=${selectedRole}&limit=${itemsPerPage}&page=${currentPage}`
        setLoading(true);
        const data = await UserService?.getData(endpoint, token);
        setData(data?.data?.data || []);
        setTotalPages(data?.data?.pagination?.totalPages || 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [selectedRole, currentPage]);

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


  ];
  const handleDelete = async (userId: string) => {

    try {
      const response = await UserService.deleteData(`/admin/user/${userId}`, token);
      if (response?.data?.success) {
        toast.success(response?.data?.message)
        const updateUser = data.filter((item: any) => item.id !== userId)
        setData(updateUser)

      }
    } catch (error) {
      console.log("error", error);

    }

  };

  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
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
            loading={loading || !data}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            onView={(user) => handleViewDetails(user)}
            onDelete={(id) => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  );
}
