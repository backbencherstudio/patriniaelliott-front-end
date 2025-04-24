import RegisterForm from '@/components/AllForm/RegistrationForm'
import regImage from "@/public/auth/registration.jpg"
import Image from 'next/image'

function RegistrationPage() {
  return (
    <section className='max-w-[1346px] mx-auto min-h-screen flex items-center'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden'>
              <Image src={regImage} alt='RegisterImage' width={650} height={750} className=' w-full '/>
           </div>
           <div>
             <RegisterForm/>
           </div>
      </div>
    </section>
  )
}

export default RegistrationPage
