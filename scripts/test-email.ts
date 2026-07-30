/**
 * Script test kirim email notifikasi surat.
 * Jalankan di terminal VS Code:
 *   npx tsx scripts/test-email.ts [email-tujuan]
 *
 * Contoh:
 *   npx tsx scripts/test-email.ts solikhulmauludin.22014@mhs.unesa.ac.id
 */

import nodemailer from "nodemailer";
// tsx otomatis membaca .env dari root project saat dijalankan
// Pastikan perintah dijalankan dari folder: d:\WEBSITE SIMOANGIN-ANGIN 2026\sekolah-digital\

const SMTP_EMAIL    = process.env.SMTP_EMAIL    ?? "";
const SMTP_PASSWORD = process.env.SMTP_PASSWORD ?? "";
const toEmail       = process.argv[2] ?? "";

// ─── Validasi ─────────────────────────────────────────────────
if (!toEmail) {
  console.error("❌ Harap berikan email tujuan sebagai argumen.");
  console.error("   Contoh: npx tsx scripts/test-email.ts emailkamu@gmail.com");
  process.exit(1);
}

if (!SMTP_EMAIL || !SMTP_PASSWORD || SMTP_PASSWORD.includes("xxxx")) {
  console.error("❌ SMTP_EMAIL atau SMTP_PASSWORD belum diisi di file .env");
  process.exit(1);
}

console.log(`\n📧 Pengirim  : ${SMTP_EMAIL}`);
console.log(`   Penerima  : ${toEmail}`);

// ─── Data dummy untuk test ────────────────────────────────────
const schoolName    = "SD Negeri Simoangin-angin";
const schoolAddress = "Desa Simoangin-angin, Kecamatan Wonoayu, Kabupaten Sidoarjo";
const schoolPhone   = "(085) 655914559";
const ticketNumber  = "TKT-2026-TEST-001";
const applicantName = "Budi Santoso (TEST)";
const letterLabel   = "Surat Keterangan Siswa Aktif";
const adminNotes    = "Ini adalah email percobaan dari sistem SDN Simoangin-angin.";
const baseUrl       = "http://localhost:3000";

// ─── Template HTML (SELESAI) ──────────────────────────────────
const htmlCompleted = `
<!DOCTYPE html>
<html lang="id">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
  <div style="max-width:620px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:28px 32px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">${schoolName}</h1>
      <p style="margin:6px 0 0;color:#bfdbfe;font-size:13px;">Layanan Surat Online</p>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 8px;color:#374151;font-size:15px;">Yth. <strong>${applicantName}</strong>,</p>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px;line-height:1.6;">
        Terima kasih telah melakukan pengajuan surat di <strong>${schoolName}</strong>.
      </p>
      <p style="margin:0 0 12px;color:#374151;font-size:14px;">
        Bersama email ini, kami informasikan bahwa pengajuan
        <strong>${letterLabel}</strong> Anda dengan nomor tiket:
      </p>
      <div style="text-align:center;margin:0 0 20px;">
        <span style="display:inline-block;background:#f3f4f6;border:1px solid #d1d5db;border-radius:8px;padding:10px 24px;font-size:17px;font-weight:700;letter-spacing:2px;color:#1f2937;">
          ${ticketNumber}
        </span>
      </div>
      <p style="margin:0 0 20px;color:#374151;font-size:14px;">saat ini berstatus:</p>
      <div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:10px;padding:16px;text-align:center;margin:0 0 24px;">
        <span style="color:#15803d;font-size:18px;font-weight:800;letter-spacing:1px;">&#9989; SELESAI / SIAP DIAMBIL</span>
      </div>
      <p style="margin:0 0 16px;color:#374151;font-size:14px;line-height:1.6;">
        Anda dapat mengambil dokumen fisik surat tersebut dengan rincian sebagai berikut:
      </p>
      <div style="background:#eff6ff;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 20px;margin:0 0 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;">
          <tr>
            <td style="padding:6px 0;vertical-align:top;width:40%;color:#6b7280;font-weight:600;">&#128205; Lokasi Pengambilan</td>
            <td style="padding:6px 0;vertical-align:top;">: Ruang Tata Usaha ${schoolName}, ${schoolAddress}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top;color:#6b7280;font-weight:600;">&#128336; Jadwal Pelayanan</td>
            <td style="padding:6px 0;vertical-align:top;">
              : Senin &#8211; Kamis: 07.00 &#8211; 14.30 WIB<br>
              &nbsp;&nbsp;&nbsp;Jum'at: 07.00 &#8211; 11.00 WIB<br>
              &nbsp;&nbsp;&nbsp;Sabtu: 07.00 &#8211; 12.30 WIB
            </td>
          </tr>
          <tr>
            <td style="padding:6px 0;vertical-align:top;color:#6b7280;font-weight:600;">&#128203; Syarat Pengambilan</td>
            <td style="padding:6px 0;vertical-align:top;">: Mohon tunjukkan email ini dan kartu identitas asli (KTP/KTM) kepada petugas.</td>
          </tr>
        </table>
      </div>
      <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:14px 18px;margin:0 0 24px;">
        <p style="margin:0 0 6px;font-weight:700;font-size:13px;color:#b45309;">&#128221; Catatan dari Admin:</p>
        <p style="margin:0;font-style:italic;color:#78350f;font-size:14px;">"${adminNotes}"</p>
      </div>
      <p style="margin:0 0 20px;color:#374151;font-size:14px;line-height:1.6;">
        Jika Anda memiliki pertanyaan lebih lanjut, silakan balas email ini atau hubungi kami melalui
        <strong>${schoolPhone}</strong>.
      </p>
      <div style="text-align:center;margin:8px 0 28px;">
        <a href="${baseUrl}/layanan-surat/cek?ticket=${ticketNumber}"
           style="display:inline-block;background:#2563eb;color:#fff;padding:13px 28px;border-radius:8px;font-weight:700;font-size:14px;text-decoration:none;">
          Cek Status di Website
        </a>
      </div>
      <p style="margin:0;color:#374151;font-size:14px;">Terima kasih atas perhatian Anda.</p><br>
      <p style="margin:0;color:#374151;font-size:14px;">Salam,</p>
      <p style="margin:4px 0 0;font-weight:700;color:#1e3a8a;font-size:14px;">${schoolName}</p>
    </div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;">
      <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
        Ini adalah pesan otomatis, namun Anda tetap dapat membalas email ini jika ada kendala.<br>
        ${schoolName} &#8226; ${schoolAddress}
      </p>
    </div>
  </div>
</body>
</html>`;

// ─── Kirim email ──────────────────────────────────────────────
async function main() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_EMAIL, pass: SMTP_PASSWORD },
  });

  // Verifikasi koneksi SMTP
  console.log("\n⏳ Menghubungkan ke Gmail SMTP...");
  await transporter.verify();
  console.log("✅ Koneksi SMTP OK!\n");

  // Kirim email test
  const info = await transporter.sendMail({
    from   : `"${schoolName}" <${SMTP_EMAIL}>`,
    to     : toEmail,
    subject: `[TEST] Pengajuan Surat Selesai - ${schoolName}`,
    html   : htmlCompleted,
  });

  console.log("✅ Email berhasil dikirim!");
  console.log("   Message ID :", info.messageId);
  console.log(`\n💡 Cek inbox / folder Spam di: ${toEmail}`);
}

main().catch((err) => {
  console.error("\n❌ Gagal mengirim email:", err instanceof Error ? err.message : err);
  console.error("\n💡 Tips:");
  console.error("   - Pastikan SMTP_PASSWORD di .env adalah App Password Gmail (16 karakter tanpa spasi)");
  console.error("   - Pastikan Verifikasi 2 Langkah aktif di akun sdnsimoangin@gmail.com");
  process.exit(1);
});
