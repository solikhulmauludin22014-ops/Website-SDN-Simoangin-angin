"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { BookCard } from "@/components/books/book-card";
import { SearchBar } from "@/components/books/search-bar";
import { CategoryFilter } from "@/components/books/category-filter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Category = { id: string; name: string; slug: string };
type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  coverUrl: string | null;
  category: { name: string };
};

type BooksResponse = {
  books: Book[];
  categories: Category[];
};

const fetcher = async (url: string): Promise<BooksResponse> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Fetch failed");
  return response.json();
};

export default function PerpustakaanPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("latest");
  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category && category !== "all") params.set("category", category);
    if (year !== "all") params.set("year", year);
    params.set("sort", sort);

    return `/api/public/books?${params.toString()}`;
  }, [query, category, year, sort]);

  const { data, isLoading, error } = useSWR(endpoint, fetcher);
  const books = data?.books ?? [];
  const categories = data?.categories ?? [];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 md:px-6">
      <div className="space-y-3">
        <h1 className="font-display text-4xl text-heading">Perpustakaan Digital</h1>
        <p className="max-w-2xl text-text-secondary">
          Jelajahi koleksi e-book sekolah. Cari, baca online, atau unduh secara gratis.
        </p>
      </div>

      <div className="grid gap-3 rounded-xl border border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)] p-4 md:grid-cols-4">
        <SearchBar onChange={setQuery} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger>
            <SelectValue placeholder="Semua tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua tahun</SelectItem>
            {Array.from({ length: 10 }).map((_, idx) => {
              const y = String(new Date().getFullYear() - idx);
              return (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="popular">Terpopuler</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error ? <p className="rounded-md bg-rose-50 p-3 text-rose-700">Gagal memuat katalog buku.</p> : null}

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[340px]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
