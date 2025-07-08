import { notFound } from "next/navigation";

import { getCompetitionById } from "@/lib/db/competition";
import { getOrganizerById } from "@/lib/db/organizer";
import { getSignedUrlForReading } from "@/lib/s3";
import { RegisterFormSettings } from "@/types/competition";

import RegisterForm from "./components/RegisterForm";

interface RegisterPageProps {
  params: Promise<{
    organizerId: string;
    competitionId: string;
  }>;
}
export default async function RegisterPage(props: RegisterPageProps) {
  const params = await props.params;
  const competition = await getCompetitionById(parseInt(params.competitionId));
  const organizer = await getOrganizerById(parseInt(params.organizerId));
  let paymentUrl: string | undefined;
  let competitionBasesUrl: string | undefined;

  if (!competition || !organizer) {
    notFound();
  }

  const registerFormSettings = competition.registerFormSettings as RegisterFormSettings;

  if (registerFormSettings.paymentType === 'file') {
    paymentUrl = await getSignedUrlForReading(registerFormSettings.paymentUrl as string);
  }

  if (registerFormSettings.competitionBasesFileUrl) {
    competitionBasesUrl = await getSignedUrlForReading(registerFormSettings.competitionBasesFileUrl as string);
  }

  return <RegisterForm competition={competition} organizer={organizer} paymentUrl={paymentUrl} competitionBasesUrl={competitionBasesUrl} />;
}
