'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
  stepTitles?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, onStepClick, stepTitles }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-secondary mb-4">
        <span>Passo {currentStep + 1} de {totalSteps}</span>
        <span>{Math.round(progress)}% concluído</span>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, index) => (
          <button
            key={index}
            onClick={() => onStepClick?.(index)}
            disabled={!onStepClick}
            className={`flex flex-col items-center ${
              onStepClick ? 'cursor-pointer' : 'cursor-default'
            }`}
            aria-label={`Ir para passo ${index + 1}: ${stepTitles?.[index] || `Passo ${index + 1}`}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                index < currentStep
                  ? 'bg-success text-white shadow-md'
                  : index === currentStep
                  ? 'bg-primary text-white border-2 border-primary shadow-lg'
                  : 'bg-secondary text-white'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className={`text-xs mt-2 text-center max-w-20 truncate ${
              index === currentStep ? 'text-primary font-semibold' : 'text-secondary'
            }`}>
              {stepTitles?.[index] || `Passo ${index + 1}`}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full bg-secondary rounded-full h-3">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}