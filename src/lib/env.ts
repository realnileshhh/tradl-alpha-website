/**
 * Public runtime configuration, read once and validated at module load so
 * a missing value fails the build rather than rendering a broken canonical
 * URL in production.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4100";

export const env = {
  siteUrl,
  isProduction: process.env.NODE_ENV === "production",
} as const;
