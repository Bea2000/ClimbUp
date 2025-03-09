import { ParticipantStatus } from "@prisma/client";
import { z } from "zod";

export const UpdateParticipantsSchema = z.object({
  participantsUpdated: z.string(),
}).refine((data) => {
  try {
    const participantsUpdated = JSON.parse(data.participantsUpdated);
    return Array.isArray(participantsUpdated) && participantsUpdated.every(participant =>
      typeof participant.id === 'number' &&
      Object.values(ParticipantStatus).includes(participant.status),
    );
  } catch {
    return false;
  }
}, {
  path: ['participantsUpdated'],
  message: "Formato de datos inválido",
});

export type UpdateParticipantsFormData = z.infer<typeof UpdateParticipantsSchema>;
