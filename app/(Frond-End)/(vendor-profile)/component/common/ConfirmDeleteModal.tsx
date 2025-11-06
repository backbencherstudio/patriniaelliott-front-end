'use client'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import AsyncButton from '@/components/reusable/AsyncButton'

interface ConfirmDeleteModalProps {
  open: boolean
  title?: string
  message?: string
  onConfirm: () => Promise<void> | void
  onClose: (open: boolean) => void
  loading?: boolean
}

export default function ConfirmDeleteModal({ open, onClose, onConfirm, title = 'Delete item', message = 'Are you sure you want to delete this item? This action cannot be undone.', loading }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-transparent border-0 p-0">
        <div className="fixed inset-0 backdrop-blur-[2px] bg-black/20" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-lg font-semibold text-[#22262e]">{title}</h3>
            </div>
            <div className="p-5 text-[#4a4c56] text-sm">{message}</div>
            <div className="p-5 pt-0 flex justify-end gap-3">
              <button aria-label="Cancel Delete" onClick={()=>onClose(false)} className="px-4 py-2 rounded border">Cancel</button>
              <AsyncButton
                aria-label="Confirm Delete"
                onClick={() => onConfirm()}
                className="px-5 py-2 rounded bg-[#fe5050] text-white hover:bg-[#e04848] disabled:opacity-60"
                loadingText="Deleting..."
                disabled={!!loading}
              >
                Delete
              </AsyncButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

