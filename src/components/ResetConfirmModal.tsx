'use client';

interface ResetConfirmModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ResetConfirmModal({ show, onCancel, onConfirm }: ResetConfirmModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-white flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Confirmar Limpeza
        </h3>
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja limpar todo o formulário? Todas as respostas serão perdidas.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-secondary text-white rounded hover:opacity-90 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-danger text-white rounded hover:opacity-90 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}