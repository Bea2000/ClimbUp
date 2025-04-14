'use server';

import Link from "next/link";
import { notFound } from "next/navigation";

import InfoAlert from "@/components/ui/InfoAlert";
import { getCompetitionByIdWithOrganizerProblemsParticipantsAndJudges } from "@/lib/db/competition";
import { getUnconfirmedParticipantsCountForOrganizer } from "@/lib/db/participant";

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

  function getRedirectToRegisterForm() {
    if (competition){
      if (competition.registerFormSettings) {
        return `/dashboard/competitions/${competition.id}/register-form/edit`;
      } 
      return `/dashboard/competitions/${competition.id}/register-form/create`;
    }
    return notFound();
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
          <div className="flex justify-between">
            <h1 className="card-title mb-6 text-3xl">{competition.name}</h1>
            <div className="flex gap-2">
              <Link href={getRedirectToRegisterForm()} className="btn btn-primary">{competition.registerFormSettings ? 'Editar formulario de registro' : 'Crear formulario de registro'}</Link>
              <Link href={`/dashboard/competitions/${competition.id}/edit`} className="btn btn-primary">Editar</Link>
            </div>
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
