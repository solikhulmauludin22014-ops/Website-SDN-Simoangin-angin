import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFileToDrive } from "@/lib/google-drive";
import { bookSchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";
import { requireAdminSession } from "@/lib/require-admin";
import { validateEbook, validateCover } from "@/lib/file-validation";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
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

  let driveFileId: string | undefined;
  let driveViewLink: string | undefined;
  let coverUrl: string | undefined;

  const ebook = form.get("ebook");
  if (ebook instanceof File && ebook.size > 0) {
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
    driveFileId = uploadedBook.driveFileId;
    driveViewLink = uploadedBook.driveViewLink;
  }

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

  const book = await prisma.book.update({
    where: { id },
    data: {
      ...parsed.data,
      slug: toSlug(parsed.data.title),
      ...(driveFileId ? { driveFileId } : {}),
      ...(driveViewLink ? { driveViewLink } : {}),
      ...(coverUrl ? { coverUrl } : {}),
    },
  });

  return NextResponse.json(book);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.book.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
