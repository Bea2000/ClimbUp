import { notFound } from "next/navigation";

import { getCompetitionById } from "@/lib/db/competition";

import CreateCompetitionRegisterForm from "./components/CreateCompetitionRegisterForm";

interface CreateCompetitionRegisterFormPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function CreateCompetitionRegisterFormPage(props: CreateCompetitionRegisterFormPageProps) {
  const params = await props.params;
  const competition = await getCompetitionById(parseInt(params.competitionId));

  if (!competition) {
    notFound();
  }

  return (
    <div className="p-4">
      <CreateCompetitionRegisterForm competition={competition} />
    </div>
  );
  
}
