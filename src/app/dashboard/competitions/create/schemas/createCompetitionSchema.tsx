import { z } from "zod";

export const CreateCompetitionSchema = z.object({
  code: z.string({ message: "Código requerido" }).min(6, { message: "Código debe tener al menos 6 dígitos" }),
  name: z.string({ message: "Nombre requerido" }).min(3, { message: "Nombre debe tener al menos 3 caracteres" }),
  location: z.string({ message: "Ubicación requerida" }).min(3, { message: "Ubicación debe tener al menos 3 caracteres" }),
  date: z.string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Formato de fecha inválido",
    })
    .refine((date) => new Date(date) > new Date(), {
      message: "Fecha debe ser mayor a la fecha actual",
    }),
  duration: z.number({ message: "Duración requerida" }).min(1, { message: "Duración debe ser mayor a 0" }),
});

export type CreateCompetitionFormData = z.infer<typeof CreateCompetitionSchema>;
