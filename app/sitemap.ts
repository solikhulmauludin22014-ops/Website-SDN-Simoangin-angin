import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:3000";

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
