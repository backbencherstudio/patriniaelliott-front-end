import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep only safe experimental options
  experimental: {
    optimizePackageImports: ['react-icons']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
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
        hostname: "naamstay.com",
      },
      {
        protocol: "https",
        hostname: "backend.naamstay.com",
      },
      {
        protocol: "https",
        hostname: "backend.naamstay.comhttps",
      },
      {
        protocol: "https",
        hostname: "blades-allowed-sympathy-production.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "cache-staff-merchant-privacy.trycloudflare.com",
      },
      {
        protocol: "http",
        hostname: "cache-staff-merchant-privacy.trycloudflare.com",
      },
      {
        protocol: "http",
        hostname: "lower-microphone-administrators-cycling.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
