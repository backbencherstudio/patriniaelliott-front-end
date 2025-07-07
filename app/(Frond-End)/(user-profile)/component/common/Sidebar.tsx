'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

interface NavItem {
  icon: string;
  label: string;
  href: string;
  isActive?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
const navItems: NavItem[] = [
  { icon: '/usericon/profile.svg', label: 'My Profile', href: '/my-account', isActive: true },
  { icon: '/usericon/changepass.svg', label: 'Change Password', href: '/change-password' },
  { icon: '/usericon/payment.svg', label: 'Add Payment Card', href: '/payment' },
  { icon: '/usericon/delete.svg', label: 'Delete Account', href: '/delete-account' },
  { icon: '/usericon/setting.svg', label: 'Settings', href: '/settings' },
];
const ProfileSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  
   const pathname = usePathname();
    const isActive = (href: string): boolean => {
    if (href === "/profile-info") {
      return pathname === "/profile-info";
    }
    return pathname.startsWith(href);
  };
  return (
  <div className="h-screen lg:h-auto">
      {isOpen && (
        <div 
          className="absolute top-0 left-0 w-full h-full z-40 xl:hidden" 
          onClick={onClose}
        />
      )}
      <div className={`
        ${isOpen ? 'z-50 !h-full overflow-hidden absolute -top-20 left-0' : 'h-full'} 
        flex flex-col
        min-h-[calc(100vh-100px)] 
        bg-white 
        border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        xl:rounded-[12px] p-5 w-full overflow-y-auto
      `}>
        <div className="flex justify-end xl:hidden cursor-pointer">
          <button onClick={onClose}><X /></button>
        </div>

        {/* Account Section */}
        <div className="mb-4">
          <h2 className="text-sm font-normal text-gray-500 mb-3">My Booking</h2>
          <nav className="flex flex-col gap-1">
            {navItems.slice(0, 5).map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5  rounded-lg 
                  transition-colors duration-200 
                  ${isActive(item.href) ? 'bg-[#FFF7E7]' : 'hover:bg-[#FFF7E7]'}
                `}
              >
                <div className='flex gap-3 items-center'>
 <div className={`w-[30px] flex justify-center items-center   h-[30px] flex-shrink-0 rounded-full ${isActive(item.href) ? 'bg-whiteColor' : 'bg-[#FFFBEE]'}  shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]`}>
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </div>
                <span className="text-base whitespace-nowrap font-normal text-[#111111]">{item.label}</span>
                </div>
               
                 <span><IoIosArrowForward/></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-4">
          <nav className="flex flex-col gap-1">
            {navItems.slice(5).map((item, idx) => (
               <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5  rounded-lg 
                  transition-colors duration-200 
                  ${isActive(item.href) ? 'bg-[#FFF7E7]' : 'hover:bg-[#FFF7E7]'}
                `}
              >
                <div className='flex gap-3 items-center'>
 <div className={`w-[30px] flex justify-center items-center hover:bg-whiteColor  h-[30px] flex-shrink-0 rounded-full ${isActive(item.href) ? 'bg-whiteColor' : 'bg-[#FFFBEE]'}  shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]`}>
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </div>
                <span className="text-base font-normal text-[#111111]">{item.label}</span>
                </div>
               
                 <span><IoIosArrowForward/></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Log out section */}
          <div className="mt-auto pt-4">
          <Link
            href="/logout"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 border border-grayColor1/20 rounded-lg transition-colors duration-200 hover:bg-gray-50"
          >
            <div className={`w-[30px] flex justify-center items-center   h-[30px] flex-shrink-0 rounded-full  bg-[#FFFBEE]  shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]`}>
              <Image src="/admin/logout.svg" alt="Log out" width={20} height={20} />
            </div>
            <span className="text-base font-normal text-[#111111]">Log out account</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
