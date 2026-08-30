# Explore — surface one-pagers

Internal product context for landing page, onboarding copy, and external communications.
Grounded in the v2 dev-handover designs. Items not yet built are marked.

**What Explore is, in one line:** the part of Tradl you can use before you know what to ask.

Chat is the core of the product, but a blank prompt is a hard start. A user who has just signed up rarely knows what a good screening question sounds like, and an experienced trader opening the app at 9am does not want to type — they want to see. Explore answers "what should I look at today": curated screens, a strategy library, live rotation maps, sector heat, scored news, a catalyst calendar, and a daily brief.

Every surface here is a doorway into the same machinery chat drives. A user arriving with no question should leave with a saved screen, a stock page open, or a screener running.

Explore sits entirely inside auth. It is the logged-in home for a user with no active question.

---

## 1. Explore Home

**What it is.** The landing surface inside the product — one screen that answers "what is happening, and what should I look at."

**What's on it.** Live index cards for Nifty 50, Sensex, Bank Nifty and Nifty IT. A leaderboard of stocks ranked by how many screens they currently appear in, each showing price action across 1D, 1W, 1M and 1Y alongside its QVMGR factor scores. Curated screens cut by sentiment. Strategy cards. A right rail carrying today's Morning Decode with audio, the sector heat map, top news, and this week's catalysts.

**The problem it solves.** The empty-state problem, which is where most analysis tools lose users. A screener that opens on a blank condition builder assumes the user already has a hypothesis. Most sessions do not start with one — they start with vague awareness that something moved and no idea where to look. Home converts that into a specific starting point within one screen of scrolling.

**The idea worth selling.** The leaderboard is not a gainers list, and the distinction matters. It ranks by *how many independent screens a stock is currently passing*. A stock appearing in fifteen screens simultaneously is being picked up by fifteen unrelated sets of conditions — momentum, value, chart pattern, volume. That is a fundamentally different signal from "it went up 4% today." Price-move rankings tell you what already happened; this tells you what a wide range of methods currently agree on.

The QVMGR scores beside each name compound it: Quality, Value, Momentum, Growth and Risk, each scored out of ten platform-wide, plus a sector-relative standing. A user can see that a stock sits in twelve screens, scores 8 on quality and 3 on value, and form a view in about four seconds.

**Who it's for.** Every logged-in user, but it earns its place with the user who opens the app with no specific idea — which, on most days, is most users.

**Comms angle.** "Start with the market, not a blank box." Home is proof that Tradl has an opinion before you type anything.

---

## 2. Screens

**What it is.** A catalogue of ready-made stock screens, built and maintained by Tradl, public to every user.

**What's on it.** Screens organised across chart patterns, momentum and technical, multi-factor, price and volume action, technical indicators, and value and quality — filterable by bullish, bearish or neutral. Every card carries the live stock count, the universe it runs against, a preview of its current top constituents, and how many names entered today. Featured screens sit at the top. Rails carry the most popular screens and the ones the user viewed recently.

**The problem it solves.** Screening has a knowledge barrier before it has a usage barrier. A user has to know that "cup and handle" is a thing, that it can be expressed as conditions, and roughly what thresholds are sensible, before a screener is of any use. That barrier is why most retail screeners get opened once and abandoned. The catalogue removes the first step entirely: the conditions are already written, tested, and running.

**The idea worth selling.** These are not static lists. Every screen re-runs against live market data, so "12 stocks · NIFTY 500 · 5 new today" is a statement about the current session, not a file someone updated last week. The *new today* count does the most work — it is the difference between a reference list and a signal. A user checking Golden Crossover each morning is watching a live condition set, and the only thing they needed to know was the name of the pattern.

The categories also function as an education layer. A user moving between "Value & Quality" and "Price & Volume Action" is learning that these are different families of thinking about the same market, without being taught.

**Who it's for.** New users who need to see what a screen even is, and returning users sweeping across pattern or factor families before committing to an idea.

**Comms angle.** "Screens that run themselves." Lead with freshness — *new today* is the product.

---

## 3. Screen Detail

**What it is.** The results surface for any screen, and the most important screen in the product — because it is the same component chat produces when it builds a screen from a sentence.

**What's on it.** Matching stocks with screen-specific metric columns — for a cup-and-handle screen that means cup depth, handle pullback, breakout volume, 200-day average — sortable and filterable per column. A universe switcher. Quick-filter chips with steppers to tighten or loosen individual conditions. A chart view pairing each stock's candles with its QVMGR factor scores and sector standing, where any factor opens the metrics underneath it. Save, share, refresh.

**The problem it solves.** Curated content usually dead-ends. The user reads someone else's list, disagrees with one parameter, and has nowhere to go — accept it as published, or rebuild from scratch somewhere else. Screen Detail closes that gap by making every published screen editable in place.

**The idea worth selling.** Two things, both strategic.

**Refinement without rebuilding.** A user can take a Tradl screen, push the 3-month return threshold from 15% to 25%, drop the universe from NIFTY 500 to large caps, watch the count fall from eighteen names to six, and save that as their own. They have authored a custom screen without writing a condition or learning any syntax. The catalogue is a starting point, not a fixed menu — and this is the moment a browsing user becomes an owning user.

**One surface, either direction.** Whether a screen arrived from the catalogue or from a sentence typed into chat, the user lands on an identical results view with identical controls, columns and save behaviour. There is no "AI output" mode sitting beside a "real screener" mode. Most conversational tools in this category generate a dead artifact — a static answer you cannot manipulate. Ours is the live product surface. This is the hardest claim for a competitor to copy, because it is an architectural decision made early rather than a feature added later.

The chart view carries the third argument: factor scores sit directly beside price action, so a user evaluating a technical breakout sees in the same glance that the company scores 3 on quality. Screening on one dimension while checking another is normally two tools.

**Who it's for.** Every user who gets past browsing. This is where value is realised and where saving happens.

**Comms angle.** "Take ours. Make it yours." Browsing to owning is three clicks and no syntax.

---

## 4. Strategies

**What it is.** A library of trading strategies across equity and options, each published with its backtested results.

**What's on it.** Strategies grouped by approach — momentum, quality, income, market neutral, tactical — and by risk band. Each carries its backtested return and maximum drawdown, its category and risk classification, and its equity curve. A popularity rail ranks the library.

**The problem it solves.** Strategy content in Indian markets is almost entirely unevidenced. It arrives as a tip, a screenshot or a claim, and the user has no way to know whether the approach has ever worked across a full cycle or whether they are being shown one good quarter. Meanwhile the tools that *can* test a strategy properly require the user to build it first — which means knowing how to express it and having clean historical data. The library sits between the two: strategies that already exist, already tested, with the drawdown shown next to the return.

**The idea worth selling.** **Drawdown is published as prominently as return.** A strategy showing +11.2% backtested against a -4.1% maximum drawdown is a completely different proposition from one showing +14.6% against -7.2%, and the second number decides whether a real person can actually hold the position through it. Most strategy marketing shows the first and buries the second. Showing both at the same size is a trust position — cheap to state, and very hard for a tipping culture to copy.

**Equity and options in one library.** Options strategies — iron flies, cash-secured puts, volatility risk premium — are usually confined to specialist platforms with a steep learning curve, and are almost never presented in the same frame as equity approaches. A user comparing a momentum sleeve against a market-neutral options structure on the same measures is doing portfolio-level thinking that the tooling normally prevents.

**Risk bands** make the library navigable by the axis users actually care about: how much this could hurt. Filtering by low, medium or high risk is a more honest entry point than filtering by expected return, and it sets expectations before the user commits attention.

**Who it's for.** Users who have moved past picking individual stocks and think in terms of repeatable approaches — and options traders, who are underserved everywhere.

**Comms angle.** "Every strategy, with the drawdown attached." Show backtested performance and maximum drawdown together in any creative; the honesty is the differentiator.

*Comms constraint: publish backtested results only. Do not present or imply live or forward-tested performance. Current designs label a figure as live return — correct before launch.*

---

## 5. News

**What it is.** A market news feed built for position-holders rather than readers.

**What's on it.** A spotlight story, a featured strip, and a categorised feed across markets, banking, IT and tech, commodities, auto and macro. Every article carries the tickers it affects and a sentiment-and-impact read — direction plus strength. A watchlist strip surfaces news for the stocks the user actually holds, grouped by ticker. Trending and Most Read run as separate feeds. Article tickers link straight to stock pages.

**The problem it solves.** Financial news is optimised for volume and headline appeal, not for whether the reader owns anything affected. A user holding six stocks scrolls forty stories to find the two that matter, and still cannot tell from a headline whether a story is directionally good, bad, or noise dressed as news.

**The idea worth selling.** Two filtering layers general news does not have.

**Sentiment × impact.** Each story is scored on direction — bullish, bearish, neutral — and on strength of impact. The user knows before reading whether a story is directional and whether it is big. That turns a scroll into a scan, and it is the difference between a feed and a signal.

**The watchlist cut.** The first thing the user sees is news about their own positions, not the loudest headline of the day. Relevance is set by what they hold rather than by what is trending, which inverts the default logic of every news product.

Ticker links close the loop: a story about a bank is one click from its stock page, its factor scores, and every screen it currently passes. News stops being a separate reading activity and becomes an entry point into analysis.

**Who it's for.** Users with existing exposure who need to know what moved and whether it matters to them.

**Comms angle.** "News scored, not just sorted." Lead with the watchlist cut.

*Not yet built: the in-app article panel with affected tickers and price chart.*

---

## 6. Calendar

**What it is.** A forward calendar of the events that move prices.

**What's on it.** Earnings, quarterly results, board meetings, ex-dividend dates and macro prints — filterable by type, each with its company, ticker and timing, including whether it lands before or after market close. A feed view for reading forward in sequence and a month view for planning. Events carry an impact classification. Clicking an event opens its detail.

**The problem it solves.** Most retail losses around known events are not analytical failures, they are calendar failures — holding into a result nobody checked for, being surprised by an ex-dividend adjustment. The information is public but scattered across a dozen sources, so nobody assembles it consistently.

**The idea worth selling.** It is a *catalyst* calendar, not a corporate diary. Everything on it is an event with a plausible price consequence, and each is attached to a ticker, so the calendar connects to the rest of the product rather than sitting beside it. Timing detail matters more than it looks: knowing results land after market close, or that monthly expiry falls on a given Thursday, changes position sizing on the day before.

The type filters map onto genuinely different behaviours — an earnings trader and a dividend-focused investor want entirely different rows from the same list.

**Who it's for.** Anyone positioning ahead of a known date: results season, policy decisions, expiry weeks.

**Comms angle.** "Know what's coming before it moves." Pairs naturally with the Morning Decode's upcoming catalysts.

*Not yet built: the feed/calendar view toggle and month navigation.*

---

## 7. Sectors — Relative Rotation Graph

**What it is.** A rotation map showing where every sector sits on two axes — relative strength against the benchmark, and momentum — and, critically, which direction it is travelling.

**What's on it.** All sectors plotted across four quadrants: leading, weakening, lagging, improving. Adjustable trails showing each sector's recent path. Daily and weekly timeframes. Benchmark switching. A playback control that animates the last several weeks so rotation can be watched rather than inferred. A ranking table carrying relative strength, momentum and days-in-quadrant, with per-sector visibility toggles for isolating a comparison. Any sector drills into the same map rebuilt for the stocks inside it.

**The problem it solves.** Sector analysis is normally delivered as a table of returns, which describes the past and hides the trajectory. A sector up 3% this month could be accelerating or rolling over and the number is identical either way. Traders end up rotating into strength exactly as it peaks.

**The idea worth selling.** **Direction beats position.** A sector that is lagging but *improving* is a completely different trade from one that is leading but *weakening*, and no return table can tell them apart. The trails make trajectory visible; the quadrants make it interpretable. Days-in-quadrant adds a third dimension — a sector leading for two days is a different proposition from one leading for fifteen.

**The replay is the demo.** Playing the last several weeks turns rotation from an abstraction into something the user watches happen, sectors sweeping clockwise through the quadrants. It communicates the entire concept in about ten seconds, which no static explanation manages.

**The drill-down is what converts.** Identify that IT is rotating into leading, click it, and the same map redraws with IT's constituent stocks on the same axes — market-level read to specific name to stock page without leaving the analysis. Sector rotation is only actionable if it terminates in a ticker, and most tools stop one level short.

**Who it's for.** Swing and positional traders who allocate by sector before selecting stocks. The most analytically serious surface in Explore, and the one that signals the product is built for people who know what they are doing.

**Comms angle.** "See rotation, don't guess it." Play the replay in every demo — it sells itself.

---

## 8. Heatmap

**What it is.** The fastest possible read on the market's shape today.

**What's on it.** Every sector as a tile, sized by market capitalisation and coloured by return, across 1D, 1W, 1M and 1Y. Any sector opens into its constituent stocks in the same layout. Stock tiles lead to stock pages.

**The problem it solves.** Index-level numbers hide everything that matters. "Nifty closed flat" can mean nothing happened, or that IT rallied hard while financials sold off and the two cancelled out. The user needs the distribution, not the average, and needs it in one glance.

**The idea worth selling.** **Size carries weight.** Tiles are scaled by market cap, so the map shows what actually moved the index rather than what moved most in percentage terms. A small stock up 8% is a small tile; a heavyweight down 1% dominates the frame. That is an accurate picture of where the money went, and a sorted percentage list is not.

The timeframe switch turns one surface into two products: at 1D it is a session monitor; at 1M and 1Y it becomes a leadership tool showing which sectors carried the market across a full cycle.

Two clicks take a user from "the market is green" to the specific stock responsible.

**Who it's for.** Everyone. The lowest-effort surface in the product, and often the first one a new user genuinely understands.

**Comms angle.** Best used as a visual, not a description. Strong landing-page candidate — it communicates instantly with no explanation.

---

## 9. Morning Decode

**What it is.** A daily pre-market brief for Indian markets, published as both a written edition and audio.

**What's on it.** Each edition runs across trade setups for the major indices, the previous session's action, a sector lens carrying a live rotation view, stocks in focus, chart pattern candidates, key developments split across global and India, upcoming catalysts exportable to a calendar, and a graded track record of prior calls. Audio for the full brief, playable while the user works elsewhere in the product. Editions filter by played, unplayed and in progress. A back catalogue and a public scorecard sit alongside.

**The problem it solves.** The pre-open window is short, information-dense, and the worst possible time to read. Users need the overnight picture, the levels that matter, and the day's catalysts in a form that survives being consumed on a commute or between other tasks.

**The idea worth selling.** Three things, in this order.

**The track record is public and graded.** Decode versus Reality scores prior calls against what actually happened. Almost no market commentary in this market publishes its own hit rate, because almost none would survive it. Publishing it — with a permanent scorecard page a user can browse before subscribing — is the strongest credibility asset the company has. It is also self-reinforcing: it forces the editorial standard up, because every call will be marked.

**It is not a newsletter.** Inside an edition, the sector lens carries a live rotation map the reader can replay; stocks in focus link to full stock pages and add to watchlists; upcoming catalysts export to a calendar; and "Screen this sector" hands off directly into the screener with the conditions pre-built. Reading the brief and acting on it happen in the same session, in the same product. A PDF or an email cannot do any of this — the moment a user wants to act they have to leave, and most do not come back.

**Audio.** The full brief is listenable during the exact window when reading is impractical, and playback continues while the user moves around the rest of the product. Editions track as in progress, so a brief started on the commute finishes at the desk.

Interactive elements — the prediction game on trade setups, the reader poll — turn a passive read into a habit and give the user a stake in the next edition.

**Who it's for.** Daily-active traders. Because editions are self-contained, dated and shareable, this is also the strongest top-of-funnel asset in the product.

**Comms angle.** "We publish our hit rate." Lead with the scorecard; everything else follows from the credibility it buys.
