import { CreateUser } from "@/types/user";

import prisma from "./prisma";

export async function findUserByEmailOrRut(email: string, rut: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { rut },
      ],
    },
  });
}

export async function createJudgeUser(user: CreateUser) {
  return await prisma.user.create({
    data: {
      ...user,
      role: 'JUDGE',
    },
  });
}
