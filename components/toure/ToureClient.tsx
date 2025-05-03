"use client";

import FilterSidebar from "@/components/filter/Sidebar";
import { useState } from "react";
import { FiFilter } from "react-icons/fi"; // Importing Filter Icon from Feather Icons
import Pathname from "../reusable/Pathname";

export default function ToureClient({
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
            <FilterSidebar toure={true} />
          </div>
        {/* Main content */}
        <div
          className={`col-span-12 relative md:col-span-12 lg:col-span-9 ${
            isSidebarOpen ? "pl-4" : ""
          }`}
        >
          <div
            className={`${
              isSidebarOpen ? "block" : "hidden"
            }  col-span-5 lg:col-span-3 lg:hidden absolute top-0 -left-5 z-50`}
          >
            <FilterSidebar />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
