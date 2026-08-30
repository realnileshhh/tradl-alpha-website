import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_LANG, SITE_NAME } from "@/lib/site";

/**
 * Web app manifest, served at /manifest.webmanifest.
 *
 * `display: "browser"` on purpose. This is a marketing and acquisition surface,
 * not an installable app: a standalone window would strip the address bar and
 * the back button from a site whose whole job is to be linked into, shared, and
 * navigated away from. The product app is a separate surface and can make its
 * own call.
 *
 * Icons come from `npm run ds:build`, rasterised from the Figma vector.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    /* Doc 01 §4: "Tradl" is the correct short form after first mention. */
    short_name: "Tradl",
    description: SITE_DESCRIPTION,
    lang: SITE_LANG,
    start_url: "/",
    display: "browser",
    /* The page ground. Keep in step with marketing/ground.css and the viewport
       themeColor in layout.tsx: a mismatch shows as a flash of the wrong colour
       on launch. */
    background_color: "#121212",
    theme_color: "#121212",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      /* Cropped to a circle by Android launchers, so the mark is inset onto its
         own ink rather than losing its corners. */
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
