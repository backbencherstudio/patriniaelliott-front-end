import useFetchData from "@/hooks/useFetchData";
import { useToken } from "@/hooks/useToken";
import { UserService } from "@/service/user/user.service";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import BookingFinalStep from "./BookingFinalStep";
import PaymentSkleton from "./PaymentSkleton";
export default function StepTwo({totalAmount }:any) {
   const endpoint ="/auth/me"
   const {data}= useFetchData(endpoint)
  const customerId = data?.data?.stripe_customer_id
 const [isOpen, setIsOpen] = useState(false)
  const { token } = useToken()
  const [paymentID, setPaymentID] = useState("")
  const [paymentMethodId, setPaymentMethodId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingCardId, setSubmittingCardId] = useState<string | number | null>(null);
  const {data:cardData, loading:cardLoading}= useFetchData(`/user-profile/cards/${customerId}`)
   const cvc = "****"
   const pathname = usePathname()
  const addCardHref = `/payment/add-new-card?customerId=${customerId || ''}&redirect=${encodeURIComponent(pathname || '/')}`
    const handlePayment = async (item) => {
   setIsSubmitting(true);
   setSubmittingCardId(item?.id);
    const formattedData = {
         booking_id: localStorage.getItem("bookingId"),
      	"currency": "usd",
	      "provider": "stripe"
    }

    try {
      const response = await UserService?.createData(`/booking/payment/create-intent`, formattedData, token)
      console.log("response", response?.data?.data?.payment_intent_id);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setPaymentID(response?.data?.data?.payment_intent_id)
        setPaymentMethodId(item?.stripe_payment_method_id)
        setIsOpen(true)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
    setSubmittingCardId(null);
  };
console.log("check card path name",pathname);

  return (
    <div className="mt-6 px-10">
      {/* <PaymentForm totalAmount={totalAmount} data={data}/> */}
      <div className="mb-6 flex justify-end lg:pr-10">
      {cardData?.data  && <Link href={addCardHref} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white gap-2 bg-primaryColor hover:bg-primaryColor/90 transition-colors"> <FaPlus/> Add New Card</Link>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        {cardLoading ? (
          // Skeleton Loading
          Array.from({ length: 2 }).map((_, index) => (
            <PaymentSkleton  key={index}/>
          ))
        ) : cardData?.data && cardData?.data?.length > 0 ? (
          cardData?.data?.map((item:any)=>(
            <div onClick={()=>!isSubmitting && handlePayment(item)} id="PaymentForm" className={`w-full cursor-pointer relative ${isSubmitting && submittingCardId===item?.id ? 'opacity-50 pointer-events-none' : ''}`} key={item?.id}>
            <Cards
            cvc={cvc}
            expiry={item?.exp_month + "/" + item?.exp_year}
            focused={false}
            name={item?.brand}
            number={"000000000000" + item?.last4}
            preview={true}
            issuer={item?.brand?.toLowerCase()} // Set the issuer based on card brand
            acceptedCards={item?.brand?.toLowerCase() === 'visa' ? ['visa'] : item?.brand?.toLowerCase() === 'mastercard' ? ['mastercard'] : undefined}
          />
          
          {/* Loading Overlay */}
          {isSubmitting && submittingCardId===item?.id && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                <p className="text-white text-sm mt-2">Processing...</p>
              </div>
            </div>
          )}
             
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-6">
            <div className="text-center">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Cards Found</h3>
              <p className="text-gray-500 mb-6">Please add a new card to complete your booking payment</p>
              <Link href={addCardHref} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primaryColor hover:bg-primaryColor/90 transition-colors">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Card
              </Link>
            </div>
          </div>
        )}
      </div>
      
        {isOpen && <BookingFinalStep paymentID={paymentID} paymentMethodId={paymentMethodId} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
