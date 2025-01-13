import { getJudgesUsersByCompetitionId } from '@/lib/db/judge';

import ManageJudges from './components/ManageJudges';

interface ManageJudgesPageProps {
  params: {
    competitionId: string;
  };
}

export default async function ManageJudgesPage({ params }: ManageJudgesPageProps) {
  const judges = await getJudgesUsersByCompetitionId(parseInt(params.competitionId));
  return (
    <ManageJudges
      competitionId={parseInt(params.competitionId)}
      judges={judges}
    />
  );
} 
