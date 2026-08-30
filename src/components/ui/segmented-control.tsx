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
 * The track around it is ours. It uses the three-sided stroke: the bottom
 * border is omitted so the control reads as lit from above and resting on the
 * page, rather than as a floating box.
 *
 * Selection moves with `transform`, never `left` or `width`. Animating either
 * of those runs layout on every frame of the transition; a transform runs on
 * the compositor and costs nothing.
 */

type Option = { value: string; label: string };

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  label,
}: {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
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
        "stroke-top-lit relative inline-flex items-center rounded-full p-[var(--ds-space-1)]",
        "bg-surface",
        className
      )}
    >
      {/* The thumb. Absolutely positioned and translated, so the buttons below
          never reflow. aria-hidden: the radios carry the state. */}
      <div
        aria-hidden="true"
        className="fill-top-lit pointer-events-none absolute inset-y-[var(--ds-space-1)] left-[var(--ds-space-1)] rounded-full shadow-spec"
        style={{
          width: `calc((100% - var(--ds-space-2)) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
          transition: `transform var(--motion-chrome) var(--motion-ease)`,
        }}
      />

      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <label
            key={option.value}
            className={cn(
              "relative z-10 flex-1 cursor-pointer select-none whitespace-nowrap px-[var(--ds-space-4)] py-[var(--ds-space-1)]",
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
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
