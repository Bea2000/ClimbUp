'use client';

import { Problem } from "@prisma/client";

import { ParticipantWithCompetitionAndProblems } from "@/types/participant";

import ParticipantProblemRow from "./ParticipantProblemRow";

interface ParticipantsQueueProps {
  participants: ParticipantWithCompetitionAndProblems[];
  setParticipants: React.Dispatch<React.SetStateAction<ParticipantWithCompetitionAndProblems[]>>;
  problems: Problem[];
  competitionId: number;
}

export default function ParticipantsQueue({ participants, setParticipants, problems, competitionId }: ParticipantsQueueProps) {
  if (participants.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-8">
      <h2 className="mb-4 text-xl font-bold">Cola de Participantes</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Información del Participante</th>
              <th>Intentos</th>
              <th>Problema</th>
              <th>Completado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => {
              const possibleProblems = problems.filter((problem) => 
                !participant.competition.problems.find((prob) => 
                  (prob.problemId === problem.id && prob.completed) || 
                  (prob.problemId === problem.id && prob.attempts >= problem.attempts),
                ),
              );

              if (possibleProblems.length === 0) {
                return null;
              }
              
              return <ParticipantProblemRow key={participant.id} participant={participant} problems={possibleProblems} competitionId={competitionId} setParticipants={setParticipants} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
