'use client'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Step1 from '../component/verification/step1'
import Step2 from '../component/verification/step2'
import Step3 from '../component/verification/step3'
import Step4 from '../component/verification/step4'
import Step5 from '../component/verification/step5'
import Verification from '../component/verification/verification'

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

// Common interface for all step components
interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData?: FormData;
  updateFormData?: (updates: Partial<FormData>) => void;
}

const STORAGE_KEY = 'vendorVerificationData';

// Step configuration with proper typing
const STEPS: Array<{
  id: number;
  title: string;
  component: React.ComponentType<StepProps>;
}> = [
  { id: 1, title: 'Property details', component: Step1 },
  { id: 2, title: "Owner's details", component: Step2 },
  { id: 3, title: "Manager's details", component: Step3 },
  { id: 4, title: 'Confirmation', component: Step4 },
];

export default function VendorVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)

  const methods = useForm<FormData>({
    defaultValues: {
      propertyName: '',
      address: '',
      unitNumber: '',
      zipCode: '',
      city: '',
      country: '',
      ownershipType: '',
      firstName: '',
      lastName: '',
      alternativeName: '',
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

  const saveFormData = () => {
    const currentData = methods.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
  }

  const handleNext = () => {
    saveFormData();
    
    if (currentStep === 4) {
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

  const handleEdit = () => {
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

  const updateFormData = (updates: Partial<FormData>) => {
    Object.entries(updates).forEach(([key, value]) => {
      methods.setValue(key as keyof FormData, value);
    });
    saveFormData();
  };

  if (isCompleted) {
    return <Step5 onEdit={handleEdit} />
  }

  // Get current step component
  const CurrentStepComponent = STEPS.find(step => step.id === currentStep)?.component;
  const formData = methods.getValues();

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-6">
        <Verification />
        
        {CurrentStepComponent && (
          <CurrentStepComponent
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
      </form>
    </FormProvider>
  )
}
