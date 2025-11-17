'use client';

import { CriancaData } from '@/lib/types';

interface CriancaFormProps {
  data: CriancaData;
  onChange: (data: CriancaData) => void;
  pontuacao: number;
}

export default function CriancaForm({ data, onChange, pontuacao }: CriancaFormProps) {
  const handleChange = (field: keyof CriancaData, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">6. Criança menor de 2 anos</h3>
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
            checked={data.menor2Anos}
            onChange={(e) => handleChange('menor2Anos', e.target.checked)}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-700">Criança menor de 2 anos</span>
        </label>

        {data.menor2Anos && (
          <>
            <label className="flex items-center space-x-3 cursor-pointer ml-6">
              <input
                type="checkbox"
                checked={data.rotinaSemSintomas}
                onChange={(e) => handleChange('rotinaSemSintomas', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Rotina, sem sintomas</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer ml-6">
              <input
                type="checkbox"
                checked={data.sintomasLeves}
                onChange={(e) => handleChange('sintomasLeves', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">
                Sintomas leves (nariz escorrendo, febre leve, tosse leve, bebê brinca normalmente)
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer ml-6">
              <input
                type="checkbox"
                checked={data.sintomasGraves}
                onChange={(e) => handleChange('sintomasGraves', e.target.checked)}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">
                Sintomas graves (catarro forte, esfor&ccedil;o para respirar, febre &ge; 37.8&ordm;C, crian&ccedil;a sonolenta, sem responder)
              </span>
            </label>
          </>
        )}
      </div>
    </div>
  );
}