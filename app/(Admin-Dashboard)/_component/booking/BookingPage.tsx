"use client";
import Image from "next/image";
import React, { useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";

import { bookings } from "@/DemoAPI/allProparty";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import BokingStatuse from "./BokingStatuse";
import BookingAction from "./BookingAction";
import BookingCard from "./BookingCard";
import BookingPymentStatuse from "./BookingPymentStatuse";



export default function BookingPage() {
 

  const [isModalOpen, setIsModalOpen] = React.useState<any>(false);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<
   "All" | "Hotel" | "Appartment" | "Tour"
  >("All");
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "15" | "30">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Report", 14, 15);
  
    const tableColumn = columns
      .filter((col) => col.label !== "Action" && col.label !== "Status")
      .map((col) => col.label);
  
    const tableRows = filteredUsers.map((user) => [
      user.bookingId,
      user.name,
      user.service,
      user.status,
      user.checkIn,
      user.checkOut,
      `$${user.price}`,
    ]);
  
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 104, 239] },
    });
  
    doc.save("booking_report.pdf");
  };
  const columns = [
    { label: "Booking ID", accessor: "bookingId" },
    { label: "Name", accessor: "name" },
    { label: "Service", accessor: "service" },
    { label: "Payment",  accessor: "status",
        formatter: (_, row) => <BookingPymentStatuse  status={row.status} />,},
    { label: "Check-In", accessor: "checkIn" },
    { label: "Check-Out", accessor: "checkOut" },
    { label: "Price", accessor: "price" ,
        formatter: (value) => `$${value}`,
    },
    { label: "Action", accessor: "status", formatter: (_, row) => <BookingAction onView={handleViewDetails} status={row} />, },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <BokingStatuse status={row.status} />,
    },
  ];

  const filteredUsers = bookings.filter((user) => {
    const roleMatch = selectedRole === "All" || user.service === selectedRole;
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
        <h2 className="text-2xl font-medium text-[#22262e] mb-1">Manage bookings</h2>
        <p className="text-base text-[#777980] mb-4">
        Check up on your latest reservations and history.
        </p>
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["All", "Hotel", "Appartment", "Tour"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setSelectedRole(role as "All" | "Hotel" | "Appartment" | "Tour")
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
          <div className=" mt-4 md:mt-0 justify-end flex gap-2">
          <div>
            <button onClick={handleExportPDF} className=" cursor-pointer text-sm lg:text-base py-2 px-5 rounded-md bg-[#0068EF]  text-whiteColor">Export as PDF</button>
          </div>
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
              <option className="text-xs" value="7"> Last 7 days</option>
              <option className="text-xs" value="15">Last 15 days</option>
              <option className="text-xs" value="30">Last 30 days</option>
            </select>
          </div>
          </div>
          
        </div>

        {/* Table */}
        <div>
          <DynamicTableWithPagination
            columns={columns}
            data={filteredUsers}
            currentPage={currentPage}
            itemsPerPage={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div>
    {isModalOpen && <BookingCard  open={isModalOpen} data={selectedUser} setIsModalOpen={setIsModalOpen}/>}
  </div>
    </div>
  );
}
