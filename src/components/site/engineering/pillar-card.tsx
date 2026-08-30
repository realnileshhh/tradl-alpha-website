import type { EngineeringPillar } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * One of the six construction rules.
 *
 * The surface is the house composition and nothing more: the lit fill, the
 * hairline, the specular that comes with `.surface`, and a hover that moves the
 * stroke rather than the fill. What is unusual is the fill being opaque.
 *
 * WHY THE FILL IS OPAQUE. `bg-surface` is white at 6 per cent, which reads as a
 * card because the page behind it is flat. In the orbit these cards sit over a
 * lit 3D model, and 6 per cent white over a turning bull is a window onto a
 * turning bull. So the same composite is built explicitly instead: the page
 * ground as the colour, the surface step and the directional fill as background
 * images over it. The rendered pixel is identical to `.surface .surface-lit` on
 * the ground, and nothing shows through.
 *
 * The code line is the rule as the engine writes it, and it is deliberately not
 * translated into prose: a reader who knows what `bar[t+1].open` means is the
 * reader this section is for, and a reader who does not still gets the sentence
 * underneath.
 *
 * IT IS NOT MONOSPACE. The prototype sets it in ui-monospace and the instinct is
 * right, but there is one family on this site and it is Inter, because that is
 * what every type variable in the live Figma file says (docs/DECISIONS.md 002).
 * Loading a second face for six short strings is not a trade this page can make
 * against doc 04 §5. What it gets instead is `.num`, which is tabular figures,
 * plus the accent colour, and the punctuation does the rest: nothing reading
 * `bars.completed_only()` is mistaken for a sentence.
 */
export function PillarCard({
  pillar,
  orbiting = false,
  slot,
  className,
}: {
  pillar: EngineeringPillar;
  /** Marks the card as owned by the orbit timeline, which pre-hides it. */
  orbiting?: boolean;
  /** Position in the orbit, 0 to 5. Read by CSS to place it in the grid. */
  slot?: number;
  className?: string;
}) {
  return (
    <article
      {...(orbiting ? { "data-orbit-item": "" } : {})}
      {...(slot === undefined ? {} : { "data-slot": slot })}
      className={cn(
        "pillar surface surface-lit surface-interactive p-[var(--ds-padding-card-lg)]",
        className,
      )}
    >
      <p className="num text-xs tracking-[0.02em] text-accent-2">{pillar.code}</p>

      <h3 className="mt-[var(--ds-space-4)] text-base font-medium text-fg">{pillar.title}</h3>

      <p className="mt-[var(--ds-space-3)] text-sm leading-[1.6] text-pretty text-fg-3">
        {pillar.copy}
      </p>
    </article>
  );
}
