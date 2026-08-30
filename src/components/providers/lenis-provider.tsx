"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Smooth scroll, driven by GSAP's ticker rather than its own rAF loop.
 *
 * Two loops reading scroll position in the same frame is how you get
 * pinned sections that lag a frame behind the content they pin. So Lenis
 * gets stepped from `gsap.ticker` and `lenis.on("scroll")` pushes updates
 * into ScrollTrigger. One clock, one source of truth.
 *
 * No `scrollerProxy` is needed: Lenis drives the real window scroll
 * position rather than transforming a wrapper, so ScrollTrigger's default
 * window scroller already reads the correct value. A proxy would only be
 * required if scrolling moved into a nested element.
 *
 * Under prefers-reduced-motion Lenis is not constructed at all: native
 * scrolling is the honest behaviour, and ScrollTrigger works against it
 * unchanged.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Roughly one screen of travel per wheel gesture, easing out. Tune
      // here, not per-page, so the whole site shares one scroll feel.
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Touch devices already have native inertia that feels correct;
      // layering Lenis on top makes them feel laggy.
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const step = (time: number) => {
      // gsap.ticker is in seconds, Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(step);
    // The ticker's own smoothing fights Lenis's easing.
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(step);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
