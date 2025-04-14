'use server';

import { notFound } from 'next/navigation';

import { getCompetitionById } from '@/lib/db/competition';

import EditCompetitionForm from './components/EditCompetitionForm';


interface EditCompetitionPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function EditCompetitionPage(props: EditCompetitionPageProps) {
  const params = await props.params;
  const competition = await getCompetitionById(parseInt(params.competitionId));

  if (!competition) {
    notFound();
  }

  return (
    <div className="p-4">
      <EditCompetitionForm competition={competition} />
    </div>
  );
}
