'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
export default function RefundDetailsModal({ open, onClose, transaction }) {
  if (!transaction) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[400px] max-w-[90%] w-full !p-0 !pb-6 bg-white rounded-2xl shadow-lg border border-[#e5e7eb]">
        <div className="p-6">
          <div className="text-2xl font-semibold text-[#22262e] mb-1">Refund Details</div>
          <div className="text-sm text-[#777980] mb-4">Transaction ID: {transaction.transactionId}</div>
          <div className="bg-[#fafbfc] border rounded-lg p-4 mb-4">
            <div className="font-semibold text-lg mb-2">Tour Package Details</div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#777980]">Request Date</span>
              <span className="text-[#22262e]">{transaction.date}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#777980]">Guest Name</span>
              <span className="text-[#22262e]">{transaction.guestName || 'Elisabeth Sarah'}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#777980]">Refund Amount</span>
              <span className="text-[#22262e]">${transaction.amount?.replace('-', '')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#777980]">Refund Status</span>
              <span className="text-[#ff3b3b]">Canceled</span>
            </div>
          </div>
          <div className="bg-[#fff0f0] border border-[#ffd6d6] rounded-lg p-4">
            <div className="font-semibold text-[#ff3b3b] mb-1">Note</div>
            <div className="text-[#ff3b3b] text-sm">
              You requested a refund 5 days after booking, which is beyond the 48-hour window allowed by our policy.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}