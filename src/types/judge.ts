import { Judge, User } from "@prisma/client";

export type JudgeWithUser = Judge & { user: User };
