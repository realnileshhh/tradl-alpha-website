import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No framework fingerprint in response headers.
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  // Doc 04 §5 bans base64-embedded heavy assets; everything goes through
  // static optimisation instead.
  outputFileTracingExcludes: {
    "*": ["./docs/**/*", "./reference/**/*"],
  },
};

export default nextConfig;
