"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import MenuDropDown from "./MenuDropDown";

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
  const {token}=useToken()

  
  return (
    <header className="bg-primaryColor py-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
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

          {token ? (
            <>
              <Link
                href="/profile-info"
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
              >
                Become a Vendor
              </Link>
             <MenuDropDown setMenuOpen={setMenuOpen}/>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white text-base">
                Login
              </Link>
              <Link
                href="/registration"
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-2 md:px-6 py-2 rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="md:hidden">
          {token ? <MenuDropDown setMenuOpen={setMenuOpen}/> : <div className=" flex items-center gap-3">
                <Link href="/login" className="text-white text-base" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base md:px-4 px-2 py-1 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>}  
          </div> 
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[80vw] max-w-xs bg-primaryColor z-50 transition-all duration-300 ease-in-out",
          menuOpen ? "right-0" : "-right-[100%]"
        )}
      >
        <div className="flex flex-col h-full p-6 space-y-3">
          {/* Close Button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-white text-2xl mb-6"
          >
            <HiX />
          </button>
          {/* Menu Items */}
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
          <div className="flex items-center gap-2 mt-4">
            <BsGlobe2 className="text-white" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "bn")}
              className="bg-transparent outline-none text-white"
            >
              <option value="en" className="text-black">English</option>
              <option value="bn" className="text-black">বাংলা</option>
            </select>
          </div>
          {/* Auth Buttons */}
          <div className="mt-4 flex flex-col gap-3">
            {token && (
              <>
                <Link
                  href="/profile-info"
                  onClick={() => setMenuOpen(false)}
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
                >
                  Become a Vendor
                </Link>      
              </>
            ) }
          </div>
        </div>
      </div>
    </header>
  );
}
