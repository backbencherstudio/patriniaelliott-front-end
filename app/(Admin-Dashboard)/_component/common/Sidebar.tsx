"use client";

import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface NavItem {
  icon: string;
  label: string;
  href: string;
  isDropdown?: boolean;
  subItems?: {
    label: string;
    href: string;
  }[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  {
    icon: "/admin/user.svg",
    label: "User dashboard",
    href: "/dashboard",
  },
  {
    icon: "/admin/vendor.svg",
    label: "Vendor management",
    href: "/dashboard/vendor-management",
  },
  {
    icon: "/admin/time-management.svg",
    label: "Manage bookings",
    href: "/dashboard/bookings",
  },
  {
    icon: "/admin/check-list.svg",
    label: "Listing management",
    href: "/dashboard/listings",
  },
  {
    icon: "/admin/mentoring.svg",
    label: "Payment monitor",
    href: "/dashboard/payments",
  },
  {
    icon: "/admin/view.svg",
    label: "Manage review",
    href: "/dashboard/reviews",
  },
  // {
  //   icon: "/admin/notification-02.svg",
  //   label: "Manage notifications",
  //   href: "/dashboard/notifications",
  // },
  // {
  //   icon: "/admin/settings-01.svg",
  //   label: "Platform setting",
  //   href: "/dashboard/settings",
  // },
  {
    icon: "/admin/service.svg",
    label: "Terms of service",
    href: "/dashboard/terms",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const isAccordionActive = (subItems: { href: string }[]): boolean => {
    return subItems.some(item => isActive(item.href));
  };

  const toggleAccordion = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="h-screen lg:h-auto">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          ${isOpen ? "z-50 h-full overflow-hidden absolute -top-20 left-0" : "h-full"}
          flex flex-col
          min-h-[calc(100vh-100px)] 
          bg-white 
          border border-[#E2E8F0] 
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          lg:rounded-[12px] 
          p-5 w-full overflow-y-auto
        `}
      >
        <div className="flex justify-end lg:hidden cursor-pointer">
          <button onClick={onClose}><X /></button>
        </div>

        {/* Account Section */}
        <div className="mb-4">
          <h2 className="text-sm font-normal text-gray-500 mb-2">Account</h2>
          <nav className="flex flex-col gap-1">
            {navItems.slice(0, 5).map((item, idx) => (
              item.isDropdown ? (
                <div key={idx} className="flex flex-col">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(item.label)}
                    className={`
                      w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg 
                      transition-colors duration-200 
                      ${isAccordionActive(item.subItems || []) ? "bg-[#FFF7E7]" : "hover:bg-[#FFF7E7]"}
                    `}
                  >
                    <div className="flex gap-3 items-center">
                      <div
                        className={`
                          w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 rounded-full 
                          ${isAccordionActive(item.subItems || []) ? "bg-whiteColor" : "bg-[#FFFBEE]"}
                          shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]
                        `}
                      >
                        <Image src={item.icon} alt={item.label} width={20} height={20} />
                      </div>
                      <span className="text-base font-normal text-[#111111]">
                        {item.label}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        expandedItems.includes(item.label) ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  
                  {/* Accordion Content */}
                  {expandedItems.includes(item.label) && (
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.subItems?.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.href}
                          onClick={onClose}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg 
                            transition-colors duration-200 
                            ${isActive(subItem.href) ? "bg-[#FFF7E7]" : "hover:bg-[#FFF7E7]"}
                          `}
                        >
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                          <span className="text-sm font-normal text-[#111111]">
                            {subItem.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg 
                    transition-colors duration-200 
                    ${isActive(item.href) ? "bg-[#FFF7E7]" : "hover:bg-[#FFF7E7]"}
                  `}
                >
                  <div className="flex gap-3 items-center">
                    <div
                      className={`
                        w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 rounded-full 
                        ${isActive(item.href) ? "bg-whiteColor" : "bg-[#FFFBEE]"}
                        shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]
                      `}
                    >
                      <Image src={item.icon} alt={item.label} width={20} height={20} />
                    </div>
                    <span className="text-base font-normal text-[#111111]">
                      {item.label}
                    </span>
                  </div>
                  <span><IoIosArrowForward /></span>
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Preferences Section */}
        <div className="mt-4">
          <h2 className="text-sm font-normal text-gray-500 mb-2">Preferences</h2>
          <nav className="flex flex-col gap-1">
            {navItems.slice(5).map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg 
                  transition-colors duration-200 
                  ${isActive(item.href) ? "bg-[#FFF7E7]" : "hover:bg-[#FFF7E7]"}
                `}
              >
                <div className="flex gap-3 items-center">
                  <div
                    className={`
                      w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 rounded-full 
                      ${isActive(item.href) ? "bg-whiteColor" : "bg-[#FFFBEE]"} 
                      shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]
                    `}
                  >
                    <Image src={item.icon} alt={item.label} width={20} height={20} />
                  </div>
                  <span className="text-base font-normal text-[#111111]">
                    {item.label}
                  </span>
                </div>
                <span><IoIosArrowForward /></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Log out section */}
        <div className="mt-auto pt-4">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 border border-grayColor1/20 rounded-lg transition-colors duration-200 hover:bg-gray-50"
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 rounded-full bg-[#FFFBEE] shadow-[0px_-0.3px_5.5px_rgba(0,0,0,0.04)]">
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
