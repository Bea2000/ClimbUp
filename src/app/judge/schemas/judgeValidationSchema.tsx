import { z } from "zod";

export const JudgeValidationSchema = z.object({
  email: z.string({ message: "Email requerido" })
    .email({ message: "Email inválido" }),
});

export type JudgeValidationFormData = z.infer<typeof JudgeValidationSchema>; 
