"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useAppStore } from "@/store/use-app-store";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Proves GSAP + ScrollTrigger + Lenis: a pinned section whose inner track
 * scrubs horizontally against vertical scroll, while writing progress into
 * the zustand store.
 *
 * `useGSAP` scopes every tween created inside it to `container` and reverts
 * them on unmount, which is what stops ScrollTrigger instances leaking
 * across client-side navigations.
 */
export function PinnedPanel() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !track.current) return;

      const distance = track.current.scrollWidth - window.innerWidth;

      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => useAppStore.getState().setScrollProgress(self.progress),
        },
      });
    },
    { scope: container, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={container} className="h-screen overflow-hidden">
      <div ref={track} className="flex h-full w-max items-center gap-6 px-6">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="grid h-64 w-[70vw] place-items-center rounded-lg border border-line bg-surface shadow-glass"
          >
            <span className="num text-4xl text-fg-2">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
