import { decodeIdInBloat } from '@/lib/encoder';

import JudgeValidationForm from './components/JudgeValidationForm';

type ShowCompetitionPageProps = {
  params: {
    encodedCompetitionId: string;
  };
};

export default async function ShowCompetitionPage({ params }: ShowCompetitionPageProps) {
  const { encodedCompetitionId } = await params;
  const competitionId = decodeIdInBloat(encodedCompetitionId);
  
  return (
    <div>
      <JudgeValidationForm 
        competitionId={competitionId} 
        encodedCompetitionId={encodedCompetitionId}
      />
    </div>
  );
}
