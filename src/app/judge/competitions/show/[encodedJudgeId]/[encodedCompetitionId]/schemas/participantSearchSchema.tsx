import { z } from "zod";

export const ParticipantSearchSchema = z.object({
  participantCode: z
    .string({ message: "Código requerido" }),
});

export type ParticipantSearchFormData = z.infer<typeof ParticipantSearchSchema>; 
