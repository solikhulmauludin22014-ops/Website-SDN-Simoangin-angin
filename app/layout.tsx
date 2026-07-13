import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { AuthProvider } from "@/components/providers/session-provider";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SDN Simoangin-angin | Website Sekolah & Perpustakaan Digital",
  description:
    "Website resmi SDN Simoangin-angin Wonoayu Sidoarjo dengan perpustakaan digital untuk akses e-book siswa, guru, dan orang tua.",
  keywords: ["sekolah dasar", "perpustakaan digital", "ebook", "SDN Simoangin-angin", "Wonoayu", "Sidoarjo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakartaSans.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-ink)] transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </div>
            <ToasterProvider />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
