interface Stats {
  yearlyCompetitions: number;
  lastCompetitionParticipants: number;
  averageScore: number;
  totalParticipants: number;
}

export default function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="flex flex-row flex-wrap gap-4 sm:flex-col">
      <div className="stat rounded-lg bg-base-100 shadow">
        <div className="stat-title">Competencias este año</div>
        <div className="stat-value">{stats.yearlyCompetitions}</div>
      </div>
      <div className="stat rounded-lg bg-base-100 shadow">
        <div className="stat-title">Participantes última competencia</div>
        <div className="stat-value">{stats.lastCompetitionParticipants}</div>
      </div>
      <div className="stat rounded-lg bg-base-100 shadow">
        <div className="stat-title">Puntaje promedio</div>
        <div className="stat-value">{stats.averageScore}</div>
      </div>
      <div className="stat rounded-lg bg-base-100 shadow">
        <div className="stat-title">Total participantes</div>
        <div className="stat-value">{stats.totalParticipants}</div>
      </div>
    </div>
  );
} 
