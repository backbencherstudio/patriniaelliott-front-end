import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fellow-lone-provisions-decided.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "fellow-lone-provisions-decided.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "backend.naamstay.com",
      },
      {
        protocol: "https",
        hostname: "naamstay.com",
      },
      {
        protocol: "https",
        hostname: "fellow-lone-provisions-decided.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
