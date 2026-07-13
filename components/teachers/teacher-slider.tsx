"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";

type Teacher = {
  name: string;
  role: string;
  photo: string;
  color: string;
  containerStyle?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
};

const teachers: Teacher[] = [
  {
    name: "Siti Nur Okvia R.Y, S.Pd.",
    role: "Wali Kelas 1A",
    photo: "/Siti Nur Okvia R.Y, S.Pd. (Wali Kelas 1A).jpeg",
    color: "from-sky-400 to-blue-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Siti Aisah, S.Pd.",
    role: "Wali Kelas 1B",
    photo: "/Siti Aisah, S.Pd. (Wali Kelas 1B).png",
    color: "from-pink-400 to-rose-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Rizki Mu'anazah, S.Pd.",
    role: "Wali Kelas 2A",
    photo: "/Rizki Mu'anazah, S.Pd. (Wali Kelas 2A).jpeg",
    color: "from-violet-400 to-purple-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Fanny Indah Pramesty S.Pd.",
    role: "Wali Kelas 3A",
    photo: "/Fanny_Indah_Pramesty_S.Pd.__Wali_Kelas_3A.png",
    color: "from-emerald-400 to-teal-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Rahma Listia C, S.Pd.",
    role: "Wali Kelas 4A",
    photo: "/Rahma Liztia C, S.Pd. (Wlali Kelas 3A).jpeg",
    color: "from-lime-400 to-green-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Ertine Ermayanti, S.Pd.",
    role: "Wali Kelas 3B",
    photo: "/Ertine_Ermayanti__S.Pd___Wali_Kelas_3B.png",
    color: "from-amber-400 to-orange-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Karel Hidayatulloh, S.Pd.",
    role: "Wali Kelas 4B",
    photo: "/Karel Hidayatulloh, S.Pd. (Wali Kelas 4B).jpeg",
    color: "from-cyan-400 to-blue-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Fithrotin Fauziyah C, S.Pd.",
    role: "Wali Kelas 5B",
    photo: "/Fithrotin Fauziyah C, S.Pd. (Wali Kelas 5B).jpeg",
    color: "from-fuchsia-400 to-pink-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Dwi Nova Maulidah, S.Pd.",
    role: "Wali Kelas 6A",
    photo: "/Dwi Nova Maulidah, S.Pd. (Wali Kelas 6A).jpg",
    color: "from-indigo-400 to-violet-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Ilham Dwi Tanjung, S.Pd.",
    role: "Guru PJOK Kelas 1–3",
    photo: "/Ilham Dwi Tanjung, S.Pd. (Guru PJOK 1-3).jpeg",
    color: "from-orange-400 to-red-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
  {
    name: "Umi Khaulatul Mawali, S.Pd.",
    role: "Guru PAI & BTQ",
    photo: "/Umi Khaulatul Mawali, S.Pd. (Guru PAI & BTQ).jpeg",
    color: "from-teal-400 to-emerald-500",
    imgStyle: { objectFit: "cover", objectPosition: "50% 0%" },
  },
];

const CARD_W = 212;

export function TeacherSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const idx = Math.round(el.scrollLeft / CARD_W);
    setActiveIdx(Math.min(idx, teachers.length - 1));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: CARD_W, behavior: "smooth" });
      }
    }, 3500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  const stopAuto = () => { if (autoRef.current) clearInterval(autoRef.current); };

  const scroll = (dir: "prev" | "next") => {
    stopAuto();
    trackRef.current?.scrollBy({
      left: dir === "next" ? CARD_W * 3 : -CARD_W * 3,
      behavior: "smooth",
    });
  };

  const scrollTo = (idx: number) => {
    stopAuto();
    trackRef.current?.scrollTo({ left: idx * CARD_W, behavior: "smooth" });
  };

  return (
    <section>
      {/* Header */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <span className="inline-block rounded-full bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-text">
            Tenaga Pendidik
          </span>
          <h2 className="font-display mt-2 text-3xl text-heading md:text-4xl">
            Profil Guru
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            aria-label="Sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] shadow-sm transition-all duration-200 hover:scale-110 hover:border-accent-text hover:text-accent-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("next")}
            disabled={!canNext}
            aria-label="Berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] shadow-sm transition-all duration-200 hover:scale-110 hover:border-accent-text hover:text-accent-text disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Track */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

        <div
          ref={trackRef}
          onMouseEnter={stopAuto}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {teachers.map((teacher, idx) => (
            <div
              key={teacher.name}
              className="group relative flex-shrink-0 cursor-pointer"
              style={{ width: 192 }}
              onClick={() => scrollTo(idx)}
            >
              <div className="card-hover overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] shadow-md transition-all duration-300 group-hover:border-[var(--color-secondary)]">
                {/* Photo container */}
                <div
                  className="relative h-52 overflow-hidden"
                  style={teacher.containerStyle}
                >
                  {/* Colour top strip */}
                  <div
                    className={`absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r ${teacher.color}`}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(teacher.photo)}
                    alt={`Foto ${teacher.name}`}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    style={teacher.imgStyle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <div className="p-3.5">
                  <p className="truncate text-sm font-semibold text-[var(--color-ink)] group-hover:text-heading">
                    {teacher.name}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div
                      className={`h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br ${teacher.color}`}
                    />
                    <p className="truncate text-xs text-text-secondary">{teacher.role}</p>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-text-secondary">
                    <GraduationCap className="h-3 w-3" />
                    SDN Simoangin-angin
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {teachers.map((t, idx) => (
          <button
            key={t.name}
            onClick={() => scrollTo(idx)}
            aria-label={`Ke ${t.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${activeIdx === idx
              ? "w-6 bg-heading"
              : "w-1.5 bg-[var(--color-border)] hover:bg-stone-400 dark:hover:bg-stone-500"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
