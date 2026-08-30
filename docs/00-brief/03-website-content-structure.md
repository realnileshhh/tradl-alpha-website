# TRADL AI · WEBSITE CONTENT STRUCTURE
### Alpha Launch · Section-by-Section · v1.0 · Aug 2026
Goal metric: maximum visit → signup conversion, without cheapening the premium instrument positioning.

---

## 1 · CONVERSION ARCHITECTURE (read this before the site map)

### 1.1 Two front doors, one funnel
The site has two entry surfaces with different jobs:

- **Homepage & product pages (brand door):** direct, referral, social, creator traffic. Job: convert belief. Visitor arrives curious about Tradl; the page must prove the intelligence is real.
- **Stock pages & Decode archive (intent door):** SEO/AEO traffic. Job: convert utility. Visitor arrives caring about a *stock*, not about Tradl; the page must be so useful that Tradl earns the account as a side effect. Long-run, this door carries the majority of traffic.

Every page therefore declares its door and optimizes its CTA logic accordingly (see 1.3).

### 1.2 The conversion ladder (site-wide CTA doctrine)
Never one giant "Sign up." Three rungs, always in this priority order:

- **Rung 1 · Do:** an interactive first-touch that delivers value pre-account. "Run a scan" (Playground), "Open a stock page," "Read today's Decode." Zero friction, zero fields.
- **Rung 2 · Keep:** the account gate placed exactly where the visitor wants persistence: save this scan, track this signal, get tomorrow's Decode, unlock the dock. The account is framed as *memory*, not membership.
- **Rung 3 · Start:** the direct "Start free" for the already-convinced. Persistent in nav and footer, never in a popup.

**Gate placement principle:** gate the second unit of value, never the first. One free scan, then account to save/re-run. Full stock page visible, account to watch/alert. Today's Decode free, account (or email) for tomorrow's delivery.

### 1.3 Per-door CTA logic
- Brand door pages: primary CTA = "Start free"; secondary = "Run a scan."
- Intent door pages: primary CTA = contextual keep-action ("Track this stock," "Get tomorrow's Decode"); "Start free" demoted to nav. A visitor who came for ATHERENERG should never be shouted at about Tradl.

### 1.4 Anti-patterns (banned)
Exit-intent popups, countdown timers, fake scarcity, newsletter interstitials, chat widgets, cookie-banner-style CTA bars. The premium positioning converts through usefulness and proof density, not pressure.

---

## 2 · SITE MAP & SCOPE

### P0 · Must exist at alpha launch
```
/                     Homepage (brand door)
/edge                 Product overview: the Tradl Edge story + full tool map
/tools/screener       AI Screener detail
/tools/backtesting    AI Backtesting detail
/tools/stock-pages    Smart Stock Pages detail
/tools/charts         Tradl AI Charts (preview) detail
/decode               Morning Decode hub: today + public graded archive + podcast
/decode/{date}        Individual edition pages (SEO surface, auto-published)
/stocks/{symbol}      Smart Stock Pages (the product IS the page; Stock Page 2.0)
/sectors/{sector}     Sector hubs (SEO dependency for stock pages; thin v1 acceptable)
/events               Events Calendar (public, partial; full inside product)
/manifesto            The Wave-4 story, thesis, team, principles
/start                Sign-up flow
Footer pages:         /legal/* (RA disclosure, terms, privacy, attribution)
```

### P1 · Fast-follow (within 4–6 weeks)
```
/tools/pattern-sniper, /tools/smart-chain, /tools/strategy-copilot   (Private Access detail pages; at P0 these are sections on /edge)
/screens/{slug}       Public screen result pages (SEO: "stocks above 200 DMA with rising delivery" family)
/compare/{a}-vs-{b}   Stock comparison pages (capped family per SEO guide)
/results/{quarter}    Auto-published verdict-banner pages (highest-intent family)
```

**Scope rationale:** the four P0 tool pages are the live, demoable tools. Private Access tools get sections, not pages, at P0: a page you cannot try yet converts worse than a badge that says "inside, waiting." The intent-door families (/screens, /results, /compare) are the compounding SEO engine but must not block the launch date.

---

## 3 · HOMEPAGE `/` (brand door)

**Job:** in one scroll, prove the intelligence is real, show the breadth, and hand over a first action. Target: ≤9 sections, one screen-story each.

**H0 · Nav (persistent, all pages):** wordmark · Product (dropdown: Edge overview + 4 tool pages) · Stocks · Decode · Manifesto · [Log in] · [Start free]. Sticky, background blurs on scroll. On intent-door pages the same nav renders with the contextual CTA swap per 1.3.

**H1 · Hero: the Playground.**
- Eyebrow: `◈ AGENTIC TRADING · ALPHA`
- H1: "Agentic trading starts here."
- Sub: "Ask in plain language. Tradl writes the analysis as code, runs it on live market data, and shows you every number it computed."
- Doctrine badge: "We compute, we don't predict."
- Right: the Playground terminal running the canonical loop (storyboard S1). Operable variant: visitor can select from 3 preset prompts and fire a real (cached-daily) run.
- CTAs: [Start free] [Run a scan ↓]

**H2 · Proof strip (immediately under hero, one row):** three live chips: Decode record ("Morning Decode · Ed. {n} · graded daily · archive public") · Coverage ("3,000+ NSE stocks · every timeframe · intraday included") · Activity ("{n} signals fired today · each with a track record"). Chips deep-link.

**H3 · The gap (problem, compressed to one scene):** "Your workflow lives in five apps that don't know each other exist." Visual: the fragmented Scan→Chart→Signals→Chain journey with break points marked, resolving into one Tradl surface. No loss-rate statistics (per founder decision). The pain framed is continuity and verification, which is the semi-pro's lived pain.

**H4 · How it works (the architecture, 3 beats):** LLM reads intent → quant computes in transparent code → every output carries its basis. Pills: No hallucinations · Glass box · Reproducible. Micro-Playground echo animation. This section earns the "agentic" word: define it in one line ("software that takes steps on your analysis, not just answers about it").

**H5 · The lifecycle band (Discover · Analyse · Act):** the full tool map as three stage-coded columns (storyboard S2). Live tools link to detail pages; Private Access tools carry badges and open a short in-place expander (what it is, one frame, "inside the alpha for early accounts"). This section is the breadth argument and the internal-link hub.

**H6 · Signature tool scenes (3, not 7):** homepage demos only the three strongest converters: AI Screener (speed + language), Smart Stock Pages (the dock + watching field), Morning Decode (graded-in-public + audio). Each: one demonstration frame + one record line + contextual CTA. The rest live on /edge.

**H7 · The honesty scene (storyboard S4):** the kept miss. "Every call is frozen before the open and graded after. The misses stay on the record." One archived wrong call, rendered at full weight. CTA: "Browse the archive."

**H8 · Voices:** 4–6 attributed community quotes (from the 21-quote testimonial set), static cards, real names/roles. No logos wall, no star ratings.

**H9 · Close:** full-bleed typographic scene "ASK. COMPUTE. ACT." → [Start free] + the warm beat line beneath: "the market, finally *intelligent*."

**Footer (all pages):** product links · stocks A–Z / sector index (SEO) · Decode archive · manifesto · RA disclosure + registration number · CMOTS/NSE/BSE attribution · risk line · social.

---

## 4 · PRODUCT OVERVIEW `/edge`

**Job:** the full-depth product story for the evaluating semi-pro/pro; the page a creator links when reviewing Tradl.

- **E1 · Hero:** "Tradl Edge. The trading OS for professionals." Sub: "The alpha you can enter today is its live foundation." Frames Edge as destination + alpha as shipped substance (brand tension #2 resolution).
- **E2 · The workflow thesis:** Intent → Insight → Analysis → Action chain; where each break happens for a working trader; how embedded intelligence closes each.
- **E3 · Tool-by-tool walk (the page's body):** every tool, live and Private Access, in lifecycle order. Per tool: name + stage chip + status chip (LIVE / PREVIEW / PRIVATE ACCESS) · one-sentence definition · signature frame · one record/spec line · link (detail page or expander).
  Order: AI Screener → AI Backtesting → Smart Stock Pages → Tradl AI Charts → Morning Decode → Events Calendar → Pattern Sniper → Smart Chain → Strategy Copilot → Insights Engine → Position Co-pilot → F&O Discovery → Smart Charts.
- **E4 · Private Access explained:** what it is (early accounts get pilot tools first), how access expands, why gating exists (calibration before scale). Converts gating from frustration into status.
- **E5 · Provenance & honesty:** the ◈ grammar explained to users: basis lines, graded records, stated absences. This is where the RA-perimeter language lives in user-friendly form ("We publish computed and historical analytics. We never publish recommendations or targets.")
- **E6 · Close:** Start free + Run a scan.

---

## 5 · TOOL DETAIL PAGES `/tools/*` (shared template)

**Job:** convert searchers and evaluators on a single capability; each page must stand alone.

Template sections:
- **T1 · Hero:** tool name · one-line definition · signature demonstration (live/looped) · contextual CTA ("Run this scan" / "Open a stock page" / "Backtest an idea").
- **T2 · The moment it's for:** one narrated trader scenario (time-stamped, specific: "9:41 AM. Your scan idea is already stale by the time you've checked it on the chart.").
- **T3 · What it computes:** the honest capability list, numbers-forward (universe, timeframes, latency, parameters). Every row a fact, not a benefit.
- **T4 · Show the work:** the auditability panel for this tool (generated code sample for Screener; per-signal fire ledger for stock-page signals; grading method for Decode).
- **T5 · Boundaries:** what it does NOT do, stated plainly (RA perimeter + honesty register). This section is a differentiator, keep it.
- **T6 · FAQ (schema-marked):** 6–10 real query-language questions.
- **T7 · Close:** contextual CTA + cross-links to two adjacent tools.

Page-specific signature demos: per storyboard S3 (doc 02 §6).

---

## 6 · MORNING DECODE HUB `/decode` + `/decode/{date}`

**Job:** the daily PLG + SEO surface; the falsifiability flagship; the lowest-friction habit on-ramp.

- **D1 · Today's edition:** the 6-stock decode, pre-market brief, inline audio player (Spotify embed) with real waveform.
- **D2 · Yesterday, graded:** "{x} of 6 moved with the read" with per-call ✓/✗. Above the fold. This ordering (today, then grades) is deliberate: value first, proof immediately after.
- **D3 · The scorecard:** cumulative record module: editions unbroken, graded hit rate, best/worst days both shown.
- **D4 · Archive:** every edition, permanent URLs, filterable by stock (feeds stock-page cross-links).
- **D5 · The keep-gate:** "Tomorrow's Decode at 07:45, before the market opens" → email or account. This is the site's softest, highest-volume conversion; treat the capture as a first-class designed moment.
- Edition pages (`/decode/{date}`): full text + audio + that day's grades when resolved; FAQPage/Article schema; internal links to every mentioned stock page.

---

## 7 · STOCK PAGES `/stocks/{symbol}` + SECTOR HUBS

The product surface doubles as the acquisition surface; architecture is locked in Stock Page 2.0 (Proto v5). Website-project scope adds the conversion wrapper:

- **Anonymous-state rules:** full page visible (never a teaser paywall); the AI Toolkit dock renders with real badges; keep-actions gate to account: +Watchlist, alerts, saving metric layouts, Co-pilot sync, dock popup depth beyond first open.
- **Contextual CTA:** sticky ticker bar carries "Track {SYMBOL}" (not "Sign up").
- **Decode cross-module:** if the stock appeared in any Decode edition, an indexed module links every mention.
- **Sector hubs:** launch-blocking SEO dependency (per SEO guide). v1 acceptable scope: sector KPI strip, constituent table with computed metrics, sector Decode/insight mentions, links to all constituent pages.
- Tier A / Tier B rendering rules per Stock Page 2.0 doc §7 (Tier B is an honest reduced page, never Tier A with holes).

---

## 8 · SIGN-UP FLOW `/start`

**Job:** minimum friction, instant first value, staged as entering the instrument (storyboard S6).

- **Step 1 · Account:** phone or Google. One field on screen. No name, no trader-profile quiz before value.
- **Step 2 · One calibration question (single-select, skippable):** "How do you trade?" (Positional / Swing / Intraday / F&O-first). Powers first-run personalization; skipping is a first-class path.
- **Step 3 · Instant value:** land inside with work already done: if the visitor arrived from a scan, that scan saved and re-runnable; from a stock page, that stock tracked; from Decode, delivery confirmed + archive open; cold start, one pre-run scan for their calibration answer.
- **Post-signup email/WhatsApp sequence (3 messages max):** Day 0 confirm + first-action deep link · Day 1 tomorrow-morning Decode delivery · Day 3 one Private Access status note. Terse, instrument voice.
- **Instrumentation contract:** door (brand/intent) · entry page · rung used (Do/Keep/Start) · calibration answer · first-session action. These five fields are the launch analytics spine.

---

## 9 · MANIFESTO `/manifesto`

**Job:** depth for the convinced-but-cautious; the page pros and creators cite. Long-form editorial (the warm register lives here):
- M1 · The four waves (full narrative; the only place it appears).
- M2 · The digital-skill thesis + the coding/video precedent.
- M3 · Why determinism: the LLM-alone / quant-alone failure modes, the fusion answer.
- M4 · The principles: compute don't predict · graded in public · embedded not bolted-on · depth first.
- M5 · The team (brief, documentary; founders + founding moment).
- M6 · Close → Start free.

---

## 10 · EVENTS CALENDAR `/events`

Public partial view: this week's market events (results, corp actions, macro), computed context lines on each. Full historical timelines + per-stock filters gated to account (a natural Rung-2 keep-gate). Article-schema per major event at P1.

---

## 11 · SEO/AEO NOTES (website-level; stock-page strategy already locked)

- Every tool page targets its query family ("AI stock screener India," "backtest trading strategy India," "pre-market analysis today").
- Decode edition pages are the freshness engine: daily indexed URLs with dated, self-contained sentences (GEO-ready).
- FAQ blocks sitewide follow the locked answer template: direct answer · number + unit · as-of date · one internal link; FAQPage schema mirrors visible text verbatim.
- Internal linking: homepage lifecycle band → tool pages → stock pages → sector hubs; ≤3 clicks to any page.
- Business/entity profile page for GEO (every sentence self-contained: entity + metric + value + unit + date) hangs off /manifesto.
