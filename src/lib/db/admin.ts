import { SubmissionResult } from '@conform-to/react';
import { hash } from 'bcrypt';

import prisma from '@/lib/db/prisma';
import { CreateAdminData } from '@/types/admin';

export async function checkExistingUser(email: string, rut: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { rut },
      ],
    },
  });
}

export async function createNewAdmin({
  name,
  email,
  password,
  rut,
  isSuperAdmin,
  organizerId,
}: CreateAdminData) {
  const hashedPassword = await hash(password, 10);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        rut,
        role: 'ADMIN',
      },
    });

    const admin = await tx.admin.create({
      data: {
        userId: user.id,
        password: hashedPassword,
        isSuperAdmin,
        organizerId,
      },
    });

    return { user, admin };
  });
}

export async function getAdminByUserId(userId: number) {
  return await prisma.admin.findUnique({
    where: { userId },
  });
}

export async function getAdminsByOrganizer(organizerId: number, userId: number) {
  return prisma.admin.findMany({
    where: {
      organizerId,
      userId: {
        not: userId,
      },
    },
    include: {
      user: true,
    },
  });
} 

export async function deleteAdminById(adminId: number) : Promise<SubmissionResult> {
  try {
    const adminToDelete = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!adminToDelete) {
      throw new Error('Administrador no encontrado');
    }

    await prisma.$transaction([
      prisma.admin.delete({
        where: { id: adminId },
      }),
      prisma.user.delete({
        where: { id: adminToDelete.userId },
      }),
    ]);

    return { status: 'success' };
  } catch (error) {
    return { status: 'error', error: { message: [`Error al eliminar administrador: ${error}`] } };
  }
}
