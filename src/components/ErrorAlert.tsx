'use client';

interface ErrorAlertProps {
  error: string | null;
  onClose: () => void;
}

export default function ErrorAlert({ error, onClose }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-800 font-medium">Erro</p>
      </div>
      <p className="text-red-700 mt-1">{error}</p>
      <button
        onClick={onClose}
        className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
      >
        Fechar
      </button>
    </div>
  );
}