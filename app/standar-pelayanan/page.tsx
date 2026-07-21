"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function StandarPelayananPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-8 md:px-6 md:py-12">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
        >
          <FileText className="h-8 w-8" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl font-bold tracking-tight text-heading md:text-5xl"
        >
          Standar Pelayanan
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-text-secondary md:text-lg"
        >
          Dokumen Standar Pelayanan Publik SDN Simoangin-angin.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-2 shadow-xl dark:bg-[var(--color-surface)] md:p-4"
      >
        <div className="relative flex w-full justify-center h-[80vh] min-h-[600px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-900 border border-[var(--color-border)]">
          {/* We use iframe to embed the PDF viewer provided by the browser */}
          <iframe
            src="/SK_Standar_Pelayanan.pdf#view=FitH"
            className="h-full w-full border-none"
            title="Standar Pelayanan PDF"
          />
        </div>
      </motion.div>
    </div>
  );
}
