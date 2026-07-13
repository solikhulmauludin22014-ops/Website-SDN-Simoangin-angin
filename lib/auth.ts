import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

type CredentialsInput = {
  email?: string;
  password?: string;
};

type JwtCallbackParams = {
  token: Record<string, unknown> & { id?: string };
  user?: { id: string } | null;
};

type SessionCallbackParams = {
  session: {
    user?: {
      id?: string;
      name?: string | null;
      email?: string | null;
    };
  };
  token: Record<string, unknown> & { id?: string };
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: CredentialsInput | undefined) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const admin = await prisma.admin.findUnique({
          where: { email: parsed.data.email },
        });

        if (!admin) return null;

        const valid = await bcrypt.compare(parsed.data.password, admin.password);
        if (!valid) return null;

        return {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }: JwtCallbackParams) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: SessionCallbackParams) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};
