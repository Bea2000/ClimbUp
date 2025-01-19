'use client';

import { ParticipantWithUser } from "@/types/participant";

export function ParticipantsList({ participants }: { participants: ParticipantWithUser[] }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Participantes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Puntaje Final</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.user.name}</td>
                <td>{participant.user.email}</td>
                <td>{participant.finalScore || 'Pendiente'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
