import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // No framework fingerprint in response headers.
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  /**
   * The 3D model is served immutable, because the default was making every
   * visit pay for it again.
   *
   * Next serves everything in `public/` as `cache-control: public, max-age=0`,
   * which asks the browser to revalidate on every navigation. For a 968KB model
   * on the connection doc 04 §5 binds us to, that is eight seconds of the
   * engineering section being a photograph on a reload, and it is why the bull
   * looked slow every single time rather than only on a first visit.
   *
   * `immutable` is a promise about the URL, not the file, so the filename is now
   * part of the contract: a new model ships under a new name. `bull.glb` is
   * referenced from exactly one place, `engineering/bull-asset.ts`, which is
   * where that rename would happen.
   *
   * Only `/models`. The rest of `public/` is icons, the brand marks and the
   * hero video, and the video in particular is one a reader may want re-fetched
   * if it is replaced mid-alpha.
   */
  async headers() {
    return [
      {
        source: "/models/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  // Doc 04 §5 bans base64-embedded heavy assets; everything goes through
  // static optimisation instead.
  outputFileTracingExcludes: {
    "*": ["./docs/**/*", "./reference/**/*"],
  },
};

export default nextConfig;
