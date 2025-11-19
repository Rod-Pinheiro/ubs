'use client';

import { FormData, ClassificationResult } from '@/lib/types';
import ProgressBar from '@/components/ProgressBar';
import SummaryReview from '@/components/SummaryReview';
import ResultCard from '@/components/ResultCard';
import Header from '@/components/Header';

interface FormWizardProps {
  currentStep: number;
  steps: Array<{
    component: React.ComponentType<any>;
    key: keyof FormData | 'review';
    title: string;
    isReview: boolean;
  }>;
  formData: FormData;
  setFormData: (data: FormData) => void;
  pontuacoes: { [key in keyof FormData]: number };
  resultado: ClassificationResult | null;
  loading: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onResetConfirm: () => void;
  onReset: () => void;
  onStepClick: (step: number) => void;
}

export default function FormWizard({
  currentStep,
  steps,
  formData,
  setFormData,
  pontuacoes,
  resultado,
  loading,
  onNext,
  onPrevious,
  onSubmit,
  onResetConfirm,
  onReset,
  onStepClick,
}: FormWizardProps) {
  const currentStepData = steps[currentStep];
  const CurrentFormComponent = currentStepData.component;
  const isReviewStep = currentStepData.isReview;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReviewStep) {
      await onSubmit(e);
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col">
      <div className="max-w-4xl min-w-1/2 mx-auto flex-1 flex flex-col">
        {/* <Header
          title="Sistema de Classificação de Risco Ambulatorial"
          subtitle="Preencha o formulário abaixo para avaliar o nível de prioridade do atendimento"
        /> */}

        {!resultado && (
          <>
            <ProgressBar
              currentStep={currentStep}
              totalSteps={steps.length}
              onStepClick={onStepClick}
              stepTitles={steps.map(step => step.title)}
            />

            <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out flex-1">
                <h2 className="text-xl font-semibold mb-4">{currentStepData.title}</h2>
                {currentStepData.isReview ? (
                  <SummaryReview formData={formData} pontuacoes={pontuacoes} />
                ) : (
                  <CurrentFormComponent
                    data={formData[currentStepData.key as keyof FormData]}
                    onChange={(data: any) => setFormData({ ...formData, [currentStepData.key]: data })}
                    pontuacao={pontuacoes[currentStepData.key as keyof FormData]}
                  />
                )}
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-gray-50 py-4 border-t border-gray-200 flex justify-center">
                <div className="max-w-4xl w-full px-4 flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="button"
                    onClick={onPrevious}
                    disabled={currentStep === 0}
                    className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 order-1 sm:order-1"
                  >
                    Anterior
                  </button>

                  <button
                    type="button"
                    onClick={onResetConfirm}
                    className="px-6 py-3 bg-danger text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-danger focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 order-3 sm:order-2"
                  >
                    Limpar Formulário
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 order-2 sm:order-3"
                  >
                    {currentStep === steps.length - 1
                      ? (loading ? 'Processando...' : 'Classificar Risco')
                      : 'Próximo'
                    }
                  </button>
                </div>
              </div>
            </form>
          </>
        )}

        {(resultado || loading) && (
          <div className="mt-8">
            <ResultCard resultado={resultado} loading={loading} onBack={onReset} />
          </div>
        )}
      </div>
    </div>
  );
}