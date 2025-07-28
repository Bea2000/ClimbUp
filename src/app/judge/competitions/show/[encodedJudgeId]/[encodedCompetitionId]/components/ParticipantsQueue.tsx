"use client";

import { Problem } from "@prisma/client";
import { Reorder, useDragControls } from "framer-motion";

import { ParticipantWithCompetitionAndProblems } from "@/types/participant";

import ParticipantProblemRow from "./ParticipantProblemRow";

interface ParticipantsQueueProps {
  participants: ParticipantWithCompetitionAndProblems[];
  setParticipants: React.Dispatch<
    React.SetStateAction<ParticipantWithCompetitionAndProblems[]>
  >;
  problems: Problem[];
  competitionId: number;
}

interface ReorderableParticipantRowProps {
  participant: ParticipantWithCompetitionAndProblems;
  problems: Problem[];
  competitionId: number;
  setParticipants: React.Dispatch<
    React.SetStateAction<ParticipantWithCompetitionAndProblems[]>
  >;
}

function ReorderableParticipantRow({
  participant,
  problems,
  competitionId,
  setParticipants,
}: ReorderableParticipantRowProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={participant}
      dragListener={false}
      dragControls={controls}
    >
      <div className="border-b border-gray-200 bg-gray hover:bg-gray-800">
        <div className="flex items-center p-4">
          <div
            className="mr-3 w-6 h-6 bg-gray-300 hover:bg-gray-400 cursor-grab active:cursor-grabbing rounded flex items-center justify-center"
            onPointerDown={(e) => controls.start(e)}
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M7 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 2zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 14zm6-8a2 2 0 1 1-.001-4.001A2 2 0 0 1 13 6zm0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 14z" />
            </svg>
          </div>
          <div className="flex-1">
            <ParticipantProblemRow
              participant={participant}
              problems={problems}
              competitionId={competitionId}
              setParticipants={setParticipants}
            />
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
}

export default function ParticipantsQueue({
  participants,
  setParticipants,
  problems,
  competitionId,
}: ParticipantsQueueProps) {
  if (participants.length === 0) {
    return null;
  }

  const filteredParticipants = participants.filter((participant) => {
    const possibleProblems = problems.filter(
      (problem) =>
        !participant.competition.problems.find(
          (prob) =>
            (prob.problemId === problem.id && prob.completed) ||
            (prob.problemId === problem.id && prob.attempts >= problem.attempts),
        ),
    );
    return possibleProblems.length > 0;
  });

  return (
    <div className="mt-4 p-8">
      <h2 className="mb-4 text-xl font-bold">Cola de Participantes</h2>
      <div className="bg-gray rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 font-semibold text-gray-400">
            <div>Información del Participante</div>
            <div>Intentos</div>
            <div>Problema</div>
            <div>Completado</div>
            <div>Acciones</div>
          </div>
        </div>
        <Reorder.Group
          axis="y"
          values={filteredParticipants}
          onReorder={setParticipants}
          className="divide-y divide-gray-200"
        >
          {filteredParticipants.map((participant) => {
            const possibleProblems = problems.filter(
              (problem) =>
                !participant.competition.problems.find(
                  (prob) =>
                    (prob.problemId === problem.id && prob.completed) ||
                    (prob.problemId === problem.id &&
                      prob.attempts >= problem.attempts),
                ),
            );

            return (
              <ReorderableParticipantRow
                key={participant.id}
                participant={participant}
                problems={possibleProblems}
                competitionId={competitionId}
                setParticipants={setParticipants}
              />
            );
          })}
        </Reorder.Group>
      </div>
    </div>
  );
}
