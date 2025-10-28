"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import complete from "@/public/auth/completeicon.png";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
export default function BookingConfirm({ isOpen, setIsOpen, responseData }: any) {

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
const router = useRouter()
  const formattedDate = date.toLocaleDateString("en-GB", options);

  const generatePDF = async () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      // Set up the PDF content
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      let yPosition = margin;
      
      // Add title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Congratulation!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;
      
      // Add success message
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text('We successfully received your payment!', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 30;
      
      // Add package details
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(responseData?.package_details?.name || 'Package Name', margin, yPosition);
      yPosition += 15;
      
      // Add amenities
      if (responseData?.package?.amenities) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const amenities = responseData.package.amenities.join(' • ');
        pdf.text(amenities, margin, yPosition);
        yPosition += 15;
      }
      
      // Add host information
      pdf.setFontSize(10);
      pdf.text('Hosted by', margin, yPosition);
      yPosition += 8;
      pdf.setFont('helvetica', 'bold');
      pdf.text(responseData?.user?.name || 'Host Name', margin, yPosition);
      yPosition += 8;
      
      // Add rating
      if (responseData?.rating_summary?.average) {
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Rating: ${responseData?.rating_summary?.average} (${responseData?.rating_summary?.total_reviews || 0} reviews)`, margin, yPosition);
        yPosition += 20;
      }
      
      // Add booking details section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Booking Details', margin, yPosition);
      yPosition += 15;
      
      // Add booking information
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      const bookingDetails = [
        ['Booking code:', responseData?.booking_details?.id || 'N/A'],
        ['Package type:', responseData?.package_details?.type || 'N/A'],
        ['Date:', formattedDate],
        ['Total:', `$${responseData?.booking_details?.total || '0'}`],
        ['Payment method:', responseData?.booking_details?.payment_method || 'card']
      ];
      
      bookingDetails.forEach(([label, value]) => {
        pdf.text(label, margin, yPosition);
        pdf.text(value, pageWidth - margin - pdf.getTextWidth(value), yPosition);
        yPosition += 8;
      });
      
      // Save the PDF
      pdf.save(`booking-invoice-${responseData?.booking_details?.id || 'invoice'}.pdf`);

      router.push("/")
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF generation failed. Please try again.');
    }
  };
  const hanldeCancelBooking = () => {
    setIsOpen(false)
    router.push("/")
  }
  console.log("responseData",responseData);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className=" " asChild></DialogTrigger>

      <DialogContent className="sm:max-w-[662px] text-center p-10 h-[90%] overflow-y-auto close">
        <div className="bg-white p-8 rounded-lg">
          <h2 className=" text-headerColor font-semibold text-5xl">
            {" "}
            Congratulation!
          </h2>
          <div className="flex justify-center">
            <Image src={complete} width={182} height={182} alt="complete" />
          </div>
          <p className=" text-base text-grayColor1">
            We successfully received your payment!
          </p>
          <div className=" text-start bg-bgColor rounded-lg p-4">
            <h4 className=" text-[22px] font-medium text-headerColor">{responseData?.package?.name}</h4>
            <ul className=" gap-2 text-grayColor1 text-sm mt-1 flex  border-b border-grayColor1/25 pb-3">
              {responseData?.package?.amenities?.map((item) => (
                <li key={item}>•{item}</li>
              ))}
            </ul>
            <div className=" flex justify-between items-end ">
              <div className=" mt-4">
                <p className="text-sm text-grayColor1 mt-1">Hosted by </p>
                <div className="flex items-center gap-2 mt-1">
                  <Image
                    src={responseData?.user.avatar ? responseData?.user?.avatar : "/profile.png"}
                    alt="hosted"
                    width={24}
                    height={24}
                    className=" rounded-full"
                  />
                  <h5 className="text-sm font-semibold text-headerColor ">
                    {responseData?.user?.name}
                  </h5>
                </div>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm text-headerColor mt-2">
                  <FaStar size={18} className="text-yellow-400" /> {responseData?.rating_summary?.average || 0}{" "}
                  <span className="text-grayColor1">
                    ({responseData?.rating_summary?.total_reviews || 0} reviews)
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className=" text-start bg-bgColor/80 rounded-lg p-4">
            <h3 className=" text-2xl font-medium text-headerColor">Booking details</h3>
            <div className=" space-y-3">
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Booking code:</p><p>{responseData?.booking_details?.id}</p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>package type:</p><p>{responseData?.package_details?.type}</p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Date:</p><p>{formattedDate}</p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Total:</p><p>${Math.round(responseData?.booking_details?.total)}</p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Payment method:</p><p> {responseData?.booking_details?.payment_method}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-5">
          <button 
            onClick={generatePDF}
            className="w-full  bg-secondaryColor cursor-pointer text-headerColor font-medium  py-3 px-4 rounded-full text-base"
          >
            Download Invoice
          </button>
          <button onClick={hanldeCancelBooking} className="w-full text-redColor  border border-redColor cursor-pointer  font-medium  py-3 px-4 rounded-full text-base">
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
