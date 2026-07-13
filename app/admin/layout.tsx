"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (pathname !== "/admin/login" && status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [pathname, status, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return <section className="mx-auto max-w-7xl p-6">Memuat panel admin...</section>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-8 md:px-6 lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}
