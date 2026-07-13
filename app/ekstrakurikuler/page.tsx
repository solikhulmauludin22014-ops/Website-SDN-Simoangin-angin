"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Trophy,
  Monitor,
  Compass,
  BookOpen,
  Palette,
  Clock,
  Users,
  Star,
  CheckCircle2,
  Music2,
  Drum,
  ArrowRight,
} from "lucide-react";

const eskuls = [
  {
    id: "futsal",
    name: "Futsal",
    icon: Trophy,
    color: "from-orange-500 to-red-500",
    badge: "bg-orange-100 text-orange-700",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-500",
    image: "/eskul-futsal.png",
    jadwal: "Senin & Rabu, 14.00–16.00 WIB",
    pembina: "Bpk. Agus Santoso, S.Pd",
    peserta: "20 siswa",
    prestasi: ["Juara 2 Futsal Antar-SD Kecamatan Wonoayu 2024", "Juara 3 O2SN Futsal Kabupaten Sidoarjo 2023"],
    deskripsi:
      "Ekstrakurikuler Futsal SDN Simoangin-angin merupakan wadah pengembangan bakat olahraga siswa dalam bidang sepak bola mini. Kegiatan ini dirancang untuk membentuk jiwa sportivitas, kerja sama tim, dan kedisiplinan melalui latihan rutin dan kompetisi antar-sekolah.",
    manfaat: [
      "Melatih kerja sama dan komunikasi tim",
      "Meningkatkan kebugaran dan kesehatan fisik",
      "Membangun jiwa sportif dan kompetitif yang sehat",
      "Mengembangkan kemampuan koordinasi dan reflex",
    ],
  },
  {
    id: "informatika",
    name: "Informatika",
    icon: Monitor,
    color: "from-blue-500 to-cyan-500",
    badge: "bg-blue-100 text-blue-700",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    image: "/eskul-informatika.png",
    jadwal: "Selasa & Kamis, 13.30–15.30 WIB",
    pembina: "Ibu Rina Wulandari, S.Kom",
    peserta: "24 siswa",
    prestasi: ["Juara 1 Lomba Coding Tingkat SD Kabupaten Sidoarjo 2024", "Finalis Kompetisi Robotika Jawa Timur 2023"],
    deskripsi:
      "Ekstrakurikuler Informatika membuka wawasan siswa tentang dunia teknologi digital sejak dini. Melalui kegiatan ini, siswa belajar dasar-dasar pemrograman, penggunaan komputer secara produktif, serta pengenalan logika komputasi yang menyenangkan dan interaktif.",
    manfaat: [
      "Mengenal dasar pemrograman komputer",
      "Mengembangkan kemampuan berpikir logis dan analitis",
      "Memanfaatkan teknologi secara positif dan kreatif",
      "Mempersiapkan siswa menghadapi era digital",
    ],
  },
  {
    id: "pramuka",
    name: "Pramuka",
    icon: Compass,
    color: "from-emerald-500 to-green-600",
    badge: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    image: "/eskul-pramuka.png",
    jadwal: "Jumat, 14.00–16.30 WIB",
    pembina: "Bpk. Hendra Prasetya, S.Pd",
    peserta: "60 siswa",
    prestasi: ["Juara Umum Perkemahan Penegak Gugus Depan 2024", "Regu Terbaik Jambore Daerah Sidoarjo 2023"],
    deskripsi:
      "Pramuka adalah ekstrakurikuler wajib di SDN Simoangin-angin yang bertujuan membentuk karakter siswa berjiwa Pancasila. Melalui berbagai kegiatan seperti berkemah, baris-berbaris, tali-menali, dan pelayanan masyarakat, siswa dididik menjadi pribadi yang mandiri, disiplin, dan bertanggung jawab.",
    manfaat: [
      "Membentuk karakter mandiri dan bertanggung jawab",
      "Melatih kepemimpinan dan organisasi",
      "Menumbuhkan rasa cinta alam dan lingkungan",
      "Memupuk semangat gotong royong dan kebersamaan",
    ],
  },
  {
    id: "mtq",
    name: "MTQ (Musabaqah Tilawatil Quran)",
    icon: BookOpen,
    color: "from-green-600 to-teal-600",
    badge: "bg-teal-100 text-teal-700",
    iconBg: "bg-gradient-to-br from-green-600 to-teal-600",
    image: "/eskul-mtq.png",
    jadwal: "Rabu & Sabtu, 07.00–08.30 WIB",
    pembina: "Ust. Ahmad Fauzi, S.Ag",
    peserta: "18 siswa",
    prestasi: [
      "Juara 1 MTQ Tingkat Kecamatan Wonoayu 2024",
      "Juara 2 Tartil Quran Kabupaten Sidoarjo 2024",
      "Juara 3 MTQ Tingkat Provinsi Jawa Timur 2023",
    ],
    deskripsi:
      "Ekstrakurikuler MTQ hadir untuk mengembangkan kemampuan membaca dan melantunkan Al-Qur'an dengan baik dan benar sesuai kaidah tajwid. Program ini menanamkan kecintaan siswa terhadap Al-Qur'an sejak usia dini sekaligus menyiapkan siswa mengikuti lomba MTQ di berbagai tingkat.",
    manfaat: [
      "Meningkatkan kemampuan membaca Al-Qur'an dengan tajwid yang benar",
      "Menumbuhkan kecintaan dan kebiasaan membaca Al-Qur'an",
      "Memupuk nilai-nilai spiritual dan akhlak mulia",
      "Mempersiapkan siswa mengikuti kompetisi MTQ",
    ],
  },
  {
    id: "melukis",
    name: "Melukis",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    badge: "bg-purple-100 text-purple-700",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    image: "/eskul-melukis.png",
    jadwal: "Kamis, 13.30–15.30 WIB",
    pembina: "Ibu Dewi Sartika, S.Pd",
    peserta: "22 siswa",
    prestasi: [
      "Juara 1 Lomba Lukis Anak Tingkat Kecamatan 2024",
      "Juara 2 Festival Seni Anak Jawa Timur 2023",
    ],
    deskripsi:
      "Ekstrakurikuler Melukis memberi ruang seluas-luasnya bagi siswa untuk mengekspresikan kreativitas dan imajinasi melalui seni rupa. Siswa belajar berbagai teknik melukis mulai dari cat air, cat akrilik, hingga pensil warna, serta dikenalkan dengan berbagai aliran seni rupa yang menyenangkan.",
    manfaat: [
      "Mengembangkan kreativitas dan imajinasi tanpa batas",
      "Melatih kesabaran, ketekunan, dan konsentrasi",
      "Mengenalkan apresiasi terhadap seni dan keindahan",
      "Membangun rasa percaya diri melalui karya seni",
    ],
  },
  {
    id: "albanjari",
    name: "Al-Banjari",
    icon: Music2,
    color: "from-rose-500 to-pink-600",
    badge: "bg-rose-100 text-rose-700",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    image: "/eskul-albanjari.png",
    jadwal: "Selasa & Sabtu, 13.00–15.00 WIB",
    pembina: "Ust. Muhammad Iqbal, S.Ag",
    peserta: "16 siswa",
    prestasi: [
      "Juara 1 Festival Hadroh Tingkat Kecamatan Wonoayu 2024",
      "Juara 2 Lomba Al-Banjari Kabupaten Sidoarjo 2024",
      "Penampil Terbaik Peringatan Maulid Nabi Kabupaten 2023",
    ],
    deskripsi:
      "Ekstrakurikuler Al-Banjari adalah kegiatan seni musik Islam yang menggunakan alat musik rebana untuk melantunkan shalawat dan syair-syair Islami. Kegiatan ini menumbuhkan kecintaan siswa terhadap seni budaya Islam sekaligus memperkuat iman dan akhlak.",
    manfaat: [
      "Mengenal dan melestarikan seni musik Islam tradisional",
      "Menumbuhkan kecintaan terhadap Nabi Muhammad SAW melalui shalawat",
      "Melatih kebersamaan, ritme, dan koordinasi tim",
      "Mempertebal nilai-nilai spiritual dan keislaman",
    ],
  },
  {
    id: "drumband",
    name: "Drumband",
    icon: Drum,
    color: "from-indigo-500 to-violet-600",
    badge: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-gradient-to-br from-indigo-500 to-violet-600",
    image: "/eskul-drumband.png",
    jadwal: "Rabu & Sabtu, 14.00–16.30 WIB",
    pembina: "Bpk. Dimas Ardiansyah, S.Pd",
    peserta: "40 siswa",
    prestasi: [
      "Juara 1 Drumband Tingkat Kecamatan Wonoayu 2024",
      "Juara 2 Festival Drumband Kabupaten Sidoarjo 2023",
      "Peserta Karnaval HUT RI Tingkat Kabupaten 2023",
    ],
    deskripsi:
      "Ekstrakurikuler Drumband merupakan salah satu kegiatan kebanggaan SDN Simoangin-angin yang melibatkan banyak siswa dalam satu formasi marching band yang megah. Melalui latihan rutin, siswa belajar memainkan berbagai instrumen perkusi dan pianika, serta melatih kekompakan dan disiplin.",
    manfaat: [
      "Melatih kedisiplinan, kekompakan, dan kerapian formasi",
      "Mengembangkan kemampuan musik dan rasa ritme",
      "Memupuk rasa bangga dan cinta terhadap sekolah",
      "Meningkatkan kepercayaan diri tampil di depan publik",
    ],
  },
];

export default function EkstrakurikulerPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-14">

      {/* ── Hero header ──────────────────────────────────────── */}
      <div className="mb-14 text-center">
        <motion.span
          className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-text"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          SDN Simoangin-angin
        </motion.span>
        <motion.h1
          className="font-display mt-4 text-4xl text-heading md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Ekstrakurikuler
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-base text-text-secondary"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          Pengembangan bakat, minat, dan karakter siswa melalui kegiatan
          ekstrakurikuler yang beragam dan berprestasi.
        </motion.p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap justify-center gap-5">
          {[
            { icon: Users, value: "200+", label: "Siswa aktif" },
            { icon: Star, value: "7", label: "Jenis eskul" },
            { icon: Trophy, value: "16+", label: "Prestasi diraih" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="card-hover flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white px-5 py-3 shadow-sm dark:bg-[var(--color-surface)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.1 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] dark:bg-[var(--color-panel)]">
                <s.icon className="h-4 w-4 text-accent-text" />
              </div>
              <div className="text-left">
                <p className="font-display text-xl font-bold text-heading">{s.value}</p>
                <p className="text-xs text-text-secondary">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Eskul cards ──────────────────────────────────────── */}
      <div className="space-y-16">
        {eskuls.map((eskul, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.article
              key={eskul.id}
              id={eskul.id}
              className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-md dark:bg-[var(--color-surface)]"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ boxShadow: "0 20px 48px rgba(29,78,137,0.13)" }}
            >
              <div className={`grid md:grid-cols-2 ${isEven ? "" : "md:[&>*:first-child]:order-2"}`}>

                {/* Image side */}
                <div className="relative min-h-[280px] overflow-hidden md:min-h-[400px]">
                  <Image
                    src={eskul.image}
                    alt={`Ekstrakurikuler ${eskul.name} SDN Simoangin-angin`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${eskul.color} opacity-20`} />
                  {/* Number badge */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg font-bold text-accent-text shadow-lg backdrop-blur-sm dark:bg-[var(--color-surface)]/90">
                    {idx + 1}
                  </div>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    {/* Header */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${eskul.iconBg} text-white shadow-md`}>
                        <eskul.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${eskul.badge}`}>
                          Ekstrakurikuler
                        </span>
                        <h2 className="font-display text-2xl text-heading md:text-3xl">
                          {eskul.name}
                        </h2>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                      {eskul.deskripsi}
                    </p>

                    {/* Benefits */}
                    <div className="mb-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-secondary">
                        Manfaat kegiatan
                      </p>
                      <ul className="space-y-1.5">
                        {eskul.manfaat.map((m) => (
                          <li key={m} className="flex items-start gap-2 text-sm text-text-secondary">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Prestasi */}
                    {eskul.prestasi.length > 0 && (
                      <div className="mb-5 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/10">
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                          <Trophy className="h-3.5 w-3.5" />
                          Prestasi
                        </p>
                        <ul className="space-y-1.5">
                          {eskul.prestasi.map((p) => (
                            <li key={p} className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300">
                              <Star className="mt-0.5 h-3 w-3 flex-shrink-0 fill-amber-500 text-amber-500" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-4">
                    <div>
                      <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        <Clock className="h-3 w-3" /> Jadwal
                      </p>
                      <p className="text-xs font-medium text-text-secondary">{eskul.jadwal}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        <Users className="h-3 w-3" /> Peserta
                      </p>
                      <p className="text-xs font-medium text-text-secondary">{eskul.peserta}</p>
                    </div>
                    <div>
                      <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        Pembina
                      </p>
                      <p className="text-xs font-medium text-text-secondary">{eskul.pembina}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* ── CTA bottom ──────────────────────────────────────── */}
      <motion.div
        className="mt-16 animate-gradient overflow-hidden rounded-3xl bg-gradient-to-r from-[var(--color-primary)] via-[#1d4e89] to-[#2a5f9a] p-8 text-center text-white shadow-xl md:p-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#ecd4a4]">
          Bergabung Bersama Kami
        </p>
        <h2 className="font-display mb-3 text-2xl font-bold md:text-3xl">Tertarik Bergabung?</h2>
        <p className="mb-8 max-w-xl mx-auto text-sm text-white/80">
          Daftarkan diri ke wali kelas atau langsung hubungi pembina ekstrakurikuler yang diminati.
          Pendaftaran dibuka setiap awal tahun ajaran.
        </p>
        <a
          href="/kontak"
          className="btn-pulse-gold inline-flex items-center gap-2 rounded-full bg-[var(--color-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
        >
          Hubungi Kami <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  );
}
