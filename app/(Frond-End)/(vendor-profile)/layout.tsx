"use client";
import React, { useState } from "react";

// import Header from "./component/common/Header";
import Sidebar from "./component/common/Sidebar";

interface UserProfileLayoutProps {
    children: React.ReactNode;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="bg-bgColor min-h-screen flex flex-col py-12">
            {/* <div className="w-full sticky top-0 left-0">
                <Header onMenuClick={openSidebar} sidebarOpen={sidebarOpen} />
            </div> */}

            <div className="container flex-1 flex flex-col lg:flex-row ">
                <div
                    className={`
                        w-[312px]
                        transition-transform duration-300 ease-in-out z-20
                        lg:translate-x-0 
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:block
                    `}
                >
                    <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                </div>

                {/* Overlay for mobile when sidebar is open */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 lg:hidden"
                        onClick={closeSidebar}
                    />
                )}

                {/* Main Content Area */}
                <div className="flex-1">
                    <main className="lg:pr-5 px-3">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default UserProfileLayout;
