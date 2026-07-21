import nodemailer from "nodemailer";
import { SCHOOL } from "./school-config";

// Konfigurasi transporter nodemailer menggunakan Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL, // Email pengirim (Gmail)
    pass: process.env.SMTP_PASSWORD, // App Password (16 digit)
  },
});

/**
 * Mengirimkan email notifikasi ke wali murid jika email tersedia.
 */
export async function sendLetterStatusEmail(
  toEmail: string,
  applicantName: string,
  ticketNumber: string,
  status: string,
  notes?: string | null
) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.warn("Email tidak dikirim: Konfigurasi SMTP belum diatur di .env");
    return false;
  }

  // Tentukan subject dan pesan utama
  const isCompleted = status === "COMPLETED";
  const subject = isCompleted
    ? `[${SCHOOL.NAME}] Pengajuan Surat Selesai`
    : `[${SCHOOL.NAME}] Pengajuan Surat Ditolak`;

  const statusText = isCompleted
    ? "telah <strong>SELESAI</strong> diproses dan dicetak."
    : "mohon maaf, <strong>DITOLAK</strong> oleh Admin.";

  const actionText = isCompleted
    ? "Anda dapat mengunduh surat (PDF) melalui website kami, atau mengambil berkas fisiknya di sekolah."
    : "Silakan periksa catatan dari admin di bawah ini, lalu Anda dapat mengajukan ulang dengan data yang benar.";

  // Template HTML Email
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
        <h2 style="color: #1e3a8a; margin: 0;">${SCHOOL.NAME}</h2>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">Layanan Surat Online</p>
      </div>

      <p>Halo Bapak/Ibu <strong>${applicantName}</strong>,</p>
      
      <p>Pemberitahuan mengenai pengajuan surat Anda dengan Nomor Tiket: 
        <span style="display: inline-block; background: #f3f4f6; padding: 5px 10px; border-radius: 5px; font-weight: bold; letter-spacing: 1px; color: #1f2937;">
          ${ticketNumber}
        </span>
      </p>

      <div style="background-color: ${isCompleted ? '#f0fdf4' : '#fef2f2'}; border-left: 4px solid ${isCompleted ? '#16a34a' : '#dc2626'}; padding: 15px; margin: 20px 0;">
        <p style="margin: 0; color: ${isCompleted ? '#166534' : '#991b1b'};">
          Status Pengajuan Surat: ${statusText}
        </p>
      </div>

      <p>${actionText}</p>

      ${
        notes
          ? `
      <div style="background-color: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 5px 0; font-weight: bold; font-size: 13px; color: #b45309;">Catatan dari Admin:</p>
        <p style="margin: 0; font-style: italic; color: #78350f;">"${notes}"</p>
      </div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://website-sdn-simoangin-angin.vercel.app/layanan-surat/cek?ticket=${ticketNumber}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
          Cek Status di Website
        </a>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #888; text-align: center;">
        <p style="margin: 0;">Email ini dibuat otomatis oleh sistem.</p>
        <p style="margin: 5px 0 0 0;">Harap tidak membalas email ini. Hubungi pihak sekolah jika ada pertanyaan.</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: \`"\${SCHOOL.NAME}" <\${process.env.SMTP_EMAIL}>\`,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    });
    console.log("Email sent successfully: ", info.messageId);
    return true;
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    return false;
  }
}
