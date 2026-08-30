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
 * The caret positions against the chip, so a chip that uses `arrow` has to be
 * positioned itself: place it absolutely, as the nav notice does, or pass
 * `relative`. The base deliberately does NOT set `relative` for you. Tailwind
 * emits `.relative` after `.absolute`, so a base `relative` would beat an
 * `absolute` passed in through className and drop the chip back into the flow,
 * which is a silent layout bug rather than a visible one.
 */
const CARET_TONE: Record<TooltipTone, string> = {
  default: "border-line [background-color:var(--ds-color-grey-750)]",
  accent: `border-line-2 ${ACCENT_FILL}`,
};

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
      {arrow ? (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-[4px] left-1/2 size-[7px]",
            "-translate-x-1/2 rotate-45 rounded-tl-[2px] border-t border-l",
            CARET_TONE[tone]
          )}
        />
      ) : null}
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
