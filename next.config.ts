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
        hostname: "commodities-suzuki-straight-makers.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "enhancing-wan-hamburg-hourly.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "humanitarian-crimes-too-producing.trycloudflare.com",
      },
      {
        protocol: "http",
        hostname: "humanitarian-crimes-too-producing.trycloudflare.com",
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
        hostname: "workflow-footage-delivers-carolina.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "shipping-embedded-validity-cbs.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "blind-domain-lat-net.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "buffer-highly-outlets-tubes.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "blind-domain-lat-net.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
