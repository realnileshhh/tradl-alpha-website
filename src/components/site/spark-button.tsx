import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";
import { IconArrowPointRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * The hero's secondary CTA: an outlined pill with a light that travels its
 * edge once, rests, and goes again.
 *
 * Not a Button variant, and that is deliberate. The design system's button is a
 * 30px control with an 8px radius, and every variant of it is a fill decision.
 * This is a different object: hero scale, pill geometry, and its whole identity
 * is an animated edge. Bolting a fourth variant onto Button would mean the
 * component that ships in product toolbars carries a marketing animation it can
 * never use. See docs/SURFACES.md on picking a stack rather than an atom.
 *
 * What it does NOT do: change its fill on hover. Hover moves the stroke from
 * the hairline to the visible step and nudges the arrow, which is the same
 * hover language every other surface on the site speaks. The travelling light
 * is ambient and runs whether or not anyone is pointing at it, because its job
 * is to be noticed before the pointer arrives.
 *
 * The ring is two dashed strokes on the same rounded rectangle, a head and a
 * tail, travelling together. The whole argument for why it is an SVG stroke
 * rather than a rotating gradient, and where it starts and stops, is in the
 * SPARK RING block in globals.css.
 *
 * `rx="22"` is half of h-11, which is what makes the rect trace exactly the
 * pill the border draws. It is tied to the height on purpose: change the height
 * and this has to change with it, and a wrong value here shows up immediately
 * as a light that cuts the corners.
 */

/**
 * The comet, as a train of dashes rather than one dash with a tail.
 *
 * A single long dash cannot fade: a stroke is one colour end to end, and an SVG
 * gradient is defined in the element's own coordinate space rather than along
 * the path, so it cannot follow an edge round a corner. The first version was
 * exactly that, a bright bar with a hard stop at both ends, which read as a
 * loading indicator.
 *
 * So the tail is drawn as separate short segments laid nose to tail behind the
 * head, each one dimmer and thinner than the one in front. Every segment runs
 * the same animation, so the whole train travels as one object, and the halo on
 * the group blurs the joins into a continuous falloff.
 *
 * The numbers: pathLength is normalised to 100, the head sits at 45 (the middle
 * of the bottom-right corner arc), and each of the ten segments is 2.5 units
 * long, so the whole comet is 25 units, about a quarter of the edge. Ten short
 * pieces rather than seven longer ones because the joins are what you see when
 * it moves slowly, and more pieces means a finer falloff.
 */
const SEGMENT_LENGTH = 2.5;
const HEAD_AT = 45;

const SEGMENTS = [1, 0.82, 0.66, 0.52, 0.4, 0.3, 0.22, 0.15, 0.1, 0.05].map((opacity, index) => ({
  /* Negative because a dash offset counts backwards along the path: -45 puts
     the dash's leading edge at 45. Each segment starts one length earlier. */
  from: -(HEAD_AT - index * SEGMENT_LENGTH),
  opacity,
  /* 1.6 at the head down to 0.5 at the tip, so the comet thins as it fades. */
  width: Number((1.6 - index * 0.12).toFixed(2)),
}))
  /* Dimmest first: the head has to paint over the tail, not under it. */
  .reverse();
export function SparkButton({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; href: string }) {
  return (
    <a
      className={cn(
        "spark-ring press group inline-flex h-11 items-center gap-[var(--ds-space-3)]",
        "rounded-full border border-line px-[var(--ds-space-6)]",
        "text-base text-fg hover:border-line-2",
        className
      )}
      {...props}
    >
      <svg className="spark-ring-track" aria-hidden="true" focusable="false">
        {SEGMENTS.map((segment) => (
          <rect
            key={segment.from}
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="22"
            pathLength="100"
            strokeDasharray={`${SEGMENT_LENGTH} ${100 - SEGMENT_LENGTH}`}
            strokeWidth={segment.width}
            style={
              {
                "--spark-from": segment.from,
                "--spark-to": segment.from - 100,
                "--spark-opacity": segment.opacity,
              } as CSSProperties
            }
          />
        ))}
      </svg>

      {children}
      <span className="grid size-[14px] shrink-0 place-items-center text-fg-2 transition-[translate] duration-[var(--motion-chrome)] ease-house group-hover:translate-x-[var(--ds-space-1)] group-hover:text-fg">
        <IconArrowPointRight />
      </span>
    </a>
  );
}
