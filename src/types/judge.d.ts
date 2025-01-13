export type JudgeWithUser = Prisma.JudgeGetPayload<{
  include: {
    user: true;
  };
}>;
