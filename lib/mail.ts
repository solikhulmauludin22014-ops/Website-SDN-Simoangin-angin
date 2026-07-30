import nodemailer from "nodemailer";
import { SCHOOL, PRINCIPAL, LETTER_TYPE_LABELS } from "./school-config";

// Konfigurasi transporter nodemailer menggunakan Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,   // Email pengirim (Gmail)
    pass: process.env.SMTP_PASSWORD, // App Password Gmail (16 digit)
  },
});

/**
 * Kirim email notifikasi status surat ke pemohon.
 * Template mengikuti format resmi sekolah (Pak Ikul).
 *
 * @param toEmail       - Alamat email tujuan
 * @param applicantName - Nama lengkap pemohon
 * @param ticketNumber  - Nomor tiket pengajuan
 * @param letterType    - Jenis surat (enum: ACTIVE_STUDENT | TRANSFER | ACCEPTANCE | OTHER)
 * @param status        - "COMPLETED" atau "REJECTED"
 * @param adminNotes    - Catatan admin (alasan penolakan jika REJECTED, opsional)
 */
export async function sendLetterStatusEmail(
  toEmail: string,
  applicantName: string,
  ticketNumber: string,
  letterType: string,
  status: string,
  adminNotes?: string | null
) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn("Email tidak dikirim: Konfigurasi SMTP belum diatur di .env");
    return false;
  }

  const isCompleted = status === "COMPLETED";

  // Label jenis surat dalam Bahasa Indonesia
  const letterTypeLabel = LETTER_TYPE_LABELS[letterType] ?? letterType;

  // ────────────────────────────────────────────────────────────
  // TEMPLATE 1 — Status SELESAI / SIAP DIAMBIL
  // ────────────────────────────────────────────────────────────
  if (isCompleted) {
    const subject = `Pengajuan Surat Selesai - ${SCHOOL.name}`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
  <div style="max-width:620px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb); padding:28px 32px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:700; letter-spacing:0.5px;">
        ${SCHOOL.name}
      </h1>
      <p style="margin:6px 0 0; color:#bfdbfe; font-size:13px;">Layanan Surat Online</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">

      <p style="margin:0 0 8px; color:#374151; font-size:15px;">Yth. <strong>${applicantName}</strong>,</p>
      <p style="margin:0 0 20px; color:#6b7280; font-size:14px; line-height:1.6;">
        Terima kasih telah melakukan pengajuan surat di <strong>${SCHOOL.name}</strong>.
      </p>

      <p style="margin:0 0 12px; color:#374151; font-size:14px; line-height:1.6;">
        Bersama email ini, kami informasikan bahwa pengajuan
        <strong>${letterTypeLabel}</strong> Anda dengan nomor tiket:
      </p>

      <!-- Ticket badge -->
      <div style="text-align:center; margin:0 0 20px;">
        <span style="display:inline-block; background:#f3f4f6; border:1px solid #d1d5db; border-radius:8px; padding:10px 24px; font-size:17px; font-weight:700; letter-spacing:2px; color:#1f2937;">
          ${ticketNumber}
        </span>
      </div>

      <p style="margin:0 0 20px; color:#374151; font-size:14px;">saat ini berstatus:</p>

      <!-- Status badge -->
      <div style="background:#f0fdf4; border:2px solid #16a34a; border-radius:10px; padding:16px; text-align:center; margin:0 0 24px;">
        <span style="color:#15803d; font-size:18px; font-weight:800; letter-spacing:1px;">
          ✅ SELESAI / SIAP DIAMBIL
        </span>
      </div>

      <p style="margin:0 0 16px; color:#374151; font-size:14px; line-height:1.6;">
        Anda dapat mengambil dokumen fisik surat tersebut dengan rincian sebagai berikut:
      </p>

      <!-- Info box -->
      <div style="background:#eff6ff; border-left:4px solid #2563eb; border-radius:0 8px 8px 0; padding:16px 20px; margin:0 0 24px;">
        <table style="width:100%; border-collapse:collapse; font-size:14px; color:#374151;">
          <tr>
            <td style="padding:6px 0; vertical-align:top; width:40%; color:#6b7280; font-weight:600;">📍 Lokasi Pengambilan</td>
            <td style="padding:6px 0; vertical-align:top;">: Ruang Tata Usaha ${SCHOOL.name}, ${SCHOOL.address}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; vertical-align:top; width:40%; color:#6b7280; font-weight:600;">🕐 Jadwal Pelayanan</td>
            <td style="padding:6px 0; vertical-align:top;">: Senin – Kamis: 07.00 – 14.30 WIB<br>&nbsp;&nbsp;&nbsp;Jum'at: 07.00 – 11.00 WIB<br>&nbsp;&nbsp;&nbsp;Sabtu: 07.00 – 12.30 WIB</td>
          </tr>
          <tr>
            <td style="padding:6px 0; vertical-align:top; color:#6b7280; font-weight:600;">📋 Syarat Pengambilan</td>
            <td style="padding:6px 0; vertical-align:top;">: Mohon tunjukkan email ini dan kartu identitas asli (KTP/KTM) kepada petugas.</td>
          </tr>
        </table>
      </div>

      ${adminNotes ? `
      <div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:14px 18px; margin:0 0 24px;">
        <p style="margin:0 0 6px; font-weight:700; font-size:13px; color:#b45309;">📝 Catatan dari Admin:</p>
        <p style="margin:0; font-style:italic; color:#78350f; font-size:14px;">"${adminNotes}"</p>
      </div>
      ` : ""}

      <p style="margin:0 0 20px; color:#374151; font-size:14px; line-height:1.6;">
        Jika Anda memiliki pertanyaan lebih lanjut, silakan balas email ini atau hubungi kami melalui
        <strong>${SCHOOL.phone}</strong>.
      </p>

      <!-- CTA Button -->
      <div style="text-align:center; margin:8px 0 28px;">
        <a href="${process.env.NEXTAUTH_URL ?? "https://website-sdn-simoangin-angin.vercel.app"}/layanan-surat/cek?ticket=${ticketNumber}"
           style="display:inline-block; background:#2563eb; color:#ffffff; padding:13px 28px; border-radius:8px; font-weight:700; font-size:14px; text-decoration:none;">
          Cek Status di Website
        </a>
      </div>

      <p style="margin:0; color:#374151; font-size:14px; line-height:1.6;">
        Terima kasih atas perhatian Anda.
      </p>
      <br>
      <p style="margin:0; color:#374151; font-size:14px;">Salam,</p>
      <p style="margin:4px 0 0; font-weight:700; color:#1e3a8a; font-size:14px;">${SCHOOL.name}</p>

    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:16px 32px; text-align:center;">
      <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.6;">
        Ini adalah pesan otomatis, namun Anda tetap dapat membalas email ini jika ada kendala.<br>
        ${SCHOOL.name} • ${SCHOOL.address}
      </p>
    </div>
  </div>
</body>
</html>`;

    try {
      const info = await transporter.sendMail({
        from: `"${SCHOOL.name}" <${process.env.SMTP_EMAIL}>`,
        to: toEmail,
        subject,
        html: htmlContent,
      });
      console.log("[MAIL] Email SELESAI terkirim:", info.messageId);
      return true;
    } catch (error) {
      console.error("[MAIL] Gagal mengirim email SELESAI:", error);
      return false;
    }
  }

  // ────────────────────────────────────────────────────────────
  // TEMPLATE 2 — Status DITOLAK
  // ────────────────────────────────────────────────────────────
  const subject = `[PENTING] Status Pengajuan Surat Ditolak - ${SCHOOL.name}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
  <div style="max-width:620px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626); padding:28px 32px; text-align:center;">
      <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:700; letter-spacing:0.5px;">
        ${SCHOOL.name}
      </h1>
      <p style="margin:6px 0 0; color:#fecaca; font-size:13px;">Layanan Surat Online</p>
    </div>

    <!-- Body -->
    <div style="padding:32px;">

      <p style="margin:0 0 8px; color:#374151; font-size:15px;">Yth. <strong>${applicantName}</strong>,</p>
      <p style="margin:0 0 20px; color:#6b7280; font-size:14px; line-height:1.6;">
        Terima kasih telah melakukan pengajuan surat di <strong>${SCHOOL.name}</strong>.
      </p>

      <p style="margin:0 0 12px; color:#374151; font-size:14px; line-height:1.6;">
        Bersama email ini, kami informasikan bahwa pengajuan
        <strong>${letterTypeLabel}</strong> Anda dengan nomor tiket:
      </p>

      <!-- Ticket badge -->
      <div style="text-align:center; margin:0 0 20px;">
        <span style="display:inline-block; background:#f3f4f6; border:1px solid #d1d5db; border-radius:8px; padding:10px 24px; font-size:17px; font-weight:700; letter-spacing:2px; color:#1f2937;">
          ${ticketNumber}
        </span>
      </div>

      <p style="margin:0 0 20px; color:#374151; font-size:14px;">saat ini berstatus:</p>

      <!-- Status badge -->
      <div style="background:#fef2f2; border:2px solid #dc2626; border-radius:10px; padding:16px; text-align:center; margin:0 0 24px;">
        <span style="color:#b91c1c; font-size:18px; font-weight:800; letter-spacing:1px;">
          ❌ DITOLAK
        </span>
      </div>

      <p style="margin:0 0 12px; color:#374151; font-size:14px; line-height:1.6;">
        Pengajuan Anda belum dapat kami proses karena alasan berikut:
      </p>

      <!-- Rejection reason -->
      <div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:8px; padding:16px 20px; margin:0 0 24px;">
        <p style="margin:0; font-size:14px; font-style:italic; color:#78350f; line-height:1.6;">
          "${adminNotes ?? "Silakan hubungi pihak sekolah untuk informasi lebih lanjut."}"
        </p>
      </div>

      <!-- Tindak lanjut -->
      <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px 20px; margin:0 0 24px;">
        <p style="margin:0 0 8px; font-weight:700; font-size:14px; color:#374151;">📌 Tindak Lanjut:</p>
        <p style="margin:0; color:#6b7280; font-size:14px; line-height:1.6;">
          Agar surat Anda dapat segera diproses, kami mohon agar Anda mengisi ulang formulir pengajuan
          dengan data dan dokumen yang benar melalui tautan di bawah ini:
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center; margin:0 0 28px;">
        <a href="${process.env.NEXTAUTH_URL ?? "https://website-sdn-simoangin-angin.vercel.app"}/layanan-surat"
           style="display:inline-block; background:#2563eb; color:#ffffff; padding:13px 28px; border-radius:8px; font-weight:700; font-size:14px; text-decoration:none;">
          👉 Formulir Pengajuan Surat
        </a>
      </div>

      <p style="margin:0 0 20px; color:#374151; font-size:14px; line-height:1.6;">
        Jika Anda membutuhkan bantuan atau informasi lebih lanjut terkait penolakan ini, silakan hubungi kami
        melalui <strong>${SCHOOL.phone}</strong>.
      </p>

      <p style="margin:0 0 4px; color:#374151; font-size:14px; line-height:1.6;">
        Terima kasih atas pengertian dan kerja samanya.
      </p>
      <br>
      <p style="margin:0; color:#374151; font-size:14px;">Salam,</p>
      <p style="margin:4px 0 0; font-weight:700; color:#1e3a8a; font-size:14px;">${SCHOOL.name}</p>

    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; border-top:1px solid #e5e7eb; padding:16px 32px; text-align:center;">
      <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.6;">
        Ini adalah pesan otomatis, namun Anda tetap dapat membalas email ini jika ada kendala.<br>
        ${SCHOOL.name} • ${SCHOOL.address}
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const info = await transporter.sendMail({
      from: `"${SCHOOL.name}" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject,
      html: htmlContent,
    });
    console.log("[MAIL] Email DITOLAK terkirim:", info.messageId);
    return true;
  } catch (error) {
    console.error("[MAIL] Gagal mengirim email DITOLAK:", error);
    return false;
  }
}
