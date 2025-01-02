import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getCompetitionsForOrganizer } from "@/lib/db/competition";

import CompetitionsList from "./components/CompetitionsList";

export default async function CompetitionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organizerId) {
    redirect("/login");
  }

  const competitions = await getCompetitionsForOrganizer(session.user.organizerId);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Competencias</h1>
        <a
          href="/dashboard/competitions/create"
          className="btn btn-primary"
        >
          Crear Competencia
        </a>
      </div>
      <CompetitionsList competitions={competitions} />
    </div>
  );
}
