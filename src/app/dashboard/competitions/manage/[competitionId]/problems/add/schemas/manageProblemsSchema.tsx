import { z } from "zod";

export const ManageProblemSchema = z.object({
  level: z.string({ message: "Nivel requerido" }),
  name: z.string().optional(),
  maxPoints: z.number({ message: "Puntos máximos requeridos" }).min(1),
  attempts: z.number({ message: "Intentos requeridos" }).min(1),
  discountPerAttempt: z.number({ message: "Descuento por intento requerido" }).min(0),
});

export type ManageProblemFormData = z.infer<typeof ManageProblemSchema>; 
