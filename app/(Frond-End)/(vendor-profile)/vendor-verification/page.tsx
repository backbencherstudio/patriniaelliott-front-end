'use client'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Step1 from '../component/verification/step1'
import Step2 from '../component/verification/step2'
import Step3 from '../component/verification/step3'
import Step4 from '../component/verification/step4'
import Step5 from '../component/verification/step5'
import Verification from '../component/verification/verification'
import { useVendorVerification } from '@/hooks/useVendorVerification'
import { CustomToast } from '@/lib/Toast/CustomToast'

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
  owners: Array<{ firstName: string; lastName: string }>;

  // Step 3 - Manager's details
  propertyManager: string;
  governmentInvolvement: string;
}

// Common interface for all step components
interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  isSubmitting?: boolean;
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

// Function to save form data to localStorage
const saveFormData = (data: Partial<FormData>) => {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    const parsedData = existingData ? JSON.parse(existingData) : {};
    const updatedData = { ...parsedData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
  }
};

export default function VendorVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { submitVerification, loading: apiLoading, error: apiError, clearError } = useVendorVerification()
  
  // Clear any API errors when component mounts
  useEffect(() => {
    if (apiError) {
      clearError();
    }
  }, [apiError, clearError]);

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
      owners: [{ firstName: '', lastName: '' }],
      propertyManager: '',
      governmentInvolvement: ''
    }
  })

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData;
        Object.entries(parsedData).forEach(([key, value]) => {
          methods.setValue(key as keyof FormData, value);
        });
      } catch (error) {
      }
    }
  }, [methods]);

  // Watch form changes and save to localStorage
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (Object.keys(value).length > 0) {
        const formattedValue = {
          ...value,
          owners: value.owners?.map((owner: any) => ({
            firstName: owner.firstName || '',
            lastName: owner.lastName || ''
          })) || []
        };
        saveFormData(formattedValue as FormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  // Function to submit form data to API
  const submitFormData = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await submitVerification(formData);
      
      if (response.success) {
        CustomToast.show('Vendor verification submitted successfully');
        // Clear localStorage after successful submission
        localStorage.removeItem(STORAGE_KEY);
        setIsCompleted(true);
      } else {
        throw new Error(response.error || 'Failed to submit verification data');
      }
    } catch (error) {
      CustomToast.show(error instanceof Error ? error.message : 'Failed to submit verification data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    const currentData = methods.getValues();
    saveFormData(currentData);
    
    if (currentStep === 4) {
      // Get all form data and validate before submitting
      const formData = methods.getValues();
      
      // Validate required fields
      const requiredFields = [
        'propertyName', 'address', 'zipCode', 'city', 'country',
        'ownershipType', 'propertyManager', 'governmentInvolvement'
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        CustomToast.show(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
      
      // Validate owners array
      if (!formData.owners || formData.owners.length === 0 || 
          formData.owners.some(owner => !owner.firstName || !owner.lastName)) {
        CustomToast.show('Please add at least one owner with first and last name');
        return;
      }
      
      // Submit the form data
      submitFormData(formData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }

  const handleBack = () => {
    const currentData = methods.getValues();
    saveFormData(currentData);
    setCurrentStep(prev => prev - 1);
  }

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      const currentData = methods.getValues();
      saveFormData(currentData);
      setCurrentStep(step);
    }
  }

  const handleEdit = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData;
        Object.entries(parsedData).forEach(([key, value]) => {
          methods.setValue(key as keyof FormData, value);
        });
      } catch (error) {
      }
    }
    setCurrentStep(4);
    setIsCompleted(false);
  }

  const updateFormData = (updates: Partial<FormData>) => {
    Object.entries(updates).forEach(([key, value]) => {
      methods.setValue(key as keyof FormData, value);
    });
    saveFormData(updates); // Save updates directly
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
            isSubmitting={isSubmitting}
          />
        )}

        {/* Show loading state during submission */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0068ef]"></div>
              <p className="text-[#070707]">Submitting your verification data...</p>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  )
}
