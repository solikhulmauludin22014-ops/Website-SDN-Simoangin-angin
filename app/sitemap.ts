import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXTAUTH_URL ?? "https://website-sdn-simoangin-angin.vercel.app";

  return [
    "",
    "/perpustakaan",
    "/profil",
    "/fasilitas",
    "/kontak",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
