'use client';

import Stat from "@/components/ui/Stat";
import { CompetitionWithProblemsJudgesAndParticipants } from "@/types/competition";


interface CompetitionStatsProps {
  competition: CompetitionWithProblemsJudgesAndParticipants;
}

export function CompetitionStats({ competition }: CompetitionStatsProps) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title text-xl">Estadísticas</h2>
        <div className="space-y-2">
          <Stat title="Total de Problemas" value={competition.problems.length} />
          <Stat title="Participantes Registrados" value={competition.participants.length} />
          <Stat title="Jueces Asignados" value={competition.judges.length} />
        </div>
      </div>
    </div>
  );
}
