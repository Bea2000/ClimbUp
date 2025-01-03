'use client';

import { Competition } from "@prisma/client";

import RecentCompetitions from "./RecentCompetitions";
import StatsCards from "./StatsCards";
import WelcomeCard from "./WelcomeCard";


interface DashboardProps {
  competitions: Competition[];
  yearlyCompetitions: number;
  totalParticipants: number;
  lastCompetitionParticipants: number;
  scheduledCompetitions: number;
}

export default function Dashboard({ competitions, yearlyCompetitions, totalParticipants, lastCompetitionParticipants, scheduledCompetitions }: DashboardProps) {
  return (
    <div>
      <div className="mx-auto flex flex-col space-y-6 p-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 lg:flex-row">
          <WelcomeCard />
          <StatsCards stats={{ yearlyCompetitions, lastCompetitionParticipants, scheduledCompetitions, totalParticipants }} />
        </div>
        <RecentCompetitions competitions={competitions} />
      </div>
    </div>
  );
}
