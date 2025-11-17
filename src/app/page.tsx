'use client';

import { useState, useEffect } from 'react';
import { FormData, ClassificationResult } from '@/lib/types';
import { 
  calcularPontuacaoDor, 
  calcularPontuacaoExames, 
  calcularPontuacaoRespiratorio, 
  calcularPontuacaoEstomago, 
  calcularPontuacaoPrenatal, 
  calcularPontuacaoCrianca 
} from '@/lib/classification';

import DorForm from '@/components/forms/DorForm';
import ExamesForm from '@/components/forms/ExamesForm';
import RespiratorioForm from '@/components/forms/RespiratorioForm';
import EstomagoForm from '@/components/forms/EstomagoForm';
import PrenatalForm from '@/components/forms/PrenatalForm';
import CriancaForm from '@/components/forms/CriancaForm';
import ResultCard from '@/components/ResultCard';

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    dor: { intensidade: 0, temFebre: false, sintomasGraves: false },
    exames: { 
      veioBem: false, 
      hipertensoDiabeticoReceitaAntiga: false, 
      alteracaoNaQueixa: false, 
      doencaGrave: false, 
      precisaPrioridade: false 
    },
    respiratorio: { 
      tosseLeve: false, 
      temFebre: false, 
      temCatarro: false, 
      faltaAr: false, 
      chiado: false, 
      esforcoRespirar: false 
    },
    estomago: { 
      enjooDiarreiaLeve: false, 
      dorForteConstante: false, 
      vomitosRepetidos: false, 
      sangue: false, 
      febreAlta: false 
    },
    prenatal: { 
      tudoBem: false, 
      riscoModerado: false, 
      sinaisAlarme: false 
    },
    crianca: { 
      menor2Anos: false, 
      rotinaSemSintomas: false, 
      sintomasLeves: false, 
      sintomasGraves: false 
    }
  });

  const [pontuacoes, setPontuacoes] = useState({
    dor: 0,
    exames: 0,
    respiratorio: 0,
    estomago: 0,
    prenatal: 0,
    crianca: 0
  });

  const [resultado, setResultado] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const novasPontuacoes = {
      dor: calcularPontuacaoDor(formData.dor),
      exames: calcularPontuacaoExames(formData.exames),
      respiratorio: calcularPontuacaoRespiratorio(formData.respiratorio),
      estomago: calcularPontuacaoEstomago(formData.estomago),
      prenatal: calcularPontuacaoPrenatal(formData.prenatal),
      crianca: calcularPontuacaoCrianca(formData.crianca)
    };
    setPontuacoes(novasPontuacoes);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/classificar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar classificação');
      }

      const result = await response.json();
      setResultado(result);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar classificação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      dor: { intensidade: 0, temFebre: false, sintomasGraves: false },
      exames: { 
        veioBem: false, 
        hipertensoDiabeticoReceitaAntiga: false, 
        alteracaoNaQueixa: false, 
        doencaGrave: false, 
        precisaPrioridade: false 
      },
      respiratorio: { 
        tosseLeve: false, 
        temFebre: false, 
        temCatarro: false, 
        faltaAr: false, 
        chiado: false, 
        esforcoRespirar: false 
      },
      estomago: { 
        enjooDiarreiaLeve: false, 
        dorForteConstante: false, 
        vomitosRepetidos: false, 
        sangue: false, 
        febreAlta: false 
      },
      prenatal: { 
        tudoBem: false, 
        riscoModerado: false, 
        sinaisAlarme: false 
      },
      crianca: { 
        menor2Anos: false, 
        rotinaSemSintomas: false, 
        sintomasLeves: false, 
        sintomasGraves: false 
      }
    });
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Classificação de Risco Ambulatorial
          </h1>
          <p className="text-gray-600">
            Preencha o formulário abaixo para avaliar o nível de prioridade do atendimento
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <DorForm 
              data={formData.dor} 
              onChange={(dor) => setFormData({ ...formData, dor })}
              pontuacao={pontuacoes.dor}
            />
            
            <ExamesForm 
              data={formData.exames} 
              onChange={(exames) => setFormData({ ...formData, exames })}
              pontuacao={pontuacoes.exames}
            />
            
            <RespiratorioForm 
              data={formData.respiratorio} 
              onChange={(respiratorio) => setFormData({ ...formData, respiratorio })}
              pontuacao={pontuacoes.respiratorio}
            />
            
            <EstomagoForm 
              data={formData.estomago} 
              onChange={(estomago) => setFormData({ ...formData, estomago })}
              pontuacao={pontuacoes.estomago}
            />
            
            <PrenatalForm 
              data={formData.prenatal} 
              onChange={(prenatal) => setFormData({ ...formData, prenatal })}
              pontuacao={pontuacoes.prenatal}
            />
            
            <CriancaForm 
              data={formData.crianca} 
              onChange={(crianca) => setFormData({ ...formData, crianca })}
              pontuacao={pontuacoes.crianca}
            />
          </div>

          <div className="flex justify-center space-x-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processando...' : 'Classificar Risco'}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Limpar Formulário
            </button>
          </div>
        </form>

        <div className="mt-8">
          <ResultCard resultado={resultado} loading={loading} />
        </div>
      </div>
    </div>
  );
}