import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { publicQuerySchema } from "@/lib/validators";
import { buildBookWhere, getBookOrderBy } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = publicQuerySchema.safeParse({
    ...query,
    year: query.year ? Number(query.year) : undefined,
    category: query.category === "all" ? undefined : query.category,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { q, category, year, sort } = parsed.data;

  const [books, categories] = await Promise.all([
    prisma.book.findMany({
      where: buildBookWhere(q, category, year),
      orderBy: getBookOrderBy(sort),
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      take: 60,
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
  ]);

  return NextResponse.json({ books, categories });
}
