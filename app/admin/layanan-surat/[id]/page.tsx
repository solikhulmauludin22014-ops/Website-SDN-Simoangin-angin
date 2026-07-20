"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
  Trash2,
  Save,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LETTER_TYPE_LABELS,
  REQUEST_STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/school-config";

type LetterDetail = {
  id: string;
  ticketNumber: string;
  letterType: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string | null;
  studentName: string;
  nisn: string;
  studentClass: string;
  birthPlace: string;
  birthDate: string;
  parentName: string;
  address: string;
  purpose: string;
  notes: string | null;
  status: string;
  officialNumber: string | null;
  officialDate: string | null;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function AdminDetailSuratPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<LetterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Update form state
  const [status, setStatus] = useState("");
  const [officialNumber, setOfficialNumber] = useState("");
  const [officialDate, setOfficialDate] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  useEffect(() => {
    fetch(`/api/admin/letter-requests/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((record: LetterDetail) => {
        setData(record);
        setStatus(record.status);
        setOfficialNumber(record.officialNumber ?? "");
        setOfficialDate(
          record.officialDate
            ? new Date(record.officialDate).toISOString().slice(0, 10)
            : ""
        );
        setAdminNotes(record.adminNotes ?? "");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Gagal memuat data");
        setLoading(false);
      });
  }, [id]);

  async function handleUpdate() {
    setSaving(true);

    const payload: Record<string, unknown> = { status };
    if (officialNumber) payload.officialNumber = officialNumber;
    if (officialDate) payload.officialDate = officialDate;
    payload.adminNotes = adminNotes;

    const response = await fetch(`/api/admin/letter-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!response.ok) {
      toast.error("Gagal memperbarui pengajuan");
      return;
    }

    const updated = await response.json();
    setData(updated);
    toast.success("Pengajuan berhasil diperbarui");
  }

  async function handleDelete() {
    const ok = confirm(
      "Yakin hapus pengajuan ini? Data tidak bisa dikembalikan."
    );
    if (!ok) return;

    const response = await fetch(`/api/admin/letter-requests/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Gagal menghapus pengajuan");
      return;
    }

    toast.success("Pengajuan berhasil dihapus");
    router.push("/admin/layanan-surat");
  }

  if (loading) {
    return (
      <section className="space-y-4">
        <p className="text-sm text-text-secondary">Memuat data pengajuan...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="space-y-4">
        <p className="text-sm text-red-500">Data pengajuan tidak ditemukan.</p>
        <Button asChild variant="outline">
          <Link href="/admin/layanan-surat">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Link>
        </Button>
      </section>
    );
  }

  const canGeneratePdf =
    data.status === "COMPLETED" && data.officialNumber;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/layanan-surat">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-2xl text-[var(--color-primary)]">
              Detail Pengajuan
            </h1>
            <p className="font-mono text-xs text-text-muted">
              {data.ticketNumber}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {canGeneratePdf && (
            <>
              <Button asChild variant="outline" size="sm">
                <a
                  href={`/api/admin/letter-requests/${id}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Lihat PDF
                </a>
              </Button>
              <Button asChild size="sm">
                <a
                  href={`/api/admin/letter-requests/${id}/pdf?download=1`}
                  download
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Detail info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Informasi Pengajuan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {/* Status badge */}
            <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface)] p-3">
              <span className="text-text-muted">Status</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  STATUS_COLORS[data.status] ?? ""
                }`}
              >
                {REQUEST_STATUS_LABELS[data.status] ?? data.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-text-muted">
              <FileText className="h-4 w-4" />
              <span>Jenis:</span>
              <span className="font-medium text-[var(--color-ink)]">
                {LETTER_TYPE_LABELS[data.letterType] ?? data.letterType}
              </span>
            </div>

            {/* Pemohon */}
            <div className="space-y-2 rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Data Pemohon
              </p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-muted" />
                <span>{data.applicantName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-text-muted" />
                <span>{data.applicantPhone}</span>
              </div>
              {data.applicantEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-text-muted" />
                  <span>{data.applicantEmail}</span>
                </div>
              )}
            </div>

            {/* Siswa */}
            <div className="space-y-2 rounded-lg border border-[var(--color-border)] p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Data Siswa
              </p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-muted" />
                <span className="font-semibold">{data.studentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-text-muted" />
                <span>NISN: {data.nisn}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-text-muted" />
                <span>Kelas: {data.studentClass}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-text-muted" />
                <span>
                  {data.birthPlace},{" "}
                  {new Date(data.birthDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-text-muted" />
                <span>Orang tua: {data.parentName}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-text-muted" />
                <span>{data.address}</span>
              </div>
            </div>

            {/* Keperluan */}
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Keperluan
              </p>
              <p className="rounded-lg bg-[var(--color-surface)] p-3">
                {data.purpose}
              </p>
            </div>

            {data.notes && (
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Catatan Pemohon
                </p>
                <p className="rounded-lg bg-[var(--color-surface)] p-3">
                  {data.notes}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              Diajukan:{" "}
              {new Date(data.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right: Update form */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tindakan Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm dark:bg-[var(--color-surface)]"
                >
                  <option value="PENDING">Menunggu</option>
                  <option value="PROCESSING">Diproses</option>
                  <option value="COMPLETED">Selesai</option>
                  <option value="REJECTED">Ditolak</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="officialNumber">Nomor Surat</Label>
                <Input
                  id="officialNumber"
                  value={officialNumber}
                  onChange={(e) => setOfficialNumber(e.target.value)}
                  placeholder="Contoh: 420/SDN-SA/VII/2026"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="officialDate">Tanggal Surat</Label>
                <Input
                  id="officialDate"
                  type="date"
                  value={officialDate}
                  onChange={(e) => setOfficialDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminNotes">Catatan Admin</Label>
                <Textarea
                  id="adminNotes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  placeholder="Catatan internal admin..."
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleUpdate} disabled={saving} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* PDF info */}
          {status === "COMPLETED" && !officialNumber && (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400">
              <p className="font-semibold">Belum bisa generate PDF</p>
              <p className="mt-1">
                Isi nomor surat terlebih dahulu, lalu simpan, untuk bisa
                meng-generate PDF surat resmi.
              </p>
            </div>
          )}

          {canGeneratePdf && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
              <p className="font-semibold">PDF siap di-generate!</p>
              <p className="mt-1">
                Klik tombol &ldquo;Lihat PDF&rdquo; di atas untuk membuka surat resmi di browser,
                atau &ldquo;Download PDF&rdquo; untuk mengunduhnya.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
