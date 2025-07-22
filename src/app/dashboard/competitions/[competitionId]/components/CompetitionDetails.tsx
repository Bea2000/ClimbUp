'use client';

import { format } from 'date-fns';

import { StatusBadge } from "@/components/ui/StatusBadge";
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
          <p><span className="font-bold">Fecha:</span> {format(new Date(competition.date), 'dd/MM/yyyy, HH:mm')}</p>
          <p><span className="font-bold">Duración:</span> {competition.duration} minutos</p>
          <p><span className="font-bold">Organizador:</span> {competition.organizer.name}</p>
          <p><span className="font-bold">Estado:</span> <StatusBadge status={competition.status} /></p>
          <div className="flex flex-col gap-2">
            <span className="font-bold">Categorías:</span>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(competition.categories) && competition.categories.length > 0 ? (
                competition.categories.map((category, index) => (
                  <span key={index} className="badge badge-primary">{String(category)}</span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No hay categorías definidas</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
