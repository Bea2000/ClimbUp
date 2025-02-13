import { ClimbingGrade } from "@prisma/client";

import { CLIMBING_GRADES } from "../constant/problem.conf";

export function getLevelsForGraduationType(grade: ClimbingGrade): string[] {
  return [...CLIMBING_GRADES[grade]];
}
