"use client"
import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { useForm } from 'react-hook-form';
import { MyProfileService } from '@/service/user/myprofile.service';
import { DataClearHelper } from '@/helper/data-clear.helper';
import { useState } from 'react';

export function DialogDemo({ onClose, showModal, email }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      feedback: ''
    }
  })

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      await MyProfileService.deleteAccount({
        email: email || '',
        password: data.password,
        feedback: data.feedback,
      });
      
      // Clear all user data comprehensively after successful account deletion
      console.log('🧹 Account deleted successfully, clearing all user data...');
      DataClearHelper.clearAllUserData();
      
      onClose(false);
      
      // Redirect to home page after clearing all data
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (e) {
      console.error('❌ Error deleting account:', e);
      // Handle error appropriately - you might want to show a toast notification here
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={showModal}>
        <DialogContent className="sm:max-w-[465px] !p-0">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full px-4 md:px-6 py-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-[#22262e] text-2xl font-medium font-['Inter']">Delete your account</h2>

            {/* Warning Message */}
            <div className="flex flex-col gap-3.5">
              <p className="text-[#777980] text-sm font-['Inter'] leading-[21px]">
                You are about to delete your travel booking account! This action
                cannot be undone and all your data will be deleted from our system.
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
                aria-label="Cancel Delete"
                type="button"
                onClick={() => onClose(false)}  // Close modal on click
                className="md:px-6 py-2.5 px-4 rounded-lg border border-[#777980] text-[#777980] text-lg font-medium font-['Inter'] hover:bg-[#f5f5f5] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                aria-label="Confirm Delete Account"
                type="submit"
                disabled={submitting}
                className="md:px-6 py-2.5 px-4 bg-[#fe5050] rounded-lg text-white text-lg font-medium font-['Inter'] hover:bg-[#e54646] transition-colors cursor-pointer disabled:opacity-60"
              >
                {submitting ? 'Deleting...' : 'Delete account now'}
              </button>
            </div>
          </div>
      </form>
        </DialogContent>
    </Dialog>
  );
}
