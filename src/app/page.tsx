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
import SummaryReview from '@/components/SummaryReview';
import WelcomeScreen from '@/components/WelcomeScreen';
import FormWizard from '@/components/FormWizard';
import ResetConfirmModal from '@/components/ResetConfirmModal';
import ErrorAlert from '@/components/ErrorAlert';

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
  const [hasStarted, setHasStarted] = useState(false);
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

  const [resultado, setResultado] = useState<ClassificationResult | null>(null);
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
    setHasStarted(false);
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

  if (!hasStarted) {
    return <WelcomeScreen onStart={() => setHasStarted(true)} />;
  }

  return (
    <>
      <FormWizard
        currentStep={currentStep}
        steps={steps}
        formData={formData}
        setFormData={setFormData}
        pontuacoes={pontuacoes}
        resultado={resultado}
        loading={loading}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        onResetConfirm={() => setShowResetConfirm(true)}
        onReset={handleReset}
        onStepClick={setCurrentStep}
      />
      <ResetConfirmModal
        show={showResetConfirm}
        onCancel={() => setShowResetConfirm(false)}
        onConfirm={() => {
          handleReset();
          setShowResetConfirm(false);
        }}
      />
      <ErrorAlert
        error={error}
        onClose={() => setError(null)}
      />
    </>
  );
}