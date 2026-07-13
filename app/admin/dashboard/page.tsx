import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsChart } from "@/components/admin/stats-chart";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [bookCount, categoryCount, topViewed] = await Promise.all([
    prisma.book.count(),
    prisma.category.count(),
    prisma.book.findMany({
      orderBy: { viewCount: "desc" },
      take: 5,
      select: { title: true, viewCount: true },
    }),
  ]);

  const topViewedBooks = topViewed as { title: string; viewCount: number }[];

  const statsData = topViewedBooks.map((book, index) => ({
    month: `Buku ${index + 1}`,
    views: book.viewCount,
    downloads: Math.floor(book.viewCount * 0.6),
  }));

  return (
    <section className="space-y-6">
      <h1 className="font-display text-3xl text-[var(--color-primary)]">Dashboard Admin</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Buku</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{bookCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Kategori</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{categoryCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Buku Terpopuler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {topViewedBooks[0] ? (
              <>
                <p className="font-semibold">{topViewedBooks[0].title}</p>
                <p>{topViewedBooks[0].viewCount} kali dibaca</p>
              </>
            ) : (
              <p>Belum ada data.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card id="statistik">
        <CardHeader>
          <CardTitle>Statistik Sederhana</CardTitle>
        </CardHeader>
        <CardContent>
          <StatsChart data={statsData} />
        </CardContent>
      </Card>
    </section>
  );
}
