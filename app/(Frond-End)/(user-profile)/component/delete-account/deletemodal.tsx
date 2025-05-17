import React from 'react'

export default function DeleteModal() {
  return (
    <div className="w-[461px] p-6 bg-white rounded-xl flex flex-col gap-6">
      <h2 className="text-[#22262e] text-2xl font-medium font-['Inter']">Delete your account</h2>
      
      <div className="flex flex-col gap-6">
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
          <div className="h-14 px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] flex items-center">
            <span className="text-[#777980] text-xs font-['Inter']">Current password</span>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="flex flex-col gap-3">
          <label className="text-[#070707] text-base font-['Inter']">Feedback</label>
          <div className="h-[114px] px-5 py-[13px] rounded-lg outline-1 outline-[#d2d2d5] relative">
            <span className="absolute left-4 top-4 text-[#777980] text-xs font-['Inter']">
              Please tell us why you are leaving this account.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-3">
          <button className="px-6 py-3.5 rounded-lg border border-[#777980] text-[#777980] text-lg font-medium font-['Inter']">
            Cancel
          </button>
          <button className="px-6 py-3.5 bg-[#fe5050] rounded-lg text-white text-lg font-medium font-['Inter']">
            Delete account now
          </button>
        </div>
      </div>
    </div>
  )
}
