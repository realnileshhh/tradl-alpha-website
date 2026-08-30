"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The hero's scroll choreography: the copy leaves, the demo frame takes the
 * screen, and then the whole thing goes.
 *
 * One scrubbed ScrollTrigger for the entire scene, against a per-page budget of
 * four (doc 04 §5). A scrubbed trigger recalculates on every scroll frame for
 * the element's whole pass, so this is the expensive kind and there should
 * never be a second one on this page.
 *
 * WHAT HAPPENS. The section pins at the top of the viewport and one viewport of
 * scrolling is spent in place: the copy rises a little and dissolves, and the
 * frame rises until its centre is the screen's centre and grows the last four
 * per cent to full size. Then the pin releases and the section scrolls away
 * normally, with whatever comes next arriving under it.
 *
 * The pin is what makes it read as choreography rather than as parallax. Without
 * it the frame would drift toward the centre and straight past it, and the beat
 * where the demo owns the screen, which is the whole point of the sequence,
 * would last a single frame.
 *
 * WHY `ease: "none"`. The scrollbar is the timeline here. Easing a scrubbed
 * tween puts a curve between the finger and the pixels, so the content
 * accelerates while the wheel does not, which reads as the page slipping. The
 * house curve belongs on tweens that play themselves; `scrub: 0.6` supplies the
 * only smoothing this needs, catching up over about half a second.
 *
 * THE CENTRE IS MEASURED, NOT GUESSED. The travel is a function, so
 * `invalidateOnRefresh` re-runs it on every resize and after fonts land, when
 * the fluid headline changes height and every offset under it moves. A hard
 * coded distance would be right at exactly one viewport size.
 *
 * REDUCED MOTION, doc 04 §5: no trigger is created at all. The section is a
 * plain document flow section, the copy stays put, the frame stays where the
 * layout puts it. Nothing is left half-transformed, because nothing was ever
 * transformed.
 *
 * LCP: every tween starts from the element's natural state, so the first paint
 * is the finished hero. Nothing here runs before hydration, and nothing here
 * changes what the first frame looks like.
 */
export function HeroChoreography({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const root = scope.current;
      const copy = root?.querySelector<HTMLElement>("[data-hero-copy]");
      const frame = root?.querySelector<HTMLElement>("[data-hero-frame]");
      if (!root || !copy || !frame) return;

      /* Distance from the frame's resting position to the middle of the
         viewport. Both rects are read in the same frame, so the difference is a
         layout offset and does not depend on where the page happens to be
         scrolled when this runs. */
      const travelToCentre = () => {
        const rootTop = root.getBoundingClientRect().top;
        const rect = frame.getBoundingClientRect();
        const offsetWithinScene = rect.top - rootTop;
        return (window.innerHeight - rect.height) / 2 - offsetWithinScene;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=100%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(copy, { yPercent: -12, opacity: 0, ease: "none" }, 0)
        .fromTo(
          frame,
          { scale: 0.96 },
          { y: travelToCentre, scale: 1, ease: "none" },
          0,
        );

      /* The pin adds a spacer, which changes the document height that every
         other trigger measured against. */
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [prefersReducedMotion] },
  );

  return <div ref={scope}>{children}</div>;
}
