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
    ],
  },
};

export default nextConfig;
