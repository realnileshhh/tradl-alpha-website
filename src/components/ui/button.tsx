import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Button, ported from Tradl Design System / Components - General / CTAs.
 *
 * Figma nodes: Primary Buttons 63:201, Secondary button 357:2566,
 * Tertiary button 359:2583. Read 30 Aug 2026.
 *
 * Measured spec, all three variants:
 *   height 30px · radius/md 8px · px space/3 8px · gap space/2 4px
 *   text-sm 12/16 · icon 14px
 *   primary    accent/gradient fill, 1px accent/primary border, text/primary
 *   secondary  bg/surface fill, 1px border/subtle, text/secondary, regular
 *   tertiary   no fill, 1px border/subtle, text/secondary, regular
 *   disabled   opacity 30 per cent
 *
 * The secondary and tertiary fills are white at six per cent, so they only
 * resolve against a dark ground. The site runs on one, so they work anywhere on
 * it; drop one onto a light fill and it disappears.
 */

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "lg";

/* `press` carries the full transition set and the tap feedback. Do not add a
   Tailwind `transition-*` utility alongside it: the utility replaces the
   property outright and the press would stop animating. */
const BASE =
  "press relative inline-flex items-center justify-center whitespace-nowrap rounded-md " +
  "shadow-spec " +
  "disabled:pointer-events-none disabled:opacity-30 aria-disabled:pointer-events-none aria-disabled:opacity-30";

const VARIANT: Record<Variant, string> = {
  /* The gradient is accent/gradient. get_variable_defs returns an empty string
     for gradient variables, so its stops came from get_design_context on the
     button itself.

     Hover adds a wash over the gradient rather than changing it. Recolouring a
     brand gradient on hover is how a button ends up with two brand greens. */
  primary:
    "hover-wash border text-fg font-medium [background-image:var(--ds-accent-gradient)] [border-color:var(--ds-accent-primary)]",
  /* Hover moves the stroke from the hairline to the visible step. Both are real
     Figma borders, so this is a selection between two tokens, not a new value. */
  secondary: "border border-line bg-surface text-fg-2 hover:border-line-2 hover:text-fg",
  tertiary: "border border-line text-fg-2 hover:border-line-2 hover:text-fg",
};

const SIZE: Record<Size, string> = {
  /* Design-system exact. */
  sm: "h-[30px] gap-[var(--ds-space-2)] px-[var(--ds-space-3)] text-sm",
  /* MARKETING EXTENSION, not from Figma. The design system's only button is
     30px, which is right for a dense product toolbar and below the 44px touch
     floor doc 04 §7 sets for the marketing site. `sm` keeps the real spec and
     recovers the hit area with .touch-target; `lg` is for statement-register
     CTAs where a 30px button would also just look wrong at hero scale. */
  lg: "h-11 gap-[var(--ds-space-2)] px-[var(--ds-space-5)] text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Rendered before the label, at the design system's 14px icon size. */
  iconStart?: ReactNode;
  /** Rendered after the label, at the design system's 14px icon size. */
  iconEnd?: ReactNode;
  children?: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export function Button({
  variant = "primary",
  size = "sm",
  iconStart,
  iconEnd,
  children,
  className,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    BASE,
    VARIANT[variant],
    SIZE[size],
    size === "sm" && "touch-target",
    className
  );

  const content = (
    <>
      {iconStart ? <span className="grid size-[14px] shrink-0 place-items-center">{iconStart}</span> : null}
      {children}
      {iconEnd ? <span className="grid size-[14px] shrink-0 place-items-center">{iconEnd}</span> : null}
    </>
  );

  if (typeof props.href === "string") {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
