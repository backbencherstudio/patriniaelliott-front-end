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
        hostname: "bills-spine-unique-paths.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "http",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "backend.naamstay.com",
      }
    ],
  },
};

export default nextConfig;
