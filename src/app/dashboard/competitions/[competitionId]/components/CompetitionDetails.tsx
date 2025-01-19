'use client';

import { CompetitionWithOrganizer } from '@/types/competition';

interface CompetitionDetailsProps {
  competition: CompetitionWithOrganizer;
}

export function CompetitionDetails( { competition }: CompetitionDetailsProps ) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title text-xl">Detalles de la Competencia</h2>
        <div className="space-y-2">
          <p><span className="font-bold">Código:</span> {competition.code}</p>
          <p><span className="font-bold">Ubicación:</span> {competition.location}</p>
          <p><span className="font-bold">Fecha:</span> {new Date(competition.date).toLocaleDateString()}</p>
          <p><span className="font-bold">Duración:</span> {competition.duration} minutos</p>
          <p><span className="font-bold">Organizador:</span> {competition.organizer.name}</p>
        </div>
      </div>
    </div>
  );
}
