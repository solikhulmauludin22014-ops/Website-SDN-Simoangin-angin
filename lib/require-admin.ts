import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function requireAdminSession() {
  const rawSession = await getServerSession(authOptions as never);
  const session = rawSession as { user?: { id?: string } } | null;
  if (!session?.user) {
    return null;
  }
  return session;
}
