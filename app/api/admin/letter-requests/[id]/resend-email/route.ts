import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin";
import { sendLetterStatusEmail } from "@/lib/mail";

type Params = { params: Promise<{ id: string }> };

/**
 * POST /api/admin/letter-requests/[id]/resend-email
 * Kirim ulang email notifikasi ke pemohon secara manual.
 * Hanya bisa dilakukan jika status COMPLETED atau REJECTED dan ada email pemohon.
 */
export async function POST(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const record = await prisma.letterRequest.findUnique({ where: { id } });

  if (!record) {
    return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  if (!record.applicantEmail) {
    return NextResponse.json(
      { error: "Pemohon tidak memiliki alamat email" },
      { status: 400 }
    );
  }

  if (record.status !== "COMPLETED" && record.status !== "REJECTED") {
    return NextResponse.json(
      { error: "Email hanya dapat dikirim untuk status SELESAI atau DITOLAK" },
      { status: 400 }
    );
  }

  try {
    const success = await sendLetterStatusEmail(
      record.applicantEmail,
      record.applicantName,
      record.ticketNumber,
      record.letterType,
      record.status,
      record.adminNotes ?? undefined
    );

    if (!success) {
      return NextResponse.json(
        { error: "Gagal mengirim email. Periksa konfigurasi SMTP di server." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, to: record.applicantEmail });
  } catch (err) {
    console.error("[MAIL] Gagal kirim ulang email:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengirim email" },
      { status: 500 }
    );
  }
}
