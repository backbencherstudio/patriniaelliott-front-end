// app/layout.tsx or any other layout file
import ToureClient from '@/components/toure/ToureClient';
import { Suspense } from 'react';


export default function ToureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
    

      {/* Main content */}
      
        <Suspense fallback={<div>Loading...</div>}>
          <ToureClient >{children}</ToureClient>
        </Suspense>
      
    </div>
  );
}