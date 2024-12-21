import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">ClimbUp</span>
            <span className="block text-indigo-600">Gestión de Competencias de Escalada</span>
          </h1>
          <div className="mt-8 flex justify-center">
            <Link 
              href="/competitions/new"
              className="rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white hover:bg-indigo-700"
            >
              Crear Nueva Competencia
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}