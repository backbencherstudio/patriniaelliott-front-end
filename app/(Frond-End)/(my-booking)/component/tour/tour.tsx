"use client"

import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable'
import TransStatCard from '@/app/(Frond-End)/(vendor-profile)/component/transection/TransStatCard'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ApartmentStatuse from '../apartment/ApartmentStatuse'
import { useBookingDashboard } from '@/hooks/useBookingDashboard'
import { useMyProfile } from '@/hooks/useMyProfile'

const DeleteIcon = () => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-200">
      <g>
        <path d="M11.1589 14.8327H6.03885C5.5266 14.8253 5.03602 14.6248 4.66522 14.2713C4.29441 13.9178 4.07071 13.4373 4.03885 12.926L3.43219 3.69935C3.42908 3.63245 3.43926 3.5656 3.46215 3.50267C3.48503 3.43973 3.52017 3.38196 3.56552 3.33268C3.61224 3.28162 3.66881 3.24053 3.73183 3.21189C3.79484 3.18325 3.86299 3.16764 3.93219 3.16602H13.2655C13.3341 3.16586 13.4019 3.17981 13.4649 3.207C13.5278 3.23419 13.5845 3.27403 13.6314 3.32405C13.6783 3.37406 13.7144 3.43319 13.7375 3.49776C13.7605 3.56232 13.7701 3.63094 13.7655 3.69935L13.1855 12.926C13.1533 13.4419 12.9259 13.9261 12.5494 14.2803C12.1729 14.6345 11.6757 14.832 11.1589 14.8327ZM4.49219 4.16602L5.00552 12.866C5.02248 13.1284 5.13879 13.3744 5.33077 13.554C5.52275 13.7336 5.77597 13.8332 6.03885 13.8327H11.1589C11.4213 13.8317 11.6736 13.7315 11.8653 13.5522C12.0569 13.3729 12.1737 13.1278 12.1922 12.866L12.7322 4.19935L4.49219 4.16602Z" className="fill-current"/>
        <path d="M14.5996 4.16602H2.59961C2.467 4.16602 2.33982 4.11334 2.24606 4.01957C2.15229 3.9258 2.09961 3.79862 2.09961 3.66602C2.09961 3.53341 2.15229 3.40623 2.24606 3.31246C2.33982 3.21869 2.467 3.16602 2.59961 3.16602H14.5996C14.7322 3.16602 14.8594 3.21869 14.9532 3.31246C15.0469 3.40623 15.0996 3.53341 15.0996 3.66602C15.0996 3.79862 15.0469 3.9258 14.9532 4.01957C14.8594 4.11334 14.7322 4.16602 14.5996 4.16602Z" className="fill-current"/>
        <path d="M10.5996 4.16602H6.59961C6.46754 4.16429 6.34136 4.11106 6.24797 4.01766C6.15457 3.92426 6.10134 3.79809 6.09961 3.66602V2.46602C6.10806 2.1239 6.24774 1.79812 6.48973 1.55613C6.73172 1.31414 7.05749 1.17447 7.39961 1.16602H9.79961C10.1474 1.17471 10.4781 1.31902 10.7209 1.56813C10.9638 1.81724 11.0997 2.15143 11.0996 2.49935V3.66602C11.0979 3.79809 11.0447 3.92426 10.9513 4.01766C10.8579 4.11106 10.7317 4.16429 10.5996 4.16602ZM7.09961 3.16602H10.0996V2.49935C10.0996 2.41978 10.068 2.34348 10.0117 2.28722C9.95548 2.23096 9.87917 2.19935 9.79961 2.19935H7.39961C7.32004 2.19935 7.24374 2.23096 7.18748 2.28722C7.13122 2.34348 7.09961 2.41978 7.09961 2.49935V3.16602ZM10.5996 12.166C10.4675 12.1643 10.3414 12.1111 10.248 12.0177C10.1546 11.9243 10.1013 11.7981 10.0996 11.666V6.33268C10.0996 6.20007 10.1523 6.0729 10.2461 5.97913C10.3398 5.88536 10.467 5.83268 10.5996 5.83268C10.7322 5.83268 10.8594 5.88536 10.9532 5.97913C11.0469 6.0729 11.0996 6.20007 11.0996 6.33268V11.666C11.0979 11.7981 11.0447 11.9243 10.9513 12.0177C10.8579 12.1111 10.7317 12.1643 10.5996 12.166ZM6.59961 12.166C6.46754 12.1643 6.34136 12.1111 6.24797 12.0177C6.15457 11.9243 6.10134 11.7981 6.09961 11.666V6.33268C6.09961 6.20007 6.15229 6.0729 6.24606 5.97913C6.33982 5.88536 6.467 5.83268 6.59961 5.83268C6.73222 5.83268 6.85939 5.88536 6.95316 5.97913C7.04693 6.0729 7.09961 6.20007 7.09961 6.33268V11.666C7.09788 11.7981 7.04465 11.9243 6.95125 12.0177C6.85786 12.1111 6.73168 12.1643 6.59961 12.166ZM8.59961 12.166C8.46754 12.1643 8.34136 12.1111 8.24797 12.0177C8.15457 11.9243 8.10134 11.7981 8.09961 11.666V6.33268C8.09961 6.20007 8.15229 6.0729 8.24606 5.97913C8.33982 5.88536 8.467 5.83268 8.59961 5.83268C8.73222 5.83268 8.85939 5.88536 8.95316 5.97913C9.04693 6.0729 9.09961 6.20007 9.09961 6.33268V11.666C9.09788 11.7981 9.04465 11.9243 8.95125 12.0177C8.85786 12.1111 8.73168 12.1643 8.59961 12.166Z" className="fill-current"/>
      </g>
    </svg>
  )
}

export default function Tour() {
  const { dashboardData, loading: dashboardLoading, error: dashboardError } = useBookingDashboard();
  const { me } = useMyProfile();

  // Get all bookings from dashboard data (not filtering by type)
  const allBookings = dashboardData?.recent_bookings || [];
  
  // Transform API data to match component structure
  const tourData = allBookings.map((booking, index) => ({
    id: booking.id,
    name: booking.package_name,
    image: booking.package_image || "/profile.png",
    bookingDate: new Date(booking.booking_date_time).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    amount: `$${booking.total_amount}`,
    status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
    type: booking.type
  }));

  // Get stats from dashboard data
  const stats = [
    {
      title: "Total bookings",
      count: dashboardData?.summary?.total_bookings || 0,
      iconPath: "/booking/tik.svg"
    },
    {
      title: "Completed Tours",
      count: dashboardData?.summary?.completed_stays || 0,
      iconPath: "/booking/bed.svg"
    },
    {
      title: "Total Spend",
      count: dashboardData?.summary?.total_spend?.toString() || "0",
      iconPath: "/booking/wallet.svg"
    },
    {
      title: "Upcoming Tours",
      count: dashboardData?.summary?.upcoming_stays || 0,
      iconPath: "/booking/tik.svg"
    }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 days' },
    { value: '15', label: 'Last 15 days' },
    { value: '30', label: 'Last 30 days' }
  ];
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | '7' | '15' | '30'>('all');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data by date
  const filteredData = tourData.filter((tour) => {
    if (selectedDateRange === 'all') return true;
    const bookingDate = new Date(tour.bookingDate);
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - parseInt(selectedDateRange));
    return bookingDate >= cutoffDate;
  });

  // Table columns
  const columns = [
    {
      label: 'Tour list',
      accessor: 'name',
      width: '200px',
      formatter: (_: string, row: any) => (
        <div className="flex items-center gap-2">
          <img 
            src={row.image} 
            alt={row.name} 
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/profile.png";
            }}
          />
          <span className="text-sm text-[#070707]">{row.name}</span>
        </div>
      )
    },
    { label: 'Booking Date', accessor: 'bookingDate', width: '140px' },
    { label: 'Booking amount', accessor: 'amount', width: '100px' },
    { label: 'Type', accessor: 'type', width: '100px' },
    {
      label: 'Status',
      accessor: 'status',
      width: '100px',
      formatter: (value: string) => <ApartmentStatuse value={value}/>
    },
    {
      label: 'Action',
      accessor: 'action',
      width: '100px',
      formatter: (_: any, row: any) => (
        <div className="flex items-center gap-4">
          <Link href={`/tour-history/${row?.id}`}
            className="text-sm text-[#777980] underline cursor-pointer hover:text-[#0068ef]"
          >
            View details
          </Link>
          <div className="w-4 h-4 relative overflow-hidden text-[#777980] hover:text-[#fe5050] transition-colors duration-200 cursor-pointer">
            <DeleteIcon />
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Stats Card Section */}
      <div className="p-4 md:p-6 bg-white rounded-xl mb-10">
        <div className="mb-6">
          <h1 className="md:text-3xl text-2xl font-medium text-[#070707]">Welcome, {me?.first_name || 'User'}!</h1>
          <p className="text-base text-[#777980]">Check up on your latest reservations and history.</p>
        </div>
        <div className="w-full bg-white rounded-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <TransStatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-4 md:p-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="text-2xl font-medium text-[#070707]">Tour reservation list</div>
            <div className="text-base text-[#777980]">Check up on your latest reservations.</div>
          </div>
          {/* Date Filter Dropdown */}
          <div className="relative flex justify-end w-full md:w-auto">
            <button
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-3 py-1.5 rounded border border-[#0068ef] flex items-center gap-3 cursor-pointer hover:bg-[#f5f5f5] justify-center md:justify-start"
            >
              <Image
                src="/booking/calender.svg"
                alt="Calendar"
                width={14}
                height={14}
              />
              <span className="text-[#0068ef] text-sm">
                {dateRanges.find(range => range.value === selectedDateRange)?.label}
              </span>
              <Image
                src="/vendor/down.svg"
                alt="Dropdown"
                width={14}
                height={14}
              />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute top-full left-0 md:right-0 mt-1 bg-white rounded-lg shadow-lg border py-1 z-10 w-full md:w-auto">
                {dateRanges.map((range) => (
                  <div
                    key={range.value}
                    onClick={() => {
                      setSelectedDateRange(range.value as 'all' | '7' | '15' | '30');
                      setIsDateDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-sm text-[#4a4c56]"
                  >
                    {range.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DynamicTableWithPagination
         loading={dashboardLoading}
         totalPages={1}
          columns={columns}
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          noDataMessage="No tours found."
        />
      </div>
    </>
  );
}
