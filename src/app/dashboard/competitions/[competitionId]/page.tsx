import { notFound } from "next/navigation";

import Stat from "@/components/ui/Stat";
import { getCompetitionByIdWithOrganizerProblemsParticipantsAndJudges } from "@/lib/db/competition";

import { CompetitionDetails } from "./components/CompetitionDetails";
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
          <h1 className="card-title mb-6 text-3xl">{competition.name}</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CompetitionDetails
              competition={competition}
            />
            <Stat title="Problemas" value={competition.problems.length} />
            <Stat title="Participantes" value={competition.participants.length} />
            <Stat title="Jueces" value={competition.judges.length} />
          </div>

          <div className="divider"></div>
          
          <ProblemsList problems={competition.problems} />

          <div className="divider"></div>
          
          <ParticipantsList participants={competition.participants} />
        </div>
      </div>
    </div>
  );
}
