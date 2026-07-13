import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 px-4 py-8 md:px-6">
      <Skeleton className="h-10 w-80" />
      <Skeleton className="h-72 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-56" />
        ))}
      </div>
    </section>
  );
}
