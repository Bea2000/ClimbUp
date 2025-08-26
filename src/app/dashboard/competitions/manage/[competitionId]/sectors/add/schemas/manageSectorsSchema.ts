import { z } from 'zod';

export const ManageSectorSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  competitionId: z.coerce.number(),
});

export type ManageSectorSchemaType = z.infer<typeof ManageSectorSchema>;
