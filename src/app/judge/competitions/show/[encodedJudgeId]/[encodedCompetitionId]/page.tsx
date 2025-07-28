import { getJudgeCompetitionProblems } from "@/lib/db/judge";
import { decodeIdInBloat } from "@/lib/encoder";

import ShowJudgeCompetition from "./components/ShowJudgeCompetition";

type ShowCompetitionPageProps = Promise<{ encodedCompetitionId: string, encodedJudgeId: string }>;

export default async function ShowCompetitionPage(props: { params: ShowCompetitionPageProps }) {
  const { encodedCompetitionId, encodedJudgeId } = await props.params;
  const competitionId = decodeIdInBloat(encodedCompetitionId);
  const judgeId = decodeIdInBloat(encodedJudgeId);

  const problems = await getJudgeCompetitionProblems(judgeId, competitionId);
  
  return (
    <ShowJudgeCompetition competitionId={competitionId} judgeId={judgeId} problems={problems} />
  );
}
