import { BookForm } from "@/components/admin/book-form";

export default function AddBookPage() {
  return (
    <section className="space-y-4">
      <h1 className="font-display text-3xl text-[var(--color-primary)]">Tambah Buku</h1>
      <BookForm mode="create" />
    </section>
  );
}
