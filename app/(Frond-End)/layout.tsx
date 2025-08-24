import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClientProviders from "@/components/reusable/ClientProviders";
import { BookingProvider } from "@/provider/BookingProvider";
import { ToureBookingProvider } from "@/provider/TourBookingProvider";
import { Suspense } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/navigation';
export default function FrontEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Suspense>
            <Navbar/>
            <ClientProviders>
                    {children}
            </ClientProviders>
            <Footer/>
            </Suspense>
        </div>
    );
}
