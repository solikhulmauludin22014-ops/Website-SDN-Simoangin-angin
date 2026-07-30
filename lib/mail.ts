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
 * Template mengikuti format resmi sekolah.
 *
 * @param toEmail       - Alamat email tujuan
 * @param applicantName - Nama lengkap pemohon
 * @param ticketNumber  - Nomor tiket pengajuan
 * @param letterType    - Jenis surat
 * @param status        - "COMPLETED" atau "REJECTED"
 * @param adminNotes    - Catatan admin (opsional)
 */
export async function sendLetterStatusEmail(
  toEmail: string,
  applicantName: string,
  ticketNumber: string,
  letterType: string,
  status: string,
  adminNotes?: string | null
): Promise<{ success: boolean; error?: string }> {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn("Email tidak dikirim: Konfigurasi SMTP belum diatur di .env");
    return { success: false, error: "SMTP_EMAIL atau SMTP_PASSWORD belum diatur di server (Vercel)." };
  }

  const isCompleted = status === "COMPLETED";
  const letterTypeLabel = LETTER_TYPE_LABELS[letterType] ?? letterType;

  // ────────────────────────────────────────────────────────────
  // TEMPLATE 1 — Status SELESAI / SIAP DIAMBIL
  // ────────────────────────────────────────────────────────────
  if (isCompleted) {
    const subject = `Informasi Pengajuan Surat: Selesai - ${SCHOOL.name}`;

    const htmlContent = `
<div style="font-family: Arial, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h2 style="color: #2563eb; margin-top: 0; font-size: 20px;">Surat Anda Telah Selesai</h2>
  <p>Halo <strong>${applicantName}</strong>,</p>
  <p>Permohonan <strong>${letterTypeLabel}</strong> dengan nomor resi <strong>${ticketNumber}</strong> telah berhasil diproses dan siap untuk diambil.</p>
  
  <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin: 24px 0;">
    <p style="margin: 0 0 12px 0; font-weight: bold;">Jadwal & Lokasi Pengambilan:</p>
    <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
      <li><strong>Tempat:</strong> Ruang Tata Usaha ${SCHOOL.name} (${SCHOOL.address})</li>
      <li><strong>Waktu:</strong> Senin-Kamis (07.00-14.30), Jumat (07.00-11.00), Sabtu (07.00-12.30)</li>
    </ul>
  </div>

  <p>Syarat pengambilan: Harap membawa kartu identitas diri yang valid serta menunjukkan email ini kepada petugas.</p>
  ${adminNotes ? `<p style="background-color: #fffbeb; padding: 12px; border-radius: 4px;"><strong>Pesan dari Admin:</strong> ${adminNotes}</p>` : ""}
  
  <p style="margin-top: 32px; color: #4b5563;">Salam,<br/><strong style="color: #111827;">${SCHOOL.name}</strong></p>
</div>
`;

    const textContent = [
      `Halo ${applicantName},`,
      ``,
      `Permohonan ${letterTypeLabel} dengan nomor resi ${ticketNumber} telah berhasil diproses dan SIAP DIAMBIL.`,
      ``,
      `Jadwal & Lokasi Pengambilan:`,
      `- Tempat: Ruang Tata Usaha ${SCHOOL.name} (${SCHOOL.address})`,
      `- Waktu: Senin-Kamis (07.00-14.30), Jumat (07.00-11.00), Sabtu (07.00-12.30)`,
      ``,
      `Harap membawa identitas diri yang valid saat pengambilan.`,
      adminNotes ? `Pesan Admin: ${adminNotes}` : ``,
      ``,
      `Salam,`,
      `${SCHOOL.name}`,
    ].filter(Boolean).join("\n");

    try {
      const info = await transporter.sendMail({
        from: `"${SCHOOL.name}" <${process.env.SMTP_EMAIL}>`,
        to: toEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log("[MAIL] Email SELESAI terkirim:", info.messageId);
      return { success: true };
    } catch (error: any) {
      console.error("[MAIL] Gagal mengirim email SELESAI:", error);
      return { success: false, error: error?.message || "Gagal mengirim email (Nodemailer error)" };
    }
  }

  // ────────────────────────────────────────────────────────────
  // TEMPLATE 2 — Status DITOLAK
  // ────────────────────────────────────────────────────────────
  const subject = `Informasi Pengajuan Surat: Ditolak - ${SCHOOL.name}`;

  const htmlContent = `
<div style="font-family: Arial, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h2 style="color: #dc2626; margin-top: 0; font-size: 20px;">Pengajuan Surat Tidak Dapat Diproses</h2>
  <p>Halo <strong>${applicantName}</strong>,</p>
  <p>Mohon maaf, permohonan <strong>${letterTypeLabel}</strong> dengan nomor resi <strong>${ticketNumber}</strong> tidak dapat kami lanjutkan pemrosesannya.</p>
  
  <div style="background-color: #fef2f2; padding: 16px; border-radius: 6px; margin: 24px 0; border-left: 4px solid #dc2626;">
    <p style="margin: 0 0 8px 0; font-weight: bold; color: #991b1b;">Keterangan Penolakan:</p>
    <p style="margin: 0; color: #7f1d1d;">${adminNotes ?? "Silakan hubungi pihak tata usaha untuk informasi lebih rinci."}</p>
  </div>

  <p>Kami sarankan untuk melakukan pengajuan ulang dengan melengkapi data atau dokumen yang sesuai persyaratan.</p>
  
  <p style="margin-top: 32px; color: #4b5563;">Salam,<br/><strong style="color: #111827;">${SCHOOL.name}</strong></p>
</div>
`;

  const textContentRejected = [
    `Halo ${applicantName},`,
    ``,
    `Mohon maaf, permohonan ${letterTypeLabel} dengan nomor resi ${ticketNumber} tidak dapat kami proses (DITOLAK).`,
    ``,
    `Keterangan:`,
    `${adminNotes ?? "Silakan hubungi pihak tata usaha."}`,
    ``,
    `Silakan ajukan ulang melalui website dengan data yang sesuai.`,
    ``,
    `Salam,`,
    `${SCHOOL.name}`,
  ].join("\n");

  try {
    const info = await transporter.sendMail({
      from: `"${SCHOOL.name}" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject,
      text: textContentRejected,
      html: htmlContent,
    });
    console.log("[MAIL] Email DITOLAK terkirim:", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("[MAIL] Gagal mengirim email DITOLAK:", error);
    return { success: false, error: error?.message || "Gagal mengirim email (Nodemailer error)" };
  }
}
