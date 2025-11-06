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
        protocol: "https",
        hostname: "backend.naamstay.com",
      },
      {
        protocol: "https",
        hostname: "statutes-cases-accompanied-rapidly.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "going-bestsellers-competitors-richards.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "bills-spine-unique-paths.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "presenting-hope-propecia-pet.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "lower-microphone-administrators-cycling.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "http",
        hostname: "flagcdn.com",
      },
    ],
  },
};

export default nextConfig;
