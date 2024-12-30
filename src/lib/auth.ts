import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from './db/prisma';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      role: string;
      organizerId: number;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: 'sign-in',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rut: { label: 'Rut', type: 'text' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales inválidas');
        }
        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials.email.toLowerCase(),
            rut: credentials.rut,
          },
          include: {
            admin: true,
          },
        });

        if (!existingUser) {
          throw new Error('Email o contraseña incorrecta');
        }

        if (!existingUser.admin) {
          throw new Error('Usuario no es administrador');
        }

        const passwordMatch = await compare(credentials.password, existingUser.admin.password);

        if (!passwordMatch) {
          throw new Error('Email o contraseña incorrecta');
        }

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          role: existingUser.admin.isSuperAdmin ? 'superadmin' : 'admin',
          organizerId: existingUser.admin.organizerId,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if ('role' in user) {
          token.role = user.role;
        }
        if ('organizerId' in user) {
          token.organizerId = user.organizerId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role as string;
        session.user.organizerId = token.organizerId as number;
      }
      return session;
    },
  },
};

export async function getUserFromSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id || !session.user.role || !session.user.organizerId) {
    redirect('/sign-in');
  }
  return session.user;
}
