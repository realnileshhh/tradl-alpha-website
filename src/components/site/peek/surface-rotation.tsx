import { ROTATION, ROTATION_SECTORS, type Quadrant } from "@/lib/peek-data";
import { cn } from "@/lib/utils";
import { CELL, MICRO, SURFACE_BODY, Tile, TileLabel } from "./chrome";

/**
 * 04 · SECTOR ROTATION.
 *
 * Relative strength across, momentum up, both centred on 100, with a six-week
 * tail behind every head. The tail is the surface's whole point: where a sector
 * is going is a different fact from where it sits, and a scatter of dots cannot
 * say it. Nothing animates; the direction is drawn.
 *
 * FOUR HUES, ALL OF THEM TOKENS. The design system has exactly four colours
 * that can carry a category here (the accent green, the violet and amber
 * highlights, the negative red), which happens to be the number of quadrants.
 * They are assigned by meaning rather than by taste: green leads, red lags, and
 * the two in between are the two transitions.
 *
 * Colour is never the only carrier. The plot names its quadrants in the
 * corners, and every row in the table beside it states its quadrant in a word.
 */

const QUADRANT_HUE: Record<Quadrant, string> = {
  Leading: "var(--ds-accent-secondary)",
  Improving: "var(--ds-highlight-1)",
  Weakening: "var(--ds-highlight-5)",
  Lagging: "var(--ds-accent-negative)",
};

/** Which corner each quadrant owns, which is fixed by the axes, not by design. */
const QUADRANT_CORNER: Record<Quadrant, string> = {
  Leading: "top-[var(--ds-space-3)] right-[var(--ds-space-4)]",
  Improving: "top-[var(--ds-space-3)] left-[var(--ds-space-4)]",
  Weakening: "bottom-[var(--ds-space-3)] right-[var(--ds-space-4)]",
  Lagging: "bottom-[var(--ds-space-3)] left-[var(--ds-space-4)]",
};

const ORDER: Quadrant[] = ["Leading", "Improving", "Weakening", "Lagging"];

const W = 640;
const H = 520;
const PAD_X = 30;
const PAD_Y = 22;
const CENTRE = 100;
const REACH = 1.12;
/* The washes are painted well outside the box so their falloff never shows an
   edge inside it. */
const BLEED = 400;

const samples = ROTATION_SECTORS.flatMap((s) => [[s.rs, s.mom] as const, ...s.tail]);
const reachX = Math.max(...samples.map(([r]) => Math.abs(r - CENTRE))) * REACH;
const reachY = Math.max(...samples.map(([, m]) => Math.abs(m - CENTRE))) * REACH;

const x = (rs: number) => W / 2 + ((rs - CENTRE) / reachX) * (W / 2 - PAD_X);
const y = (mom: number) => H / 2 - ((mom - CENTRE) / reachY) * (H / 2 - PAD_Y);

/** The sector furthest into Leading. It gets the ring and the only label. */
const STRONGEST = ROTATION_SECTORS.filter((s) => s.quadrant === "Leading").reduce(
  (a, b) => (Math.hypot(b.rs - CENTRE, b.mom - CENTRE) > Math.hypot(a.rs - CENTRE, a.mom - CENTRE) ? b : a),
  ROTATION_SECTORS[0]!,
);

function QuadrantPill({ q }: { q: Quadrant }) {
  return (
    <span
      className={cn(CELL, "inline-flex items-center gap-[var(--ds-space-2)] whitespace-nowrap")}
      style={{ color: QUADRANT_HUE[q] }}
    >
      <i aria-hidden="true" className="block size-[5px] shrink-0 rounded-full" style={{ backgroundColor: QUADRANT_HUE[q] }} />
      {q}
    </span>
  );
}

/**
 * The tail length control, as a picture of one. The product lets a reader drag
 * this; here it sits at six weeks, which is the tail the plot behind it draws.
 * Nothing about it is operable, so it says nothing to a screen reader beyond
 * the length itself.
 */
function TailControl() {
  const [first, current, last] = ROTATION.tailScale;
  return (
    <span className="flex items-center gap-[var(--ds-space-3)] rounded-full border border-line bg-surface py-[5px] pr-[var(--ds-space-4)] pl-[var(--ds-space-4)] shadow-spec">
      <span className={cn(CELL, "whitespace-nowrap text-fg-2")}>{current} tail</span>
      <span aria-hidden="true" className="flex items-center gap-[var(--ds-space-2)]">
        <span className={cn(CELL, "num text-fg-disabled")}>{first}</span>
        <span className="relative block h-[3px] w-[56px] rounded-full bg-raised">
          <span className="absolute inset-y-0 left-0 w-1/2 rounded-full [background-color:var(--ds-accent-secondary)]" />
          <span className="absolute top-1/2 left-1/2 block size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line [background-color:var(--ds-accent-secondary)]" />
        </span>
        <span className={cn(CELL, "num text-fg-disabled")}>{last}</span>
      </span>
    </span>
  );
}

function Chip({ children }: { children: string }) {
  return (
    <span className={cn(CELL, "rounded-full border border-line bg-surface px-[var(--ds-space-4)] py-[3px] whitespace-nowrap text-fg-2 shadow-spec")}>
      {children}
    </span>
  );
}

export function SurfaceRotation() {
  return (
    <div className={SURFACE_BODY}>
      <div className="flex shrink-0 flex-wrap items-center gap-[var(--ds-space-3)]">
        <Chip>{ROTATION.universe}</Chip>
        <TailControl />
        <Chip>{ROTATION.timeframe}</Chip>
      </div>

      <div className="grid min-h-0 flex-1 gap-[var(--ds-space-4)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <figure className="m-0 flex min-h-0 min-w-0 flex-col gap-[var(--ds-space-3)]">
          <Tile className="relative min-h-[140px] flex-1">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 block size-full"
              role="img"
              aria-label={ROTATION.caption}
            >
              <defs>
                {ORDER.map((q) => {
                  const left = q === "Improving" || q === "Lagging";
                  const top = q === "Leading" || q === "Improving";
                  return (
                    <radialGradient
                      key={q}
                      id={`peek-rot-${q}`}
                      gradientUnits="userSpaceOnUse"
                      cx={left ? 0 : W}
                      cy={top ? 0 : H}
                      r={Math.hypot(W / 2, H / 2) * 1.25}
                    >
                      <stop offset="0%" stopColor={QUADRANT_HUE[q]} stopOpacity="0.16" />
                      <stop offset="100%" stopColor={QUADRANT_HUE[q]} stopOpacity="0" />
                    </radialGradient>
                  );
                })}
              </defs>

              {ORDER.map((q) => {
                const left = q === "Improving" || q === "Lagging";
                const top = q === "Leading" || q === "Improving";
                return (
                  <rect
                    key={q}
                    x={left ? -BLEED : W / 2}
                    y={top ? -BLEED : H / 2}
                    width={W / 2 + BLEED}
                    height={H / 2 + BLEED}
                    fill={`url(#peek-rot-${q})`}
                  />
                );
              })}

              <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="var(--ds-border-default)" strokeDasharray="3 4" />
              <line x1={W / 2} x2={W / 2} y1="0" y2={H} stroke="var(--ds-border-default)" strokeDasharray="3 4" />

              {ROTATION_SECTORS.map((s) => {
                const hue = QUADRANT_HUE[s.quadrant];
                const path = [...s.tail, [s.rs, s.mom] as const]
                  .map(([r, m], i) => `${i === 0 ? "M" : "L"} ${x(r).toFixed(1)} ${y(m).toFixed(1)}`)
                  .join(" ");
                const isStrongest = s.sector === STRONGEST.sector;
                return (
                  <g key={s.sector}>
                    <path
                      d={path}
                      fill="none"
                      stroke={hue}
                      strokeWidth="1.7"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {isStrongest ? (
                      <circle cx={x(s.rs)} cy={y(s.mom)} r="8" fill="none" stroke={hue} strokeWidth="1.4" strokeOpacity="0.5" />
                    ) : null}
                    <circle cx={x(s.rs)} cy={y(s.mom)} r="4.2" fill={hue} />
                    {isStrongest ? (
                      <text x={x(s.rs) + 12} y={y(s.mom) + 4} fill="var(--ds-text-primary)" fontSize="13">
                        {s.sector}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>

            {ORDER.map((q) => (
              <span
                key={q}
                aria-hidden="true"
                className={cn(MICRO, "pointer-events-none absolute", QUADRANT_CORNER[q])}
                style={{ color: QUADRANT_HUE[q] }}
              >
                {q}
              </span>
            ))}

            <span
              aria-hidden="true"
              className={cn(CELL, "pointer-events-none absolute inset-x-0 bottom-[var(--ds-space-2)] text-center text-fg-3")}
            >
              {ROTATION.axisX}
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 flex w-[16px] items-center justify-center"
            >
              <span className={cn(CELL, "rotate-180 whitespace-nowrap text-fg-3 [writing-mode:vertical-rl]")}>
                {ROTATION.axisY}
              </span>
            </span>
          </Tile>

          <ul className="flex shrink-0 list-none flex-wrap items-center gap-x-[var(--ds-space-5)] gap-y-[var(--ds-space-1)]">
            {ORDER.map((q) => (
              <li key={q}>
                <QuadrantPill q={q} />
              </li>
            ))}
          </ul>
        </figure>

        <Tile className="hidden min-h-0 min-w-0 flex-col lg:flex">
          <div className="shrink-0 border-b border-line px-[var(--ds-space-4)] py-[var(--ds-space-3)]">
            <TileLabel
              right={
                <span className={cn(CELL, "num text-fg-3")}>
                  {ROTATION_SECTORS.length} {ROTATION.sectorsVisible}
                </span>
              }
            >
              {ROTATION.rankingLabel}
            </TileLabel>
          </div>

          {/* Clipped on purpose: a ranking that runs past the window is a window
              into a longer list, which is what a sneak peek is. */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{ROTATION.caption}</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className={cn(MICRO, "px-[var(--ds-space-4)] py-[5px] font-normal")}>
                    {ROTATION.headers.sector}
                  </th>
                  <th scope="col" className={cn(MICRO, "py-[5px] font-normal")}>
                    {ROTATION.headers.quadrant}
                  </th>
                  <th scope="col" className={cn(MICRO, "py-[5px] text-right font-normal")}>
                    {ROTATION.headers.rs}
                  </th>
                  <th scope="col" className={cn(MICRO, "py-[5px] text-right font-normal")}>
                    {ROTATION.headers.mom}
                  </th>
                  <th scope="col" className={cn(MICRO, "px-[var(--ds-space-4)] py-[5px] text-right font-normal")}>
                    {ROTATION.headers.days}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROTATION_SECTORS.map((s) => (
                  <tr key={s.sector} className="border-b border-line">
                    <th scope="row" className={cn(CELL, "truncate px-[var(--ds-space-4)] py-[4px] font-medium text-fg")}>
                      {s.sector}
                    </th>
                    <td className="py-[4px]">
                      <QuadrantPill q={s.quadrant} />
                    </td>
                    <td className={cn(CELL, "num py-[4px] text-right")}>{`{${s.rs.toFixed(1)}}`}</td>
                    <td className={cn(CELL, "num py-[4px] text-right")}>{`{${s.mom.toFixed(1)}}`}</td>
                    <td className={cn(CELL, "num px-[var(--ds-space-4)] py-[4px] text-right text-fg-3")}>
                      {s.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Tile>
      </div>
    </div>
  );
}
