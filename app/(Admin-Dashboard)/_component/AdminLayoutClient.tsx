"use client";
import { useState } from "react";
import Header from "./common/Header";
import Sidebar from "./common/Sidebar";

function AdminLayoutClient({ children }) {
     const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="bg-bgColor w-full overflow-y-auto h-screen relative overflow-hidden">
      <div className="w-full sticky top-0 left-0 z-10">
        <Header onMenuClick={openSidebar} sidebarOpen={sidebarOpen} />
      </div>

      <div className="max-w-[1480px] mx-auto">
        <div
          className={`fixed w-[300px] mt-4 transition-transform duration-300 ease-in-out z-20 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-[400px]"}`}
        >
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={closeSidebar}
          />
        )}
        <div className={`flex-1 transition-[margin] duration-300 ease-in-out lg:ml-[320px]`}>
          <main className="flex-1   p-0 md:p-4 h-screen">
            {children}
           
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayoutClient
