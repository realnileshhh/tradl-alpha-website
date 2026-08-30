import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * A keyboard key. NOT from Figma: the design system has no keycap, and the
 * marketing site needs one wherever a shortcut is quoted.
 *
 * Two flavours, and the difference is not decoration.
 *
 * `flat` is inline type furniture. It sits in a sentence, it must not out-shout
 * the words around it, and it is the default.
 *
 * `physical` is an object on the page: five shadow layers that read as a moulded
 * cap. Pressing it collapses the cast shadow to nothing while the inner shading
 * stays, which is what reads as travel rather than as a colour change. Use it
 * where the key is the subject, never inline in a paragraph.
 *
 * The fill on both is a radial anchored to the top edge, so the light source
 * agrees with the specular highlight every other surface uses. A centred radial
 * fights it and reads as a bubble.
 */

type KeycapProps = HTMLAttributes<HTMLElement> & {
  physical?: boolean;
  /** Reflects the pressed state. Drive it from a real key handler, not on hover. */
  pressed?: boolean;
};

export function Keycap({ physical, pressed, className, children, ...props }: KeycapProps) {
  return (
    <kbd
      className={cn(
        "fill-top-lit inline-flex select-none items-center justify-center",
        "h-5 min-w-5 rounded-sm px-[5px]",
        "font-sans text-xs leading-none text-fg-2",
        physical
          ? [
              "border-0",
              "transition-[box-shadow,transform] duration-[var(--motion-press)] ease-press",
              pressed
                ? "translate-y-px shadow-[var(--elevation-key-pressed)]"
                : "shadow-[var(--elevation-key)]",
            ]
          : ["border border-line-2 shadow-spec"],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

/**
 * A sequence of keys. Renders the separator as text so a screen reader says
 * "Command then K" rather than running the two together.
 */
export function KeycapSequence({
  keys,
  physical,
  className,
}: {
  keys: string[];
  physical?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[var(--ds-space-2)]", className)}>
      {keys.map((key, i) => (
        <span key={key} className="inline-flex items-center gap-[var(--ds-space-2)]">
          {i > 0 ? (
            <span className="text-xs text-fg-3" aria-hidden="true">
              +
            </span>
          ) : null}
          <Keycap physical={physical}>{key}</Keycap>
        </span>
      ))}
    </span>
  );
}
