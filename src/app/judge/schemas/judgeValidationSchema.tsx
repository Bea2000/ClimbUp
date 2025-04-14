import { z } from "zod";

import { cleanRut, validateRut, formatRut } from "@/utils/rut";

export const JudgeValidationSchema = z.object({
  rut: z.string({ message: "RUT requerido" })
    .min(8, { message: "El RUT debe tener al menos 8 caracteres" })
    .transform(cleanRut)
    .refine(
      (val) => validateRut(val),
      { message: "RUT inválido" },
    )
    .transform(formatRut),
});

export type JudgeValidationFormData = z.infer<typeof JudgeValidationSchema>; 
