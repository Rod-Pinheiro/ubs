'use client';

import { EstomagoData } from '@/lib/types';

interface EstomagoFormProps {
  data: EstomagoData;
  onChange: (data: EstomagoData) => void;
  pontuacao: number;
}

export default function EstomagoForm({ data, onChange, pontuacao }: EstomagoFormProps) {
  const handleChange = (field: keyof EstomagoData, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">4. Estômago / Intestino</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          pontuacao === 3 ? 'bg-red-100 text-red-800' :
          pontuacao === 2 ? 'bg-yellow-100 text-yellow-800' :
          pontuacao === 1 ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {pontuacao} ponto{pontuacao !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.enjooDiarreiaLeve}
            onChange={(e) => handleChange('enjooDiarreiaLeve', e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">
            Enjoo/diarreia leve (at&eacute; 5x/dia, sem sangue, febre &le; 37.8&ordm;C)
          </span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.dorForteConstante}
            onChange={(e) => handleChange('dorForteConstante', e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Dor de barriga forte ou constante</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.vomitosRepetidos}
            onChange={(e) => handleChange('vomitosRepetidos', e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Vômitos repetidos</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.sangue}
            onChange={(e) => handleChange('sangue', e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Presença de sangue</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.febreAlta}
            onChange={(e) => handleChange('febreAlta', e.target.checked)}
            className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="text-sm text-gray-700">Febre alta (&ge; 38.5&ordm;C)</span>
        </label>
      </div>
    </div>
  );
}