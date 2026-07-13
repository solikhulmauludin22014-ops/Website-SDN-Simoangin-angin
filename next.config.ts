import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
