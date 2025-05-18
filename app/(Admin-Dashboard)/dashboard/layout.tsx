"use client";
import React, { useState } from "react";

import CustomToastContainer from "@/components/CustomToast/CustomToastContainer";
import Header from "../component/common/Header";
import Sidebar from "../component/common/Sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="  bg-bgColor 2xl:max-h-screen h-screen relative ">
      <div className="w-full  sticky top-0 left-0 ">
        <Header onMenuClick={openSidebar} sidebarOpen={sidebarOpen} />
      </div>
      {/* Sidebar */}
      <div className=" max-w-[1380px] mx-auto">
        <div
          className={`
        fixed w-[300px]  
        mt-4
        transition-transform duration-300 ease-in-out z-20
        lg:translate-x-0 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-[400px]"}
      `}
        >
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50  lg:hidden"
            onClick={closeSidebar}
          />
        )}
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-[margin] duration-300 ease-in-out lg:ml-[320px]`}
        >
          {/* Main Content */}
          <main className="flex-1  overflow-y-auto  p-0 md:p-4">
                    {children}
                    <CustomToastContainer/>
                </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
