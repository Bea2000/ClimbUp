import { z } from "zod";

import { RegisterFormSettings } from "@/types/competition";
import { cleanRut, validateRut } from "@/utils/rut";

export function createRegisterFormSchema(registerFormSettings: RegisterFormSettings) {
  const baseSchema = {
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
  };

  if (registerFormSettings.paymentRequired) {
    return z.object({
      ...baseSchema,
      paymentFile: z.instanceof(File).refine((file) => 
        file instanceof File && file.size > 0, {
        message: 'Debes subir un comprobante de pago',
      }),
    });
  }

  return z.object({
    ...baseSchema,
    paymentFile: z.instanceof(File).optional(),
  });
}

export type RegisterFormSchema = z.infer<ReturnType<typeof createRegisterFormSchema>>;
