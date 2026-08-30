# Backtesting — module one-pagers

Internal product context for landing page, onboarding copy, and external communications.
Grounded in the Equity Product Specification v1.2 Final and the Options Product Specification v1.1.

**What backtesting is, in one line:** describe a strategy in plain English, get an honest simulation of how it actually would have gone.

Two modules share one architecture and one philosophy. A trader types a strategy as a sentence. A widget returns it fully specified, with every parameter the prompt stated and a visibly marked default for everything it omitted. The trader edits anything, adds legs and rules, and submits. The spec freezes. The engine simulates it bar by bar against historical data, and the report returns the trade log, the metrics and a plain-language summary.

The differentiator across both is not that we backtest. It is *how honestly* we backtest, and how much of that honesty is visible to the user.

---

## 1. Equity Strategy Builder & Backtesting Engine

**What it is.** A no-code equity backtester driven by natural language. The user writes "Buy Tata Power on 15-min when the 20 EMA crosses above the 50 EMA and RSI is over 50; exit on the opposite cross or a 1% stop" and gets a complete, editable strategy plus a deterministic historical simulation of it.

**What it covers.** One traded instrument per run — an NSE or BSE listed stock in cash, or its single-stock future — intraday or positional. A full condition grammar: comparisons, crosses, state flips, band touches, level breaks, candle patterns, divergence, time and day-of-week predicates, combined with AND, OR and NOT at arbitrary nesting so the logic tree matches the sentence rather than flattening into a list of filters. A core indicator library across moving averages and VWAP, momentum oscillators, trend and volatility, and volume. Session-anchored price levels, statistical primitives, and a unified pivot definition underneath swings, support and resistance, Fibonacci and divergence.

On top of that: stop-losses, targets, trailing stops, time exits and signal exits; pyramiding; three re-entry variants; multi-timeframe joins; cross-instrument triggers; a Trend Gate that pauses the strategy when the broad market turns; and Basket Mode, which runs the same strategy across up to fifty stocks as independent simulations with a combined report.

**The problem it solves.** Backtesting today sits behind two walls. Either the user writes code — Python, Pine, AFL — which most traders will never do, or they use a rules-builder that constrains them to whatever conditions the form exposes, which is never the strategy they actually had in mind. So most retail strategies are never tested at all. They are adopted on the basis of a screenshot, run with real money, and abandoned after the first drawdown that nobody had measured in advance.

Meanwhile the tools that *do* test tend to flatter. Same-bar-close fills, forming-bar evaluation, and target-before-stop tie-breaks each add a few percent of imaginary edge, and the user has no way to know it happened.

**The idea worth selling.**

**Plain English in, complete spec out.** The parse must be faithful in both directions: every clause in the prompt appears in the spec, nothing is invented, and terse and verbose phrasings of the same strategy produce the same result. If the user did not ask for a stop-loss, one is not quietly added. Whatever the prompt omitted is filled from a published defaults table and shown in a *defaults bound* panel before the user confirms — so the user always knows exactly which numbers came from them and which came from us.

**Honesty is the product.** The engine's execution rules are deliberately conservative and each one is pinned to a single outcome:

- Conditions evaluate on **completed bars only**. The forming bar is never read. This is the single most common accidental look-ahead in the industry, and it flatters every entry.
- A signal on bar *t* fills at bar **t+1's open**, never at the signal bar's close.
- Stops and targets are detected on the bar's **high and low**, and fill at the level — not at the close, which understates losses on intrabar spikes.
- A bar that **gaps through** a level fills at the open, never at a price that never traded.
- When one bar breaches both stop and target, the **stop fills first**. Silent target-first resolution inflates win rates.
- Every trade carries exactly **one live stop level** that can tighten but never loosen.

None of these is a feature a user asks for. Collectively they are the difference between a backtest and a fantasy, and they are the thing that makes results worth acting on.

**Determinism.** The same strategy, on the same dates, on the same data, produces bit-for-bit identical trade logs — every run, forever. Not roughly the same: identical, to the last paisa and the last timestamp. A user who re-runs yesterday's test and sees different numbers concludes the platform is broken, and they are right to.

**Costs are opt-in and disclosed.** Defaults show gross results, and when costs are off the report header prints it. Slippage is applied adversely to every fill. Brokerage books one order per entry, exit, add, re-entry and roll leg. Gross basis is a disclosed choice, never a silent flattering one.

**Corporate actions are handled properly.** Price series are back-adjusted for splits and bonuses with volume adjusted inversely — otherwise a 1:5 split reads as an 80% overnight gap that fires every stop in the log and turns the whole run into fiction.

**Futures resolve from real contract metadata,** never from a weekday formula. Expiry weekdays have changed repeatedly across the data window, and a formula-derived calendar would anchor every expiry-relative rule to the wrong day and ask the data for contracts that never traded.

**Sweeps show the whole grid.** Ask for stop-losses from 0.5% to 3% and you get exactly those six runs, every cell displayed, with the ranking metric named — plus a mandatory curve-fitting caveat, because the best cell of any sweep is by construction the one most fitted to the past. Showing only the winner, and hiding that its neighbours lost money, is the most misleading thing a sweep can do.

**Basket Mode is the bridge from the screener.** A screener result becomes the basket input, so "find me these stocks" flows directly into "and test this strategy on all of them."

**Who it's for.** Traders with a rule-based idea and no way to test it — which is most rule-based traders in the market. Also the systematic trader who currently uses TradingView or Amibroker and wants Indian-market execution semantics without maintaining code.

**Comms angle.** "Test it before you trade it — honestly." Lead with the anti-look-ahead rules stated plainly: *we fill at the next bar's open, not the signal bar's close.* Traders who have been burned by optimistic backtests understand instantly why that sentence matters, and it is a claim competitors cannot casually match.

---

## 2. Options Strategy Builder & Backtesting Engine

**What it is.** The same natural-language builder and the same simulation discipline, applied to options. "Sell the 9:20 NIFTY straddle with 25% SL on each leg, re-enter once on SL, square off 15:15" becomes a two-leg spec in a review widget with every parameter pre-filled, editable, and then simulated minute by minute against historical option chains.

**What it covers.** NSE index options — NIFTY, BANKNIFTY, FINNIFTY, MIDCPNIFTY — BSE index options in SENSEX and BANKEX, and NSE stock options. Buyer and seller journeys are both first-class: intraday directional buying, positional buying, long-volatility structures, debit spreads, calendars and diagonals on one side; intraday premium selling, positional theta selling, credit spreads, iron structures and covered calls on the other.

Legs are specified by side, type, lots, strike rule and expiry rule, with strikes selectable by ATM offset, premium, or delta — all resolved from the entry-minute chain snapshot. Entry styles run from time-anchored to signal-based to opening-range breakout to days-to-expiry anchored. Regime filters on VIX, IV percentile and put-call ratio enter the condition tree as vetoes.

Then the parts that separate options from equities: **Wait & Trade**, **Move SL to Cost**, per-leg and strategy-level risk, and a full **adjustment toolkit** — branch logic, delta-band rebalancing with hysteresis, hedge add and remove, and re-anchoring.

**The problem it solves.** Options backtesting is where the gap between what retail traders do and what they can verify is widest. Premium selling is the most popular systematic activity in Indian markets, and almost none of it is tested — because doing so requires per-minute option chain history, correct expiry handling across years of changing contract specifications, and execution semantics that most platforms get wrong.

The platforms that do offer it typically get the hard parts subtly wrong in the direction of the user's hopes, which for a seller is dangerous. Selling strategies win most days and lose badly on a few. A backtest that quietly softens the bad days does not just overstate returns, it misrepresents the entire risk profile of the strategy.

**The idea worth selling.**

**The full seller's toolkit, specified precisely.** These are not generic backtest features — they are the specific mechanics premium sellers actually use, and each is defined to the edge case:

*Wait & Trade* — instead of entering at the strategy's entry time, a leg watches its premium and enters only after it has moved a stated amount from the reference. The rule everything depends on: once armed, the leg's stop and target compute from the **armed** entry premium, never from the reference. Mis-basing the stop on the reference is the most common implementation bug in the market, and getting it right changes the result materially. Legs arm independently — in a straddle, one side can arm at 09:34, the other at 10:02, or never. A leg that never arms produces no trade, no costs, and a visible "not armed" tag rather than a blank cell.

*Move SL to Cost* — the seller's damage-control rule. The moment any leg's stop is hit, every surviving leg's stop moves to its own entry premium, capping the day's damage at the stopped leg's loss. It fires once, respects the never-loosen rule, triggers only on stops, and logs every modification so the day-wise table explains why a survivor exited at its entry price.

*Adjustments and journeys* — the mid-flight playbook. "If the CE leg's SL hits, sell a fresh ATM CE." "If NIFTY moves 100 points, shift the strangle one strike." "Keep net delta inside ±0.25." Each is a when-then rule with a trigger budget, executed in declared order with the position audited after every action.

**Multi-leg atomicity.** All legs of a structure fill from the *same* minute snapshot, at entry and at every adjustment. Sequential leg fills create phantom leg-in risk and net credits that cannot be reproduced. Wait & Trade legs are the one sanctioned exception, because detaching from entry timing is the entire point of the feature.

**The bar loop, in one line: close-phase decides, next open-phase acts.** Each bar runs three fixed phases — act on what was scheduled, defend open positions against stops and targets, then decide and schedule for the next bar. Nothing fills in the decide phase. That single ordering is the whole anti-look-ahead architecture, and determinism falls out of the structure rather than needing to be policed.

**Expiry and settlement handled the way the market actually works.** Open positions square off at 15:15 on expiry day by default — which is what brokers do to retail positions. An explicit hold-to-expiry on index options settles at the Final Settlement Price, the underlying's last-half-hour weighted average, not the 15:30 option snapshot. Covered calls that finish in the money are called away and accounted as such. Stock options carry a mandatory disclosure that the simulation books cash settlement while real trading would give or take delivery.

**Everything resolves from real contract metadata.** Expiry weekdays, strike steps and lot sizes have all changed repeatedly since 2021. A formula-derived calendar would roll on the wrong dates and request contracts that never existed. A missing contract surfaces as a data-gap error rather than a silent fallback.

**Greeks are read, never modelled.** Delta and implied volatility come from the chain snapshot itself. No pricing model runs inside the engine, so there is no model risk sitting between the user and their result.

**Descriptive, never advisory.** Results describe what happened historically. "Should I deploy this?" is redirected to descriptive framing. Look-ahead bait — "buy at the day's low" — is rejected with an explanation and an honest nearest equivalent. Impossible claims are corrected rather than simulated.

**Who it's for.** Premium sellers running systematic intraday and positional structures, and directional options buyers who want their setup tested rather than assumed. This is the most sophisticated audience the product serves and the least well served by existing tools.

**Comms angle.** "Every rule a seller actually uses — Wait & Trade, Move SL to Cost, adjustments — tested against real chain data." Name the specific mechanics. This audience recognises them immediately, and recognising them is the proof that the product was built by people who understand what they do.
