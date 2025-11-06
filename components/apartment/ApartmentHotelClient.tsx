"use client";

import FilterSidebar from "@/components/filter/Sidebar";
import { X } from "lucide-react";
import { useState } from "react";
import { FiFilter } from "react-icons/fi"; // Importing Filter Icon from Feather Icons
import Pathname from "../reusable/Pathname";

export default function ApartmentHotelClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="container grid grid-cols-12 gap-5 lg:gap-8">
        <div className="col-span-12">
          <Pathname />
        </div>
        {/* Hamburger Button for Mobile with Filter Icon */}
        <div className="col-span-12 lg:hidden flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-black font-bold p-2 rounded-md flex items-center space-x-2"
          >
            <FiFilter className="w-5 h-5 text-gray-700" />{" "}
            {/* React Icon filter */}
          </button>
          <span>{isSidebarOpen ? "Close Filter" : "Open Filter"}</span>
        </div>
            <div
            className={`  col-span-3 hidden lg:block `}
          >
            <FilterSidebar />
          </div>
        {/* Main content */}
        <div
          className={`col-span-12 relative md:col-span-12 lg:col-span-9 ${
            isSidebarOpen ? "pl-4  " : ""
          }`}
        >
          {/* Mobile modal-style overlay */}
          <div
            className={`${isSidebarOpen ? "flex" : "hidden"} lg:hidden fixed inset-0 z-50 bg-black/50`}
          >
            <div className="w-80 overflow-y-auto max-w-full h-full bg-white shadow-xl ">
              <div className="flex px-3 justify-between items-center py-4">
                <h2 className="text-xl font-bold">Filter Properties</h2>
                <button onClick={toggleSidebar} className="  bg-primaryColor font-bold p-1.5 rounded-full flex items-center space-x-2"><X className="w-5 h-5 text-whiteColor"/></button>
              </div>
              <FilterSidebar />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
