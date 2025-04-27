import { Judge, Problem } from '@prisma/client';

export type CreateProblem = {
  level: string;
  name: string;
  maxPoints: number;
  attempts: number;
  discountPerAttempt: number;
}

export type ProblemWithJudges = Problem & {
  judges: Judge[];
}; 
