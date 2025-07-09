import OtpVerificationForm from '@/components/AllForm/OtpVerificationPage'
import regImage from "@/public/auth/registration.jpg"
import Image from 'next/image'

function VerifyEmailPage() {
  return (
    <section className='max-w-[1346px] mx-auto min-h-screen flex items-center'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden px-4 xl:px-0 mt-4 lg:mt-0'>
              <Image src={regImage} alt='RegisterImage' width={650} height={750} className='rounded-3xl  object-contain w-full '/>
           </div>
           <div>
           <OtpVerificationForm/>
           </div>
      </div>
    </section>
  )
}

export default VerifyEmailPage