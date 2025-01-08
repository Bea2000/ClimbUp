interface CompetitionStatsProps {
  problemsCount: number;
  participantsCount: number;
  judgesCount: number;
}

export function CompetitionStats({ problemsCount, participantsCount, judgesCount }: CompetitionStatsProps) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title text-xl">Estadísticas</h2>
        <div className="stats stats-vertical shadow">
          <div className="stat">
            <div className="stat-title">Total de Problemas</div>
            <div className="stat-value">{problemsCount}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Participantes Registrados</div>
            <div className="stat-value">{participantsCount}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Jueces Asignados</div>
            <div className="stat-value">{judgesCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
