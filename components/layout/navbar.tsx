"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, BookOpen, Target, Eye, Menu, X, Award, MapPin, Phone, Mail, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const mainLinks = [
  { href: "/", label: "Beranda" },
  { href: "/perpustakaan", label: "Perpustakaan" },
  { href: "/layanan-surat", label: "Layanan Surat" },
  { href: "/ekstrakurikuler", label: "Ekstrakurikuler" },
  { href: "/maklumat-pelayanan", label: "Pelayanan" },
  { href: "/kontak", label: "Kontak" },
];


const profilMenu = [
  {
    icon: Eye,
    label: "Visi",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    content:
      "Terwujudnya Peserta didik yang Beriman,Berprestasi dan Berkarakter serta berwawasan global.",
  },
  {
    icon: Target,
    label: "Misi",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    content:
      "1. Membangun lingkungan sekolah yang membentuk peserta didik memiliki akhlak mulia melalui rutinitas kegiatan keagamaan dan menerapkan ajaran agama melaui cara berinteraksi di sekolah.\n2. Mengembangkan dan memfasilitasi peningkatan prestasi peserta didik sesuai minat dan bakatnya melalui proses pendampingan dan kerja sama dengan orang tua.\n3. Membiasakan peserta didik melakukan praktik baik untuk penguatan karakterdan peduli lingkungan.\n4. Melaksanakan pembelajaran dan penilaian berbasis teknologi informasi dan komunikasi (TIK), serta berwawasan global.",
  },
  {
    icon: Award,
    label: "Motto",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    content: "\"TUT WURI HANDAYANI\" — Dari belakang seorang guru harus bisa memberikan dorongan dan arahan.",
  },
  {
    icon: GraduationCap,
    label: "Identitas",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    content:
      "SDN Simoangin-angin\nWonoayu, Sidoarjo, Jawa Timur\nNPSN: 20501508\nAkreditasi: A",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [profilOpen, setProfilOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const profilRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profilRef.current && !profilRef.current.contains(e.target as Node)) {
        setProfilOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Ripple effect on click
  function addRipple(e: React.MouseEvent<HTMLElement>) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = nextId.current++;
    setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Top identity bar ─────────────────────────────────── */}
      <div className="hidden border-b border-[var(--color-border)] bg-[var(--color-primary)] md:block">
        <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 text-xs text-blue-100">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Wonoayu, Sidoarjo, Jawa Timur
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> (085) 655914559
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> sdnsimoangin@gmail.com
            </span>
          </div>
          <span className="text-xs font-semibold tracking-widest text-yellow-300 uppercase">
            TUT WURI HANDAYANI
          </span>
        </div>
      </div>

      {/* ── Main navbar ──────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">

          {/* Logo + School name */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 overflow-hidden rounded-lg px-1 py-1 transition-all duration-200 hover:scale-[1.02]"
            onClick={addRipple}
          >
            <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--color-secondary)] ring-offset-1 transition-all duration-300 group-hover:ring-4 group-hover:shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-sdn.png.png"
                alt="Logo SDN Simoangin-angin"
                width={44}
                height={44}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold tracking-wide text-heading md:text-base">
                SDN SIMOANGIN-ANGIN
              </p>
              <p className="text-[10px] text-text-secondary">Wonoayu · Sidoarjo</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={addRipple}
                className={`relative overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-[var(--color-surface)] hover:text-heading ${isActive(link.href)
                  ? "bg-[var(--color-surface)] text-heading font-semibold"
                  : "text-[var(--color-ink)]"
                  }`}
              >
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--color-primary)]" />
                )}
                {link.label}
              </Link>
            ))}

            {/* Profil Sekolah dropdown */}
            <div ref={profilRef} className="relative">
              <button
                onClick={(e) => { addRipple(e); setProfilOpen((v) => !v); }}
                className={`relative flex items-center gap-1 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:bg-[var(--color-surface)] hover:text-heading ${profilOpen ? "bg-[var(--color-surface)] text-heading" : "text-[var(--color-ink)]"
                  }`}
              >
                Profil Sekolah
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${profilOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Mega dropdown */}
              {profilOpen && (
                <div className="absolute right-0 top-full mt-2 w-[520px] animate-in fade-in slide-in-from-top-2 rounded-2xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-4 shadow-2xl duration-200">
                  <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    <BookOpen className="h-3.5 w-3.5" />
                    Profil SDN Simoangin-angin
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {profilMenu.map((item) => (
                      <div
                        key={item.label}
                        className={`group cursor-default rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-[var(--color-border)] hover:shadow-md ${item.bg}`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <item.icon className={`h-4 w-4 ${item.color}`} />
                          <span className={`text-sm font-semibold ${item.color}`}>{item.label}</span>
                        </div>
                        <p className="whitespace-pre-line text-xs leading-relaxed text-text-secondary">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                    <Link
                      href="/profil"
                      onClick={() => setProfilOpen(false)}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
                    >
                      Lihat Profil Lengkap Sekolah
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden animate-pulse-once overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md md:inline-flex"
              onClick={addRipple as unknown as React.MouseEventHandler<HTMLButtonElement>}
            >
              <Link href="/admin/login">Login Admin</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              className="rounded-lg p-2 transition-all duration-200 hover:bg-[var(--color-surface)] md:hidden"
              onClick={(e) => { addRipple(e); setMobileOpen((v) => !v); }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-in slide-in-from-top-2 border-t border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] px-4 pb-4 duration-200 md:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive(link.href)
                    ? "bg-[var(--color-surface)] text-heading"
                    : "hover:bg-[var(--color-surface)]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile profil section */}
              <div className="mt-2 rounded-xl bg-[var(--color-surface)] p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">Profil Sekolah</p>
                {profilMenu.slice(0, 2).map((item) => (
                  <div key={item.label} className="mb-2">
                    <p className={`text-xs font-semibold ${item.color}`}>{item.label}</p>
                    <p className="whitespace-pre-line text-xs text-text-secondary">{item.content}</p>
                  </div>
                ))}
                <Link href="/profil" onClick={() => setMobileOpen(false)} className="text-xs font-semibold text-heading">
                  Selengkapnya →
                </Link>
              </div>

              <Link
                href="/admin/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[var(--color-primary)] px-3 py-2.5 text-center text-sm font-semibold text-white"
              >
                Login Admin
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
