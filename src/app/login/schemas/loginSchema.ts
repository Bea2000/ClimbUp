import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>; 