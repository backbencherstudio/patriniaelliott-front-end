import React from 'react'
import Image from 'next/image'

const transactionData = [
  {
    date: '30-06-24',
    transactionId: 'TXN123456',
    type: 'Bookings',
    amount: '$250',
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    date: '16-08-24',
    transactionId: 'TXN143129',
    type: 'Withdrawal',
    amount: '-$900',
    paymentMethod: 'PayPal',
    status: 'Completed'
  },
  {
    date: '20-09-24',
    transactionId: 'TXN123116',
    type: 'Refund',
    amount: '-$100',
    paymentMethod: 'Stripe',
    status: 'Completed'
  },
  {
    date: '29-09-24',
    transactionId: 'TXN123330',
    type: 'Bookings',
    amount: '$400',
    paymentMethod: 'Bank Transfer',
    status: 'Completed'
  },
  {
    date: '18-01-25',
    transactionId: 'TXN123452',
    type: 'Bookings',
    amount: '$700',
    paymentMethod: 'Bank Transfer',
    status: 'Pending'
  },
  {
    date: '29-01-25',
    transactionId: 'TXN123154',
    type: 'Withdrawal',
    amount: '-$1,200',
    paymentMethod: 'PayPal',
    status: 'Failed'
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
      <div className={`inline-flex items-center gap-1 pl-1.5 pr-2 py-1.5 ${style.bg} rounded-2xl outline outline-1 outline-offset-[-1px] ${style.border}`}>
        <div className="w-3 h-3 flex items-center justify-center">
          <Image src={style.icon} alt={status} width={12} height={12} />
        </div>
        <div className={`${style.text} text-xs`}>{status}</div>
      </div>
    </div>
  )
}

export default function TransectionHistory() {
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
          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/tik.svg" alt="Total Bookings" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">45 transactions</div>
              <div className="text-[#777980] text-xs">Total Bookings</div>
            </div>
          </div>

          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/totalearn.svg" alt="Total Earnings" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">$18,000</div>
              <div className="text-[#777980] text-xs">Total Earnings</div>
            </div>
          </div>

          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
              <Image src="/vendor/withdrawn.svg" alt="Withdrawn" width={24} height={24} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-[#070707] text-base font-medium">$2700</div>
              <div className="text-[#777980] text-xs">Withdrawn</div>
            </div>
          </div>

          <div className="w-[228px] p-6 bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] flex items-center gap-2.5">
            <div className="w-9 h-9 p-[3px] bg-[#d6ae29] rounded-md outline outline-[1.12px] outline-offset-[-1.12px] flex items-center justify-center">
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
            <div className="px-4 py-2 border-b-2 border-[#d6ae29]">
              <div className="text-[#070707] text-base">All transactions</div>
            </div>
            <div className="px-4 py-2 border-b border-[#f3f3f4]">
              <div className="text-[#777980] text-base">Bookings</div>
            </div>
            <div className="px-4 py-2 border-b border-[#f3f3f4]">
              <div className="text-[#777980] text-base">Refunds</div>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded outline outline-1 outline-[#0068ef] flex items-center gap-3">
            <div className="text-[#0068ef] text-sm">Last 30 days</div>
            <div className="w-3.5 h-3.5">
              <Image src="/vendor/down.svg" alt="Dropdown" width={14} height={14} />
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Date Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50 rounded-tl-xl">
              <div className="text-[#4a4c56] text-sm">Date</div>
            </div>
            {transactionData.map((item, i) => (
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
            {transactionData.map((item, i) => (
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
            {transactionData.map((item, i) => (
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
            {transactionData.map((item, i) => (
              <div key={`amount-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className="text-[#777980] text-xs">{item.amount}</div>
              </div>
            ))}
          </div>

          {/* Payment Method Column */}
          <div className="flex-1 flex flex-col">
            <div className="h-14 px-2 py-4 bg-neutral-50">
              <div className="w-[121px] text-[#4a4c56] text-sm">Payment Method</div>
            </div>
            {transactionData.map((item, i) => (
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
            {transactionData.map((item, i) => (
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
            {transactionData.map((_, i) => (
              <div key={`action-${i}`} className="px-2 py-[22px] border-b border-[#eaecf0]">
                <div className={`${i === 0 ? 'text-[#0068ef]' : 'text-[#777980]'} text-xs underline`}>
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
