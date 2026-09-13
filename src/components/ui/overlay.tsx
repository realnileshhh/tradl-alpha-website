import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Things that float above the page: tooltips, popovers, toasts.
 *
 * Tooltip is ported from Figma. Popover and Toast are ours, built from the
 * surface language, because the design system has no component for either.
 *
 * All three share one rule: the blur does the edge work. A popover with a heavy
 * border and a heavy shadow reads as a box sitting on the page; one with a deep
 * blur and a soft shadow underneath reads as floating above it.
 */

/* -----------------------------------------------------------------------------
   Tooltip. Figma node 371:572, read 30 Aug 2026.

   Measured spec, and it is what `size="sm"` renders: height 14px, px 6, py 2,
   radius/full, text 8px regular, text/primary on a left-to-right gradient from
   grey-700 to grey-750, with a border/subtle hairline.

   Both gradient stops are real primitives, so the fill is mirrored rather than
   approximated.

   MARKETING EXTENSION, not from Figma: `size="lg"`, `tone="accent"` and
   `arrow`. The same argument as the Button's `lg` size, which is the precedent
   this follows. The design system's tooltip is a product-density label at 8px
   on a light grey pill; against a 56px nav bar it is unreadable, and a green
   status note on a grey-700 fill fails contrast outright.

   `lg` keeps the geometry and moves only the scale. `accent` fills with the
   page ground rather than the grey gradient, so the chip reads as a hole cut in
   the page with a hairline around it and the accent green has a dark ground to
   sit on; the stroke steps up to border/default to carry the edge on its own,
   since the fill no longer separates it from the page. `arrow` adds the caret
   that ties the chip to the control above it.

   All of it composes real tokens. The 8px default is untouched and stays the
   Figma truth.
   -------------------------------------------------------------------------- */

type TooltipSize = "sm" | "lg";
type TooltipTone = "default" | "accent";

const TOOLTIP_SIZE: Record<TooltipSize, string> = {
  sm: "h-[14px] px-[6px] py-[var(--ds-space-1)] text-[8px]",
  lg: "h-[22px] px-[var(--ds-space-4)] text-xs tracking-[0.14em]",
};

/**
 * The accent chip's fill: bg/surface resolved against the page ground rather
 * than layered over it.
 *
 * It has to be opaque, and that is the whole reason for the color-mix. The
 * caret is a second element whose hidden half sits under the chip, so with a
 * translucent fill the overlap paints the alpha twice and a brighter wedge
 * shows through the chip's top edge. Mixing the same white at the same 6 per
 * cent into the ground gives the exact colour bg/surface produces here, with no
 * alpha left to double.
 *
 * No new colour: the white is a real primitive and the ground is ours, and the
 * mix is the composite the browser would have computed anyway.
 */
const ACCENT_FILL =
  "[background-color:color-mix(in_srgb,var(--ds-color-white)_6%,var(--page-ground))]";

/** The same resolved colour as an SVG paint, for the caret. */
const ACCENT_CARET_FILL =
  "fill-[color-mix(in_srgb,var(--ds-color-white)_6%,var(--page-ground))]";

const TOOLTIP_TONE: Record<TooltipTone, string> = {
  default:
    "border-line text-fg [background-image:linear-gradient(90deg,var(--ds-color-grey-700),var(--ds-color-grey-750))]",
  /* accent/secondary on a surface step above the ground. The menu shadow rather
     than the card specular, because this floats clear of the surface it belongs
     to. */
  accent: `border-line-2 text-accent-2 shadow-menu ${ACCENT_FILL}`,
};

/**
 * The caret, as a rotated square rather than a border triangle.
 *
 * A border triangle cannot carry a hairline: it IS the fill, so the stroke that
 * runs around the chip stops dead where the caret starts. A square rotated 45
 * degrees with two of its four borders drawn continues the outline around the
 * point, and its far half is hidden behind the chip.
 *
 * It repeats the tone's fill rather than inheriting it, because the default
 * tone paints with a gradient and `background-color: inherit` would leave the
 * caret transparent. The default caret takes the gradient's right-hand stop,
 * which is the value the gradient is nearest at the centre of the chip.
 *
 * `arrow` positions the caret against the CHIP, which is right whenever the
 * chip is centred on what it describes. Where it is not, render <TooltipCaret>
 * yourself as a sibling of the chip inside the control's own positioning
 * context, and leave `arrow` off. The nav notice does exactly that: its chip is
 * right-aligned so it cannot leave the viewport, and the caret still has to
 * land on the middle of the button.
 *
 * A SIBLING CARET MUST COME AFTER THE CHIP IN THE MARKUP. Neither carries a
 * z-index, so paint order is document order, and the caret's job is to cover
 * the chip's top border where the two overlap: that hidden half is what makes
 * one outline run around the point instead of a hairline running across its
 * base. Rendered before the chip it is painted over, and the chip's own border
 * draws straight through the caret. As `arrow` the caret is a child and paints
 * after its parent's background and border for free, which is why the bug only
 * exists for the sibling form.
 *
 * HOW FAR IT OVERLAPS IS GEOMETRY, NOT TASTE. See CARET_OVERLAP below.
 *
 * A chip that uses `arrow` has to be positioned itself: place it absolutely, as
 * the nav notice does, or pass `relative`. The base deliberately does NOT set
 * `relative` for you. Tailwind emits `.relative` after `.absolute`, so a base
 * `relative` would beat an `absolute` passed in through className and drop the
 * chip back into the flow, which is a silent layout bug rather than a visible
 * one.
 */
const CARET_TONE: Record<TooltipTone, string> = {
  default: "fill-[var(--ds-color-grey-750)] stroke-[var(--ds-border-subtle)]",
  accent: `stroke-[var(--ds-border-default)] ${ACCENT_CARET_FILL}`,
};

/* -----------------------------------------------------------------------------
   The caret's geometry, and every number in it is doing a job.

   It was a 7px square turned 45 degrees with two of its four borders drawn, and
   that construction cannot join a chip cleanly. The square's stroked facets run
   its whole length, so wherever the chip's border crosses them the stroke keeps
   going underneath into the chip: two short stubs descending from the base of
   the arrow. Pull the square up until the stubs are gone and the shoulders come
   out above the chip, the border crosses the two BARE facets instead, and the
   outline breaks the other way. There is no offset that does both, because one
   shape cannot stop its stroke at the boundary while its fill carries on past
   it, and that is exactly what a seamless join requires.

   So it is drawn instead, as two paths in one SVG:

     the skirt   filled, not stroked, and it continues 2px BELOW the chip's top
                 edge. This is what covers the chip's own border across the base
                 of the arrow, which is what removes the line through it.
     the chevron stroked, not filled, and it STOPS on that edge. Its two ends
                 land exactly where the chip's border arrives from either side,
                 so the three strokes read as one line turning a corner.

   The viewBox is in CSS pixels, so the numbers below are the picture: an 11 wide
   box, the base at y=6, the apex at y=1, the skirt to y=8. Five across and five
   up is the same 45 degrees the rotated square drew, and a 5px rise is the
   weight the old caret had before any of this was corrected.

   Half-pixel inset on x and y: a 1px stroke centres on the path, so a path on
   a whole pixel straddles two device pixels and renders as a soft 2px line.
   ----------------------------------------------------------------------------- */

const CARET_WIDTH = 11;
const CARET_HEIGHT = 8;
/** Where the chip's top edge falls inside the box. */
const CARET_BASE = 6;
const CARET_APEX = 1;
const CARET_INSET = 0.5;

const CARET_CHEVRON = `M${CARET_INSET} ${CARET_BASE} L${CARET_WIDTH / 2} ${CARET_APEX} L${
  CARET_WIDTH - CARET_INSET
} ${CARET_BASE}`;

const CARET_SKIRT = `${CARET_CHEVRON} L${CARET_WIDTH - CARET_INSET} ${CARET_HEIGHT} L${CARET_INSET} ${CARET_HEIGHT} Z`;

/**
 * How far the caret's box sits above the chip's top edge.
 *
 * Derived, not chosen: the base line is at y=6 in a box that is 8 tall, so
 * hanging the box 6px above the chip puts that line exactly on the chip's top
 * edge and leaves the skirt 2px inside it.
 *
 * Written out rather than built from CARET_BASE, because Tailwind reads source
 * as text: a class assembled in a template literal is one it never sees, and
 * the utility is silently never emitted. Keep the two in step by hand.
 */
const CARET_OVERLAP = "-top-[6px]";

/**
 * The caret on its own, for a chip that is not centred on its control.
 *
 * Carries no position of its own beyond `absolute`: the caller places it,
 * because the whole reason to reach for this rather than `arrow` is that the
 * caret and the chip need different anchors.
 */
export function TooltipCaret({
  tone = "default",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: TooltipTone }) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      {...props}
    >
      <svg
        width={CARET_WIDTH}
        height={CARET_HEIGHT}
        viewBox={`0 0 ${CARET_WIDTH} ${CARET_HEIGHT}`}
        className={cn("block", CARET_TONE[tone])}
      >
        {/* Fill first, stroke over it: the chevron's line has to sit on top of
            the skirt's edge rather than under it.

            Square caps, not butt. A butt cap ends the stroke square across its
            own direction, which at 45 degrees leaves a tiny wedge unpainted
            where it meets the chip's horizontal border: two dark specks at the
            base corners, visible at 8x and faintly at 1x. A square cap carries
            the stroke half its width further along, which fills the wedge and
            costs a third of a pixel below a line the border already occupies. */}
        <path d={CARET_SKIRT} stroke="none" />
        <path
          d={CARET_CHEVRON}
          fill="none"
          strokeWidth={1}
          strokeLinejoin="round"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

export function Tooltip({
  size = "sm",
  tone = "default",
  arrow = false,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  size?: TooltipSize;
  tone?: TooltipTone;
  /** Draws an upward caret, for a tooltip that hangs below the control it describes. */
  arrow?: boolean;
}) {
  return (
    <span
      role="tooltip"
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full",
        "border leading-none",
        TOOLTIP_SIZE[size],
        TOOLTIP_TONE[tone],
        className
      )}
      {...props}
    >
      {arrow ? <TooltipCaret tone={tone} className={`${CARET_OVERLAP} left-1/2 -translate-x-1/2`} /> : null}
      {children}
    </span>
  );
}

/* -----------------------------------------------------------------------------
   Popover. Not from Figma.

   No border at all, on purpose. At this blur depth a stroke reads as a seam;
   the fill and the shadow define the edge on their own.

   The shadow has a negative spread, which pulls it under the element instead of
   haloing it. That is the difference between a menu that floats and one that
   glows.
   -------------------------------------------------------------------------- */

export function Popover({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-base bg-raised p-[var(--ds-padding-card-lg)]",
        "shadow-menu backdrop-blur-menu [transform:translate(0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -----------------------------------------------------------------------------
   Toast. Not from Figma.

   The one surface that is lighter than what it sits on. A toast is transient
   and has to be found instantly, so it inverts the usual relationship rather
   than competing with the page on the page's own terms.
   -------------------------------------------------------------------------- */

export function Toast({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-[var(--ds-space-3)]",
        "rounded-input px-[var(--ds-space-5)]",
        "[background-color:var(--ds-color-white-10)]",
        "text-sm font-medium text-fg",
        "shadow-menu backdrop-blur-menu [transform:translate(0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
