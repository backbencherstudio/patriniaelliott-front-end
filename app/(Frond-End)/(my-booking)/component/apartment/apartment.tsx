import TransStatCard from '@/app/(Frond-End)/(vendor-profile)/component/transection/TransStatCard';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// Import your dynamic table component
import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable';
import Link from 'next/link';
import ApartmentStatuse from './ApartmentStatuse';
import { useBookingDashboard } from '@/hooks/useBookingDashboard';
import { useMyProfile } from '@/hooks/useMyProfile';



export default function Apartment() {
  const { dashboardData, loading: dashboardLoading, error: dashboardError } = useBookingDashboard();
  const { me } = useMyProfile();

  // Get all bookings from dashboard data
  const allBookings = dashboardData?.recent_bookings || [];
  
  // Filter bookings by apartment type
  const apartmentBookings = allBookings.filter(booking => 
    booking.type?.toLowerCase() === 'apartment'
  );
  
  // Transform API data to match component structure
  const apartmentData = apartmentBookings.map((booking, index) => ({
    id: booking.id,
    name: booking.package_name,
    image: booking.package_image || "/profile.png",
    bookingDate: new Date(booking.booking_date_time).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    bookingDateTime: new Date(booking.booking_date_time), // Keep original date for filtering
    amount: `$${booking.total_amount}`,
    status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
    type: booking.type
  }));

  // Calculate apartment-specific stats
  const apartmentStats = {
    totalBookings: apartmentBookings.length,
    completedStays: apartmentBookings.filter(booking => 
      booking.status?.toLowerCase() === 'completed' || booking.status?.toLowerCase() === 'approved'
    ).length,
    totalSpend: apartmentBookings.reduce((sum, booking) => sum + (Number(booking.total_amount) || 0), 0),
    upcomingStays: apartmentBookings.filter(booking => 
      booking.status?.toLowerCase() === 'pending'
    ).length
  };

  // Get stats from apartment-specific data
  const stats = [
    {
      title: "Total bookings",
      count: apartmentStats.totalBookings,
      iconPath: "/booking/tik.svg"
    },
    {
      title: "Completed Stays",
      count: apartmentStats.completedStays,
      iconPath: "/booking/bed.svg"
    },
    {
      title: "Total Spend",
      count: apartmentStats.totalSpend.toString(),
      iconPath: "/booking/wallet.svg"
    },
    {
      title: "Upcoming Stays",
      count: apartmentStats.upcomingStays,
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
  const itemsPerPage = 15;

  // Filter data by date
  const filteredData = apartmentData.filter((apartment) => {
    if (selectedDateRange === 'all') return true;
    const bookingDate = apartment.bookingDateTime; // Use the original date object
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - parseInt(selectedDateRange));
    return bookingDate >= cutoffDate;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    // Reset page to 1 when filters change
    setCurrentPage(1);
  }, [selectedDateRange]);

  useEffect(() => {
    // Clamp page when total pages change
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Table columns
  const columns = [
    {
      label: 'Apartment list',
      accessor: 'name',
      width: '200px',
      formatter: (_: string, row: any) => (
        <div className="flex items-center">
          <span className="text-sm text-[#070707]">{row.name}</span>
        </div>
      )
    },
    { label: 'Booking Date', accessor: 'bookingDate', width: '140px' },
    { label: 'Amount', accessor: 'amount', width: '100px' },
    { label: 'Type', accessor: 'type', width: '100px' },
    {
      label: 'Status',
      accessor: 'status',
      width: '100px',
      formatter: (value: string) => <ApartmentStatuse value={value}/>
    }
  ];

  return (
    <>
      <div className="p-4 bg-white rounded-xl mb-10">
        <div className="mb-6">
          <h1 className="md:text-3xl text-2xl font-medium text-[#070707]">Welcome, {me?.first_name || 'User'}!</h1>
          <p className="text-base text-[#777980]">Check up on your latest reservations and history.</p>
        </div>
        <div className="w-full bg-white rounded-xl p-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <TransStatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl p-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <div className="text-2xl font-medium text-[#070707]">Apartment reservation list</div>
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
          totalPages={totalPages}
          columns={columns}
          data={paginatedData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          noDataMessage="No apartments found."
        />
      </div>
    </>
  );
}
