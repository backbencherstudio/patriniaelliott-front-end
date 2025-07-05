'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import RequestPopup from './requestmodal'
import ViewModal from './viewmodal'

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

const statusStyles = {
  Completed: {
    bg: 'bg-[#38c976]/10',
    border: 'outline-[#abefc6]',
    text: 'text-[#067647]',
    icon: '/vendor/check.svg'
  },
  Processing: {
    bg: 'bg-[#ffa23a]/10',
    border: 'outline-[#ffa23a]',
    text: 'text-[#ffa23a]',
    icon: '/vendor/pending.svg'
  },
  Canceled: {
    bg: 'bg-[#fe5050]/10',
    border: 'outline-[#fe5050]',
    text: 'text-[#fe5050]',
    icon: '/vendor/redx.svg'
  }
};

const StatusBadge = ({ status }: { status: WithdrawData['status'] }) => {
  const style = statusStyles[status];

  return (
    <div className={`pl-1.5 pr-2 py-1.5 ${style.bg} rounded-2xl outline-1 outline-offset-[-1px] ${style.border} flex justify-start items-center gap-1`}>
      <div className="w-3 h-3 relative overflow-hidden">
        <Image 
          src={style.icon}
          alt={status}
          width={12}
          height={12}
        />
      </div>
      <div className={`text-center justify-start ${style.text} text-xs font-normal font-['Inter'] leading-3`}>{status}</div>
    </div>
  );
};

export default function Withdraw() {
  const [activeTab, setActiveTab] = useState<'All history' | 'Successful' | 'Pending' | 'Canceled'>('All history');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<WithdrawData | null>(null);
  
  const dateRanges = ['Last 30 days', 'Last 15 days', 'Last 7 days'];

  const getFilteredByDate = (transactions: typeof withdrawData) => {
    const today = new Date();
    const days = selectedDateRange === 'Last 30 days' 
      ? 30 
      : selectedDateRange === 'Last 15 days' 
      ? 15 
      : 7;

    // Calculate the cutoff date
    const cutoffDate = new Date(today);
    cutoffDate.setDate(today.getDate() - days);

    return transactions.filter(transaction => {
      // Parse the date string (DD-MM-YY format)
      const [day, month, year] = transaction.date.split('-').map(num => parseInt(num));
      const transactionDate = new Date(2000 + year, month - 1, day);

      // Compare if transaction date is after or equal to cutoff date
      return transactionDate >= cutoffDate;
    });
  };

  const filteredData = getFilteredByDate(
    withdrawData.filter(item => {
      switch (activeTab) {
        case 'Successful':
          return item.status === 'Completed';
        case 'Pending':
          return item.status === 'Processing';
        case 'Canceled':
          return item.status === 'Canceled';
        default:
          return true;
      }
    })
  );

  // For debugging purposes
  useEffect(() => {
    console.log('Selected Date Range:', selectedDateRange);
    console.log('Filtered Data:', filteredData);
  }, [selectedDateRange, filteredData]);

  const handleViewDetails = (transaction: WithdrawData) => {
    if (transaction) {
      setSelectedTransaction({ ...transaction });
      setShowViewModal(true);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedTransaction(null);
  };

  return (
    <>
    {showRequestModal && (
      <div 
        className="fixed inset-0 backdrop-blur-[2px] bg-gray-600/30 flex items-center justify-center z-50"
        onClick={() => setShowRequestModal(false)}
      >
        <div onClick={e => e.stopPropagation()}>
          <RequestPopup onClose={() => setShowRequestModal(false)} />
        </div>
      </div>
    )}
    {showViewModal && selectedTransaction && (
      <div 
        className="fixed inset-0 backdrop-blur-[2px] bg-gray-600/30 flex items-center justify-center z-50"
        onClick={handleCloseViewModal}
      >
        <div onClick={e => e.stopPropagation()}>
          <ViewModal 
            transaction={selectedTransaction}
            onClose={handleCloseViewModal} 
          />
        </div>
      </div>
    )}
    <div className="w-full inline-flex flex-col justify-start items-start gap-6">
      <div className="self-stretch inline-flex justify-start items-center gap-4">
        <div className="flex-1 self-stretch p-4 bg-white rounded-xl flex justify-start items-center gap-6">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-4">
            <div className="w-[214px] justify-center text-[#22262e] text-2xl font-medium font-['Inter'] leading-normal">Withdraw Balance</div>
            <div className="self-stretch justify-center text-[#777980] text-base font-normal font-['Inter'] leading-normal">Keep track of your latest withdrawn balances and stay updated on any pending transactions.</div>
          </div>
        </div>
        <div className="w-[286px] p-4 bg-white rounded-lg outline-1 outline-offset-[-1px] flex justify-start items-center gap-2.5">
          <div className="flex-1 inline-flex flex-col justify-center items-start gap-2.5">
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="w-[109px] justify-start text-[#070707] text-[28px] font-medium font-['Inter'] leading-9">$20,500</div>
              <div className="text-center justify-start text-[#777980] text-xs font-normal font-['Inter'] leading-3">Total balance</div>
            </div>
            <div 
              onClick={() => setShowRequestModal(true)}
              className="self-stretch px-8 py-3 bg-[#0068ef] rounded-lg inline-flex justify-center items-center gap-1.5 overflow-hidden cursor-pointer hover:bg-[#0056c7] transition-colors"
            >
              <div className="justify-start text-white text-base font-medium font-['Inter'] leading-none">Withdraw request</div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch p-4 bg-white rounded-xl flex flex-col justify-start items-start gap-6">
        <div className="self-stretch inline-flex justify-start items-center gap-4">
          <div className="flex-1 flex justify-start items-center">
            {['All history', 'Successful', 'Pending', 'Canceled'].map((tab) => (
              <div 
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-4 py-2 border-b-2 flex justify-center items-center gap-2.5 cursor-pointer ${
                  activeTab === tab 
                    ? 'border-[#d6ae29] text-[#070707]' 
                    : 'border-[#f3f3f4] text-[#777980]'
                }`}
              >
                <div className="justify-start text-base font-normal font-['Inter'] leading-none">{tab}</div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div 
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-3 py-1.5 rounded outline  outline-[#0068ef] flex items-center gap-3 cursor-pointer hover:bg-[#f5f5f5]"
            >
              <div className="flex justify-center items-center gap-1">
                <div className="w-3.5 h-3.5 relative overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/vendor/date.svg"
                    alt="Calendar"
                    width={14}
                    height={14}
                  />
                </div>
                <div className="text-[#0068ef] text-sm">{selectedDateRange}</div>
              </div>
              <div className="w-3.5 h-3.5 relative flex items-center justify-center">
                <Image 
                  src="/vendor/down.svg"
                  alt="Dropdown"
                  width={14}
                  height={14}
                />
              </div>
            </div>
            
            {isDateDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {dateRanges.map((range) => (
                  <div
                    key={range}
                    onClick={() => {
                      setSelectedDateRange(range);
                      setIsDateDropdownOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#f5f5f5] cursor-pointer text-sm text-[#4a4c56]"
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start">
          {/* Table Headers */}
          <div className="w-[148px] inline-flex flex-col justify-start items-start">
            <div className="self-stretch h-14 px-3 py-4 bg-neutral-50 rounded-tl-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Date</div>
            </div>
            {/* Date Column */}
            {filteredData.map((item, index) => (
              <div key={`date-${index}`} className="self-stretch px-3 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="justify-center text-[#777980] text-xs font-normal font-['Inter'] leading-3">{item.date}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start">
            <div className="self-stretch h-14 px-3 py-4 bg-neutral-50 rounded-tl-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Transaction ID</div>
            </div>
            {/* Transaction ID Column */}
            {filteredData.map((item, index) => (
              <div key={`txn-${index}`} className="self-stretch px-3 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="justify-center text-[#070707] text-xs font-normal font-['Inter'] leading-3">{item.transactionId}</div>
              </div>
            ))}
          </div>
          <div className="w-[150px] inline-flex flex-col justify-start items-start">
            <div className="self-stretch h-14 px-3 py-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Amount</div>
            </div>
            {/* Amount Column */}
            {filteredData.map((item, index) => (
              <div key={`amount-${index}`} className="self-stretch px-3 py-[22px] border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <div className="justify-center text-[#777980] text-xs font-normal font-['Inter'] leading-3">{item.amount}</div>
              </div>
            ))}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start">
            <div className="self-stretch h-14 px-3 py-4 bg-neutral-50 inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="flex-1 justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Status</div>
            </div>
            {/* Status Column */}
            {filteredData.map((item, index) => (
              <div key={`status-${index}`} className="self-stretch px-3 py-4 border-b border-[#eaecf0] inline-flex justify-start items-center gap-3 overflow-hidden">
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
          <div className="flex-1 inline-flex flex-col justify-start items-start">
            <div className="self-stretch h-14 px-3 py-4 bg-neutral-50 rounded-tr-xl inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <div className="justify-center text-[#4a4c56] text-sm font-normal font-['Inter'] leading-[14px]">Action</div>
            </div>
            {/* Action Column */}
            {filteredData.map((item, index) => (
              <div key={`action-${index}`} className="self-stretch px-3 py-5 border-b border-[#eaecf0] inline-flex justify-start items-center gap-8">
                <div 
                  onClick={() => handleViewDetails(item)}
                  className={`justify-center text-[#777980] hover:text-[#0068ef] text-xs font-normal font-['Inter'] underline leading-3 cursor-pointer`}
                >
                  View details
                </div>
                <div className="w-4 h-4 relative overflow-hidden cursor-pointer">
                  <Image 
                    src="/vendor/delete.svg"
                    alt="Delete"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
