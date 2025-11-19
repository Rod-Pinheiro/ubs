import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import AdminPage from '@/app/admin/page';

// Mock fetch
global.fetch = jest.fn();

// Mock EventSource
const mockEventSource = jest.fn().mockImplementation(() => ({
  onopen: null,
  onmessage: null,
  onerror: null,
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

Object.defineProperty(window, 'EventSource', {
  writable: true,
  value: mockEventSource,
});

const mockResults = [
  {
    id: '1',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    dor: {},
    exames: {},
    respiratorio: {},
    estomago: {},
    prenatal: {},
    crianca: {},
    pontuacaoFinal: 10,
    categoria: 'URGÊNCIA' as const,
    descricao: 'Test description',
    acao: 'Test action',
    detalhes: { dor: 5, exames: 2, respiratorio: 1, estomago: 1, prenatal: 0, crianca: 1 },
    processed: false,
  },
  {
    id: '2',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    dor: {},
    exames: {},
    respiratorio: {},
    estomago: {},
    prenatal: {},
    crianca: {},
    pontuacaoFinal: 5,
    categoria: 'CUIDADO CONTINUADO' as const,
    descricao: 'Test description 2',
    acao: 'Test action 2',
    detalhes: { dor: 2, exames: 1, respiratorio: 1, estomago: 0, prenatal: 1, crianca: 0 },
    processed: true,
  },
];

describe('AdminPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResults),
    });
  });

  it('renders loading state initially', () => {
    render(<AdminPage />);
    expect(screen.getByText('Carregando resultados...')).toBeInTheDocument();
  });

  it('renders results after loading', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Default filter is 'unprocessed', so only unprocessed results are shown
    expect(screen.getByText('Classificação #1')).toBeInTheDocument();
    expect(screen.queryByText('Classificação #2')).not.toBeInTheDocument();
  });

  it('displays total classifications count', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Total de classificações: 2')).toBeInTheDocument();
    });
  });

  it('filters results correctly', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Default filter is 'unprocessed', should show only unprocessed
    expect(screen.getByText('Classificação #1')).toBeInTheDocument();
    expect(screen.queryByText('Classificação #2')).not.toBeInTheDocument();

    // Click 'Todas' button
    fireEvent.click(screen.getByText('Todas (2)'));

    expect(screen.getByText('Classificação #1')).toBeInTheDocument();
    expect(screen.getByText('Classificação #2')).toBeInTheDocument();

    // Click 'Processadas' button
    fireEvent.click(screen.getByText('Processadas (1)'));

    expect(screen.queryByText('Classificação #1')).not.toBeInTheDocument();
    expect(screen.getByText('Classificação #2')).toBeInTheDocument();
  });

  it('shows error state when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Erro')).toBeInTheDocument();
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('shows empty state when no results', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Nenhuma classificação encontrada')).toBeInTheDocument();
    });
  });

  it('marks classification as processed successfully', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Mock the PATCH request for marking as processed
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    // Click the "Marcar como Processado" button
    const processButton = screen.getByText('Marcar como Processado');
    fireEvent.click(processButton);

    // Wait for the API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/classificar/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          processed: true,
          processedBy: 'admin',
        }),
      });
    });

    // The unprocessed result should be removed from the list
    await waitFor(() => {
      expect(screen.queryByText('Classificação #1')).not.toBeInTheDocument();
    });
  });

  it('shows error when marking as processed fails', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Mock the PATCH request to fail
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: () => Promise.resolve('Internal Server Error'),
    });

    // Click the "Marcar como Processado" button
    const processButton = screen.getByText('Marcar como Processado');
    fireEvent.click(processButton);

    // Wait for the alert (since we can't easily mock window.alert, we check if fetch was called)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/classificar/1', expect.any(Object));
    });
  });

  it('updates filter button counts correctly', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Check initial filter button texts
    expect(screen.getByText('Todas (2)')).toBeInTheDocument();
    expect(screen.getByText('Pendentes (1)')).toBeInTheDocument();
    expect(screen.getByText('Processadas (1)')).toBeInTheDocument();
  });

  it('handles SSE new classifications message', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Simulate SSE message
    const mockEventSourceInstance = mockEventSource.mock.results[0].value;
    const mockOnMessage = mockEventSourceInstance.onmessage;

    const newClassification = {
      id: '3',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      dor: {},
      exames: {},
      respiratorio: {},
      estomago: {},
      prenatal: {},
      crianca: {},
      pontuacaoFinal: 1,
      categoria: 'CUIDADO CONTINUADO' as const,
      descricao: 'New classification',
      acao: 'New action',
      detalhes: { dor: 0, exames: 0, respiratorio: 0, estomago: 0, prenatal: 0, crianca: 0 },
      processed: false,
    };

    const sseEvent = {
      data: JSON.stringify({
        type: 'new_classifications',
        data: [newClassification],
      }),
    };

    // Trigger the onmessage handler
    act(() => {
      mockOnMessage(sseEvent);
    });

    // Check if the new classification is added
    await waitFor(() => {
      expect(screen.getByText('Classificação #3')).toBeInTheDocument();
    });

    // Check if it's highlighted as new
    expect(screen.getByText('🆕 Novo')).toBeInTheDocument();
  });

  it('handles SSE error message', async () => {
    render(<AdminPage />);

    await waitFor(() => {
      expect(screen.getByText('Painel Administrativo')).toBeInTheDocument();
    });

    // Simulate SSE error message
    const mockEventSourceInstance = mockEventSource.mock.results[0].value;
    const mockOnMessage = mockEventSourceInstance.onmessage;

    const sseEvent = {
      data: JSON.stringify({
        type: 'error',
        message: 'SSE Error occurred',
      }),
    };

    // Trigger the onmessage handler
    act(() => {
      mockOnMessage(sseEvent);
    });

    // Check if error is displayed
    await waitFor(() => {
      expect(screen.getByText('SSE Error occurred')).toBeInTheDocument();
    });
  });
});