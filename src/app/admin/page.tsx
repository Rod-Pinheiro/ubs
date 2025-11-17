'use client';

import { useState, useEffect, useRef } from 'react';

interface ClassificationResult {
  id: string;
  createdAt: string;
  updatedAt: string;
  dor: any;
  exames: any;
  respiratorio: any;
  estomago: any;
  prenatal: any;
  crianca: any;
  pontuacaoFinal: number;
  categoria: 'URGÊNCIA' | 'ACESSO AVANÇADO' | 'CUIDADO CONTINUADO';
  descricao: string;
  acao: string;
  detalhes: any;
}

function ResultCard({ result, isNew }: { result: ClassificationResult; isNew?: boolean }) {
  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'URGÊNCIA':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'ACESSO AVANÇADO':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'CUIDADO CONTINUADO':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border p-6 hover:shadow-lg transition-all duration-500 ${isNew ? 'ring-2 ring-blue-400 shadow-lg' : ''}`}>
      {isNew && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            🆕 Novo
          </span>
        </div>
      )}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Classificação #{result.id.slice(-8)}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(result.createdAt)}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(result.categoria)}`}>
          {result.categoria}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Pontuação Final:</p>
          <p className="text-2xl font-bold text-gray-900">{result.pontuacaoFinal}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Descrição:</p>
          <p className="text-sm text-gray-600">{result.descricao}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Ação Recomendada:</p>
          <p className="text-sm text-gray-600">{result.acao}</p>
        </div>

        <div className="pt-3 border-t">
          <p className="text-sm font-medium text-gray-700 mb-2">Pontuações por Categoria:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Dor: <span className="font-medium">{result.detalhes.dor}</span></div>
            <div>Exames: <span className="font-medium">{result.detalhes.exames}</span></div>
            <div>Respiratório: <span className="font-medium">{result.detalhes.respiratorio}</span></div>
            <div>Estômago: <span className="font-medium">{result.detalhes.estomago}</span></div>
            <div>Prenatal: <span className="font-medium">{result.detalhes.prenatal}</span></div>
            <div>Criança: <span className="font-medium">{result.detalhes.crianca}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [newEntries, setNewEntries] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    fetchResults();
    setupSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/classificar');
      if (!response.ok) {
        throw new Error('Erro ao buscar resultados');
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const setupSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource('/api/sse');
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setConnectionStatus('connected');
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'new_classifications') {
          setResults(prevResults => {
            // Add new classifications to the beginning of the array
            const newResults = [...data.data, ...prevResults];
            // Mark new entries for highlighting
            const newIds = data.data.map((item: ClassificationResult) => item.id);
            setNewEntries(newIds);

            // Remove highlight after 5 seconds
            setTimeout(() => {
              setNewEntries(prev => prev.filter(id => !newIds.includes(id)));
            }, 5000);

            return newResults;
          });
        } else if (data.type === 'error') {
          setError(data.message);
          setConnectionStatus('disconnected');
        }
      } catch (err) {
        console.error('Error parsing SSE data:', err);
      }
    };

    eventSource.onerror = () => {
      setConnectionStatus('disconnected');
      setError('Conexão SSE perdida. Tentando reconectar...');

      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        setupSSE();
      }, 5000);
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold">Erro</div>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={fetchResults}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-600';
      case 'connecting':
        return 'text-yellow-600';
      case 'disconnected':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return '🟢 Conectado';
      case 'connecting':
        return '🟡 Conectando...';
      case 'disconnected':
        return '🔴 Desconectado';
      default:
        return '⚪ Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="mt-2 text-gray-600">
                Visualizar resultados das classificações de risco em tempo real
              </p>
            </div>
            <div className={`text-sm font-medium ${getConnectionStatusColor()}`}>
              {getConnectionStatusText()}
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total de classificações: {results.length}
            {newEntries.length > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                (+{newEntries.length} novo{newEntries.length > 1 ? 's' : ''})
              </span>
            )}
          </div>
          <button
            onClick={fetchResults}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Atualizando...' : 'Atualizar Manual'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {results.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma classificação encontrada
            </h3>
            <p className="text-gray-500">
              As classificações aparecerão aqui automaticamente quando forem realizadas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                isNew={newEntries.includes(result.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}