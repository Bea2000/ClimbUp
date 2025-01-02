import { decodeIdInBloat } from "@/lib/encoder";

import ParticipantSearchForm from "./components/ParticipantSearchForm";

type ShowCompetitionPageProps = {
  params: {
    encodedCompetitionId: string;
    endodedJudgeId: string;
  };
};

export default async function ShowCompetitionPage({ params }: ShowCompetitionPageProps) {
  const { encodedCompetitionId, endodedJudgeId } = params;
  const competitionId = decodeIdInBloat(encodedCompetitionId);
  const judgeId = decodeIdInBloat(endodedJudgeId);
  return (
    <div>
      <ParticipantSearchForm competitionId={competitionId} judgeId={judgeId} />
    </div>
  );
}
