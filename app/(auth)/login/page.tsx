import LoginForm from "@/components/AllForm/LoginForm"
import Loader from "@/components/reusable/Loader"
import loginPage from "@/public/auth/login.jpg"
import Image from "next/image"
import { Suspense } from "react"
function LoginPage() {
  return (
     <section className='max-w-[1346px] mx-auto min-h-screen flex items-center '>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden px-4 xl:px-0 mt-4 lg:mt-0'>
              <Image src={loginPage} alt='RegisterImage' width={650} height={750} className='rounded-3xl object-contain w-full '/>
           </div>
           <Suspense fallback={<div><Loader/></div>}>
             <LoginForm/>
           </Suspense>
      </div>
    </section>
  )
}

export default LoginPage
