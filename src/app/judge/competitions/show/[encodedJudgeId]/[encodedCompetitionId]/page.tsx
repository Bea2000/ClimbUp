import { decodeIdInBloat } from "@/lib/encoder";

import ParticipantSearchForm from "./components/ParticipantSearchForm";

type ShowCompetitionPageProps = Promise<{ encodedCompetitionId: string, encodedJudgeId: string }>;

export default async function ShowCompetitionPage(props: { params: ShowCompetitionPageProps }) {
  const { encodedCompetitionId, encodedJudgeId } = await props.params;
  const competitionId = decodeIdInBloat(encodedCompetitionId);
  const judgeId = decodeIdInBloat(encodedJudgeId);
  return (
    <div>
      <ParticipantSearchForm competitionId={competitionId} judgeId={judgeId} />
    </div>
  );
}
