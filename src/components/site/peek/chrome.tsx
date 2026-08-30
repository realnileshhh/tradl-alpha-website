import type { CSSProperties, ReactNode } from "react";
import type { Dir } from "@/lib/peek-data";
import { cn } from "@/lib/utils";

/**
 * The shared parts every sneak peek surface is built from.
 *
 * These are miniatures of product screens, so they run at the product's
 * density: `text-xs` is 10px in this design system and `text-sm` is 12px, which
 * is what a ledger row is drawn at in Figma. Nothing here invents a size, a
 * colour or a radius; every value is a `--ds-*` token reached through the
 * utilities globals.css maps.
 *
 * They are server components with no interactivity of any kind. That is
 * deliberate: the carousel is a client component, and passing these in as
 * rendered children keeps four dense screens' worth of markup out of the
 * JavaScript bundle entirely.
 *
 * WHY THE SURFACE FILL RUNS THE OTHER WAY FROM THE EARLIER BUILD. There, the
 * inner cards were darker than the window. Here they are lighter, because
 * docs/SURFACES.md says a surface is a translucent pane lit from above: on this
 * site depth reads upward. A tile carries the fill, the hairline and the
 * specular, exactly as every other surface on the page does.
 */

/* -----------------------------------------------------------------------------
   Type. Three sizes, and the whole miniature is built from them.
   -------------------------------------------------------------------------- */

/** Column heads, card eyebrows, anything uppercase. 10px, tracked. */
export const MICRO = "text-xs leading-[1.3] tracking-[0.1em] text-fg-3 uppercase";
/** Table cells and secondary copy. 10px, untracked. */
export const CELL = "text-xs leading-[1.3] text-fg-2";
/** Row identity: a symbol, a screen name, a sector. 12px. */
export const NAME = "text-sm leading-[1.3] font-medium text-fg";

/* -----------------------------------------------------------------------------
   Surfaces
   -------------------------------------------------------------------------- */

/** The card every surface repeats: fill, hairline, specular, concentric radius. */
export function Tile({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-line bg-surface shadow-spec",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/** The label a tile wears, with an optional right-hand note. */
export function TileLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-[var(--ds-space-4)]">
      <span className={cn(MICRO, "min-w-0 truncate")}>{children}</span>
      {right}
    </div>
  );
}

/**
 * A signed move.
 *
 * The glyph travels with the hue, always. Doc 04 §7 and the accessibility floor
 * both refuse colour as the only carrier of meaning, and a red number and a
 * green number are the same number to a reader who cannot separate them.
 */
export function Delta({ v, dir, className }: { v: string; dir: Dir; className?: string }) {
  return (
    <span
      className={cn(
        "num whitespace-nowrap",
        dir === "up" ? "text-accent-2" : "text-negative",
        className,
      )}
    >
      <span aria-hidden="true">{dir === "up" ? "▲" : "▼"}</span> {v}
    </span>
  );
}

/** The round tile a symbol wears in the product, initials only. */
export function SymbolTile({ sym, stacked }: { sym: string; stacked?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-[18px] shrink-0 place-items-center rounded-full bg-raised text-[8px] leading-none font-medium text-fg-3",
        /* A stacked tile's ring is the card it sits on, resolved rather than
           layered: the tile fill is a white overlay, so a ring painted in the
           page ground would read as a dark hole between two heads. */
        stacked
          ? "border-2 [border-color:color-mix(in_srgb,var(--ds-color-white)_6%,var(--page-ground))]"
          : "border border-line",
      )}
    >
      {/* One letter when the tiles overlap, two when they stand alone. At
          18px with two thirds of the circle covered, a second letter is a
          smudge rather than information, and the names are in the list a
          screen reader gets either way. */}
      {sym.slice(0, stacked ? 1 : 2)}
    </span>
  );
}

/**
 * A sparkline. Drawn from the series rather than hand-plotted, so the line and
 * the direction it is coloured with cannot disagree.
 *
 * `preserveAspectRatio="none"` plus `vectorEffect="non-scaling-stroke"` is what
 * lets one path stretch to any card width and keep a 2px stroke.
 */
export function Spark({ series, dir, id }: { series: readonly number[]; dir: Dir; id: string }) {
  const W = 120;
  const H = 30;
  const PAD = 2.5;

  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const last = Math.max(1, series.length - 1);

  const pts = series.map((v, i) => ({
    x: (i / last) * W,
    y: H - PAD - ((v - min) / span) * (H - PAD * 2),
  }));

  const line = pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const area =
    `M 0 ${H} ` + pts.map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + ` L ${W} ${H} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-[22px] w-full", dir === "up" ? "text-accent-2" : "text-negative")}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The padding every surface's body runs at, so the four agree edge to edge. */
export const SURFACE_BODY = "flex h-full min-h-0 flex-col gap-[var(--ds-space-4)] p-[var(--ds-space-5)]";

/**
 * Wrap a computed figure in the staging braces.
 *
 * Numbers that a surface computes (a row's profit, a win rate) cannot be stored
 * pre-braced, because the arithmetic needs them as numbers. They get their
 * braces here instead, so nothing reaches the screen unmarked.
 */
export const staged = (v: string | number) => `{${v}}`;
