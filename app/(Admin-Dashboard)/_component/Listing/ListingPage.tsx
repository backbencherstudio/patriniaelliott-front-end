"use client";
import Image from "next/image";
import React, { useState } from "react";
import DynamicTableWithPagination from "../common/DynamicTable";

import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { toast } from "react-toastify";
import EditPropertyDialog from "./EditPropertyDialog";
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
  const {token} = useToken();
  const queryClient = useQueryClient();

  // Normalize role for API (lowercase)
  const apiRole = selectedRole.toLowerCase();

  // React Query for fetching listing data
  const getListingData = async () => {
    const endpoint = `/admin/listing-management/all-properties?type=${apiRole}&limit=${itemsPerPage}&page=${currentPage}`;
    const response = await UserService.getData(endpoint, token);
    return response?.data;
  };

  const { data: listingResponse, error: apiError, isLoading } = useQuery({
    queryKey: ["listingData", apiRole, currentPage, itemsPerPage],
    queryFn: getListingData,
    enabled: !!token,
  });

  const data = listingResponse;
  const totalPages = data?.pagination?.totalPages || 0;
  const lisntingData = data?.data || [];
  const handleViewDetails = async(user: any) => {
     try {
      const response = await UserService.getData(`/admin/listing-management/${user?.id}`,token);
      setSelectedData(response?.data?.data);
      setIsModalOpen(true);
    } catch (error) {
      console.log("error",error);
    }
  };
  const handleEdite = (user: any) => {
    setSelectedData(user);
    setIsEdit(true);
  };

  const handleOptimisticUpdate = (id: any, status: any, payment_status: any) => {
    // Update the cache optimistically
    queryClient.setQueryData(["listingData", apiRole, currentPage, itemsPerPage], (oldData: any) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        data: oldData.data.map((item: any) => 
          item.id === id ? { ...item, status: status } : item
        )
      };
    });
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
        formatter: (_, row) => <ListingApproveAction status={row} onOptimisticUpdate={handleOptimisticUpdate} handleViewDetails={handleViewDetails} />,
    },
    {
      label: "Action",
      accessor: "status",
      formatter: (_, row) => (
        <ListingAction
          onEdit={handleEdite}
          onView={handleViewDetails}
          onDelete={handleDelete}
          editLoading={deleteListingMutation.isPending}
          data={row}
        />
      ),
    },
  ];
  // React Query mutation for deleting listing
  const deleteListingMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await UserService.deleteData(`/admin/listing-management/${id}`, token);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.data?.message || "Listing deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["listingData"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete listing. Please try again.");
    }
  });

  const handleDelete = (id: any) => {
    deleteListingMutation.mutate(id);
  };

  // Prefer API data; fallback to demo data
  const listingItems = (data?.data && data.data.length ? data.data : []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add header with title and date
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Property Listings Report", 14, 20);
    
    // Add subtitle with filter info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Filter: ${selectedRole === "All" ? "All Properties" : selectedRole}`, 14, 30);
    doc.text(`Generated on: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`, 14, 36);
    doc.text(`Total Records: ${listingItems.length}`, 14, 42);
    
    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(14, 48, 196, 48);

    // Prepare table columns (excluding Action and Status columns)
    const tableColumn = [
      "ID",
      "Property Name", 
      "Type",
      "Location",
      "Price (per night)",
      "Join Date"
    ];

    // Prepare table rows with better data formatting
    const tableRows = listingItems.map((item: any) => [
      item.displayId || item.id || "-",
      item.name || item.propertyName || "-",
      item.type || "-",
      item.location?.city || item.location?.name || item.location || "-",
      `$${item.price ?? item.price_per_night ?? item.base_price ?? 0}`,
      item.created_at ? dayjs(item.created_at).format("YYYY-MM-DD") : "-"
    ]);

    // Add table with improved styling
    (autoTable as any)(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      styles: { 
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: { 
        fillColor: [0, 104, 239],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 }, // ID
        1: { cellWidth: 40 }, // Property Name
        2: { halign: 'center', cellWidth: 25 }, // Type
        3: { cellWidth: 35 }, // Location
        4: { halign: 'right', cellWidth: 25 }, // Price
        5: { halign: 'center', cellWidth: 25 } // Join Date
      },
      margin: { left: 14, right: 14 },
      tableWidth: 'auto'
    });

    // Add footer with page info
    const pageCount = (doc as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`Page ${i} of ${pageCount}`, 14, (doc as any).internal.pageSize.height - 10);
      doc.text("Generated by Admin Dashboard", (doc as any).internal.pageSize.width - 60, (doc as any).internal.pageSize.height - 10);
    }

    // Generate filename with timestamp
    const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss");
    const filename = `property_listings_${selectedRole.toLowerCase()}_${timestamp}.pdf`;
    
    doc.save(filename);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4  mx-auto">
        <h2 className="text-2xl font-medium text-[#22262e] mb-1">
          Manage Listings
        </h2>
        <p className="text-base text-[#777980] mb-4">
          Check up on your latest listings and history.
        </p>
      </div>
      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
        <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
          {/* Role Filters */}
          <div className="flex justify-between md:justify-start gap-2 whitespace-nowrap md:gap-4">
            {["All", "Hotel", "Apartment", "Tour"].map((role) => (
              <button
                aria-label="Role"
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
              <button aria-label="Export as PDF" onClick={handleExportPDF} className=" cursor-pointer text-sm lg:text-base py-2 px-5 rounded-md bg-[#0068EF]  text-whiteColor">
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
                aria-label="Date range"
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
            loading={isLoading || !lisntingData}
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
              setListingData={() => {}} // No longer needed with React Query
              onOpenChange={setIsEdit}
            />
          )}
        {isEdit && selectedData && selectedData.type === "tour" && (
         <EditPropertyDialog
              open={isEdit}
              data={selectedData}
              listingData={lisntingData}
              setListingData={() => {}} // No longer needed with React Query
              onOpenChange={setIsEdit}
            />
        )}
        {isModalOpen && selectedData && selectedData.type === "tour" && (
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
