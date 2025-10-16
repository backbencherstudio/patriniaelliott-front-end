"use client";
import CustomImage from "@/components/reusable/CustomImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import { LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const { token } = useToken();
  const [isShow, seIsShow] = useState<boolean>(false);
  const router = useRouter();
  type NotificationItem = {
    id: string;
    title: string;
    message: string;
    time: string; // e.g., "1m ago"
    image: string;
    unreadCount?: number;
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);


 const hanldeLogout = async () => {
   try {
     // Call logout service which will clear all data
     UserService?.logout();
     // Redirect to home page after logout
     router?.push('/');
   } catch (error) {
     console.error('Logout error:', error);
     // Even if there's an error, redirect to home page
     router?.push('/');
   }
 }

 const fetchNotifications = async () => {
  try {
    const response = await UserService?.getData(`/admin/notification`, token);
    setNotifications(response?.data?.data);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
 }
 useEffect(() => {
  if (token) {
    fetchNotifications();
  }
 }, [token]);
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
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer relative flex items-center justify-center">
                {!!notifications?.length && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-redColor text-white text-[10px] leading-4 flex items-center justify-center">
                    {notifications?.length}
                  </span>
                )}
                <IoNotificationsOutline className="text-whiteColor text-2xl" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="md:w-[360px] w-[90vw]  p-0 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                  <h4 className="text-sm font-semibold">Notifications</h4>
                  <button className="text-xs text-primaryColor hover:underline">
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-[400px] md:max-h-[400px] overflow-auto py-2">
                  {notifications.map((n :any) => (
                    <div key={n.id} className="px-4 py-3 hover:bg-[#f7f8fa] transition">
                      <div className="flex items-start gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <CustomImage src={n.image || "/profile.png"} alt={n.title} width={40} height={40} className="w-10 h-10 object-cover rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-extrabold tracking-wide">{n?.notification_event?.type}</p>
                            <span className="text-[10px] text-[#7E8494] whitespace-nowrap">{new Date(n.created_at).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-[#7E8494] mt-1 truncate">
                            {n?.notification_event?.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center border-t">
                  <button  className="text-xs cursor-pointer text-primaryColor hover:underline">
                    View all
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
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
