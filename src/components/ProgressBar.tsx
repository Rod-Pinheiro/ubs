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
      <div className="flex justify-between text-sm text-gray-600 mb-4">
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
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                index < currentStep
                  ? 'bg-green-600 text-white'
                  : index === currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-xs text-gray-600 mt-1 text-center max-w-16 truncate">
              {stepTitles?.[index] || `Passo ${index + 1}`}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}