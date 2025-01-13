import { Judge, Problem, User } from '@prisma/client';

export type CreateProblem = {
  level: string;
  maxPoints: number;
  attempts: number;
  discountPerAttempt: number;
}

export type ProblemWithJudges = Problem & {
  judges: (Judge & {
    user: User;
  })[];
}; 
