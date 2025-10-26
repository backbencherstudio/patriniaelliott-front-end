import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='  h-screen  text-center flex justify-center items-center'>
      <div className='space-y-3 flex flex-col justify-center w-full items-center'>
        <Image src="/admin/notfoundicon.svg" alt="not found" width={200} height={200} />
      <h2 className=' text-2xl font-bold'>Not Found</h2>
      <p className=' '>Could not find requested resource</p>
      <div>

      <Link href="/" className=' text-primaryColor underline text-lg '>Return your Home</Link>
      </div>
      </div>
     
    </div>
    )}
// ===