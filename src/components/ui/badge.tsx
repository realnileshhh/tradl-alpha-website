import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Badge and StatusPill, ported from Tradl Design System / Components - General /
 * Badges-Tags. Figma node: badge 346:464. Read 30 Aug 2026.
 *
 * Measured spec:
 *   height 14px · px 4px · py 2px · radius/sm 4px
 *   text 8px regular, Highlight 1 (#b067ff) on Highlight 1-12 (the same
 *   colour at 12 per cent)
 *
 * Two notes, neither of them silently smoothed over.
 *
 * 8px type is small. It is the design system's real value and is reproduced
 * exactly, but it is a product-density figure. If a marketing surface needs a
 * status chip a visitor can actually read, that is a design decision to take
 * deliberately, not something to fix here by nudging the number.
 *
 * The tone system is an extension. Figma's Highlights collection holds 11
 * variables and only three were reachable through the MCP, so the LIVE and
 * PREVIEW tints below are derived by applying the same 12-per-cent rule the
 * violet pair demonstrates (#b067ff at 12 per cent is #b067ff1f) to colours
 * that are themselves real tokens. That is a documented derivation, not a new
 * colour, and it is replaced the moment the full collection arrives.
 */

const GEOMETRY =
  "inline-flex h-[14px] shrink-0 items-center rounded-sm px-[var(--ds-space-2)] py-[var(--ds-space-1)] text-[8px] leading-none";

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        GEOMETRY,
        "[background-color:var(--ds-highlight-1-12)] [color:var(--ds-highlight-1)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * The three release states the brief freezes for the tool map
 * (doc 04 §3.3: one normalised pill geometry sitewide).
 *
 * Labels are UPPERCASE per doc 01 §7 and are passed through verbatim rather
 * than title-cased, because "PRIVATE ACCESS" is a frozen name.
 */
const STATUS = {
  live: {
    label: "LIVE",
    /* accent/secondary, the system's green. */
    className:
      "[background-color:color-mix(in_srgb,var(--ds-accent-secondary)_12%,transparent)] [color:var(--ds-accent-secondary)]",
  },
  preview: {
    label: "PREVIEW",
    /* Highlight 5, the system's amber. */
    className:
      "[background-color:color-mix(in_srgb,var(--ds-highlight-5)_12%,transparent)] [color:var(--ds-highlight-5)]",
  },
  private: {
    label: "PRIVATE ACCESS",
    /* Highlight 1 and its real 12-per-cent tint. This tone is not derived. */
    className: "[background-color:var(--ds-highlight-1-12)] [color:var(--ds-highlight-1)]",
  },
} as const;

export type StatusTone = keyof typeof STATUS;

export function StatusPill({
  status,
  className,
  ...props
}: { status: StatusTone } & HTMLAttributes<HTMLSpanElement>) {
  const { label, className: tone } = STATUS[status];
  return (
    <span className={cn(GEOMETRY, tone, className)} {...props}>
      {label}
    </span>
  );
}
