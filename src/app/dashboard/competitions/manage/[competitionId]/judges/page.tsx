import { getJudgesByCompetitionId } from '@/lib/db/judge';

import ManageJudges from './components/ManageJudges';

interface ManageJudgesPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function ManageJudgesPage(props: ManageJudgesPageProps) {
  const params = await props.params;
  const judges = await getJudgesByCompetitionId(parseInt(params.competitionId));
  return (
    <ManageJudges
      competitionId={Number(params.competitionId)}
      judges={judges}
    />
  );
} 
