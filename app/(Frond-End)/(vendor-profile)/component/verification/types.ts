
export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  onStepClick: (step: number) => void;
} 