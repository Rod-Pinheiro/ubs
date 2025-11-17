'use client';

import { ClassificationResult } from '@/lib/types';

interface ResultCardProps {
  resultado: ClassificationResult | null;
  loading: boolean;
}

export default function ResultCard({ resultado, loading }: ResultCardProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-400">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Processando classificação...</span>
        </div>
      </div>
    );
  }

  if (!resultado) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Preencha o formulário para ver a classificação de risco</p>
        </div>
      </div>
    );
  }

  const getCorBorda = () => {
    switch (resultado.categoria) {
      case 'URGÊNCIA': return 'border-red-500';
      case 'ACESSO AVANÇADO': return 'border-yellow-500';
      case 'CUIDADO CONTINUADO': return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getCorFundo = () => {
    switch (resultado.categoria) {
      case 'URGÊNCIA': return 'bg-red-50';
      case 'ACESSO AVANÇADO': return 'bg-yellow-50';
      case 'CUIDADO CONTINUADO': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  const getCorTexto = () => {
    switch (resultado.categoria) {
      case 'URGÊNCIA': return 'text-red-800';
      case 'ACESSO AVANÇADO': return 'text-yellow-800';
      case 'CUIDADO CONTINUADO': return 'text-green-800';
      default: return 'text-gray-800';
    }
  };

  const getIcone = () => {
    switch (resultado.categoria) {
      case 'URGÊNCIA':
        return (
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'ACESSO AVANÇADO':
        return (
          <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'CUIDADO CONTINUADO':
        return (
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${getCorBorda()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getIcone()}
          <div>
            <h3 className="text-xl font-bold text-gray-800">Resultado da Classificação</h3>
            <p className={`text-lg font-semibold ${getCorTexto()}`}>
              {resultado.categoria}
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full ${getCorFundo()} ${getCorTexto()}`}>
          <span className="text-2xl font-bold">{resultado.pontuacaoFinal}</span>
          <span className="text-sm ml-1">ponto{resultado.pontuacaoFinal !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className={`p-4 rounded-lg ${getCorFundo()}`}>
          <h4 className="font-semibold text-gray-700 mb-2">Descrição</h4>
          <p className="text-gray-600">{resultado.descricao}</p>
        </div>
        <div className={`p-4 rounded-lg ${getCorFundo()}`}>
          <h4 className="font-semibold text-gray-700 mb-2">Ação Recomendada</h4>
          <p className="text-gray-600">{resultado.acao}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-700 mb-3">Pontuação por Categoria</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Dor</span>
            <span className="font-semibold">{resultado.detalhes.dor}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Exames</span>
            <span className="font-semibold">{resultado.detalhes.exames}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Respiratório</span>
            <span className="font-semibold">{resultado.detalhes.respiratorio}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Estômago</span>
            <span className="font-semibold">{resultado.detalhes.estomago}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Pré-natal</span>
            <span className="font-semibold">{resultado.detalhes.prenatal}</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm text-gray-600">Criança</span>
            <span className="font-semibold">{resultado.detalhes.crianca}</span>
          </div>
        </div>
      </div>
    </div>
  );
}