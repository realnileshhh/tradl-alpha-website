"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Segmented control.
 *
 * The tab is ported from Tradl Design System / Components - Backtesting.
 * Figma node 124:74, read 30 Aug 2026:
 *   padding 10px · radius/md 8px · text-sm 12/16 medium
 *   active   color/grey-750 fill, text/primary
 *   hover    color/grey-750-20 fill, text/primary
 *   inactive no fill, text/muted
 *
 * The thumb carries no stroke of its own. Two concentric hairlines four pixels
 * apart read as a seam at the rounded caps, where both curves are visible at
 * once: one ring, one lit fill.
 *
 * The track around it is ours, and the light runs the way the reference does:
 * the track is a hairline ring with no fill, so the page shows through it, and
 * the thumb is the only lit surface in the control. Filling the track and
 * darkening the thumb, which is what this did first, inverts the depth cue and
 * makes the selected segment read as a hole rather than as a key.
 *
 * Selection moves with `transform`, never `left` or `width`. Animating either
 * of those runs layout on every frame of the transition; a transform runs on
 * the compositor and costs nothing.
 *
 * THE TRACK IS A GRID, and that is what makes the thumb land exactly. It was an
 * absolutely positioned thumb sized with `calc((100% - padding) / n)`, which
 * needs the percentage to resolve against the same box the padding was
 * subtracted from. It does not: a percentage width on an absolutely positioned
 * child resolves against the containing block's padding box, so the thumb came
 * out a pixel and a bit narrow per segment and the error compounded across the
 * row. On the last segment it left an 18px gap at the cap against 5px at the
 * top and bottom, which is exactly the pinched corner that gets reported as a
 * radius bug. With equal grid columns the thumb is one column wide by
 * definition and `translateX(index * 100%)` lands on a column boundary, whatever
 * the track's width, padding or border happen to be.
 */

type Option = {
  value: string;
  label: string;
  /** A second line under the label. Used for counts, e.g. "5 tools". */
  hint?: string;
};

/**
 * MARKETING EXTENSION, not from Figma. The ported control is a 12px tab for a
 * dense product toolbar; `lg` is the marketing size, tall enough to carry a
 * count under the label and to clear the 44px touch floor in doc 04 §7.
 */
type Size = "sm" | "lg";

const SIZE: Record<Size, string> = {
  sm: "px-[var(--ds-space-4)] py-[var(--ds-space-1)]",
  /* 8px of padding, not 12: with a label and a count stacked inside it, the
     control was carrying four vertical measurements (padding, label leading,
     gap, hint leading) and reading as a toolbar rather than as a control. The
     leadings below are set explicitly for the same reason, so the height is a
     number someone chose rather than the sum of four defaults. The label box
     still lands at 45px, which clears the 44px touch floor in doc 04 §7. */
  lg: "px-[var(--ds-space-5)] py-[var(--ds-space-3)]",
};

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  size = "sm",
  className,
  label,
}: {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: Size;
  className?: string;
  /** Accessible name for the group. */
  label: string;
}) {
  const name = useId();
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? "");
  const active = value ?? internal;
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === active)
  );

  const select = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "relative inline-grid items-center rounded-full p-[var(--ds-space-2)]",
        "border border-line-2",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {/* The thumb. Absolutely positioned and translated, so the buttons below
          never reflow. aria-hidden: the radios carry the state. */}
      <div
        aria-hidden="true"
        className="pointer-events-none col-start-1 row-start-1 size-full rounded-full bg-surface shadow-chrome"
        style={{
          transform: `translateX(${index * 100}%)`,
          transition: `transform var(--motion-chrome) var(--motion-ease)`,
        }}
      />

      {options.map((option, position) => {
        const isActive = option.value === active;
        return (
          <label
            key={option.value}
            style={{ gridColumnStart: position + 1, gridRowStart: 1 }}
            className={cn(
              "relative z-10 cursor-pointer select-none whitespace-nowrap",
              SIZE[size],
              "rounded-full text-center text-sm font-medium",
              "transition-colors duration-[var(--motion-chrome)] ease-house",
              isActive ? "text-fg" : "text-fg-muted hover:text-fg"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isActive}
              onChange={() => select(option.value)}
              className="sr-only"
            />
            {option.hint ? (
              <span className="block leading-[16px] tracking-[0.14em] uppercase">{option.label}</span>
            ) : (
              option.label
            )}
            {option.hint ? (
              <span
                className={cn(
                  "mt-[var(--ds-space-1)] block text-xs leading-[14px] font-normal transition-colors duration-[var(--motion-chrome)] ease-house",
                  isActive ? "text-fg-3" : "text-fg-disabled"
                )}
              >
                {option.hint}
              </span>
            ) : null}
          </label>
        );
      })}
    </div>
  );
}
