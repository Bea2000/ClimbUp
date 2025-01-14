import AddJudgeForm from './components/AddJudgeForm';

interface AddJudgePageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function AddJudgePage(props: AddJudgePageProps) {
  const params = await props.params;
  return <AddJudgeForm competitionId={Number(params.competitionId)} />;
}
