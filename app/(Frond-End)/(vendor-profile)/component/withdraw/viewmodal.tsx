'use client'
import React from 'react'
import { X } from 'lucide-react'

interface ViewModalProps {
  transaction: {
    date: string;
    transactionId: string;
    amount: string;
    status: 'Completed' | 'Processing' | 'Canceled';
  };
  onClose: () => void;
}

export default function ViewModal({ transaction, onClose }: ViewModalProps) {
  if (!transaction) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    try {
      const [day, month, year] = dateStr.split('-').map(num => num || '0');
      const date = new Date(2000 + parseInt(year || '0'), parseInt(month || '1') - 1, parseInt(day || '1'));
      return date.toLocaleString('en-US', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const details = [
    { label: "Requested On", value: formatDate(transaction?.date || '') },
    { label: "Transaction ID", value: transaction?.transactionId || 'N/A' },
    { label: "Payment Method", value: "Bank Transfer" },
    { label: "Account Number", value: "3897 2256 1900 3***" },
    { label: "Status", value: transaction?.status || 'N/A', isStatus: true },
    { label: "Requested Amount", value: transaction?.amount || 'N/A' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-[#299c46]';
      case 'Processing':
        return 'text-[#ffa23a]';
      case 'Canceled':
        return 'text-[#fe5050]';
      default:
        return 'text-[#4a4c56]';
    }
  };

  return (
    <div className="w-[536px] px-6 pt-12 pb-8 relative bg-white rounded-3xl inline-flex flex-col justify-center items-center gap-8">
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <h2 className="text-center text-[#070707] text-[32px] font-medium leading-10">
          Withdraw Details
        </h2>
        <p className="text-center text-[#777980] text-base leading-normal">
          Transaction ID: {transaction?.transactionId || 'N/A'}
        </p>
      </div>

      <div className="self-stretch p-4 rounded-xl outline-1 outline-offset-[-1px] outline-[#f3f3f4] flex flex-col justify-start items-start gap-4">
        <h3 className="text-[#070707] text-xl leading-[30px]">
          Withdrawal Details
        </h3>
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-5">
            {details.map((item) => (
              <div key={item.label} className="text-[#777980] text-base leading-none">
                {item.label}
              </div>
            ))}
          </div>
          <div className="w-[252px] inline-flex flex-col justify-center items-end gap-5">
            {details.map((item) => (
              <div 
                key={item.label} 
                className={`${item.isStatus ? getStatusColor(item.value as string) : 'text-[#4a4c56]'} text-base leading-none`}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="self-stretch">
        <button 
          onClick={onClose}
          className="w-full pl-5 pr-[19px] py-5 bg-[#d6ae29] rounded-[50px] outline-1 outline-[#d2d2d5] flex justify-center items-center cursor-pointer hover:bg-[#c19f25] transition-colors"
        >
          <span className="text-[#23262f] text-base font-medium">
            Close
          </span>
        </button>
      </div>

      <button 
        onClick={onClose}
        className="absolute right-6 top-6 p-2 bg-[#e9e9ea] hover:bg-[#d1d1d2] rounded-full transition-colors cursor-pointer"
      >
        <X className="h-5 w-5 text-[#09080d]" />
      </button>
    </div>
  )
}
