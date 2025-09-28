"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";

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
import dayjs from "dayjs";
import CancelRefund from "./CancelRefund";
import CancelRefundDetails from "./CancelRefundDetails";
import ConfirmRefundDetails from "./ConfirmRefundDetails";
import PaymentAction from "./PaymentAction";
import PaymentStatCard from "./PaymentStateCard";
import PaymentStatuse from "./PaymentStatus";
import RefundConfirmation from "./RefundConfirmation";

export default function PaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [isEdit, setIsEdit] = useState<any>(false);
  const [cancel, setCancel] = useState<any>(false);
  const [cancelRefund, setCancelRefund] = useState<any>(false);
  const [paymentData, setPaymentData] = useState<any>([]);
  const [paymentHistory, setPaymentHistory] = useState<any>();
  const [payment, setPayment] = useState<
    "all" | "PayPal" | "Credit Card" | "Stripe"
  >("all");
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "all" | "order" | "refund"
  >("all");
  const [dateRange, setDateRange] = useState<"all" | "7" | "15" | "30">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 const endpoint = `/dashboard/payments/transactions?type=${selectedRole}&limit=${itemsPerPage}&page=${currentPage}`;
  const { data, loading, error } = useFetchData(endpoint);
  const totalPages = data?.data?.transactions?.pagination?.totalPages || 0;
  const {token} = useToken();
  useEffect(()=>{
    if (data?.data) {
        setPaymentData(data?.data?.transactions?.data);
        setPaymentHistory(data?.data?.statistics);
    }
  },[data])
  const handleViewDetails = async (user: any) => {
     try {
      const response = await UserService.getData(`/dashboard/payments/transactions/${user?.id}`,token);
  
      setSelectedData(response?.data?.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error",error);
    }
   
  };
  const handleAccept = (user: any) => {
    setSelectedData(user);
    setCancel(true);
  };
  const handleCancel = (user: any) => {
      setSelectedData(user);
    setCancelRefund(true);
  };
  const handleOptimisticUpdate = (id: any, status: any) => {
    setPaymentData((prev) => prev.map((item: any) => item.id === id ? { ...item, status } : item));
  };
  const columns = [
    { label: "Booking ID", accessor: "booking_id" },
    { label: "Guest Name", accessor: "user",formatter: (value) => `${value?.name}` },
    { label: "Transaction Type", accessor: "type" },
    {
      label: "Amount",
      accessor: "amount",
      formatter: (value) => `$${value}`,
    },
    { label: "Payment Method", accessor: "provider" },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <PaymentStatuse status={row.status} />,
    },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
        <PaymentAction onView={handleViewDetails} onAccept={handleAccept} onCancel={handleViewDetails} status={row} />
      ),
    },
  ];
  const Bookcolumns = [
    { label: "Date", accessor: "created_at",formatter: (value) => `${value ? dayjs(value).format("YYYY-MM-DD") : "-"}` },
    { label: "Booking ID", accessor: "booking_id" },
    { label: "Guest Name", accessor: "user",formatter: (value) => `${value?.name}` },
    {
      label: "Amount",
      accessor: "amount",
      formatter: (value) => `$${value}`,
    },
    {
      label: "Status",
      accessor: "status",
      formatter: (_, row) => <PaymentStatuse status={row.status} />,
    },
    { label: "Payment Method", accessor: "provider" },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
       <PaymentAction onView={handleViewDetails} onAccept={handleAccept} onCancel={handleViewDetails} status={row} />
      ),
    },
  ];
  const Refundcolumns = [
    { label: "Booking ID", accessor: "booking_id" ,width:"100px" },
    { label: "Reason", accessor: "refund_reason" },
    { label: "Guest Name", accessor: "user",formatter: (value) => `${value?.name}` },
    { label: "Request date", accessor: "created_at",formatter: (value) => `${value ? dayjs(value).format("YYYY-MM-DD") : "-"}` },
    {
      label: "Refund amount",
      accessor: "amount",
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
       <PaymentAction onView={handleViewDetails} onAccept={handleAccept} onCancel={handleViewDetails} status={row} />
      ),
    },
  ];
  console.log(paymentHistory);
  
  const stats = [
    {
      title: "Total Bookings",
      value: `${paymentHistory?.total_bookings} transactions`,
      icon: "/dashboard/icon/all.svg",
      color: "#C9A634",
    },
    {
      title: "Total Commission",
      value: `$${paymentHistory?.total_commission}`,
      icon: "/dashboard/icon/commission.svg",
      color: "#C9A634",
    },
    {
      title: "Total Withdrawal",
      value: `$${paymentHistory?.total_withdraw}`,
      icon: "/dashboard/icon/withdrawal.svg",
      color: "#C9A634",
    },
    {
      title: "Refunds Issued",
      value: `$${paymentHistory?.total_refund}`,
      icon: "/dashboard/icon/refunds.svg",
      color: "#C9A634",
    },
  ];


  
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
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["all", "order", "refund"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setSelectedRole(role as "all" | "order" | "refund")
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${
                  selectedRole === role
                    ? "border-b-2 border-[#d6ae29] text-[#070707]"
                    : "border-b text-[#777980]"
                }`}
              >
                {role === "all" ? "All transaction" : role}
              </button>
            ))}
          </div>

          {/* Date Range Dropdown */}
          <div className=" mt-4 md:mt-0 justify-end flex gap-2">
            {/* <div className=" items-center flex gap-1  md:gap-2 text-sm ">
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
            </div> */}
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
          {selectedRole === "all" && (
            <DynamicTableWithPagination
              columns={columns}
              totalPages={totalPages}
              data={paymentData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              loading={loading}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
          {selectedRole === "order" && (
            <DynamicTableWithPagination
              columns={Bookcolumns}
              totalPages={totalPages}
              data={paymentData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              loading={loading}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
          {selectedRole === "refund" && (
            <DynamicTableWithPagination
              columns={Refundcolumns}
              totalPages={totalPages}
              data={paymentData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              loading={loading}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>

      <div>
      {isModalOpen &&
          selectedData &&
          (selectedData.status === "cancel") && (
            <CancelRefundDetails
              open={isModalOpen}
              data={selectedData}
              onOpenChange={setIsModalOpen}
            />
          )}
      {isModalOpen &&
          selectedData &&
          (selectedData.status === "succeeded" || selectedData.status === "approved" || selectedData.status === "canceled") && (
            <ConfirmRefundDetails
              open={isModalOpen}
              data={selectedData}
              onOpenChange={setIsModalOpen}
            />
          )}
      {cancel && selectedData &&
            <RefundConfirmation
             onOptimisticUpdate={handleOptimisticUpdate}
              open={cancel}
              data={selectedData}
              onOpenChange={setCancel}
            />
        }
      {cancelRefund && selectedData &&
            <CancelRefund
             onOptimisticUpdate={handleOptimisticUpdate}
              open={cancelRefund}
              data={selectedData}
              onOpenChange={setCancelRefund}
            />
        }
      </div>
    </div>
  );
}
