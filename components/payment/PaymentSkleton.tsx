import React from 'react'

function PaymentSkleton() {
  return (
    <div className="w-full">
              <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                {/* Card Skeleton */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg h-48 mb-4 relative overflow-hidden">
                  {/* Card Content Skeleton */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="flex justify-between items-start">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                      <div className="h-6 bg-gray-300 rounded w-12"></div>
                    </div>
                    
                    {/* Middle Section */}
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-300 rounded w-32"></div>
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded w-20"></div>
                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded w-8"></div>
                    </div>
                  </div>
                </div>
                
                {/* Card Info Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
  )
}

export default PaymentSkleton
