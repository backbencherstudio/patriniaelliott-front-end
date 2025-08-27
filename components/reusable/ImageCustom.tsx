import Image from 'next/image';
import React, { useState } from 'react'

function ImageCustom({src,index,name,className}:{src:string,index:number,name:string,className?:string}) {
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
      <Image src={getSlideSrc(src, index)} alt={name} width={400} height={200} onError={() => handleImageError(index)} className={className} />
    </div>
  )
}

export default ImageCustom
