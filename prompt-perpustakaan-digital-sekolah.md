# Prompt: Website Sekolah dengan Perpustakaan Digital Terintegrasi

## Konteks Proyek
Buatkan website sekolah yang terintegrasi dengan sistem perpustakaan digital. Website ini digunakan oleh publik (siswa, guru, orang tua, pengunjung) untuk membaca/mengakses e-book, dan oleh admin (pustakawan/staf TU) untuk mengelola koleksi buku. Desain harus modern, menarik, dan mudah digunakan (UI/UX menjadi prioritas utama).

## Tech Stack
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Database**: Neon (Serverless PostgreSQL)
- **ORM**: Prisma
- **Auth**: NextAuth.js — hanya untuk admin, pengguna umum tidak perlu login
- **Styling**: Tailwind CSS + shadcn/ui untuk komponen
- **Animasi**: Framer Motion (transisi halaman, hover effect, micro-interaction)
- **Storage E-book**: Google Drive API v3 (akun Google pribadi/sekolah)
- **Deployment**: Vercel (frontend + serverless functions), Neon (database)

## Aturan Akses
- **Pengguna umum (tanpa login)**: bisa melihat, mencari, membaca/mendownload semua e-book di perpustakaan digital, serta mengakses seluruh halaman informasi sekolah.
- **Admin (wajib login)**: satu-satunya pihak yang bisa menambah, mengedit, menghapus buku, mengelola kategori, dan melihat statistik. Halaman admin dilindungi middleware Next.js (`/admin/*`).

## Fitur

### Halaman Publik
1. **Beranda** — profil sekolah, sambutan kepala sekolah, berita/pengumuman, galeri kegiatan, CTA ke perpustakaan digital
2. **Perpustakaan Digital**
   - Katalog e-book dalam bentuk grid card (cover, judul, penulis, kategori)
   - Fitur pencarian judul/penulis (real-time/debounced search)
   - Filter berdasarkan kategori, tahun terbit
   - Sorting (terbaru, terpopuler, A-Z)
3. **Detail Buku**
   - Cover, deskripsi, metadata (penulis, kategori, tahun, jumlah halaman)
   - Tombol "Baca Online" (embed Google Drive viewer via iframe) dan "Download"
   - Rekomendasi buku terkait (kategori sama)
4. **Halaman informasi sekolah lain**: Profil, Fasilitas, Kontak (opsional sesuai kebutuhan)

### Halaman Admin
1. **Login** — form login sederhana (email + password, hashed dengan bcrypt)
2. **Dashboard** — ringkasan jumlah buku, kategori, buku paling banyak dibaca/download
3. **Kelola Buku (CRUD)**
   - Form tambah/edit buku: upload cover, upload file e-book (auto-upload ke Google Drive lewat API), input metadata
   - Setelah upload ke Drive, set permission file otomatis menjadi "anyone with link can view"
   - Simpan `drive_file_id` dan `webViewLink` ke database
4. **Kelola Kategori** — CRUD kategori buku
5. **Statistik** — grafik sederhana (jumlah view/download per buku, per bulan)

## Skema Database (Neon PostgreSQL via Prisma)

```prisma
model Admin {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String   // hashed
  createdAt DateTime @default(now())
}

model Category {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  books Book[]
}

model Book {
  id            String   @id @default(cuid())
  title         String
  author        String
  description   String?
  publishedYear Int?
  coverUrl      String?  // thumbnail cover (bisa juga disimpan di Drive)
  driveFileId   String   // ID file di Google Drive
  driveViewLink String   // link view/embed
  categoryId    String
  category      Category @relation(fields: [categoryId], references: [id])
  viewCount     Int      @default(0)
  downloadCount Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Integrasi Google Drive API
1. Buat Google Cloud Project → aktifkan Google Drive API → buat OAuth2 Client ID atau Service Account
2. Gunakan library resmi `googleapis` (Node.js)
3. Alur upload dari admin panel:
   - Admin upload file e-book (PDF/EPUB) lewat form
   - Next.js API route menerima file, upload ke folder khusus di Google Drive menggunakan Service Account
   - Set permission file: `role: reader, type: anyone`
   - Ambil `fileId` dan `webViewLink`, simpan ke tabel `Book` di Neon
4. Untuk menampilkan e-book di halaman detail, embed dengan:
   ```html
   <iframe src="https://drive.google.com/file/d/{driveFileId}/preview" width="100%" height="600"></iframe>
   ```
5. Tombol download mengarah ke `https://drive.google.com/uc?export=download&id={driveFileId}`

## Arahan Desain UI/UX
- **Palet warna**: kombinasi warna edukatif dan hangat (contoh: navy + gold, atau hijau tua + krem) — hindari warna generik/template default
- **Tipografi**: font modern dan mudah dibaca (contoh: Inter atau Plus Jakarta Sans untuk body, font display yang lebih ekspresif untuk heading)
- **Hero section**: full-width dengan foto/ilustrasi sekolah, animasi fade-in/slide-up saat load
- **Card buku**: efek hover (scale/shadow), skeleton loading saat data dimuat
- **Transisi halaman**: gunakan Framer Motion untuk transisi antar-route yang halus
- **Responsif**: mobile-first, karena mayoritas siswa mengakses lewat HP
- **Aksesibilitas**: kontras warna cukup, alt text pada gambar, navigasi keyboard-friendly
- **Dark mode**: opsional, sebagai nilai tambah

## Struktur Halaman/Route
```
/                         → Beranda sekolah
/perpustakaan             → Katalog e-book
/perpustakaan/[slug]      → Detail buku
/profil                   → Profil sekolah (opsional)
/admin/login              → Login admin
/admin/dashboard          → Dashboard admin
/admin/buku               → Kelola buku (list + CRUD)
/admin/buku/tambah        → Form tambah buku
/admin/buku/[id]/edit     → Form edit buku
/admin/kategori           → Kelola kategori
```

## Instruksi Tambahan untuk AI/Developer
- Gunakan TypeScript secara konsisten di seluruh proyek
- Validasi input dengan Zod di setiap API route
- Gunakan environment variable untuk kredensial (Neon connection string, Google API credentials, NextAuth secret) — jangan hardcode
- Sertakan loading state dan error handling di setiap fetch data
- Buat komponen reusable untuk BookCard, SearchBar, CategoryFilter, AdminSidebar
- Optimalkan gambar dengan `next/image`
- Tambahkan meta tags SEO dasar untuk halaman publik
