import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // ✅ IMPORTANT FIX
          },
        ],
      },
    ];
  },
};

export default nextConfig;
