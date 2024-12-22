'use client';

import { useEffect, useState } from 'react';
import { Competition } from './schemas/competition';
import Link from 'next/link';

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/api/competitions');
        if (!response.ok) {
          throw new Error('Error al obtener las competencias');
        }
        const data = await response.json();
        setCompetitions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  if (loading) {
    return <div>Cargando competencias...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Competencias</h1>
        <Link
          href="/competitions/new"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear Nueva Competencia
        </Link>
      </div>

      {competitions.length === 0 ? (
        <p>No tienes competencias creadas aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {competitions.map((competition) => (
            <Link
              href={`/competitions/${competition.id}`}
              key={competition.id}
              className="block"
            >
              <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">{competition.name}</h2>
                <p className="text-gray-600 mb-1">Código: {competition.code}</p>
                <p className="text-gray-600 mb-1">
                  Ubicación: {competition.location}
                </p>
                <p className="text-gray-600 mb-1">
                  Fecha:{' '}
                  {new Date(competition.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-600 mb-1">
                  Hora de inicio:{' '}
                  {new Date(competition.startTime).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-gray-600">
                  Duración: {competition.duration} minutos
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
