'use client';

import { useState } from 'react';

export default function MobileAlert() {
  const [show, setShow] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      return isMobile;
    }
    return false;
  });

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Dispositivo Não Suportado
        </h3>
        <p className="text-gray-600 mb-6">
          A aplicação está pensada para ser usada no computador.
        </p>
        <p>
          Por favor, acesse através de um computador para uma melhor experiência.
        </p>
        {/* <div className="flex justify-end">
          <button
            onClick={() => setShow(false)}
            className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition-colors"
          >
            OK
          </button>
        </div> */}
      </div>
    </div>
  );
}