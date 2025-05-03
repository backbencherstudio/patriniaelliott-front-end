"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useBookingContext } from "@/provider/BookingProvider";
import complete from "@/public/auth/completeicon.png";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
export default function BookingConfirm({ isOpen, setIsOpen }: any) {
  const {
    singleApartment,
    selectedServices,
    startDate,
    endDate,
    servicePrices,
    carRent,
    dinnerPrice,
    totalPrice,
    totalDay,
    calculateTotal,
    discount,
    discountNumber,
  } = useBookingContext();
  console.log(singleApartment);

  if (!singleApartment) return null;

  const { title, reviews, bed, price, rating, image } = singleApartment;
    const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);
  return (
    <Dialog  open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className=" " asChild></DialogTrigger>
      
      <DialogContent className="sm:max-w-[662px] text-center p-10 close">
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
          <h4 className=" text-[22px] font-medium text-headerColor">{title}</h4>
          <ul className=" gap-2 text-grayColor1 text-sm mt-1 flex  border-b border-grayColor1/25 pb-3">
            <li>{bed} King Bed</li>
            <li>•{totalDay} Night</li>
            <li>• Parking Service</li>
            <li>• Foods</li>
          </ul>
          <div className=" flex justify-between items-end ">
            <div className=" mt-4">
              <p className="text-sm text-grayColor1 mt-1">Hosted by </p>
              <div className="flex items-center gap-2 mt-1">
                <Image
                  src="/profile.png"
                  alt="hosted"
                  width={24}
                  height={24}
                  className=" rounded-full"
                />
                <h5 className="text-sm font-semibold text-headerColor ">
                  Michalle
                </h5>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm text-headerColor mt-2">
                <FaStar size={18} className="text-yellow-400" /> {rating || 0}{" "}
                <span className="text-grayColor1">
                  ({reviews || 0} reviews)
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className=" text-start bg-bgColor/80 rounded-lg p-4">
            <h3 className=" text-2xl font-medium text-headerColor">Booking details</h3>
            <div className=" space-y-3">
                <div className=" text-sm text-grayColor1 flex justify-between">
                    <p>Booking code:</p><p>#021954455</p>
                </div>
                <div className=" text-sm text-grayColor1 flex justify-between">
                    <p>Date:</p><p>{formattedDate}</p>
                </div>
                <div className=" text-sm text-grayColor1 flex justify-between">
                    <p>Total:</p><p>${totalPrice- discount}</p>
                </div>
                <div className=" text-sm text-grayColor1 flex justify-between">
                    <p>Payment method:</p><p>Debit card</p>
                </div>
            </div>
        </div>
        <div className=" flex gap-5">
            <button className="w-full  bg-secondaryColor cursor-pointer text-headerColor font-medium  py-3 px-4 rounded-full text-base">
        Download Invoice
      </button>
            <button onClick={()=>setIsOpen(false)} className="w-full text-redColor  border border-redColor cursor-pointer  font-medium  py-3 px-4 rounded-full text-base">
       Cancel
      </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
