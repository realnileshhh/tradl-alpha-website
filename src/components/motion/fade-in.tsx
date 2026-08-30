"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_POINTS } from "@/design-system/extensions/motion";

/**
 * A mount entrance. Not a scroll reveal.
 *
 * Motion's job on this site is micro-interaction, mount and page transition;
 * scroll choreography belongs to GSAP through <Reveal>. This component used to
 * use `whileInView`, which made it a second scroll-reveal system running beside
 * the first, with its own trigger point, its own easing and no shared budget.
 * Two libraries watching the same scroll to transform the same kind of element
 * is exactly the collision the stack split exists to prevent, so `whileInView`
 * is gone. Use <Reveal> for anything that enters on scroll.
 *
 * The curve and duration come from the shared vocabulary, so a mount entrance
 * and a scroll reveal move with the same hand.
 *
 * `useReducedMotion` here is Motion's own hook, which reads the same media query
 * as `@/lib/use-reduced-motion` — used because Motion needs it inside its own
 * render cycle to skip the transition entirely rather than run a zero-duration one.
 */
export function FadeIn({
  children,
  delay = 0,
  y = 12,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DURATION.instrument,
        delay,
        ease: [...EASE_POINTS],
      }}
    >
      {children}
    </motion.div>
  );
}
