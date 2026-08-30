# Inspiration Handoff — Groww 915 (915.groww.in)
**For: Tradl AI website revamp — Claude design project | Compiled: 17 Aug 2026**

> **Research method note:** This teardown was compiled via live content extraction (WebFetch) across every reachable page of 915.groww.in, because the Chrome extension (live browser/screenshot tool) was unresponsive for the entire session. Every section below is grounded in actual page copy, navigation structure, and DOM/asset hints (image filenames, CSS class naming, component states) pulled directly from the site. Anything that is inferred rather than pixel-confirmed (exact hex codes, precise spacing, font files) is explicitly marked **[inferred]**. Recommend a 15-minute follow-up screenshot pass once the browser tool reconnects to lock exact colors/type/spacing before this goes into high-fidelity design — see "Open Follow-Ups" at the end.

---

## 1. What 915 Is (context for why it looks the way it does)

915 is Groww's dedicated **F&O (Futures & Options) pro trading terminal** — a separate, focused sub-product spun out of the main Groww app, not a replacement for it. It exists because active F&O traders needed a faster, denser, more customizable workspace than a general retail brokerage app can offer, while still sitting on top of the same account, funds, and compliance stack as Groww.

This positioning — **"a specialist tool for power users, backed by the trust of the main platform"** — is the single most useful strategic parallel for Tradl AI, which is also building a specialist trading co-pilot on trust/compliance credibility (SEBI registration path) aimed at serious retail traders. The way 915 handles this relationship (visually and narratively) is worth studying closely, not just copying components.

---

## 2. Sitemap

```
915.groww.in
│
├── / (Home)
│   └── Full narrative homepage — hero → features → presets → straddle teaser →
│       founders' note → testimonial → CTA → FAQ → footer
│
├── /open-interest              — Feature landing page (OI + PCR analytics)
├── /straddle-chart              — Feature landing page (live straddle chart, heavy educational content)
├── /scalper                     — Feature landing page (Scalper Zone workspace + hardware keypad)
├── /tools/strategy-builder       — Embedded app / tool page (options strategy builder, live product UI)
├── /login                       — Auth page (Google / Groww SSO)
├── /help                        — Help Center (FAQ hub, breadcrumbed Home > Help)
├── /blog                        — Content/education hub (referenced in footer, not deep-crawled)
│
└── Footer hand-off links out to parent ecosystem (groww.in):
    ├── groww.in                          — Main Groww platform
    ├── groww.in/charts                   — Groww Terminal (charts)
    ├── groww.in/stocks/filter            — Stocks Screener
    ├── groww.in/trade-api                — Algo Trading / API
    ├── groww.in/futures-and-options      — Groww F&O product page
    ├── groww.in/trust-and-safety         — Trust & Safety
    ├── groww.in/press                    — Media & Press
    ├── groww.in/terms-and-conditions, /p/disclosure/, /regulatory-and-other-information,
    │   /p/policies/, /download-forms     — Legal/compliance cluster
    └── /privacy-policy (915-owned)
```

**Pattern to note:** 915 is architected as a *satellite site* — it owns its product-feature pages and its own login/help, but deliberately outsources ALL trust/legal/compliance surface area to the parent `groww.in` domain via footer links. This lets the 915 site itself stay lean, fast, and product-focused, while still being fully backed by Groww's compliance weight. **Directly applicable to Tradl AI**: keep the core site focused on product storytelling and push heavy compliance/legal/SEBI documentation to a dedicated trust cluster (own subpages or a shared footer pattern), so the main narrative pages don't get weighed down.

---

## 3. Global Navigation & IA

**Header (persistent across all pages):**
`[915 gradient logo]  Home   Open Interest   Scalper Zone   Straddle Chart   Tools ▾   ...........  [LOG IN]`

- Exactly **4 product nav items + 1 tools dropdown** — deliberately narrow. No "Pricing," no "About," no "Company" in primary nav. This is a signal: the nav is 100% product-feature-led, not corporate-structure-led.
- Login is isolated top-right, visually distinct from nav items (button treatment, not a text link) — classic "this is the one action that matters" placement.
- A **live indices ticker** sits directly under the header on the homepage (horizontal scrolling market data) — this is a strong trust/credibility device: before you've even read a headline, the page proves it's a *real, live* market tool, not a marketing shell. **High-value pattern for Tradl AI** — a live ticker or live-data strip above the fold instantly signals "this is a real trading product," which matters enormously for credibility with skeptical traders.

**Footer (persistent, dense, multi-column):**
Company address block → social icons (X/Twitter, LinkedIn, Instagram, YouTube) → Product links → Support links (Blog, Help, Contact, Press) → Groww ecosystem cross-links → Legal/regulatory cluster → App store badges (iOS/Android) → regulatory disclaimer text (SEBI/NSE/BSE/MCX membership).

The footer is essentially doing **three jobs at once**: navigation safety net, trust/compliance disclosure, and cross-sell into the broader Groww ecosystem. For a SEBI-registration-track product like Tradl AI, this is a good structural template — one footer zone can carry all regulatory weight so it doesn't need to intrude on page narrative above the fold.

---

## 4. Page-by-Page Breakdown

### 4.1 Homepage (`/`) — full section-by-section flow, top → bottom

| # | Section | Emphasis | Content |
|---|---------|----------|---------|
| 1 | Nav header | minimal | Logo, 4 nav items, Login |
| 2 | Live indices ticker | minimal, high trust value | Scrolling real-time index prices |
| 3 | **Hero** | large | Headline: *"Pro trading terminal Built for Speed"* · Primary CTA: **"GET STARTED WITH 915"** · large terminal product screenshot |
| 4 | **Features overview** ("Command Center for Advanced Traders") | large | 6-card grid (see §5.2) |
| 5 | **Terminal Presets showcase** | medium | Visual carousel: Volatility Trading / Scalper Zone / Groww Classic (Watchlist-driven) / Market Watch — shows the SAME terminal reconfigured for different trading styles |
| 6 | **Straddle Chart feature teaser** | medium | Dedicated mini-section + image, links out to full `/straddle-chart` page |
| 7 | **Founders' Note** | medium, high trust value | Direct quote from CEO Lalit Keshre + CTO Neeraj Singh — "built by engineers, designers and traders who know the markets inside out" |
| 8 | **Trader testimonial** | medium | Named trader (Praful Kulkarni, "Trader & Influencer") with photo + quote |
| 9 | **Secondary CTA** | minimal, deliberate repetition | "GET STARTED WITH 915" repeated verbatim |
| 10 | **FAQ** | medium | 8–9 Q&As, heavily focused on *removing activation friction* (see §6) |
| 11 | Footer | large | Full link/trust cluster (see §3) |

**Narrative arc:** *Prove speed/power (hero) → prove breadth of capability (features) → prove flexibility (presets) → deep-dive one flagship differentiator (straddle chart) → prove it's built by real trading people (founders) → prove real traders already love it (testimonial) → ask again (CTA) → kill remaining objections (FAQ) → hand off to trust/legal (footer).* This is a textbook **capability → credibility → conversion** funnel, repeated with the CTA sandwiched right after social proof — a deliberate "strike while trust is highest" placement.

### 4.2 `/open-interest` — feature landing page template
- Hero: headline *"Open Interest for Advanced Analysis"* + subhead *"Decode market sentiment instantly with live Open Interest and Put-Call Ratios"* + dashboard screenshot + CTA button ("Launch Open Interest")
- 6-feature bento grid (Open Interest, Live PCR Insights, Global Sentiment View, Support & Resistance, OI Change, OI Actions)
- Dashboard visualization deep-dive (customizable time sliders, multi-expiry, historical review, breakout detection)
- Embedded **YouTube education block** (3 tutorial videos + subscribe nudge)
- 10-question FAQ, notably education-first (explains *what OI is* before explaining the product)
- Footer

### 4.3 `/straddle-chart` — the most content-dense page on the site
This is the standout page structurally — worth the closest study. It's not just a feature page, it's a **mini-course**:
1. Hero: "Live Straddle Chart"
2. Live data table (14 indices/commodities, real-time, updates every 10s) — data-as-marketing
3. "What is a Straddle Chart?" — plain-English concept explainer (ECG-machine analogy for market volatility)
4. "Types of Straddle" — Long vs Short straddle, with a concrete worked numeric example
5. "How does it work?" — mechanism explainer (price, IV, theta decay)
6. "Why do Straddle Charts matter?" — split into two explicit audiences: option writers vs option buyers
7. "How to read it" — golden-rules format (rising = X, falling = Y, sharp strikes = Z)
8. "Features" — 7-point technical capability list
9. **Practical scenario table**: Budget Day / Earnings Release / Expiry Day / RBI Policy, each mapped to a worked timeline example with real numbers (₹780 → ₹200 premium crush, etc.)
10. "The Takeaway" — narrative close
11. 9-question FAQ
12. Footer

**Why this matters for Tradl AI:** this page proves that *education-as-conversion* works for a technical trading audience — it doesn't just claim the feature is good, it teaches the underlying concept so thoroughly that the reader arrives at "I need this tool" as their own conclusion. Given Tradl AI's audience (Indian retail F&O/options traders, often self-taught), this "concept-first, product-second" content architecture is a strong template for feature pages — e.g., a Tradl "Pattern Scanner" or "Options Chain" page could follow this exact skeleton: what-is → why-it-matters (segmented by user type) → how-to-read-it → worked real scenarios → FAQ.

### 4.4 `/scalper` — hardware + software cross-sell page
- Hero: *"Built Exclusively for Scalpers"* / *"A trading workspace designed for speed"*
- Shows product across laptop AND mobile screenshots
- Introduces **"915 Scalper Keypad"** — a limited-edition physical hardware product with its own waitlist CTA, positioned as a premium/exclusive add-on
- **Hard performance stats as trust signals**: "99.99% uptime," "20ms execution speed (88% of orders)," "100k+ active traders" — the only page on the site with quantified numeric proof points
- 6-feature grid (On-Chart Trading, One-Click Trading, Call/Put/Spot View, Stop-Loss/Target on Chart, Instant Put↔Call Reversal, Keyboard-First Trading)
- YouTube tutorials block
- FAQ (7 Qs)

**Pattern to note:** hard performance numbers (uptime %, execution ms, user count) appear *only* on the page targeting the most demanding/skeptical user segment (scalpers care most about latency). This is a good model — don't front-load every stat on the homepage; deploy proof points where the specific audience segment needs them most.

### 4.5 `/tools/strategy-builder` — embedded live app, not a marketing page
This is functionally a stripped-down version of the actual product (options strategy builder UI): contract table (buy/sell, expiry, strike, CE/PE, qty, LTP), account balance panel, payoff analysis (max profit/loss, POP, risk/reward, Greeks), target settings. Empty states prompt login. This tells us 915 is comfortable letting *unauthenticated visitors interact with a real (if limited) version of the tool* rather than only showing static screenshots — a "try before you login" pattern worth considering for a Tradl AI tool page (e.g., a sandboxed/demo Pattern Scanner).

### 4.6 `/login`
Minimal, single-purpose: Google OAuth, "Continue with Groww" (existing account), create-new-Groww-account option, app store badges. No marketing copy competing for attention — friction reduction is the only goal. The "Continue with Groww" option is the whole trust thesis of the product condensed into one button: *you don't have to trust 915, you already trust Groww*.

### 4.7 `/help`
Breadcrumbed (`Home > Help`), FAQ-categorized (platform basics, account integration, pricing, funding, access, support), with direct email + phone support listed inline (`915support@groww.in`, `+91 9008915915`) — human contact info surfaced prominently even on a self-serve help page.

---

## 5. Component & UI/UX Inventory

### 5.1 Recurring structural components (present on nearly every page)
- Gradient logo lockup (top-left, links home)
- Persistent top nav + isolated Login button
- Live/animated data ticker or table (homepage ticker; straddle-chart's 14-row live table; open-interest dashboard) — **data-as-hero-visual** is a house style, not a one-off
- Hero: headline + subhead + single primary CTA + large product screenshot
- **6-item feature bento grids** — used on homepage, open-interest, and scalper pages. This 6-card grid is clearly a reusable design-system component, always: icon/visual + bold short title + one-sentence benefit description
- Embedded YouTube tutorial block (3 videos + subscribe CTA) — repeated on open-interest and scalper pages
- FAQ accordion block — present on every page, always positioned near the bottom before the footer
- Full-width multi-column footer (identical across pages)
- Empty-state illustrations in the live product tool (strategy builder) prompting login

### 5.2 Homepage feature-card copy (exact, for tone reference)
1. **Live P&L Charts** — "Track how your profits or losses move throughout the day"
2. **Trading on Charts** — "Place orders, view open positions and indicators on multiple chart types"
3. **Advanced Option Chain** — "Positions, Greeks, Basket and Payoff - all in a single Option Chain"
4. **Layout Presets** — "Scalper terminal, Volatility trading, and many custom layouts"
5. **Customisable Interface** — "Drag-and-drop, resize, customise themes and font sizes of your 915 dashboard"
6. **Scalper Zone** — "Execute trades directly from charts and with handy keyboard shortcuts on 915"

Copy pattern: **[Bold capability name] → [one plain-English sentence, verb-first, no jargon padding, no exclamation marks, no adjectives like "revolutionary/powerful"]**. Consistently restrained, confident, unembellished — lets the feature name carry the weight rather than the adjectives.

### 5.3 CTA language patterns
- Primary CTA is always the same repeated phrase, not varied per section: **"GET STARTED WITH 915"** (all caps, used on homepage hero AND again after testimonial)
- Feature-page CTAs are specific to the tool: "Launch Open Interest," "Launch Scalper Zone" — action-first verb + product name, not generic "Learn More"
- Secondary/niche CTA: waitlist for the physical Scalper Keypad — shows they're comfortable running a *second, smaller* funnel (hardware waitlist) alongside the main product funnel without it competing for hero real estate

---

## 6. Signup / Activation Loop — how 915 drives conversion

915's growth loop is unusual and instructive because **915 is not a cold-start product** — it converts an *existing* Groww user base, not strangers. The entire activation design leans into this:

1. **Zero new-account friction**: FAQ opens with "Just sign in on 915.groww.in using your Groww-registered email ID" — the very first objection handled is "do I need to sign up again?" (answer: no).
2. **Funds/positions are pre-populated automatically**: "Whatever funds you have in your Groww account are instantly available on 915," "Your positions are synced in real time," "pledged margin... automatically carries over" — every FAQ answer is designed to eliminate a specific activation-blocking fear (money safety, data sync, re-setup effort).
3. **No new pricing/cost anxiety**: "No, there are no separate pricing structures" — explicitly kills the "is this going to cost me extra" objection immediately, without making the user hunt for a pricing page (there isn't one — pricing is a FAQ answer, not a page, because the answer is "same as what you already pay").
4. **Login button architecture reinforces trust-transfer**: the login page's headline action is literally "Continue with Groww" — not "Create 915 Account." The product identity is deliberately subordinate to the parent brand at the exact moment of conversion.
5. **CTA repetition, not CTA variety**: same exact CTA text used twice on the homepage (hero + post-testimonial) rather than experimenting with different phrasing — suggests confidence that friction is about *trust/clarity*, not about finding a clever call-to-action phrase.
6. **Secondary community/content loop**: YouTube tutorial embeds + subscribe CTA on feature pages function as a slower nurture loop for users not ready to convert immediately — parallel to Tradl's own content/education motion.

**Direct implication for Tradl AI:** since Tradl AI is *not* yet in a "trusted parent platform" position the way 915 is (it's building toward SEBI registration rather than inheriting an existing brokerage relationship), the equivalent trust-transfer levers will need to come from elsewhere — e.g., founder credibility, community proof (WhatsApp groups, per your own product analytics showing WhatsApp membership as a ~6x engagement multiplier), transparent methodology/education content, and visible regulatory-track messaging. The FAQ-as-objection-handling structure, however, is directly portable regardless of trust source — structure Tradl's own FAQ around your actual activation drop-off points (e.g., the 47.6% first-query failure rate and the watchlist conversion gap you've already identified) rather than generic questions.

---

## 7. Content Flow & Storytelling Model

Across every page, 915 follows a consistent rhetorical shape:

**Show the live thing → name the capability → explain the concept for non-experts → prove it with a real trader's voice or real numbers → remove the remaining objection → hand off to trust/legal.**

Two storytelling techniques stand out as reusable:

- **Segmented empathy** — repeatedly split explanations by user type ("for option writers... / for option buyers...", "for scalpers who need speed... / for swing traders who need multi-day views..."). Never talks to "traders" as one monolith. Tradl AI's audience (self-taught Indian retail F&O traders at different skill levels — the activation research already shows a first-query failure problem, implying skill/onboarding variance) would benefit from this same segmentation technique in copy: e.g., "if you're new to options... / if you already know your Greeks..."
- **Worked numeric scenarios over abstract claims** — the straddle-chart page doesn't say "our tool helps you time volatility," it walks through an actual RBI/Budget/Earnings timeline with real rupee premium numbers. This is far more persuasive to a numerate trading audience than adjective-driven marketing copy, and matches your own stated preference for no marketing fluff / jargon-free directness — it's proof that a *serious, data-first* tone converts serious traders better than hype copy.

---

## 8. Brand & Visual Identity Notes

**[inferred — needs screenshot confirmation]**

- Logo uses a **gradient treatment** (asset named `915-logo-gradient.svg`) with a separate flat black/transparent variant for contexts needing a plain mark — standard dual-logo system (hero/marketing vs. functional/app contexts).
- CTA buttons appear to use a **glow/highlight treatment** (asset referenced as `primary-cta-glow-icon`) — suggests an accent color used sparingly and specifically to draw the eye to the one primary action per screen, consistent with the "one CTA phrase repeated, not diluted" pattern noted in §6.
- Background imagery references ("pixel dot backgrounds," "showcase-background," "feedback-artwork") suggest **layered, textured dark/technical backgrounds** behind product screenshots rather than flat solid fills — a "trading terminal" aesthetic (dense, technical, slightly futuristic) rather than a soft consumer-fintech look.
- Overall tone across copy, imagery naming, and structure reads as **"professional trading terminal" rather than "friendly consumer app"** — dense information, real screenshots (not illustrations), named human testimonials with photos, and a restrained/confident copy voice with no exclamation marks or hype adjectives anywhere in the extracted content.
- The site is unmistakably product-screenshot-led rather than illustration-led — every feature claim is backed by an actual UI screenshot of that feature, never a generic stock photo or abstract icon-only treatment.

**Follow-up needed:** exact hex values, font family/weights, spacing scale, and button/card corner-radius conventions all require a live screenshot pass — flagged in §10.

---

## 9. Wireframes (structural block diagrams)

### 9.1 Homepage wireframe

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]     Home  Open Interest  Scalper  Straddle  Tools▾ [LOGIN]│
├──────────────────────────────────────────────────────────────┤
│ ◄  NIFTY 24,xxx ▲x%   BANKNIFTY ...   SENSEX ...  (scroll) ►  │  ← live ticker
├──────────────────────────────────────────────────────────────┤
│                                                                │
│   "Pro trading terminal Built for Speed"                      │
│   [ GET STARTED WITH 915 ]                                    │
│                                                                │
│         ┌────────────────────────────────┐                    │
│         │   [terminal product screenshot]  │                   │
│         └────────────────────────────────┘                    │
├──────────────────────────────────────────────────────────────┤
│           "Command Center for Advanced Traders"                │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌───┐│
│  │Feature1│ │Feature2│ │Feature3│ │Feature4│ │Feature5│ │Ft6││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └───┘│
├──────────────────────────────────────────────────────────────┤
│   Terminal Presets  ◄  [Volatility] [Scalper] [Classic]  ►     │
├──────────────────────────────────────────────────────────────┤
│   Straddle Chart teaser   [image]     "See it live →"          │
├──────────────────────────────────────────────────────────────┤
│   [founder photo]   "915 was created by engineers..."          │
│                       — Lalit Keshre (CEO), Neeraj Singh (CTO) │
├──────────────────────────────────────────────────────────────┤
│   [trader photo]   "best widget based terminal..."             │
│                     — Praful Kulkarni                          │
├──────────────────────────────────────────────────────────────┤
│                 [ GET STARTED WITH 915 ]                       │
├──────────────────────────────────────────────────────────────┤
│   FAQ                                                          │
│   ▸ How do I start?                                            │
│   ▸ Will my positions sync?                                    │
│   ▸ ... (8-9 items, accordion)                                 │
├──────────────────────────────────────────────────────────────┤
│  [address]   [social icons]   Products | Support | Legal       │
│  [SEBI/NSE/BSE/MCX disclaimer text]        [iOS] [Android]      │
└──────────────────────────────────────────────────────────────┘
```

### 9.2 Feature landing page wireframe (applies to /open-interest, /scalper; /straddle-chart is an extended variant with more education blocks stacked in the middle)

```
┌──────────────────────────────────────────────────────────────┐
│ [Logo]           nav...                    [LOGIN] [Launch →] │
├──────────────────────────────────────────────────────────────┤
│   "Feature Name for Advanced [Use Case]"                      │
│   "One-line benefit subhead"          [dashboard screenshot]  │
│               [ Launch <Feature> ]                            │
├──────────────────────────────────────────────────────────────┤
│   6-feature bento grid (icon + title + 1-line description)    │
├──────────────────────────────────────────────────────────────┤
│   Deep-dive visualization block (secondary screenshots +       │
│   capability call-outs: sliders, filters, historical view)    │
├──────────────────────────────────────────────────────────────┤
│   [YT thumb] [YT thumb] [YT thumb]      "Subscribe on YouTube" │
├──────────────────────────────────────────────────────────────┤
│   FAQ accordion (7-10 items)                                   │
├──────────────────────────────────────────────────────────────┤
│   Footer (identical to homepage)                                │
└──────────────────────────────────────────────────────────────┘
```

### 9.3 Login page wireframe

```
┌──────────────────────────────────────────────────────────────┐
│                        [915 gradient logo]                     │
│                                                                │
│                 "built for pro traders to strategise           │
│                    smarter and trade with precision"           │
│                                                                │
│               [ G  Continue with Google ]                      │
│               [    Continue with Groww  ]                      │
│               [    Create Groww account ]                      │
│                                                                │
│                    [App Store]  [Google Play]                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 10. Direct Application Notes for Tradl AI

Concrete, non-generic takeaways to carry into the Claude design project:

1. **Lead with live proof, not static claims.** 915's ticker/live-data-table pattern is the single highest-leverage device on the site — it converts "trust me" into "look, it's already working." Tradl AI's homepage should open with something *alive* (live pattern scan hits, live options chain snapshot, live signal feed) rather than a static hero illustration.
2. **Segment FAQ content around your actual activation drop-off data.** You already know the failure points (47.6% first-query failure rate, watchlist conversion gap). Build the FAQ/objection-handling copy around *those specific* moments the way 915's FAQ is built entirely around *its* known friction points (fund transfer anxiety, position sync doubt, pricing confusion) — don't write a generic FAQ.
3. **Adopt the "concept-first, product-second" feature-page skeleton** (§4.3) for flagship Tradl features like Pattern Scanner and Options Chain: what-is-it (plain English) → who-it's-for (segmented) → how-to-read-it (golden rules) → worked real scenario with real numbers → FAQ. This matches your own stated preference for jargon-free, non-fluffy communication and should outperform generic feature marketing copy for a numerate trading audience.
4. **Reserve hard stats for the audience segment that needs them**, not the homepage hero — e.g., latency/uptime numbers on a scalping-focused page, accuracy/backtested-hit-rate numbers on a Pattern Scanner page, not diluted across every screen.
5. **One CTA phrase, repeated with intent, not varied for novelty.** Placed once high (hero) and once immediately after your strongest trust signal (testimonial/founder note/community proof) — mirrors 915's exact placement logic.
6. **Since Tradl AI lacks 915's "inherited trust from a giant parent brand,"** substitute your own credible trust anchors in the equivalent visual/narrative slots: founder note → founder credibility + build-in-public track record; testimonial → real trader testimonials/community screenshots (you have an active WhatsApp community with a documented 6x engagement multiplier — that's your version of "Continue with Groww" trust-transfer); regulatory footer → visible SEBI-registration-track messaging, handled honestly (in-progress, not implied as complete).
7. **Footer as compliance container.** Push all legal/regulatory/SEBI disclosure text into a consistent, comprehensive footer (as 915 does) so it doesn't have to interrupt product storytelling higher up the page — important given Tradl's transition toward SEBI-registered broker status.

---

## 11. Open Follow-Ups (needs live browser access to close out)

- [ ] Exact color palette (hex values) for background, accent/CTA glow, text, chart colors — currently inferred from asset naming only
- [ ] Font family/weights and type scale
- [ ] Spacing/grid system and card corner-radius conventions
- [ ] Mobile-responsive behavior (nav collapse, ticker behavior, card grid reflow)
- [ ] Micro-interactions/animation (hover states, CTA glow animation, chart transitions)
- [ ] Screenshot library for direct visual reference in the Claude design project

Recommend re-running a visual capture pass (screenshots per section + zoomed component crops) as soon as the Claude in Chrome extension reconnects, and appending those directly to this file or a companion asset folder before this goes into high-fidelity design work.
