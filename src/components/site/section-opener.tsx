import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * The section anatomy, doc 05 §2 W0 item 3: eyebrow, one-line headline, one
 * sentence of dek. Every section below the hero opens with one, which is what
 * gives the page a rhythm a reader can navigate by.
 *
 * THE EYEBROW IS A RULE, not a chip. A pill would be a second badge competing
 * with the doctrine badge in the hero; a hairline that brightens where the
 * words sit says "a new argument starts here" without adding another object to
 * the page.
 *
 * The rule stops at the measure, and that is a correction rather than a
 * default: run edge to edge it stops being a rule under a heading and becomes a
 * divider between two halves of the page, which is a different and much louder
 * claim. Ending it where the content ends keeps it attached to the section it
 * opens, and the gradient fades to nothing before either end so the stop is
 * never a visible cut.
 *
 * No glyph beside the label. The ◈ is the brief's mark for AI-derived content
 * and it earns its place in the hero's doctrine badge; repeated on every section
 * opener it stops marking anything and becomes a bullet.
 *
 * Register: statement, so the whole opener enters as one group on the house
 * curve. It is a <Reveal>, not a <SplitWords>, because the headline carries an
 * accent word and SplitWords takes plain text only. The word-by-word variant is
 * still unspent on this page, which is the right place for it to stay until a
 * section needs it more than this one does.
 */
export function SectionOpener({
  eyebrow,
  title,
  dek,
  className,
}: {
  eyebrow: string;
  /** Markup, so a word can carry the accent. */
  title: ReactNode;
  /** One sentence. Set wide enough to hold on one line at the measure. */
  dek?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="px-[var(--content-gutter)]">
        <div className="relative mx-auto flex max-w-content items-center gap-[var(--ds-space-5)]">
          {/* The bloom belongs to the rule, so it is positioned against the rule's
              own row. Hung on the opener as a whole it centred itself on the
              opener's box, which includes the headline and the dek, and the
              glow drifted down behind the type where it read as a stain. */}
          <span aria-hidden="true" className="section-rule-glow" />

          <span aria-hidden="true" className="section-rule min-w-0 flex-1" />

          <span className="shrink-0 text-xs tracking-[0.18em] text-accent-2 uppercase">
            {eyebrow}
          </span>

          <span aria-hidden="true" className="section-rule-end min-w-0 flex-1" />
        </div>
      </div>

      <Reveal register="statement" stagger className="px-[var(--content-gutter)]">
        <h2 className="mx-auto mt-[var(--ds-space-7)] max-w-[20ch] text-center text-display font-medium tracking-[var(--section-tracking)] text-balance text-fg">
          {title}
        </h2>

        {dek ? (
          <p className="mx-auto mt-[var(--ds-space-5)] max-w-[84ch] text-center text-lg leading-[var(--dek-line)] text-pretty text-fg-2">
            {dek}
          </p>
        ) : null}
      </Reveal>
    </div>
  );
}
