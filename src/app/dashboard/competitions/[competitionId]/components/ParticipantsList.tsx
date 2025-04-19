'use client';

import { ParticipantStatus } from "@prisma/client";
import Link from "next/link";

import { ParticipantWithCompetitionInformation } from "@/types/participant";

interface ParticipantsListProps {
  participants: ParticipantWithCompetitionInformation[];
  competitionId: number;
}

export function ParticipantsList({ participants, competitionId }: ParticipantsListProps) {
  const confirmedParticipants = participants.filter(participant => participant.competitionsInformation.status === ParticipantStatus.CONFIRMED);
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl font-bold">Participantes</h2>
        <Link href={`/dashboard/competitions/${competitionId}/participants`} className="btn btn-primary mb-4">Gestionar participantes</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Puntaje Final</th>
            </tr>
          </thead>
          <tbody>
            {confirmedParticipants.map((participant) => (
              <tr key={participant.id}>
                {Object.entries(participant.competitionsInformation.userInformation as Record<string, string>).map(([key, value]) => (
                  <td key={key}>{key}: {value}</td>
                ))}
                <td>{participant.competitionsInformation.finalScore || 'Pendiente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
