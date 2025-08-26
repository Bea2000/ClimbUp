'use server';

import { SubmissionResult } from "@conform-to/react";
import { Sector } from "@prisma/client";
import { revalidatePath } from 'next/cache';
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { isCompetitionOfOrganizer } from "@/lib/db/competition";
import { 
  createNewSector, 
  addProblemToSector, 
  deleteSectorById, 
  removeProblemFromSector,
} from '@/lib/db/sector';

type SectorSubmissionResult = SubmissionResult & {
  data?: Sector;
};

export async function assignSectorToProblem(problemId: number, sectorId: number) {
  try {
    await addProblemToSector(problemId, sectorId);
    revalidatePath("/dashboard/competitions/manage/[competitionId]/problems", "page");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to assign sector to problem" };
  }
}

export async function removeSectorFromProblem(problemId: number) {
  try {
    await removeProblemFromSector(problemId);
    revalidatePath('/dashboard/competitions');
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to remove sector from problem' };
  }
}

export async function createSectorAction(_prevState: unknown, formData: FormData): Promise<SectorSubmissionResult> {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }
  
  const competitionId = parseInt(formData.get('competitionId') as string);
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name) {
    return { status: 'error', error: { message: ['El nombre es requerido'] } };
  }

  const isValidUser = await isCompetitionOfOrganizer(competitionId, session.user.organizerId);

  if (!isValidUser) {
    return { status: 'error', error: { message: ['No tienes permisos para crear sectores en esta competencia'] } };
  }
  
  try {
    const sector = await createNewSector({
      name,
      description: description || undefined,
      competition: {
        connect: { id: competitionId },
      },
    });

    revalidatePath('/dashboard/competitions');
    return { status: 'success', data: sector };
  } catch {
    return { status: 'error', error: { message: ['Error al crear el sector'] } };
  }
}

export async function deleteSectorAction(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }
  
  const competitionId = parseInt(formData.get('competitionId') as string);
  const sectorId = parseInt(formData.get('sectorId') as string);

  const isValidUser = await isCompetitionOfOrganizer(competitionId, session.user.organizerId);

  if (!isValidUser) {
    return { status: 'error', error: { message: ['No tienes permisos para eliminar sectores en esta competencia'] } };
  }
  
  try {
    await deleteSectorById(sectorId);
    revalidatePath('/dashboard/competitions');
    return { status: 'success' };
  } catch {
    return { status: 'error', error: { message: ['Error al eliminar el sector'] } };
  }
}
