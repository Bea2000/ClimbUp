import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200 py-12">
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">ClimbUp</h1>
            <p className="py-6 text-xl">Gestión de Competencias de Escalada</p>
            <Link 
              href="/competitions/new"
              className="btn btn-primary"
            >
              Crear Nueva Competencia
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}