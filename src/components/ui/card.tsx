import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card, ported from Tradl Design System / Components - Tradl Guide.
 *
 * Figma node: Cards 409:1316. Read 30 Aug 2026.
 *
 * Measured spec:
 *   bg/surface fill · 1px border/subtle · radius/md 8px
 *   padding 16px (Figma reports 17, which is padding/card 16 plus the border)
 *   gap 12px (space/4)
 *   icon block 64px
 *   title  text-lg 18/24 medium, accent/secondary
 *   body   text-md 14/20 regular, text/primary
 *   action text-sm 12/16 medium, accent/secondary, with a 14px arrow
 *
 * The fill is white at six per cent, an overlay with no ground of its own, so
 * it only resolves against the dark page ground.
 *
 * Composed rather than monolithic. The Figma card is one arrangement of these
 * parts; the marketing site needs others (no icon, a record line instead of a
 * body, a ledger in place of the action), and a single fixed component would
 * be reimplemented the first time one of those appears.
 */

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col items-start rounded-md border border-line bg-surface",
        "gap-[var(--ds-space-4)] p-[var(--ds-padding-card)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** The 64px illustrative block at the top of the Figma card. */
export function CardIcon({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid size-16 shrink-0 place-items-center", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  as: As = "h3",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <As className={cn("text-lg font-medium text-accent-2", className)} {...props}>
      {children}
    </As>
  );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-base text-fg", className)} {...props}>
      {children}
    </p>
  );
}

/**
 * The card's trailing link. Text only, in the accent, with a trailing icon:
 * in Figma this is a Primary Buttons instance stripped of its fill, so it is
 * modelled here as its own thing rather than as a Button variant.
 */
export function CardAction({
  href,
  icon,
  className,
  children,
}: {
  href: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "touch-target inline-flex items-center gap-[var(--ds-space-2)]",
        "text-sm font-medium text-accent-2",
        className
      )}
    >
      {children}
      {icon ? <span className="grid size-[14px] shrink-0 place-items-center">{icon}</span> : null}
    </a>
  );
}
