"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerLenis } from "@/lib/scroll";
import { RESTORING_ATTR, SCROLL_KEY } from "@/lib/scroll-restoration";

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
    /* -----------------------------------------------------------------------
       SCROLL RESTORATION, AND WHY THE BROWSER'S OWN IS WRONG ON THIS PAGE.

       Two sections pin, and a pin adds a spacer worth several viewports to the
       document. Those spacers do not exist until GSAP has run, which is after
       hydration, and the browser restores the scroll offset long before that,
       against a document that is thousands of pixels shorter than the one the
       offset was recorded in. It clamps to what fits, and a refresh taken in
       the sneak peek came back in the middle of the toolkit.

       So the browser is told to keep its hands off, the offset is parked on the
       way out, and it is put back here: after the pins exist, after
       ScrollTrigger has measured them, and again after the fonts land and every
       measurement moves. Only for a reload or a back-forward, which is what the
       native behaviour restores for; a fresh visit still starts at the top.
       -------------------------------------------------------------------- */
    const key = `${SCROLL_KEY}:${window.location.pathname}`;

    /* Through ScrollTrigger, not by assignment. ScrollTrigger caches
       `history.scrollRestoration` the first time it runs and writes its cached
       copy back on every refresh, so `history.scrollRestoration = "manual"` is
       reverted a few milliseconds later and reads as "auto" by the time anyone
       checks. This is the same switch, thrown where the library will keep it,
       and it clears the scroll memory ScrollTrigger keeps for its own restores
       in the same call. */
    ScrollTrigger.clearScrollMemory("manual");

    const entry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const resuming = entry?.type === "reload" || entry?.type === "back_forward";
    const parked = Number(sessionStorage.getItem(key) ?? "");
    const restoreTo = resuming && Number.isFinite(parked) && parked > 0 ? parked : 0;

    const park = () => {
      try {
        sessionStorage.setItem(key, String(Math.round(window.scrollY)));
      } catch {
        /* Private mode and full quotas both throw. Losing the offset is not
           worth throwing away the page. */
      }
    };

    window.addEventListener("pagehide", park);
    /* iOS often kills a tab without ever firing pagehide. */
    const onVisibility = () => {
      if (document.visibilityState === "hidden") park();
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* A URL bar sliding away on a phone is a resize, and refreshing every
       trigger mid-scroll makes a pinned scene jump. GSAP's own guard: ignore
       vertical-only resizes on touch devices. */
    ScrollTrigger.config({ ignoreMobileResize: true });

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

    /* Immediate and forced: Lenis ignores a scrollTo while it is stopped, and
       anything animated here would be a 700ms glide from the top of a page the
       visitor never asked to leave. */
    /* The body is hidden from the first byte when a restore is pending, so
       nothing is painted at the top of the page and then yanked. This is the
       other half of that: show it again the moment the page is where it should
       be. Called even when there is nothing to restore, because the flag is
       armed by a script that cannot know whether the offset will still be
       reachable by the time this runs. */
    const reveal = () => document.documentElement.removeAttribute(RESTORING_ATTR);

    const restore = () => {
      if (restoreTo <= 0) {
        reveal();
        return;
      }
      /* Lenis measures the document once, when it is constructed, and clamps
         every scrollTo to that. The pins apply their spacing later, so at that
         moment the page is six thousand pixels shorter than it is about to be,
         and a restore to the sneak peek clamped straight back into the toolkit.
         Re-measuring first is the whole fix. */
      lenis.resize();
      lenis.scrollTo(restoreTo, { immediate: true, force: true });
      ScrollTrigger.update();
      reveal();
    };

    document.fonts?.ready.then(() => {
      if (cancelled) return;
      ScrollTrigger.refresh();
      restore();
    });

    ScrollTrigger.refresh();
    restore();

    /* And once more when everything that carries height has arrived. Images
       are sized in the markup so nothing should move, but `load` is the last
       moment anything can, and a restore that lands 200px out is worse than
       one that costs a second scroll. */
    const onLoad = () => restore();
    if (document.readyState === "complete") requestAnimationFrame(onLoad);
    else window.addEventListener("load", onLoad, { once: true });

    /* A <details> opening changes the height of the document under everything
       below it, which leaves every trigger past it measured against a page that
       no longer exists. `toggle` does not bubble, so this listens in the
       capture phase, and the refresh waits a frame for the panel to settle. */
    const onToggle = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    document.addEventListener("toggle", onToggle, true);

    return () => {
      cancelled = true;
      window.removeEventListener("pagehide", park);
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("toggle", onToggle, true);
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
