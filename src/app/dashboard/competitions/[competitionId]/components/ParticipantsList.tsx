'use client';

import { ParticipantStatus } from "@prisma/client";
import Link from "next/link";

import { Collapse } from "@/components/ui/Collapse";
import { ParticipantWithCompetitionInformation } from "@/types/participant";

interface ConfirmedParticipantsListProps {
  participants: ParticipantWithCompetitionInformation[];
  competitionId: number;
}

export function ConfirmedParticipantsList({ participants, competitionId }: ConfirmedParticipantsListProps) {
  const confirmedParticipants = participants.filter(participant => participant.competitionsInformation.status === ParticipantStatus.CONFIRMED);
  return (
    <Collapse title="Participantes">
      <div className="mb-4 flex justify-end">
        <Link href={`/dashboard/competitions/${competitionId}/participants`} className="btn btn-primary">Gestionar participantes</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
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
    </Collapse>
  );
}
