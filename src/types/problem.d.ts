export type Problem = {
    id: number;
    name: string | null;
    level: number;
    maxPoints: number;
    attempts: number;
    discountPerAttempt: number;
    competitionId: number;
  }
