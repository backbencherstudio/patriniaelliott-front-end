'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function RefundDetailsModal({ open, onClose, transaction }) {
  if (!transaction) return null;

  const tx = transaction || {}
  const txId = tx.id || tx.transactionId || '-'
  const createdAt = tx.created_at ? new Date(tx.created_at).toLocaleString() : (tx.date || '-')
  const userName = tx.user?.name || tx.guestName || '-'
  const amount = tx.amount ? `$${tx.amount}`.replace('--', '-') : (tx.amount?.replace?.('-', '') ? `$${tx.amount.replace('-', '')}` : '$0')
  const status = (tx.status || '-').toLowerCase()
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

  const colorMap: any = {
    canceled: { pill: 'bg-[#ffe8e8] text-[#ff3b3b]', noteBox: 'bg-[#fff0f0] border-[#ffd6d6] text-[#ff3b3b]' },
    failed:   { pill: 'bg-[#ffe8e8] text-[#ff3b3b]', noteBox: 'bg-[#fff0f0] border-[#ffd6d6] text-[#ff3b3b]' },
    approved: { pill: 'bg-[#eaf8f0] text-[#067647]', noteBox: 'bg-[#eaf8f0] border-[#c9f0d8] text-[#067647]' },
    succeeded:{ pill: 'bg-[#eaf8f0] text-[#067647]', noteBox: 'bg-[#eaf8f0] border-[#c9f0d8] text-[#067647]' },
    pending:  { pill: 'bg-[#fff7e7] text-[#ffa23a]', noteBox: 'bg-[#fff7e7] border-[#ffe2b8] text-[#ffa23a]' },
  }
  const colors = colorMap[status] || colorMap.pending

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[460px] max-w-[90%] w-full !p-0 !pb-6 bg-white rounded-2xl shadow-lg border border-[#e5e7eb]">
        <div className="p-6">
          <div className="text-2xl font-semibold text-[#22262e] mb-1">Refund Details</div>
          <div className="text-sm text-[#777980] mb-4">Transaction ID: {txId}</div>

          <div className="bg-[#fafbfc] border rounded-lg p-4 mb-4">
            <div className="font-semibold text-lg mb-2">Transaction</div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#777980]">Request Date</span>
              <span className="text-[#22262e]">{createdAt}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#777980]">Guest Name</span>
              <span className="text-[#22262e]">{userName}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#777980]">Refund Amount</span>
              <span className="text-[#22262e]">{amount}</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-[#777980]">Refund Status</span>
              <span className={`px-2 py-1 rounded ${colors.pill}`}>{statusLabel}</span>
            </div>
          </div>

          <div className={`border rounded-lg p-4 ${colors.noteBox.replace('text', 'border').replace('bg', 'border')} ${colors.noteBox}`}>
            <div className={`font-semibold mb-1 ${colors.noteBox.split(' ').find(c=>c.startsWith('text-'))}`}>Note</div>
            <div className={`text-sm ${colors.noteBox.split(' ').find(c=>c.startsWith('text-'))}`}>
              {tx.refund_reason ?? 'No additional refund reason provided.'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}