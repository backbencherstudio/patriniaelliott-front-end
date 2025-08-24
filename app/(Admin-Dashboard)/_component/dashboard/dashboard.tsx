"use client";
import Image from "next/image";
import React, { useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";
import Usermodal from "../modal/usermodal";
import StatCard from "./StatCard";
import { StatusBadge } from "./StatusBadge";

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
  const [users, setUsers] = React.useState<UserData[]>([
    {
      id: "#123562",
      name: "Elisabeth Sarah",
      email: "elisabeth-sarah@gmail.com",
      phone: "(217) 555-0113",
      role: "Guest",
      joinDate: "02/01/2025",
      status: "Active",
    },
    {
      id: "#123543",
      name: "Kristin Watson",
      email: "kristin-watson@gmail.com",
      phone: "(225) 555-0118",
      role: "Host",
      joinDate: "05/01/2025",
      status: "Active",
    },
    {
      id: "#123543",
      name: "Ronald Richards",
      email: "ronald-richards@gmail.com",
      phone: "(702) 555-0122",
      role: "Guest",
      joinDate: "12/01/2025",
      status: "Active",
    },
    {
      id: "#123562",
      name: "Wade Warren",
      email: "wade-warren@gmail.com",
      phone: "(208) 555-0112",
      role: "Guest",
      joinDate: "01/02/2025",
      status: "Active",
    },
    {
      id: "#127832",
      name: "Eleanor Pena",
      email: "eleanore-pena@gmail.com",
      phone: "(671) 555-0110",
      role: "Host",
      joinDate: "02/01/2025",
      status: "Inactive",
    },
    {
      id: "#131781",
      name: "Darrell Steward",
      email: "darrell-steward@gmail.com",
      phone: "(252) 555-0126",
      role: "Guest",
      joinDate: "08/01/2025",
      status: "Banned",
    },
    {
      id: "#231780",
      name: "Henry Gosh",
      email: "henry-osh@gmail.com",
      phone: "(217) 555-0113",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active",
    },
    {
      id: "#231783",
      name: "Esther Howard",
      email: "esther-howard@gmail.com",
      phone: "(702) 555-0122",
      role: "Guest",
      joinDate: "08/01/2025",
      status: "Inactive",
    },
    {
      id: "#031781",
      name: "Dianne Russell",
      email: "dianne- russell@gmail.com",
      phone: "(603) 555-0123",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active",
    },
    {
      id: "#331781",
      name: "Theresa Webb",
      email: "theresa-webb@gmail.com",
      phone: "(907) 555-0101",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active",
    },
    {
      id: "#123562",
      name: "Elisabeth Sarah",
      email: "elisabeth-sarah@gmail.com",
      phone: "(217) 555-0113",
      role: "Guest",
      joinDate: "02/01/2025",
      status: "Active",
    },
    {
      id: "#123543",
      name: "Kristin Watson",
      email: "kristin-watson@gmail.com",
      phone: "(225) 555-0118",
      role: "Host",
      joinDate: "05/01/2025",
      status: "Active",
    },
    {
      id: "#123543",
      name: "Ronald Richards",
      email: "ronald-richards@gmail.com",
      phone: "(702) 555-0122",
      role: "Guest",
      joinDate: "12/01/2025",
      status: "Active",
    },
    {
      id: "#123562",
      name: "Wade Warren",
      email: "wade-warren@gmail.com",
      phone: "(208) 555-0112",
      role: "Guest",
      joinDate: "01/02/2025",
      status: "Active",
    },
    {
      id: "#127832",
      name: "Eleanor Pena",
      email: "eleanore-pena@gmail.com",
      phone: "(671) 555-0110",
      role: "Host",
      joinDate: "02/01/2025",
      status: "Inactive",
    },
    {
      id: "#131781",
      name: "Darrell Steward",
      email: "darrell-steward@gmail.com",
      phone: "(252) 555-0126",
      role: "Guest",
      joinDate: "08/01/2025",
      status: "Banned",
    },
    {
      id: "#231780",
      name: "Henry Gosh",
      email: "henry-osh@gmail.com",
      phone: "(217) 555-0113",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active",
    },
    {
      id: "#231783",
      name: "Esther Howard",
      email: "esther-howard@gmail.com",
      phone: "(702) 555-0122",
      role: "Guest",
      joinDate: "08/01/2025",
      status: "Inactive",
    },
    {
      id: "#031781",
      name: "Dianne Russell",
      email: "dianne- russell@gmail.com",
      phone: "(603) 555-0123",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active",
    },
    {
      id: "#331781",
      name: "Theresa Webb",
      email: "theresa-webb@gmail.com",
      phone: "(907) 555-0101",
      role: "Host",
      joinDate: "08/01/2025",
      status: "Active",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<
    "All" | "Host" | "Guest"
  >("All");
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "15" | "30">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    { label: "User ID", accessor: "id" },
    { label: "User Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Number", accessor: "phone" },
    { label: "Role", accessor: "role" },
    { label: "Join Date", accessor: "joinDate" },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <StatusBadge status={row.status} />,
    },
  ];
  const handleDelete = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };
  
  const handleViewDetails = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const filteredUsers = users.filter((user) => {
    const roleMatch = selectedRole === "All" || user.role === selectedRole;
    let dateMatch = true;

    if (dateRange !== "all") {
      const joinDate = new Date(user.joinDate.split("/").reverse().join("-"));
      const today = new Date();
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - parseInt(dateRange));
      dateMatch = joinDate >= cutoffDate;
    }
    return roleMatch && dateMatch;
  });
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
          userData={{
            name: selectedUser.name,
            role: selectedUser.role,
            id: selectedUser.id,
            status: selectedUser.status,
            profileImage: "/usericon/avatar.png",
            verificationStatus: { status: "Pending verification", rating: 4.7 },
            contact: {
              email: selectedUser.email,
              phone: selectedUser.phone,
              address: "8 12 Victoria Road Barnsley, South Yorkshire S70 2BB",
            },
            bio: "Described by Queenstown House & Garden magazine...",
            details: {
              joinDate: selectedUser.joinDate,
              gender: "Not specified",
              dateOfBirth: "Not specified",
              language: "English",
              lastActive: new Date().toLocaleDateString(),
            },
          }}
        />
      )}

      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex gap-2 whitespace-nowrap md:gap-4">
            {["All", "Host", "Guest"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setSelectedRole(role as "All" | "Host" | "Guest")
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${
                  selectedRole === role
                    ? "border-b-2 border-[#d6ae29] text-[#070707]"
                    : "border-b text-[#777980]"
                }`}
              >
                {role === "All" ? "All users" : role}
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
            data={filteredUsers}
            currentPage={currentPage}
            itemsPerPage={8}
            loading={false}
            totalPages={1}
            onPageChange={(page) => setCurrentPage(page)}
            onView={(user) => handleViewDetails(user)}
            onDelete={(id) => handleDelete(id)}
          />
        </div>
      </div>
    </div>
  );
}
