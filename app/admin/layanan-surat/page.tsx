"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { Plus, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LETTER_TYPE_LABELS,
  REQUEST_STATUS_LABELS,
  STATUS_COLORS,
} from "@/lib/school-config";

type LetterRow = {
  id: string;
  ticketNumber: string;
  letterType: string;
  studentName: string;
  applicantName: string;
  status: string;
  createdAt: string;
};

const fetcher = async (url: string): Promise<LetterRow[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed");
  return response.json();
};

export default function AdminLayananSuratPage() {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (statusFilter !== "ALL") params.set("status", statusFilter);
    if (searchQuery) params.set("search", searchQuery);
    const qs = params.toString();
    return `/api/admin/letter-requests${qs ? `?${qs}` : ""}`;
  }, [statusFilter, searchQuery]);

  const {
    data: requests = [],
    isLoading,
    mutate,
  } = useSWR(endpoint, fetcher, {
    onError: () => toast.error("Gagal memuat data pengajuan"),
  });

  async function removeRequest(id: string) {
    const ok = confirm("Yakin hapus pengajuan ini? Data tidak bisa dikembalikan.");
    if (!ok) return;

    const response = await fetch(`/api/admin/letter-requests/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Gagal menghapus pengajuan");
      return;
    }

    toast.success("Pengajuan berhasil dihapus");
    void mutate();
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-[var(--color-primary)]">
          Layanan Surat
        </h1>
        <Button asChild>
          <Link href="/admin/layanan-surat/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Manual
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-border)] bg-white p-4 dark:bg-[var(--color-surface)] sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, pemohon, atau tiket..."
            className="pl-9"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 rounded-md border border-[var(--color-border)] bg-white px-3 text-sm dark:bg-[var(--color-surface)]"
        >
          <option value="ALL">Semua Status</option>
          <option value="PENDING">Menunggu</option>
          <option value="PROCESSING">Diproses</option>
          <option value="COMPLETED">Selesai</option>
          <option value="REJECTED">Ditolak</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-white p-2 dark:bg-[var(--color-surface)]">
        {isLoading ? (
          <p className="p-6 text-sm text-text-secondary">Memuat data pengajuan...</p>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-8 text-center text-text-muted">
            <FileText className="h-10 w-10 opacity-40" />
            <p className="text-sm">Belum ada pengajuan surat.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiket</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Jenis Surat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-mono text-xs">{req.ticketNumber}</TableCell>
                  <TableCell>{req.studentName}</TableCell>
                  <TableCell className="text-xs">
                    {LETTER_TYPE_LABELS[req.letterType] ?? req.letterType}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        STATUS_COLORS[req.status] ?? ""
                      }`}
                    >
                      {REQUEST_STATUS_LABELS[req.status] ?? req.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    {new Date(req.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/admin/layanan-surat/${req.id}`}>Detail</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeRequest(req.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
