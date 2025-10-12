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
        hostname: "enhancing-wan-hamburg-hourly.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "commodities-suzuki-straight-makers.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "naamstay.com",
      },
      {
        protocol: "https",
        hostname: "workflow-footage-delivers-carolina.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "shipping-embedded-validity-cbs.trycloudflare.com",
      },
    ],
  },
};

export default nextConfig;
