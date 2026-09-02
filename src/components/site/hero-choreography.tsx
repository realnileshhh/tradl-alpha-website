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
  /* Outside the pin, so GSAP never reverts what is written to it. See THE HEM. */
  const hem = useRef<HTMLDivElement>(null);
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
        /* `offsetTop` and `offsetHeight` rather than a rect, because a rect
           carries whatever transform is currently on the frame and this figure
           is read again on every refresh. Measuring the layout means the answer
           cannot drift by however far the last scroll had already moved it. */
        let offsetWithinScene = 0;
        for (
          let el: HTMLElement | null = frame;
          el && el !== root;
          el = el.offsetParent as HTMLElement | null
        ) {
          offsetWithinScene += el.offsetTop;
        }
        return (window.innerHeight - frame.offsetHeight) / 2 - offsetWithinScene;
      };

      /**
       * THE HEM, and it is the whole reason this scene stopped leaving a hole
       * under itself.
       *
       * The frame is carried up to the middle of the screen and its layout slot
       * stays exactly where it was, so once the pin releases there is a band of
       * ground under the frame as tall as the distance it rose. Measured at 1440
       * by 900 that was 458px, and it is what sat between the hero and the
       * toolkit's eyebrow.
       *
       * The pin length is not the lever, which took a wrong turn to establish:
       * the spacer is scroll distance, and the band is section height. Shortening
       * the pin only makes the choreography twice as fast and leaves the band
       * exactly where it was.
       *
       * So the section gives back the height the frame vacates, and it has to be
       * given back somewhere GSAP does not manage. Two places that do not work,
       * both tried: the pinned element itself, whose inline `cssText` GSAP saves
       * and restores on every refresh, so the margin is wiped; and the pin
       * spacer, which does not exist yet at `onRefreshInit` and, written at
       * `onRefresh`, moves the document after every trigger on the page has been
       * measured. That last one is not a nicety. It put every trigger below the
       * hero 458px out, and opening a question in the FAQ, which refreshes
       * ScrollTrigger, made the whole page jump.
       *
       * This element is ours. It wraps the pin rather than being pinned, so
       * nothing reverts it, and it is written before the first measurement and
       * again at `onRefreshInit`, which is before every later one.
       */
      const closeTheHem = () => {
        const el = hem.current;
        if (el) el.style.marginBottom = `${Math.round(Math.min(0, travelToCentre()))}px`;
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
          /* Before the measuring. The travel depends on the viewport height, so
             it is re-read on every refresh a resize causes. */
          onRefreshInit: closeTheHem,
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

      closeTheHem();

      /* The pin adds a spacer, which changes the document height that every
         other trigger measured against. */
      ScrollTrigger.refresh();
    },
    { scope, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={hem}>
      <div ref={scope}>{children}</div>
    </div>
  );
}
