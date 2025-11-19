'use client';

import Header from '@/components/Header';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header
          title="Sistema de Classificação de Risco Ambulatorial"
          subtitle="Avalie o nível de prioridade do atendimento médico"
        />

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Bem-vindo ao Sistema de Classificação
          </h2>
          <p className="text-gray-600 mb-6">
            Responda às perguntas abaixo para determinar a prioridade do atendimento.
            O processo é rápido e guiado passo a passo.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
          >
            Começar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}