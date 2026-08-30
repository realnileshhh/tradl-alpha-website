import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { env } from "@/lib/env";
import "@/styles/globals.css";

/* Inter drives everything, text and numbers both, because that is what every
   type variable in the live Figma file says. See docs/DECISIONS.md 002.

   Loaded as a variable font: one file covers 400, 500 and 700, which is a
   smaller download than three static cuts and matters against the LCP budget in
   doc 04 §5. Self-hosted and preloaded through next/font rather than fetched
   from Google at runtime, so there is no third-party round trip on the critical
   path and no layout shift. `display: swap` keeps text painted while it lands. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: "Tradl AI",
  /* No description yet, deliberately. A meta description is customer-facing copy
     and therefore bound by the lexicon rules in doc 01 §7 and the SEBI RA
     perimeter in §8. A placeholder here would ship as real copy. */
};

export const viewport: Viewport = {
  /* One value, not a light/dark pair. The design system has a single mode and
     the site runs on it, so there is nothing to switch between. This is the
     page ground from marketing/ground.css; keep the two in step. */
  themeColor: "#121212",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* No data-theme attribute. The design system declares its one mode on :root,
     the site runs on it, and there is nothing to toggle. See docs/DECISIONS.md 004. */
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
