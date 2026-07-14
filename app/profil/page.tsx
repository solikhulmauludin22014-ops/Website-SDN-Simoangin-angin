"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Lightbulb, MapPin, Shield, BookOpen, Users, Award, Phone, Mail } from "lucide-react";

// ── Motion helpers ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
});

function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.section>
  );
}

const identitas = [
  { icon: Shield, title: "NPSN", desc: "20501837", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
  { icon: BookOpen, title: "Status", desc: "Negeri", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
  { icon: Users, title: "Peserta Didik", desc: "280+ Siswa", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
  { icon: Award, title: "Akreditasi", desc: "A (Sangat Baik)", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
];

export default function ProfilPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8 md:px-6 md:py-12">

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2d52] via-[#143f71] to-[#2a5f9a] text-white shadow-xl">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-20 -left-8 h-72 w-72 rounded-full bg-[var(--color-secondary)]/10" />
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
            alt="Gedung Sekolah"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#143f71]/60 mix-blend-multiply" />
        </div>

        <div className="relative z-10 px-6 py-16 text-center md:px-12 md:py-24">
          <motion.div
            {...fadeUp(0.1)}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-sdn.png.png" alt="Logo SDN Simoangin-angin" className="h-full w-full object-contain drop-shadow-md" />
          </motion.div>
          <motion.span
            {...fadeUp(0.15)}
            className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ecd4a4] backdrop-blur-sm"
          >
            SDN Simoangin-angin
          </motion.span>
          <motion.h1
            {...fadeUp(0.2)}
            className="font-display mb-4 mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Profil Sekolah
          </motion.h1>
          <motion.p
            {...fadeUp(0.3)}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-100/90"
          >
            SDN Simoangin-angin berkomitmen membentuk generasi berkarakter, literat, dan siap
            menghadapi tantangan masa depan melalui pembelajaran berbasis nilai-nilai luhur dan teknologi.
          </motion.p>
        </div>
      </section>

      {/* ── Identitas Sekolah ──────────────────────────────────── */}
      <RevealSection className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {identitas.map((item, i) => (
          <motion.div
            key={item.title}
            className="card-hover flex items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm dark:bg-[var(--color-surface)]"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary">{item.title}</p>
              <p className="font-display text-lg font-bold text-[var(--color-ink)]">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </RevealSection>

      {/* ── Visi & Misi ──────────────────────────────────────── */}
      <div className="grid gap-8 md:grid-cols-2">
        <RevealSection delay={0.1}>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-lg dark:bg-[var(--color-surface)]">
            <div className="bg-gradient-to-br from-[#0f2d52] to-[#1d4e89] p-8 text-white">
              <motion.div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lightbulb className="h-7 w-7 text-[#ecd4a4]" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold">Visi Sekolah</h2>
            </div>
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              <p className="text-xl italic leading-relaxed text-text-secondary">
                &ldquo;Terwujudnya Peserta didik yang Beriman,Berprestasi dan Berkarakter serta berwawasan global.&rdquo;
              </p>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={0.2}>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-lg dark:bg-[var(--color-surface)]">
            <div className="bg-gradient-to-br from-[var(--color-secondary)] to-amber-500 p-8 text-[#143f71]">
              <motion.div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/30 backdrop-blur-sm"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Target className="h-7 w-7" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold">Misi Sekolah</h2>
            </div>
            <div className="p-8 md:p-10">
              <ul className="space-y-4 text-text-secondary">
                {[
                  "Membangun lingkungan sekolah yang membentuk peserta didik memiliki akhlak mulia melalui rutinitas kegiatan keagamaan dan menerapkan ajaran agama melaui cara berinteraksi di sekolah.",
                  "Mengembangkan dan memfasilitasi peningkatan prestasi peserta didik sesuai minat dan bakatnya melalui proses pendampingan dan kerja sama dengan orang tua.",
                  "Membiasakan peserta didik melakukan praktik baik untuk penguatan  karakterdan peduli lingkungan.",
                  "Melaksanakan pembelajaran dan penilaian berbasis teknologi informasi dan komunikasi (TIK), serta berwawasan global.",
                ].map((misi, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-bg text-sm font-bold text-accent-text">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{misi}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* ── Motto Sekolah ─────────────────────────────────────── */}
      <RevealSection>
        <div className="animate-gradient overflow-hidden rounded-3xl bg-gradient-to-r from-[#143f71] via-[#1d4e89] to-[#2a5f9a] p-8 text-center text-white shadow-xl md:p-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#ecd4a4]">Motto Sekolah</p>
          <h2 className="font-display mb-3 text-3xl font-bold md:text-4xl">TUT WURI HANDAYANI</h2>
          <p className="mx-auto max-w-xl text-base text-blue-100/90">
            &ldquo;Dari belakang seorang guru harus bisa memberikan dorongan dan arahan kepada
            peserta didiknya menuju masa depan yang cemerlang.&rdquo;
          </p>
        </div>
      </RevealSection>

      {/* ── Lokasi ────────────────────────────────────────────── */}
      <RevealSection>
        <div className="grid overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-lg dark:bg-[var(--color-surface)] md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-bg text-accent-text">
              <MapPin className="h-7 w-7" />
            </div>
            <span className="mb-3 inline-block rounded-full bg-accent-bg px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-text">
              Lokasi
            </span>
            <h2 className="font-display mb-4 text-3xl text-heading">Temukan Kami</h2>
            <p className="mb-6 leading-relaxed text-text-secondary">
              SDN Simoangin-angin terletak di lokasi yang strategis dan mudah dijangkau,
              menyediakan lingkungan belajar yang kondusif, aman, dan nyaman.
            </p>
            <address className="not-italic space-y-3 text-text-secondary">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-text" />
                <span>Jl. Simoangin-angin RT. 07/RW. 04, Wonoayu, Sidoarjo, Jawa Timur</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent-text" />
                <span>(085) 655914559</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent-text" />
                <span>sdnsimoangin@gmail.com</span>
              </div>
            </address>
          </div>
          <div className="relative h-72 bg-stone-100 dark:bg-stone-800 md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3402431411516!2d112.6373801!3d-7.4275466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e3b1c6d3bc01%3A0xc3b51f0b07debf2d!2sSdn%20simoangin-angin!5e0!3m2!1sen!2sid!4v1705642878952!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full object-cover"
              title="Peta Lokasi SDN Simoangin-angin"
            />
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
