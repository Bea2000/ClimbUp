import { getParticipantsInformationByCompetitionId } from "@/lib/db/participant";
import { getPaymentsFileUrls } from "@/lib/helpers/participant";

import ParticipantsManage from "./components/ParticipantsManage";

interface ParticipantsManagePageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function ParticipantsManagePage(props: ParticipantsManagePageProps) {
  const params = await props.params;
  const participants = await getParticipantsInformationByCompetitionId(parseInt(params.competitionId));

  const paymentsFileUrls = await getPaymentsFileUrls(participants.map(participant => participant.competitionsInformation));

  return (
    <div className="w-full">
      <ParticipantsManage participants={participants} paymentsFileUrls={paymentsFileUrls} />
    </div>
  )
}
