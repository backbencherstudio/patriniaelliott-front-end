'use client'
import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Verification from '../component/verification/verification'
import Step1 from '../component/verification/step1'
import Step2 from '../component/verification/step2'
import Step3 from '../component/verification/step3'
import Step4 from '../component/verification/step4'
import Step5 from '../component/verification/step5'

interface FormData {
  // Step 1 - Property details
  propertyName: string;
  address: string;
  unitNumber: string;
  zipCode: string;
  city: string;
  country: string;

  // Step 2 - Owner's details
  ownershipType: string;
  firstName: string;
  lastName: string;
  alternativeName: string;

  // Step 3 - Manager's details
  propertyManager: string;
  governmentInvolvement: boolean;
}

// Dropdown options
export const COUNTRIES = [
  'United States of America',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Japan',
  'Singapore'
]

export const OWNERSHIP_TYPES = [
  "I'm an individual running a business",
  'Company or organization',
  'Property management company',
  'Real estate agency',
  'Other'
]

export const MANAGER_TYPES = [
  'Owner',
  'Professional property manager',
  'Family member',
  'Friend',
  'Other'
]

const STORAGE_KEY = 'vendorVerificationData';

export default function VendorVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)

  const methods = useForm<FormData>({
    defaultValues: {
      // Step 1 initial values
      propertyName: '',
      address: '',
      unitNumber: '',
      zipCode: '',
      city: '',
      country: '',

      // Step 2 initial values
      ownershipType: '',
      firstName: '',
      lastName: '',
      alternativeName: '',

      // Step 3 initial values
      propertyManager: '',
      governmentInvolvement: false
    }
  })

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData) as FormData;
      Object.entries(parsedData).forEach(([key, value]) => {
        methods.setValue(key as keyof FormData, value as string | boolean);
      });
    }
  }, []);

  const handleNext = () => {
    // Save current form data to localStorage
    const currentData = methods.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));

    if (currentStep === 4) {
      // Clear localStorage after final submission
      localStorage.removeItem(STORAGE_KEY);
      setIsCompleted(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  }

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    if (currentStep === 4) {
      // Clear localStorage after final submission
      localStorage.removeItem(STORAGE_KEY);
      setIsCompleted(true);
    }
  }

  const handleEdit = () => {
    // Load the last saved data from localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData) as FormData;
      Object.entries(parsedData).forEach(([key, value]) => {
        methods.setValue(key as keyof FormData, value as string | boolean);
      });
    }
    setCurrentStep(4);
    setIsCompleted(false);
  }

  const renderStep = () => {
    const formData = methods.getValues();
    const updateFormData = (updates: Partial<FormData>) => {
      Object.entries(updates).forEach(([key, value]) => {
        methods.setValue(key as keyof FormData, value);
      });
      // Save to localStorage whenever form data is updated
      const updatedData = methods.getValues();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    };

    switch (currentStep) {
      case 1:
        return <Step1 
          onNext={handleNext} 
          currentStep={currentStep} 
          onStepClick={handleStepClick}
        />
      case 2:
        return <Step2 
          onNext={handleNext} 
          onBack={handleBack} 
          currentStep={currentStep} 
          onStepClick={handleStepClick}
          formData={formData}
          updateFormData={updateFormData}
        />
      case 3:
        return <Step3 
          onNext={handleNext} 
          onBack={handleBack} 
          currentStep={currentStep} 
          onStepClick={handleStepClick}
          formData={formData}
          updateFormData={updateFormData}
        />
      case 4:
        return <Step4 
          onNext={handleNext} 
          onBack={handleBack} 
          currentStep={currentStep} 
          onStepClick={handleStepClick}
          formData={formData}
        />
      default:
        return null
    }
  }

  if (isCompleted) {
    return <Step5 onEdit={handleEdit} />
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Verification />
        {renderStep()}
      </form>
    </FormProvider>
  )
}
