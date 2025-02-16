'use server';

import { SubmissionResult } from "@conform-to/react";
import { ClimbingGrade } from "@prisma/client";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { REVERSE_GRADE_TYPES } from "@/lib/constant/problem.conf";
import { createNewCompetition } from "@/lib/db/competition";

type CreateCompetitionResult = SubmissionResult | { status: 'success', competitionId: number };

export async function createCompetition(_prevState: unknown, formData: FormData) : Promise<CreateCompetitionResult> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { status: 'error', error: { message: ['No se ha iniciado sesión'] } };
  }
  
  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const date = new Date(formData.get('date') as string);
  const duration = parseInt(formData.get('duration') as string);
  const code = formData.get('code') as string;
  const organizerId = session?.user.organizerId;
  const levelType = formData.get('levelType') as string;

  const levelTypeEnum = REVERSE_GRADE_TYPES[levelType as keyof typeof REVERSE_GRADE_TYPES] as ClimbingGrade;

  const competitionData = { 
    name, 
    location, 
    date, 
    duration, 
    code, 
    organizerId, 
    levelType: levelTypeEnum,
  };
  
  try {
    const newCompetition = await createNewCompetition(competitionData);
    return { status: 'success', competitionId: newCompetition.id };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al crear la competencia: ${error as string}`] } };
  }
}
