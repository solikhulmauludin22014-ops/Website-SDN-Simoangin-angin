"use client";

import Link from "next/link";
import useSWR from "swr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BookRow = {
  id: string;
  title: string;
  author: string;
  category: { name: string };
  viewCount: number;
  downloadCount: number;
};

const fetcher = async (url: string): Promise<BookRow[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed");
  return response.json();
};

export default function AdminBooksPage() {
  const { data: books = [], isLoading, mutate } = useSWR("/api/admin/books", fetcher, {
    onError: () => toast.error("Gagal memuat data buku"),
  });

  async function removeBook(id: string) {
    const ok = confirm("Yakin hapus buku ini?");
    if (!ok) return;

    const response = await fetch(`/api/admin/books/${id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Gagal menghapus buku");
      return;
    }

    toast.success("Buku berhasil dihapus");
    void mutate();
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-[var(--color-primary)]">Kelola Buku</h1>
        <Button asChild>
          <Link href="/admin/buku/tambah">Tambah Buku</Link>
        </Button>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-2">
        {isLoading ? (
          <p className="p-6 text-sm text-text-secondary">Memuat data buku...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category.name}</TableCell>
                  <TableCell>{book.viewCount}</TableCell>
                  <TableCell>{book.downloadCount}</TableCell>
                  <TableCell className="space-x-2">
                    <Button asChild variant="secondary" size="sm">
                      <Link href={`/admin/buku/${book.id}/edit`}>Edit</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => removeBook(book.id)}>
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
