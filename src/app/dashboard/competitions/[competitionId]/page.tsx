'use server';

import Link from "next/link";
import { notFound } from "next/navigation";

import InfoAlert from "@/components/ui/InfoAlert";
import { getCompetitionByIdWithOrganizerProblemsJudgesAndParticipants } from "@/lib/db/competition";
import { getParticipantsInformationByCompetitionId, getUnconfirmedParticipantsCountForCompetitionByCompetitionId } from "@/lib/db/participant";
import { isCompetitionDatePassed } from "@/lib/utils";

import { CompetitionDetails } from "./components/CompetitionDetails";
import { CompetitionStats } from "./components/CompetitionStats";
import { ConfirmedParticipantsList } from "./components/ParticipantsList";
import { ProblemsList } from "./components/ProblemsList";
import { RegistrationToggle } from "./components/RegistrationToggle";

interface CompetitionPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function CompetitionPage(props: CompetitionPageProps) {
  const params = await props.params;
  const competition = await getCompetitionByIdWithOrganizerProblemsJudgesAndParticipants(parseInt(params.competitionId));
  const participants = await getParticipantsInformationByCompetitionId(parseInt(params.competitionId));

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
  
  const unconfirmedParticipants = await getUnconfirmedParticipantsCountForCompetitionByCompetitionId(competition.id);
  
  const competitionDatePassed = isCompetitionDatePassed(competition.date);

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
          
          <div className="mb-4">
            <RegistrationToggle 
              competitionId={competition.id} 
              initialAcceptsRegistrations={competition.acceptsRegistrations}
              isDisabled={competitionDatePassed}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CompetitionDetails competition={competition} />
            <CompetitionStats competition={competition} />
          </div>

          <div className="divider"></div>
          
          <ProblemsList problems={competition.problems} />

          <div className="divider"></div>
          
          <ConfirmedParticipantsList participants={participants} competitionId={competition.id} />
        </div>
      </div>
    </div>
  );
}
