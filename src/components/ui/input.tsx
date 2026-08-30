import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Input, ported from Tradl Design System / Components - General / Patterns.
 * Figma node 326:1388, read 30 Aug 2026.
 *
 * Measured spec:
 *   bg/elevated fill (black at 60 per cent) · radius/input 20px
 *   padding/card 16px · glass/surface drop shadow · max width 824px
 *   placeholder text-md 14/20 regular, text/tertiary
 *   send affordance: accent/gradient fill, radius/container 16px, 24px icon
 *
 * Note the fill direction. Everywhere else on this site a surface is *lighter*
 * than its ground; the input is *darker*. That inversion is how the eye reads
 * "this is a hole you type into, not a plate sitting on top".
 *
 * GAP: Figma applies `border/glass` to this component, which is a gradient
 * variable, and get_variable_defs returns an empty string for gradients. The
 * measured border is therefore transparent here, which is faithful to what
 * could be read rather than a guess at the intended ring. When the stops are
 * recovered, `.ring-gradient` in the surface language is the technique for it.
 */

/**
 * MARKETING EXTENSION, not from Figma, and the same argument as the Button's:
 * radius/input is what the design system draws, `pill` is for a marketing row
 * where the field sits beside a pill CTA and the pair has to read as one
 * control. It is a prop rather than a className because `cn` cannot resolve a
 * radius conflict, so a class passed in would win or lose by emission order.
 */
type Shape = "default" | "pill";

const SHAPE: Record<Shape, string> = {
  default: "rounded-input",
  pill: "rounded-full",
};

/**
 * MARKETING EXTENSION, not from Figma.
 *
 * `well` is the ported spec: bg/elevated, black at 60 per cent, darker than
 * what it sits on. That inversion is how the design system says "this is a hole
 * you type into", and it works on the product's shell, which is lighter than
 * the marketing ground.
 *
 * It does not work here. The site's ground is #07080a, so darkening it further
 * produces a field that is very nearly the page: on the close and hero rows the
 * control read as an absence next to a bright green button, and the placeholder
 * looked like it was floating on the background. `raised` lifts the fill to
 * bg/surface instead, which is the same move every other surface on this site
 * makes, and it takes the placeholder from roughly 3.9:1 to 5.2:1 as a side
 * effect.
 */
type Tone = "well" | "raised";

/**
 * The fill and the shadow travel together, because they are one decision.
 *
 * `well` keeps Figma's pairing: the darker fill plus glass/surface's drop, which
 * is what makes a recessed field read as recessed on the product's shell.
 *
 * `raised` drops the shadow with the inversion. A lifted surface casting a 12px
 * drop onto a near-black page reads as a smudge under the control rather than
 * as depth, and the hairline plus the specular already do that job everywhere
 * else on this site. The focus ring is declared per tone for the same reason:
 * box-shadow replaces wholesale, so a shared focus rule would put the drop back.
 */
const TONE: Record<Tone, string> = {
  well: "field-focus-well bg-elevated shadow-glass",
  raised: "field-focus bg-surface",
};

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /** Rendered at the trailing edge, typically a submit affordance. */
  action?: ReactNode;
  shape?: Shape;
  tone?: Tone;
  containerClassName?: string;
};

export function Input({
  action,
  shape = "default",
  tone = "well",
  className,
  containerClassName,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[824px] items-center justify-between gap-[var(--ds-space-3)]",
        "border border-transparent p-[var(--ds-padding-card)]",
        SHAPE[shape],
        /* Fill, resting shadow and focus ring all come from the tone. The two
           focus classes are defined in globals.css: written inline as an
           arbitrary shadow, the colour function's commas break Tailwind's
           parse and the ring silently does not exist. */
        TONE[tone],
        "transition-shadow duration-[var(--motion-chrome)] ease-house",
        containerClassName
      )}
    >
      <input
        className={cn(
          "min-w-0 flex-1 bg-transparent text-base text-fg outline-none",
          "placeholder:text-fg-3",
          className
        )}
        {...props}
      />
      {action}
    </div>
  );
}

/**
 * The trailing submit affordance. Carries the design system's accent gradient,
 * the same fill as the primary button, so the two read as one action language.
 */
export function InputAction({
  label,
  icon,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string; icon: ReactNode }) {
  return (
    <button
      type="submit"
      aria-label={label}
      className={cn(
        "press grid shrink-0 place-items-center rounded-container p-[var(--ds-space-2)]",
        "[background-image:var(--ds-accent-gradient)]",
        "disabled:pointer-events-none disabled:opacity-30",
        className
      )}
      {...props}
    >
      <span className="grid size-6 place-items-center text-fg">{icon}</span>
    </button>
  );
}
