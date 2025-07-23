import Link from "next/link";

import { getUserFromSession } from "@/lib/auth";
import { getCompetitionsByOrganizerId } from "@/lib/db/competition";

import CompetitionsList from "./components/CompetitionsList";

export default async function CompetitionsPage() {
  const user = await getUserFromSession();

  const competitions = await getCompetitionsByOrganizerId(user.organizerId);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Competencias</h1>
        <Link
          href="/dashboard/competitions/create"
          className="btn btn-primary"
        >
          Crear Competencia
        </Link>
      </div>
      <CompetitionsList competitions={competitions} />
    </div>
  );
}
