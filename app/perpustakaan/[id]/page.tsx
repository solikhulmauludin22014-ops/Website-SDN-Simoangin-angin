import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/books/book-card";
import { BookActions } from "@/components/books/book-actions";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export default async function BookDetailPage({ params }: Params) {
  const { id } = await params;

  // Accept both slug and cuid — supports /perpustakaan/[slug] URLs
  const book = await prisma.book.findFirst({
    where: { OR: [{ slug: id }, { id }] },
    include: { category: true },
  });

  if (!book) {
    notFound();
  }

  const related = await prisma.book.findMany({
    where: {
      categoryId: book.categoryId,
      id: { not: book.id },
    },
    include: {
      category: { select: { name: true } },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
  const relatedBooks = related as {
    id: string;
    slug: string;
    title: string;
    author: string;
    coverUrl: string | null;
    category: { name: string };
  }[];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6">
      <Link href="/perpustakaan" className="text-sm text-heading hover:underline">
        Kembali ke katalog
      </Link>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[var(--color-border)]">
          <Image
            src={book.coverUrl ?? "/placeholder-book.svg"}
            alt={`Cover ${book.title}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-4xl text-heading">{book.title}</h1>
          <p className="text-lg text-text-secondary">{book.author}</p>
          <p className="text-text-secondary">{book.description || "Tidak ada deskripsi."}</p>

          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold">Kategori</dt>
              <dd>{book.category.name}</dd>
            </div>
            <div>
              <dt className="font-semibold">Tahun Terbit</dt>
              <dd>{book.publishedYear ?? "-"}</dd>
            </div>
            <div>
              <dt className="font-semibold">Jumlah Halaman</dt>
              <dd>{book.pageCount ?? "-"}</dd>
            </div>
          </dl>

          <BookActions bookId={book.id} driveFileId={book.driveFileId} />
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-white p-3">
        <iframe
          src={`https://drive.google.com/file/d/${book.driveFileId}/preview`}
          width="100%"
          height="620"
          allow="autoplay"
          title={`Preview ${book.title}`}
        />
      </div>

      {relatedBooks.length > 0 ? (
        <div className="space-y-4">
          <h2 className="font-display text-2xl">Rekomendasi Buku Terkait</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedBooks.map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
