import OtpVerificationForm from "@/components/AllForm/OtpVerificationPage"
import verificationimg from "@/public/auth/verification.jpg"
import Image from "next/image"
function VerificationPage() {
  return (
     <section className='max-w-[1346px] mx-auto min-h-screen flex items-center'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden'>
              <Image src={verificationimg} alt='RegisterImage' width={650} height={750} className=' w-full '/>
           </div>
           <div>
             <OtpVerificationForm/>
           </div>
      </div>
    </section>
  )
}

export default VerificationPage
