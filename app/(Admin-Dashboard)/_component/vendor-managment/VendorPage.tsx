"use client"
import DateFilter from '@/components/reusable/DateFilter';
import { useToken } from '@/hooks/useToken';
import cancelIcon from '@/public/dashboard/icon/cross.svg';
import pendingIcon from '@/public/dashboard/icon/loading.svg';
import tikIcon from '@/public/dashboard/icon/tik.svg';
import { UserService } from '@/service/user/user.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import DynamicTableWithPagination from '../common/DynamicTable';
import DocumentDetails from './DocumentDetails';
import VendorDocumentAction from './VendorDocumentAction';

function VendorPage() {
    const { token } = useToken()
    const searchParams= useSearchParams()
    const dateFilter = searchParams.get("dateFilter")
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<any>(null)
    const queryClient = useQueryClient();
    // React Query for fetching vendor documents data
    const getVendorDocumentsData = async () => {
        const response = await UserService?.getData(`/admin/vendor-user-verification/documents?status=all&page=${currentPage}&limit=${limit}&${dateFilter ? `dateFilter=${dateFilter}` : ''}`, token);
        return response?.data;
    };

    const { data: vendorData, error: apiError, isLoading } = useQuery({
        queryKey: ["vendorDocumentsData", currentPage, limit,dateFilter ],
        queryFn: getVendorDocumentsData,
        enabled: !!token,
    });

    const data = vendorData?.data || [];
    const totalPages = vendorData?.meta?.totalPages || 0;
    const totalItems = vendorData?.meta?.total || 0;

    const handleOptimisticUpdate = (id: any, status: any) => {
        // Update the cache optimistically
        queryClient.setQueryData(["vendorDocumentsData", currentPage, limit,dateFilter], (oldData: any) => {
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
        { label: "Name", accessor: "user", width: "150px", formatter: (value) => `${value?.name}`, },
        {
            label: "Email",
            accessor: "user",
            formatter: (value) => `${value?.email}`,
        },
        {
            label: "Join Date", accessor: "created_at",

            formatter: (value) => value ? dayjs(value).format("YYYY-MM-DD") : "-",
        },
        {
            label: "Status",
            accessor: "status",
            formatter: (value) => <div className={`w-full text-sm capitalize text-center flex items-center gap-1 justify-center py-1 rounded-full border ${value === "pending" ? "border-[#ffa23a] bg-[#FFA23A]/10 text-[#ffa23a]" : value === "approved" ? "border-greenColor bg-greenColor/10 text-greenColor" : "border-red-500 bg-red-500/10 text-redColor"}`}> {value == "pending" ? <Image src={pendingIcon} alt="pending" width={12} height={12} /> : value == "approved" ? <Image src={tikIcon} alt="approved" width={12} height={12} /> : <Image src={cancelIcon} alt="rejected" width={12} height={12} />} {value || "Cancel"}</div>,
        },
        {
            label: "Action",
            accessor: "status",
            formatter: (value, row) => (
                <div>
                    <VendorDocumentAction value={value} row={row} onView={handleView} handleOptimisticUpdate={handleOptimisticUpdate}  />
                </div>
            ),
        },
    ];
    const handleView = (row: any) => {
        setSelectedData(row)
        setIsModalOpen(true)
    }


    return (
        <div className="flex flex-col gap-5">
            {/* Overview */}
            <div className="w-full bg-white rounded-xl p-4  mx-auto">
                <h2 className="text-2xl font-medium text-[#22262e] mb-1">
                    Manage Vendor documents Approve
                </h2>
                <p className="text-base text-[#777980] mb-4">
                    Check up on your latest listings and history.
                </p>
            </div>
            {/* Table Section */}
            <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
                <div className="md:flex justify-between items-center gap-2 md:gap-4 mb-4">
                    {/* Role Filters */}
                    <h2 className='text-xl font-medium text-[#22262e] mb-1'>Vendor Documents</h2>
                    {/* Date Range Dropdown */}
                   <DateFilter/>
                </div>

                {/* Table */}
                <div>
                    <DynamicTableWithPagination
                        data={data}
                        columns={columns}
                        currentPage={currentPage}
                        loading={isLoading || !data}
                        totalPages={totalPages || 0}
                        itemsPerPage={limit}
                        onPageChange={(page) => setCurrentPage(page)}
                        totalItems={totalItems}
                    />
                </div>
            </div>
            <div>

            </div>
            {isModalOpen && selectedData && (
                <DocumentDetails open={isModalOpen} setIsModalOpen={setIsModalOpen} data={selectedData} />
            )}
        </div>
    )
}

export default VendorPage
