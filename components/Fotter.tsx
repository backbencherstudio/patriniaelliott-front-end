import Link from 'next/link'

function Fotter() {
  return (
    <div className=' px-3 xl:px-10 py-28'>
       <div className='lg:grid grid-cols-12 flex  justify-between items-end lg:items-center  gap-4 text-primaryColor font-mono text-sm font-normal leading-[15px] uppercase'>
        <div className=' lg:col-span-10 flex lg:flex-row flex-col  justify-between gap-5'>
         <Link href="#">Contact</Link>
            <Link href="#">Aidan, Asya & Karen</Link>
            <Link href="#">Toronto, ON</Link>
            <Link href="#">ratemydj@gmail.com</Link>
        </div>
             <div className=' lg:col-span-2 flex justify-end'>
            <Link href="#"><span className=' text-redColor '>@</span> Rate My DJ <br/><span className=' pl-4'>2025</span> </Link>
             </div>
           
       </div>
    </div>
  )
}

export default Fotter
