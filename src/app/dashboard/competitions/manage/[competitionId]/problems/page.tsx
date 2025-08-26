'use server'

import { getProblemsWithSectorsByCompetitionId } from '@/lib/db/problem';
import { getSectorsByCompetitionId } from '@/lib/db/sector';

import ManageProblems from './components/ManageProblems';

interface ManageProblemsPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function ManageProblemsPage(props: ManageProblemsPageProps) {
  const params = await props.params;
  const competitionId = parseInt(params.competitionId);
  
  const [problems, sectors] = await Promise.all([
    getProblemsWithSectorsByCompetitionId(competitionId),
    getSectorsByCompetitionId(competitionId),
  ]);
  
  return (
    <ManageProblems
      competitionId={competitionId}
      problems={problems}
      sectors={sectors}
    />
  );
} 
