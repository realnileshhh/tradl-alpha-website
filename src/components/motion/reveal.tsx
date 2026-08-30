"use client";

import { useRef, type ElementType, type ComponentType, type ReactNode, type Ref } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  EASE,
  REVEAL,
  SCROLL_BUDGET,
  type Register,
} from "@/design-system/extensions/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The scroll reveal. This is the only way content enters on this site.
 *
 * One ScrollTrigger per <Reveal>, not per element: `stagger` animates the
 * container's direct children off a single trigger, so a twelve-card grid costs
 * one trigger rather than twelve. Each trigger carries `once: true` and destroys
 * itself after firing, which is both cheaper than leaving it alive and the
 * behaviour the design wants. Scrolling back up does not replay anything, and a
 * page that re-animates on the way back is a page nobody can read twice.
 *
 * Movement is `yPercent`, never pixels. The type scale is fluid clamp(), so a
 * 68px statement headline and a 12px label have to travel proportionally or one
 * of them looks wrong at every viewport that is not the one it was tuned on.
 *
 * DO NOT WRAP THE HERO. Doc 04 §5 requires the LCP element to be painted in the
 * first frame as a finished static. Everything here starts at opacity 0, so
 * wrapping above-the-fold content makes the largest paint wait for hydration.
 * Development builds warn when a Reveal mounts above the fold.
 *
 * Under prefers-reduced-motion the final state is set directly and no tween or
 * trigger is created at all. The global CSS floor in globals.css cannot do this
 * job: it caps transition and animation durations, and GSAP writes inline
 * styles rather than using either.
 */
export function Reveal({
  children,
  as = "div",
  register = "instrument",
  stagger = false,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** The rendered element. Use a semantic tag rather than nesting one inside. */
  as?: ElementType;
  /** Which of the two registers in doc 04 §1 this belongs to. */
  register?: Register;
  /** Animate the direct children in sequence instead of the box as one piece. */
  stagger?: boolean;
  /** Seconds. Use sparingly: a reveal that waits reads as a dropped frame. */
  delay?: number;
  className?: string;
}) {
  const container = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const preset = REVEAL[register];

  /* `as` is polymorphic, so TypeScript intersects every intrinsic element's
     props and the result is `never`. The cast narrows it to the four props this
     component actually passes, which is checked, rather than to `any`. */
  const Tag = as as unknown as PolymorphicTag;

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;

      const targets = stagger ? Array.from(el.children) : el;

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, yPercent: 0, willChange: "auto" });
        return;
      }

      warnIfAboveTheFold(el);

      gsap.fromTo(
        targets,
        { opacity: 0, yPercent: preset.rise },
        {
          opacity: 1,
          yPercent: 0,
          duration: preset.duration,
          stagger: stagger ? preset.stagger : 0,
          ease: EASE,
          delay,
          scrollTrigger: {
            trigger: el,
            start: preset.start,
            once: true,
          },
          /* Release the compositor layer the pre-hide class pinned, and drop the
             transform entirely. A leftover transform on a settled element is not
             free: it holds a layer, and it makes the element a containing block
             for anything position: fixed inside it. */
          onComplete: () => {
            gsap.set(targets, { clearProps: "transform,willChange", opacity: 1 });
          },
        },
      );

      warnIfOverBudget();
    },
    { scope: container, dependencies: [prefersReducedMotion, register, stagger, delay] },
  );

  return (
    <Tag
      ref={container}
      className={cn(className)}
      {...(stagger ? { "data-reveal-group": "" } : { "data-reveal": "" })}
    >
      {children}
    </Tag>
  );
}

type PolymorphicTag = ComponentType<{
  ref?: Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
  "data-reveal"?: string;
  "data-reveal-group"?: string;
}>;

/* -----------------------------------------------------------------------------
   Development guards. Both compile out of production: the checks are inside a
   NODE_ENV test that the bundler resolves statically.
   -------------------------------------------------------------------------- */

function warnIfAboveTheFold(el: HTMLElement): void {
  if (process.env.NODE_ENV === "production") return;
  /* Only meaningful at the top of the page. A reload inside the page restores
     the offset before these mount, and then every reveal near the restored
     viewport looks like it is above the fold when none of them are. */
  if (window.scrollY > 0) return;
  if (el.getBoundingClientRect().top >= window.innerHeight * 0.9) return;
  console.warn(
    "[motion] A Reveal mounted above the fold. It starts hidden, so it delays the largest paint. Doc 04 §5 wants the first screen painted as a finished static. Render it without Reveal.",
    el,
  );
}

let budgetWarned = false;

function warnIfOverBudget(): void {
  if (process.env.NODE_ENV === "production" || budgetWarned) return;

  const all = ScrollTrigger.getAll();
  const scrubbed = all.filter((t) => t.vars.scrub).length;
  if (all.length <= SCROLL_BUDGET.triggers && scrubbed <= SCROLL_BUDGET.scrubbed) return;

  budgetWarned = true;
  console.warn(
    `[motion] ScrollTrigger budget exceeded: ${all.length} triggers (max ${SCROLL_BUDGET.triggers}), ${scrubbed} scrubbed (max ${SCROLL_BUDGET.scrubbed}). See docs/MOTION.md.`,
  );
}
