'use client';

import { ParticipantStatus } from "@prisma/client";

import { Collapse } from "@/components/ui/Collapse";
import { ParticipantWithUser } from "@/types/participant";

export function ParticipantsList({ participants }: { participants: ParticipantWithUser[] }) {
  const confirmedParticipants = participants.filter(participant => participant.status === ParticipantStatus.CONFIRMED);

  return (
    <Collapse title="Participantes">
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
