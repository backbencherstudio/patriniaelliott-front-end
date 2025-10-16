"use client"
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { MdArrowBackIos } from "react-icons/md";
import ReviewModal from "./reviewmodal";
interface DetailsProps {
  apartment: {
    name: string;
    image: string;
    bookingDate: string;
    amount: string;
    status: string;
    
  };
  back:string;
 
}

export default function Details({ apartment,back }: DetailsProps) {
    const [showReviewModal, setShowReviewModal] = useState(false)
  return (
    <div>
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="text-2xl sm:text-3xl font-medium">Apartment details</div>
        <Link 
         href={back}
          className="px-4 py-2 cursor-pointer text-grayColor1 hover:text-blueColor flex items-center gap-1"
        >
          <MdArrowBackIos/>
          Back to list
        </Link>
      </div>
      <div className="p-4 bg-white rounded-xl flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row items-center gap-6 w-full">
          <img className="w-full max-w-xs rounded-lg object-cover" src="/hotel/h1.jpg" alt={apartment.name} />
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-xl sm:text-2xl font-medium">{apartment.name}</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#e5e8eb] rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#8bc5e5] rounded-full overflow-hidden flex items-center justify-center">
                      <img className="w-6 h-9 object-cover" src={apartment.image} alt="Host" />
                    </div>
                  </div>
                  <span className="text-xs text-[#777980]">Hosted by</span>
                  <span className="text-xs">Michalle</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start sm:items-end">
                <div>
                  <span className="text-xl sm:text-2xl font-bold">{apartment.amount}</span>
                  <span className="text-xs">/per night</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm">4.8</span>
                  <span className="text-sm text-[#777980]">(256 reviews)</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#e9e9ea]/20 rounded-lg flex flex-col gap-4">
              <div className="text-lg font-medium">Booking details</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <div className="text-base text-[#777980]">Booking code:</div>
                  <div className="text-base text-[#777980]">Date:</div>
                  <div className="text-base text-[#777980]">Total:</div>
                  <div className="text-base text-[#777980]">Payment method:</div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <div className="text-sm text-[#4a4c56]">#021954455</div>
                  <div className="text-sm text-[#4a4c56]">{apartment.bookingDate}</div>
                  <div className="text-sm text-[#4a4c56]">{apartment.amount}</div>
                  <div className="text-sm text-[#4a4c56]">Debit card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button 
          aria-label="Write a review"
          onClick={()=>setShowReviewModal(true)}
          className="self-end px-6 py-3 border border-blueColor cursor-pointer rounded-lg outline-offset-[-1px] outline-[#0068ef] flex items-center gap-2 hover:bg-[#0068ef] group transition-colors"
        >
          <span className="text-base font-medium text-[#0068ef] group-hover:text-white transition-colors">Write a review</span>
        </button>
      </div>

     
    </div>
      {showReviewModal && (
        <ReviewModal
          onClose={setShowReviewModal}
          open={showReviewModal}
          apartment={apartment}
        />
      )}
    </div>
  )
}

