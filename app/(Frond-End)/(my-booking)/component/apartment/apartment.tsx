import TransStatCard from '@/app/(Frond-End)/(vendor-profile)/component/transection/TransStatCard';
import Image from 'next/image';
import { useState } from 'react';
// Import your dynamic table component
import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable';
import Link from 'next/link';
import ApartmentStatuse from './ApartmentStatuse';



export default function Apartment() {
  const apartmentData = [
    {
      id: 1,
      name: "Eclipse Haven Apartment",
      image: "/profile.png",
      bookingDate: "Feb 6, 2022",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 2,
      name: "Lakeside Luxe Flats",
      image: "/profile.png",
      bookingDate: "April 16, 2022",
      amount: "$2999",
      status: "Canceled"
    },
    {
      id: 3,
      name: "The Sapphire Haven",
      image: "/profile.png",
      bookingDate: "May 22, 2023",
      amount: "$3559",
      status: "Completed"
    },
    {
      id: 4,
      name: "Summit View Apartments",
      image: "/profile.png",
      bookingDate: "Jun 5, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 5,
      name: "Aurora Heights",
      image: "/profile.png",
      bookingDate: "Sep 9, 2024",
      amount: "$2999",
      status: "Completed"
    },
    {
      id: 6,
      name: "Residential Haven",
      image: "/profile.png",
      bookingDate: "Jan 8, 2025",
      amount: "$2999",
      status: "Completed"
    }
  ];

  const stats = [
    {
      title: "Total bookings",
      count: 16,
      iconPath: "/booking/tik.svg"
    },
    {
      title: "Completed Stays",
      count: 14,
      iconPath: "/booking/bed.svg"
    },
    {
      title: "Total Spend",
      count: "14,526",
      iconPath: "/booking/wallet.svg"
    },
    {
      title: "Upcoming Stays",
      count: 2,
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
  const filteredData = apartmentData.filter((apartment) => {
    if (selectedDateRange === 'all') return true;
    const bookingDate = new Date(apartment.bookingDate);
    const today = new Date();
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - parseInt(selectedDateRange));
    return bookingDate >= cutoffDate;
  });

  // Table columns
  const columns = [
    {
      label: 'Apartment list',
      accessor: 'name',
      width: '200px',
      formatter: (_: string, row: any) => (
        <div className="flex items-center gap-2">
          <img src={row.image} alt={row.name} className="w-6 h-6 rounded-full" />
          <span className="text-xs text-[#070707]">{row.name}</span>
        </div>
      )
    },
    { label: 'Booking Date', accessor: 'bookingDate', width: '140px' },
    { label: 'Amount', accessor: 'amount', width: '100px' },
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
          <Link href={`/hotel-history/${row?.id}`}
            className="text-xs text-[#777980] underline cursor-pointer hover:text-[#0068ef]"
           
          >
            View details
          </Link>
          <Image
            src="/booking/delete.svg"
            alt="Delete"
            width={16}
            height={16}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      )
    }
  ];

  return (
    <>
      <div className="p-4 bg-white rounded-xl mb-10">
        <div className="mb-6">
          <h1 className="md:text-3xl text-2xl font-medium text-[#070707]">Welcome, Elisabeth!</h1>
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

      {/* ===================== Table Start ======================= */}
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
          columns={columns}
          data={filteredData}
          currentPage={currentPage}
          itemsPerPage={10}
          onPageChange={setCurrentPage}
          noDataMessage="No apartments found."
        />
      </div>
    </>
  );
}
