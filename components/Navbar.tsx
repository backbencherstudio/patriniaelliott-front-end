"use client";
import rateLogo from "@/public/logo/Logo.png";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsList } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import NavSearch from "./AllForm/NavSearch";
import { ProfilePopover } from "./profile/PofilePopovar";


const Navbar = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const pathname = usePathname();
const isLogin = pathname === "/dj" || pathname === "/profile";


  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "DJ’s", href: "/dj" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <div
      className={`sticky top-0 left-0 z-40 ${
        pathname === "/" ? "bg-[rgba(0,23,33,0.6)]" : "bg-blackColor"
      } text-whiteColor`}
    >
      <nav className="container xl:max-w-7xl mx-auto py-2 lg:py-4 px-2.5">
        <div className="grid grid-cols-12 gap-4 justify-between items-center">
          {/* Logo */}
          <div className="col-span-4 md:col-span-6 lg:col-span-7 xl:col-span-8">
            <NavSearch />
          </div>

          {/* Right Side */}
          <div className="md:col-span-6 lg:col-span-5 xl:col-span-4 col-span-8 flex justify-end items-center">
            <div className="flex lg:gap-7">

          
            {isLogin ? (
              <div className="">

                <ProfilePopover  />
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-base lg:text-lg text-whiteColor font-[DM_Mono] hover:bg-whiteColor hover:text-blackColor sm:px-3 py-1 px-2 lg:px-6 lg:py-2 rounded-full transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/community"
                  className="text-base lg:text-lg text-whiteColor font-[DM_Mono] hover:bg-whiteColor hover:text-blackColor lg:px-6 lg:py-2 sm:px-3 py-1 px-2 rounded-full transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              onClick={() => setIsShow(!isShow)}
              className="group flex gap-1 lg:gap-2 items-center z-50 cursor-pointer"
            >
              {isShow ? (
                <MdClose className="text-2xl lg:text-[36px] group-hover:text-redColor transition-colors" />
              ) : (
                <BsList className="group-hover:text-redColor transition-colors text-2xl lg:text-[36px]" />
              )}
              <Image
                src={rateLogo}
                alt="AI Logo"
                width={40}
                height={40}
                className="w-6 h-6 lg:w-10 lg:h-10"
              />
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isShow && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100vh" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full bg-blackColor overflow-hidden"
                >
                  <ul className="container mx-auto flex flex-col md:flex-row justify-center items-center md:justify-between h-full p-4 gap-8">
                    {navItems.map((item) => (
                      <motion.li
                        key={item.name}
                        onClick={() => setIsShow(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center px-5"
                      >
                        <Link
                          href={item.href}
                          className="text-center text-primaryColor font-mono text-3xl lg:text-[40px] font-normal leading-[140%] tracking-[-0.3px] uppercase"
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
              </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
