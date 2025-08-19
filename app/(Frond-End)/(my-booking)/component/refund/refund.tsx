"use client"
import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable'
import { useState } from 'react'
import RefundStatuse from './RefundStatuse'

const refundData = [
  {
    id: 1,
    hotelName: "The Hay-Adams",
    price: "$2000",
    date: "31/12/2024",
    status: "processing",
    refundAmount: "$999",
    image: "/profile.png"
  },
  {
    id: 2,
    hotelName: "The Montage Deer",
    price: "$3500",
    date: "01/01/2025",
    status: "canceled",
    refundAmount: "$699",
    image: "/profile.png"
  },
  {
    id: 3,
    hotelName: "The Jefferson",
    price: "$3500",
    date: "02/01/2025",
    status: "completed",
    refundAmount: "$499",
    image: "/profile.png"
  },
  {
    id: 4,
    hotelName: "The Wigwam Motel",
    price: "$4999",
    date: "02/01/2025",
    status: "completed",
    refundAmount: "$599",
    image: "/profile.png"
  },
  {
    id: 5,
    hotelName: "The Madonna Inn",
    price: "$3500",
    date: "12/01/2025",
    status: "completed",
    refundAmount: "$599",
    image: "/profile.png"
  }
]

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'processing':
      return {
        bg: 'bg-[#ffa23a]/10',
        text: 'text-[#ffa23a]',
        icon: '/booking/processing.svg'
      }
    case 'canceled':
      return {
        bg: 'bg-[#fe5050]/10',
        text: 'text-[#fe5050]',
        icon: '/booking/redx.svg'
      }
    case 'completed':
      return {
        bg: 'bg-[#ecfcf2]',
        text: 'text-[#057647]',
        icon: '/booking/check.svg'
      }
    default:
      return {
        bg: 'bg-[#ecfcf2]',
        text: 'text-[#057647]',
        icon: '/booking/check.svg'
      }
  }
}

export default function Refund() {
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      label: 'Hotel/Tour name',
      accessor: 'hotelName',
      width: '200px',
      formatter: (_: string, row: any) => (
        <div className="flex items-center gap-2">
          <img src={row.image} alt={row.hotelName} className="w-6 h-6 rounded-full" />
          <span className="text-sm text-[#070707]">{row.hotelName}</span>
        </div>
      )
    },
    { label: 'Price', accessor: 'price', width: '100px' },
    { label: 'Time & Date', accessor: 'date', width: '120px' },
    {
      label: 'Status',
      accessor: 'status',
      width: '120px',
      formatter: (value: string) => <RefundStatuse value={value}/>
    },
    { label: 'Refund Amount', accessor: 'refundAmount', width: '120px' }
  ];

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 mx-auto">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-medium text-[#070707]">Refund user</h2>
        <p className="text-base text-[#777980]">Check up on your latest refund history.</p>
      </div>
      <DynamicTableWithPagination
        columns={columns}
        data={refundData}
        currentPage={currentPage}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        noDataMessage="No refunds found."
      />
    </div>
  )
}
