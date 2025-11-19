// 'use client';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <div className="flex justify-between items-center mb-4">
        <a
          href="/admin"
          className="fixed top-0 left-0 px-4 py-2 bg-secondary text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          Painel Admin
        </a>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-12 h-12 mx-2 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
            UBS
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h1>
        </div>
        <p className="text-gray-600">
          {subtitle}
        </p>
      </div>
    </header>
  );
}