'use client';

import { PrenatalData } from '@/lib/types';

interface PrenatalFormProps {
  data: PrenatalData;
  onChange: (data: PrenatalData) => void;
  pontuacao: number;
}

export default function PrenatalForm({ data, onChange, pontuacao }: PrenatalFormProps) {
  const handleChange = (field: keyof PrenatalData, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">5. Consulta Pré-natal</h3>
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
            checked={data.tudoBem}
            onChange={(e) => handleChange('tudoBem', e.target.checked)}
            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
          />
          <span className="text-sm text-gray-700">Tudo bem, sem problemas</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.riscoModerado}
            onChange={(e) => handleChange('riscoModerado', e.target.checked)}
            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
          />
          <span className="text-sm text-gray-700">
            Risco moderado (pressão alta, bebê não mexendo, vômitos excessivos, alteração urinária)
          </span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.sinaisAlarme}
            onChange={(e) => handleChange('sinaisAlarme', e.target.checked)}
            className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
          />
          <span className="text-sm text-gray-700">
            Sinais de alarme (sangramento, perda de líquido, dor intensa)
          </span>
        </label>
      </div>
    </div>
  );
}