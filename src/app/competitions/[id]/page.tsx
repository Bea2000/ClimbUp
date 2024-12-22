'use client';

import { useEffect, useState } from 'react';
import { Competition } from '../schemas/competition';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function CompetitionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const response = await fetch(`/api/competitions/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Competencia no encontrada');
          }
          throw new Error('Error al obtener la competencia');
        }
        const data = await response.json();
        setCompetition(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCompetition();
    }
  }, [params.id]);

  if (loading) {
    return <div>Cargando competencia...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>No se pudo cargar la competencia. Por favor, intenta nuevamente.</p>
    </div>;
  }

  if (!competition) {
    return <div>Competencia no encontrada</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/competitions"
          className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
        >
          ← Volver a competencias
        </Link>
        <h1 className="text-3xl font-bold mb-2">{competition.name}</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Información General</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-semibold">Código:</span> {competition.code}
                </p>
                <p>
                  <span className="font-semibold">Ubicación:</span>{' '}
                  {competition.location}
                </p>
                <p>
                  <span className="font-semibold">Fecha:</span>{' '}
                  {new Date(competition.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p>
                  <span className="font-semibold">Hora de inicio:</span>{' '}
                  {new Date(competition.startTime).toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p>
                  <span className="font-semibold">Duración:</span>{' '}
                  {competition.duration} minutos
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Acciones</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Editar Competencia
                </button>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Gestionar Participantes
                </button>
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
                  Ver Resultados
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
