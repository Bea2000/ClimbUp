import { z } from "zod";

export const ParticipantSearchSchema = z.object({
  participantCode: z
    .string({ message: "Código requerido" })
    .min(5, { message: "El código debe tener al menos 5 caracteres" }),
});

export type ParticipantSearchFormData = z.infer<typeof ParticipantSearchSchema>; 
