'use server';

import { SubmissionResult } from "@conform-to/react";
import { Competition, User } from "@prisma/client";
import { revalidatePath } from 'next/cache';

import { ManageJudgeSchema } from '@/app/dashboard/competitions/manage/[competitionId]/judges/schemas/manageJudgesSchema';
import { getUserFromSession } from '@/lib/auth';
import { getCompetitionsByJudgeId } from "@/lib/db/competition";
import { getJudgeByRut, findJudgeByUserIdAndCompetitionId, linkJudgeWithUser, removeJudgeFromCompetitionById, removeJudgeFromProblem } from "@/lib/db/judge";
import { getOrganizerNameById } from "@/lib/db/organizer";
import { updateProblemJudge } from '@/lib/db/problem';
import { createJudgeUser, findUserByEmailOrRut } from '@/lib/db/user';
import { normalizeRut } from "@/utils/rut";

type JudgeValidationResult = SubmissionResult & {
  data?: { 
    competitions: Competition[];
    organizerName: string;
    judgeId: number;
  };
};

export async function findJudge(_prevState: unknown, formData: FormData): Promise<JudgeValidationResult> {
  const rut = normalizeRut(formData.get('rut') as string);
  const judge = await getJudgeByRut(rut);

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
    return {
      status: 'error',
      error: {
        message: ['Error al eliminar el juez'],
      },
    };
  }
}

export async function addJudgeToCompetition(_prevState: unknown, formData: FormData): Promise<SubmissionResult> {

  try {
    const userSession = await getUserFromSession();
    const parsed = ManageJudgeSchema.parse({
      competitionId: Number(formData.get('competitionId')),
      name: formData.get('name'),
      email: formData.get('email'),
      rut: formData.get('rut'),
    });

    let user: User | null = null;

    user = await findUserByEmailOrRut(parsed.email, parsed.rut);

    if (!user) {
      user = await createJudgeUser({
        name: parsed.name,
        email: parsed.email,
        rut: parsed.rut,
      });
    }

    if (!user) {
      return {
        status: 'error',
        error: { message: ['Error al crear el juez'] },
      };
    }

    const existingJudge = await findJudgeByUserIdAndCompetitionId(user.id, parsed.competitionId);

    if (existingJudge) {
      return {
        status: 'error',
        error: { message: ['El juez ya existe'] },
      };
    }

    await linkJudgeWithUser(parsed.competitionId, user, userSession.organizerId);

    revalidatePath(`/dashboard/competitions/manage/${parsed.competitionId}/judges`);

    return {
      status: 'success',
    };
  } catch {
    return {
      status: 'error',
      error: {
        message: ['Error al agregar el juez'],
      },
    };
  }
}

export async function assignJudgeToProblem(_prevState: unknown, formData: FormData): Promise<AssignJudgeResult> {
  try {
    const judgeId = Number(formData.get('judgeId'));
    const problemId = Number(formData.get('problemId'));
    const action = formData.get('action');

    if (!problemId) {
      return {
        status: 'error',
        error: { message: ['Datos inválidos'] },
      };
    }

    if (action === 'remove') {
      await removeJudgeFromProblem(problemId, judgeId);
      revalidatePath('/dashboard/competitions');
      return { status: 'success', action: 'remove' };
    } 
    if (!judgeId) {
      return {
        status: 'error',
        error: { message: ['Datos inválidos'] },
      };
    }

    await updateProblemJudge(problemId, judgeId);

    revalidatePath('/dashboard/competitions');
    return { status: 'success', action: 'assign' };
  } catch {
    return {
      status: 'error',
      error: { message: ['Error al gestionar juez del problema'] },
    };
  }
}
