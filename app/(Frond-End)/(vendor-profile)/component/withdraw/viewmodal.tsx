'use client'
import {
  Dialog,
  DialogContent,
  DialogOverlay
} from '@/components/ui/dialog';

interface ViewModalProps {
  open: boolean;
  transaction: {
    date: string;
    transactionId: string;
    amount: string;
    status: 'Completed' | 'Processing' | 'Canceled';
  } | null;
  onClose: any;
}

export default function ViewModal({ open, transaction, onClose }: ViewModalProps) {
  if (!transaction) return null;

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
    } catch {
      return 'Invalid Date';
    }
  };

  const details = [
    { label: "Requested On", value: formatDate(transaction.date) },
    { label: "Transaction ID", value: transaction.transactionId },
    { label: "Payment Method", value: "Bank Transfer" },
    { label: "Account Number", value: "3897 2256 1900 3***" },
    { label: "Status", value: transaction.status, isStatus: true },
    { label: "Requested Amount", value: transaction.amount }
  ];

  const getStatusColor = (status: string) => {
    if (status === 'Completed') return 'text-[#299c46]';
    if (status === 'Processing') return 'text-[#ffa23a]';
    if (status === 'Canceled') return 'text-[#fe5050]';
    return 'text-[#4a4c56]';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="p-0 max-w-[90%] md:max-w-[536px] bg-transparent border-none shadow-none">
        <div className=" w-full p-4 md:px-6 pt-12 pb-8 bg-white rounded-3xl flex flex-col items-center gap-8 relative">
          <div className="w-full flex flex-col items-start gap-2">
            <h2 className="text-center text-[#070707] text-2xl md:text-[32px] font-medium leading-10 w-full">
              Withdraw Details
            </h2>
            <p className="text-center text-[#777980] text-base leading-normal w-full">
              Transaction ID: {transaction.transactionId}
            </p>
          </div>

          <div className="w-full p-4 rounded-xl outline  outline-[#f3f3f4] flex flex-col gap-4">
            <h3 className="text-[#070707] text-lg md:text-xl leading-[30px]">Withdrawal Details</h3>
            <div className="flex justify-between items-center w-full">
              <div className="flex-1 flex flex-col gap-5">
                {details.map((item) => (
                  <div className='flex items-center justify-between gap-2'>
                  <div key={item.label} className="text-[#777980] text-sm md:text-base leading-none">
                    {item.label}
                  </div>
 <div
                    key={item.label}
                    className={`${item.isStatus ? getStatusColor(item.value as string) : 'text-[#4a4c56]'} text-sm md:text-base leading-none`}
                  >
                    {item.value}
                  </div>
                  </div>

                ))}
              </div>
             
            </div>
          </div>

          <div className="w-full">
            <button
              onClick={onClose}
              className="w-full pl-5 pr-5 py-5 bg-[#d6ae29] rounded-[50px] outline  outline-[#d2d2d5] flex justify-center items-center cursor-pointer hover:bg-[#c19f25] transition-colors"
            >
              <span className="text-[#23262f] text-base font-medium">
                Close
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
