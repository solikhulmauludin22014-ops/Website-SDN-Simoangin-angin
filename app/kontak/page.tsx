"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from "lucide-react";

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

const jadwal = [
  { hari: "Senin", jam: "07.00 – 14.30", status: "buka" },
  { hari: "Selasa", jam: "07.00 – 14.30", status: "buka" },
  { hari: "Rabu", jam: "07.00 – 14.30", status: "buka" },
  { hari: "Kamis", jam: "07.00 – 14.30", status: "buka" },
  { hari: "Jum'at", jam: "07.00 – 11.00", status: "buka" },
  { hari: "Sabtu", jam: "07.00 – 12.30", status: "buka" },
  { hari: "Minggu", jam: "—", status: "tutup" },
];

export default function KontakPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 py-8 md:px-6 md:py-12">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#143f71] to-[#2a5f9a] px-6 py-14 text-white shadow-xl md:px-12 md:py-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-64 w-64 rounded-full bg-[var(--color-secondary)]/10" />

        <div className="relative z-10 text-center">
          <motion.span
            {...fadeUp(0.05)}
            className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ecd4a4] backdrop-blur-sm"
          >
            SDN Simoangin-angin
          </motion.span>
          <motion.h1
            {...fadeUp(0.15)}
            className="font-display mt-4 text-4xl font-bold md:text-5xl"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            {...fadeUp(0.25)}
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-blue-100/90"
          >
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami
            melalui kontak di bawah ini atau kunjungi sekolah kami langsung.
          </motion.p>
        </div>
      </section>

      {/* ── Kartu Kontak ─────────────────────────────────── */}
      <RevealSection className="grid gap-5 sm:grid-cols-3">
        {[
          {
            icon: MapPin,
            label: "Alamat",
            value: "Jl. Simoangin-angin RT. 07/RW. 04, Wonoayu, Sidoarjo, Jawa Timur",
            color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
            delay: 0,
          },
          {
            icon: Phone,
            label: "Telepon",
            value: "(085) 655914559",
            color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
            delay: 0.1,
          },
          {
            icon: Mail,
            label: "Email",
            value: "sdnsimoangin@gmail.com",
            color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
            delay: 0.2,
          },
        ].map((item) => (
          <motion.div
            key={item.label}
            className="card-hover flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm dark:bg-[var(--color-surface)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: item.delay }}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-text-secondary">
                {item.label}
              </p>
              <p className="font-medium leading-snug text-[var(--color-ink)]">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </RevealSection>

      {/* ── Jam Operasional + Peta ──────────────────────── */}
      <RevealSection className="grid gap-8 lg:grid-cols-2">

        {/* Jadwal */}
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-lg dark:bg-[var(--color-surface)]">
          <div className="border-b border-[var(--color-border)] bg-gradient-to-r from-[#143f71] to-[#2a5f9a] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
                  Jam Operasional
                </p>
                <h2 className="font-display text-xl text-white">Sekolah Kami</h2>
              </div>
            </div>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {jadwal.map((j, i) => (
              <motion.div
                key={j.hari}
                className="flex items-center justify-between px-6 py-3.5"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className="flex items-center gap-3">
                  {j.status === "buka" ? (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 flex-shrink-0 text-rose-400" />
                  )}
                  <span className={`font-medium ${j.hari === "Minggu" ? "text-text-muted" : "text-[var(--color-ink)]"}`}>
                    {j.hari}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${j.status === "tutup" ? "text-text-muted" : "text-text-secondary"}`}>
                    {j.jam}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      j.status === "buka"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                    }`}
                  >
                    {j.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Peta Google Maps */}
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-lg dark:bg-[var(--color-surface)]">
          <div className="border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-secondary)] to-amber-400 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/30">
                <MapPin className="h-5 w-5 text-[#143f71]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-900/70">
                  Lokasi
                </p>
                <h2 className="font-display text-xl text-[#143f71]">Temukan Kami</h2>
              </div>
            </div>
          </div>
          <div className="relative h-[340px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3402431411516!2d112.6373801!3d-7.4275466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e3b1c6d3bc01%3A0xc3b51f0b07debf2d!2sSdn%20simoangin-angin!5e0!3m2!1sen!2sid!4v1705642878952!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              title="Peta Lokasi SDN Simoangin-angin"
            />
          </div>
        </div>
      </RevealSection>

      {/* ── CTA bawah ─────────────────────────────────────── */}
      <RevealSection>
        <div className="animate-gradient rounded-3xl bg-gradient-to-r from-[#143f71] via-[#1d4e89] to-[#2a5f9a] p-8 text-center text-white shadow-xl md:p-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#ecd4a4]">
            Kami menunggu kabar dari Anda
          </p>
          <h2 className="font-display mb-4 text-2xl font-bold md:text-3xl">
            Ada Pertanyaan? Hubungi Kami Sekarang
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-blue-100/80">
            Untuk informasi pendaftaran, kegiatan sekolah, perpustakaan digital, atau hal lainnya —
            tim kami siap membantu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+6285655914559"
              className="btn-pulse-gold inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
            >
              <Phone className="h-4 w-4" />
              Hubungi via Telepon
            </a>
            <a
              href="mailto:sdnsimoangin@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20"
            >
              <Mail className="h-4 w-4" />
              Kirim Email
            </a>
          </div>
        </div>
      </RevealSection>

    </div>
  );
}
