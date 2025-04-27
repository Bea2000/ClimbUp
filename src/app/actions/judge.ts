'use server';

import { SubmissionResult } from "@conform-to/react";
import { Competition, Judge } from "@prisma/client";
import { revalidatePath } from 'next/cache';

import { getCompetitionById, getCompetitionsByJudgeId } from "@/lib/db/competition";
import { createJudge, getJudgeByEmail, linkJudgeWithCompetition, removeJudgeFromCompetitionById, removeJudgeFromProblem } from "@/lib/db/judge";
import { getOrganizerNameById } from "@/lib/db/organizer";
import { linkProblemWithJudge } from "@/lib/db/problem";

type JudgeValidationResult = SubmissionResult & {
  data?: { 
    competitions: Competition[];
    organizerName: string;
    judgeId: number;
  };
};

export async function findJudge(_prevState: unknown, formData: FormData): Promise<JudgeValidationResult> {
  const email = formData.get('email') as string;
  const judge = await getJudgeByEmail(email);

  if (!judge) {
    return {
      status: 'error',
      error: { message: ['No se encontró el juez'] },
    };
  }

  const competitions = await getCompetitionsByJudgeId(judge.id, judge.organizerId);
  const organizerName = await getOrganizerNameById(judge.organizerId);

  if (!organizerName) {
    return {
      status: 'error',
      error: { message: ['No se pudo obtener el nombre del organizador'] },
    };
  }
  
  return {
    status: 'success',
    data: { competitions, organizerName, judgeId: judge.id },
  };
}

interface AssignJudgeResult {
  status: 'success' | 'error';
  error?: { message: string[] }
  action?: 'remove' | 'assign';
}

export async function deleteJudge(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {
  try {
    const competitionId = Number(formData.get('competitionId'));
    const judgeId = Number(formData.get('judgeId'));

    await removeJudgeFromCompetitionById(judgeId, competitionId);

    revalidatePath(`/dashboard/competitions/manage/${competitionId}/judges`);
    
    return {
      status: 'success',
    };
  } catch {
    return { status: 'error', error: { message: ['Error al eliminar el juez'] } };
  }
}

export async function addJudgeToCompetition(_prevState: unknown, formData: FormData, competitionId: number): Promise<SubmissionResult> {

  try {
    const email = formData.get('email') as string;

    let user: Judge | null = null;
    user = await getJudgeByEmail(email);

    if (!user) {
      const competition = await getCompetitionById(competitionId);
      if (!competition) return { status: 'error', error: { message: ['Competencia no encontrada'] } };
      user = await createJudge({
        email,
        organizer: {
          connect: {
            id: competition.organizerId,
          },
        },
      });
    }

    if (!user) {
      return {
        status: 'error',
        error: { message: ['Error al crear el juez'] },
      };
    }

    await linkJudgeWithCompetition(competitionId, user.id);

    revalidatePath(`/dashboard/competitions/manage/${competitionId}/judges`);

    return {
      status: 'success',
    };
  } catch {
    return { status: 'error', error: { message: ['Error al agregar el juez'] } };
  }
}

export async function assignJudgeToProblem(_prevState: unknown, formData: FormData): Promise<AssignJudgeResult> {
  try {
    const judgeId = Number(formData.get('judgeId'));
    const problemId = Number(formData.get('problemId'));
    const action = formData.get('action');

    if (!problemId) {
      return { status: 'error', error: { message: ['Datos inválidos'] } };
    }

    if (action === 'remove') {
      await removeJudgeFromProblem(problemId, judgeId);
      revalidatePath('/dashboard/competitions');
      return { status: 'success', action: 'remove' };
    } 
    if (!judgeId) {
      return { status: 'error', error: { message: ['Datos inválidos'] } };
    }

    await linkProblemWithJudge(problemId, judgeId);

    revalidatePath('/dashboard/competitions');
    return { status: 'success', action: 'assign' };
  } catch {
    return { status: 'error', error: { message: ['Error al gestionar juez del problema'] } };
  }
}
