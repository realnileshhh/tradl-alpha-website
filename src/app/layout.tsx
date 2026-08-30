import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Lato } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { env } from "@/lib/env";
import "@/styles/globals.css";

/* IBM Plex Sans drives all text, Lato drives all numbers — the split is
   from the design system, not a preference. Loaded through next/font so
   they are self-hosted and preloaded rather than fetched from Google at
   runtime; `display: swap` keeps text painted while they arrive. */
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: "Tradl AI",
  description: "",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* Dark is the canonical theme in the token export; light lives behind
       [data-theme="light"] on this element. */
    <html lang="en" data-theme="dark" className={`${ibmPlexSans.variable} ${lato.variable}`}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
