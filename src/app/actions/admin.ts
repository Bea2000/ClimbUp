'use server';

import { SubmissionResult } from "@conform-to/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


import { authOptions } from "@/lib/auth";
import { deleteAdminById, getAdminByUserId } from "@/lib/db/admin";
import prisma from "@/lib/db/prisma";

export async function deleteAdmin(adminId: number): Promise<SubmissionResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const currentAdmin = await getAdminByUserId(parseInt(session.user.id));

  if (!currentAdmin?.isSuperAdmin) {
    return { status: 'error', error: { message: ['No tienes permisos para eliminar administradores'] } };
  }

  const adminToDelete = await prisma.admin.findUnique({
    where: { id: adminId },
  });

  if (!adminToDelete) {
    return { status: 'error', error: { message: ['Administrador no encontrado'] } };
  }

  return await deleteAdminById(adminId);
} 
