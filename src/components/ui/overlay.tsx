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

   Measured spec: height 14px, px 6, py 2, radius/full, text 8px regular,
   text/primary on a left-to-right gradient from grey-700 to grey-750, with a
   border/subtle hairline.

   Both gradient stops are real primitives, so the fill is mirrored rather than
   approximated.
   -------------------------------------------------------------------------- */

export function Tooltip({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      role="tooltip"
      className={cn(
        "inline-flex h-[14px] shrink-0 items-center whitespace-nowrap rounded-full",
        "border border-line px-[6px] py-[var(--ds-space-1)]",
        "text-[8px] leading-none text-fg",
        "[background-image:linear-gradient(90deg,var(--ds-color-grey-700),var(--ds-color-grey-750))]",
        className
      )}
      {...props}
    >
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
