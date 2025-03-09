'use server';

import { notFound } from "next/navigation";

import InfoAlert from "@/components/ui/InfoAlert";
import { getCompetitionByIdWithOrganizerProblemsParticipantsAndJudges } from "@/lib/db/competition";
import { getUnconfirmedParticipantsCountForOrganizer } from "@/lib/db/participant";

import { CompetitionDetails } from "./components/CompetitionDetails";
import { CompetitionStats } from "./components/CompetitionStats";
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

  const unconfirmedParticipants = await getUnconfirmedParticipantsCountForOrganizer(competition.organizerId);

  return (
    <div className="p-4">
      <div className="card bg-base-100 shadow-xl">
        {unconfirmedParticipants > 0 && (
          <InfoAlert
            title="Participantes pendientes de confirmación"
            description={`Tienes ${unconfirmedParticipants} ${unconfirmedParticipants === 1 ? "participante pendiente" : "participantes pendientes"} de confirmación`}
            buttonText="Ver participantes"
            link={`/dashboard/competitions/${competition.id}/participants`} />
        )}
        <div className="card-body">
          <h1 className="card-title mb-6 text-3xl">{competition.name}</h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CompetitionDetails competition={competition} />
            <CompetitionStats competition={competition} />
          </div>

          <div className="divider"></div>
          
          <ProblemsList problems={competition.problems} />

          <div className="divider"></div>
          
          <ParticipantsList participants={competition.participants} competitionId={competition.id} />
        </div>
      </div>
    </div>
  );
}
