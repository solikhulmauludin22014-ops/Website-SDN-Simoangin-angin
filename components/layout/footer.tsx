import { MapPin, Phone, Mail, BookOpen, Clock, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-primary)] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-sdn.png.png"
                alt="Logo SDN Simoangin-angin"
                className="h-12 w-12 rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-[var(--color-primary)]"
              />
              <div>
                <p className="font-display text-base font-bold tracking-wide">SDN SIMOANGIN-ANGIN</p>
                <p className="text-xs text-blue-200">Wonoayu · Sidoarjo · Jawa Timur</p>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              Terwujudnya peserta didik yang beriman, bertakwa, berakhlak mulia, berprestasi, dan berwawasan lingkungan.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/sdnsimoangin?igsh=dnN1bWEzZ2RqaGxx"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </a>
              <a
                href="https://www.youtube.com/@sdnsimoangin4753"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-[#FF0000] hover:shadow-lg"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
              </a>
            </div>
            <p className="text-xs font-semibold tracking-widest text-yellow-300 uppercase pt-1">
              TUT WURI HANDAYANI
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" />
              Navigasi
            </p>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/perpustakaan", label: "Perpustakaan Digital" },
                { href: "/profil", label: "Profil Sekolah" },
                { href: "/ekstrakurikuler", label: "Ekstrakurikuler" },
                { href: "/kontak", label: "Kontak" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-100 transition-all duration-200 hover:text-yellow-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Informasi Kontak
            </p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-300" />
                Jl. Simoangin-angin RT. 07/RW. 04, Wonoayu, Sidoarjo, Jawa Timur
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-yellow-300" />
                (085) 655914559
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-yellow-300" />
                sdnsimoangin@gmail.com
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-300" />
                <span>
                  Senin–Kamis: 07.00–14.30<br />
                  Jum&apos;at: 07.00–11.00<br />
                  Sabtu: 07.00–12.30
                </span>
              </li>
            </ul>
          </div>


          {/* Map */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Lokasi Kami
            </p>
            <div className="overflow-hidden rounded-xl border border-white/20 shadow-inner h-44 w-full relative bg-blue-900/50">
              <iframe
                src="https://maps.google.com/maps?q=SDN%20Simoangin-angin%20Wonoayu&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-800 pt-6 text-center text-xs text-blue-300">
          © {new Date().getFullYear()} Solikhul Mauludin, S.Pd. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
