'use client'
import React, { useState } from 'react'
import Verification from '../component/verification/verification'
import Step1 from '../component/verification/step1'
import Step2 from '../component/verification/step2'
import Step3 from '../component/verification/step3'
import Step4 from '../component/verification/step4'
import Step5 from '../component/verification/step5'

export default function VendorVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleNext = () => {
    if (currentStep === 4) {
      setIsCompleted(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={handleNext} />
      case 2:
        return <Step2 onNext={handleNext} onBack={handleBack} />
      case 3:
        return <Step3 onNext={handleNext} onBack={handleBack} />
      case 4:
        return <Step4 onNext={handleNext} onBack={handleBack} />
      default:
        return null
    }
  }

  if (isCompleted) {
    return <Step5 />
  }

  return (
    <div className="flex flex-col gap-6">
      <Verification />
      {renderStep()}
    </div>
  )
}
