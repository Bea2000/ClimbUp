'use client';

import { Competition } from "@prisma/client";

type FoundCompetitionsListProps = {
  competitions: Competition[];
  organizerName: string;
  handleOpenModal: (competition: Competition) => void;
}

export function FoundCompetitionsList({ competitions, organizerName, handleOpenModal }: FoundCompetitionsListProps) {
  return (
    <>
      {competitions.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Competencias Encontradas</h3>
          <div className="space-y-4">
            {competitions.map((competition) => ( competition.date >= new Date() &&
              <div key={competition.id} className="card bg-base-200">
                <div className="card-body">
                  <h4 className="card-title">{competition.name}</h4>
                  <p><strong>Organizador:</strong> {organizerName}</p>
                  <p><strong>Ubicación:</strong> {competition.location}</p>
                  <p><strong>Fecha:</strong> {new Date(competition.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                  <div className="card-actions justify-end">
                    <button onClick={() => handleOpenModal(competition)} className='btn btn-primary'>
                        Ingresar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
