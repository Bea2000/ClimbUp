'use client';

import { Collapse } from "@/components/ui/Collapse";
import { ParticipantStatus } from "@prisma/client";
import Link from "next/link";
import { ParticipantWithUser } from "@/types/participant";

export function ParticipantsList({ participants, competitionId }: { participants: ParticipantWithUser[], competitionId: number }) {
  const confirmedParticipants = participants.filter(participant => participant.status === ParticipantStatus.CONFIRMED);

  return (
    <Collapse title="Participantes">
    <div>
      <div className="flex justify-between">
        <h2 className="mb-4 text-xl font-bold">Participantes</h2>
        <Link href={`/dashboard/competitions/${competitionId}/participants`} className="btn btn-primary mb-4">Gestionar participantes</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Puntaje Final</th>
            </tr>
          </thead>
          <tbody>
            {confirmedParticipants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.user.name}</td>
                <td>{participant.user.email}</td>
                <td>{participant.finalScore || 'Pendiente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Collapse>
  );
}
