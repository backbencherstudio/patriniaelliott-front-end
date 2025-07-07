import { Dialog, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactRating from 'react-rating';

// Add type for Rating component
const Rating = ReactRating as any;

interface ReviewModalProps {
  open: boolean;
  onClose: any;
  apartment: {
    name: string;
  };
}

interface ReviewFormData {
  rating: number;
  feedback: string;
}

export default function ReviewModal({ open, onClose, apartment }: ReviewModalProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      feedback: ''
    }
  });

  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    console.log('Form data:', data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] md:max-w-md md:w-full p-4 md:p-6 bg-white rounded-xl flex flex-col items-center gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-12">
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex justify-between items-center">
                <div className="md:text-2xl text-xl font-bold text-[#22262e]">Give us your feedback</div>
                {/* <button 
                  type="button"
                  onClick={onClose}
                  className="w-[34px] h-[34px] p-[9.14px] bg-[#fffbee] rounded-full shadow flex justify-center items-center hover:bg-[#fff5d6] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="#09080D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button> */}
              </div>
              <div className="text-base text-[#777980]">What is your experience with {apartment.name}?</div>
            </div>
            <div className="flex">
              <Rating
                initialRating={watch('rating')}
                emptySymbol={
                  <div className="w-12 h-12 mr-2">
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
                  <div className="w-12 h-12 mr-2">
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
              className="w-full pl-5 pr-[19.19px] py-3 bg-[#0068ef] rounded-[50px] text-white text-base font-medium hover:bg-[#0051bc] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={watch('rating') === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
