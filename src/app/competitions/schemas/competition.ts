import { z } from 'zod';

export const CompetitionSchema = z.object({
  code: z.string()
    .length(6, "El código debe tener exactamente 6 dígitos")
    .regex(/^\d+$/, "El código solo debe contener números"),
  name: z.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  location: z.string()
    .min(5, "La ubicación debe tener al menos 5 caracteres")
    .max(200, "La ubicación no puede exceder 200 caracteres"),
  date: z.string()
    .refine(date => new Date(date) > new Date(), {
      message: "La fecha debe ser futura"
    }),
  duration: z.number()
    .min(30, "La duración mínima es 30 minutos")
    .max(480, "La duración máxima es 8 horas"),
  startTime: z.string()
    .min(1, "La hora de inicio es requerida")
});

export type Competition = z.infer<typeof CompetitionSchema>;
