import { z } from "zod";

export const ManageJudgeSchema = z.object({
  email: z.string({ message: "Email requerido" }).email("Email inválido"),
});

export type ManageJudgeFormData = z.infer<typeof ManageJudgeSchema>; 
