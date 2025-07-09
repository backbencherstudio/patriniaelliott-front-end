import ForgotPasswordForm from "@/components/AllForm/ForgotForm"
import forgotImage from "@/public/auth/forgot.jpg"
import Image from "next/image"
function LoginPage() {
  return (
     <section className='max-w-[1346px] mx-auto min-h-screen flex items-center'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden px-4 xl:px-0 mt-4 lg:mt-0'>
              <Image src={forgotImage} alt='RegisterImage' width={650} height={750} className=' rounded-3xl  object-contain w-full '/>
           </div>
           <div>
             <ForgotPasswordForm/>
           </div>
      </div>
    </section>
  )
}

export default LoginPage