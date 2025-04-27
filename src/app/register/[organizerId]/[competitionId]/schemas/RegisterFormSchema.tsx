import { z } from "zod";

import { RegisterFormSettings } from "@/types/competition";
import { cleanRut, validateRut } from "@/utils/rut";

export function createRegisterFormSchema(registerFormSettings: RegisterFormSettings) {
  return z.object({
    paymentFile: z.instanceof(File).optional().refine((file) => {
      if (file instanceof File) {
        return file.size > 0
      } else if (file === null || file === undefined) {
        return false
      }
      return true
    }, {
      message: 'Debes subir un comprobante de pago',
    }),
    ...Object.fromEntries(
      registerFormSettings.fields.map((field, index) => [
        `field_${index}`, 
        z.string({ message: `Este campo es requerido` }),
      ]),
    ),
    rut: z.string({ message: 'Este campo es requerido' }).refine(
      (data) => {
        if (data.length < 8) {
          return false
        }
        const cleanedRut = cleanRut(data)
        if (!validateRut(cleanedRut)) {
          return false
        }
        return true
      },
      {
        message: 'RUT inválido',
      },
    ),
  })
}

export type RegisterFormSchema = z.infer<ReturnType<typeof createRegisterFormSchema>>;
