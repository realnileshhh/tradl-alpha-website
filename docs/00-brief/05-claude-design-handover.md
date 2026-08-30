# TRADL AI · CLAUDE DESIGN HANDOVER PACKAGE
### Alpha Launch Website · v1.0 · Aug 2026
Workflow: wireframe → DS-native prototype → team build. Design system is bound inside Claude Design (skip token setup). Feed this doc + docs 01–04 into the Claude Design project as context, then run the numbered prompts in order.

---

## 1 · BUILD ORDER (dependency-sequenced)

| # | Deliverable | Depends on | Round |
|---|---|---|---|
| W0 | Shared shell: nav, footer, section anatomy, chip/pill/eyebrow components | DS | Wireframe |
| W1 | Homepage | W0 | Wireframe |
| W2 | Playground hero component (deep spec) | W1 | Wireframe |
| W3 | /edge product overview | W0, tool-map data | Wireframe |
| W4 | Tool detail template + AI Screener page | W0 | Wireframe |
| W5 | /decode hub + edition page template | W0 | Wireframe |
| W6 | Stock page conversion wrapper (anon states, contextual CTAs) | Stock Page Proto v5 | Wireframe |
| W7 | /start sign-up flow (all steps + entry-context variants) | W1, W6 | Wireframe |
| W8 | /manifesto + /events | W0 | Wireframe |
| W9 | Mobile passes for W1, W2, W6, W7 | above | Wireframe |
| P1–P9 | DS-native prototypes of the above, same order | wireframe sign-off per page | Prototype |

Decision gates before prototyping (do not hard-code): G1 hero preset prompts (final 3), G2 signup identity method priority (phone-first vs Google-first), G3 Decode capture method (email vs account vs WhatsApp), G4 which archived miss features in the honesty scene. Pose these at the end of the wireframe round.

---

## 2 · BUILD PROMPTS (paste-ready)

### W0 · Shared shell
> Build the shared website shell for Tradl AI's alpha marketing site using the bound design system. Components: (1) Sticky nav: wordmark left; Product (dropdown listing Edge overview + 4 tool pages), Stocks, Decode, Manifesto; right: Log in (ghost) + Start free (primary). Blur background on scroll. Variant B for intent-door pages: primary CTA slot is contextual (prop-driven label). (2) Footer: 4 columns (Product / Markets: stocks A–Z + sectors / Decode archive / Company) + compliance block: SEBI RA registration number, CMOTS·NSE·BSE attribution, risk disclosure line. (3) Section anatomy component: eyebrow (rotated-square or ◈ glyph + uppercase label), one-line headline, one-sentence dek, content slot, optional hairline-topped footer kicker. (4) Normalized status pill set: LIVE, PREVIEW, PRIVATE ACCESS, one geometry. (5) Proof chip component: icon + fact + as-of date, linkable, optional single pulse. Instrument register throughout: hairline borders, dense, numbers in tabular figures. No emoji, no exclamation marks anywhere.

### W1 · Homepage
> Wireframe the Tradl AI homepage per content structure doc 03 §3, sections H0–H9 exactly. Register rhythm: H1 statement, H2 instrument, H3 statement, H4–H6 instrument, H7 instrument, H8 instrument, H9 statement. Hero: headline left ("Agentic trading starts here."), doctrine badge ("We compute, we don't predict."), CTA pair; Playground terminal right (use W2 component, placeholder ok at wireframe stage). H2 proof strip: three chips from copy library §5.3. H3: fragmented-workflow visual resolving into one surface; no statistics. H5 lifecycle band: three columns Discover/Analyse/Act with 13 tool tiles per the tool map (§6 of this doc), Private Access tiles badged with in-place expanders. H6: three signature scenes only (Screener, Smart Stock Pages, Decode) each with one record line and contextual CTA. H7 honesty scene: one archived graded miss at full visual weight with archive link. H8: 4 attributed quote cards, static. H9: full-bleed ASK. COMPUTE. ACT. close with warm beat line. Every claim within one viewport of a proof element.

### W2 · Playground hero component
> Design the Playground: a terminal-chrome component with LIVE·NSE pill, three panes (prompt, generated code, results). Choreography: prompt types in, code streams with a working state and a real elapsed counter, results snap in as rows with signed colored deltas, 4–6s rest on the finished frame, soft reset; total loop 18–24s. Operable mode: three preset prompt chips above the terminal; selecting one plays that preset's cached run (data contract §4.1). No free-text input. Reduced-motion: static finished frame, all panes filled. Mobile: prompt/code collapse into tabs, results always visible. First paint is the static finished frame (LCP-safe); animation upgrades in.

### W3 · /edge overview
> Wireframe /edge per doc 03 §4, sections E1–E6. E3 is the body: all 13 tools in lifecycle order, each row = name + stage chip + status chip + one-sentence definition (copy library §5.4) + signature frame slot + one record/spec line + link or expander. E4 explains Private Access as earned early access, not a waitlist apology. E5 carries the provenance/honesty explainer including the line "We publish computed and historical analytics. We never publish recommendations or targets."

### W4 · Tool detail template + Screener page
> Build the tool detail template per doc 03 §5 (T1–T7), then instantiate for AI Screener. T1 demo: the Playground running a screener-specific preset. T3 facts: 3,000+ NSE stocks, every timeframe including intraday, natural-language input, generated code visible, per-run timing shown. T4: annotated generated-code sample. T5 boundaries: no recommendations, no targets, results are computed matches not advice. T6: 8 FAQ pairs (copy library §5.6), FAQPage-schema-ready. Repeat pattern later for backtesting, stock-pages, charts with their signature demos per doc 02 §6 S3.

### W5 · /decode hub + edition template
> Wireframe /decode per doc 03 §6, D1–D5 in that order: today's edition (6 stock cards + inline audio player with real-waveform styling), yesterday graded (per-call ✓/✗ at equal weight), cumulative scorecard module (editions unbroken, graded hit rate, best and worst days both shown), filterable archive grid, and the keep-gate ("Tomorrow's Decode at 07:45, before the market opens." single email field, button: "Get tomorrow's Decode"). Edition page template: dated permanent URL, full text + audio + resolved grades, links to every mentioned stock page.

### W6 · Stock page conversion wrapper
> Do not redesign the stock page (Proto v5 is locked). Design only the anonymous-visitor wrapper states: (1) sticky ticker bar CTA reads "Track {SYMBOL}"; (2) keep-gates on +Watchlist, alerts, metric-layout save, Co-pilot sync, and dock-popup depth beyond first open, each rendering the real gated shape with a single sign-in row appended, never a blur; (3) Decode-mentions module when applicable; (4) door-aware mobile bottom CTA. Include the Tier B variant wrapper.

### W7 · Sign-up flow
> Wireframe /start per doc 03 §8: Step 1 single-field account (present both phone-first and Google-first variants for gate G2), Step 2 one skippable single-select calibration question, Step 3 four entry-context landing variants (from scan / from stock / from Decode / cold) each landing with work already done. Staging per storyboard S6: marketing chrome falls away, terminal-calm form, success state is the product mid-task, no celebration graphics. Buttons name outcomes.

### W8 · Manifesto + Events
> Manifesto: long-form editorial page, M1–M6 per doc 03 §9; this is the only page where the four-waves narrative and founder material appear; statement register may run higher here; one warm serif beat allowed per section. Events: public week-view with computed context lines per event; historical + per-stock filters shown as keep-gated states.

### W9 · Mobile passes
> Mobile-first passes for homepage, Playground, stock-page wrapper, and signup per doc 04 §6: Playground tab-collapse, lifecycle band as stage tabs, ledgers horizontal-scroll with edge fade, bottom-anchored contextual CTA with scroll collapse/return, 44px targets.

---

## 3 · TOOL MAP (single source of truth for W1/W3)

| Tool | Stage | Status | One-liner key (§5.4) |
|---|---|---|---|
| AI Screener | Discover | LIVE | screener |
| AI Backtesting | Analyse | LIVE | backtesting |
| Smart Stock Pages | Analyse | LIVE | stockpages |
| Tradl AI Charts | Analyse | PREVIEW | charts |
| Morning Decode | Discover | LIVE | decode |
| Events Calendar | Discover | LIVE | events |
| Pattern Sniper | Discover | PRIVATE ACCESS | sniper |
| Smart Chain | Analyse | PRIVATE ACCESS | chain |
| Strategy Copilot | Act | PRIVATE ACCESS | copilot |
| Insights Engine | Discover | PRIVATE ACCESS | insights |
| Position Co-pilot | Act | PRIVATE ACCESS | positioncopilot |
| F&O Discovery | Discover | PRIVATE ACCESS | fodiscovery |
| Smart Charts | Analyse | PRIVATE ACCESS | smartcharts |

Note: "Tradl AI Charts (preview)" and "Smart Charts (private access)" are distinct on the alpha list (native charts preview vs the embedded-intelligence chart layer). If product wants these merged into one tile before launch, that is a naming-freeze amendment, flag to Nilesh.

---

## 4 · MOCK DATA CONTRACTS (JSON shapes for prototypes)

### 4.1 Playground preset run
```json
{
  "preset_id": "sma-macd-support",
  "prompt": "Stocks above their 50 and 200 day SMA, MACD bearish cross, RSI below 50, breaking support",
  "code_lang": "python",
  "code": "…pandas/talib block, syntax-highlightable…",
  "run": { "universe": 3000, "matches": 7, "elapsed_s": 1.9, "as_of": "2026-08-14", "state": "EOD" },
  "results": [ { "symbol": "XYZ", "close": 231.40, "delta_pct": -1.8, "flag": "support-break" } ]
}
```

### 4.2 Proof chip
```json
{ "kind": "decode|coverage|activity", "fact": "string", "as_of": "date", "href": "/decode", "pulse": false }
```

### 4.3 Decode edition
```json
{
  "edition": 96, "date": "2026-08-14", "audio_url": "…",
  "stocks": [ { "symbol": "…", "read": "…", "basis": "…" } ],
  "grades_prev": { "edition": 95, "resolved": [ { "symbol": "…", "verdict": "with|against", "move_pct": 2.1 } ], "line": "4 of 6 moved with the read" },
  "scorecard": { "editions_unbroken": 96, "calls_graded": 186, "hit_rate_pct": 66, "best_day": "6/6", "worst_day": "0/6" }
}
```

### 4.4 Signal record line (stock pages, tool scenes)
```json
{ "signal": "…", "fired_count": 14, "resolved_up": 9, "window_sessions": 10, "rate_pct": 64, "last_fired": "2026-08-12T11:40+05:30", "basis": "…" }
```

### 4.5 Signup context
```json
{ "door": "brand|intent", "entry": "/tools/screener", "rung": "do|keep|start", "carry": { "type": "scan|stock|decode|none", "ref": "…" }, "calibration": "positional|swing|intraday|fo|skipped" }
```

Mock-data doctrine: internally consistent, hard-case biased (include a loss-maker, a Tier B name, a ✗-graded Decode day), dated, no round numbers.

---

## 5 · COPY LIBRARY (paste-ready · linter-clean: no em-dashes, no emoji, no exclamations)

### 5.1 Hero
- H1: `Agentic trading starts here.`
- Alt H1: `Trading intelligence that shows its work.`
- Dek: `Ask in plain language. Tradl writes the analysis as code, runs it on live market data, and shows you every number it computed.`
- Badge: `We compute, we don't predict.`
- CTAs: `Start free` · `Run a scan`

### 5.2 Section eyebrows
`◈ THE PLAYGROUND` · `THE GAP` · `HOW IT WORKS` · `◈ THE TOOLKIT` · `◈ GRADED IN PUBLIC` · `THE RECORD` · `VOICES` · `PRIVATE ACCESS`

### 5.3 Proof chips
- `Morning Decode · Ed. {n} · graded daily · archive public`
- `3,000+ NSE stocks · every timeframe · intraday included`
- `{n} signals fired today · each carries its record`

### 5.4 Tool one-liners
- screener: `Describe the setup. Tradl finds every match across 3,000+ stocks, on any timeframe, and shows the code it ran.`
- backtesting: `Test any idea against history before it costs you money. Parameters you control, results you can audit.`
- stockpages: `Every stock, processed by up to 7 intelligence tools, with every derived number carrying its basis.`
- charts: `Tradl's native charts, annotated by AI while you screen, backtest, and track events. Preview access in alpha.`
- decode: `Six stocks decoded before every open, in text and audio. Yesterday's calls graded in public, misses kept.`
- events: `Every result, corporate action, and macro event on one timeline, each with a computed context line.`
- sniper: `Chart patterns detected in real time, each with its own fired-and-resolved record. Private access.`
- chain: `The option chain, computed into plain English, tick by tick. Private access.`
- copilot: `From market view to ranked structures with payoff, Greeks, and margin computed. Private access.`
- insights: `Ranked, scored insights graded at horizon. The engine's record is published. Private access.`
- positioncopilot: `The whole page, recomputed against your actual entry. Private access.`
- fodiscovery: `Where the derivatives activity is, computed, not rumored. Private access.`
- smartcharts: `Embedded intelligence on the chart itself: regimes, levels, and context where you already look. Private access.`

### 5.5 Honesty scene
- Header: `The misses stay on the record.`
- Body: `Every call is frozen before the open and graded after. Ed. {n}: {x} of 6 moved against the read. It stays in the archive.`
- CTA: `Browse the archive`

### 5.6 Screener FAQ seeds
`How is this different from a normal stock screener?` · `Which stocks and timeframes are covered?` · `Can I see how a result was computed?` · `Does Tradl recommend stocks?` (answer renounces recommendations, RA framing) · `How fresh is the data?` · `Can I save and rerun scans?` · `Does it work for intraday?` · `What does the AI actually do?`

### 5.7 Signup & keep-gates
- Keep-gate patterns: `Track {SYMBOL}` · `Save this scan` · `Get tomorrow's Decode` · `Sign in to keep this`
- Step 2 question: `How do you trade?` options `Positional · Swing · Intraday · F&O first · Skip`
- Success states: `Your first scan is ready.` · `{SYMBOL} is on your watchlist.` · `Tomorrow's Decode arrives at 07:45.`

### 5.8 Compliance block (footer, verbatim once legal-approved)
- `Tradl AI publishes computed and historical analytics. Nothing on this platform is investment advice or a recommendation.`
- `SEBI Research Analyst Reg. No. {number}` · `Market data: CMOTS, NSE, BSE.` · risk line per JARS.

**Open with JARS before launch:** footer risk-line wording, RA number display format, Decode grading-methodology disclosure page, and whether "agentic trading" as a category phrase needs any qualifier. (Broking references: already excluded sitewide by decision.)

---

## 6 · ASSET INVENTORY

**Have (from prior projects):** wordmark on dark/light, icon badge, founder + core-team photos, 6 product demo videos (v1 recordings), 21 attributed testimonial quotes, Decode edition history + grading data, traction dashboards, Stock Page Proto v5 + FnO rail card, per-product context md files.

**Need before prototype round:** 3 Playground presets with real cached runs (code + results + timing), one approved archived-miss Decode edition (gate G4), one real Decode audio episode + Spotify link, re-recorded product demos on current builds (v1 recordings predate the alpha UI), hard-case stock dataset refresh (Ather numbers were fabrications; website frames should use real computed data or be clearly staged), RA registration number + JARS-approved footer block, sector list for hub v1.

---

## 7 · NAMING FREEZE (resolves cross-project inconsistencies)

| Frozen | Retired variants |
|---|---|
| Pattern Sniper | Sniper |
| Smart Chain | AI Option Chain, Smart Option Chain |
| Strategy Copilot | AI Strategy, AI Strategy Builder |
| Morning Decode | Decode (ok as short form after first mention) |
| Tradl AI Charts | AI Charts, native charts |
| Smart Stock Pages | Stock Page 2.0 (internal name only) |
| Discover · Analyse · Act | Discover · Analyse · Execute (site-banned: Execute) |
| Tradl Edge | Edge OS, Pro tier |

Not on the website: Rise, Warden, broker/broking/license, Agentic Execution, Position sizing advice of any kind.

---

## 8 · QA CHECKLIST (per page, before sign-off)

**Compliance:** no banned words (01 §7 list) · no broking references · ◈ + basis on all derived content · footer compliance block present · absences stated, never blank · every number dated.
**Conversion:** door declared · CTA ladder present (Do/Keep/Start) · gate sits on second unit of value · contextual CTA on intent pages · instrumentation fields wired (§4.5).
**Brand:** claim-to-proof within one viewport · one pulse per viewport max · one warm beat per page max · register rhythm respected · doctrine line appears once max.
**Craft:** chart doctrine (02 §5) · carousel height tracking · reduced-motion equivalents · LCP static-first hero · keyboard + focus + AA contrast · mobile CTA behavior.
