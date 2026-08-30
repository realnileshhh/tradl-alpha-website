/**
 * Public runtime configuration, resolved once at module load.
 *
 * The site origin is load-bearing for more than convenience: it is the base for
 * every canonical link, the Open Graph image URL, and the JSON-LD entity. Get it
 * wrong on a deploy and the symptom is not a crash, it is a live site quietly
 * telling crawlers its canonical home is http://localhost:4100.
 *
 * So the fallback chain is explicit, and a deployed build that reaches the
 * localhost default fails loudly instead of shipping.
 */

function normalise(url: string): string {
  const trimmed = url.trim().replace(/\/+$/, "");
  try {
    // Throws on a value that is not absolute, which is the common misconfiguration
    // (someone sets "tradl.in" rather than "https://tradl.in").
    new URL(trimmed);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute URL including the scheme. Received: ${url}`
    );
  }
  return trimmed;
}

const LOCAL_DEFAULT = "http://localhost:4100";

/** True on Vercel or in CI, i.e. anywhere the output is deployed or gated. */
const isDeployedEnvironment = Boolean(process.env.VERCEL || process.env.CI);

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return normalise(explicit);

  // Vercel exposes this to the client automatically and it is the right value
  // for preview deployments, where a hard-coded production origin would be wrong.
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();
  if (vercel) return normalise(`https://${vercel}`);

  if (isDeployedEnvironment) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. A deployed build must not fall back to " +
        `${LOCAL_DEFAULT}: it would publish localhost canonicals and Open Graph URLs. ` +
        "Set it in the project's environment variables. See .env.example."
    );
  }

  return LOCAL_DEFAULT;
}

const siteUrl = resolveSiteUrl();

/**
 * Only the real production deployment should be indexable. Preview URLs are
 * crawlable if anyone links to them, and a preview competing with the live site
 * in search results is a slow, hard-to-diagnose SEO problem.
 */
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;
const shouldIndex = vercelEnv ? vercelEnv === "production" : !siteUrl.includes("localhost");

export const env = {
  siteUrl,
  isProduction: process.env.NODE_ENV === "production",
  /** True while running against the local fallback origin. */
  isLocalOrigin: siteUrl === LOCAL_DEFAULT,
  /** Gates robots directives. False on localhost and on Vercel previews. */
  shouldIndex,
} as const;
