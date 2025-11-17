'use client';

import { DorData } from '@/lib/types';

interface DorFormProps {
  data: DorData;
  onChange: (data: DorData) => void;
  pontuacao: number;
}

export default function DorForm({ data, onChange, pontuacao }: DorFormProps) {
  const handleChange = (field: keyof DorData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">1. Dor</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          pontuacao === 3 ? 'bg-red-100 text-red-800' :
          pontuacao === 2 ? 'bg-yellow-100 text-yellow-800' :
          pontuacao === 1 ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {pontuacao} ponto{pontuacao !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intensidade da Dor (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={data.intensidade}
            onChange={(e) => handleChange('intensidade', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span className="font-semibold text-lg">{data.intensidade}</span>
            <span>10</span>
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.temFebre}
              onChange={(e) => handleChange('temFebre', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Tem febre (≥ 37.8ºC)
            </span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.sintomasGraves}
              onChange={(e) => handleChange('sintomasGraves', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Sintomas graves (desmaio, falta de ar, sangramentos)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}