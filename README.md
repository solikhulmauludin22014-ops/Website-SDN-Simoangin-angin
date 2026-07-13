# Website Sekolah + Perpustakaan Digital

Project ini dibuat dengan Next.js App Router + TypeScript untuk kebutuhan website sekolah yang terintegrasi dengan perpustakaan digital.

## Fitur Utama

- Halaman publik sekolah: beranda, profil, fasilitas, kontak
- Katalog perpustakaan digital dengan pencarian realtime, filter, dan sorting
- Halaman detail buku dengan embed Google Drive viewer + tombol download
- Login admin (NextAuth credentials)
- Dashboard admin + statistik sederhana
- CRUD buku dan kategori
- Upload e-book/cover ke Google Drive API v3 (service account)
- Prisma ORM + PostgreSQL (Neon)

## Stack

- Next.js 16 (sesuai requirement 14+)
- TypeScript
- Tailwind CSS
- Prisma
- NextAuth.js
- Framer Motion
- Recharts
- Zod

## Struktur Route

- `/`
- `/perpustakaan`
- `/perpustakaan/[slug]`
- `/profil`
- `/fasilitas`
- `/kontak`
- `/admin/login`
- `/admin/dashboard`
- `/admin/buku`
- `/admin/buku/tambah`
- `/admin/buku/[id]/edit`
- `/admin/kategori`

## Setup Lokal

1. Install dependency:

	```bash
	npm install
	```

2. Copy env:

	```bash
	copy .env.example .env
	```

3. Isi variable env utama:

	- `DATABASE_URL`
	- `NEXTAUTH_SECRET`
	- `NEXTAUTH_URL`
	- `GOOGLE_CLIENT_EMAIL`
	- `GOOGLE_PRIVATE_KEY`
	- `GOOGLE_DRIVE_FOLDER_ID`

4. Generate Prisma client dan push schema:

	```bash
	npm run db:generate
	npm run db:push
	```

5. Seed admin + sample data:

	```bash
	npm run db:seed
	```

6. Jalankan development server:

	```bash
	npm run dev
	```

## Akun Admin Default Seed

- Email: `admin@sekolah.sch.id`
- Password: `admin12345`

Ubah via env `SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD` sebelum menjalankan seed jika diperlukan.

## Catatan Deploy

- Frontend/Serverless: Vercel
- Database: Neon
- Pastikan semua env variable ditambahkan di Vercel Project Settings.
- Saat menghubungkan repo GitHub ke Vercel, set `Root Directory` ke `sekolah-digital`.
- Build Vercel sekarang menjalankan `prisma generate && next build`, jadi Prisma Client ikut terbuat saat deploy.
