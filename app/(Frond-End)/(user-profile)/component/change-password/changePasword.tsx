'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { MyProfileService } from '../../../../../service/user/myprofile.service'

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

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error('All fields are required')
      return
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New password and confirmation do not match')
      return
    }

    try {
      setSubmitting(true)
      const res = await MyProfileService.changePassword({
        old_password: passwords.oldPassword,
        new_password: passwords.newPassword,
      })

      const success = res?.success === true || res?.status === 200 || res?.status === 201 || res?.data?.success === true
      if (success) {
        toast.success('Password updated successfully')
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        const message = res?.data?.message || 'Failed to update password'
        toast.error(message)
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || 'Failed to update password'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full p-6 bg-white rounded-xl inline-flex flex-col justify-start items-start gap-8">
      <div className="justify-center text-[#22262e] text-2xl font-medium font-['Inter'] leading-[30.24px]">Change password</div>
      <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
        <div className="self-stretch inline-flex justify-start items-start gap-4 w-full">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2 w-full">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Old password</div>
            </div>
            <div className="self-stretch h-14 px-5 py-[13px] rounded-lg border border-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch inline-flex justify-between items-center w-full">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange('oldPassword')}
                  placeholder="Enter your current password"
                  className="w-full bg-transparent border-none outline-none text-[#333] text-sm font-normal font-['Inter']"
                />
                <button 
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="w-5 h-5 relative hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={showOldPassword ? "/usericon/view.svg" : "/usericon/view.svg"}
                    alt={showOldPassword ? "hide password" : "show password"}
                    width={20}
                    height={20}
                    className={`transition-opacity duration-200 ${showOldPassword ? 'opacity-100' : 'opacity-50'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch inline-flex justify-start items-start gap-4 w-full">
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2 w-full">
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">New password</div>
            </div>
            <div className="self-stretch h-14 px-5 py-[13px] rounded-lg border border-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
              <div className="self-stretch inline-flex justify-between items-center w-full">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwords.newPassword}
                  onChange={handlePasswordChange('newPassword')}
                  placeholder="Enter your new password"
                  className="w-full bg-transparent border-none outline-none text-[#333] text-sm font-normal font-['Inter']"
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="w-5 h-5 relative hover:opacity-100 transition-opacity"
                >
                  <Image
                    src={showNewPassword ? "/usericon/view.svg" : "/usericon/view.svg"}
                    alt={showNewPassword ? "hide password" : "show password"}
                    width={20}
                    height={20}
                    className={`transition-opacity duration-200 ${showNewPassword ? 'opacity-100' : 'opacity-50'}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-end gap-6 w-full">
          <div className="self-stretch inline-flex justify-start items-start gap-4 w-full">
            <div className="flex-1 inline-flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="justify-start text-[#070707] text-base font-normal font-['Inter'] leading-none">Confirm password</div>
              </div>
              <div className="self-stretch h-14 px-5 py-[13px] rounded-lg border border-[#d2d2d5] flex flex-col justify-center items-start gap-2.5">
                <div className="self-stretch inline-flex justify-between items-center w-full">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange('confirmPassword')}
                    placeholder="Confirm your new password"
                    className="w-full bg-transparent border-none outline-none text-[#333] text-sm font-normal font-['Inter']"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="w-5 h-5 relative hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={showConfirmPassword ? "/usericon/view.svg" : "/usericon/view.svg"}
                      alt={showConfirmPassword ? "hide password" : "show password"}
                      width={20}
                      height={20}
                      className={`transition-opacity duration-200 ${showConfirmPassword ? 'opacity-100' : 'opacity-50'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3.5 bg-[#0068ef] rounded-lg inline-flex justify-center items-center gap-1.5 overflow-hidden hover:bg-[#0056cc] transition-colors disabled:opacity-50"
          >
            <div className="justify-start text-white text-lg font-medium font-['Inter'] leading-[18px]">{submitting ? 'Updating...' : 'Update Password'}</div>
          </button>
        </div>
      </form>
    </div>
  )
}
