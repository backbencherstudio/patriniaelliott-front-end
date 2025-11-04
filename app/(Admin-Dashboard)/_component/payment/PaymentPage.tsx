"use client";
import { useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";

import DateFilter from "@/components/reusable/DateFilter";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import CancelRefund from "./CancelRefund";
import CancelRefundDetails from "./CancelRefundDetails";
import ConfirmRefundDetails from "./ConfirmRefundDetails";
import PaymentAction from "./PaymentAction";
import PaymentStatCard from "./PaymentStateCard";
import PaymentStatuse from "./PaymentStatus";
import RefundConfirmation from "./RefundConfirmation";

export default function PaymentPage() {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [cancel, setCancel] = useState<any>(false);
  const [cancelRefund, setCancelRefund] = useState<any>(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<
    "all" | "order" | "refund"
  >("all");
  const searchParams= useSearchParams()
  const dateFilter = searchParams.get("dateFilter")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const {token} = useToken();

  // React Query for fetching payment data
  const getPaymentData = async () => {
    const endpoint = `/dashboard/payments/transactions?type=${selectedRole}&limit=${itemsPerPage}&page=${currentPage}&${dateFilter ? `dateFilter=${dateFilter}` : ''}`;
    const response = await UserService.getData(endpoint, token);
    return response?.data;
  };

  const { data: paymentResponse, error: apiError, isLoading } = useQuery({
    queryKey: ["paymentData", selectedRole, currentPage, itemsPerPage,dateFilter ],
    queryFn: getPaymentData,
    enabled: !!token,
  });

  // React Query for fetching individual transaction details
  const getTransactionDetails = async (transactionId: string) => {
    const response = await UserService.getData(`/dashboard/payments/transactions/${transactionId}`, token);
    return response?.data?.data;
  };
  const data = paymentResponse?.data;
  const totalPages = data?.transactions?.pagination?.totalPages || 0;
  const paymentData = data?.transactions?.data || [];
  const totalItems = data?.transactions?.pagination?.total || 0;
  const paymentHistory = data?.statistics;
  const handleViewDetails = async (user: any) => {
    try {
      // Use React Query to fetch transaction details
      const response = await getTransactionDetails(user?.id);
      setSelectedData(response);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error", error);
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
        <PaymentAction onView={handleViewDetails} onAccept={handleAccept} onCancel={handleCancel} status={row} />
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
       <PaymentAction onView={handleViewDetails} onAccept={handleAccept} onCancel={handleCancel} status={row} />
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
       <PaymentAction onView={handleViewDetails} onAccept={handleAccept} onCancel={handleCancel} status={row} />
      ),
    },
  ];
  const stats = [
    {
      title: "Total Bookings",
      value: `${paymentHistory?.total_bookings || 0} transactions`,
      icon: "/dashboard/icon/all.svg",
      color: "#C9A634",
    },
    {
      title: "Total Commission",
      value: `$${paymentHistory?.total_commission || 0 }`,
      icon: "/dashboard/icon/commission.svg",
      color: "#C9A634",
    },
    {
      title: "Total Withdrawal",
      value: `$${paymentHistory?.total_withdraw || 0}`,
      icon: "/dashboard/icon/withdrawal.svg",
      color: "#C9A634",
    },
    {
      title: "Refunds Issued",
      value: `$${paymentHistory?.total_refund || 0}`,
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
                aria-label={role}
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
           
            <DateFilter/>
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
              loading={isLoading || !paymentData}
              totalItems={totalItems}
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
              loading={isLoading || !paymentData}
              onPageChange={(page) => setCurrentPage(page)}
              totalItems={totalItems}
            />
          )}
          {selectedRole === "refund" && (
            <DynamicTableWithPagination
              columns={Refundcolumns}
              totalPages={totalPages}
              data={paymentData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              loading={isLoading || !paymentData}
              onPageChange={(page) => setCurrentPage(page)}
              totalItems={totalItems}
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
              open={cancel}
              data={selectedData}
              onOpenChange={setCancel}
            
            />
        }
      {cancelRefund && selectedData &&
            <CancelRefund
              open={cancelRefund}
              data={selectedData}
              onOpenChange={setCancelRefund}
            />
        }
      </div>
    </div>
  );
}
