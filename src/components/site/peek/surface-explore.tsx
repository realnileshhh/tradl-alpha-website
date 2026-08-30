import {
  EXPLORE,
  EXPLORE_DECODE,
  EXPLORE_HEAT,
  EXPLORE_LEADERBOARD,
  FACTOR_WORD,
  type FactorState,
} from "@/lib/peek-data";
import { IconArrowRight, IconPlay } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { CELL, Delta, MICRO, NAME, Spark, SURFACE_BODY, Tile, TileLabel } from "./chrome";

/**
 * 01 · EXPLORE, the logged-in home.
 *
 * Three index cards across the top, then the leaderboard against the Morning
 * Decode and the sector heatmap. The leaderboard is the argument: it is ranked
 * by how many screens a symbol passes, not by how much it moved, which is why
 * it carries "not a gainers list" in the product and carries it here too.
 *
 * A real <table> with a real <caption>, not a grid of divs. The caption is
 * visually hidden and is what a screen reader gets instead of forty numbers in
 * reading order, and it is where the staging is stated in a sentence.
 *
 * Below `sm` the second delta column and the factor pills drop out. A miniature
 * at 330px wide cannot hold nine columns, and shrinking the type until it does
 * is how a dense surface becomes an illegible one.
 */

const FACTOR_TONE: Record<FactorState, string> = {
  pass: "[border-color:var(--ds-accent-secondary)] [background-color:color-mix(in_srgb,var(--ds-accent-secondary)_16%,transparent)] text-accent-2",
  mixed: "[border-color:color-mix(in_srgb,var(--ds-highlight-5)_70%,transparent)] [color:var(--ds-highlight-5)]",
  fail: "border-dashed [border-color:color-mix(in_srgb,var(--ds-accent-negative)_70%,transparent)] text-negative",
};

const TH = cn(MICRO, "h-[22px] border-b border-line px-[var(--ds-space-3)] font-normal");
const TD = "h-[26px] border-b border-line px-[var(--ds-space-3)] align-middle";

function Leaderboard() {
  const t = EXPLORE_LEADERBOARD;

  return (
    <Tile className="flex min-h-0 flex-col">
      <div className="shrink-0 border-b border-line px-[var(--ds-space-4)] py-[var(--ds-space-3)]">
        <TileLabel right={<span className={cn(CELL, "hidden text-fg-3 sm:inline")}>{t.kicker}</span>}>
          {t.label}
        </TileLabel>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">{t.caption}</caption>
          <thead>
            <tr>
              <th scope="col" className={cn(TH, "text-left")}>
                {t.headers.symbol}
              </th>
              <th scope="col" className={cn(TH, "w-[74px] text-right")}>
                {t.headers.price}
              </th>
              {t.cols.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className={cn(TH, "w-[62px] text-right", c !== "1D" && "hidden sm:table-cell")}
                >
                  {c}
                </th>
              ))}
              <th scope="col" className={cn(TH, "hidden w-[112px] text-right sm:table-cell")}>
                {t.headers.factors}
              </th>
            </tr>
          </thead>

          <tbody>
            {t.rows.map((r) => (
              <tr key={r.sym}>
                <th scope="row" className={cn(TD, "text-left font-normal")}>
                  <span className="flex items-center gap-[var(--ds-space-3)]">
                    <span className={cn(NAME, "min-w-0 truncate")}>{r.sym}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        CELL,
                        "num ml-auto hidden shrink-0 rounded-sm border border-line px-[var(--ds-space-2)] text-fg-3 sm:block",
                      )}
                    >
                      {r.screens}
                    </span>
                    <span className="sr-only">
                      , passing {r.screens} {t.headers.screens}
                    </span>
                  </span>
                </th>

                <td className={cn(TD, "num text-right", CELL)}>{r.price}</td>

                {r.d.map((d) => (
                  <td
                    key={d.col}
                    className={cn(TD, "text-right", d.col !== "1D" && "hidden sm:table-cell")}
                  >
                    <Delta v={d.v} dir={d.dir} className="text-xs" />
                  </td>
                ))}

                <td className={cn(TD, "hidden text-right sm:table-cell")}>
                  <span className="sr-only">
                    {t.headers.factors}. {r.factors.map((f) => `${f.name} ${FACTOR_WORD[f.state]}`).join(", ")}.
                  </span>
                  <span aria-hidden="true" className="flex items-center justify-end gap-[2px]">
                    {r.factors.map((f) => (
                      <span
                        key={f.k}
                        className={cn(
                          "grid size-[17px] shrink-0 place-items-center rounded-full border text-[8px] leading-none",
                          FACTOR_TONE[f.state],
                        )}
                      >
                        {f.k}
                      </span>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Tile>
  );
}

function Decode() {
  const d = EXPLORE_DECODE;

  return (
    <div className="shrink-0 rounded-md border p-[var(--ds-space-4)] shadow-spec [background-color:color-mix(in_srgb,var(--ds-accent-secondary)_5%,transparent)] [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_35%,transparent)]">
      <div className="flex items-center justify-between gap-[var(--ds-space-3)]">
        <span className={cn(MICRO, "text-accent-2")}>{d.eyebrow}</span>
        <span
          className={cn(
            MICRO,
            "num shrink-0 rounded-full border px-[var(--ds-space-3)] py-px text-accent-2 [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_35%,transparent)]",
          )}
        >
          {d.edition}
        </span>
      </div>

      <p className="mt-[var(--ds-space-3)] text-base leading-[1.25] font-medium text-fg">{d.title}</p>

      <div className="mt-[var(--ds-space-3)] flex items-end justify-between gap-[var(--ds-space-4)]">
        <span className="min-w-0">
          <span className={cn(CELL, "num block truncate text-fg-3")}>{d.meta}</span>
          <span className={cn(CELL, "num block truncate text-fg-3")}>{d.date}</span>
        </span>
        <span
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full border text-accent-2 [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_35%,transparent)]"
        >
          <span className="grid size-3 place-items-center">
            <IconPlay width="100%" height="100%" />
          </span>
        </span>
      </div>

      {/* The scrub bar. A drawing of one: nothing here plays. */}
      <span aria-hidden="true" className="mt-[var(--ds-space-3)] flex items-center gap-[var(--ds-space-3)]">
        <span className={cn(CELL, "num text-fg-3")}>{d.scrubStart}</span>
        <span className="relative block h-[3px] flex-1 rounded-full bg-raised">
          <span className="absolute inset-y-0 left-0 block w-[7%] rounded-full [background-color:var(--ds-accent-secondary)]" />
          <span className="absolute top-1/2 left-[7%] block size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full [background-color:var(--ds-accent-secondary)]" />
        </span>
        <span className={cn(CELL, "num text-fg-3")}>{d.scrubEnd}</span>
      </span>

      <p
        className={cn(
          CELL,
          "mt-[var(--ds-space-3)] flex items-center gap-[var(--ds-space-2)] border-t pt-[var(--ds-space-3)] text-accent-2 [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_35%,transparent)]",
        )}
      >
        {d.link}
        <span aria-hidden="true" className="grid size-3 place-items-center">
          <IconArrowRight width="100%" height="100%" />
        </span>
      </p>
    </div>
  );
}

function Heatmap() {
  const cells = EXPLORE_HEAT.rows.reduce((n, r) => n + r.cells.length, 0);

  return (
    <Tile className="flex min-h-0 flex-1 flex-col p-[var(--ds-space-4)]">
      <TileLabel right={<span className={cn(CELL, "num text-fg-3")}>{cells} {EXPLORE_HEAT.unit}</span>}>
        {EXPLORE_HEAT.label}
      </TileLabel>

      {/* A treemap: row heights and cell widths are the weights, so the biggest
          sector is the biggest rectangle rather than the brightest one. */}
      <div className="mt-[var(--ds-space-3)] flex min-h-0 flex-1 flex-col gap-[3px]">
        {EXPLORE_HEAT.rows.map((row) => (
          <div
            key={row.cells.map((c) => c.n).join("-")}
            className="flex min-h-0 gap-[3px]"
            style={{ flexGrow: row.h, flexBasis: 0 }}
          >
            {row.cells.map((c) => (
              <div
                key={c.n}
                className="min-w-0 overflow-hidden rounded-sm px-[var(--ds-space-2)] py-[3px]"
                style={{
                  flexGrow: c.w,
                  flexBasis: 0,
                  /* The heatmap tokens are the design system's own cell fills.
                     The magnitude rides on their alpha rather than on a second
                     set of colours. */
                  backgroundColor:
                    c.dir === "up"
                      ? `color-mix(in srgb, var(--ds-heatmap-positive-moderate) ${Math.round(40 + c.m * 60)}%, transparent)`
                      : `color-mix(in srgb, var(--ds-heatmap-negative-moderate) ${Math.round(22 + c.m * 45)}%, transparent)`,
                }}
              >
                {/* One line, not two. The tile is the shortest thing in the
                    column and a treemap cell that wraps loses its own bottom
                    edge, which is the only thing making it a rectangle. */}
                <p className="flex items-baseline justify-between gap-[var(--ds-space-2)] text-[9px] leading-[1.4]">
                  <span className="min-w-0 truncate font-medium text-fg">{c.n}</span>
                  <Delta v={c.v} dir={c.dir} className="shrink-0 text-[9px]" />
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

    </Tile>
  );
}

export function SurfaceExplore() {
  return (
    <div className={SURFACE_BODY}>
      <div className="shrink-0">
        <TileLabel
          right={
            <span className={cn(MICRO, "num shrink-0 [color:var(--ds-highlight-5)]")}>
              {EXPLORE.asOf}
            </span>
          }
        >
          {EXPLORE.marketLabel}
        </TileLabel>

        <div className="mt-[var(--ds-space-3)] grid grid-cols-2 gap-[var(--ds-space-3)] sm:grid-cols-3">
          {EXPLORE.indices.map((c, position) => (
            <Tile
              key={c.name}
              className={cn("px-[var(--ds-space-4)] pt-[var(--ds-space-3)]", position === 2 && "hidden sm:block")}
            >
              <p className={cn(MICRO, "truncate")}>{c.name}</p>
              <p className="num mt-[2px] text-base leading-[1.2] font-medium text-fg">{c.level}</p>
              <p className="mt-[2px] flex items-baseline justify-between gap-[var(--ds-space-3)]">
                <span className={cn(CELL, "num hidden text-fg-3 sm:inline")}>{c.abs}</span>
                <Delta v={c.pct} dir={c.dir} className="text-xs" />
              </p>
              <div className="mt-[var(--ds-space-2)] -mx-[var(--ds-space-4)]">
                <Spark
                  series={c.spark}
                  dir={c.dir}
                  id={`peek-spark-${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                />
              </div>
            </Tile>
          ))}
        </div>
      </div>

      <div className="grid min-h-0 flex-1 gap-[var(--ds-space-3)] lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Leaderboard />
        <div className="hidden min-h-0 flex-col gap-[var(--ds-space-3)] lg:flex">
          <Decode />
          <Heatmap />
        </div>
      </div>
    </div>
  );
}
