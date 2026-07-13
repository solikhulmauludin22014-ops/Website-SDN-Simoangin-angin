"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.ok) {
      toast.success("Login berhasil! Mengalihkan ke dashboard...");
      router.push("/admin/dashboard");
      return;
    }

    toast.error("Email atau password tidak valid");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-50 dark:bg-[#0f172a]">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
          alt="Perpustakaan Background"
          fill
          className="object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#143f71]/10 to-transparent" />
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-[var(--color-secondary)]/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-[#143f71]/10 blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white/80 dark:bg-[var(--color-surface)]/90 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#143f71] to-[#1d4e89] p-8 text-center text-white">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-inner"
            >
              <ShieldCheck className="h-8 w-8 text-[var(--color-secondary)]" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold tracking-wide">Portal Admin</h1>
            <p className="mt-1 text-sm text-blue-200">Perpustakaan Digital SDN Simoangin-angin</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-secondary font-medium ml-1">Email Sekolah</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="admin@sdn-simoanginangin.sch.id"
                    required 
                    className="pl-10 py-6 bg-stone-50/50 dark:bg-[var(--color-panel)]/50 border-stone-200 dark:border-stone-700 focus-visible:ring-[var(--color-primary)] rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-secondary font-medium ml-1">Kata Sandi</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••"
                    required 
                    className="pl-10 py-6 bg-stone-50/50 dark:bg-[var(--color-panel)]/50 border-stone-200 dark:border-stone-700 focus-visible:ring-[var(--color-primary)] rounded-xl"
                  />
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button 
                  type="submit" 
                  className="w-full py-6 text-base font-semibold bg-[var(--color-primary)] hover:bg-[#11335c] text-white rounded-xl shadow-md transition-all" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Memverifikasi...
                    </div>
                  ) : (
                    "Masuk ke Dashboard"
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
          
          <div className="bg-stone-50 dark:bg-stone-900/30 p-4 text-center border-t border-[var(--color-border)]">
            <p className="text-xs text-text-secondary">
              Akses terbatas hanya untuk staf perpustakaan dan tata usaha.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
