"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { FileText, Send, CheckCircle, Copy, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitLetterRequest } from "./actions";
import { LETTER_TYPE_LABELS } from "@/lib/school-config";

export default function LayananSuratPage() {
  const [state, formAction, isPending] = useActionState(submitLetterRequest, null);
  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  function copyTicket() {
    if (state?.ticketNumber) {
      navigator.clipboard.writeText(state.ticketNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  // Success state — show ticket number
  if (state?.success && state.ticketNumber && state.ticketNumber !== "FAKE-TICKET") {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        <div className="animate-fade-up rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-green-800 dark:text-green-300">
            Pengajuan Berhasil Dikirim!
          </h1>
          <p className="mt-2 text-sm text-green-700 dark:text-green-400">
            Simpan nomor tiket berikut untuk mengecek status pengajuan Anda:
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <code className="rounded-lg bg-white px-6 py-3 text-lg font-bold tracking-wider text-[var(--color-primary)] shadow-sm dark:bg-[var(--color-surface)]">
              {state.ticketNumber}
            </code>
            <Button variant="outline" size="sm" onClick={copyTicket}>
              <Copy className="h-4 w-4" />
              {copied ? "Tersalin!" : "Salin"}
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href={`/layanan-surat/cek?ticket=${state.ticketNumber}`}>
                <Search className="mr-2 h-4 w-4" />
                Cek Status Pengajuan
              </Link>
            </Button>
            <Button asChild>
              <Link href="/layanan-surat">
                <FileText className="mr-2 h-4 w-4" />
                Ajukan Surat Lagi
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      {/* Header */}
      <div className="mb-8 text-center animate-fade-up">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-blue-700 shadow-lg">
          <FileText className="h-7 w-7 text-white" />
        </div>
        <h1 className="font-display text-3xl font-bold text-heading md:text-4xl">
          Layanan Surat Online
        </h1>
        <p className="mt-2 text-text-secondary">
          Ajukan surat keterangan secara online. Isi formulir di bawah ini dan simpan nomor tiket
          untuk mengecek status pengajuan.
        </p>
        <div className="mt-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/layanan-surat/cek">
              <Search className="mr-2 h-4 w-4" />
              Sudah punya tiket? Cek status di sini
            </Link>
          </Button>
        </div>
      </div>

      {/* Error message */}
      {state?.error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      {/* Form */}
      <Card className="animate-fade-up delay-150">
        <CardHeader>
          <CardTitle className="text-lg">Formulir Pengajuan Surat</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            {/* Honeypot — hidden from real users */}
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <label htmlFor="website_url">Jangan isi field ini</label>
              <input
                type="text"
                id="website_url"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Jenis Surat */}
            <div className="space-y-2">
              <Label htmlFor="letterType">Jenis Surat *</Label>
              <select
                id="letterType"
                name="letterType"
                required
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm dark:bg-[var(--color-surface)]"
              >
                <option value="" disabled>
                  Pilih jenis surat
                </option>
                {Object.entries(LETTER_TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {state?.fieldErrors?.letterType && (
                <p className="text-xs text-red-500">{state.fieldErrors.letterType[0]}</p>
              )}
            </div>

            {/* Data Pemohon */}
            <fieldset className="space-y-4 rounded-xl border border-[var(--color-border)] p-4">
              <legend className="px-2 text-sm font-semibold text-heading">Data Pemohon / Wali Murid</legend>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="applicantName">Nama Pemohon *</Label>
                  <Input id="applicantName" name="applicantName" required placeholder="Nama lengkap pemohon" />
                  {state?.fieldErrors?.applicantName && (
                    <p className="text-xs text-red-500">{state.fieldErrors.applicantName[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicantPhone">No HP / WhatsApp *</Label>
                  <Input id="applicantPhone" name="applicantPhone" type="tel" required placeholder="08xxxxxxxxxx" />
                  {state?.fieldErrors?.applicantPhone && (
                    <p className="text-xs text-red-500">{state.fieldErrors.applicantPhone[0]}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicantEmail">Email (opsional)</Label>
                <Input id="applicantEmail" name="applicantEmail" type="email" placeholder="email@contoh.com" />
                {state?.fieldErrors?.applicantEmail && (
                  <p className="text-xs text-red-500">{state.fieldErrors.applicantEmail[0]}</p>
                )}
              </div>
            </fieldset>

            {/* Data Siswa */}
            <fieldset className="space-y-4 rounded-xl border border-[var(--color-border)] p-4">
              <legend className="px-2 text-sm font-semibold text-heading">Data Siswa</legend>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Nama Siswa *</Label>
                  <Input id="studentName" name="studentName" required placeholder="Nama lengkap siswa" />
                  {state?.fieldErrors?.studentName && (
                    <p className="text-xs text-red-500">{state.fieldErrors.studentName[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nisn">NISN *</Label>
                  <Input id="nisn" name="nisn" required placeholder="Nomor Induk Siswa Nasional" />
                  {state?.fieldErrors?.nisn && (
                    <p className="text-xs text-red-500">{state.fieldErrors.nisn[0]}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="studentClass">Kelas *</Label>
                  <Input id="studentClass" name="studentClass" required placeholder="Contoh: 5A" />
                  {state?.fieldErrors?.studentClass && (
                    <p className="text-xs text-red-500">{state.fieldErrors.studentClass[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                  <Input id="birthPlace" name="birthPlace" required placeholder="Kota / Kabupaten" />
                  {state?.fieldErrors?.birthPlace && (
                    <p className="text-xs text-red-500">{state.fieldErrors.birthPlace[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                  <Input id="birthDate" name="birthDate" type="date" required />
                  {state?.fieldErrors?.birthDate && (
                    <p className="text-xs text-red-500">{state.fieldErrors.birthDate[0]}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentName">Nama Orang Tua / Wali (sesuai KK) *</Label>
                <Input id="parentName" name="parentName" required placeholder="Nama orang tua atau wali" />
                {state?.fieldErrors?.parentName && (
                  <p className="text-xs text-red-500">{state.fieldErrors.parentName[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Alamat Lengkap *</Label>
                <Textarea id="address" name="address" required placeholder="Alamat sesuai KK" rows={3} />
                {state?.fieldErrors?.address && (
                  <p className="text-xs text-red-500">{state.fieldErrors.address[0]}</p>
                )}
              </div>
            </fieldset>

            {/* Conditional Fields: TRANSFER (Pindah Sekolah) */}
            {selectedType === "TRANSFER" && (
              <fieldset className="space-y-4 rounded-xl border border-blue-200 bg-blue-50/30 p-4 dark:border-blue-900 dark:bg-blue-900/10">
                <legend className="px-2 text-sm font-semibold text-blue-700 dark:text-blue-400">Data Pindah Sekolah</legend>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Jenis Kelamin *</Label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      defaultValue=""
                      className="flex h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm dark:bg-[var(--color-surface)]"
                    >
                      <option value="" disabled>Pilih</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    {state?.fieldErrors?.gender && (
                      <p className="text-xs text-red-500">{state.fieldErrors.gender[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentJob">Pekerjaan Orang Tua *</Label>
                    <Input id="parentJob" name="parentJob" required placeholder="Contoh: Wiraswasta" />
                    {state?.fieldErrors?.parentJob && (
                      <p className="text-xs text-red-500">{state.fieldErrors.parentJob[0]}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetSchool">Sekolah Tujuan *</Label>
                  <Textarea id="targetSchool" name="targetSchool" required placeholder="Nama dan alamat sekolah tujuan" rows={2} />
                  {state?.fieldErrors?.targetSchool && (
                    <p className="text-xs text-red-500">{state.fieldErrors.targetSchool[0]}</p>
                  )}
                </div>
              </fieldset>
            )}

            {/* Conditional Fields: ACCEPTANCE (Penerimaan Siswa Pindahan) */}
            {selectedType === "ACCEPTANCE" && (
              <fieldset className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 dark:border-emerald-900 dark:bg-emerald-900/10">
                <legend className="px-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">Data Siswa Pindahan</legend>
                <div className="space-y-2">
                  <Label htmlFor="previousSchool">Sekolah Asal *</Label>
                  <Input id="previousSchool" name="previousSchool" required placeholder="Contoh: SDN Cukir 1" />
                  {state?.fieldErrors?.previousSchool && (
                    <p className="text-xs text-red-500">{state.fieldErrors.previousSchool[0]}</p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Nama Ayah *</Label>
                    <Input id="fatherName" name="fatherName" required placeholder="Nama lengkap ayah" />
                    {state?.fieldErrors?.fatherName && (
                      <p className="text-xs text-red-500">{state.fieldErrors.fatherName[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Nama Ibu *</Label>
                    <Input id="motherName" name="motherName" required placeholder="Nama lengkap ibu" />
                    {state?.fieldErrors?.motherName && (
                      <p className="text-xs text-red-500">{state.fieldErrors.motherName[0]}</p>
                    )}
                  </div>
                </div>
              </fieldset>
            )}

            {/* Keperluan */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Keperluan Surat *</Label>
              <Textarea
                id="purpose"
                name="purpose"
                required
                placeholder="Contoh: mendaftar ke SMP Negeri 1 Sidoarjo"
                rows={3}
              />
              <p className="text-xs text-text-muted">
                Teks ini akan digunakan langsung sebagai kalimat &ldquo;digunakan untuk ...&rdquo; di surat resmi.
              </p>
              {state?.fieldErrors?.purpose && (
                <p className="text-xs text-red-500">{state.fieldErrors.purpose[0]}</p>
              )}
            </div>

            {/* Catatan */}
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan (opsional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Informasi tambahan jika ada"
                rows={2}
              />
            </div>

            {/* Submit */}
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                "Mengirim..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Kirim Pengajuan
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
