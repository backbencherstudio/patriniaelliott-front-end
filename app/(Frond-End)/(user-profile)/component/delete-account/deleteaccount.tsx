import React from 'react'

export default function DeleteAccount() {
  return (
    <div className="w-full bg-[#fe5050]/10 rounded-xl p-6 flex flex-col gap-6 my-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-[#22262e] text-2xl font-medium">Permanently delete account</h2>
      </div>
      
      <div className="bg-white rounded-lg p-5 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-[#22262e] text-xl font-medium">Delete account</h3>
          <p className="text-[#777980] text-base">Delete user account or extra information.</p>
        </div>
        
        <button className="bg-[#fe5050] text-white px-8 py-3 rounded-lg font-medium shadow-sm">
          Delete
        </button>
      </div>
    </div>
  )
}
