"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote, Star, BookOpen, Users, Award, GraduationCap, Trophy, ArrowRight, Newspaper, Calendar, MessageSquare, Headphones } from "lucide-react";
import { TeacherSlider } from "@/components/teachers/teacher-slider";
import { useState, useEffect } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
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

const stats = [
  { icon: GraduationCap, value: "280+", label: "Siswa Aktif", color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
  { icon: Users, value: "20+", label: "Tenaga Pendidik", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
  { icon: Trophy, value: "30+", label: "Prestasi Diraih", color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
  { icon: BookOpen, value: "200+", label: "Koleksi E-Book", color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20" },
];

const news = [
  {
    title: "Pembukaan Program Literasi Digital Semester Ganjil",
    date: "10 Juli 2026",
    category: "Akademik",
    categoryColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Juara 1 Lomba Piladcil Tingkat Kabupaten Sidoarjo",
    date: "5 Juli 2026",
    category: "Prestasi",
    categoryColor: "bg-amber-100 text-amber-700",
  },
  {
    title: "Workshop AI untuk Efektivitas Pembelajaran",
    date: "1 Juli 2026",
    category: "Kegiatan",
    categoryColor: "bg-emerald-100 text-emerald-700",
  },
];

const galleryItems = [
  {
    src: "/galeri kegiatan Pemberian reward kepada guru berprestasi 2026 atas nama Karel Hidayatulloh, S.Pd. Wali Kelas 4B.jpeg",
    title: "Pemberian Reward Guru Berprestasi (Karel Hidayatulloh, S.Pd)",
  },
  {
    src: "/galeri kegiatan Pemberian reward kepada guru berprestasi 2026 atas nama Umi Khaulatul Mawali, S.Pd. Guru PAI.jpeg",
    title: "Pemberian Reward Guru Berprestasi (Umi Khaulatul Mawali, S.Pd)",
  },
  {
    src: "/galeri kegiatan podcast juara 1 lomba pildacil sek kabupaten sidoarjo.jpg",
    title: "Podcast Juara 1 Lomba Pildacil se-Kab. Sidoarjo",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    "/gambar beranda 1.jpeg",
    "/gambar beranda 2.jpeg",
    "/gambar beranda 3.jpeg",
    "/gambar beranda 4.jpeg",
    "/gambar beranda 5.jpeg",
    "/gambar beranda 6.jpeg",
    "/gambar beranda 7.jpeg",
    "/gambar beranda 8.jpeg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 md:px-6 md:py-12">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f2d52] via-[#143f71] to-[#2a5f9a] p-6 text-white shadow-2xl md:grid-cols-2 md:p-10">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-[var(--color-secondary)]/10" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-white/5" />

        <div className="relative z-10 space-y-5">
          <motion.p
            className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm uppercase tracking-[0.2em] text-[#ecd4a4] backdrop-blur-sm"
            {...fadeUp(0.1)}
          >
            SDN SIMOANGIN-ANGIN
          </motion.p>

          <motion.h1
            className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          >
            Belajar Modern,{" "}
            <span className="text-[#ecd4a4]">Literasi Kuat,</span>{" "}
            Masa Depan Hebat
          </motion.h1>

          <motion.p className="max-w-xl text-white/85 leading-relaxed" {...fadeUp(0.38)}>
            Website resmi sekolah terintegrasi perpustakaan digital untuk memudahkan siswa, guru,
            dan orang tua mengakses e-book, informasi kegiatan, serta layanan akademik.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.52)}>
            <Button asChild size="lg" className="btn-pulse-gold gap-2 bg-[var(--color-secondary)] font-semibold text-[#16324F] shadow-lg">
              <Link href="/perpustakaan">
                <BookOpen className="h-4 w-4" />
                Masuk Perpustakaan Digital
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-white/40 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white">
              <Link href="/profil">
                Lihat Profil Sekolah
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 h-[280px] overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl md:h-[360px]"
          {...fadeRight(0.3)}
        >
          {heroImages.map((src, index) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                src={src}
                alt={`Suasana sekolah SDN Simoangin-angin ${index + 1}`}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d52]/50 to-transparent" />
          
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Statistik ─────────────────────────────────────────── */}
      <RevealSection className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="card-hover flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-5 text-center shadow-sm dark:bg-[var(--color-surface)]"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-heading">{s.value}</p>
              <p className="mt-0.5 text-xs text-text-secondary">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </RevealSection>

      {/* ── Profil Kepala Sekolah ─────────────────────────────── */}
      <RevealSection>
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-text">
            Sambutan
          </span>
          <h2 className="font-display mt-2 text-3xl text-heading md:text-4xl">
            Kepala Sekolah
          </h2>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] shadow-lg">
          <div className="grid md:grid-cols-[340px_1fr]">
            <motion.div
              className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[#0f2d52] to-[#1d4e89] px-8 py-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-[var(--color-secondary)]/20" />
              <div className="relative z-10 mb-5">
                <div className="h-48 w-48 overflow-hidden rounded-full ring-4 ring-[var(--color-secondary)] ring-offset-4 ring-offset-[#1d4e89] shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/kepala-sekolah.png"
                    alt="Foto Kepala Sekolah SDN Simoangin-angin"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)] shadow-lg">
                  <Star className="h-5 w-5 fill-white text-white" />
                </div>
              </div>
              <div className="relative z-10 text-center text-white">
                <p className="font-display text-xl font-bold leading-tight">Hadis Asy&apos;ari, S.Pd.</p>
                <p className="mt-1 text-sm text-blue-200">Kepala Sekolah</p>
                <p className="mt-0.5 text-xs text-blue-300">SDN Simoangin-angin</p>
                <div className="mt-5 flex justify-center gap-5 border-t border-white/20 pt-5">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-[var(--color-secondary)]">15+</p>
                    <p className="text-xs text-blue-200">Tahun mengajar</p>
                  </div>
                  <div className="h-full w-px bg-white/20" />
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-[var(--color-secondary)]">280+</p>
                    <p className="text-xs text-blue-200">Siswa dibina</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col justify-between p-8 md:p-10"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface)]">
                    <Quote className="h-5 w-5 text-accent-text" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                    Kata Sambutan &amp; Motivasi
                  </p>
                </div>

                <blockquote className="mb-6 border-l-4 border-[var(--color-secondary)] pl-5">
                  <p className="font-display text-xl leading-relaxed text-heading md:text-2xl">
                    &ldquo;Pendidikan bukan sekadar transfer ilmu, melainkan pembentukan karakter yang
                    akan menjadi bekal seumur hidup. Di sinilah kita menanam benih masa depan
                    bangsa.&rdquo;
                  </p>
                </blockquote>

                <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
                  <p>
                    Assalamu&apos;alaikum Warahmatullahi Wabarakatuh. Puji syukur kehadirat Allah SWT
                    atas segala limpahan rahmat dan karunia-Nya sehingga SDN Simoangin-angin
                    dapat terus berkembang dan berprestasi.
                  </p>
                  <p>
                    Kami berkomitmen untuk memberikan layanan pendidikan terbaik yang tidak hanya
                    unggul dalam prestasi akademik, tetapi juga membentuk karakter siswa yang
                    berakhlak mulia, kreatif, dan berdaya saing tinggi di era global.
                  </p>
                  <p>
                    Melalui website ini, kami mengajak seluruh warga sekolah, orang tua, dan
                    masyarakat untuk bersama-sama mendukung terwujudnya generasi emas Indonesia
                    yang cerdas, beriman, dan berbudaya.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { icon: BookOpen, text: "Cinta Belajar" },
                    { icon: Users, text: "Gotong Royong" },
                    { icon: Award, text: "Berprestasi" },
                    { icon: Star, text: "Berakhlak Mulia" },
                  ].map((chip) => (
                    <span
                      key={chip.text}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-accent-bg px-3 py-1 text-xs font-semibold text-accent-text"
                    >
                      <chip.icon className="h-3 w-3" />
                      {chip.text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between border-t border-[var(--color-border)] pt-5">
                <div>
                  <p className="text-xs text-text-secondary">Hormat kami,</p>
                  <p className="font-display text-lg font-bold text-heading">
                    Hadis Asy&apos;ari, S.Pd.
                  </p>
                  <p className="text-xs text-text-secondary">Kepala SDN Simoangin-angin</p>
                </div>
                <div className="text-right text-xs text-text-secondary">
                  <p>Wonoayu, Sidoarjo</p>
                  <p>Jawa Timur</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ── Profil Guru ─────────────────────────────────────── */}
      <RevealSection delay={0.05}>
        <TeacherSlider />
      </RevealSection>

      {/* ── Berita Terbaru ───────────────────────────────────── */}
      <RevealSection className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-text">
              Informasi
            </span>
            <h2 className="font-display mt-2 text-3xl text-heading">Berita Terbaru</h2>
          </div>
          <Link
            href="/profil"
            className="hidden items-center gap-1 text-sm font-semibold text-heading hover:underline md:flex"
          >
            Lihat semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {news.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <Card className="card-hover h-full">
                <CardHeader className="pb-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${item.categoryColor}`}>
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-text-muted">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                  <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-text-secondary">
                    Informasi lengkap tersedia pada papan pengumuman digital sekolah.
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-heading">
                    <Newspaper className="h-3.5 w-3.5" />
                    Baca selengkapnya
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ── Galeri Kegiatan ─────────────────────────────────── */}
      <RevealSection className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-text">
              Dokumentasi
            </span>
            <h2 className="font-display mt-2 text-3xl text-heading">Galeri Kegiatan</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.src}
              className="group relative h-56 overflow-hidden rounded-xl border border-[var(--color-border)] shadow-sm"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            >
              <Image src={item.src} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-sm font-semibold text-white drop-shadow-md">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </RevealSection>

      {/* ── Layanan & Pengaduan ─────────────────────────────────────── */}
      <RevealSection className="grid gap-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:from-blue-900/20 dark:to-indigo-900/20 md:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-100/50 transition-transform duration-500 group-hover:scale-150 dark:bg-blue-800/20" />
          <div className="relative z-10 flex h-full flex-col items-start">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <MessageSquare className="h-7 w-7" />
            </div>
            <h3 className="font-display mb-2 text-2xl font-bold text-heading">Saran & Pengaduan</h3>
            <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary">
              Punya masukan, saran, atau keluhan terkait layanan sekolah? Sampaikan kepada kami untuk mewujudkan sekolah yang lebih baik dan nyaman bagi semuanya.
            </p>
            <Link
              href="https://forms.gle/PbEN9U5cUZCdhWfe6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700"
            >
              Kirim Saran / Pengaduan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-emerald-50 to-teal-50 p-8 shadow-sm transition-all duration-300 hover:shadow-lg dark:from-emerald-900/20 dark:to-teal-900/20 md:p-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-100/50 transition-transform duration-500 group-hover:scale-150 dark:bg-emerald-800/20" />
          <div className="relative z-10 flex h-full flex-col items-start">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <Headphones className="h-7 w-7" />
            </div>
            <h3 className="font-display mb-2 text-2xl font-bold text-heading">Helpdesk & Informasi</h3>
            <p className="mb-8 flex-1 text-sm leading-relaxed text-text-secondary">
              Butuh bantuan informasi pendaftaran, perpustakaan digital, atau administrasi sekolah? Tim Helpdesk kami siap membantu Anda di jam kerja.
            </p>
            <Link
              href="https://wa.me/6285655914559"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-emerald-700"
            >
              Hubungi Helpdesk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ── CTA bawah ─────────────────────────────────────── */}
      <RevealSection>
        <div className="animate-gradient overflow-hidden rounded-3xl bg-gradient-to-r from-[#143f71] via-[#1d4e89] to-[#2a5f9a] p-8 text-center text-white shadow-xl md:p-12">
          <motion.p
            className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ecd4a4]"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          >
            Daftarkan Anak Anda Sekarang
          </motion.p>
          <motion.h2
            className="font-display mb-4 text-2xl font-bold md:text-3xl"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            Bergabung Bersama Keluarga Besar SDN Simoangin-angin
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-xl text-sm text-blue-100/80"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          >
            Wujudkan impian anak Anda bersama kami. Sekolah berkualitas dengan lingkungan kondusif,
            guru berpengalaman, dan program unggulan.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          >
            <Link
              href="/kontak"
              className="btn-pulse-gold inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
            >
              Hubungi Kami <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/perpustakaan"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
            >
              <BookOpen className="h-4 w-4" /> Perpustakaan Digital
            </Link>
          </motion.div>
        </div>
      </RevealSection>

    </div>
  );
}
