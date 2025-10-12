'use client'
import avatar from "@/public/profile.png";
import { Menu, X } from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";


interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  sidebarOpen: boolean,
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, sidebarOpen }: HeaderProps) => {

  const [isShow, seIsShow] = useState<boolean>(false)
  const router = useRouter()
  const handleLogout = () => {
 console.log("logout");
 
  };
  return (
    <nav className="bg-primaryColor py-3">
 <div className=" container px-5   relative flex justify-between mb-1 z-50">
      {/* Mobile menu button */}
      <div className=" flex items-center">
        <button
          aria-label="Menu"
          onClick={onMenuClick}
          className=" p-2 lg:hidden text-[#4A4C56]"
        >
          {sidebarOpen ? <X className=" z-50 " /> : <Menu />}

        </button>
        <Link href={'/dashbord'} className="text-white text-3xl font-semibold tracking-wide">
          LOGO
        </Link>
      </div>

      {/* Notification and Profile Group */}
      <div className="flex items-center gap-5 justify-end ml-[18%] relative sm:ml-0">
        {
          isShow &&
          <div className=" absolute top-10  text-center bg-redColor py-4 shadow-2xl rounded-xl  w-[120px]">
            <button aria-label="Log out" onClick={handleLogout} className=" text-white text-base cursor-pointer font-medium">Log out</button>
          </div>
        }
        <div className="flex items-center gap-4">
          <button aria-label="Notifications" className=" cursor-pointer relative ">
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-redColor "></span>
            <IoNotificationsOutline size={24} className="text-whiteColor" />
             
          </button>
<div aria-label="Profile" onClick={() => seIsShow(!isShow)}
          className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-90">
            
          <Image
            src={avatar}
            alt="Admin Avatar"
            width={40}
            height={40}
            className="rounded-full  "
          />
          <div>
            <h4 className="text-base font-medium text-white">Jackob Gerrald</h4>
            <p className=" text-sm text-whiteColor/70">Super Admin</p>
          </div>
          <button aria-label="Arrow down" className=" cursor-pointer">
            <IoIosArrowDown size={24} className="text-whiteColor" />
          </button>
        </div>
        </div>
        
      </div>
    </div>
    </nav>
   
  );
};

export default Header;
