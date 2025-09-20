"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";

import useFetchData from "@/hooks/useFetchData";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { toast } from "react-toastify";
import EditPropertyDialog from "./EditPropertyDialog";
import EditTourDialog from "./EditTourDialog";
import ListingAction from "./ListingAction";
import ListingApproveAction from "./ListingApproveAction";
import ListingPropartyCard from "./ListingPropartyCard";
import ListingStatuse from "./ListingStatuse";
import ListingToureCard from "./ListingToureCard";

export default function ListingPage() {
  const [isModalOpen, setIsModalOpen] = React.useState<any>(false);
  const [isEdit, setIsEdit] = React.useState<any>(false);
  const [selectedData, setSelectedData] = React.useState<any | null>(null);
  const [selectedRole, setSelectedRole] = React.useState<
    "All" | "Hotel" | "Apartment" | "Tour"
  >("All");
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "15" | "30">(
    "all"
  );
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [lisntingData, setListingData]=useState<any>([]);
  const {token} = useToken();
  // Normalize role for API (lowercase)
  const apiRole = selectedRole.toLowerCase();
  const endpoint = `/admin/listing-management/all-properties?type=${apiRole}&limit=${itemsPerPage}&page=${currentPage}`;
  const { data, loading, error } = useFetchData(endpoint);
  const totalPages = data?.pagination?.total_pages || 0;
  useEffect(()=>{
    if (data?.data) {
      setListingData(data?.data);
    }
  },[data])
  const handleViewDetails = (user: any) => {
    setSelectedData(user);
    setIsModalOpen(true);
  };
  const handleEdite = (user: any) => {
    setSelectedData(user);
    setIsEdit(true);
  };

  const columns = [
    { label: "User ID", accessor: "displayId", width:"100px" },
    { label: "Property name", accessor: "name", },
    { label: "Type (Property/Tour)", accessor: "type" , width:"170px",},
    { label: "Location", accessor: "location",  width:"150px", },
    {
      label: "Price (per night)",
      accessor: "price",
     
      formatter: (value) => `$${value}`,
    },
    { label: "Join Date", accessor: "joinDate" ,
      
      formatter: (value) => value ? dayjs(value).format("YYYY-MM-DD") : "-",
    },
    {
      label: "Status",
      accessor: "status",
   
      formatter: (_, row) => <ListingStatuse status={row.status} />,
    },
    {
      label: "Approval",
      accessor: "status",
      formatter: (_, row) => <ListingApproveAction status={row}  handleViewDetails={handleViewDetails} />,
    },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
        <ListingAction
          onEdit={handleEdite}
          onView={handleViewDetails}
          onDelete={handleDelete}
          data={row}
        />
      ),
    },
  ];
const handleDelete = async(id: any) => {
  console.log(id);
  try {
    const response = await UserService.deleteData(`/admin/listing-management/${id}`,token);
    
  if (response?.data?.success) {
    toast.success(response?.data?.message);
    setListingData((prev) => prev.filter((item) => item.id !== id));
  } else {
    toast.error(response?.data?.message);
  }
  } catch (error) {
    console.log("error",error);
  }
};

console.log(isEdit);


  // Prefer API data; fallback to demo data
  const listingItems = (data?.data && data.data.length ? data.data : []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Property Listings", 14, 15);

    const tableColumn = columns
      .filter((col) => col.label !== "Action" && col.label !== "Status")
      .map((col) => col.label);

    const tableRows = listingItems.map((item: any) => [
      item.id || item.userId || "-",
      item.propertyName || item.name || item.property?.name || "-",
      item.type || item.category || "-",
      item.location?.city || item.location?.name || item.location || "-",
      `$${item.price ?? item.price_per_night ?? item.base_price ?? 0}`,
      item.joinDate || (item.created_at ? dayjs(item.created_at).format("YYYY-MM-DD") : "-")
    ]);

    (autoTable as any)(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 104, 239] },
    });

    doc.save("property_listings.pdf");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4  mx-auto">
        <h2 className="text-2xl font-medium text-[#22262e] mb-1">
          Manage bookings
        </h2>
        <p className="text-base text-[#777980] mb-4">
          Check up on your latest reservations and history.
        </p>
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["All", "Hotel", "Apartment", "Tour"].map((role) => (
              <button
                key={role}
                onClick={() =>
                  setSelectedRole(
                    role as "All" | "Hotel" | "Apartment" | "Tour"
                  )
                }
                className={`md:px-4 px-1 cursor-pointer text-sm md:text-base py-2 ${
                  selectedRole === role
                    ? "border-b-2 border-[#d6ae29] text-[#070707]"
                    : "border-b text-[#777980]"
                }`}
              >
                {role === "All" ? "All property" : role}
              </button>
            ))}
          </div>

          {/* Date Range Dropdown */}
          <div className=" mt-4 md:mt-0 justify-end flex gap-2">
            <div>
              <button onClick={handleExportPDF} className=" cursor-pointer text-sm lg:text-base py-2 px-5 rounded-md bg-[#0068EF]  text-whiteColor">
                Export as PDF
              </button>
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
                <option className="text-xs" value="all">
                  All Time
                </option>
                <option className="text-xs" value="7">
                  {" "}
                  Last 7 days
                </option>
                <option className="text-xs" value="15">
                  Last 15 days
                </option>
                <option className="text-xs" value="30">
                  Last 30 days
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <DynamicTableWithPagination
            data={lisntingData}
            columns={columns}
            currentPage={currentPage}
            loading={loading}
            totalPages={totalPages || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
      <div>
        {isModalOpen &&
          selectedData &&
          (selectedData.type === "apartment" ||
            selectedData.type === "hotel") && (
            <ListingPropartyCard
              open={isModalOpen}
              data={selectedData}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        {isEdit &&
          selectedData &&
          (selectedData.type === "apartment" ||
            selectedData.type === "hotel") && (
            <EditPropertyDialog
              open={isEdit}
              data={selectedData}
              listingData={lisntingData}
              setListingData={setListingData}
              onOpenChange={setIsEdit}
            />
          )}
        {isEdit && selectedData && selectedData.type === "Tour" && (
          <EditTourDialog
            open={isEdit}
            data={selectedData}
            onOpenChange={setIsEdit}
          />
        )}
        {isModalOpen && selectedData && selectedData.type === "Tour" && (
          <ListingToureCard
            open={isModalOpen}
            data={selectedData}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
}
