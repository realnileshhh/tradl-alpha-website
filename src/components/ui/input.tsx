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

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /** Rendered at the trailing edge, typically a submit affordance. */
  action?: ReactNode;
  containerClassName?: string;
};

export function Input({ action, className, containerClassName, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "flex w-full max-w-[824px] items-center justify-between gap-[var(--ds-space-3)]",
        "rounded-input border border-transparent bg-elevated p-[var(--ds-padding-card)]",
        "shadow-glass",
        // Focus lands on the inner control, so the visible ring is drawn here.
        "transition-shadow duration-[var(--motion-chrome)] ease-house",
        "focus-within:shadow-[var(--focus-ring),var(--ds-shadow-glass-surface)]",
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
