import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { id: 1, title: 'Property details' },
  { id: 2, title: "Owner's details" },
  { id: 3, title: "Manager's details" },
  { id: 4, title: 'Confirmation' }
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, onStepClick }) => {
  const getStepStyle = (step: number) => {
    const isClickable = step <= currentStep;
    const isActive = step === currentStep;
    const baseStyle = "flex items-center gap-2 sm:gap-3 transition-opacity";
    const clickableStyle = isClickable ? "cursor-pointer hover:opacity-80" : "opacity-30";
    const activeStyle = isActive ? "" : "opacity-30";
    return `${baseStyle} ${isClickable ? clickableStyle : activeStyle}`;
  };

  const currentStepObj = steps.find(s => s.id === currentStep);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="inline-flex items-center gap-1 sm:gap-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={getStepStyle(step.id)}
              onClick={() => onStepClick(step.id)}
            >
              <div className="w-7 h-7 sm:w-6 sm:h-6 px-2 py-1 bg-[#d6ae29] rounded-xl flex justify-center items-center">
                <div className="text-[#070707] text-base sm:text-base leading-none">{step.id}</div>
              </div>
              {/* Step title: hidden on xs, show on sm+ */}
              <div className="hidden sm:block text-[#070707] text-base leading-none">{step.title}</div>
            </div>
            {index < steps.length - 1 && (
              <div className="w-6 sm:w-[66px] h-0 outline-1 outline-offset-[-0.50px] outline-[#a5a5ab]" />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Current step title center below bar */}
      {currentStepObj && (
        <div className="mt-2 text-center text-[#070707] text-base sm:text-lg font-medium">
          {currentStepObj.title}
        </div>
      )}
    </div>
  );
};

export default StepIndicator;