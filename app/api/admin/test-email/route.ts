import { NextResponse } from "next/server";
import { sendLetterStatusEmail } from "@/lib/mail";
import { requireAdminSession } from "@/lib/require-admin";

/**
 * GET /api/admin/test-email?to=emailtujuan@gmail.com&status=COMPLETED
 *
 * Endpoint khusus test — hanya bisa diakses admin.
 * Kirim email dummy untuk verifikasi konfigurasi SMTP.
 */
export async function GET(request: Request) {
  // Hanya admin yang boleh akses
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const to     = searchParams.get("to")     ?? "";
  const status = searchParams.get("status") ?? "COMPLETED";

  if (!to) {
    return NextResponse.json(
      { error: "Parameter ?to=emailtujuan wajib diisi" },
      { status: 400 }
    );
  }

  const ok = await sendLetterStatusEmail(
    to,
    "Budi Santoso (TEST)",       // applicantName
    "TKT-2026-TEST-001",         // ticketNumber
    "ACTIVE_STUDENT",            // letterType
    status,                      // COMPLETED | REJECTED
    status === "REJECTED"
      ? "Ini contoh alasan penolakan dari admin (hanya untuk test)."
      : "Ini contoh catatan dari admin (hanya untuk test)."
  );

  if (ok) {
    return NextResponse.json({
      success : true,
      message : `Email test berhasil dikirim ke ${to}`,
      status,
    });
  }

  return NextResponse.json(
    {
      success : false,
      message : "Gagal mengirim email. Cek SMTP_EMAIL & SMTP_PASSWORD di environment variables.",
    },
    { status: 500 }
  );
}
