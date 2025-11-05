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
        hostname: "lower-microphone-administrators-cycling.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
