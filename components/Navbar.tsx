"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  { en: "Home", bn: "হোম", slug: "/" },
  { en: "Apartment", bn: "অ্যাপার্টমেন্ট", slug: "/apartments" },
  { en: "Hotel", bn: "হোটেল", slug: "/hotels" },
  { en: "Tours", bn: "ট্যুর", slug: "/tours" },
  { en: "Contact Us", bn: "যোগাযোগ", slug: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="bg-primaryColor py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-3xl font-semibold tracking-wide">
          LOGO
        </Link>
        <nav className="hidden lg:flex space-x-6 text-base">
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={cn(
                "hover:text-secondaryColor transition",
                pathname === item.slug ? "text-secondaryColor" : "text-white"
              )}
            >
              {language === "en" ? item.en : item.bn}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white text-base flex items-center gap-2 cursor-pointer">
              <BsGlobe2 /> {language.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("bn")}>
                বাংলা
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            <>
              <Link
                href="/profile-info"
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
              >
                Become a Vendor
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5">
                  <div className="w-[46px] h-[46px] relative rounded-full bg-white/10 border border-white/10">
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
                    <DropdownMenuItem className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent" onClick={() => setIsLoggedIn(false)}>
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
            </>
          ) : (
            <>
              <Link href="/login" className="text-white text-base">
                Login
              </Link>
              <Link
                href="/registration"
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="lg:hidden px-4 mt-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={cn(
                "block text-base py-2",
                pathname === item.slug ? "text-secondaryColor" : "text-white"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {language === "en" ? item.en : item.bn}
            </Link>
          ))}

          {/* Language Dropdown (Mobile) */}
          <div className="md:flex items-center justify-between">
            <div className="text-white text-base flex items-center gap-2">
              <BsGlobe2 />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "bn")}
                className="bg-transparent outline-none text-white"
              >
                <option value="en" className="text-black">
                  English
                </option>
                <option value="bn" className="text-black">
                  বাংলা
                </option>
              </select>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3 mt-3">
                <Link
                  href="/profile-info"
                  onClick={() => setMenuOpen(false)}
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
                >
                  Become a Vendor
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5">
                    <div className="w-[46px] h-[46px] relative rounded-full bg-white/10 border border-white/10">
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
                        <DropdownMenuItem  onClick={() => setMenuOpen(false)} className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent">
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
                      <Link  onClick={() => setMenuOpen(false)} href="/apartment-history" className="w-full">
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
                      <DropdownMenuItem  className="py-2 flex items-center gap-2.5 w-full focus:bg-transparent" onClick={() => setIsLoggedIn(false)}>
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
            ) : (
              <>
                <Link href="/login" className="text-white text-base">
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
