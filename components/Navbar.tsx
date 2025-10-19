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
import useFetchData from "@/hooks/useFetchData";
import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import MenuDropDown from "./MenuDropDown";

const menuItems = [
  { en: "Home", slug: "/" },
  { en: "Apartment", slug: "/apartments" },
  { en: "Hotel", slug: "/hotels" },
  { en: "Tours",  slug: "/tours" },
  { en: "Contact Us",  slug: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<"en">("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const {token}=useToken()
    const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };
  const endpoint ="/auth/me"
      const {data,loading,error}= useFetchData(endpoint)
  
  return (
    <header className="bg-primaryColor py-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link aria-label="Logo" href="/" className="text-white text-2xl md:text-3xl font-semibold tracking-wide">
          LOGO
        </Link>
        <nav className="hidden lg:flex space-x-6 text-base">
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              prefetch={true}
              aria-label={item.en}
              href={item.slug}
              className={cn(
                "hover:text-secondaryColor transition",
                isActive(item.slug) ? "text-secondaryColor" : "text-white"
              )}
            >
              {language === "en" ? item.en : item.en}
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
              <DropdownMenuItem >
                  German
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {token && data?.success  ? (
            <>
              <Link
                aria-label="List your proparty"
                href="/property-list"
                prefetch={true}
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
              >
                List your proparty
              </Link>
             <MenuDropDown setMenuOpen={setMenuOpen} data={data?.data || data }/>
            </>
          ) : (
            <>
            <Link
                aria-label="List your proparty"
                  prefetch={true}
                href={token ? "/property-list" : "/login"}
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
              >
                List your proparty
              </Link>
                <Link aria-label="Login" prefetch={true} href="/login" className="text-white text-base">
                Login
              </Link>
              <Link
                aria-label="Sign up"
                  prefetch={true}
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
          {token && data?.success ? <MenuDropDown setMenuOpen={setMenuOpen} data={data?.data || data}/> : <div className=" flex items-center gap-3">
              <Link prefetch={true} aria-label="Login" href="/login" className="text-white text-base" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link
                prefetch={true}
                  aria-label="Sign up"
                  href="/registration"
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base md:px-4 px-2 py-1 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>}  
          </div> 
          <button
            aria-label="Menu"
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
            aria-label="Close"
            onClick={() => setMenuOpen(false)}
            className="self-end text-white text-2xl mb-6"
          >
            <HiX />
          </button>
          {/* Menu Items */}
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              aria-label={item.en}
              prefetch={true}
              href={item.slug}
              className={cn(
                "block text-base py-2",
                pathname === item.slug ? "text-secondaryColor" : "text-white"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {language === "en" ? item.en : item.en}
            </Link>
          ))}
          {/* Language Dropdown (Mobile) */}
          <div className="flex items-center gap-2 mt-4">
            <BsGlobe2 className="text-white" />
            <select
              value={language}
              aria-label="Language"
              onChange={(e) => setLanguage(e.target.value as "en" )}
              className="bg-transparent outline-none text-white"
            >
              <option value="en" className="text-black">English</option>
              <option value="ger" className="text-black">German</option>
            </select>
          </div>
          {/* Auth Buttons */}
          <div className="mt-4 flex flex-col text-center gap-3">
              {token && data?.success ? <>
                <Link
                  aria-label="List your proparty"
                prefetch={true}
                  href={token ? "/property-list" : "/login"}
                  onClick={() => setMenuOpen(false)}
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
                >
                  List your proparty
                </Link>      
              </> : <>
                <Link
                  aria-label="Login"
                  prefetch={true}
                  href="/login"
                  className="text-white text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </>}
           
          </div>
        </div>
      </div>
    </header>
  );
}
