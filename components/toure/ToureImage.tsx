import Image from 'next/image'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

function ToureImage({images,isOpen,setIsOpen}:{images:any,isOpen:boolean,setIsOpen:any}) {
     const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());

  const getSlideSrc = (src: string, index: number) => {
    if (!src) return "/empty.png";
    return failedIndices.has(index) ? "/empty.png" : src;
  };

  const handleImageError = (index: number) => {
    setFailedIndices(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };
  return (
    <div>
      <Dialog  open={isOpen} onOpenChange={setIsOpen}>       
      <DialogContent className="sm:max-w-[662px] text-center p-10 h-[90%] overflow-y-auto close">
        <div className='grid grid-cols-1 gap-4'>
            {images.map((image:any,index:number)=>(
                <div key={index}>
                    <Image
                      src={getSlideSrc(image?.file_url, index)}
                      alt={`image ${index}`}
                      width={400}
                      height={200}
                      onError={() => handleImageError(index)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300 !rounded-lg "
                    />
                </div>
            ))}
        </div>
      </DialogContent>
      </Dialog>
    </div>
  )
}

export default ToureImage
