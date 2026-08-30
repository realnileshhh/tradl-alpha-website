"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Component-level entrance. Motion's job on this site is micro-interaction
 * and page transition; scroll choreography belongs to GSAP + ScrollTrigger.
 * Keeping that split means one library owns the scroll timeline and the two
 * never fight over the same element's transform.
 *
 * `useReducedMotion` here is Motion's own hook, which reads the same media
 * query as `@/lib/use-reduced-motion` — used because Motion needs it inside
 * its own render cycle to skip the transition entirely rather than run a
 * zero-duration one.
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

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
