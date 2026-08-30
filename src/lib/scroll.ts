"use client";

import type Lenis from "lenis";
import type { ScrollToOptions } from "lenis";

/**
 * The site's scroll control surface.
 *
 * Every caller that needs to move, stop or resume the page goes through here
 * and never touches the Lenis instance directly. That is the whole point: a
 * component should not have to know whether smooth scroll is running, whether
 * the visitor asked for reduced motion, or whether the provider has mounted
 * yet. Each function below falls back to the native equivalent when there is
 * no instance, so the answer to "is Lenis there?" never has to be branched on
 * at a call site.
 *
 * A module-level singleton rather than context, because the callers include
 * code inside <Canvas>, which lives in a separate React reconciler that
 * context does not cross.
 */

let instance: Lenis | null = null;

/** Set by LenisProvider on mount, cleared on unmount. Nothing else calls this. */
export function registerLenis(next: Lenis | null): void {
  instance = next;
}

/**
 * The raw instance, for the rare case that needs an option this module does
 * not expose. Prefer the functions below: they carry the fallbacks.
 */
export function getLenis(): Lenis | null {
  return instance;
}

function resolve(target: string | number | HTMLElement): number | null {
  if (typeof target === "number") return target;
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!(el instanceof HTMLElement)) return null;
  return el.getBoundingClientRect().top + window.scrollY;
}

/**
 * Move the page. Use this for every in-page anchor and every "back to top"
 * control; `element.scrollIntoView()` and `scroll-behavior: smooth` both fight
 * the virtual scroll and land in the wrong place.
 *
 * Lenis is also configured with `anchors: true`, which covers plain
 * `<a href="#section">` links without any JavaScript at the call site. This is
 * for the programmatic cases.
 */
export function scrollTo(
  target: string | number | HTMLElement,
  options?: ScrollToOptions,
): void {
  if (instance) {
    instance.scrollTo(target, options);
    return;
  }

  const top = resolve(target);
  if (top === null) return;
  const offset = options?.offset ?? 0;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: top + offset,
    behavior: options?.immediate || reduce ? "auto" : "smooth",
  });
}

/* -----------------------------------------------------------------------------
   Scroll lock.

   Reference counted, because overlays nest: a dialog opens a popover, the
   popover closes, and a naive implementation hands scrolling back to a page
   that is still covered by the dialog. Only the outermost release unlocks.

   `overflow: hidden` on <body> is the usual approach and is wrong here on two
   counts: Lenis keeps scrolling its virtual position underneath it, and on iOS
   it loses the visitor's place. Stopping the scroll transport is both cheaper
   and reversible.
   -------------------------------------------------------------------------- */

let locks = 0;

/** Call on open. Every call must be paired with exactly one unlockScroll(). */
export function lockScroll(): void {
  locks += 1;
  if (locks > 1) return;

  if (instance) instance.stop();
  else document.documentElement.classList.add("scroll-locked");
}

/** Call on close. Safe to call when nothing is locked. */
export function unlockScroll(): void {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;

  if (instance) instance.start();
  else document.documentElement.classList.remove("scroll-locked");
}

/** True while any overlay holds a lock. */
export function isScrollLocked(): boolean {
  return locks > 0;
}
