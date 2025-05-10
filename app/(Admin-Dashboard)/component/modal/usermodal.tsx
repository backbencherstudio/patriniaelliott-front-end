import React from 'react'
import Image from 'next/image'

interface UserModalProps {
  title?: string;
  onClose?: () => void;
  userData?: {
    name: string;
    role: string;
    id: string;
    status: 'Active' | 'Inactive' | 'Banned';
    profileImage: string;
    verificationStatus: {
      status: string;
      rating: number;
    };
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    bio: string;
    details: {
      joinDate: string;
      gender: string;
      dateOfBirth: string;
      language: string;
      lastActive: string;
    };
  }
}

const defaultUserData = {
  name: "Elisabeth Sarah",
  role: "Guest",
  id: "#123562",
  status: "Active" as const,
  profileImage: "https://placehold.co/100x100",
  verificationStatus: {
    status: "Pending verification",
    rating: 4.7
  },
  contact: {
    email: "elisabeth-sarah@gmail.com",
    phone: "(217) 555-0113",
    address: "8 12 Victoria Road Barnsley, South Yorkshire S70 2BB"
  },
  bio: "Described by Queenstown House & Garden magazine as having one of the best views we've ever seen' you will love relaxing in this newly built",
  details: {
    joinDate: "January 25, 2025",
    gender: "Female",
    dateOfBirth: "June 15, 1995",
    language: "English",
    lastActive: "February 01, 2025"
  }
}

export default function Usermodal({ title = "User Details", onClose, userData = defaultUserData }: UserModalProps) {
  const statusStyles = {
    Active: {
      bgColor: "bg-[#38c976]/10",
      borderColor: "outline-[#abefc6]",
      textColor: "text-[#067647]",
      icon: "tik.svg"
    },
    Inactive: {
      bgColor: "bg-[#ffa23a]/10",
      borderColor: "outline-[#ffa23a]",
      textColor: "text-[#ffa23a]",
      icon: "inactive.svg"
    },
    Banned: {
      bgColor: "bg-[#fe5050]/10",
      borderColor: "outline-[#fe5050]",
      textColor: "text-[#fe5050]",
      icon: "banned.svg"
    }
  }

  const currentStatus = statusStyles[userData.status];

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm "
      onClick={handleBackdropClick}
    >
      <div className="p-6 bg-white rounded-xl flex flex-col gap-6 max-h-[90vh] overflow-auto max-w-[974px]">
        <div className="flex justify-between items-start">
          <h2 className="text-[#070707] text-[28px] font-medium leading-9">{title}</h2>
          <div 
            className="w-[34px] h-[34px] p-[9px] bg-[#e9e9ea] rounded-full flex items-center cursor-pointer" 
            onClick={onClose}
          >
            <Image src="/modal/close.svg" alt="close" width={16} height={16} />
          </div>
        </div>

        <div className="flex gap-4">
          {/* Left Section */}
          <div className="w-[349px] p-4 rounded-2xl outline-1 outline-offset-[-1px] outline-[#f3f3f4] flex flex-col gap-6">
            {/* Profile Header */}
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div className={`flex items-center gap-1 px-2 py-1.5 ${currentStatus.bgColor} rounded-2xl outline-1 outline-offset-[-1px] ${currentStatus.borderColor}`}>
                  <Image src={`/modal/${currentStatus.icon}`} alt={userData.status.toLowerCase()} width={12} height={12} />
                  <span className={`${currentStatus.textColor} text-xs`}>{userData.status}</span>
                </div>
                <div className="w-[34px] h-[34px] bg-white rounded-full shadow-sm outline-1 outline-offset-[-1px] outline-[#edf2f7] relative">
                  <Image 
                    src="/modal/threedot.svg" 
                    alt="menu" 
                    width={16} 
                    height={16}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              {/* Profile Image and Info */}
              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[100px] mb-4">
                  <img src={userData.profileImage} alt="profile" className="rounded-full w-full h-full object-cover" />
                </div>
                <div className="text-center w-full">
                  <h3 className="text-[#22262e] text-xl font-medium mb-2">{userData.name}</h3>
                  <p className="text-[#777980] text-base mb-2">{userData.role}</p>
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg outline-1 outline-offset-[-1px] outline-[#e9e9ea]">
                    <span className="text-[#777980]">ID {userData.id}</span>
                    <Image src="/modal/copy.svg" alt="copy" width={16} height={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* User Info Box */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image src="/modal/redclock.svg" alt="pending" width={20} height={20} />
                <span className="text-[#fe5050] text-base">{userData.verificationStatus.status}</span>
              </div>
              <span className="text-[#4a4c56] text-base">{userData.verificationStatus.rating}</span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <Image src="/modal/mail.svg" alt="email" width={20} height={20} />
                <span className="text-[#4a4c56] text-base">{userData.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Image src="/modal/call.svg" alt="phone" width={20} height={20} />
                <span className="text-[#4a4c56] text-base">{userData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Image src="/modal/location.svg" alt="address" width={20} height={20} />
                <span className="text-[#4a4c56] text-base">{userData.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <div className="border-b border-[#f3f3f4] pb-4 mb-8">
              <h3 className="text-[#070707] text-2xl font-medium mb-8">Hi, I'm {userData.name}</h3>
              <p className="text-[#4a4c56] text-lg leading-[27px]">{userData.bio}</p>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-5">
                {[
                  { icon: 'calendar.svg', label: 'Join date' },
                  { icon: 'gender.svg', label: 'Gender' },
                  { icon: 'birthdaycake.svg', label: 'Date of Birth' },
                  { icon: 'language.svg', label: 'Language' },
                  { icon: 'lastseen.svg', label: 'Last Active' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Image src={`/modal/${item.icon}`} alt={item.label} width={20} height={20} />
                    <span className="text-[#777980] text-lg">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col gap-5">
                {[
                  userData.details.joinDate,
                  userData.details.gender,
                  userData.details.dateOfBirth,
                  userData.details.language,
                  userData.details.lastActive
                ].map((text, index) => (
                  <div key={index} className="text-[#070707] text-lg">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button className="self-end px-8 py-3.5 rounded-full shadow-sm outline-1 outline-offset-[-1px] outline-[#fe5050] text-[#fe5050] font-medium">
          Remove User
        </button>
      </div>
    </div>
  )
}
