"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, FileText, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkLetterStatus } from "../actions";
import {
  LETTER_TYPE_LABELS,
  REQUEST_STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/school-config";

type StatusResult = {
  ticketNumber: string;
  letterType: string;
  studentName: string;
  status: string;
  createdAt: Date;
  officialNumber: string | null;
  officialDate: Date | null;
};

const STATUS_ICONS: Record<string, typeof Clock> = {
  PENDING: Clock,
  PROCESSING: Loader2,
  COMPLETED: CheckCircle,
  REJECTED: XCircle,
};

export default function CekStatusPage() {
  const searchParams = useSearchParams();
  const ticketParam = searchParams.get("ticket") ?? "";

  const [ticket, setTicket] = useState(ticketParam);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-search if ticket in URL
  useEffect(() => {
    if (ticketParam) {
      handleSearch(ticketParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketParam]);

  async function handleSearch(value?: string) {
    const searchTicket = value ?? ticket;
    if (!searchTicket.trim()) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);

    const data = await checkLetterStatus(searchTicket.trim());

    if (data) {
      setResult(data as StatusResult);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch();
  }

  const StatusIcon = result ? STATUS_ICONS[result.status] ?? Clock : Clock;

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      {/* Header */}
      <div className="mb-8 text-center animate-fade-up">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-blue-700 shadow-lg">
          <Search className="h-7 w-7 text-white" />
        </div>
        <h1 className="font-display text-3xl font-bold text-heading">Cek Status Pengajuan</h1>
        <p className="mt-2 text-text-secondary">
          Masukkan nomor tiket yang Anda terima setelah mengirim pengajuan surat.
        </p>
      </div>

      {/* Search form */}
      <Card className="mb-6 animate-fade-up delay-150">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="ticket" className="sr-only">
                Nomor Tiket
              </Label>
              <Input
                id="ticket"
                value={ticket}
                onChange={(e) => setTicket(e.target.value)}
                placeholder="Masukkan nomor tiket..."
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Cek
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Not found */}
      {notFound && (
        <div className="animate-fade-up rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-950/30">
          <XCircle className="mx-auto mb-2 h-8 w-8 text-red-500" />
          <p className="font-semibold text-red-700 dark:text-red-400">Tiket tidak ditemukan</p>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Pastikan nomor tiket yang Anda masukkan sudah benar.
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <Card className="animate-fade-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              Detail Pengajuan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status badge */}
            <div className="flex items-center justify-center gap-3 rounded-xl bg-[var(--color-surface)] p-4">
              <StatusIcon
                className={`h-6 w-6 ${
                  result.status === "COMPLETED"
                    ? "text-green-600"
                    : result.status === "REJECTED"
                    ? "text-red-500"
                    : result.status === "PROCESSING"
                    ? "animate-spin text-blue-500"
                    : "text-yellow-500"
                }`}
              />
              <div>
                <p className="text-xs text-text-muted">Status</p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                    STATUS_COLORS[result.status] ?? ""
                  }`}
                >
                  {REQUEST_STATUS_LABELS[result.status] ?? result.status}
                </span>
              </div>
            </div>

            {/* Info table */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span className="text-text-muted">Nomor Tiket</span>
                <span className="font-mono font-semibold">{result.ticketNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span className="text-text-muted">Jenis Surat</span>
                <span>{LETTER_TYPE_LABELS[result.letterType] ?? result.letterType}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span className="text-text-muted">Nama Siswa</span>
                <span>{result.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span className="text-text-muted">Tanggal Pengajuan</span>
                <span>{new Date(result.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              {result.officialNumber && (
                <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                  <span className="text-text-muted">Nomor Surat</span>
                  <span className="font-semibold">{result.officialNumber}</span>
                </div>
              )}
              {result.officialDate && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Tanggal Surat</span>
                  <span>{new Date(result.officialDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Back link */}
      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/layanan-surat">
            <FileText className="mr-2 h-4 w-4" />
            Ajukan Surat Baru
          </Link>
        </Button>
      </div>
    </section>
  );
}
