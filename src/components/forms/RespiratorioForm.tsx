'use client';

import { RespiratorioData } from '@/lib/types';

interface RespiratorioFormProps {
  data: RespiratorioData;
  onChange: (data: RespiratorioData) => void;
  pontuacao: number;
}

export default function RespiratorioForm({ data, onChange, pontuacao }: RespiratorioFormProps) {
  const handleChange = (field: keyof RespiratorioData, value: boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-cyan-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">3. Sintomas Respiratórios</h3>
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
            checked={data.tosseLeve}
            onChange={(e) => handleChange('tosseLeve', e.target.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-700">Tosse leve</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.temFebre}
            onChange={(e) => handleChange('temFebre', e.target.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-700">Tem febre (&ge; 37.8&ordm;C)</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.temCatarro}
            onChange={(e) => handleChange('temCatarro', e.target.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-700">Tem catarro</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.faltaAr}
            onChange={(e) => handleChange('faltaAr', e.target.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-700">Falta de ar</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.chiado}
            onChange={(e) => handleChange('chiado', e.target.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-700">Chiado no peito</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.esforcoRespirar}
            onChange={(e) => handleChange('esforcoRespirar', e.target.checked)}
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
          />
          <span className="text-sm text-gray-700">Esforço para respirar</span>
        </label>
      </div>
    </div>
  );
}