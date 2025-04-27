'use server'

import { getJudgesByCompetitionId } from '@/lib/db/judge';
import { getProblemsWithJudgesByCompetitionId } from '@/lib/db/problem';

import ManageProblems from './components/ManageProblems';

interface ManageProblemsPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function ManageProblemsPage(props: ManageProblemsPageProps) {
  const params = await props.params;
  const problems = await getProblemsWithJudgesByCompetitionId(parseInt(params.competitionId));
  const judges = await getJudgesByCompetitionId(parseInt(params.competitionId));
  return (
    <ManageProblems
      competitionId={parseInt(params.competitionId)}
      problems={problems}
      judges={judges}
    />
  );
} 
