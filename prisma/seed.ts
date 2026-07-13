import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { toSlug } from "../lib/utils";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@sekolah.sch.id";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin12345";

  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashed,
      name: process.env.SEED_ADMIN_NAME ?? "Admin Perpustakaan",
    },
    create: {
      email: adminEmail,
      password: hashed,
      name: process.env.SEED_ADMIN_NAME ?? "Admin Perpustakaan",
    },
  });

  const categoryNames = ["Sains", "Matematika", "Bahasa", "Sejarah"];
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { slug: toSlug(name) },
      update: { name },
      create: { name, slug: toSlug(name) },
    });
  }

  const sains = await prisma.category.findUnique({ where: { slug: "sains" } });
  if (!sains) return;

  await prisma.book.upsert({
    where: { slug: "fisika-dasar-kelas-x" },
    update: {},
    create: {
      slug: "fisika-dasar-kelas-x",
      title: "Fisika Dasar Kelas X",
      author: "Tim Guru IPA",
      description: "Materi konsep dasar fisika untuk siswa SMA kelas X.",
      publishedYear: 2025,
      pageCount: 210,
      driveFileId: "sample-drive-file-id",
      driveViewLink: "https://drive.google.com/file/d/sample-drive-file-id/view",
      categoryId: sains.id,
      coverUrl: "/placeholder-book.svg",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
