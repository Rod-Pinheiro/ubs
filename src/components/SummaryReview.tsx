'use client';

import { FormData } from '@/lib/types';

interface SummaryReviewProps {
  formData: FormData;
  pontuacoes: Record<keyof FormData, number>;
}

export default function SummaryReview({ formData, pontuacoes }: SummaryReviewProps) {
  const getResumoDor = () => {
    const { intensidade, temFebre, sintomasGraves } = formData.dor;
    return `Intensidade: ${intensidade}/10${temFebre ? ', Com febre' : ''}${sintomasGraves ? ', Sintomas graves' : ''}`;
  };

  const getResumoExames = () => {
    const { veioBem, hipertensoDiabeticoReceitaAntiga, alteracaoNaQueixa, doencaGrave, precisaPrioridade } = formData.exames;
    const respostas = [];
    if (veioBem) respostas.push('Veio bem');
    if (hipertensoDiabeticoReceitaAntiga) respostas.push('Hipertenso/diabetico com receita antiga');
    if (alteracaoNaQueixa) respostas.push('Alteração na queixa');
    if (doencaGrave) respostas.push('Doença grave');
    if (precisaPrioridade) respostas.push('Precisa prioridade');
    return respostas.length > 0 ? respostas.join(', ') : 'Nenhuma opção selecionada';
  };

  const getResumoRespiratorio = () => {
    const { tosseLeve, temFebre, temCatarro, faltaAr, chiado, esforcoRespirar } = formData.respiratorio;
    const sintomas = [];
    if (tosseLeve) sintomas.push('Tosse leve');
    if (temFebre) sintomas.push('Febre');
    if (temCatarro) sintomas.push('Catarro');
    if (faltaAr) sintomas.push('Falta de ar');
    if (chiado) sintomas.push('Chiado');
    if (esforcoRespirar) sintomas.push('Esforço para respirar');
    return sintomas.length > 0 ? sintomas.join(', ') : 'Nenhum sintoma selecionado';
  };

  const getResumoEstomago = () => {
    const { enjooDiarreiaLeve, dorForteConstante, vomitosRepetidos, sangue, febreAlta } = formData.estomago;
    const sintomas = [];
    if (enjooDiarreiaLeve) sintomas.push('Enjôo/diarréia leve');
    if (dorForteConstante) sintomas.push('Dor forte/constante');
    if (vomitosRepetidos) sintomas.push('Vômitos repetidos');
    if (sangue) sintomas.push('Sangue');
    if (febreAlta) sintomas.push('Febre alta');
    return sintomas.length > 0 ? sintomas.join(', ') : 'Nenhum sintoma selecionado';
  };

  const getResumoPrenatal = () => {
    const { tudoBem, riscoModerado, sinaisAlarme } = formData.prenatal;
    if (tudoBem) return 'Tudo bem';
    if (riscoModerado) return 'Risco moderado';
    if (sinaisAlarme) return 'Sinais de alarme';
    return 'Nenhuma opção selecionada';
  };

  const getResumoCrianca = () => {
    const { menor2Anos, rotinaSemSintomas, sintomasLeves, sintomasGraves } = formData.crianca;
    if (menor2Anos) return 'Menor de 2 anos';
    if (rotinaSemSintomas) return 'Rotina sem sintomas';
    if (sintomasLeves) return 'Sintomas leves';
    if (sintomasGraves) return 'Sintomas graves';
    return 'Nenhuma opção selecionada';
  };

  return (
    <div className="space-y-6 max-h-[70vh] flex flex-col">
      <div className="text-center flex-shrink-0">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Revisão das Respostas</h3>
        <p className="text-gray-600">Confira suas respostas antes de classificar o risco</p>
      </div>

      <div className="grid gap-4 overflow-y-auto flex-1">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Dor</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              pontuacoes.dor === 3 ? 'bg-red-100 text-red-800' :
              pontuacoes.dor === 2 ? 'bg-yellow-100 text-yellow-800' :
              pontuacoes.dor === 1 ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {pontuacoes.dor} ponto{pontuacoes.dor !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{getResumoDor()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Exames</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              pontuacoes.exames === 3 ? 'bg-red-100 text-red-800' :
              pontuacoes.exames === 2 ? 'bg-yellow-100 text-yellow-800' :
              pontuacoes.exames === 1 ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {pontuacoes.exames} ponto{pontuacoes.exames !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{getResumoExames()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Respiratório</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              pontuacoes.respiratorio === 3 ? 'bg-red-100 text-red-800' :
              pontuacoes.respiratorio === 2 ? 'bg-yellow-100 text-yellow-800' :
              pontuacoes.respiratorio === 1 ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {pontuacoes.respiratorio} ponto{pontuacoes.respiratorio !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{getResumoRespiratorio()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Estômago</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              pontuacoes.estomago === 3 ? 'bg-red-100 text-red-800' :
              pontuacoes.estomago === 2 ? 'bg-yellow-100 text-yellow-800' :
              pontuacoes.estomago === 1 ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {pontuacoes.estomago} ponto{pontuacoes.estomago !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{getResumoEstomago()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Pré-natal</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              pontuacoes.prenatal === 3 ? 'bg-red-100 text-red-800' :
              pontuacoes.prenatal === 2 ? 'bg-yellow-100 text-yellow-800' :
              pontuacoes.prenatal === 1 ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {pontuacoes.prenatal} ponto{pontuacoes.prenatal !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{getResumoPrenatal()}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Criança</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              pontuacoes.crianca === 3 ? 'bg-red-100 text-red-800' :
              pontuacoes.crianca === 2 ? 'bg-yellow-100 text-yellow-800' :
              pontuacoes.crianca === 1 ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {pontuacoes.crianca} ponto{pontuacoes.crianca !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{getResumoCrianca()}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex-shrink-0">
        <h4 className="font-semibold text-blue-800 mb-2">Pontuação Total</h4>
        <p className="text-blue-600 text-lg font-bold">
          {Object.values(pontuacoes).reduce((sum, score) => sum + score, 0)} pontos
        </p>
      </div>
    </div>
  );
}