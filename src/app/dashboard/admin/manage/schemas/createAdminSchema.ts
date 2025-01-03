import { z } from "zod";

import { cleanRut, validateRut, formatRut } from '@/utils/rutValidator';

export const CreateAdminSchema = z.object({
  name: z.string({ message: "Nombre requerido" })
    .min(3, { message: "Nombre debe tener al menos 3 caracteres" }),
  email: z.string({ message: "Email requerido" })
    .email({ message: "Email inválido" }),
  rut: z.string({ message: "RUT requerido" })
    .min(8, { message: "El RUT debe tener al menos 8 caracteres" })
    .transform(cleanRut)
    .refine(
      (val) => validateRut(val),
      'RUT inválido',
    )
    .transform(formatRut),
  password: z.string({ message: "Contraseña requerida" })
    .min(6, { message: "Contraseña debe tener al menos 6 caracteres" }),
  isSuperAdmin: z.boolean().default(false),
})

export type CreateAdminFormData = z.infer<typeof CreateAdminSchema>; 
