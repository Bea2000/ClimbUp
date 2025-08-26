import AddSectorForm from "./components/AddSectorForm";

interface AddSectorPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function AddSectorPage(props: AddSectorPageProps) {
  const params = await props.params;
  return (
    <AddSectorForm 
      competitionId={parseInt(params.competitionId)} 
    />
  );
}
