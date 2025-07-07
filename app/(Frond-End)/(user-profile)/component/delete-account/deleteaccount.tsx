'use client'
import { useState } from 'react';
import { DialogDemo } from './DemoModal';

export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
console.log(showModal);

  return (
    <div>
      <div className="w-full bg-[#fe5050]/10 rounded-xl p-4 md:p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#22262e] text-2xl font-medium">Permanently delete account</h2>
        </div>
        
        <div className="bg-white rounded-lg p-5 flex flex-col gap-2 md:flex-row items-start md:justify-between md:items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-[#22262e] text-xl font-medium">Delete account</h3>
            <p className="text-[#777980] text-base">Delete user account or extra information.</p>
          </div>
          
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#fe5050] text-white px-8 py-3 rounded-lg font-medium shadow-sm cursor-pointer hover:bg-[#e54646] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && <DialogDemo showModal={showModal} onClose={setShowModal} />}
    </div>
  )
}
