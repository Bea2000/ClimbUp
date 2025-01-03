import { z } from "zod";

export const SearchCompetitionSchema = z.object({
  organizerName: z.string({ message: "Nombre del organizador requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
});

export type SearchCompetitionFormData = z.infer<typeof SearchCompetitionSchema>; 
