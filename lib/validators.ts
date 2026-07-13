import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2).max(100),
});

export const publicQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  year: z.coerce.number().int().min(1900).max(2100).optional(),
  sort: z.enum(["latest", "popular", "az"]).default("latest"),
});

export const bookSchema = z.object({
  title: z.string().min(2).max(200),
  author: z.string().min(2).max(160),
  publisher: z.string().max(200).optional(),
  description: z.string().max(5000).optional(),
  publishedYear: z.coerce.number().int().min(1900).max(2100).optional(),
  pageCount: z.coerce.number().int().positive().optional(),
  categoryId: z.string().cuid(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type BookInput = z.infer<typeof bookSchema>;
