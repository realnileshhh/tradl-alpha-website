/**
 * THE SNEAK PEEK SURFACES, AND EVERY NUMBER IN THEM IS STAGED.
 *
 * Four miniatures of product surfaces that exist in the build but have no
 * capture on this machine yet. Doc 05 §6 lists the recordings as assets that do
 * not exist; this is the honest version of the same screen: the real layout,
 * the real vocabulary, and figures that say out loud that they are not real.
 *
 * THE BRACES ARE THE POINT. Every staged figure is wrapped in `{ }`, which is
 * the same convention the SEBI registration number uses in COMPLIANCE_LINES and
 * the convention the earlier build shipped these surfaces with. A reader who
 * looks closely at any number is told, by the number itself, that no cached run
 * stands behind it. Doc 01 §8 requires attribution on every data-bearing
 * module; a fabricated leaderboard with no marking would be a claim about the
 * product, and this is what keeps it a drawing of one.
 *
 * Values are carried over from the earlier build (05-app/src/content/peek-*.ts)
 * rather than re-invented, so the two agree on what the staged market looked
 * like. Sector rotation's coordinates are load-bearing: they are what the plot
 * draws, so the quadrants have to stay consistent with the ranking table.
 *
 * LINTED. `npm run check:copy` reads this file's string literals exactly as it
 * reads src/lib/site.ts, because a symbol, a screen name and a table header are
 * as customer-facing as a meta description.
 */

export type Dir = "up" | "down";

/** How a Tradl factor grade came out. Never colour alone: each carries a word. */
export type FactorState = "pass" | "mixed" | "fail";

export type Factor = { k: string; name: string; state: FactorState };

export const FACTOR_WORD: Record<FactorState, string> = {
  pass: "passing",
  mixed: "mixed",
  fail: "not passing",
};

/** Worn by every window, beside the counter. See the frame in peek/chrome. */
export const STAGED_LABEL = "STAGED";
export const STAGED_TITLE = "Every figure on this surface is staged. No cached run stands behind it.";

/* -----------------------------------------------------------------------------
   01 · EXPLORE, the logged-in home.
   -------------------------------------------------------------------------- */

export const EXPLORE = {
  asOf: "AS OF CLOSE · {2 Aug}",
  marketLabel: "MARKET",
  indices: [
    {
      name: "NIFTY 50",
      level: "{24,383.60}",
      abs: "{+66.45}",
      pct: "+0.29%",
      dir: "up" as Dir,
      spark: [38, 34, 41, 37, 45, 42, 51, 47, 55, 52, 61, 58, 66, 63, 71],
    },
    {
      name: "SENSEX",
      level: "{78,094.64}",
      abs: "{+164.20}",
      pct: "+0.21%",
      dir: "up" as Dir,
      spark: [44, 41, 46, 43, 48, 44, 52, 49, 54, 50, 57, 55, 60, 58, 63],
    },
    {
      name: "NIFTY BANK",
      level: "{54,912.05}",
      abs: "{−188.30}",
      pct: "−0.34%",
      dir: "down" as Dir,
      spark: [68, 71, 66, 69, 62, 65, 58, 61, 54, 57, 49, 52, 45, 47, 41],
    },
  ],
} as const;

export const EXPLORE_LEADERBOARD = {
  label: "LEADERBOARD · RANKED BY SCREENS PASSING",
  /** The disclaimer the surface wears in the product. It is not a gainers list. */
  kicker: "not a gainers list",
  caption:
    "Leaderboard. NSE symbols ranked by how many Tradl screens each one currently passes, with price, signed returns over one day and one month, and the five Tradl factor grades. Every figure is staged.",
  headers: { symbol: "Symbol", price: "Price", screens: "Screens", factors: "Factors" },
  cols: ["1D", "1W", "1M", "1Y"],
  rows: [
    {
      sym: "BAJFINANCE",
      screens: "{15}",
      price: "{1,141.20}",
      d: [
        { col: "1D", v: "+0.8%", dir: "up" as Dir },
        { col: "1W", v: "+2.7%", dir: "up" as Dir },
        { col: "1M", v: "+6.1%", dir: "up" as Dir },
        { col: "1Y", v: "+17.9%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "mixed" },
        { k: "V", name: "Value", state: "fail" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "pass" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "NETWEB",
      screens: "{15}",
      price: "{4,510.00}",
      d: [
        { col: "1D", v: "+2.4%", dir: "up" as Dir },
        { col: "1W", v: "+8.5%", dir: "up" as Dir },
        { col: "1M", v: "+1.7%", dir: "up" as Dir },
        { col: "1Y", v: "+137.9%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "pass" },
        { k: "V", name: "Value", state: "fail" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "pass" },
        { k: "R", name: "Risk", state: "fail" },
      ] as Factor[],
    },
    {
      sym: "TORNTPHARM",
      screens: "{14}",
      price: "{5,139.90}",
      d: [
        { col: "1D", v: "+1.5%", dir: "up" as Dir },
        { col: "1W", v: "+3.6%", dir: "up" as Dir },
        { col: "1M", v: "−2.3%", dir: "down" as Dir },
        { col: "1Y", v: "+44.6%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "pass" },
        { k: "V", name: "Value", state: "fail" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "BHEL",
      screens: "{14}",
      price: "{406.45}",
      d: [
        { col: "1D", v: "−1.9%", dir: "down" as Dir },
        { col: "1W", v: "−2.6%", dir: "down" as Dir },
        { col: "1M", v: "−4.4%", dir: "down" as Dir },
        { col: "1Y", v: "+61.8%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "fail" },
        { k: "V", name: "Value", state: "pass" },
        { k: "M", name: "Momentum", state: "mixed" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "MOTHERSON",
      screens: "{13}",
      price: "{150.90}",
      d: [
        { col: "1D", v: "+0.6%", dir: "up" as Dir },
        { col: "1W", v: "+3.7%", dir: "up" as Dir },
        { col: "1M", v: "+2.2%", dir: "up" as Dir },
        { col: "1Y", v: "−8.4%", dir: "down" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "mixed" },
        { k: "V", name: "Value", state: "pass" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "pass" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "REDINGTON",
      screens: "{13}",
      price: "{320.55}",
      d: [
        { col: "1D", v: "+3.1%", dir: "up" as Dir },
        { col: "1W", v: "−1.4%", dir: "down" as Dir },
        { col: "1M", v: "+14.8%", dir: "up" as Dir },
        { col: "1Y", v: "+3.0%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "mixed" },
        { k: "V", name: "Value", state: "pass" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "fail" },
      ] as Factor[],
    },
    {
      sym: "ABCAPITAL",
      screens: "{12}",
      price: "{405.00}",
      d: [
        { col: "1D", v: "−0.7%", dir: "down" as Dir },
        { col: "1W", v: "+2.8%", dir: "up" as Dir },
        { col: "1M", v: "−3.1%", dir: "down" as Dir },
        { col: "1Y", v: "+50.8%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "fail" },
        { k: "V", name: "Value", state: "mixed" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "COFORGE",
      screens: "{12}",
      price: "{1,842.30}",
      d: [
        { col: "1D", v: "+1.1%", dir: "up" as Dir },
        { col: "1W", v: "+4.2%", dir: "up" as Dir },
        { col: "1M", v: "+7.4%", dir: "up" as Dir },
        { col: "1Y", v: "+22.6%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "pass" },
        { k: "V", name: "Value", state: "fail" },
        { k: "M", name: "Momentum", state: "pass" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "CDSL",
      screens: "{11}",
      price: "{1,288.75}",
      d: [
        { col: "1D", v: "−0.4%", dir: "down" as Dir },
        { col: "1W", v: "−3.9%", dir: "down" as Dir },
        { col: "1M", v: "−11.4%", dir: "down" as Dir },
        { col: "1Y", v: "+28.2%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "pass" },
        { k: "V", name: "Value", state: "fail" },
        { k: "M", name: "Momentum", state: "fail" },
        { k: "G", name: "Growth", state: "pass" },
        { k: "R", name: "Risk", state: "mixed" },
      ] as Factor[],
    },
    {
      sym: "TITAN",
      screens: "{11}",
      price: "{3,404.10}",
      d: [
        { col: "1D", v: "+0.9%", dir: "up" as Dir },
        { col: "1W", v: "+1.8%", dir: "up" as Dir },
        { col: "1M", v: "+2.9%", dir: "up" as Dir },
        { col: "1Y", v: "−1.6%", dir: "down" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "pass" },
        { k: "V", name: "Value", state: "fail" },
        { k: "M", name: "Momentum", state: "mixed" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "pass" },
      ] as Factor[],
    },
    {
      sym: "IRCTC",
      screens: "{10}",
      price: "{742.85}",
      d: [
        { col: "1D", v: "−1.2%", dir: "down" as Dir },
        { col: "1W", v: "−5.2%", dir: "down" as Dir },
        { col: "1M", v: "−6.8%", dir: "down" as Dir },
        { col: "1Y", v: "+9.4%", dir: "up" as Dir },
      ],
      factors: [
        { k: "Q", name: "Quality", state: "mixed" },
        { k: "V", name: "Value", state: "mixed" },
        { k: "M", name: "Momentum", state: "fail" },
        { k: "G", name: "Growth", state: "mixed" },
        { k: "R", name: "Risk", state: "pass" },
      ] as Factor[],
    },
  ],
} as const;

export const EXPLORE_DECODE = {
  eyebrow: "MORNING DECODE",
  edition: "ED. {056}",
  title: "Six stocks the machine is watching",
  meta: "{11} min · morning brief",
  date: "{Sun, 2 Aug}",
  scrubStart: "0:00",
  scrubEnd: "{11:00}",
  link: "Read the brief",
} as const;

export const EXPLORE_HEAT = {
  label: "SECTOR HEATMAP · 1D",
  /* A count of what is drawn, so it carries no braces: it is true of the
     picture rather than a claim about the market. */
  unit: "sectors",
  rows: [
    {
      h: 46,
      cells: [
        { n: "IT", v: "+0.9%", dir: "up" as Dir, w: 50, m: 1 },
        { n: "Financial Services", v: "−0.5%", dir: "down" as Dir, w: 50, m: 0.62 },
      ],
    },
    {
      h: 30,
      cells: [
        { n: "Private Bank", v: "−0.6%", dir: "down" as Dir, w: 29, m: 0.75 },
        { n: "Auto", v: "+0.6%", dir: "up" as Dir, w: 29, m: 0.66 },
        { n: "Oil & Gas", v: "−0.3%", dir: "down" as Dir, w: 42, m: 0.38 },
      ],
    },
    {
      h: 24,
      cells: [
        { n: "Pharma", v: "+0.4%", dir: "up" as Dir, w: 26, m: 0.44 },
        { n: "FMCG", v: "−0.1%", dir: "down" as Dir, w: 22, m: 0.12 },
        { n: "Metal", v: "−0.8%", dir: "down" as Dir, w: 25, m: 1 },
        { n: "Infra", v: "+0.5%", dir: "up" as Dir, w: 27, m: 0.55 },
      ],
    },
  ],
} as const;

/* -----------------------------------------------------------------------------
   02 · SCREENS, the library that runs itself.
   -------------------------------------------------------------------------- */

export const SCREENS_ASOF = "as of {21 Aug} close";

export const FEATURED_SCREENS = {
  label: "FEATURED SCREENS",
  members: "members",
  more: "more",
  fresh: "new today",
  items: [
    {
      n: "Momentum Leaders",
      what: "Top relative-strength names still printing higher highs into this week.",
      count: "{22}",
      uni: "NIFTY 500",
      members: ["TCS", "PERSISTENT", "COFORGE", "ASTRAL", "IEX"],
      more: "{3}",
      fresh: "{5}",
    },
    {
      n: "Golden Crossover",
      what: "The 50-day is back above the 200-day, with volume behind the cross.",
      count: "{18}",
      uni: "NIFTY 500",
      members: ["HDFCBANK", "CANBK", "BAJFINANCE", "POLICYBZR", "CDSL"],
      more: "{3}",
      fresh: "{5}",
    },
    {
      n: "Volume Breakout Desk",
      what: "Price clearing a range high on volume well above its own median.",
      count: "{14}",
      uni: "ALL NSE",
      members: ["DEEPAKNTR", "SUPREMEIND", "MANAPPURAM", "BSE", "WIPRO"],
      more: "{3}",
      fresh: "{3}",
    },
  ],
} as const;

export const SCREEN_TABS = {
  active: "Chart Patterns",
  items: [
    "All categories",
    "Chart Patterns",
    "Momentum & Technical",
    "Multi-Factor",
    "Price & Volume Action",
    "Technical Indicators",
    "Value & Quality",
  ],
} as const;

export type ScreenBias = "BULLISH" | "BEARISH" | "MIXED";

export const PATTERN_SCREENS = {
  headers: { symbol: "SYMBOL", since: "SINCE FEATURED" },
  viewAll: "View all",
  stocks: "stocks",
  items: [
    {
      n: "Cup & Handle",
      count: "{12}",
      bias: "BULLISH" as ScreenBias,
      rows: [
        { sym: "PERSISTENT", d: "+{6.4}%", dir: "up" as Dir, on: "{8 Aug}" },
        { sym: "ASTRAL", d: "+{3.1}%", dir: "up" as Dir, on: "{5 Aug}" },
        { sym: "DEEPAKNTR", d: "−{2.7}%", dir: "down" as Dir, on: "{2 Aug}" },
        { sym: "SUPREMEIND", d: "+{1.2}%", dir: "up" as Dir, on: "{1 Aug}" },
      ],
    },
    {
      n: "Head & Shoulders",
      count: "{8}",
      bias: "BEARISH" as ScreenBias,
      rows: [
        { sym: "POLICYBZR", d: "−{8.3}%", dir: "down" as Dir, on: "{12 Aug}" },
        { sym: "CANBK", d: "−{5.1}%", dir: "down" as Dir, on: "{7 Aug}" },
        { sym: "BSE", d: "−{2.4}%", dir: "down" as Dir, on: "{9 Aug}" },
        { sym: "IRCTC", d: "−{1.1}%", dir: "down" as Dir, on: "{4 Aug}" },
      ],
    },
    {
      n: "Ascending Triangle",
      count: "{10}",
      bias: "BULLISH" as ScreenBias,
      rows: [
        { sym: "HDFCBANK", d: "+{4.2}%", dir: "up" as Dir, on: "{11 Aug}" },
        { sym: "TITAN", d: "+{2.9}%", dir: "up" as Dir, on: "{6 Aug}" },
        { sym: "WIPRO", d: "−{0.6}%", dir: "down" as Dir, on: "{13 Aug}" },
        { sym: "CAMS", d: "+{0.4}%", dir: "up" as Dir, on: "{3 Aug}" },
      ],
    },
    {
      n: "Double Top",
      count: "{11}",
      bias: "BEARISH" as ScreenBias,
      rows: [
        { sym: "CDSL", d: "−{11.4}%", dir: "down" as Dir, on: "{10 Aug}" },
        { sym: "BAJFINANCE", d: "−{5.7}%", dir: "down" as Dir, on: "{6 Aug}" },
        { sym: "INFY", d: "+{0.8}%", dir: "up" as Dir, on: "{13 Aug}" },
        { sym: "TITAN", d: "−{2.2}%", dir: "down" as Dir, on: "{2 Aug}" },
      ],
    },
    {
      n: "Rising Wedge",
      count: "{8}",
      bias: "BEARISH" as ScreenBias,
      rows: [
        { sym: "MANAPPURAM", d: "−{7.9}%", dir: "down" as Dir, on: "{10 Aug}" },
        { sym: "IRCTC", d: "−{5.2}%", dir: "down" as Dir, on: "{12 Aug}" },
        { sym: "MARICO", d: "−{3.8}%", dir: "down" as Dir, on: "{2 Aug}" },
        { sym: "SJVN", d: "+{0.9}%", dir: "up" as Dir, on: "{5 Aug}" },
      ],
    },
    {
      n: "Channel",
      count: "{11}",
      bias: "MIXED" as ScreenBias,
      rows: [
        { sym: "RELIANCE", d: "+{2.1}%", dir: "up" as Dir, on: "{11 Aug}" },
        { sym: "SJVN", d: "−{1.8}%", dir: "down" as Dir, on: "{5 Aug}" },
        { sym: "CAMS", d: "−{0.3}%", dir: "down" as Dir, on: "{8 Aug}" },
        { sym: "COFORGE", d: "+{1.6}%", dir: "up" as Dir, on: "{1 Aug}" },
      ],
    },
  ],
} as const;

export const POPULAR_SCREENS = {
  label: "POPULAR SCREENS",
  items: [
    { n: "MACD Bullish", count: "{32}" },
    { n: "Hammer Pattern", count: "{24}" },
    { n: "Momentum Leaders", count: "{22}" },
    { n: "Bull Flag", count: "{22}" },
    { n: "Bollinger Squeeze", count: "{19}" },
    { n: "Golden Crossover", count: "{18}" },
    { n: "Quality Compounders", count: "{18}" },
  ],
} as const;

/* -----------------------------------------------------------------------------
   03 · BACKTESTING, honest by architecture.

   The equity curve is computed from the leg ledger rather than drawn, so the
   curve, the drawdown span and the summary numbers cannot disagree with each
   other. That is the surface's whole argument, and a hand-drawn polyline with
   hand-written statistics beside it would be an argument the drawing does not
   support.
   -------------------------------------------------------------------------- */

export const BACKTEST = {
  title: "Backtest Results",
  costs: "Costs OFF",
  costsDetail: "gross of brokerage and taxes",
  tabs: ["Overview", "Performance"],
  metricsLabel: "KEY METRICS",
  curveLabel: "EQUITY CURVE · CUMULATIVE P&L, ₹",
  window: { sessions: "{30}", lot: "{75}", from: "{3 Nov}", to: "{15 Dec}" },
  sessionsNote: "{30} sessions · as of close",
  axis: ["{3 Nov}", "{17 Nov}", "{1 Dec}", "{15 Dec}"],
  logLabel: "TRADE LOG",
  disclaimer: "Historical simulation on settled data. Not live performance, not forward-tested.",
} as const;

/** Per-leg profit and loss, in rupees. The curve is the running sum of these. */
export const BT_LEG_PNL = [
  1116, -1644, 1218, 852, -576, -1908, 1734, 1026, -528, 1476, 804, -1242, 774, -378, 1068,
  -1446, 576, -912, -2514, 828, -1716, -1044, 1290, -2028, -732, 1002, -2454, -1548, 1158,
  -2226, -1116, 852, -1764, -1368, 1056, -2058, -1314, 948, -2322, -966, 1224, -1908, -1476,
  774, -1644, -1098, 1002, -2454, -1368, 876, -1872, 1428, 1116, -852, 1962, 1278, -1008,
  2466, 1764, 3468,
] as const;

/**
 * "Short" rather than "Sell", and the change is deliberate. The leg is a sold
 * option either way; "short" is the position word and "sell" is the instruction
 * word, and doc 01 §8 keeps instruction words off this site.
 */
export const BT_TRADES = {
  headers: {
    n: "#",
    contract: "Contract",
    side: "Side",
    qty: "Qty",
    entry: "Entry",
    exit: "Exit",
    reason: "Exit reason",
    pnl: "P&L",
    capture: "Capture",
  },
  side: "Short",
  /* Entry, exit and quantity are numbers rather than braced strings because the
     row's profit and its capture are computed from them. The braces go on at
     render, through `staged()`, so nothing is displayed unmarked. */
  rows: [
    { n: 1, contract: "NIFTY 25900 CE · {4 Nov}", qty: 75, entry: 142.6, exit: 127.72, reason: "square-off" },
    { n: 2, contract: "NIFTY 25900 PE · {4 Nov}", qty: 75, entry: 138.15, exit: 160.07, reason: "stop-loss" },
    { n: 3, contract: "NIFTY 25950 CE · {4 Nov}", qty: 75, entry: 131.4, exit: 115.16, reason: "expiry" },
    { n: 4, contract: "NIFTY 25950 PE · {4 Nov}", qty: 75, entry: 129.85, exit: 118.49, reason: "expiry" },
    { n: 5, contract: "NIFTY 26000 CE · {11 Nov}", qty: 75, entry: 118.2, exit: 125.88, reason: "square-off" },
    { n: 6, contract: "NIFTY 26000 PE · {11 Nov}", qty: 75, entry: 124.55, exit: 149.99, reason: "stop-loss" },
    { n: 7, contract: "NIFTY 26050 CE · {11 Nov}", qty: 75, entry: 156.3, exit: 133.18, reason: "square-off" },
    { n: 8, contract: "NIFTY 26050 PE · {11 Nov}", qty: 75, entry: 151.05, exit: 137.37, reason: "square-off" },
  ],
} as const;

export const BT_STATS = {
  net: "NET P&L",
  drawdown: "MAX DRAWDOWN",
  expectancy: "EXPECTANCY",
  profitFactor: "PROFIT FACTOR",
  winTrades: "WIN RATE · LEGS",
  winDays: "WIN RATE · SESSIONS",
  avgWinLoss: "AVG WIN / AVG LOSS",
} as const;

/* -----------------------------------------------------------------------------
   04 · SECTOR ROTATION.

   Relative strength on the x axis, momentum on the y, both centred on 100. The
   tail is six weekly stops, oldest first, so a sector's direction is legible
   without an animation.
   -------------------------------------------------------------------------- */

export type Quadrant = "Leading" | "Improving" | "Weakening" | "Lagging";

export type RotationSector = {
  sector: string;
  rs: number;
  mom: number;
  quadrant: Quadrant;
  days: string;
  tail: ReadonlyArray<readonly [number, number]>;
};

export const ROTATION = {
  universe: "NIFTY",
  timeframe: "DAILY",
  tail: "6W TAIL",
  rankingLabel: "RANKING",
  sectorsVisible: "sectors",
  axisX: "Relative strength",
  axisY: "Momentum",
  headers: { sector: "SECTOR", quadrant: "QUADRANT", rs: "RS", mom: "MOM.", days: "DAYS" },
  /* The slider v1 draws above the plot. Static: this is a picture of a control,
     not a control. */
  tailScale: ["1W", "6W", "12W"],
  caption:
    "Sector rotation. Every sector plotted by relative strength against momentum, both centred on 100, with a six-week tail behind each head. The table states each sector's quadrant in words as well as in colour. Every figure is staged.",
} as const;

export const ROTATION_SECTORS: readonly RotationSector[] = [
  { sector: "IT", rs: 103.6, mom: 102.1, quadrant: "Leading", days: "{10}", tail: [[100.2, 99.4], [100.8, 100.3], [101.5, 101.0], [102.3, 101.5], [103.0, 101.9], [103.6, 102.1]] },
  { sector: "Consumer Durables", rs: 102.5, mom: 99.7, quadrant: "Weakening", days: "{15}", tail: [[103.4, 102.2], [103.3, 101.6], [103.1, 100.9], [102.9, 100.4], [102.7, 100.0], [102.5, 99.7]] },
  { sector: "Media", rs: 101.8, mom: 101.7, quadrant: "Leading", days: "{7}", tail: [[99.6, 99.8], [100.1, 100.4], [100.6, 100.9], [101.1, 101.3], [101.5, 101.6], [101.8, 101.7]] },
  { sector: "Auto", rs: 101.7, mom: 101.6, quadrant: "Leading", days: "{6}", tail: [[99.9, 100.1], [100.3, 100.6], [100.8, 101.0], [101.2, 101.3], [101.5, 101.5], [101.7, 101.6]] },
  { sector: "Realty", rs: 101.3, mom: 96.9, quadrant: "Weakening", days: "{7}", tail: [[102.6, 100.9], [102.4, 99.9], [102.1, 98.9], [101.9, 98.1], [101.6, 97.4], [101.3, 96.9]] },
  { sector: "Pharma", rs: 101.2, mom: 99.8, quadrant: "Weakening", days: "{5}", tail: [[101.9, 101.1], [101.8, 100.7], [101.6, 100.4], [101.5, 100.1], [101.3, 99.9], [101.2, 99.8]] },
  { sector: "Healthcare", rs: 100.9, mom: 99.8, quadrant: "Weakening", days: "{7}", tail: [[101.7, 101.0], [101.6, 100.7], [101.4, 100.4], [101.2, 100.2], [101.0, 100.0], [100.9, 99.8]] },
  { sector: "Oil & Gas", rs: 99.9, mom: 100.0, quadrant: "Lagging", days: "{6}", tail: [[100.6, 100.9], [100.4, 100.6], [100.3, 100.4], [100.1, 100.2], [100.0, 100.1], [99.9, 100.0]] },
  { sector: "FMCG", rs: 99.9, mom: 100.8, quadrant: "Improving", days: "{4}", tail: [[99.2, 99.2], [99.3, 99.6], [99.5, 100.0], [99.6, 100.3], [99.8, 100.6], [99.9, 100.8]] },
  { sector: "Metal", rs: 99.8, mom: 101.0, quadrant: "Improving", days: "{15}", tail: [[98.6, 98.8], [98.9, 99.3], [99.1, 99.8], [99.4, 100.3], [99.6, 100.7], [99.8, 101.0]] },
  { sector: "PSE", rs: 99.8, mom: 100.6, quadrant: "Improving", days: "{11}", tail: [[98.9, 99.0], [99.1, 99.4], [99.3, 99.8], [99.5, 100.1], [99.7, 100.4], [99.8, 100.6]] },
  { sector: "Infra", rs: 99.5, mom: 100.1, quadrant: "Improving", days: "{6}", tail: [[99.0, 99.1], [99.1, 99.4], [99.2, 99.6], [99.3, 99.8], [99.4, 100.0], [99.5, 100.1]] },
  { sector: "PSU Bank", rs: 99.4, mom: 100.5, quadrant: "Improving", days: "{7}", tail: [[98.8, 99.0], [98.9, 99.4], [99.1, 99.7], [99.2, 100.0], [99.3, 100.3], [99.4, 100.5]] },
  { sector: "Financial Services", rs: 99.2, mom: 99.2, quadrant: "Lagging", days: "{6}", tail: [[100.1, 100.3], [99.9, 100.0], [99.7, 99.8], [99.5, 99.6], [99.3, 99.4], [99.2, 99.2]] },
  { sector: "India Defence", rs: 99.2, mom: 99.9, quadrant: "Lagging", days: "{12}", tail: [[100.4, 100.6], [100.1, 100.4], [99.9, 100.2], [99.6, 100.1], [99.4, 100.0], [99.2, 99.9]] },
  { sector: "Private Bank", rs: 99.0, mom: 99.2, quadrant: "Lagging", days: "{8}", tail: [[99.9, 100.4], [99.7, 100.1], [99.5, 99.8], [99.3, 99.6], [99.1, 99.4], [99.0, 99.2]] },
  { sector: "Energy", rs: 99.0, mom: 100.0, quadrant: "Lagging", days: "{9}", tail: [[99.9, 100.7], [99.7, 100.5], [99.5, 100.4], [99.3, 100.2], [99.1, 100.1], [99.0, 100.0]] },
];
