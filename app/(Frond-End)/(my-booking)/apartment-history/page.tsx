'use client'
import React from 'react'
import Apartment from '../component/apartment/apartment'
import Details from '../component/apartment/details'
import ReviewModal from '../component/apartment/reviewmodal'
import { useState } from 'react'

export default function ApartmentHistory() {
  const [selectedApartment, setSelectedApartment] = useState(null)

  const handleViewDetails = (apartment) => {
    setSelectedApartment(apartment)
  }
  const handleBackToList = () => {
    setSelectedApartment(null)
  }

  return (
    <div>
      {!selectedApartment ? (
        <Apartment onViewDetails={handleViewDetails} />
      ) : (
        <Details
          apartment={selectedApartment} 
          onBack={handleBackToList}
        />
      )}
      
     
    </div>
  )
}
