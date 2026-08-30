"use client";

import { useRef, type ElementType, type ComponentType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE, REVEAL, type Register } from "@/design-system/extensions/motion";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * A line that rises into place one word at a time, from behind a mask.
 *
 * For the statement register only, and roughly once per page. Doc 04 §1 caps
 * statement at about 30 per cent of a page's scroll length, and this is the most
 * expensive thing in that budget.
 *
 * WORDS, NOT CHARACTERS. Splitting per character is the common version of this
 * effect and it is a bad trade here: a 45-character headline becomes 45 boxes,
 * each holding a compositor layer, and the stagger has to run so fast that the
 * effect stops reading. It also destroys the text for anyone using a screen
 * reader or selecting to copy. The mask on a word carries the same idea at a
 * twentieth of the cost.
 *
 * Accessibility: the whole string is announced once from `aria-label` on the
 * wrapper, and every generated span is hidden from the tree. That keeps one
 * readable string where the DOM has many.
 *
 * The mask is `overflow: clip` with the box grown by 0.12em and pulled back by
 * the same amount, so descenders and diacritics are not sheared off while the
 * word is at rest.
 */
export function SplitWords({
  text,
  as = "span",
  register = "statement",
  delay = 0,
  className,
}: {
  /** Plain text. Markup is not supported: the wrapper owns the accessible name. */
  text: string;
  as?: ElementType;
  register?: Register;
  delay?: number;
  className?: string;
}) {
  const container = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const preset = REVEAL[register];
  const words = text.split(/\s+/).filter(Boolean);

  /* See the note on the same cast in reveal.tsx. */
  const Tag = as as unknown as PolymorphicTag;

  warnIfLong(words.length, text);

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;
      const targets = el.querySelectorAll("[data-word]");

      if (prefersReducedMotion) {
        gsap.set(targets, { yPercent: 0, opacity: 1, willChange: "auto" });
        return;
      }

      gsap.fromTo(
        targets,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: preset.duration,
          stagger: preset.stagger,
          ease: EASE,
          delay,
          scrollTrigger: { trigger: el, start: preset.start, once: true },
          onComplete: () => {
            gsap.set(targets, { clearProps: "transform,willChange", opacity: 1 });
          },
        },
      );
    },
    { scope: container, dependencies: [prefersReducedMotion, register, delay, text] },
  );

  return (
    <Tag ref={container} className={cn(className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-clip pb-[0.12em] mb-[-0.12em] align-bottom"
        >
          <span data-word className="inline-block">
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

type PolymorphicTag = ComponentType<{
  ref?: Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
}>;

function warnIfLong(count: number, text: string): void {
  if (process.env.NODE_ENV === "production" || count <= 14) return;
  console.warn(
    `[motion] SplitWords got ${count} words. This is a statement beat, not a paragraph. Long strings stagger past a second and read as a loading state: ${text.slice(0, 60)}`,
  );
}
