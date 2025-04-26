import NewPasswordForm from '@/components/AllForm/NewPasswordForm'
import newImage from "@/public/auth/newpassword.jpg"
import Image from 'next/image'
function NewPassword() {
  return (
   <section className='max-w-[1346px] mx-auto min-h-screen flex items-center'>
      <div className=' grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full'>
           <div className=' rounded-3xl overflow-hidden'>
              <Image src={newImage} alt='RegisterImage' width={650} height={750} className=' w-full '/>
           </div>
           <div>
             <NewPasswordForm/>
           </div>
      </div>
    </section>
  )
}

export default NewPassword
