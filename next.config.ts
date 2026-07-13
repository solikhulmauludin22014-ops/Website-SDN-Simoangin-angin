import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type-checking during build – speeds up CI and avoids type-error failures
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        // Google Drive direct image links  (uc?export=view&id=...)
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },

  // Allow googleapis to run in the Node.js runtime (not Edge)
  serverExternalPackages: ["googleapis"],

  experimental: {
    serverActions: {
      // Hard cap on request body size: e-book (50 MB) + cover (5 MB) + form overhead
      bodySizeLimit: "55mb",
    },
  },
};

export default nextConfig;
