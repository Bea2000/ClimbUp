import { Problem, Sector } from '@prisma/client';

export type CreateProblem = {
  level: string;
  name: string;
  maxPoints: number;
  attempts: number;
  discountPerAttempt: number;
}

// Standard problem type for UI components
export type ProblemData = Problem;

// Problem with sector relation for management UI
export type ProblemWithSector = Problem & {
  sector: Sector | null;
}; 
