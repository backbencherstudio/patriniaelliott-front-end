'use client'
import React, { useState } from 'react'
import Image from 'next/image'

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = (field: keyof typeof passwords) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="w-full p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-8 my-10">
      <div className="justify-center text-[#22262e] text-2xl font-medium font-['Inter'] leading-[30.24px]">Change password</div>
      <div className="self-stretch flex flex-col justify-start items-start gap-3">
        <div className="self-stretch inline-flex justify-start items-start gap-4">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Old password</div>
            </div>
            <div className="self-stretch h-14 px-5 py-[13px] rounded-lg outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">********</div>
                <button 
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="w-5 h-5 relative"
                >
                  <Image
                    src="/usericon/view.svg"
                    alt="toggle password"
                    width={20}
                    height={20}
                    className="opacity-50"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch inline-flex justify-start items-start gap-4">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">New password</div>
            </div>
            <div className="self-stretch h-14 px-5 py-[13px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch inline-flex justify-between items-center">
                <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">********</div>
                <button 
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="w-5 h-5 relative"
                >
                  <Image
                    src="/usericon/view.svg"
                    alt="toggle password"
                    width={20}
                    height={20}
                    className="opacity-50"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-end gap-6">
          <div className="self-stretch inline-flex justify-start items-start gap-4">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Confirm password</div>
              </div>
              <div className="self-stretch h-14 px-5 py-[13px] rounded-lg outline outline-1 outline-offset-[-1px] outline-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="justify-start text-[#777980] text-sm font-normal font-['Inter'] leading-[14px]">********</div>
                  <button 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="w-5 h-5 relative"
                  >
                    <Image
                      src="/usericon/view.svg"
                      alt="toggle password"
                      width={20}
                      height={20}
                      className="opacity-50"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div data-property-1="packages" className="px-6 py-3.5 bg-[#0068ef] rounded-lg inline-flex justify-center items-center gap-1.5 overflow-hidden">
            <div className="justify-start text-white text-lg font-medium font-['Inter'] leading-[18px]">Update Password</div>
          </div>
        </div>
      </div>
    </div>
  )
}
