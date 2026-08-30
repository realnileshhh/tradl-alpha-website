"use client";

import { useSyncExternalStore } from "react";

/**
 * A media query as React state, on the same `useSyncExternalStore` shape as
 * `useReducedMotion`, so the two behave identically under SSR.
 *
 * The server snapshot is `false`, which means "assume the narrow layout". That
 * is the deliberate direction: a component that branches on this ships the
 * small, cheap arrangement in the HTML and upgrades after hydration. Guessing
 * wide would put the expensive branch into every document, including the ones
 * rendered for a phone.
 *
 * The listener is created per query string. Call it with a literal, not a value
 * built in render, or every render subscribes to a new query.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
