import { getUserFromSession } from "@/lib/auth";
import { getLastCompetitionAverageScoreForOrganizer, getLastNCompetitionsForOrganizer, getThisYearCompetitionsCountForOrganizer } from "@/lib/db/competition";
import { getLastCompetitionParticipantsCountForOrganizer, getParticipantsCountForOrganizer } from "@/lib/db/participant";

import Dashboard from "./components/Dashboard";

export default async function DashboardPage() {
  const user = await getUserFromSession();
  const competitions = await getLastNCompetitionsForOrganizer(user?.organizerId, 5);
  const yearlyCompetitions = await getThisYearCompetitionsCountForOrganizer(user?.organizerId);
  const participants = await getParticipantsCountForOrganizer(user?.organizerId);
  const lastCompetitionParticipants = await getLastCompetitionParticipantsCountForOrganizer(user?.organizerId);
  const averageScore = await getLastCompetitionAverageScoreForOrganizer(user?.organizerId);

  return (
    <div className="min-h-screen bg-base-200">
      <Dashboard
        competitions={competitions}
        yearlyCompetitions={yearlyCompetitions}
        totalParticipants={participants}
        lastCompetitionParticipants={lastCompetitionParticipants}
        averageScore={averageScore} />
    </div>
  );
} 
