'use client'
import Image from 'next/image'
import { useState } from 'react'
import DynamicTableWithPagination from '../../../../(Admin-Dashboard)/_component/common/DynamicTable'
import RequestPopup from './requestmodal'
import ViewModal from './viewmodal'
import WithdrawAction from './WithdrawAction'
import { WithdrawStatusBadge } from './WithdrawStatusBadge'

interface WithdrawData {
  date: string;
  transactionId: string;
  amount: string;
  status: 'Completed' | 'Processing' | 'Canceled';
}

const withdrawData: WithdrawData[] = [
  {
    date: '30-05-25',
    transactionId: 'TXN123456',
    amount: '$2779',
    status: 'Completed'
  },
  {
    date: '25-05-25',
    transactionId: 'TXN143129',
    amount: '$1,500',
    status: 'Completed'
  },
  {
    date: '20-05-25',
    transactionId: 'TXN123116',
    amount: '$2,500',
    status: 'Completed'
  },
  {
    date: '15-05-25',
    transactionId: 'TXN123330',
    amount: '$2577',
    status: 'Processing'
  },
  {
    date: '12-05-25',
    transactionId: 'TXN123452',
    amount: '$1,200',
    status: 'Processing'
  },
  {
    date: '10-05-25',
    transactionId: 'TXN123154',
    amount: '$3299',
    status: 'Canceled'
  },
  {
    date: '05-05-25',
    transactionId: 'TXN123155',
    amount: '$1,800',
    status: 'Canceled'
  },
  {
    date: '01-05-25',
    transactionId: 'TXN123156',
    amount: '$2,100',
    status: 'Processing'
  }
];

interface RequestPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function Withdraw() {
  const [activeTab, setActiveTab] = useState<'All history' | 'Successful' | 'Pending' | 'Canceled'>('All history');
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | '7' | '15' | '30'>('all');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<WithdrawData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '7', label: 'Last 7 days' },
    { value: '15', label: 'Last 15 days' },
    { value: '30', label: 'Last 30 days' }
  ];

  const filteredData = withdrawData.filter((transaction) => {
    // Status filter
    const statusMatch = activeTab === 'All history' ||
      (activeTab === 'Successful' && transaction.status === 'Completed') ||
      (activeTab === 'Pending' && transaction.status === 'Processing') ||
      (activeTab === 'Canceled' && transaction.status === 'Canceled');

    // Date filter
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

  const handleViewDetails = (transaction: WithdrawData) => {
    if (transaction) {
      setSelectedTransaction({ ...transaction });
      setShowViewModal(true);
    }
  };

  const handleDeleteTransaction = (transactionId: string) => {
    // Handle delete logic here
    console.log('Delete transaction:', transactionId);
  };

  const columns = [
    { label: "Date", accessor: "date", width: "148px" },
    { label: "Transaction ID", accessor: "transactionId", width: "218px" },
    { label: "Amount", accessor: "amount", width: "150px" },
    {
      label: "Status",
      accessor: "status",
      width: "200px",
      formatter: (_, row) => <WithdrawStatusBadge status={row.status} />
    },
    {
      label: "Action",
      accessor: "transactionId",
      width: "200px",
      formatter: (_, row) => (
        <WithdrawAction
          onView={handleViewDetails}
          onDelete={handleDeleteTransaction}
          transaction={row}
        />
      )
    }
  ];

  return (
    <>
      {showRequestModal && (
        <RequestPopup open={showRequestModal} onClose={setShowRequestModal} />
      )}
      {showViewModal &&
        <ViewModal
          transaction={selectedTransaction}
          open={showViewModal}
          onClose={setShowViewModal}
        />}
      <div className="flex flex-col gap-5">
        {/* Overview */}
        <div className="w-full bg-white rounded-xl p-4 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="">
              <h2 className="text-2xl font-medium text-[#22262e] mb-1">Withdraw Balance</h2>
              <p className="text-base text-[#777980]">
                Keep track of your latest withdrawn balances and stay updated on any pending transactions.
              </p>
            </div>
            <div className="w-full lg:w-[286px] p-4 bg-white rounded-lg border flex flex-col gap-2.5">
              <div className="flex flex-col gap-2">
                <div className="text-[28px] font-medium text-[#070707]">$20,500</div>
                <div className="text-xs text-[#777980]">Total balance</div>
              </div>
              <button
                onClick={() => setShowRequestModal(true)}
                className="px-8 py-3 bg-[#0068ef] rounded-lg text-white font-medium hover:bg-[#0056c7] transition-colors"
              >
                Withdraw request
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full bg-white rounded-xl p-3 md:p-4 max-w-screen-lg mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              {['All history', 'Successful', 'Pending', 'Canceled'].map((tab) => (
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

            {/* Date Range Dropdown */}
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

          {/* Table */}
          <div className="overflow-x-auto">
            <DynamicTableWithPagination
              columns={columns}
              data={filteredData}
              currentPage={currentPage}
              itemsPerPage={10}
              onPageChange={(page) => setCurrentPage(page)}
              noDataMessage="No withdraw transactions found."
            />
          </div>
        </div>
      </div>
    </>
  )
}
