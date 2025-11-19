'use client';

import { ExamesData } from '@/lib/types';

interface ExamesFormProps {
  data: ExamesData;
  onChange: (data: ExamesData) => void;
  pontuacao: number;
}

export default function ExamesForm({ data, onChange, pontuacao }: ExamesFormProps) {
  const handleChange = (field: keyof ExamesData, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">2. Exames / Renovação de Receita</h3>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          pontuacao >= 3 ? 'bg-danger text-white' :
          pontuacao === 2 ? 'bg-warning text-text' :
          pontuacao === 1 ? 'bg-success text-white' :
          'bg-secondary text-white'
        }`}>
          {pontuacao} ponto{pontuacao !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.veioBem}
            onChange={(e) => handleChange('veioBem', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">Veio bem, sem sintomas</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.hipertensoDiabeticoReceitaAntiga}
            onChange={(e) => handleChange('hipertensoDiabeticoReceitaAntiga', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">
            Hipertenso/Diabético com receita &gt; 6 meses
          </span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.alteracaoNaQueixa}
            onChange={(e) => handleChange('alteracaoNaQueixa', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">Alguma alteração na queixa</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.doencaGrave}
            onChange={(e) => handleChange('doencaGrave', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">
            Doença grave (câncer/infarto/derrame/pós internação)
          </span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.precisaPrioridade}
            onChange={(e) => handleChange('precisaPrioridade', e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">
            Não é urgência, mas precisa ser visto com prioridade
          </span>
        </label>
      </div>
    </div>
  );
}