'use client'
import DynamicTableWithPagination from '@/app/(Admin-Dashboard)/_component/common/DynamicTable'
import Image from 'next/image'
import { useState } from 'react'

import InvoiceModal from './InvoiceModal'
import TransStatCard from './TransStatCard'
import TransStatuse from './TransStatuse'

const transactionData = [
  {
    date: '15-05-25',
    transactionId: 'TXN789001',
    type: 'Bookings',
    amount: '$350',
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    date: '14-05-25',
    transactionId: 'TXN789002',
    type: 'Withdrawal',
    amount: '-$800',
    paymentMethod: 'PayPal',
    status: 'Pending'
  },
  {
    date: '12-05-25',
    transactionId: 'TXN789003',
    type: 'Bookings',
    amount: '$275',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    date: '10-05-25',
    transactionId: 'TXN789004',
    type: 'Refund',
    amount: '-$150',
    paymentMethod: 'Credit Card',
    status: 'Failed'
  },
  {
    date: '08-05-25',
    transactionId: 'TXN789005',
    type: 'Bookings',
    amount: '$420',
    paymentMethod: 'Stripe',
    status: 'Completed'
  },
  {
    date: '07-05-25',
    transactionId: 'TXN789006',
    type: 'Withdrawal',
    amount: '-$600',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    date: '06-05-25',
    transactionId: 'TXN789007',
    type: 'Bookings',
    amount: '$550',
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    date: '05-05-25',
    transactionId: 'TXN789008',
    type: 'Refund',
    amount: '-$200',
    paymentMethod: 'PayPal',
    status: 'Completed'
  },
  {
    date: '04-05-25',
    transactionId: 'TXN789009',
    type: 'Bookings',
    amount: '$380',
    paymentMethod: 'Stripe',
    status: 'Pending'
  },
  {
    date: '03-05-25',
    transactionId: 'TXN789010',
    type: 'Bookings',
    amount: '$290',
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    date: '02-05-25',
    transactionId: 'TXN789011',
    type: 'Withdrawal',
    amount: '-$750',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    date: '02-05-25',
    transactionId: 'TXN789012',
    type: 'Bookings',
    amount: '$480',
    paymentMethod: 'PayPal',
    status: 'Completed'
  },
  {
    date: '01-05-25',
    transactionId: 'TXN789013',
    type: 'Refund',
    amount: '-$175',
    paymentMethod: 'Credit Card',
    status: 'Failed'
  },
  {
    date: '01-05-25',
    transactionId: 'TXN789014',
    type: 'Bookings',
    amount: '$320',
    paymentMethod: 'Stripe',
    status: 'Completed'
  },
  {
    date: '01-05-25',
    transactionId: 'TXN789015',
    type: 'Bookings',
    amount: '$395',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  }
]



export default function TransectionHistory() {
  const [activeTab, setActiveTab] = useState<'All transactions' | 'Bookings' | 'Refunds'>('All transactions')
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | '7' | '15' | '30'>('all')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showInvoice, setShowInvoice] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 days' },
    { value: '15', label: 'Last 15 days' },
    { value: '30', label: 'Last 30 days' }
  ]

  const filteredTransactions = transactionData.filter((transaction) => {
    const statusMatch = activeTab === 'All transactions' ||
      (activeTab === 'Bookings' && transaction.status === 'Completed') ||
      (activeTab === 'Refunds' && transaction.status === 'Failed');

    let dateMatch = true;
    if (selectedDateRange !== 'all') {
      const [day, month, year] = transaction.date.split('-').map(num => parseInt(num));
      const transactionDate = new Date(2000 + year, month - 1, day);
      const today = new Date();
      const cutoffDate = new Date(today);
      cutoffDate.setDate(today.getDate() - parseInt(selectedDateRange));
      dateMatch = transactionDate >= cutoffDate;
    }

    return statusMatch && dateMatch;
  });

  const stats = [
    { title: "Total Bookings", count: "45 transactions", iconPath: "/vendor/tik.svg" },
    { title: "Total Earnings", count: 18000, iconPath: "/vendor/totalearn.svg" },
    { title: "Withdrawn", count: 2700, iconPath: "/vendor/withdrawn.svg" },
    { title: "Refunds Issued", count: 200, iconPath: "/vendor/refunds.svg" },
  ];

  const columns = [
    { label: 'Date', accessor: 'date', width: '120px' },
    { label: 'Transaction ID', accessor: 'transactionId', width: '180px' },
    { label: 'Type', accessor: 'type', width: '120px' },
    { label: 'Amount', accessor: 'amount', width: '100px' },
    { label: 'Payment Method', accessor: 'paymentMethod', width: '140px' },
    {
      label: 'Status',
      accessor: 'status',
      width: '120px',
      formatter: (value: string) => <TransStatuse status={value} />
    },
    {
      label: 'Action',
      accessor: 'action',
      width: '120px',
      formatter: (_: any, row: any) => (
        <button
          className="text-[#0068ef] underline text-xs hover:text-[#0051bd]"
          onClick={() => {
            setSelectedTransaction(row);
            setShowInvoice(true);
          }}
        >
          View details
        </button>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Overview */}
      <div className="w-full bg-white rounded-xl p-4 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="">
            <h2 className="text-2xl font-medium text-[#22262e] mb-1">Transaction History</h2>
            <p className="text-base text-[#777980]">
              Check up on your overall transaction history and stay updated on all your financial activities.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-white rounded-xl p-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <TransStatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {['All transactions', 'Bookings', 'Refunds'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-2 md:px-4 py-2 border-b-2 cursor-pointer text-sm md:text-base ${activeTab === tab
                  ? 'border-[#d6ae29] text-[#070707]'
                  : 'border-[#f3f3f4] text-[#777980]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <div
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-3 py-1.5 rounded border border-[#0068ef] flex items-center gap-3 cursor-pointer hover:bg-[#f5f5f5] justify-center md:justify-start"
            >
              <Image
                src="/vendor/date.svg"
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
            </div>

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

        <div className="overflow-x-auto">
          <DynamicTableWithPagination
            columns={columns}
            data={filteredTransactions}
            currentPage={currentPage}
            itemsPerPage={10}
            onPageChange={(page) => setCurrentPage(page)}
            noDataMessage="No transactions found."
          />
        </div>
      </div>

    {showInvoice && <InvoiceModal
        open={showInvoice}
        onClose={setShowInvoice}
        transaction={selectedTransaction}
      />}
    </div>
  )
}
