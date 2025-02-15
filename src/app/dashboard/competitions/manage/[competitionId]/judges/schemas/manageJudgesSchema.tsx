import { z } from "zod";

import { cleanRut, validateRut, formatRut } from "@/utils/rut";

export const ManageJudgeSchema = z.object({
  competitionId: z.number(),
  name: z.string({ message: "Nombre requerido" }).min(3),
  email: z.string({ message: "Email requerido" }).email("Email inválido"),
  rut: z.string()
    .min(8, 'El RUT debe tener al menos 8 caracteres')
    .transform(cleanRut)
    .refine(
      (val) => validateRut(val),
      'RUT inválido',
    )
    .transform(formatRut),
});

export type ManageJudgeFormData = z.infer<typeof ManageJudgeSchema>; 
