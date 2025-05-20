'use client'
import React, { useState } from 'react'
import Profile from '../component/profile-information/profile'
import Verification from '../component/verification/verification'
import Step1 from '../component/verification/step1'
import Step2 from '../component/verification/step2'
import Step3 from '../component/verification/step3'
import Step4 from '../component/verification/step4'
import Step5 from '../component/verification/step5'
import PaymentPage from '../component/payment/paymentpage'
import Withdraw from '../component/withdraw/withdraw'
import RequestPopup from '../component/withdraw/requestmodal'
import ViewModal from '../component/withdraw/viewmodal'
import TransectionHistory from '../component/transection/transectionhistory'
export default function ProfileInfo() {
  const handleNext = () => {}
  const handleBack = () => {}

  return (
    <>
      <Profile />
      <Verification />
      <Step1 onNext={handleNext} />
      <Step2 onNext={handleNext} onBack={handleBack} />
      <Step3 onNext={handleNext} onBack={handleBack} />
      <Step4 onNext={handleNext} onBack={handleBack} />
      <Step5 />
      <PaymentPage />
      <Withdraw />
      <RequestPopup />
      <ViewModal /> 
      <TransectionHistory />
    </>
  )
}
