"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="font-display text-3xl text-heading">Terjadi Kesalahan</h2>
      <p className="text-text-secondary">Sistem sedang mengalami gangguan. Silakan coba lagi.</p>
      <Button onClick={reset}>Coba Lagi</Button>
    </section>
  );
}
