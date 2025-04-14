import { notFound } from "next/navigation";

import { getCompetitionById } from "@/lib/db/competition";
import { getSignedUrlForReading } from "@/lib/s3";
import { RegisterFormSettings } from "@/types/competition";

import EditCompetitionRegisterForm from "./components/EditCompetitionRegisterForm";

interface EditCompetitionRegisterFormPageProps {
  params: Promise<{
    competitionId: string;
  }>;
}

export default async function EditCompetitionRegisterFormPage(props: EditCompetitionRegisterFormPageProps) {
  const params = await props.params;
  const competition = await getCompetitionById(parseInt(params.competitionId));

  if (!competition) {
    notFound();
  }

  const registerFormSettings = competition.registerFormSettings as RegisterFormSettings;

  let basesUrl: string | undefined;
  let paymentUrl: string | undefined;
  if (registerFormSettings?.competitionBasesFileUrl) {
    basesUrl = await getSignedUrlForReading(registerFormSettings?.competitionBasesFileUrl);
  }

  if (registerFormSettings?.paymentType === 'file' && registerFormSettings?.paymentUrl) {
    paymentUrl = await getSignedUrlForReading(registerFormSettings?.paymentUrl);
  }

  return (
    <div className="p-4">
      <EditCompetitionRegisterForm competition={competition} basesUrl={basesUrl} paymentUrl={paymentUrl} />
    </div>
  );
  
}
