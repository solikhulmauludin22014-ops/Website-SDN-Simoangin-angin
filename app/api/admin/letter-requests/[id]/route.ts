import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin";
import { letterUpdateSchema } from "@/lib/validators";
import { sendLetterStatusEmail } from "@/lib/mail";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const record = await prisma.letterRequest.findUnique({ where: { id } });

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const parsed = letterUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updateData: Record<string, unknown> = {
    status: parsed.data.status,
  };

  if (parsed.data.officialNumber !== undefined && parsed.data.officialNumber !== "") {
    updateData.officialNumber = parsed.data.officialNumber;
  }

  if (parsed.data.officialDate !== undefined && parsed.data.officialDate !== "") {
    updateData.officialDate = parsed.data.officialDate;
  }

  if (parsed.data.adminNotes !== undefined && parsed.data.adminNotes !== "") {
    updateData.adminNotes = parsed.data.adminNotes;
  } else if (parsed.data.adminNotes === "") {
    updateData.adminNotes = null;
  }

  // Ambil status lama SEBELUM diupdate agar bisa deteksi perubahan status
  const oldRecord = await prisma.letterRequest.findUnique({
    where: { id },
    select: { status: true },
  });
  const oldStatus = oldRecord?.status ?? "";

  const record = await prisma.letterRequest.update({
    where: { id },
    data: updateData,
  });

  // Kirim email hanya jika status BERUBAH menjadi COMPLETED atau REJECTED
  const newStatus = record.status;
  const statusChanged = oldStatus !== newStatus;
  if (
    record.applicantEmail &&
    statusChanged &&
    (newStatus === "COMPLETED" || newStatus === "REJECTED")
  ) {
    // Fire and forget — tidak memblokir response API
    sendLetterStatusEmail(
      record.applicantEmail,
      record.applicantName,
      record.ticketNumber,
      record.letterType,
      newStatus,
      record.adminNotes ?? undefined
    ).catch((err) => console.error("[MAIL] Error kirim email otomatis:", err));
  }

  return NextResponse.json(record);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.letterRequest.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
