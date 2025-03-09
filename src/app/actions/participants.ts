'use server';

import { SubmissionResult } from "@conform-to/react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { updateParticipantStatuses } from "@/lib/db/participant";

export async function updateParticipants(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }

  const participantsUpdated = JSON.parse(formData.get('participantsUpdated') as string);

  if (!participantsUpdated) {
    return { status: 'error', error: { message: ['No se ha realizado ningún cambio'] } };
  }

  try {
    await updateParticipantStatuses(participantsUpdated);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al actualizar participantes: ${error as string}`] } };
  }
} 
