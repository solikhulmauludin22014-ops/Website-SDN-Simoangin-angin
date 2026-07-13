"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: string;
  name: string;
};

type BookPayload = {
  title: string;
  author: string;
  publisher?: string;
  description?: string;
  publishedYear?: number;
  pageCount?: number;
  categoryId: string;
};

type BookFormProps = {
  mode: "create" | "edit";
  initial?: {
    id: string;
    title: string;
    author: string;
    publisher: string | null;
    description: string | null;
    publishedYear: number | null;
    pageCount: number | null;
    categoryId: string;
  };
};

export function BookForm({ mode, initial }: BookFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => toast.error("Gagal memuat kategori"));
  }, []);

  async function onSubmit(formData: FormData) {
    setLoading(true);

    const payload: BookPayload = {
      title: String(formData.get("title") ?? ""),
      author: String(formData.get("author") ?? ""),
      publisher: formData.get("publisher") ? String(formData.get("publisher")) : undefined,
      description: String(formData.get("description") ?? ""),
      publishedYear: formData.get("publishedYear")
        ? Number(formData.get("publishedYear"))
        : undefined,
      pageCount: formData.get("pageCount") ? Number(formData.get("pageCount")) : undefined,
      categoryId: String(formData.get("categoryId") ?? ""),
    };

    const merged = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) merged.append(key, String(value));
    });

    const ebookInput = document.getElementById("ebook") as HTMLInputElement | null;
    const coverInput = document.getElementById("cover") as HTMLInputElement | null;

    if (ebookInput?.files?.[0]) merged.append("ebook", ebookInput.files[0]);
    if (coverInput?.files?.[0]) merged.append("cover", coverInput.files[0]);

    const endpoint = mode === "create" ? "/api/admin/books" : `/api/admin/books/${initial?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const response = await fetch(endpoint, {
      method,
      body: merged,
    });

    setLoading(false);

    if (!response.ok) {
      toast.error("Gagal menyimpan buku");
      return;
    }

    toast.success(mode === "create" ? "Buku berhasil ditambahkan" : "Buku berhasil diperbarui");
    router.push("/admin/buku");
    router.refresh();
  }

  return (
    <form action={onSubmit} className="space-y-4 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="title">Judul</Label>
          <Input id="title" name="title" defaultValue={initial?.title ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Penulis</Label>
          <Input id="author" name="author" defaultValue={initial?.author ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publisher">Penerbit</Label>
          <Input id="publisher" name="publisher" defaultValue={initial?.publisher ?? ""} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" defaultValue={initial?.description ?? ""} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="publishedYear">Tahun Terbit</Label>
          <Input
            id="publishedYear"
            name="publishedYear"
            type="number"
            defaultValue={initial?.publishedYear ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pageCount">Jumlah Halaman</Label>
          <Input id="pageCount" name="pageCount" type="number" defaultValue={initial?.pageCount ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Kategori</Label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={initial?.categoryId ?? ""}
            required
            className="flex h-10 w-full rounded-md border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] px-3 py-2 text-sm"
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ebook">File E-book (PDF/EPUB)</Label>
          <Input id="ebook" name="ebook" type="file" accept=".pdf,.epub" required={mode === "create"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cover">Cover Buku</Label>
          <Input id="cover" name="cover" type="file" accept="image/*" />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Menyimpan..." : mode === "create" ? "Simpan Buku" : "Perbarui Buku"}
      </Button>
    </form>
  );
}
