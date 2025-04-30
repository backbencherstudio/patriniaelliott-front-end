import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BookingProvider } from "@/provider/BookingProvider";
import 'react-datepicker/dist/react-datepicker.css';
import 'swiper/css';
import 'swiper/css/navigation';
export default function FrontEndLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div >
            <Navbar/>
            <BookingProvider>
                {children}
                </BookingProvider>
            <Footer/>
        </div>
    );
}
