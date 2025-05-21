'use client'
import React, { useState } from 'react'
import Payment1 from '../component/payment/payment1'
import Payment2 from '../component/payment/payment2'
import Payment3 from '../component/payment/payment3'

export default function Payment() {
  const [step, setStep] = useState(1)

  return (
    <>
      {step === 1 && <Payment1 onAddCard={() => setStep(2)} />}
      {step === 2 && <Payment2 onSave={() => setStep(3)} onCancel={() => setStep(1)} />}
      {step === 3 && <Payment3 onAddCard={() => setStep(2)} />}
    </>
  )
}
