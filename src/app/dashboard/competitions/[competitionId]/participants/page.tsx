import { getParticipantsWithUserByCompetitionId } from "@/lib/db/participant";

import ParticipantsManage from "./components/ParticipantsManage";

interface ParticipantsManagePageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function ParticipantsManagePage(props: ParticipantsManagePageProps) {
  const params = await props.params;
  const participants = await getParticipantsWithUserByCompetitionId(parseInt(params.competitionId));

  return (
    <div className="w-full">
      <ParticipantsManage participants={participants} />
    </div>
  )
}
