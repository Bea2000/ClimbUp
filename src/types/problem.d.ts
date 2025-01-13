import { Judge, Problem, User } from '@prisma/client';

export type CreateProblem = {
  level: number;
  maxPoints: number;
  attempts: number;
  discountPerAttempt: number;
}

export type ProblemWithJudges = Problem & {
  judges: (Judge & {
    user: User;
  })[];
}; 
