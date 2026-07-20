"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LETTER_TYPE_LABELS } from "@/lib/school-config";

export function LetterRequestForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      letterType: String(form.get("letterType") ?? ""),
      applicantName: String(form.get("applicantName") ?? "").trim(),
      applicantPhone: String(form.get("applicantPhone") ?? "").trim(),
      applicantEmail: String(form.get("applicantEmail") ?? "").trim() || undefined,
      studentName: String(form.get("studentName") ?? "").trim(),
      nisn: String(form.get("nisn") ?? "").trim(),
      studentClass: String(form.get("studentClass") ?? "").trim(),
      birthPlace: String(form.get("birthPlace") ?? "").trim(),
      birthDate: String(form.get("birthDate") ?? ""),
      
      gender: String(form.get("gender") ?? "") || undefined,
      parentJob: String(form.get("parentJob") ?? "").trim() || undefined,
      targetSchool: String(form.get("targetSchool") ?? "").trim() || undefined,
      previousSchool: String(form.get("previousSchool") ?? "").trim() || undefined,
      fatherName: String(form.get("fatherName") ?? "").trim() || undefined,
      motherName: String(form.get("motherName") ?? "").trim() || undefined,

      parentName: String(form.get("parentName") ?? "").trim(),
      address: String(form.get("address") ?? "").trim(),
      purpose: String(form.get("purpose") ?? "").trim(),
      notes: String(form.get("notes") ?? "").trim() || undefined,
    };

    const response = await fetch("/api/admin/letter-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      toast.error("Gagal menyimpan pengajuan");
      return;
    }

    toast.success("Pengajuan surat berhasil ditambahkan");
    router.push("/admin/layanan-surat");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pengajuan Surat</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
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
              <option value="" disabled>Pilih jenis surat</option>
              {Object.entries(LETTER_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Data Pemohon */}
          <fieldset className="space-y-4 rounded-xl border border-[var(--color-border)] p-4">
            <legend className="px-2 text-sm font-semibold text-heading">Data Pemohon</legend>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="applicantName">Nama Pemohon *</Label>
                <Input id="applicantName" name="applicantName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="applicantPhone">No HP / WhatsApp *</Label>
                <Input id="applicantPhone" name="applicantPhone" type="tel" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicantEmail">Email (opsional)</Label>
              <Input id="applicantEmail" name="applicantEmail" type="email" />
            </div>
          </fieldset>

          {/* Data Siswa */}
          <fieldset className="space-y-4 rounded-xl border border-[var(--color-border)] p-4">
            <legend className="px-2 text-sm font-semibold text-heading">Data Siswa</legend>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="studentName">Nama Siswa *</Label>
                <Input id="studentName" name="studentName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nisn">NISN *</Label>
                <Input id="nisn" name="nisn" required />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="studentClass">Kelas *</Label>
                <Input id="studentClass" name="studentClass" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Tempat Lahir *</Label>
                <Input id="birthPlace" name="birthPlace" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Tanggal Lahir *</Label>
                <Input id="birthDate" name="birthDate" type="date" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentName">Nama Orang Tua / Wali *</Label>
              <Input id="parentName" name="parentName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap *</Label>
              <Textarea id="address" name="address" required rows={3} />
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentJob">Pekerjaan Orang Tua *</Label>
                  <Input id="parentJob" name="parentJob" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetSchool">Sekolah Tujuan *</Label>
                <Textarea id="targetSchool" name="targetSchool" required rows={2} />
              </div>
            </fieldset>
          )}

          {/* Conditional Fields: ACCEPTANCE (Penerimaan Siswa Pindahan) */}
          {selectedType === "ACCEPTANCE" && (
            <fieldset className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 dark:border-emerald-900 dark:bg-emerald-900/10">
              <legend className="px-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">Data Siswa Pindahan</legend>
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Sekolah Asal *</Label>
                <Input id="previousSchool" name="previousSchool" required />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fatherName">Nama Ayah *</Label>
                  <Input id="fatherName" name="fatherName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motherName">Nama Ibu *</Label>
                  <Input id="motherName" name="motherName" required />
                </div>
              </div>
            </fieldset>
          )}

          {/* Keperluan */}
          <div className="space-y-2">
            <Label htmlFor="purpose">Keperluan Surat *</Label>
            <Textarea id="purpose" name="purpose" required rows={3} />
          </div>

          {/* Catatan */}
          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (opsional)</Label>
            <Textarea id="notes" name="notes" rows={2} />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Pengajuan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
