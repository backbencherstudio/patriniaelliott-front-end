"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import { useToken } from "@/hooks/useToken";
import { cn } from "@/lib/utils";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import MenuDropDown from "./MenuDropDown";
import LanguageSwitcher from "./reusable/LanguageSwitcher";
import { CookieHelper } from "@/helper/cookie.helper";


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
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if(searchParams.get('token')){
     const redirect = searchParams.get('token')
     CookieHelper.set({ key: "tourAccessToken", value: redirect })
     router.push('/')
    }
  }, [searchParams])
  
  
    const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const fetchMyData = async () => {
    const data = await UserService.getData("/auth/me",token)
   return data?.data
  }

      const {data,isLoading,error}= useQuery({
        queryKey: ['user'],
        queryFn: () => fetchMyData(),
        enabled: !!token, // Only run query if token exists
      })

  return (
    <header className="bg-primaryColor py-4  sticky top-0 z-50 left-0 w-full">
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
          <div className="flex items-center  ">
            
            <LanguageSwitcher/>
          </div>
          {token && data?.success  ? (
            <>
              <Link
                aria-label="List your property"
                href="/property-list"
                prefetch={true}
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
              >
                List your property
              </Link>
             <MenuDropDown setMenuOpen={setMenuOpen} data={data?.data || data }/>
            </>
          ) : (
            <>
            <Link
                aria-label="List your property"
                  prefetch={true}
                href={token ? "/property-list" : "/login"}
                className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
              >
                List your property
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
           <LanguageSwitcher/>
          </div>
          {/* Auth Buttons */}
          <div className="mt-4 flex flex-col text-center gap-3">
              
                <Link
                  aria-label="List your property"
                prefetch={true}
                  href={token ? "/property-list" : "/login"}
                  onClick={() => setMenuOpen(false)}
                  className="bg-secondaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-full"
                >
                  List your property
                </Link>      
           
           
          </div>
        </div>
      </div>
    </header>
  );
}
