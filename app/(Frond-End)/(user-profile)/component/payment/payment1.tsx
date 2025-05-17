import React from 'react'

export default function Payment1() {
  return (
    <div className="w-[960px] bg-white rounded-xl p-6 flex flex-col gap-6 my-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-[#22262e] text-2xl font-medium">Add payment cards</h2>
        <p className="text-[#777980] text-base">Save your passport details for use when booking your next stay, flight.</p>
      </div>
      
      <div className="flex justify-between items-center px-4 py-3 rounded-lg outline-1 outline-[#e9e9ea]">
        <span className="text-[#070707] text-lg">Add payment cards</span>
        <button className="bg-[#0068ef] text-white px-8 py-3 rounded-lg font-medium shadow-sm">
          Add card
        </button>
      </div>
    </div>
  )
}
 