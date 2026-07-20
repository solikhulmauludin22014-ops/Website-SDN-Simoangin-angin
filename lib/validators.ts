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

/* ── Layanan Surat ──────────────────────────────────────────── */

export const letterRequestSchema = z.object({
  letterType: z.enum(["ACTIVE_STUDENT", "TRANSFER", "OTHER"]),
  applicantName: z.string().min(2, "Nama pemohon wajib diisi").max(200),
  applicantPhone: z.string().min(8, "No HP minimal 8 digit").max(20),
  applicantEmail: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  studentName: z.string().min(2, "Nama siswa wajib diisi").max(200),
  nisn: z.string().min(4, "NISN wajib diisi").max(20),
  studentClass: z.string().min(1, "Kelas wajib diisi").max(20),
  birthPlace: z.string().min(2, "Tempat lahir wajib diisi").max(100),
  birthDate: z.coerce.date({ required_error: "Tanggal lahir wajib diisi" }),
  gender: z.string().optional(),
  parentJob: z.string().optional(),
  targetSchool: z.string().optional(),
  previousSchool: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  parentName: z.string().min(2, "Nama orang tua/wali wajib diisi").max(200),
  address: z.string().min(5, "Alamat wajib diisi").max(1000),
  purpose: z.string().min(5, "Keperluan wajib diisi").max(2000),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export const letterUpdateSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "REJECTED"]),
  officialNumber: z.string().max(100).optional().or(z.literal("")),
  officialDate: z.coerce.date().optional().or(z.literal("")),
  adminNotes: z.string().max(2000).optional().or(z.literal("")),
});

export type LetterRequestInput = z.infer<typeof letterRequestSchema>;
export type LetterUpdateInput = z.infer<typeof letterUpdateSchema>;
