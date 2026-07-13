import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

/**
 * GET /api/public/books/[id]
 *
 * Accepts either a Prisma cuid (looks up by `id`) or a slug (looks up by `slug`).
 * This keeps the route segment unified as [id] while still supporting slug-based
 * lookups used by the public perpustakaan pages.
 */
export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  // Try cuid first, fall back to slug lookup
  const book = await prisma.book.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
    include: { category: true },
  });

  if (!book) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
