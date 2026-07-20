/**
 * Konfigurasi data sekolah — dipakai di template PDF surat
 * dan halaman publik. Cukup ubah di sini kalau ada perubahan.
 */

export const SCHOOL = {
  name: "SD Negeri Simoangin-angin",
  shortName: "SDN Simoangin-angin",
  address: "Desa Simoangin-angin, Kecamatan Wonoayu, Kabupaten Sidoarjo",
  province: "Jawa Timur",
  npsn: "20501508",
  phone: "(085) 655914559",
  email: "sdnsimoangin@gmail.com",
  website: "sdnsimoanginangin.sch.id",
} as const;

export const PRINCIPAL = {
  name: "Dra. Siti Aminah, M.Pd",
  nip: "196805151993032008",
  title: "Kepala Sekolah",
} as const;

/** Label jenis surat (mapping enum → teks tampilan) */
export const LETTER_TYPE_LABELS: Record<string, string> = {
  ACTIVE_STUDENT: "Surat Keterangan Aktif Siswa",
  TRANSFER: "Surat Keterangan Pindah (Mutasi)",
  OTHER: "Surat Keterangan Lainnya",
};

/** Label status pengajuan */
export const REQUEST_STATUS_LABELS: Record<string, string> = {
  PENDING: "Menunggu",
  PROCESSING: "Diproses",
  COMPLETED: "Selesai",
  REJECTED: "Ditolak",
};

/** Warna badge status */
export const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  PROCESSING: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};
