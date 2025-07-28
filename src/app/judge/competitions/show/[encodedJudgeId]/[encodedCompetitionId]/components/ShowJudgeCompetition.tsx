'use client';

import { Problem } from "@prisma/client";
import { useState } from "react";

import { ParticipantWithCompetitionAndProblems } from "@/types/participant";

import ParticipantSearchForm from "./ParticipantSearchForm";
import ParticipantsQueue from "./ParticipantsQueue";

interface ShowJudgeCompetitionProps {
  competitionId: number;
  judgeId: number;
  problems: Problem[];
}

export default function ShowJudgeCompetition({ competitionId, judgeId, problems }: ShowJudgeCompetitionProps) {
  const [participants, setParticipants] = useState<ParticipantWithCompetitionAndProblems[]>([]);

  return (
    <div>
      <ParticipantSearchForm competitionId={competitionId} judgeId={judgeId} setParticipants={setParticipants} participants={participants} />
      <ParticipantsQueue participants={participants} setParticipants={setParticipants} problems={problems} competitionId={competitionId} />
    </div>
  );
}
