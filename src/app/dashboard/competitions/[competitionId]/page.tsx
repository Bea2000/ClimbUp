'use server';

import Link from "next/link";
import { notFound } from "next/navigation";

import { getCompetitionByIdWithOrganizerProblemsParticipantsAndJudges } from "@/lib/db/competition";

import { CompetitionDetails } from "./components/CompetitionDetails";
import { CompetitionStats } from "./components/CompetitionStats";
import { JudgesList } from "./components/JudgesList";
import { ParticipantsList } from "./components/ParticipantsList";
import { ProblemsList } from "./components/ProblemsList";

interface CompetitionPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function CompetitionPage(props: CompetitionPageProps) {
  const params = await props.params;
  const competition = await getCompetitionByIdWithOrganizerProblemsParticipantsAndJudges(parseInt(params.competitionId));

  if (!competition) {
    notFound();
  }

  return (
    <div className="p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="card-title text-3xl">{competition.name}</h1>
            <Link
              href={`/dashboard/competitions/${competition.id}/edit`}
              className="btn btn-primary"
            >
              Editar competencia
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CompetitionDetails competition={competition} />
            <CompetitionStats competition={competition} />
          </div>
          <div className="divider"></div>
          <JudgesList judges={competition.judges} competitionId={competition.id} />
          <div className="divider"></div>
          <ProblemsList problems={competition.problems} competitionId={competition.id} />
          <div className="divider"></div>
          <ParticipantsList participants={competition.participants} />
        </div>
      </div>
    </div>
  );
}
