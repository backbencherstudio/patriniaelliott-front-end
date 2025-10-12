"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserService } from "@/service/user/user.service";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

interface HeaderProps {
  onNotificationClick?: () => void;
  adminName?: string;
  sidebarOpen: boolean;
  onMenuClick: () => void;
  data:any
}

const Header: React.FC<HeaderProps> = ({
  onMenuClick,
  sidebarOpen,
  data,
}: HeaderProps) => {
  const [isShow, seIsShow] = useState<boolean>(false);
  const router = useRouter();
 const hanldeLogout =async()=>{
         try {
          const res = await UserService?.logout()
           router?.push("/login")
         } catch (error) {
          console.log(error.message);
          
         }
      }
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
            {sidebarOpen ? <X className=" z-50 " /> : <Menu  className="text-whiteColor"/>}
          </button>
          <Link
            href={"/dashboard"}
            className="text-white text-xl lg:text-3xl font-semibold tracking-wide"
          >
            LOGO
          </Link>
        </div>

        {/* Notification and Profile Group */}
        <div className="flex items-center gap-5 justify-end  relative sm:ml-0">
          <div className="flex items-center gap-4">
            <button aria-label="Notification" className=" cursor-pointer relative ">
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-redColor "></span>
              <IoNotificationsOutline  className="text-whiteColor text-base lg:text-2xl" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-start items-center gap-3 cursor-pointer hover:opacity-90">
                <div className=" w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden">
                  <Image
                    src={data?.avatar_url || "/profile.png"}
                    alt="Admin Avatar"
                    width={40}
                    height={40}
                    className="rounded-full w-full h-full  "
                  />
                </div>
                <div className="whitespace-nowrap text-left">
                  <h4 className="text-sm lg:text-base font-medium text-white">
                    {data?.name}
                  </h4>
                  <p className=" text-xs md:text-sm text-whiteColor/70">Super Admin</p>
                </div>
                <IoIosArrowDown size={24} className="text-whiteColor" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                <DropdownMenuItem onClick={hanldeLogout} className="cursor-pointer font-semibold text-lg">
               <LogOut className="text-blackColor"/>   Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
