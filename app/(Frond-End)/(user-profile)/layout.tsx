"use client";
import React, { useState, useEffect, useRef } from "react";
import ProfileSidebar from "./component/common/Sidebar";





interface bookingLayoutProps {
    children: React.ReactNode;
}

const BookingLayout: React.FC<bookingLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        const handleScroll = () => {
            // Get navbar height dynamically or use a fixed value
            const navbar = document.querySelector('header');
            const navbarHeight = navbar ? navbar.offsetHeight : 100;
            const scrollY = window.scrollY;

            if (sidebarRef.current && window.innerWidth >= 1280) {
                if (scrollY >= navbarHeight) {
                    setIsSticky(true);
                    sidebarRef.current.style.top = '0px';
                } else {
                    setIsSticky(false);
                    sidebarRef.current.style.top = `${navbarHeight}px`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bg-bgColor min-h-screen flex flex-col py-12" ref={containerRef}>
            <div className="container flex-1 flex flex-col gap-3 xl:flex-row">
                <div
                    ref={sidebarRef}
                    className={`
                        fixed xl:sticky
                        !top-20 left-0 
                        xl:self-start
                        w-[312px]
                        transition-all duration-300 ease-in-out z-50
                        xl:translate-x-0 
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:block
                    `}
                >
                    <ProfileSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                </div>

                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 xl:hidden z-40"
                        onClick={closeSidebar}
                    />
                )}
                
                <div className="flex flex-col h-full w-full">
                    <div className="xl:pt-5 xl:hidden">
                        <button aria-label="Open Menu" onClick={openSidebar}>open menu </button>
                    </div>
                    <main className="xl:pr-5 flex-1 xl:pt-0 pt-5">{children}</main>
                </div>
            </div>
        </div>
    );
};

export default BookingLayout;
