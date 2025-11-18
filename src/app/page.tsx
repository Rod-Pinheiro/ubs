'use client';

import { useState, useEffect } from 'react';
import { FormData, ClassificationResult } from '@/lib/types';
import {
  calcularPontuacaoDor,
  calcularPontuacaoExames,
  calcularPontuacaoRespiratorio,
  calcularPontuacaoEstomago,
  calcularPontuacaoPrenatal,
  calcularPontuacaoCrianca
} from '@/lib/classification';

import DorForm from '@/components/forms/DorForm';
import ExamesForm from '@/components/forms/ExamesForm';
import RespiratorioForm from '@/components/forms/RespiratorioForm';
import EstomagoForm from '@/components/forms/EstomagoForm';
import PrenatalForm from '@/components/forms/PrenatalForm';
import CriancaForm from '@/components/forms/CriancaForm';
import ResultCard from '@/components/ResultCard';
import ProgressBar from '@/components/ProgressBar';
import SummaryReview from '@/components/SummaryReview';

const steps: Array<{
  component: React.ComponentType<any>;
  key: keyof FormData | 'review';
  title: string;
  isReview: boolean;
}> = [
  { component: DorForm, key: 'dor', title: 'Dor', isReview: false },
  { component: ExamesForm, key: 'exames', title: 'Exames', isReview: false },
  { component: RespiratorioForm, key: 'respiratorio', title: 'Respiratório', isReview: false },
  { component: EstomagoForm, key: 'estomago', title: 'Estômago', isReview: false },
  { component: PrenatalForm, key: 'prenatal', title: 'Pré-natal', isReview: false },
  { component: CriancaForm, key: 'crianca', title: 'Criança', isReview: false },
  { component: SummaryReview, key: 'review', title: 'Revisão', isReview: true },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    dor: { intensidade: 0, temFebre: false, sintomasGraves: false },
    exames: {
      veioBem: false,
      hipertensoDiabeticoReceitaAntiga: false,
      alteracaoNaQueixa: false,
      doencaGrave: false,
      precisaPrioridade: false
    },
      respiratorio: {
        tosseLeve: false,
        temFebre: false,
        temCatarro: false,
        faltaAr: false,
        chiado: false,
        esforcoRespirar: false
      },
    estomago: {
      enjooDiarreiaLeve: false,
      dorForteConstante: false,
      vomitosRepetidos: false,
      sangue: false,
      febreAlta: false
    },
    prenatal: {
      tudoBem: false,
      riscoModerado: false,
      sinaisAlarme: false
    },
    crianca: {
      menor2Anos: false,
      rotinaSemSintomas: false,
      sintomasLeves: false,
      sintomasGraves: false
    }
  });

  const [pontuacoes, setPontuacoes] = useState({
    dor: 0,
    exames: 0,
    respiratorio: 0,
    estomago: 0,
    prenatal: 0,
    crianca: 0
  });

  const [_resultado, setResultado] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const novasPontuacoes = {
      dor: calcularPontuacaoDor(formData.dor),
      exames: calcularPontuacaoExames(formData.exames),
      respiratorio: calcularPontuacaoRespiratorio(formData.respiratorio),
      estomago: calcularPontuacaoEstomago(formData.estomago),
      prenatal: calcularPontuacaoPrenatal(formData.prenatal),
      crianca: calcularPontuacaoCrianca(formData.crianca)
    };
    setPontuacoes(novasPontuacoes);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/classificar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar classificação');
      }

      const result = await response.json();
      setResultado(result);
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao processar classificação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setFormData({
      dor: { intensidade: 0, temFebre: false, sintomasGraves: false },
      exames: {
        veioBem: false,
        hipertensoDiabeticoReceitaAntiga: false,
        alteracaoNaQueixa: false,
        doencaGrave: false,
        precisaPrioridade: false
      },
      respiratorio: {
        tosseLeve: false,
        temFebre: false,
        temCatarro: false,
        faltaAr: false,
        chiado: false,
        esforcoRespirar: false
      },
      estomago: {
        enjooDiarreiaLeve: false,
        dorForteConstante: false,
        vomitosRepetidos: false,
        sangue: false,
        febreAlta: false
      },
      prenatal: {
        tudoBem: false,
        riscoModerado: false,
        sinaisAlarme: false
      },
      crianca: {
        menor2Anos: false,
        rotinaSemSintomas: false,
        sintomasLeves: false,
        sintomasGraves: false
      }
    });
    setResultado(null);
  };

  const currentStepData = steps[currentStep];
  const CurrentFormComponent = currentStepData.component;
  const isReviewStep = currentStepData.isReview;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isReviewStep) {
      await handleSubmit(e);
    } else {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="absolute top-0 left-0 mb-4">
            <a
              href="/admin"
              className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
            >
              Painel Admin
            </a>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Classificação de Risco Ambulatorial
          </h1>
          <p className="text-gray-600">
            Preencha o formulário abaixo para avaliar o nível de prioridade do atendimento
          </p>
        </header>

        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
          onStepClick={(step) => setCurrentStep(step)}
          stepTitles={steps.map(step => step.title)}
        />

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out">
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

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 order-1 sm:order-1"
            >
              Anterior
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-6 py-3 bg-red-300 text-red-700 font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 order-3 sm:order-2"
            >
              Limpar Formulário
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 order-2 sm:order-3"
            >
              {currentStep === steps.length - 1
                ? (loading ? 'Processando...' : 'Classificar Risco')
                : 'Próximo'
              }
            </button>
          </div>
        </form>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Confirmar Limpeza
              </h3>
              <p className="text-gray-600 mb-6">
                Tem certeza que deseja limpar todo o formulário? Todas as respostas serão perdidas.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    handleReset();
                    setShowResetConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          {/* <ResultCard resultado={resultado} loading={loading} /> */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800 font-medium">Erro</p>
              </div>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}