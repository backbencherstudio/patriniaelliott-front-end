"use client";
import React, { useState } from "react";
import BookingSidbar from "./component/common/BookingSidebar";




interface bookingLayoutProps {
    children: React.ReactNode;
}

const BookingLayout: React.FC<bookingLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="bg-bgColor min-h-screen flex flex-col py-12">
            <div className="container flex-1 flex flex-col gap-3 xl:flex-row">
                <div
                    className={`
                        fixed xl:relative
                        !top-20 xl:!top-0 left-0 h-full
                        w-[312px]
                        transition-transform duration-300 ease-in-out z-50
                        xl:translate-x-0 
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:block
                    `}
                >
                    <BookingSidbar isOpen={sidebarOpen} onClose={closeSidebar} />
                </div>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 xl:hidden z-40"
                        onClick={closeSidebar}
                    />
                )}
                <div className="flex flex-col h-full w-full">
                    <div className="xl:pt-5 xl:hidden">
                        <button onClick={openSidebar}>open menu </button>
                    </div>
                    <main className="xl:pr-5 flex-1 xl:pt-0 pt-5">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default BookingLayout;
