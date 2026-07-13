"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type BookCardProps = {
  book: {
    id: string;
    slug: string;
    title: string;
    author: string;
    coverUrl: string | null;
    category: { name: string };
  };
};

export function BookCard({ book }: BookCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden">
        <Link href={`/perpustakaan/${book.slug}`} className="block">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-surface)]">
            <Image
              src={book.coverUrl ?? "/placeholder-book.svg"}
              alt={`Cover ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <CardContent className="space-y-3 p-4">
            <Badge variant="secondary">{book.category.name}</Badge>
            <h3 className="line-clamp-2 font-semibold leading-snug">{book.title}</h3>
            <p className="text-sm text-text-secondary">{book.author}</p>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
