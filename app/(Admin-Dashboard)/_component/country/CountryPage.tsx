"use client"
import { useToken } from '@/hooks/useToken';
import { UserService } from '@/service/user/user.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import DynamicTableWithPagination from '../common/DynamicTable';
import AddCountryForm from './AddCountryForm';
import CountrySearch from './CountrySearch';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function CountryPage() {
    const { token } = useToken()
    const [currentPage, setCurrentPage] = useState(1)
    const searchparams = useSearchParams()
    const name = searchparams.get('name')
    const [limit, setLimit] = useState(10)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingRow, setEditingRow] = useState<any | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const queryClient = useQueryClient();
    const queryParamsString = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        q: name || '',
    }).toString();
    // React Query for fetching vendor documents data
    const getCountryData = async () => {
        const response = await UserService?.getData(`/admin/country?${queryParamsString}`, token);
        return response?.data;
    };

    const { data: countryData, error: apiError, isLoading } = useQuery({
        queryKey: ["countryData", currentPage, limit, name ],
        queryFn: getCountryData,
        enabled: !!token,
    });

    const data = countryData?.data || [];
    const totalPages = countryData?.pagination?.total_pages || 0;
    const totalItems = countryData?.pagination?.total || 0;

    const columns = [
        { label: "Name", 
        accessor: "name", 
        width: "150px", 
        formatter: (value) =>  <div className='text-nowrap'>{value}</div>, },    
        {
            label: "Country Code",
            accessor: "country_code",
            formatter: (value) => `${value}`,
        },
        {
            label: "Dial Code", accessor: "dial_code",

            formatter: (value) => <div>{value}</div>,
        },
        {
            label: "Action",
            accessor: "actions",
            width: "150px",
            formatter: (value, row) =>{
                const deleteId = deletingId === row?.id;
              return  (
                <div className='flex items-center gap-2'>
                    <button onClick={()=>handleEdit(row)} disabled={deleteId} className='text-sm flex items-center gap-1 p-2  rounded-sm underline text-nowrap bg-green-600/15 border-green-300 border text-green-100  hover:text-white cursor-pointer'><FaEdit className='text-green-600' /> </button>
                    
                    <button onClick={()=>handleDelete(row)} disabled={deleteId} className='text-sm flex items-center gap-1 p-2 disabled:cursor-not-allowed disabled:bg-red-600/15 disabled:border-red-300 disabled:text-red-600 rounded-sm underline text-nowrap bg-red-600/15 border-red-300 border text-red-600 hover:text-white cursor-pointer'> {deleteId ? <Loader2 size={18} className="text-red-600 animate-spin" /> : <RiDeleteBin6Line className='text-red-600' />} </button>
                </div>
            )},
        },
    ];
    const handleEdit = (row: any) => {
       setEditingRow(row);
       setDialogOpen(true);
    };
    const deleteCountryMutation = useMutation({
        mutationFn:async (id:string) => {
            const response = await UserService.deleteData(`/admin/country/${id}`, token);
            return response;
        },
        onSuccess: (data) => {
            toast.success(data?.data?.message || "Country deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["countryData"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to delete country. Please try again.");
        }
    })
    const handleDelete = (row: any) => {
       setDeletingId(row?.id);
       deleteCountryMutation.mutate(row?.id);
    }

    return (
        <div className="flex flex-col gap-5">
            {/* Overview */}
            <div className="w-full bg-white rounded-xl p-4  mx-auto">
                <h2 className="text-2xl font-medium text-[#22262e] mb-1">
                    Manage Country
                </h2>
                <p className="text-base text-[#777980] mb-4">
                    Manage your country list.
                </p>
            </div>
            {/* Table Section */}
            <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-xl mx-auto">
                <div className="flex justify-between items-start md:items-center gap-2 md:gap-4 mb-4 flex-col md:flex-row">
                    {/* Role Filters */}
                    <h2 className='text-xl font-medium text-[#22262e] mb-1 text-left'>Country Management</h2>
                    <div className='flex items-center gap-2'>
                    <CountrySearch/>
                     <button onClick={() => { setEditingRow(null); setDialogOpen(true); }} className='text-sm flex items-center gap-1 p-2  rounded-sm  text-nowrap text-whiteColor border-blue-300 border bg-blue-600  hover:bg-blue-700 cursor-pointer'><FaPlus className='text-white' /> Add Country</button>
                    </div>
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
            <AddCountryForm
              initialData={editingRow}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
            />
           
        </div>
    )
}

export default CountryPage
