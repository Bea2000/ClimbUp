import AddJudgeForm from './components/AddJudgeForm';

interface AddJudgePageProps {
  params: {
    competitionId: string;
  };
}

export default async function AddJudgePage({ params }: AddJudgePageProps) {
  return <AddJudgeForm competitionId={Number(params.competitionId)} />;
}
