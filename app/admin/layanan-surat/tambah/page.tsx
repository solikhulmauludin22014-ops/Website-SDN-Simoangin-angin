import { LetterRequestForm } from "@/components/admin/letter-request-form";

export default function AdminTambahSuratPage() {
  return (
    <section className="space-y-4">
      <h1 className="font-display text-3xl text-[var(--color-primary)]">
        Tambah Pengajuan Manual
      </h1>
      <p className="text-sm text-text-secondary">
        Gunakan form ini untuk menginput pengajuan surat yang diajukan langsung ke sekolah (offline).
      </p>
      <LetterRequestForm />
    </section>
  );
}
