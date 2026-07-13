import { Prisma } from "@prisma/client";

export function buildBookWhere(
  q?: string,
  category?: string,
  year?: number
): Prisma.BookWhereInput {
  return {
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { author: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(category ? { category: { slug: category } } : {}),
    ...(year ? { publishedYear: year } : {}),
  };
}

export function getBookOrderBy(sort: "latest" | "popular" | "az") {
  switch (sort) {
    case "popular":
      return [{ viewCount: "desc" as const }, { createdAt: "desc" as const }];
    case "az":
      return [{ title: "asc" as const }];
    case "latest":
    default:
      return [{ createdAt: "desc" as const }];
  }
}
