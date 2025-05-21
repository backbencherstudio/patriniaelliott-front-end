'use client'
import React from 'react'
import Apartment from '../component/apartment/apartment'
import Details from '../component/apartment/details'
import ReviewModal from '../component/apartment/reviewmodal'
import { useState } from 'react'

export default function ApartmentHistory() {
  const [selectedApartment, setSelectedApartment] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const handleViewDetails = (apartment) => {
    setSelectedApartment(apartment)
  }

  const handleWriteReview = () => {
    setShowReviewModal(true)
  }

  const handleCloseReviewModal = () => {
    setShowReviewModal(false)
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
          onWriteReview={handleWriteReview}
          onBack={handleBackToList}
        />
      )}
      
      {showReviewModal && (
        <ReviewModal 
          onClose={handleCloseReviewModal}
          apartment={selectedApartment}
        />
      )}
    </div>
  )
}
