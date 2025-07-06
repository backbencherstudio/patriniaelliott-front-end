'use client';

import { X } from "lucide-react";
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
  { icon: '/vendor/profileinfo.svg', label: 'Add Profile Information', href: '/profile-info', isActive: true },
  { icon: '/vendor/verification.svg', label: 'Vendor Verification', href: '/vendor-verification' },
  { icon: '/vendor/payment.svg', label: 'Payment Method', href: '/payment-method' },
  { icon: '/vendor/transection.svg', label: 'Transection History', href: '/transection-history' },
  { icon: '/vendor/withdraw.svg', label: 'Withdraw Balance', href: '/withdraw-balance' },
];

const VendorSidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  
  const isActive = (href: string): boolean => {
    if (href === "/profile-info") {
      return pathname === "/profile-info";
    }
    return pathname.startsWith(href);
  };
  
  return (
    <div className="h-screen lg:h-auto">
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="absolute top-0 left-0 w-full h-full z-40 xl:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div className={`
        ${isOpen ? 'z-50 h-full overflow-hidden absolute -top-20 left-0' : 'h-full'} 
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
          <div className="px-3 py-2 rounded-md bg-bgColor flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M14.9243 1.19675C14.9118 1.1405 14.8681 1.09675 14.815 1.08112C12.9837 0.634247 8.75558 2.228 6.46495 4.51862C6.05558 4.92487 5.6837 5.3655 5.35245 5.83425C4.6462 5.77175 3.93995 5.82487 3.33683 6.08737C1.63683 6.83425 1.14308 8.78737 1.00245 9.62487C0.974328 9.78737 1.0837 9.94362 1.24933 9.97175C1.27745 9.97487 1.30558 9.978 1.3337 9.97487L4.06183 9.67487C4.06495 9.88112 4.07745 10.0874 4.09933 10.2905C4.11183 10.4311 4.17745 10.5655 4.27745 10.6655L5.3337 11.7186C5.4337 11.8186 5.56808 11.8842 5.7087 11.8967C5.91183 11.9186 6.11495 11.9311 6.3212 11.9342L6.0212 14.6592C6.00245 14.8249 6.12433 14.9749 6.28995 14.9905C6.31808 14.9936 6.3462 14.9936 6.3712 14.9874C7.2087 14.853 9.16495 14.3592 9.9087 12.6592C10.1712 12.0561 10.2243 11.353 10.165 10.6499C10.6368 10.3186 11.0775 9.94362 11.4837 9.53737C13.7806 7.253 15.365 3.11862 14.9243 1.19675ZM11.3087 6.80925C10.7243 7.39362 9.77433 7.39675 9.18995 6.80925C8.60245 6.22487 8.60245 5.27487 9.18995 4.68737C9.77433 4.09987 10.7243 4.09987 11.3118 4.68737C11.8962 5.27487 11.8962 6.22487 11.3087 6.80925Z" fill="#0068EF"/>
  <path d="M5.2625 12.4807C5.09062 12.6525 4.81562 12.7182 4.48438 12.7775C3.74062 12.9025 3.08438 12.2619 3.21875 11.5119C3.26875 11.2275 3.42188 10.8275 3.51562 10.7338C3.56875 10.6807 3.57187 10.5932 3.51875 10.54C3.4875 10.5088 3.44688 10.4932 3.40313 10.4994C2.9875 10.5494 2.6 10.74 2.30625 11.0338C1.56875 11.7713 1.5 14.4994 1.5 14.4994C1.5 14.4994 4.23125 14.4307 4.96562 13.6932C5.2625 13.3963 5.45 13.0119 5.5 12.5932C5.5125 12.465 5.35312 12.3869 5.2625 12.4807Z" fill="#0068EF"/>
</svg>
          <p className="text-blueColor  ">Set up: 86% completed</p>
          </div>
          <div className="px-3 text-xs text-secondaryColor py-3 rounded-md border mt-3">
            <p>Profile setup: Complete payment method </p>
            <div className="w-full h-2 rounded-sm bg-border relative mt-2">
              <div className="w-[80%] h-2 rounded-sm bg-secondaryColor"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
