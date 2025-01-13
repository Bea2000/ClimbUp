'use server'

import { SubmissionResult } from "@conform-to/react";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { isCompetitionOfOrganizer } from "@/lib/db/competition";
import { removeProblemFromCompetition } from "@/lib/db/problem";

export async function deleteProblem(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }

  const problemId = parseInt(formData.get('problemId') as string);
  const competitionId = parseInt(formData.get('competitionId') as string);

  const isValidUser = await isCompetitionOfOrganizer(competitionId, session.user.organizerId);

  if (!isValidUser) {
    return { status: 'error', error: { message: ['No tienes permisos para eliminar problemas de esta competencia'] } };
  }

  try {
    await removeProblemFromCompetition(competitionId, problemId);
    revalidatePath(`/dashboard/competitions/manage/${competitionId}/problems`);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al eliminar el problema: ${error as string}`] } };
  }
}
