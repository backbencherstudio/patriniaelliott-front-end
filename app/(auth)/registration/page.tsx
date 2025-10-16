import RegisterForm from '@/components/AllForm/RegistrationForm'
import CustomImage from '@/components/reusable/CustomImage'
import regImage from "@/public/auth/registration.jpg"
import Image from 'next/image'

function RegistrationPage() {
  return (
    <section className='max-w-[1346px] mx-auto min-h-screen flex items-center'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden px-4 lg:px-0 mt-4 lg:mt-0'>
              <CustomImage src="/auth/registration.jpg" alt='RegisterImage' width={650} height={750} name='Registration Page' className='rounded-3xl object-contain w-full '/>
           </div>
           <div>
             <RegisterForm/>
           </div>
      </div>
    </section>
  )
}

export default RegistrationPage
