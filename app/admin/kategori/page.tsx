"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Category = {
  id: string;
  name: string;
  slug: string;
  _count?: { books: number };
};

const fetcher = async (url: string): Promise<Category[]> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed");
  return response.json();
};

export default function AdminCategoriesPage() {
  const [name, setName] = useState("");
  const { data: categories = [], mutate } = useSWR("/api/admin/categories", fetcher, {
    onError: () => toast.error("Gagal memuat kategori"),
  });

  async function addCategory() {
    if (!name.trim()) return;

    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      toast.error("Gagal menambah kategori");
      return;
    }

    toast.success("Kategori berhasil ditambah");
    setName("");
    void mutate();
  }

  async function removeCategory(id: string) {
    const response = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!response.ok) {
      toast.error("Gagal menghapus kategori (pastikan tidak dipakai buku)");
      return;
    }

    toast.success("Kategori dihapus");
    void mutate();
  }

  return (
    <section className="space-y-4">
      <h1 className="font-display text-3xl text-[var(--color-primary)]">Kelola Kategori</h1>

      <div className="flex gap-2 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kategori" />
        <Button onClick={addCategory}>Tambah</Button>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Jumlah Buku</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category._count?.books ?? 0}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => removeCategory(category.id)}>
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
