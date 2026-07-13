import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFileToDrive } from "@/lib/google-drive";
import { bookSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";
import { requireAdminSession } from "@/lib/require-admin";
import { validateEbook, validateCover } from "@/lib/file-validation";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const books = await prisma.book.findMany({
    include: {
      category: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();

  const rawData = {
    title: String(form.get("title") ?? ""),
    author: String(form.get("author") ?? ""),
    publisher: form.get("publisher") ? String(form.get("publisher")) : undefined,
    description: String(form.get("description") ?? ""),
    publishedYear: form.get("publishedYear") ? Number(form.get("publishedYear")) : undefined,
    pageCount: form.get("pageCount") ? Number(form.get("pageCount")) : undefined,
    categoryId: String(form.get("categoryId") ?? ""),
  };

  const parsed = bookSchema.safeParse(rawData);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const ebook = form.get("ebook");
  if (!(ebook instanceof File)) {
    return NextResponse.json({ error: "File e-book wajib diupload" }, { status: 400 });
  }

  // --- Hardened upload validation ---
  const ebookValidation = await validateEbook(ebook);
  if (!ebookValidation.ok) {
    return NextResponse.json({ error: ebookValidation.error }, { status: 422 });
  }

  const ebookBuffer = Buffer.from(await ebook.arrayBuffer());
  const uploadedBook = await uploadFileToDrive(
    ebookBuffer,
    ebookValidation.filename,
    "application/pdf"
  );

  let coverUrl: string | undefined;
  const cover = form.get("cover");
  if (cover instanceof File && cover.size > 0) {
    const coverValidation = await validateCover(cover);
    if (!coverValidation.ok) {
      return NextResponse.json({ error: coverValidation.error }, { status: 422 });
    }
    const coverBuffer = Buffer.from(await cover.arrayBuffer());
    const uploadedCover = await uploadFileToDrive(
      coverBuffer,
      coverValidation.filename,
      cover.type
    );
    coverUrl = `https://drive.google.com/uc?export=view&id=${uploadedCover.driveFileId}`;
  }

  const slug = toSlug(parsed.data.title);

  const book = await prisma.book.create({
    data: {
      ...parsed.data,
      slug: `${slug}-${Date.now().toString().slice(-5)}`,
      driveFileId: uploadedBook.driveFileId,
      driveViewLink: uploadedBook.driveViewLink,
      coverUrl,
    },
  });

  return NextResponse.json(book, { status: 201 });
}
