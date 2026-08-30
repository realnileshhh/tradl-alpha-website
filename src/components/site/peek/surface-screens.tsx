import {
  FEATURED_SCREENS,
  PATTERN_SCREENS,
  POPULAR_SCREENS,
  SCREENS_ASOF,
  SCREEN_TABS,
  type ScreenBias,
} from "@/lib/peek-data";
import { IconArrowRight, IconBookmarkSave, IconFilter } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { CELL, Delta, MICRO, NAME, SURFACE_BODY, SymbolTile, Tile, TileLabel } from "./chrome";

/**
 * 02 · SCREENS, the library that runs itself.
 *
 * Three featured screens across the top, the category strip, then the pattern
 * screens with the popular list beside them. Each pattern card carries its
 * members and what each has done since the screen featured it, which is the
 * claim the surface makes: a screen is a thing with a history, not a query you
 * re-run.
 *
 * The bias word travels with a glyph, never with colour alone.
 */

const BIAS_GLYPH: Record<ScreenBias, string> = {
  BULLISH: "▲",
  BEARISH: "▼",
  MIXED: "·",
};

const BIAS_INK: Record<ScreenBias, string> = {
  BULLISH: "text-accent-2",
  BEARISH: "text-negative",
  MIXED: "text-fg-3",
};

function Featured() {
  return (
    <div className="grid shrink-0 gap-[var(--ds-space-3)] sm:grid-cols-3">
      {FEATURED_SCREENS.items.map((s, position) => (
        <Tile
          key={s.n}
          className={cn(
            "flex flex-col p-[var(--ds-space-4)]",
            position > 0 && "hidden sm:flex",
          )}
        >
          <div className="flex items-start justify-between gap-[var(--ds-space-3)]">
            <p className={cn(NAME, "min-w-0 truncate")}>{s.n}</p>
            <span aria-hidden="true" className="grid size-3 shrink-0 place-items-center text-fg-disabled">
              <IconBookmarkSave width="100%" height="100%" />
            </span>
          </div>

          <p className={cn(CELL, "mt-[var(--ds-space-2)] line-clamp-2")}>{s.what}</p>

          <p className={cn(CELL, "num mt-[var(--ds-space-3)] text-fg-3")}>
            {s.count} {PATTERN_SCREENS.stocks} · {s.uni}
          </p>

          {/* The members, overlapped the way the product stacks them. */}
          <ul className="mt-[var(--ds-space-3)] flex list-none items-center">
            {s.members.map((m, k) => (
              <li key={m} className={k === 0 ? "" : "-ml-[6px]"}>
                <SymbolTile sym={m} stacked />
                <span className="sr-only">{m}</span>
              </li>
            ))}
            <li className="ml-[var(--ds-space-3)]">
              <span className={cn(CELL, "num rounded-full border border-line px-[var(--ds-space-3)] whitespace-nowrap text-fg-3")}>
                +{s.more} {FEATURED_SCREENS.more}
              </span>
            </li>
          </ul>

          <div className="mt-auto flex items-center justify-between gap-[var(--ds-space-3)] border-t border-line pt-[var(--ds-space-3)]">
            <span className={cn(CELL, "num text-fg-3")}>
              <span className="font-medium text-fg">{s.fresh}</span> {FEATURED_SCREENS.fresh}
            </span>
            <span aria-hidden="true" className="grid size-3 place-items-center text-fg-3">
              <IconArrowRight width="100%" height="100%" />
            </span>
          </div>
        </Tile>
      ))}
    </div>
  );
}

function Tabs() {
  return (
    <div className="flex shrink-0 items-center gap-[var(--ds-space-5)] overflow-hidden border-b border-line pb-[var(--ds-space-3)]">
      <div className="flex min-w-0 items-center gap-[var(--ds-space-5)] overflow-hidden">
        {SCREEN_TABS.items.map((t) => {
          const on = t === SCREEN_TABS.active;
          return (
            <span
              key={t}
              className={cn(
                "relative shrink-0 text-sm whitespace-nowrap",
                on ? "font-medium text-fg" : "text-fg-3",
              )}
            >
              {t}
              {on ? (
                <i
                  aria-hidden="true"
                  className="absolute right-0 -bottom-[9px] left-0 block h-[2px] rounded-full [background-color:var(--ds-accent-secondary)]"
                />
              ) : null}
            </span>
          );
        })}
      </div>

      <span className={cn(CELL, "num ml-auto hidden shrink-0 [color:var(--ds-highlight-5)] sm:inline")}>
        {SCREENS_ASOF}
      </span>

      <span
        className={cn(
          CELL,
          "hidden shrink-0 items-center gap-[var(--ds-space-2)] rounded-sm border border-line px-[var(--ds-space-3)] py-[2px] text-fg-2 sm:flex",
        )}
      >
        <span aria-hidden="true" className="grid size-3 place-items-center">
          <IconFilter width="100%" height="100%" />
        </span>
        Filters
      </span>
    </div>
  );
}

export function SurfaceScreens() {
  return (
    <div className={SURFACE_BODY}>
      <Featured />
      <Tabs />

      <div className="grid min-h-0 flex-1 gap-[var(--ds-space-3)] overflow-hidden lg:grid-cols-[minmax(0,1fr)_190px]">
        <div className="grid min-h-0 content-start gap-[var(--ds-space-3)] overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {PATTERN_SCREENS.items.map((p, position) => (
            <Tile
              key={p.n}
              className={cn(
                "flex flex-col",
                /* Six cards on a full window, three on a tablet, one on a
                   phone. The rest are not hidden so much as past the edge of
                   the window, which is the same thing the frame does to the
                   bottom of every surface here. */
                position > 0 && "hidden sm:flex",
                position > 2 && "hidden lg:flex",
              )}
            >
              <div className="flex items-start justify-between gap-[var(--ds-space-3)] px-[var(--ds-space-4)] pt-[var(--ds-space-3)] pb-[var(--ds-space-2)]">
                <span className="min-w-0">
                  <span className={cn(NAME, "block truncate")}>{p.n}</span>
                  <span className={cn(CELL, "num mt-[2px] flex items-center gap-[var(--ds-space-2)] text-fg-3")}>
                    <span>
                      {p.count} {PATTERN_SCREENS.stocks}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={cn("tracking-[0.08em]", BIAS_INK[p.bias])}>
                      <span aria-hidden="true">{BIAS_GLYPH[p.bias]}</span> {p.bias}
                    </span>
                  </span>
                </span>
                <span aria-hidden="true" className="grid size-3 shrink-0 place-items-center text-fg-disabled">
                  <IconBookmarkSave width="100%" height="100%" />
                </span>
              </div>

              <table className="w-full border-collapse">
                <caption className="sr-only">
                  {p.n}, {p.bias}. Each member and its move since the day the screen featured it.
                  Every figure is staged.
                </caption>
                <thead>
                  <tr className="border-y border-line">
                    <th scope="col" className={cn(MICRO, "px-[var(--ds-space-4)] py-[3px] text-left font-normal")}>
                      {PATTERN_SCREENS.headers.symbol}
                    </th>
                    <th scope="col" className={cn(MICRO, "px-[var(--ds-space-4)] py-[3px] text-right font-normal whitespace-nowrap")}>
                      {PATTERN_SCREENS.headers.since}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {p.rows.slice(0, 2).map((r) => (
                    <tr key={r.sym}>
                      <th scope="row" className="px-[var(--ds-space-4)] py-[4px] text-left font-normal">
                        <span className="flex items-center gap-[var(--ds-space-2)]">
                          <SymbolTile sym={r.sym} />
                          <span className={cn(CELL, "num truncate text-fg")}>{r.sym}</span>
                        </span>
                      </th>
                      <td className="px-[var(--ds-space-4)] py-[4px] text-right align-middle">
                        <Delta v={r.d} dir={r.dir} className="block text-xs" />
                        <span className={cn(CELL, "num block text-fg-disabled")}>{r.on}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                className={cn(
                  CELL,
                  "mt-auto flex items-center gap-[var(--ds-space-2)] border-t border-line px-[var(--ds-space-4)] py-[var(--ds-space-3)] text-fg-3",
                )}
              >
                {PATTERN_SCREENS.viewAll} {p.count}
                <span aria-hidden="true" className="grid size-3 place-items-center">
                  <IconArrowRight width="100%" height="100%" />
                </span>
              </div>
            </Tile>
          ))}
        </div>

        <aside aria-label={POPULAR_SCREENS.label} className="hidden min-h-0 overflow-hidden lg:block">
          <Tile className="h-full p-[var(--ds-space-4)]">
            <TileLabel>{POPULAR_SCREENS.label}</TileLabel>
            <ol className="mt-[var(--ds-space-3)] list-none">
              {POPULAR_SCREENS.items.map((p, k) => (
                <li key={p.n} className="flex items-center gap-[var(--ds-space-3)] py-[4px]">
                  <span aria-hidden="true" className={cn(CELL, "num w-[11px] shrink-0 text-right text-fg-disabled")}>
                    {k + 1}
                  </span>
                  <span className={cn(CELL, "min-w-0 flex-1 truncate text-fg")}>{p.n}</span>
                  <span className={cn(CELL, "num shrink-0 text-fg-3")}>
                    {p.count}
                    <span className="sr-only"> {PATTERN_SCREENS.stocks}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Tile>
        </aside>
      </div>
    </div>
  );
}
