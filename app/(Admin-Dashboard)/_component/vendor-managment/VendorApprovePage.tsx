"use client"
import { useToken } from '@/hooks/useToken';
import cancelIcon from '@/public/dashboard/icon/cross.svg';
import pendingIcon from '@/public/dashboard/icon/loading.svg';
import tikIcon from '@/public/dashboard/icon/tik.svg';
import { UserService } from '@/service/user/user.service';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DynamicTableWithPagination from '../common/DynamicTable';
import DocumentDetails from './DocumentDetails';
import VendorDocumentAction from './VendorDocumentAction';

function VendorApprovePage() {
    const [dateRange, setDateRange] = useState<"all" | "7" | "15" | "30">("all");
    const { token } = useToken()
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedData, setSelectedData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<any>([])
    const handleOptimisticUpdate = (id: any, status: any) => {
    setData((prev) => prev.map((item: any) => item.id === id ? { ...item, status : status } : item));
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
        console.log("check", row);
        setSelectedData(row)
        setIsModalOpen(true)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await UserService?.getData(`/admin/vendor-user-verification/documents?status=all&page=${currentPage}&limit=${limit}`, token);
            const resData = response?.data?.data || []
            setData(resData);
            setTotalPages(response?.data?.meta?.totalPages || 0)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("check error", error);
        }
    }
    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token, currentPage, limit]); 

    return (
        <div className="flex flex-col gap-5">
            {/* Overview */}
            <div className="w-full bg-white rounded-xl p-4  mx-auto">
                <h2 className="text-2xl font-medium text-[#22262e] mb-1">
                    Manage Vendor proparty Approval
                </h2>
                <p className="text-base text-[#777980] mb-4">
                    Check up on your latest listings and history.
                </p>
            </div>
            {/* Table Section */}
            <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
                <div className="md:flex justify-end items-center gap-2 md:gap-4 mb-4">
                    {/* Role Filters */}

                    {/* Date Range Dropdown */}
                    <div className=" mt-4 md:mt-0 justify-end flex gap-2">

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
                        data={data}
                        columns={columns}
                        currentPage={currentPage}
                        loading={loading}
                        totalPages={totalPages || 0}
                        itemsPerPage={limit}
                        onPageChange={(page) => setCurrentPage(page)}
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

export default VendorApprovePage

