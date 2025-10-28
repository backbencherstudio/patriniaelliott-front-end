"use client";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    const margin = 20;
    let yPosition = margin;

    // Title
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("Congratulation!", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    // ✅ Convert image URL to Base64 before adding
    const toBase64 = async (url: string) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    };

    // Since your image is in public/auth/completeicon.png
    const imgPath = "/auth/completeicon.png"; // this works in Next.js public folder
    const imgData = await toBase64(imgPath);

    // Add the image to PDF
    pdf.addImage(imgData, "PNG", pageWidth / 2 - 17.5, yPosition, 35, 35);
    yPosition += 40;

    // Subtitle
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text("We successfully received your payment!", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Package details
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text(responseData?.package_details?.name || "Package Name", margin, yPosition);
    yPosition += 15;

    if (responseData?.package?.amenities) {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      const amenities = responseData.package.amenities.join(" • ");
      pdf.text(amenities, margin, yPosition);
      yPosition += 15;
    }

    pdf.setFontSize(10);
    pdf.text(`Hosted by: ${responseData?.user?.name || "Host Name"}`, margin, yPosition);
    yPosition += 8;

    if (responseData?.rating_summary?.average) {
      pdf.text(
        `Rating: ${responseData?.rating_summary?.average} (${responseData?.rating_summary?.total_reviews || 0} reviews)`,
        margin,
        yPosition
      );
      yPosition += 20;
    }

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Booking Details", margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    const bookingDetails = [
      ["Booking code:", responseData?.booking_details?.id || "B-0000000000"],
      ["Package type:", responseData?.package_details?.type || "N/A"],
      ["Date:", formattedDate],
      ["Duration:", `${responseData?.package_details?.duration } ${responseData?.package_details?.duration_type} `],
      ["Base Total:", `$${responseData?.price_breakdown?.base_total || 0} `],
      ["Discount Amount:", ` - ${responseData?.price_breakdown?.discount_applied || 0}`],
      ["Final Total:", `$${responseData?.price_breakdown?.final_total || 0}`],
      ["Payment method:", responseData?.booking_details?.payment_method || "Credit Card"],
    ];

    bookingDetails.forEach(([label, value]) => {
      pdf.text(label, margin, yPosition);
      pdf.text(value, pageWidth - margin - pdf.getTextWidth(value), yPosition);
      yPosition += 8;
    });

    pdf.save(`booking-invoice-${responseData?.booking_details?.id || "invoice"}.pdf`);
    router.push("/");
  } catch (error) {

    alert("PDF generation failed. Please try again.");
  }
};
  const hanldeCancelBooking = () => {
    if (responseData?.package_details?.type === "tour") {
      router.push(`/toure/${responseData?.package_details?.id}`)
    }else if (responseData?.package_details?.type === "apartment") {
      router.push(`/apartment/${responseData?.package_details?.id}`)
    }else if (responseData?.package_details?.type === "hotel") {
      router.push(`/hotel/${responseData?.package_details?.id}`)
    }else{
      router.push("/my-account")
    }
  }
  
  return (
    <div className="bookingchage">
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        hanldeCancelBooking();
      } else {
        setIsOpen(true);
      }
    }}>
      <DialogTrigger className=" " asChild></DialogTrigger>

      <DialogContent aria-describedby="congratulation" className="sm:max-w-[662px] text-center p-10 h-[90%] overflow-y-auto close">
        <div className="bg-white p-8 rounded-lg">
          <DialogTitle aria-describedby="congratulation" className=" text-headerColor font-semibold text-5xl">
            {" "}
            Congratulation!
          </DialogTitle>   
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
                <p>Duration:</p><p>{responseData?.package_details?.duration } {responseData?.package_details?.duration_type} </p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Base Total:</p><p>${responseData?.price_breakdown?.base_total || 0} </p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Discount Amount:</p><p> - ${responseData?.price_breakdown?.discount_applied || 0}</p>
              </div>
              <div className=" text-sm text-grayColor1 flex justify-between">
                <p>Final Total:</p><p>${responseData?.price_breakdown?.final_total || 0}</p>
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
    </div>
  );
}
