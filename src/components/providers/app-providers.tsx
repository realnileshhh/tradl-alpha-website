"use client";

import type { ReactNode } from "react";
import { LenisProvider } from "./lenis-provider";

/**
 * Every client-side provider the app needs, in one wrapper, so
 * `app/layout.tsx` stays a server component and only this subtree is
 * client-rendered.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
