import { decodeIdInBloat } from '@/lib/encoder';

import JudgeValidationForm from './components/JudgeValidationForm';

type ShowCompetitionPageProps = Promise<{ encodedCompetitionId: string }>;

export default async function ShowCompetitionPage(props: { params: ShowCompetitionPageProps }) {
  const { encodedCompetitionId } = await props.params;
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
