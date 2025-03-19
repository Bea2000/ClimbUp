import { z } from "zod";

export const createCompetitionRegisterFormSchema = z.object({
  title: z.string({ message: "Título requerido" }),
  description: z.string({ message: "Descripción requerida" }),
  registerFields: z.array(z.string()).min(1, { message: "Se debe agregar al menos un campo para el registro" }),
  isFree: z.string().optional(),
  price: z.string().optional(),
  paymentData: z.instanceof(File).optional(),
  paymentLink: z.string().url({ message: "El link de pago debe ser una URL válida" }).optional(),
  competitionBases: z.instanceof(File).optional(),
  isPaymentToggleChecked: z.string().optional(),
  participantIdentifier: z.string({ message: "Identificador del participante requerido" }),
}).refine(
  (data) => {
    if (data.isFree === 'false' && data.price === '$0') {
      return false;
    }
    return true;
  },
  {
    message: "El precio es requerido",
    path: ["price"],
  },
).refine(
  (data) => {
    if (data.isPaymentToggleChecked === 'false' && !data.paymentLink) {
      return false;
    }
    return true;
  },
  {
    message: "El link de pago es requerido",
    path: ["paymentLink"],
  },
).refine(
  (data) => {
    if (data.isPaymentToggleChecked === 'true' && !data.paymentData) {
      return false;
    }
    return true;
  },
  {
    message: "Los datos de transferencia son requeridos",
    path: ["paymentData"],
  },
);

export const editCompetitionRegisterFormSchema = z.object({
  title: z.string({ message: "Título requerido" }),
  description: z.string({ message: "Descripción requerida" }),
  registerFields: z.array(z.string()).min(1, { message: "Se debe agregar al menos un campo para el registro" }),
  isFree: z.string().optional(),
  price: z.string().optional(),
  paymentData: z.instanceof(File).optional(),
  paymentLink: z.string().url({ message: "El link de pago debe ser una URL válida" }).optional(),
  competitionBases: z.instanceof(File).optional(),
  isPaymentToggleChecked: z.string().optional(),
  participantIdentifier: z.string({ message: "Identificador del participante requerido" }),
}).refine(
  (data) => {
    if (data.isFree === 'false' && data.price === '$0') {
      return false;
    }
    return true;
  },
  {
    message: "El precio es requerido",
    path: ["price"],
  },
);

export type CompetitionRegisterFormData = z.infer<typeof createCompetitionRegisterFormSchema | typeof editCompetitionRegisterFormSchema>;
