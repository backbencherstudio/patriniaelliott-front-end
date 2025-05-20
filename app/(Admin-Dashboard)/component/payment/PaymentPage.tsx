"use client";
import Image from "next/image";
import { useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingData } from "@/DemoAPI/ListingData";
import CancelRefundDetails from "./CancelRefundDetails";
import ConfirmRefundDetails from "./ConfirmRefundDetails";
import PaymentAction from "./PaymentAction";
import PaymentStatCard from "./PaymentStateCard";
import PaymentStatuse from "./PaymentStatus";

export default function PaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [cancel, setCancel] = useState<any>(false);
  const [payment, setPayment] = useState<
    "all" | "PayPal" | "Credit Card" | "Stripe"
  >("all");
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "All" | "Booking" | "Refunds"
  >("All");
  const [dateRange, setDateRange] = useState<"all" | "7" | "15" | "30">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleViewDetails = (user: any) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };
  const handleDelete = (user: any) => {
    setSelectedData(user);
    setCancel(true);
  };
  const columns = [
    { label: "Booking ID", accessor: "userId" },
    { label: "Guest Name", accessor: "name" },
    { label: "Transaction Type", accessor: "transactionType" },

    {
      label: "Amount",
      accessor: "price",
      formatter: (value) => `$${value}`,
    },
    { label: "Payment Method", accessor: "pymentMethod" },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <PaymentStatuse status={row.status} />,
    },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
        <PaymentAction onView={handleViewDetails} onDelete={handleDelete} status={row} />
      ),
    },
  ];
  const Bookcolumns = [
    { label: "Date", accessor: "joinDate" },
    { label: "Booking ID", accessor: "userId" },
    { label: "Guest Name", accessor: "name" },
    {
      label: "Amount",
      accessor: "price",
      formatter: (value) => `$${value}`,
    },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <PaymentStatuse status={row.status} />,
    },
    { label: "Payment Method", accessor: "pymentMethod" },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
        <PaymentAction onView={handleViewDetails} onDelete={handleDelete} status={row} />
      ),
    },
  ];
  const Refundcolumns = [
    { label: "Booking ID", accessor: "userId" },
    { label: "Reason", accessor: "reason" },
    { label: "Guest Name", accessor: "name" },
    { label: "Request date", accessor: "joinDate" },
    {
      label: "Refund amount",
      accessor: "price",
      formatter: (value) => `$${value}`,
    },

    {
      label: "Refund Status",
      accessor: "status",
      formatter: (_, row) => <PaymentStatuse status={row.status} />,
    },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
        <PaymentAction onView={handleViewDetails} onDelete={handleDelete} status={row} />
      ),
    },
  ];
  const stats = [
    {
      title: "Total Bookings",
      value: "150 transactions",
      icon: "/dashboard/icon/all.svg",
      color: "#C9A634",
    },
    {
      title: "Total Commission",
      value: "$5000",
      icon: "/dashboard/icon/commission.svg",
      color: "#C9A634",
    },
    {
      title: "Total Withdrawal",
      value: "$27000",
      icon: "/dashboard/icon/withdrawal.svg",
      color: "#C9A634",
    },
    {
      title: "Refunds Issued",
      value: "$990",
      icon: "/dashboard/icon/refunds.svg",
      color: "#C9A634",
    },
  ];

  const filteredUsers = listingData.filter((user) => {
    const roleMatch =
      selectedRole === "All" ||
      user.transactionType === selectedRole ||
      user?.pymentMethod == selectedRole;
    const paymentMatch = payment === "all" || user.pymentMethod === payment;
    let dateMatch = true;

    if (dateRange !== "all") {
      const joinDate = new Date(user.joinDate.split("/").reverse().join("-"));
      const today = new Date();
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - parseInt(dateRange));
      dateMatch = joinDate >= cutoffDate;
    }
    return roleMatch && dateMatch && paymentMatch;
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <PaymentStatCard key={index} {...stat} />
          ))}
        </div>
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["All", "Booking", "Refunds"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setSelectedRole(role as "All" | "Booking" | "Refunds")
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${
                  selectedRole === role
                    ? "border-b-2 border-[#d6ae29] text-[#070707]"
                    : "border-b text-[#777980]"
                }`}
              >
                {role === "All" ? "All transaction" : role}
              </button>
            ))}
          </div>

          {/* Date Range Dropdown */}
          <div className=" mt-4 md:mt-0 justify-end flex gap-2">
            <div className=" items-center flex gap-1  md:gap-2 text-sm ">
              <Select
                value={payment}
                onValueChange={(value) =>
                  setPayment(
                    value as "all" | "PayPal" | "Credit Card" | "Stripe"
                  )
                }
              >
                <SelectTrigger className="rounded-sm border border-[#0068ef] text-[#0068ef] bg-transparent focus:ring-0 focus:ring-offset-0">
                  <SelectValue
                    placeholder="Payment Method"
                    className="text-[#0068ef] placeholder:text-[#0068ef]"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          {selectedRole === "All" && (
            <DynamicTableWithPagination
              columns={columns}
              data={filteredUsers}
              currentPage={currentPage}
              itemsPerPage={8}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
          {selectedRole === "Booking" && (
            <DynamicTableWithPagination
              columns={Bookcolumns}
              data={filteredUsers}
              currentPage={currentPage}
              itemsPerPage={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
          {selectedRole === "Refunds" && (
            <DynamicTableWithPagination
              columns={Refundcolumns}
              data={filteredUsers}
              currentPage={currentPage}
              itemsPerPage={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>

    
      </div>

      <div>
      {isModalOpen &&
          selectedData &&
          (selectedData.status === "Cancel") && (
            <CancelRefundDetails
              open={isModalOpen}
              data={selectedData}
              onOpenChange={setIsModalOpen}
            />
          )}
      {isModalOpen &&
          selectedData &&
          (selectedData.status === "Available") && (
            <ConfirmRefundDetails
              open={isModalOpen}
              data={selectedData}
              onOpenChange={setIsModalOpen}
            />
          )}
      </div>
    </div>
  );
}
