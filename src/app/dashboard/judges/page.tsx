import { getUserFromSession } from "@/lib/auth";
import { getJudgesByOrganizerId } from "@/lib/db/judge";

import JudgesList from "./components/JudgesList";

export default async function JudgesPage() {
  const user = await getUserFromSession();

  const judges = await getJudgesByOrganizerId(user.organizerId);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Jueces</h1>
        <button
          className="btn btn-primary btn-disabled"
        >
          Crear Juez
        </button>
      </div>
      <JudgesList judges={judges} />
    </div>
  );
}
