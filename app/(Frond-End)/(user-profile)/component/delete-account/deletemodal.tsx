'use client'
import React from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface DeleteModalProps {
  onClose: () => void;
}

interface DeleteFormInputs {
  password: string;
  feedback: string;
}

export default function DeleteModal({ onClose }: DeleteModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DeleteFormInputs>();

  const onSubmit = (data: DeleteFormInputs) => {
    console.log('Form data:', data);
    // Here you can add your delete account logic
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
      onClick={handleBackdropClick}
    >
      <div className="w-[461px] p-6 bg-white rounded-xl flex flex-col gap-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 bg-[#e9e9ea] hover:bg-[#d1d1d2] rounded-full transition-colors cursor-pointer"
        >
          <X className="h-5 w-5 text-[#09080d]" />
        </button>

        <h2 className="text-[#22262e] text-2xl font-medium font-['Inter']">Delete your account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Warning Message */}
          <div className="flex flex-col gap-3.5">
            <p className="text-[#777980] text-sm font-['Inter'] leading-[21px]">
              You are about to delete your travel booking account! This action
              can not be undone and all your data will be deleted from our
              system.
            </p>
            <p className="text-[#777980] text-sm font-['Inter'] leading-[21px]">
              We are sorry to see you go, if there was one thing that you
              could change about our service, what would that be? This
              feedback is critical to our continued improvement. Thanks so
              much!
            </p>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <span className="text-[#070707] text-base font-['Inter']">Confirm your password</span>
              <span className="text-[#fe5050] text-base font-['Inter']">*</span>
            </label>
            <input
              type="password"
              placeholder="Current password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              className={`h-14 px-5 py-[13px] rounded-lg border ${errors.password ? 'border-[#fe5050]' : 'border-[#d2d2d5]'} text-sm focus:outline-none focus:border-[#fe5050] w-full`}
            />
            {errors.password && (
              <span className="text-[#fe5050] text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Feedback Section */}
          <div className="flex flex-col gap-3">
            <label className="text-[#070707] text-base font-['Inter']">Feedback</label>
            <textarea
              placeholder="Please tell us why you are leaving this account."
              {...register('feedback')}
              className="h-[114px] px-5 py-[13px] rounded-lg border border-[#d2d2d5] text-sm resize-none focus:outline-none focus:border-[#fe5050] w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3.5 rounded-lg border border-[#777980] text-[#777980] text-lg font-medium font-['Inter'] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-3.5 bg-[#fe5050] rounded-lg text-white text-lg font-medium font-['Inter'] hover:bg-[#e54646] transition-colors cursor-pointer"
            >
              Delete account now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
