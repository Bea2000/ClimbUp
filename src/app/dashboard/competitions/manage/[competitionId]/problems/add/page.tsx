import { getLevelTypeFromCompetitionByCompetitionId } from "@/lib/db/competition";

import AddProblemForm from "./components/AddProblemForm";

interface AddProblemPageProps {
  params: {
    competitionId: string;
  };
}

export default async function AddProblemPage(props: AddProblemPageProps) {
  const params = await props.params;
  const levelType = await getLevelTypeFromCompetitionByCompetitionId(Number(params.competitionId));
  return <AddProblemForm competitionId={Number(params.competitionId)} levelType={levelType} />
}
