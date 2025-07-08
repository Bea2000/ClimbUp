import { ParticipantCompetition } from "@prisma/client";

import { getSignedUrlForReading } from "../s3";

export async function getPaymentsFileUrls(participants: ParticipantCompetition[]) {
  return await Promise.all(
    participants.map(async (participant) => {
      const userInformation = participant.userInformation as Record<string, string>;
      const paymentFile = userInformation.paymentFile;
      let paymentFileUrl: string | null = null;
      
      if (paymentFile) {
        paymentFileUrl = await getSignedUrlForReading(paymentFile);
      }
      
      return {
        participantId: participant.participantId,
        paymentFileUrl,
      };
    }),
  );
}
