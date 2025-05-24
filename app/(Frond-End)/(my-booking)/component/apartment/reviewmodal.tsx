import React, { useState } from 'react'
import Image from 'next/image'
import ReactRating from 'react-rating'
import { useForm, SubmitHandler } from 'react-hook-form'

// Add type for Rating component
const Rating = ReactRating as any;

interface ReviewModalProps {
  onClose: () => void;
  apartment: {
    name: string;
  };
}

interface ReviewFormData {
  rating: number;
  feedback: string;
}

export default function ReviewModal({ onClose, apartment }: ReviewModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      feedback: ''
    }
  });

  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    console.log('Form data:', data);
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div className={`w-[533px] p-6 bg-white rounded-xl flex flex-col items-center gap-8 transition-all duration-300 ease-in-out ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-12">
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex justify-between items-center">
                <div className="text-2xl font-bold text-[#22262e]">Give us your feedback</div>
                <button 
                  type="button"
                  onClick={() => {
                    setIsClosing(true);
                    setTimeout(() => {
                      onClose();
                    }, 300);
                  }}
                  className="w-[34px] h-[34px] p-[9.14px] bg-[#fffbee] rounded-[36.57px] shadow-[0px_9.142857551574707px_18.285715103149414px_-9.142857551574707px_rgba(15,15,15,0.10)] flex justify-center items-center hover:bg-[#fff5d6] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L4 12M4 4L12 12" stroke="#09080D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="text-base text-[#777980]">What is your experience with {apartment.name}?</div>
            </div>
            <div className="flex">
              <Rating
                initialRating={watch('rating')}
                emptySymbol={
                  <div className="w-12 h-12" style={{ marginRight: '10px' }}>
                    <Image
                      src="/booking/star.svg"
                      alt="Empty star"
                      width={48}
                      height={48}
                      className="opacity-30"
                    />
                  </div>
                }
                fullSymbol={
                  <div className="w-12 h-12" style={{ marginRight: '10px' }}>
                    <Image
                      src="/booking/star.svg"
                      alt="Full star"
                      width={48}
                      height={48}
                      className="opacity-100"
                    />
                  </div>
                }
                onChange={(value: number) => setValue('rating', value)}
                stop={5}
                framerSpacing={10}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div>
              <span className="text-lg font-medium text-[#4a4c56]">Write your feedback</span>
              <span className="text-lg text-[#777980]"> (optional)</span>
            </div>
            <div className="w-full h-[129px] relative">
              <textarea 
                {...register('feedback')}
                className="w-full h-full px-4 py-3 bg-[#f6f6f7] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0068ef]"
                placeholder="Please write here"
              />
            </div>
          </div>
          <div className="w-full">
            <button 
              type="submit"
              className="w-full pl-5 pr-[19.19px] py-5 bg-[#0068ef] rounded-[50px] text-white text-base font-medium hover:bg-[#0051bc] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={watch('rating') === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
