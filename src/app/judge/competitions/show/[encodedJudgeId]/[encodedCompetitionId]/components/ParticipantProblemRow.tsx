import { ParticipantProblem, Problem } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { addProblemInformationToParticipant } from "@/app/actions/participant";
import { ParticipantWithCompetitionAndProblems } from "@/types/participant";

interface ParticipantProblemRowProps {
  participant: ParticipantWithCompetitionAndProblems;
  problems: Problem[];
  competitionId: number;
  setParticipants: React.Dispatch<
    React.SetStateAction<ParticipantWithCompetitionAndProblems[]>
  >;
}

export default function ParticipantProblemRow({
  participant,
  problems,
  competitionId,
  setParticipants,
}: ParticipantProblemRowProps) {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [selectedCompleted, setSelectedCompleted] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [participantProblem, setParticipantProblem] =
    useState<Partial<ParticipantProblem> | null>(null);

  useEffect(() => {
    if (
      participant.competition.problems.find(
        (problem) => problem.problemId === selectedProblem?.id,
      )
    ) {
      const problem = participant.competition.problems.find(
        (problem) => problem.problemId === selectedProblem?.id,
      );
      setParticipantProblem(problem || null);
    } else {
      setParticipantProblem({
        problemId: selectedProblem?.id,
        participantId: participant.id,
        participantCompetitionId: participant.competition.id,
        attempts: 0,
        completed: false,
      });
    }
  }, [
    selectedProblem,
    participant.competition.problems,
    participant.competition.id,
    participant.id,
  ]);

  function handleConfirm(participantId: number) {
    setIsConfirming(true);
    addProblemInformationToParticipant(
      participantId,
      selectedProblem.id,
      competitionId,
      selectedCompleted,
    );
    setParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== participantId),
    );
    toast.success("Problema confirmado correctamente");
    setIsConfirming(false);
  }

  return (
    <div className="grid grid-cols-5 gap-4 items-center w-full">
      <div className="text-sm">
        {participant.competition.userInformation &&
          Object.entries(
            participant.competition.userInformation as Record<string, string>,
          )
            .filter(([key]) => key !== "paymentFile")
            .map(([key, value]) => (
              <p key={key} className="text-gray-400">
                {key}: {value}
              </p>
            ))}
      </div>

      <div>
        <div className="badge badge-primary">
          {participantProblem?.attempts || 0} / {selectedProblem?.attempts || 0}
        </div>
      </div>

      <div>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) =>
            setSelectedProblem(
              problems.find(
                (problem) => problem.id === parseInt(e.target.value),
              ) || problems[0],
            )
          }
          value={selectedProblem?.id}
        >
          {problems.map((problem) => (
            <option key={problem.id} value={problem.id}>
              {problem.name || `Problema ${problem.level}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          onChange={(e) => setSelectedCompleted(e.target.checked)}
          checked={selectedCompleted}
        />
      </div>

      <div>
        <button
          onClick={() => handleConfirm(participant.id)}
          className="btn btn-soft btn-xs"
        >
          {isConfirming ? "Confirmando..." : "Confirmar"}
        </button>
      </div>
    </div>
  );
}
