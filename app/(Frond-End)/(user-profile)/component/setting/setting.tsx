import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Globe, Bell } from 'lucide-react'

export default function Setting() {
  return (
    <div className="self-stretch p-6 bg-white rounded-2xl flex flex-col gap-6 ">
      <div className="text-[#22262e] text-2xl font-medium">Preference</div>
      <div className="flex flex-col w-full">
        <div className="py-[18px] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Globe className="w-5 h-5 text-[#4a4c56]" />
            <span className="text-[#070707] text-base">Language</span>
          </div>
          <div className="text-[#777980] text-base">English</div>
        </div>
      </div>
    </div>
  )
}
