'use client';

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
  { icon: '/admin/user.svg', label: 'My Profile', href: '/my-account', isActive: true },
  { icon: '/admin/time-management.svg', label: 'Change Password', href: '/dashboard/bookings' },
  { icon: '/admin/check-list.svg', label: 'Add Payment Card', href: '/dashboard/listings' },
  { icon: '/admin/mentoring.svg', label: 'Delete Account', href: '/dashboard/payments' },
  { icon: '/admin/view.svg', label: 'Settings', href: '/dashboard/reviews' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  
  return (
    <div className="h-screen lg:h-auto">
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div className={`
        ${isOpen ? 'inset-0 z-50 h-full overflow-hidden relative' : 'h-full'} 
        flex flex-col
        min-h-[calc(100vh-100px)] 
        bg-white 
        border border-[#E2E8F0] shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        lg:rounded-[12px] p-5 w-full 
      `}>
        {/* Account Section */}
        <div className="mb-4">
          <h2 className="text-sm font-normal text-gray-500 mb-2">Account</h2>
          <nav className="flex flex-col gap-1">
            {navItems.slice(0, 5).map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5  rounded-lg 
                  transition-colors duration-200 
                  ${item.href === pathname ? 'bg-[#FFF7E7]' : 'hover:bg-[#FFF7E7]'}
                `}
              >
                <div className='flex gap-3 items-center'>
 <div className={`w-[30px] flex justify-center items-center   h-[30px] flex-shrink-0 rounded-full ${item.href === pathname ? 'bg-whiteColor' : 'bg-[#FFFBEE]'}  shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]`}>
                  <Image src={item.icon} alt={item.label} width={20} height={20} />
                </div>
                <span className="text-base font-normal text-[#111111]">{item.label}</span>
                </div>
               
                 <span><IoIosArrowForward/></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Navigation */}
        

        {/* Preferences Section */}
        <div className="mt-4">
          {/* <h2 className="text-sm font-normal text-gray-500 mb-2">Preferences</h2> */}
          <nav className="flex flex-col gap-1">
            {navItems.slice(5).map((item, idx) => (
               <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5  rounded-lg 
                  transition-colors duration-200 
                  ${item.href === pathname ? 'bg-[#FFF7E7]' : 'hover:bg-[#FFF7E7]'}
                `}
              >
                <div className='flex gap-3 items-center'>
 <div className={`w-[30px] flex justify-center items-center hover:bg-whiteColor  h-[30px] flex-shrink-0 rounded-full ${item.href === pathname ? 'bg-whiteColor' : 'bg-[#FFFBEE]'}  shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]`}>
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

export default Sidebar;
