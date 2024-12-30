import { z } from 'zod';

import { cleanRut, validateRut, formatRut } from '@/utils/rutValidator';

export const signupSchema = z
  .object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: z.string(),
    rut: z.string()
      .min(8, 'El RUT debe tener al menos 8 caracteres')
      .transform(cleanRut)
      .refine(
        (val) => validateRut(val),
        'RUT inválido',
      )
      .transform(formatRut),
    organizerName: z.string().min(2, 'El nombre del organizador debe tener al menos 2 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
