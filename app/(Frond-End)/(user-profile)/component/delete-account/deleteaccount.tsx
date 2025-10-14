'use client'
import { useState } from 'react';
import { DialogDemo } from './DemoModal';
import { useMyProfile } from '@/hooks/useMyProfile';

export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const { me, loading, error } = useMyProfile();

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
            {/* User preview from API */}
            <div className="text-sm text-[#777980] mt-2">
              {loading && <span>Loading your profile...</span>}
              {!loading && me && (
                <div className="flex flex-col gap-0.5">
                  <span><b>Name:</b> {me?.name || me?.first_name || '-'}</span>
                  <span><b>Email:</b> {me?.email || '-'}</span>
                  {me?.phone_number && <span><b>Phone:</b> {me.phone_number}</span>}
                </div>
              )}
              {!loading && !me && !!error && (
                <span className="text-[#fe5050]">{error}</span>
              )}
            </div>
          </div>
          
          <button 
            aria-label="Delete Account"
            onClick={() => setShowModal(true)}
            className="bg-[#fe5050] text-white px-8 py-3 rounded-lg font-medium shadow-sm cursor-pointer hover:bg-[#e54646] transition-colors"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <DialogDemo 
          showModal={showModal} 
          onClose={setShowModal}
          email={me?.email}
        />
      )}
    </div>
  )
}
