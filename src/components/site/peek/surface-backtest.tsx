import { BACKTEST, BT_LEG_PNL, BT_STATS, BT_TRADES } from "@/lib/peek-data";
import { cn } from "@/lib/utils";
import { CELL, Delta, MICRO, NAME, staged, Tile, TileLabel } from "./chrome";

/**
 * 03 · AI BACKTESTING, honest by architecture.
 *
 * EVERYTHING ON THIS SURFACE IS COMPUTED FROM ONE LEDGER. The equity curve, the
 * drawdown span, the profit factor, both win rates and every row's profit are
 * derived from `BT_LEG_PNL` and the trade rows at build time. Nothing is a
 * number typed next to a drawing of a different number.
 *
 * That is not neatness, it is the surface's argument. This section claims the
 * engine is auditable; a marketing miniature with a hand-drawn curve and a
 * hand-written win rate beside it would be the opposite claim, made quietly.
 * If the ledger changes, every figure here moves with it or the build is wrong.
 *
 * The drawdown is drawn at full weight in red, peak to trough, exactly as the
 * product draws it. A backtest that hides its worst stretch is a brochure.
 */

/* -----------------------------------------------------------------------------
   The arithmetic. Module scope: this is a static server component, so it runs
   once at build and ships as markup.
   -------------------------------------------------------------------------- */

const MINUS = "−";
const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Rupees, signed, with the minus sign rather than a hyphen. */
function money(n: number): string {
  const sign = n < 0 ? MINUS : "+";
  return `${sign}₹${inr.format(Math.abs(Math.round(n)))}`;
}

/** The running total after every leg. This is the curve. */
const EQUITY = BT_LEG_PNL.reduce<number[]>((acc, v) => {
  acc.push((acc[acc.length - 1] ?? 0) + v);
  return acc;
}, []);

const NET = EQUITY[EQUITY.length - 1] ?? 0;

/** True maximum drawdown: the deepest fall from a running peak, not max minus min. */
const DRAWDOWN = (() => {
  let peak = EQUITY[0] ?? 0;
  let peakAt = 0;
  let worst = 0;
  let from = 0;
  let to = 0;
  EQUITY.forEach((v, i) => {
    if (v > peak) {
      peak = v;
      peakAt = i;
    }
    const fall = peak - v;
    if (fall > worst) {
      worst = fall;
      from = peakAt;
      to = i;
    }
  });
  return { depth: worst, from, to, peak };
})();

const WINS = BT_LEG_PNL.filter((v) => v > 0);
const LOSSES = BT_LEG_PNL.filter((v) => v < 0);
const GROSS_WIN = WINS.reduce((a, b) => a + b, 0);
const GROSS_LOSS = -LOSSES.reduce((a, b) => a + b, 0);

/** Two legs to a session, which is what a straddle is. */
const SESSIONS = BT_LEG_PNL.reduce<number[]>((acc, v, i) => {
  if (i % 2 === 0) acc.push(v);
  else acc[acc.length - 1] = (acc[acc.length - 1] ?? 0) + v;
  return acc;
}, []);

/** One segment per session, which is what the strip under the curve draws. */
const STRIP = SESSIONS.map((v) => v >= 0);

/** Gridline values, every ten thousand rupees inside the plotted range. */
const TICK_STEP = 10000;

const STATS = {
  profitFactor: GROSS_WIN / GROSS_LOSS,
  winLegs: (WINS.length / BT_LEG_PNL.length) * 100,
  winSessions: (SESSIONS.filter((v) => v > 0).length / SESSIONS.length) * 100,
  expectancy: NET / BT_LEG_PNL.length,
  avgWin: GROSS_WIN / Math.max(1, WINS.length),
  avgLoss: GROSS_LOSS / Math.max(1, LOSSES.length),
};

/** What a screen reader gets instead of a path with sixty vertices. */
const SUMMARY =
  `Equity curve over ${BT_LEG_PNL.length} staged legs across ${SESSIONS.length} sessions. ` +
  `It ends at ${money(NET)} with a deepest fall of ${money(-DRAWDOWN.depth)} from its running peak, ` +
  `drawn in full at legs ${DRAWDOWN.from + 1} to ${DRAWDOWN.to + 1}. Every figure is staged.`;

/* The plot. A wide box, stretched to the card, with a non-scaling stroke. */
const CW = 600;
const CH = 190;
const LO = Math.min(0, ...EQUITY);
const HI = Math.max(0, ...EQUITY);
const PAD = (HI - LO) * 0.1 || 1;
const px = (i: number) => (i / Math.max(1, EQUITY.length - 1)) * CW;
const py = (v: number) => CH - ((v - (LO - PAD)) / (HI + PAD - (LO - PAD))) * CH;

const TICKS = (() => {
  const out: number[] = [];
  const from = Math.ceil((LO - PAD) / TICK_STEP) * TICK_STEP;
  for (let t = from; t <= HI + PAD; t += TICK_STEP) out.push(t);
  return out.includes(0) ? out : [...out, 0].sort((a, b) => a - b);
})();

const LINE = EQUITY.map((v, i) => `${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
const AREA =
  `M 0 ${py(0).toFixed(1)} ` +
  EQUITY.map((v, i) => `L ${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join(" ") +
  ` L ${px(EQUITY.length - 1).toFixed(1)} ${py(0).toFixed(1)} Z`;
const FALL = EQUITY.slice(DRAWDOWN.from, DRAWDOWN.to + 1)
  .map((v, i) => `${px(i + DRAWDOWN.from).toFixed(1)},${py(v).toFixed(1)}`)
  .join(" ");

/* -----------------------------------------------------------------------------
   Parts
   -------------------------------------------------------------------------- */

function Metric({ k, v, dir }: { k: string; v: number; dir: "up" | "down" }) {
  return (
    <div className="min-w-0">
      <p className={cn(MICRO, "truncate")}>{k}</p>
      <Delta v={staged(money(v))} dir={dir} className="text-sm" />
    </div>
  );
}

/**
 * The two meters. A ring for a ratio and a gauge for a percentage, both drawn
 * from the same share the figure beside them states, so the picture cannot
 * disagree with the number.
 */
function Ring({ share }: { share: number }) {
  const r = 8;
  const circumference = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 shrink-0 -rotate-90">
      <circle cx="12" cy="12" r={r} fill="none" stroke="var(--ds-border-default)" strokeWidth="3" />
      <circle
        cx="12"
        cy="12"
        r={r}
        fill="none"
        stroke="var(--ds-accent-secondary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${(circumference * Math.min(1, share)).toFixed(1)} ${circumference.toFixed(1)}`}
      />
    </svg>
  );
}

function Gauge({ share }: { share: number }) {
  const r = 9;
  const length = Math.PI * r;
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className="h-4 w-6 shrink-0">
      <path d="M3 13 A9 9 0 0 1 21 13" fill="none" stroke="var(--ds-border-default)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M3 13 A9 9 0 0 1 21 13"
        fill="none"
        stroke="var(--ds-accent-secondary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${(length * Math.min(1, share)).toFixed(1)} ${length.toFixed(1)}`}
      />
    </svg>
  );
}

function ShareStat({
  k,
  figure,
  meter,
}: {
  k: string;
  figure: string;
  meter: React.ReactNode;
}) {
  return (
    <Tile className="p-[var(--ds-space-3)]">
      <p className={cn(MICRO, "truncate")}>{k}</p>
      <p className="mt-[2px] flex items-center justify-between gap-[var(--ds-space-3)]">
        <span className="num text-sm font-medium text-fg">{figure}</span>
        {meter}
      </p>
    </Tile>
  );
}

export function SurfaceBacktest() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-line px-[var(--ds-space-5)] pt-[var(--ds-space-4)]">
        <div className="flex flex-wrap items-center justify-between gap-[var(--ds-space-4)]">
          <p className={NAME}>{BACKTEST.title}</p>
          <span className={cn(CELL, "rounded-full border border-line px-[var(--ds-space-3)] py-px whitespace-nowrap text-fg-3")}>
            {BACKTEST.costs}
            <span className="hidden sm:inline"> · {BACKTEST.costsDetail}</span>
          </span>
        </div>

        <div className="mt-[var(--ds-space-3)] flex gap-[var(--ds-space-5)]">
          {BACKTEST.tabs.map((t, n) => (
            <span
              key={t}
              className={cn(
                "border-b-2 pb-[5px] text-sm",
                n === 0
                  ? "font-medium text-fg [border-color:var(--ds-accent-secondary)]"
                  : "border-transparent text-fg-3",
              )}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Three parts of one box, and the split is deliberate: the curve keeps
          three fifths of what is left and the log takes two and clips, because
          a trade log that runs past the window reads as a window into a longer
          one, which is what a peek is. */}
      <figure className="m-0 flex min-h-[170px] flex-[3] basis-0 flex-col overflow-hidden border-b border-line px-[var(--ds-space-5)] py-[var(--ds-space-4)]">
        <div className="grid min-h-0 flex-1 overflow-hidden gap-[var(--ds-space-4)] sm:grid-cols-[130px_minmax(0,1fr)]">
          {/* The three figures the curve is worth reading for, beside it rather
              than under it, so the eye lands on the number then the shape. */}
          <div className="flex min-h-0 shrink-0 flex-row items-end gap-[var(--ds-space-5)] overflow-hidden border-b border-line pb-[var(--ds-space-3)] sm:flex-col sm:items-stretch sm:justify-start sm:gap-[var(--ds-space-3)] sm:border-r sm:border-b-0 sm:pr-[var(--ds-space-4)] sm:pb-0">
            <div className="hidden sm:block">
              <TileLabel>{BACKTEST.metricsLabel}</TileLabel>
            </div>
            <Metric k={BT_STATS.net} v={NET} dir={NET < 0 ? "down" : "up"} />
            <Metric k={BT_STATS.drawdown} v={-DRAWDOWN.depth} dir="down" />
            <Metric
              k={BT_STATS.expectancy}
              v={STATS.expectancy}
              dir={STATS.expectancy < 0 ? "down" : "up"}
            />
          </div>

          <div className="flex min-h-0 min-w-0 flex-col">
            <TileLabel
              right={
                <span className={cn(CELL, "num hidden shrink-0 text-fg-disabled sm:inline")}>
                  {BACKTEST.sessionsNote}
                </span>
              }
            >
              {BACKTEST.curveLabel}
            </TileLabel>

            <div className="mt-[var(--ds-space-3)] flex min-h-[90px] flex-1 gap-[var(--ds-space-3)]">
              <div className="relative min-h-0 min-w-0 flex-1">
              <svg
                viewBox={`0 0 ${CW} ${CH}`}
                preserveAspectRatio="none"
                className="absolute inset-0 block size-full"
                role="img"
                aria-label={SUMMARY}
              >
                <defs>
                  <linearGradient id="peek-bt-up" x1="0" y1="0" x2="0" y2={py(0)} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--ds-accent-secondary)" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="var(--ds-accent-secondary)" stopOpacity="0.01" />
                  </linearGradient>
                  <linearGradient id="peek-bt-down" x1="0" y1={py(0)} x2="0" y2={CH} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="var(--ds-accent-negative)" stopOpacity="0.01" />
                    <stop offset="100%" stopColor="var(--ds-accent-negative)" stopOpacity="0.26" />
                  </linearGradient>
                  {/* The fill is cut at the zero line and coloured on each side
                      of it. One gradient over the whole area would shade a loss
                      in the colour of a profit, which is the exact flattery
                      this surface is about refusing. */}
                  <clipPath id="peek-bt-above">
                    <rect x="0" y="0" width={CW} height={py(0)} />
                  </clipPath>
                  <clipPath id="peek-bt-below">
                    <rect x="0" y={py(0)} width={CW} height={CH - py(0)} />
                  </clipPath>
                </defs>

                {TICKS.filter((t) => t !== 0).map((t) => (
                  <line
                    key={t}
                    x1="0"
                    x2={CW}
                    y1={py(t)}
                    y2={py(t)}
                    stroke="var(--ds-border-subtle)"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {/* The zero line. Everything below it is money lost. */}
                <line
                  x1="0"
                  x2={CW}
                  y1={py(0)}
                  y2={py(0)}
                  stroke="var(--ds-border-default)"
                  strokeDasharray="3 3"
                  vectorEffect="non-scaling-stroke"
                />

                <path d={AREA} fill="url(#peek-bt-up)" clipPath="url(#peek-bt-above)" />
                <path d={AREA} fill="url(#peek-bt-down)" clipPath="url(#peek-bt-below)" />

                <polyline
                  points={LINE}
                  fill="none"
                  stroke="var(--ds-accent-secondary)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />

                {/* The drawdown, at full weight. */}
                <polyline
                  points={FALL}
                  fill="none"
                  stroke="var(--ds-accent-negative)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={px(DRAWDOWN.from)}
                  x2={px(DRAWDOWN.to)}
                  y1={py(DRAWDOWN.peak)}
                  y2={py(DRAWDOWN.peak)}
                  stroke="var(--ds-accent-negative)"
                  strokeDasharray="2 3"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={px(DRAWDOWN.to)}
                  x2={px(DRAWDOWN.to)}
                  y1={py(DRAWDOWN.peak)}
                  y2={py(EQUITY[DRAWDOWN.to] ?? 0)}
                  stroke="var(--ds-accent-negative)"
                  strokeDasharray="2 3"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              </div>

              {/* The scale, in rupees. Absolute against the plot's own box, so
                  a label always sits on the line it names. */}
              <div aria-hidden="true" className="relative hidden w-[42px] shrink-0 sm:block">
                {TICKS.map((t) => (
                  <span
                    key={t}
                    className={cn(CELL, "num absolute left-0 -translate-y-1/2 whitespace-nowrap text-fg-disabled")}
                    style={{ top: `${(py(t) / CH) * 100}%` }}
                  >
                    {/* Thousands, short. A 42px rail cannot hold "−₹20,000",
                        and a clipped scale is worse than a coarse one. */}
                    {t === 0 ? "0" : `${t < 0 ? MINUS : ""}₹${Math.abs(t) / 1000}k`}
                  </span>
                ))}
              </div>
            </div>

            {/* One segment per session, win or loss, under the curve. The
                curve says how the run went; the strip says how often. */}
            <div className="mt-[var(--ds-space-2)] hidden shrink-0 gap-[var(--ds-space-3)] sm:flex">
              <div className="min-w-0 flex-1">
                <span aria-hidden="true" className="flex h-[3px] overflow-hidden rounded-full">
                  {STRIP.map((up, n) => (
                    <i
                      key={n}
                      className={cn("block h-full flex-1", up ? "bg-accent-2" : "bg-negative")}
                    />
                  ))}
                </span>
                <span className={cn(CELL, "num mt-[3px] flex justify-between text-fg-disabled")}>
                  {BACKTEST.axis.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </span>
              </div>
              <span className="w-[42px] shrink-0" />
            </div>
          </div>
        </div>
      </figure>

      <div className="grid shrink-0 grid-cols-2 gap-[var(--ds-space-3)] border-b border-line px-[var(--ds-space-5)] py-[var(--ds-space-4)] sm:grid-cols-4">
        <ShareStat
          k={BT_STATS.profitFactor}
          figure={staged(STATS.profitFactor.toFixed(2))}
          /* A profit factor of 1 is break-even, so the ring reads against 2. */
          meter={<Ring share={STATS.profitFactor / 2} />}
        />
        <ShareStat
          k={BT_STATS.winTrades}
          figure={staged(`${STATS.winLegs.toFixed(1)}%`)}
          meter={<Gauge share={STATS.winLegs / 100} />}
        />
        <ShareStat
          k={BT_STATS.winDays}
          figure={staged(`${STATS.winSessions.toFixed(1)}%`)}
          meter={<Gauge share={STATS.winSessions / 100} />}
        />
        <Tile className="hidden p-[var(--ds-space-3)] sm:block">
          <p className={cn(MICRO, "truncate")}>{BT_STATS.avgWinLoss}</p>
          <p className="mt-[2px] flex flex-wrap items-baseline gap-x-[var(--ds-space-3)]">
            <Delta v={staged(money(STATS.avgWin))} dir="up" className="text-sm" />
            <Delta v={staged(money(-STATS.avgLoss))} dir="down" className="text-sm" />
          </p>
        </Tile>
      </div>

      <div className="hidden min-h-0 flex-[2] basis-0 overflow-hidden px-[var(--ds-space-5)] pt-[var(--ds-space-4)] lg:block">
        <TileLabel
          right={
            <span className={cn(CELL, "num shrink-0 text-fg-disabled")}>
              {staged(BT_TRADES.rows.length)} / {staged(BT_LEG_PNL.length)}
            </span>
          }
        >
          {BACKTEST.logLabel}
        </TileLabel>

        <table className="mt-[var(--ds-space-3)] w-full border-collapse text-left">
          <caption className="sr-only">
            Trade log. The first legs of a staged short straddle run, with the entry, exit and
            computed profit of every leg. Every figure is staged.
          </caption>
          <thead>
            <tr>
              {[
                BT_TRADES.headers.n,
                BT_TRADES.headers.contract,
                BT_TRADES.headers.side,
                BT_TRADES.headers.qty,
                BT_TRADES.headers.entry,
                BT_TRADES.headers.exit,
                BT_TRADES.headers.reason,
                BT_TRADES.headers.pnl,
                BT_TRADES.headers.capture,
              ].map((h, n) => (
                <th
                  key={h}
                  scope="col"
                  className={cn(MICRO, "py-[3px] pr-[var(--ds-space-4)] font-normal", n >= 3 && "text-right")}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BT_TRADES.rows.map((t) => {
              /* A short leg profits when the exit is below the entry. */
              const move = t.entry - t.exit;
              const pnl = Math.round(move * t.qty);
              return (
                <tr key={t.n} className="border-t border-line">
                  <td className={cn(CELL, "num py-[3px] pr-[var(--ds-space-4)] text-fg-disabled")}>
                    {staged(t.n)}
                  </td>
                  <th scope="row" className={cn(CELL, "num py-[3px] pr-[var(--ds-space-4)] font-medium whitespace-nowrap text-fg")}>
                    {t.contract}
                  </th>
                  <td className={cn(CELL, "py-[3px] pr-[var(--ds-space-4)]")}>{BT_TRADES.side}</td>
                  <td className={cn(CELL, "num py-[3px] pr-[var(--ds-space-4)] text-right")}>
                    {staged(t.qty)}
                  </td>
                  <td className={cn(CELL, "num py-[3px] pr-[var(--ds-space-4)] text-right")}>
                    {staged(t.entry.toFixed(2))}
                  </td>
                  <td className={cn(CELL, "num py-[3px] pr-[var(--ds-space-4)] text-right")}>
                    {staged(t.exit.toFixed(2))}
                  </td>
                  <td className={cn(CELL, "py-[3px] pr-[var(--ds-space-4)] text-right whitespace-nowrap text-fg-3")}>
                    {t.reason}
                  </td>
                  <td className="py-[3px] pr-[var(--ds-space-4)] text-right">
                    <Delta v={staged(money(pnl))} dir={pnl < 0 ? "down" : "up"} className="text-xs" />
                  </td>
                  {/* What share of the premium the leg actually captured. */}
                  <td className="py-[3px] text-right">
                    <Delta
                      v={staged(`${((move / t.entry) * 100).toFixed(1)}%`)}
                      dir={move < 0 ? "down" : "up"}
                      className="text-xs"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
