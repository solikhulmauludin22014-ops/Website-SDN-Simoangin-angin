import { Resend } from "resend";
import { SCHOOL, LETTER_TYPE_LABELS } from "./school-config";

/**
 * Kirim email notifikasi status surat ke pemohon menggunakan Resend API.
 *
 * @param toEmail       - Alamat email tujuan
 * @param applicantName - Nama lengkap pemohon
 * @param ticketNumber  - Nomor tiket pengajuan
 * @param letterType    - Jenis surat
 * @param status        - "COMPLETED" atau "REJECTED"
 * @param adminNotes    - Catatan admin
 */
export async function sendLetterStatusEmail(
  toEmail: string,
  applicantName: string,
  ticketNumber: string,
  letterType: string,
  status: string,
  adminNotes?: string | null
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[MAIL] Email tidak dikirim: RESEND_API_KEY belum diatur di .env");
    return { success: false, error: "RESEND_API_KEY belum diatur di server (Vercel)." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const isCompleted = status === "COMPLETED";
  const letterTypeLabel = LETTER_TYPE_LABELS[letterType] ?? letterType;

  // Alamat pengirim — default ke onboarding@resend.dev jika belum punya domain
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const fromName = `${SCHOOL.name} <${fromAddress}>`;

  const baseUrl = process.env.NEXTAUTH_URL ?? "https://website-sdn-simoangin-angin.vercel.app";

  // ────────────────────────────────────────────────────────────
  // TEMPLATE 1 — Status SELESAI / SIAP DIAMBIL
  // ────────────────────────────────────────────────────────────
  if (isCompleted) {
    const subject = `✅ Pengajuan Surat Selesai - ${SCHOOL.name}`;

    const html = `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
  <div style="max-width:620px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb); padding:28px 32px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:700; letter-spacing:0.5px;">${SCHOOL.name}</h1>
      <p style="margin:6px 0 0; color:#bfdbfe; font-size:13px;">Layanan Surat Online</p>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 8px; color:#374151; font-size:15px;">Yth. <strong>${applicantName}</strong>,</p>
      <p style="margin:0 0 20px; color:#6b7280; font-size:14px; line-height:1.6;">Terima kasih telah melakukan pengajuan surat di <strong>${SCHOOL.name}</strong>.</p>
      <p style="margin:0 0 12px; color:#374151; font-size:14px; line-height:1.6;">Bersama email ini, kami informasikan bahwa pengajuan <strong>${letterTypeLabel}</strong> Anda dengan nomor tiket:</p>
      
      <div style="text-align:center; margin:0 0 20px;">
        <span style="display:inline-block; background:#f3f4f6; border:1px solid #d1d5db; border-radius:8px; padding:10px 24px; font-size:17px; font-weight:700; letter-spacing:2px; color:#1f2937;">
          ${ticketNumber}
        </span>
      </div>

      <p style="margin:0 0 20px; color:#374151; font-size:14px;">saat ini berstatus:</p>
      <div style="background:#f0fdf4; border:2px solid #16a34a; border-radius:10px; padding:16px; text-align:center; margin:0 0 24px;">
        <span style="color:#15803d; font-size:18px; font-weight:800; letter-spacing:1px;">✅ SELESAI / SIAP DIAMBIL</span>
      </div>

      <div style="background:#eff6ff; border-left:4px solid #2563eb; border-radius:0 8px 8px 0; padding:16px 20px; margin:0 0 24px;">
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#374151;">
          <tr><td style="padding:6px 0; vertical-align:top; width:40%; color:#6b7280; font-weight:600;">📍 Lokasi Pengambilan</td><td style="padding:6px 0; vertical-align:top;">: Ruang Tata Usaha ${SCHOOL.name}, ${SCHOOL.address}</td></tr>
          <tr><td style="padding:6px 0; vertical-align:top; width:40%; color:#6b7280; font-weight:600;">🕐 Jadwal Pelayanan</td><td style="padding:6px 0; vertical-align:top;">: Senin–Kamis: 07.00–14.30<br>Jum'at: 07.00–11.00<br>Sabtu: 07.00–12.30</td></tr>
          <tr><td style="padding:6px 0; vertical-align:top; color:#6b7280; font-weight:600;">📋 Syarat Pengambilan</td><td style="padding:6px 0; vertical-align:top;">: Bawa KTP/Identitas Asli</td></tr>
        </table>
      </div>

      ${adminNotes ? `<div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:14px 18px; margin:0 0 24px;"><p style="margin:0 0 6px; font-weight:700; font-size:13px; color:#b45309;">📝 Catatan dari Admin:</p><p style="margin:0; font-style:italic; color:#78350f; font-size:14px;">"${adminNotes}"</p></div>` : ""}

      <div style="text-align:center; margin:8px 0 28px;">
        <a href="${baseUrl}/layanan-surat/cek?ticket=${ticketNumber}" style="display:inline-block; background:#2563eb; color:#ffffff; padding:13px 28px; border-radius:8px; font-weight:700; font-size:14px; text-decoration:none;">Cek Status di Website</a>
      </div>
    </div>
    
    <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:16px 32px; text-align:center;">
      <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.6;">Ini adalah pesan otomatis.<br>${SCHOOL.name}</p>
    </div>
  </div>
</body>
</html>`;

    const text = `Yth. ${applicantName},\n\nPengajuan surat Anda SELESAI. Cek di: ${baseUrl}/layanan-surat/cek?ticket=${ticketNumber}`;

    try {
      const { data, error } = await resend.emails.send({
        from: fromName,
        to: toEmail,
        subject,
        html,
        text,
      });

      if (error) {
        console.error("[MAIL] Resend error (SELESAI):", error);
        
        // Deteksi error khas Resend ketika mengirim ke email yang bukan pendaftar (tanpa domain)
        if (error.name === "validation_error" && error.message.includes("onboarding@resend.dev")) {
          return { success: false, error: "Resend menolak pengiriman: Anda harus MENGVERIFIKASI DOMAIN SEKOLAH di resend.com agar bisa mengirim email ke pemohon." };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      console.error("[MAIL] Gagal mengirim email SELESAI:", err);
      return { success: false, error: err?.message || "Terjadi kesalahan internal Resend." };
    }
  }

  // ────────────────────────────────────────────────────────────
  // TEMPLATE 2 — Status DITOLAK
  // ────────────────────────────────────────────────────────────
  const subject = `❌ Status Pengajuan Surat Ditolak - ${SCHOOL.name}`;

  const html = `<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
  <div style="max-width:620px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">
    
    <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626); padding:28px 32px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:700; letter-spacing:0.5px;">${SCHOOL.name}</h1>
      <p style="margin:6px 0 0; color:#fecaca; font-size:13px;">Layanan Surat Online</p>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 8px; color:#374151; font-size:15px;">Yth. <strong>${applicantName}</strong>,</p>
      <p style="margin:0 0 20px; color:#6b7280; font-size:14px; line-height:1.6;">Terima kasih telah melakukan pengajuan surat di <strong>${SCHOOL.name}</strong>.</p>
      
      <div style="background:#fef2f2; border:2px solid #dc2626; border-radius:10px; padding:16px; text-align:center; margin:0 0 24px;">
        <span style="color:#b91c1c; font-size:18px; font-weight:800; letter-spacing:1px;">❌ DITOLAK</span>
      </div>

      <div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:16px 20px; margin:0 0 24px;">
        <p style="margin:0; font-size:14px; font-style:italic; color:#78350f; line-height:1.6;">Alasan: "${adminNotes ?? "Hubungi sekolah."}"</p>
      </div>

      <div style="text-align:center; margin:0 0 28px;">
        <a href="${baseUrl}/layanan-surat" style="display:inline-block; background:#2563eb; color:#ffffff; padding:13px 28px; border-radius:8px; font-weight:700; font-size:14px; text-decoration:none;">Ajukan Ulang</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = `Yth. ${applicantName},\n\nPengajuan surat Anda DITOLAK.\nAlasan: ${adminNotes ?? "-"}\n\nSilakan ajukan ulang melalui: ${baseUrl}/layanan-surat`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromName,
      to: toEmail,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[MAIL] Resend error (DITOLAK):", error);
      if (error.name === "validation_error" && error.message.includes("onboarding@resend.dev")) {
        return { success: false, error: "Resend menolak pengiriman: Anda harus MENGVERIFIKASI DOMAIN SEKOLAH di resend.com agar bisa mengirim email ke pemohon." };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[MAIL] Gagal mengirim email DITOLAK:", err);
    return { success: false, error: err?.message || "Terjadi kesalahan internal Resend." };
  }
}
