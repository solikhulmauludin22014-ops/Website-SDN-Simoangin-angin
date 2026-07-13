import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookForm } from "@/components/admin/book-form";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function EditBookPage({ params }: Params) {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <h1 className="font-display text-3xl text-[var(--color-primary)]">Edit Buku</h1>
      <BookForm
        mode="edit"
        initial={{
          id: book.id,
          title: book.title,
          author: book.author,
          publisher: book.publisher,
          description: book.description,
          publishedYear: book.publishedYear,
          pageCount: book.pageCount,
          categoryId: book.categoryId,
        }}
      />
    </section>
  );
}
