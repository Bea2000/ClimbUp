import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { DefaultSession, NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { SessionUser } from '@/types/session';

import { getAdminByEmail } from './db/admin';
import prisma from './db/prisma';

declare module 'next-auth' {
  interface Session {
    user: SessionUser & DefaultSession['user'];
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
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciales inválidas');
        }
        const existingUser = await getAdminByEmail(credentials.email);

        if (!existingUser) {
          throw new Error('Email o contraseña incorrecta');
        }

        const passwordMatch = await compare(credentials.password, existingUser.password);

        if (!passwordMatch) {
          throw new Error('Email o contraseña incorrecta');
        }

        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
          role: existingUser.isSuperAdmin ? 'superadmin' : 'admin',
          organizerId: existingUser.organizerId,
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
        session.user.id = token.id as string;
        session.user.organizerId = token.organizerId as number;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

export async function getUserFromSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id || !session.user.role || !session.user.organizerId) {
    redirect('/login');
  }
  return session.user;
}

export async function isSuperAdmin(user: SessionUser): Promise<boolean> {
  return user.role === 'superadmin';
}
