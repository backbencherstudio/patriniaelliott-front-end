'use client'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';



interface WithdrawFormData {
  amount: string
  note: string
}

export default function RequestPopup({ open, onClose }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WithdrawFormData>()

  const onSubmit = (data: WithdrawFormData) => {
    console.log(data)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent className="p-0 max-w-[90%] md:max-w-[550px] w-full bg-transparent border-none shadow-none">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 md:px-6 pt-12 pb-8 bg-white rounded-3xl flex flex-col items-center gap-8 relative w-full"
        >
          <div className="w-full flex flex-col gap-2">
            <div className="text-[#070707] text-[22px] md:text-[28px] font-medium leading-9">Withdraw Amount Request</div>
            <div className="text-[#777980] text-base">Available Balance: 20,500 USD</div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              <div className="text-[#070707] text-base">Enter Amount</div>
              <input
                type="text"
                {...register("amount", {
                  required: "Amount is required",
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Please enter a valid amount"
                  },
                  max: {
                    value: 20500,
                    message: "Amount cannot exceed available balance"
                  }
                })}
                placeholder="Enter amount in USD"
                className="px-5 py-4 rounded-lg outline-1 outline-[#e9e9ea] w-full text-[#4a4c56] text-sm focus:outline-[#0068ef] transition-colors"
              />
              {errors.amount && (
                <span className="text-red-500 text-xs">{errors.amount.message}</span>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="text-[#070707] text-base">Add Note</div>
              <textarea
                {...register("note", {
                  required: "Note is required",
                  minLength: {
                    value: 10,
                    message: "Note must be at least 10 characters"
                  }
                })}
                placeholder="Add a note for this withdrawal request"
                className="h-24 px-5 py-4 rounded-lg outline-1 outline-[#e9e9ea] w-full text-[#4a4c56] text-sm resize-none focus:outline-[#0068ef] transition-colors"
              />
              {errors.note && (
                <span className="text-red-500 text-xs">{errors.note.message}</span>
              )}
            </div>
          </div>

          <div className="w-full">
            <button
              aria-label="Send Withdraw Request"
              type="submit"
              className="w-full pl-5 pr-5 py-5 bg-[#d6ae29] rounded-[50px] outline outline-[#d2d2d5] text-center cursor-pointer hover:bg-[#c19f25] transition-colors"
            >
              <span className="text-[#23262f] text-base font-medium">Send Request</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
