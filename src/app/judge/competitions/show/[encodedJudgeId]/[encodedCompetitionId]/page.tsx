import { getProblemsByCompetitionId } from "@/lib/db/problem";
import { decodeIdInBloat } from "@/lib/encoder";

import ShowJudgeCompetition from "./components/ShowJudgeCompetition";

type ShowCompetitionPageProps = Promise<{ encodedCompetitionId: string, encodedJudgeId: string }>;

export default async function ShowCompetitionPage(props: { params: ShowCompetitionPageProps }) {
  const { encodedCompetitionId, encodedJudgeId } = await props.params;
  const competitionId = decodeIdInBloat(encodedCompetitionId);
  const judgeId = decodeIdInBloat(encodedJudgeId);

  // Judge can now access all problems in the competition (sector-based system)
  const problems = await getProblemsByCompetitionId(competitionId);
  
  return (
    <ShowJudgeCompetition competitionId={competitionId} judgeId={judgeId} problems={problems} />
  );
}
