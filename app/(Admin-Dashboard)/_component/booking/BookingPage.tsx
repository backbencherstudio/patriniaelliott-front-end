"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import useFetchData from "@/hooks/useFetchData";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import DynamicTableWithPagination from "../common/DynamicTable";
import BokingStatuse from "./BokingStatuse";
import BookingAction from "./BookingAction";
import BookingCard from "./BookingCard";
import BookingPymentStatuse from "./BookingPymentStatuse";
import DateCheck from "./DateCheck";
import TableId from "./TableId";



export default function BookingPage() {

  const [isModalOpen, setIsModalOpen] = React.useState<any>(false);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<
    "all" | "hotel" | "apartment" | "tour"
  >("all");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const endpoint = `/admin/booking?type=${selectedRole}&limit=${itemsPerPage}&page=${currentPage}`
  const { data, loading, error } = useFetchData(endpoint);
  const totalPages = data?.pagination?.total_pages || 0;
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "15" | "30">(
    "all"
  );

  // Local state for optimistic updates - store all updates
  const [optimisticUpdates, setOptimisticUpdates] = useState<Record<string, any>>({});

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Clear optimistic updates when page or role changes
  useEffect(() => {
    setOptimisticUpdates({});
  }, [currentPage, selectedRole]);

  // Optimistic update function - accumulate updates
  const handleOptimisticUpdate = useCallback((bookingId: string, newStatus: string, payment_status: string) => {
    setOptimisticUpdates(prev => ({
      ...prev,
      [bookingId]: {
        status: newStatus,
        payment_status: payment_status
      }
    }));
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Report", 14, 15);

    const tableColumn = columns
      .filter((col) => col.label !== "Action" && col.label !== "Status")
      .map((col) => col.label);

    const tableRows = data?.data.map((user) => [
      user.id,
      user?.user?.name,
      user.type,
      user.payment_status,
      user.booking_items[0]?.start_date,
      user.booking_items[0]?.end_date,
      `$${user.total_amount}`,
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
    {
      label: "Booking ID", accessor: "id", formatter: (_, __, index) => <TableId currentPage={currentPage} itemsPerPage={itemsPerPage} index={index} />
    },
    { label: "Name", 
      accessor: "name", 
      formatter: (_, row) => <div >{row?.user?.name}</div> 
    },
    { label: "Service", 
      accessor: "type" 
    },
    {
      label: "Payment", 
      accessor: "status",
      formatter: (_, row) => <BookingPymentStatuse status={row.payment_status} />,
    },
    { label: "Check-In", 
      accessor: "booking_items", 
      formatter: (_, row) => <DateCheck date={row?.booking_items[0].start_date} /> 
    },
    { label: "Check-Out", 
      accessor: "checkOut", 
      formatter: (_, row) => <DateCheck date={row?.booking_items[0].end_date} /> 
    },
    {
      label: "Price", 
      accessor: "total_amount",
      formatter: (value) => `$${value}`,
    },
    { label: "Action", 
      accessor: "status", 
      formatter: (_, row) => <BookingAction 
        onView={handleViewDetails} 
        status={row} 
        onOptimisticUpdate={handleOptimisticUpdate}
      />, 
    },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <BokingStatuse status={row.status} />,
    },
  ];
  
  // Apply optimistic updates to data
  const bookingData = data?.data?.map((booking: any) => {
    const optimisticUpdate = optimisticUpdates[booking.id];
    if (optimisticUpdate) {
      return {
        ...booking,
        status: optimisticUpdate.status,
        payment_status: optimisticUpdate.payment_status
      };
    }
    return booking;
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
            {["all", "hotel", "apartment", "tour"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setSelectedRole(role as "all" | "hotel" | "apartment" | "tour")
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${selectedRole === role
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
            data={bookingData}
            currentPage={currentPage}
            loading={loading}
            totalPages={totalPages || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div>
        {isModalOpen && <BookingCard open={isModalOpen} data={selectedUser} setIsModalOpen={setIsModalOpen} />}
      </div>
    </div>
  );
}
