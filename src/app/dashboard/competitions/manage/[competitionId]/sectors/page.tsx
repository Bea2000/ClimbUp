import { getSectorsByCompetitionId } from '@/lib/db/sector';

import ManageSectors from './components/ManageSectors';

interface ManageSectorsPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function ManageSectorsPage(props: ManageSectorsPageProps) {
  const params = await props.params;
  const competitionId = parseInt(params.competitionId);
  
  const sectors = await getSectorsByCompetitionId(competitionId);
  
  return (
    <ManageSectors
      competitionId={competitionId}
      sectors={sectors}
    />
  );
}
