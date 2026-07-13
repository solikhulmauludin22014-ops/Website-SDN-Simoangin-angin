"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpen, FolderTree, ChartNoAxesColumn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const menu = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/buku", label: "Kelola Buku", icon: BookOpen },
  { href: "/admin/kategori", label: "Kelola Kategori", icon: FolderTree },
  { href: "/admin/dashboard#statistik", label: "Statistik", icon: ChartNoAxesColumn },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-4 lg:w-64 lg:sticky lg:top-20 lg:h-fit">
      <p className="mb-4 font-display text-lg text-[var(--color-primary)]">Panel Admin</p>
      <nav className="space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
                isActive
                  ? "bg-[var(--color-primary)] text-white"
                  : "text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-4 flex gap-2">
        <div className="flex-1">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            Logout
          </Button>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
