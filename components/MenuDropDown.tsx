"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

import { cn } from "@/lib/utils";
function MenuDropDown(setMenuOpen:any) {
      const pathname = usePathname();
  return (
    <div>
       <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex items-center border-none gap-1.5
                    focus:outline-none focus-visible:outline-none
                    focus:ring-0 focus-visible:ring-0
                    focus:border-none focus-visible:border-none
                    active:outline-none active:ring-0"
                >
                  <div className="md:w-[46px] md:h-[46px] w-8 h-8 relative rounded-full bg-white/10 border border-white/10">
                    <Image
                      src="/usericon/avatar.png"
                      alt="User Avatar"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <IoIosArrowDown className="text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-4 bg-white rounded-lg shadow">
                  <div className="pb-3 border-b border-[#e9e9ea] flex items-center gap-2.5 w-full">
                    <div className="w-8 h-8 relative rounded-full">
                      <Image
                        src="/usericon/avatar.png"
                        alt="User Avatar"
                        fill
                        className="rounded-full"
                      />
                      <div className="w-8 h-8 left-0 top-0 absolute opacity-10 rounded-full border border-black" />
                    </div>
                    <div className="text-[#070707] text-base">elisabeth_sarah@gmail.com</div>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <Link href="/my-account" className="w-full">
                      <DropdownMenuItem className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent">
                        <div className="w-8 h-8 p-1 bg-[#fffbee] rounded-full flex items-center justify-center overflow-hidden">
                          <Image
                            src="/usericon/user.svg"
                            alt="My Account"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className={cn(
                          "text-base font-medium",
                          pathname === "/my-account" ? "text-[#d6ae29]" : "text-[#070707]"
                        )}>My Account</div>
                      </DropdownMenuItem>
                    </Link>
                    <Link  onClick={() => setMenuOpen(false)} href="/property-list" className="w-full">
                        <DropdownMenuItem className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent">
                          <div className="w-8 h-8 p-1 bg-[#fffbee] rounded-full flex items-center justify-center overflow-hidden">
                            <Image
                              src="/usericon/date.svg"
                              alt="My Booking"
                              width={16}
                              height={16}
                            />
                          </div>
                          <div className={cn(
                            "text-base",
                            pathname === "/property-list" ? "text-[#d6ae29]" : "text-[#070707]"
                          )}>List Your Property</div>
                        </DropdownMenuItem>
                      </Link>
                    <Link href="/apartment-history" className="w-full">
                      <DropdownMenuItem className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent">
                        <div className="w-8 h-8 p-1 bg-[#fffbee] rounded-full flex items-center justify-center overflow-hidden">
                          <Image
                            src="/usericon/date.svg"
                            alt="My Booking"
                            width={16}
                            height={16}
                          />
                        </div>
                        <div className={cn(
                          "text-base",
                          pathname === "/apartment-history" ? "text-[#d6ae29]" : "text-[#070707]"
                        )}>My Booking</div>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent" onClick={() => setMenuOpen(false)}>
                      <div className="w-8 h-8 p-1 bg-[#fffbee] rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                          src="/usericon/logout.svg"
                          alt="Logout"
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className="text-[#070707] text-base">Logout</div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
    </div>
  )
}

export default MenuDropDown
