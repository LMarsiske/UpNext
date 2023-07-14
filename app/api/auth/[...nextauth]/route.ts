import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
prismaAdapter.createUser = (data) => {
  const userData = prisma.user.create({
    data: {
      ...data,
      lists: {
        create: {
          name: "Personal Watch List",
          shareable: false,
          deleteable: false,
        },
      },
    },
  });

  return userData;
};

export const AuthOptions: NextAuthOptions = {
  adapter: prismaAdapter,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token, user }) {
      if (session?.user?.id) return session;

      let modifiedSession = { ...session };
      if (session && user) {
        session.user!.id = user.id;
        const sessionRecords = await prisma.session.findMany({
          where: {
            userId: user.id,
          },
        });

        let activeSession;
        if (sessionRecords.length > 1) {
          activeSession = sessionRecords.find((sessionRecord) => {
            return sessionRecord.expires.toISOString() === session.expires;
          });
        } else {
          activeSession = sessionRecords[0];
        }

        if (activeSession) {
          modifiedSession = {
            ...modifiedSession,
            expires: activeSession.expires.toISOString(),
            token: activeSession.sessionToken,
            id: activeSession.id,
            user: {
              ...modifiedSession.user,
              id: activeSession.userId,
            },
          };
        }
      }
      return modifiedSession;
    },
  },
};

const authHandler = NextAuth(AuthOptions);

export { authHandler as GET, authHandler as POST };
