import React from 'react'
import Image from 'next/image'

export default function ReviewModal() {
  return (
    <div className="w-[533px] p-6 bg-white rounded-xl flex flex-col items-center gap-8 my-10">
      <div className="w-full flex flex-col items-center gap-12">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex justify-between items-center">
            <div className="text-2xl font-bold text-[#22262e]">Give us your feedback</div>
            <button className="w-[34px] h-[34px] p-[9.14px] bg-[#fffbee] rounded-[36.57px] shadow-[0px_9.142857551574707px_18.285715103149414px_-9.142857551574707px_rgba(15,15,15,0.10)] flex justify-center items-center hover:bg-[#fff5d6] transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L4 12M4 4L12 12" stroke="#09080D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="text-base text-[#777980]">What is your experience while using our services?</div>
        </div>
        <div className="flex gap-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-12 h-12 relative">
              <Image
                src="/booking/star.svg"
                alt={`Star ${star}`}
                width={48}
                height={48}
                className={star <= 4 ? "opacity-100" : "opacity-30"}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div>
          <span className="text-lg font-medium text-[#4a4c56]">Write your feedback</span>
          <span className="text-lg text-[#777980]"> (optional)</span>
        </div>
        <div className="w-full h-[129px] relative">
          <div className="w-full h-full px-2 py-8 bg-[#f6f6f7] rounded-lg" />
          <div className="absolute left-4 top-4 text-base text-[#777980]">Please write here</div>
        </div>
      </div>
      <div className="w-full">
        <button className="w-full pl-5 pr-[19.19px] py-5 bg-[#0068ef] rounded-[50px] text-white text-base font-medium">
          Submit
        </button>
      </div>
    </div>
  )
}
