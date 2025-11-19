'use client';

import { DorData } from '@/lib/types';

interface DorFormProps {
  data: DorData;
  onChange: (data: DorData) => void;
  pontuacao: number;
}

export default function DorForm({ data, onChange, pontuacao }: DorFormProps) {
  const handleChange = (field: keyof DorData, value: DorData[keyof DorData]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-semibold text-text">1. Dor</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            title="Avalie a intensidade da dor e sintomas associados para determinar a prioridade do atendimento"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          pontuacao >= 3 ? 'bg-danger text-white' :
          pontuacao === 2 ? 'bg-warning text-text' :
          pontuacao === 1 ? 'bg-success text-white' :
          'bg-secondary text-white'
        }`}>
          {pontuacao} ponto{pontuacao !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="dor-intensidade" className="block text-sm font-medium text-text mb-4">
            Intensidade da Dor
          </label>
          <div className="text-center mb-4">
            <span className="text-4xl font-bold text-text">{data.intensidade}</span>
            <span className="text-lg text-secondary ml-2">/ 10</span>
          </div>
          <input
            type="range"
            id="dor-intensidade"
            min="0"
            max="10"
            value={data.intensidade}
            onChange={(e) => handleChange('intensidade', parseInt(e.target.value))}
            className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer slider-dor"
            style={{
              background: `linear-gradient(to right, #28A745 0%, #FFC107 50%, #DC3545 100%)`,
            }}
            aria-label="Intensidade da dor no slider"
          />
          <div className="flex justify-between text-xs text-secondary mt-2">
            <span>Nenhuma (0)</span>
            <span>Leve (3)</span>
            <span>Moderada (7)</span>
            <span>Intensa (10)</span>
          </div>
        </div>

        <div>
          <label htmlFor="dor-febre" className="flex items-center space-x-3 cursor-pointer">
            <input
              id="dor-febre"
              type="checkbox"
              checked={data.temFebre}
              onChange={(e) => handleChange('temFebre', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-secondary rounded focus:ring-primary"
              aria-describedby="dor-febre-desc"
            />
            <span id="dor-febre-desc" className="text-sm text-text">
              Tem febre (≥ 37.8ºC)
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="dor-sintomas-graves" className="flex items-center space-x-3 cursor-pointer">
            <input
              id="dor-sintomas-graves"
              type="checkbox"
              checked={data.sintomasGraves}
              onChange={(e) => handleChange('sintomasGraves', e.target.checked)}
              className="w-4 h-4 text-primary bg-background border-secondary rounded focus:ring-primary"
              aria-describedby="dor-sintomas-desc"
            />
            <span id="dor-sintomas-desc" className="text-sm text-text">
              Sintomas graves (desmaio, falta de ar, sangramentos)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}