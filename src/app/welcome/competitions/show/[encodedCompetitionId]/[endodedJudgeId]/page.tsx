import { decodeIdInBloat } from "@/lib/encoder";

import ParticipantSearchForm from "./components/ParticipantSearchForm";

type ShowCompetitionPageProps = Promise<{ encodedCompetitionId: string, endodedJudgeId: string }>;

export default async function ShowCompetitionPage(props: { params: ShowCompetitionPageProps }) {
  const { encodedCompetitionId, endodedJudgeId } = await props.params;
  const competitionId = decodeIdInBloat(encodedCompetitionId);
  const judgeId = decodeIdInBloat(endodedJudgeId);
  return (
    <div>
      <ParticipantSearchForm competitionId={competitionId} judgeId={judgeId} />
    </div>
  );
}
