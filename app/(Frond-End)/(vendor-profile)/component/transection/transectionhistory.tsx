'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

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

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    Completed: {
      bg: 'bg-[#38c976]/10',
      border: 'outline-[#abefc6]',
      text: 'text-[#067647]',
      icon: '/vendor/check.svg'
    },
    Pending: {
      bg: 'bg-[#ffa23a]/10',
      border: 'outline-[#ffa23a]',
      text: 'text-[#ffa23a]',
      icon: '/vendor/pending.svg'
    },
    Failed: {
      bg: 'bg-[#fe5050]/10',
      border: 'outline-[#fe5050]',
      text: 'text-[#fe5050]',
      icon: '/vendor/redx.svg'
    }
  }

  const style = statusConfig[status as keyof typeof statusConfig]

  return (
    <div className="flex">
      <div className={`inline-flex items-center gap-1 pl-1.5 pr-2 py-1.5 ${style.bg} rounded-2xl outline-offset-[-1px] ${style.border}`}>
        <div className="w-3 h-3 flex items-center justify-center">
          <Image src={style.icon} alt={status} width={12} height={12} />
        </div>
        <div className={`${style.text} text-xs`}>{status}</div>
      </div>
    </div>
  )
}

export default function TransectionHistory() {
  const [activeTab, setActiveTab] = useState('All transactions')
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days')
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false)
  
  const tabs = ['All transactions', 'Bookings', 'Refunds']
  const dateRanges = ['Last 30 days', 'Last 15 days', 'Last 7 days']

  const getFilteredByDate = (transactions: typeof transactionData) => {
    const today = new Date()
    const days = selectedDateRange === 'Last 30 days' 
      ? 30 
      : selectedDateRange === 'Last 15 days' 
      ? 15 
      : 7

    // Calculate the cutoff date
    const cutoffDate = new Date(today)
    cutoffDate.setDate(today.getDate() - days)

    return transactions.filter(transaction => {
      // Parse the date string (DD-MM-YY format)
      const [day, month, year] = transaction.date.split('-').map(num => parseInt(num))
      const transactionDate = new Date(2000 + year, month - 1, day)

      // Compare if transaction date is after or equal to cutoff date
      return transactionDate >= cutoffDate
    })
  }
  
  const filteredTransactions = getFilteredByDate(
    transactionData.filter(transaction => {
      switch (activeTab) {
        case 'All transactions':
          return true;
        case 'Bookings':
          return transaction.status === 'Completed';
        case 'Refunds':
          return transaction.status === 'Failed';
        default:
          return true;
      }
    })
  )

  // For debugging purposes, let's add a console log
  useEffect(() => {
    console.log('Selected Date Range:', selectedDateRange)
    console.log('Filtered Transactions:', filteredTransactions)
  }, [selectedDateRange, filteredTransactions])

  const getTabStats = () => {
    const stats = {
      'All transactions': transactionData.length,
      'Bookings': transactionData.filter(t => t.status === 'Completed').length,
      'Refunds': transactionData.filter(t => t.status === 'Failed').length
    }
    return stats
  }

  const tabStats = getTabStats()

  return (
    <div className="flex flex-col gap-4">
      {/* Stats Section */}
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="h-16 flex flex-col gap-4">
            <div className="w-[214px] text-[#22262e] text-2xl font-medium whitespace-nowrap">Transaction history</div>
            <div className="text-[#777980] text-base tracking-tight">Check up on your overall transaction history.</div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/tik.svg" alt="Total Bookings" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">45 transactions</div>
              <div className="text-[#777980] text-xs">Total Bookings</div>
            </div>
          </div>

          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/totalearn.svg" alt="Total Earnings" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">$18,000</div>
              <div className="text-[#777980] text-xs">Total Earnings</div>
            </div>
          </div>

          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/withdrawn.svg" alt="Withdrawn" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">$2700</div>
              <div className="text-[#777980] text-xs">Withdrawn</div>
            </div>
          </div>

          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/refunds.svg" alt="Refunds" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">$200</div>
              <div className="text-[#777980] text-xs">Refunds Issued</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-b ${
                  activeTab === tab
                    ? 'border-b-2 border-[#d6ae29]'
                    : 'border-[#f3f3f4]'
                } cursor-pointer`}
              >
                <div
                  className={`text-base ${
                    activeTab === tab ? 'text-[#070707]' : 'text-[#777980]'
                  }`}
                >
                  {tab} ({tabStats[tab as keyof typeof tabStats]})
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div 
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
              className="px-3 py-1.5 rounded outline-1 outline-[#0068ef] flex items-center gap-3 cursor-pointer hover:bg-[#f5f5f5]"
            >
              <div className="text-[#0068ef] text-sm">{selectedDateRange}</div>
              <div className="w-3.5 h-3.5">
                <Image src="/vendor/down.svg" alt="Dropdown" width={14} height={14} />
              </div>
            </div>
            
            {isDateDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                {dateRanges.map((range) => (
                  <div
                    key={range}
                    onClick={() => {
                      setSelectedDateRange(range)
                      setIsDateDropdownOpen(false)
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

        <div className="flex">
          {/* Date Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50 rounded-tl-xl">
              <div className="text-[#4a4c56] text-sm">Date</div>
            </div>
            {filteredTransactions.map((item, i) => (
              <div key={`date-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs">{item.date}</div>
              </div>
            ))}
          </div>

          {/* Transaction ID Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50">
              <div className="text-[#4a4c56] text-sm">Transaction ID</div>
            </div>
            {filteredTransactions.map((item, i) => (
              <div key={`id-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs">{item.transactionId}</div>
              </div>
            ))}
          </div>

          {/* Type Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50">
              <div className="text-[#4a4c56] text-sm">Type</div>
            </div>
            {filteredTransactions.map((item, i) => (
              <div key={`type-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs">{item.type}</div>
              </div>
            ))}
          </div>

          {/* Amount Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50">
              <div className="text-[#4a4c56] text-sm">Amount</div>
            </div>
            {filteredTransactions.map((item, i) => (
              <div key={`amount-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs">{item.amount}</div>
              </div>
            ))}
          </div>

          {/* Payment Method Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50">
              <div className="text-[#4a4c56] text-sm">Payment Method</div>
            </div>
            {filteredTransactions.map((item, i) => (
              <div key={`payment-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs">{item.paymentMethod}</div>
              </div>
            ))}
          </div>

          {/* Status Column */}
          <div className="w-[140px] flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50">
              <div className="text-[#4a4c56] text-sm">Status</div>
            </div>
            {filteredTransactions.map((item, i) => (
              <div key={`status-${i}`} className="px-2 py-4 border-b border-[#eaecf0]">
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>

          {/* Action Column */}
          <div className="w-[120px] flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50 rounded-tr-xl">
              <div className="text-[#4a4c56] text-sm">Action</div>
            </div>
            {filteredTransactions.map((_, i) => (
              <div key={`action-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs underline cursor-pointer hover:text-[#0068ef]">
                  View details
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
