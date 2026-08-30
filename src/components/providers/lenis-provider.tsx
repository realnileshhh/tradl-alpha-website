"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerLenis } from "@/lib/scroll";

/**
 * Smooth scroll, driven by GSAP's ticker rather than its own rAF loop.
 *
 * Two loops reading scroll position in the same frame is how you get pinned
 * sections that lag a frame behind the content they pin. So Lenis gets stepped
 * from `gsap.ticker` and `lenis.on("scroll")` pushes updates into ScrollTrigger.
 * One clock, one source of truth.
 *
 * No `scrollerProxy` is needed: Lenis drives the real window scroll position
 * rather than transforming a wrapper, so ScrollTrigger's default window scroller
 * already reads the correct value. A proxy would only be required if scrolling
 * moved into a nested element.
 *
 * Mounted unconditionally, including under prefers-reduced-motion. Lenis 1.3
 * honours the setting itself: `respectReducedMotion` forces the interpolation to
 * 1, which tracks the input device with no smoothing, and makes programmatic
 * scrolls instant. Constructing it either way means `@/lib/scroll` always has an
 * instance, so no call site has to ask whether smooth scroll exists before it
 * can move the page or lock it behind an overlay. See docs/DECISIONS.md 005.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      /* The one dial that matters, and the only one this site tunes.
         Exponential damping: each frame closes 1 - e^(-lerp * 60 * dt) of the
         remaining distance, so the settle time is the same on a 60Hz and a
         120Hz display. 0.12 gives a time constant of 139ms and settles in about
         0.74s.

         Lower is more cinematic and is what agency sites run at. This site is
         dense, numeric and full of tables, and a page that trails the pointer by
         150px while someone reads a ledger reads as lag rather than as weight.
         0.12 keeps the tail without the drag. Tune here, never per page.

         `duration` is deliberately unset. Setting it switches Lenis to fixed-time
         mode, where every throw takes the same wall-clock time regardless of
         distance, which feels mechanical. It also silently disables `lerp`. */
      lerp: 0.12,

      /* Touch is left native. iOS momentum and rubber-banding are already
         correct, and syncing them through Lenis makes a phone feel laggy. */
      smoothWheel: true,
      syncTouch: false,

      /* GSAP owns the frame. This is the library default in 1.3, but it is the
         single assumption that would break the ticker integration if it ever
         changed, so it is stated rather than inherited. */
      autoRaf: false,

      /* Plain <a href="#section"> links go through Lenis instead of the native
         jump, which would fight the virtual scroll position. Programmatic
         movement goes through scrollTo() in @/lib/scroll. */
      anchors: true,

      /* Kills in-flight inertia when an internal link is clicked, so a route
         change does not land mid-glide on the new page. */
      stopInertiaOnNavigate: true,

      /* Detects a nested scroller under the pointer and hands the gesture back
         to it. This is what stops the page scrolling behind an overflowing panel
         or a scrollable table. `data-lenis-prevent` still works and is the
         escape hatch for anything the detection cannot see into, which in
         practice means iframes and embeds. */
      allowNestedScroll: true,
    });

    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const step = (time: number) => {
      // gsap.ticker is in seconds, Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(step);
    // The ticker's own smoothing fights Lenis's damping.
    gsap.ticker.lagSmoothing(0);

    /* Every trigger's start and end are measured in pixels at creation time. The
       type scale is fluid clamp() on a font that loads with `display: swap`, so
       the moment Inter lands every headline changes height and every measurement
       below it is stale. Refreshing on fonts.ready is the difference between
       reveals firing where they were authored and firing a few hundred pixels
       early on a cold cache. */
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    ScrollTrigger.refresh();

    return () => {
      cancelled = true;
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  /* A client-side navigation swaps the whole tree. useGSAP reverts the outgoing
     page's triggers, the incoming page creates its own, but ScrollTrigger's
     cached page height belongs to the page that just left. Refreshing after the
     new tree has painted is what stops the last section of a short page being
     unreachable after arriving from a long one. */
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
