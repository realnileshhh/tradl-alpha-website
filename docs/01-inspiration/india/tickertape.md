# Tickertape — Design Inspiration Handoff
### Reference study for Tradl AI website revamp (Claude Design input file)
Compiled: 17 Aug 2026 · Source: https://www.tickertape.in (live scan, desktop web)

---

## 0. How to use this file

This is a raw-to-structured teardown of Tickertape (by smallcase), one of India's most trusted stock/mutual-fund research platforms. It captures sitemap, content flow, UI components, visual identity, storytelling mechanics, and growth/conversion loops — everything needed to feed as **reference context into Claude Design** when designing the Tradl AI website. Treat this as a pattern library, not a template to copy 1:1 — the "adapt for Tradl AI" notes at the end of each section translate the pattern into an AI-fintech context.

---

## 1. Brand snapshot

- **Positioning line (footer):** "Tickertape provides data, information & content for Indian stocks, mutual funds, ETFs & indices."
- **Parent brand:** "from smallcase" — small co-brand lockup under the logo in the footer, borrowing trust equity from a known parent.
- **Proof-of-scale bar (repeated near hero + footer):** Assets tracked worth ₹60,500 Cr · Loved by 60L+ investors · 6.2M+ downloads · 4.2★ Google Play.
- **Tone of voice:** confident, plain-English, benefit-first imperative headlines ("Elevate your investing potential", "Redefine your investing experience", "Identify red flags"). Not jargon-heavy despite being a data-dense product.
- **Core brand asset:** the **Market Mood Index (MMI)** — a proprietary circular gauge/speedometer sentiment indicator (Fear↔Greed). This single visualization is reused everywhere (homepage strip, dedicated page, embeddable/shareable widget) and functions as Tickertape's signature "mental icon" the way a mascot or wordmark would for another brand. **This is the single highest-leverage idea to steal**: one proprietary, glanceable, dial/gauge-style visualization that becomes shorthand for the brand.
- **Dual visual system:** the *product* (app/dashboard, screener, stock pages) is dark-navy/near-black, data-dense, terminal-like. The *content layer* (blog) is light, editorial, illustration-led. Same logo, two distinct visual registers serving two different jobs (tool vs. education). This is a deliberate split worth replicating: acquisition/education content should not look like the working tool, but must still feel like the same brand.

**Adapt for Tradl AI:** define one proprietary "signature visualization" (e.g., an AI-confidence gauge, a trust/risk meter, or a "market pulse" index specific to Tradl's niche) that can recur across the homepage hero, a dedicated deep-dive page, and a shareable embed. Decide early whether Tradl needs a dark "working tool" register vs a light "story/education" register, or one unified register — Tickertape's split works because the product is genuinely a dense terminal; if Tradl AI's product is lighter-touch, one unified light system may suit better.

---

## 2. Full sitemap (information architecture)

Reconstructed from the global "More" mega-menu, top nav, and footer.

```
Tickertape (tickertape.in)
│
├── Home  (/)                     — live market dashboard, not a static marketing page
│
├── PRODUCTS (mega-menu group 1)
│   ├── US Equity  [badge: New]
│   ├── IN Stocks
│   ├── ETFs
│   ├── Indices
│   ├── Mutual Funds (MFs)
│   ├── smallcases                — curated ready-made portfolios (3rd-party creators)
│   ├── Gold
│   ├── LAMF                      — Loan Against Mutual Funds
│   └── LAS                       — Loan Against Securities
│
├── TOOLS OF THE TRADE (mega-menu group 2)
│   ├── Stock Screener
│   ├── MF Screener
│   ├── US Screener  [badge: New]
│   ├── Market Movers
│   ├── Market Mood (MMI)
│   ├── Portfolio
│   ├── Watchlist
│   ├── Alerts
│   └── News and Events
│
├── READ AND SHARE (mega-menu group 3)
│   ├── Learn                     — glossary/education hub
│   ├── Social                    — community/social layer
│   ├── Blog                      — separate sub-site, own nav (see §7)
│   └── How To's
│
├── Pricing (/pricing)            — single Pro-membership plan page
│
├── Individual entity pages (programmatic, SEO-scaled)
│   ├── /stocks/{TICKER}          — Overview / Sentiment / Forecasts / Financials / Peers / Holdings / Events / News
│   ├── /mutualfunds/{FUND}
│   ├── /etfs/{ETF}
│   └── /indices/{INDEX}
│
├── Screener builder (/screener) — filterable data-grid tool, saveable/shareable screens
│
├── Market Mood Index (/market-mood-index) — standalone gauge page + widget
│
├── Blog (/blog) — separate visual system, own top nav:
│   ├── Start Here
│   ├── How to Invest
│   ├── Current Events
│   ├── Corporate Finance
│   └── More
│
└── FOOTER (Fine Print / global links)
    ├── Products: IN Stocks, Mutual Funds, US Stocks, LAS
    ├── Tools: MMI, Stock Screener, MF Screener, US Screener
    ├── Learn & Share: Social, Learn, Blog, Glossary
    ├── Fine Print: Pricing, Disclosures, Terms & Conditions, Privacy Policy
    └── Company: Anchorage Technologies Pvt Ltd (legal entity + registered address)
```

**Key IA insight:** the mega-menu is organized by **user job-to-be-done**, not by content type — "Products" (what you can invest in / borrow against), "Tools of the trade" (what you use to decide), "Read and share" (how you learn/socialize). Each group uses a consistent icon-tile grid (colored circular icon + label), which scales cleanly as new products are added ("New" badges slot in without restructuring).

**Adapt for Tradl AI:** structure primary nav/mega-menu around Tradl's own 3 jobs-to-be-done (e.g., "Products", "AI Tools / Copilot features", "Learn / Resources") rather than generic marketing categories like "Features / Solutions / Company". Use the same icon-tile + "New" badge pattern to signal active development velocity — this reads as a living, well-maintained platform, which matters for an alpha-stage AI product trying to earn trust.

---

## 3. Page-by-page wireframe & content-flow breakdown

### 3.1 Homepage (`/`)
Unusual and important pattern: **the homepage IS the live product**, not a marketing pitch. A logged-out visitor sees the same real-time dashboard a logged-in user would (with account-linking gated behind sign-in). This is a "show, don't tell" acquisition strategy — instant utility before any ask.

Vertical content flow (top → bottom):
1. **Ticking stock marquee** (horizontal scroll strip of live prices) — always-on top bar, sets a "live data" tone before anything else loads.
2. **Global nav** — logo, search (with "/" keyboard-shortcut hint visible in the field), 4 primary links (Portfolio, Gold, Screener, US Stocks), "More" mega-menu, Sign Up/Login.
3. **Index + Mood strip** — NIFTY 50 / SENSEX tiles + the MMI gauge dial ("The market is in Greed zone") + a 5-day mini history of the mood dial (Tue–Today chips). This is the emotional/narrative hook of the whole page — "here's how the market feels today" — delivered before any product pitch.
4. **"Market and sectors"** — 3×3 grid of index/sector sparkline tiles (index name, mini sparkline, value, %change color-coded red/green). Dense, scannable, terminal-style.
5. **Two-column hook row**:
   - Left: "Connect portfolio to **Identify red flags**" — a carousel teaser (partial UI mock of red-flagged holdings) driving to the portfolio-tracking feature. Value-prop headline color-splits (black + brand-purple accent word).
   - Right: rotating ad/promo carousel (broker partner offers) — shows the monetization layer sits directly in the primary content flow, not just in a sidebar.
6. **"Today's stocks"** — pill-tab filter row (Gainers/Losers/Most Active/52W High/52W Low) + ranked list rows (logo, name+ticker, sparkline, price, %change, bookmark icon). This exact row pattern (avatar/logo + primary/secondary text + trailing metric + action icon) recurs across the entire product — it's the atomic "entity row" component.
7. **"Mutual funds and ETFs"** — same filter-tab + ranked-list pattern, reused for a different asset class (proves the component system, not just the visual style, is reused).
8. **"Ready-made Portfolios by smallcase"** — 3 parallel carousels (Most invested / Most SIP'ed / Most watchlisted) — social-proof-driven merchandising, each card shows CAGR + curator name.
9. **"Today's news and events"** side rail — tabbed (All/News/Macro/Earnings/Corp Action/Dividends), card list with timestamp + source tag ("1 HOUR AGO · CAPITAL MARKET - LIVE").
10. **"Curated screens and deals"** — 3-column link list (Stock Screens / Deals / Mutual Fund Screens) — an SEO+utility hybrid section that doubles as internal linking to the screener tool.
11. **Closing brand/stats section** — large headline "Everything you need to redefine your investing experience" + 4 stat tiles (assets tracked, users, downloads, rating) + phone mockup with app UI + Download on iOS/Android buttons. This is the *only* traditional "marketing" moment on the whole page, deliberately placed last, after utility has already been proven.
12. **Footer** — 4-column sitemap + legal entity block (see §2).

**Adapt for Tradl AI:** consider leading with a live, real (or realistic) product surface — a working demo widget, sample AI output, or live data — rather than a static hero illustration, especially pre-alpha when credibility is scarce. Save the "stats + download" style brand moment for the very end, as a closing reinforcement, not the opener.

### 3.2 Pricing (`/pricing`)
Single-plan, single-page structure (not a 3-tier comparison-card layout):
1. **Dark purple hero band** — big left-aligned headline ("Elevate your investing potential with a **Pro** membership", brand word highlighted in a lighter accent), one-line subtext, right-aligned **pricing selector card** (radio rows: 1/3/12 months, each showing total + effective per-month price, a "Best Value" badge on the annual tier).
2. **Coupon module inline in the same card** — code pre-filled ("FREEDOM50"), urgency copy ("FLAT 50% OFF this Independence Day. Rarely seen offer. Limited period."), an expandable "View more" benefits line, "Apply Coupon · 1 coupon available", sticky **"Total payable amount"** bar pinned to the bottom of the card.
3. **"Your Pro Membership includes"** — a long **grouped feature-comparison table**, organized by *product area* (Invest / Track / Analyse / More Awesomeness) each with its own icon+title+subtitle header, then FREE vs PRO columns with checkmarks (blank cell = not included, not an ✗ — softer framing), sub-grouped by feature cluster (e.g., under Track: "Smart Portfolio Analysis", "Personalised alerts").
4. **Trust strip** — 3 stat tiles again (60L+ users / ₹60,500 Cr tracked / 4.2★) reused mid-funnel, right before the ask.
5. **FAQ accordion** — plain-language Q&A, ends with a "Contact us" fallback CTA.

**Adapt for Tradl AI:** the "sticky total + coupon-with-urgency-copy baked into the primary card" pattern is a strong conversion pattern worth reusing for any paid tier. The feature table grouped by *user outcome* (Invest/Track/Analyse) rather than by *internal feature name* is worth mirroring — group Tradl's pricing table by outcome (e.g., "Research", "Alerts", "Automation") not by internal feature codenames.

### 3.3 Screener (`/screener`)
A left-filter + right-data-grid layout, the canonical "power tool" pattern:
- Ad banner top (with an inline "Ads help us keep the platform accessible to all. Go ad-free with Pro! 🔒 Unlock Pro" line directly under it — turns an ad into a soft upsell nudge rather than pure interruption).
- Left rail: collapsible filter groups (Stock Universe, Sector, Market Cap with dual-handle range slider + quick-pick chips Smallcap/Midcap/Largecap, Close Price, PE Ratio, 1M/1D Return, ROE, PB Ratio).
- Main panel: result count ("Showing 1–40 of 5855 results"), sortable data table, export button, save/share/edit icons top-right, "last updated at HH:MM" freshness timestamp.
- **Row hover → preview card**: hovering a stock row surfaces a floating mini-profile card (logo, sector breadcrumb, description snippet + "Read more", 1Y sparkline with 52W-high/low callouts, key stats, bookmark icon, "View Details" CTA). This progressive-disclosure pattern (row → hover card → full page) avoids forcing a full navigation just to sanity-check a row.

**Adapt for Tradl AI:** if Tradl AI has any list/table-heavy surface (watchlists, AI output rankings, comparison tools), the hover-preview-card pattern is a strong, low-effort way to add depth without extra clicks. The "ad copy that offers an upgrade path" framing is also reusable for any freemium messaging.

### 3.4 Entity detail page (e.g. `/stocks/RELIANCE`)
The deepest, most component-rich page type — effectively Tickertape's "product within the product":
- **Left sticky column**: logo+name header, live price + %change, primary Buy/Sell action buttons (color-coded red/green), then a **"Stock Scorecard"** — a vertical list of labeled signal rows (Performance/Valuation/Growth/Profitability/Entry point/Red flags), each with a colored severity chip (Low/High/Good) and a one-line plain-English verdict. Several rows are **paywalled with a lock icon** — the content is teased (label + tag visible) but the detail is hidden, with a "Go Pro to unlock score, rank and other metrics" nudge card underneath. This is a very effective contextual-paywall pattern: never blank/hidden entirely, always shown-but-locked with a specific concrete promise.
- **Right main column, sticky tab bar**: Overview / Sentiment / Forecasts / Financials / Peers / Holdings / Events / News — the page is actually one long scrollable document; scrolling auto-advances the active tab highlight (scrollspy pattern), so tabs behave as both navigation and a progress/table-of-contents indicator.
  - Overview: price chart with period toggle (1D/1W/1M/1Y/5Y/Max/SIP), 3 info tiles (sector/theme tags, market-cap rank, volatility-vs-index), contextual ad, "Performance & Key Metrics" grid.
  - Sentiment: an **AI-generated narrative summary** ("RELIANCE Stock Summary · [Month Year]" — plain-language paragraph synthesizing an earnings call), followed by two parallel color-coded card columns — **"Growth Drivers" (green, count badge) vs "Stock Challenges" (red, count badge)** — each a short list of bolded-headline + 1-line-explanation cards. This two-column pro/con framing is an excellent, instantly-scannable way to present AI-synthesized qualitative insight.

**Adapt for Tradl AI:** if Tradl AI produces any kind of scored/ranked output (risk scores, AI confidence, opportunity signals), the "scorecard with severity chips + one-line plain verdict + partial paywall lock" pattern is directly transferable and proven. The green/red "Drivers vs Challenges" twin-column card layout is an excellent template for presenting any AI-generated pro/con or bull/bear analysis — very on-theme if Tradl AI's product involves LLM-generated reasoning that needs to be made trustworthy and scannable rather than a wall of text.

### 3.5 Market Mood Index (`/market-mood-index`)
Single-purpose "hero widget" landing page:
- Small eyebrow ("Know what's the sentiment on the street today") + large page title.
- The **circular gauge** dominates the fold: FEAR ↔ GREED arc (green→orange→red), a needle, big numeric readout (58.06) + "Updated 1 minute ago" freshness label, a share icon + view-count ("224.1k"), and a **"Live on Tickertape" embeddable-widget badge** — explicitly designed to be screenshotted/shared/embedded (a growth loop disguised as a utility).
- Plain-language interpretation line directly under the gauge ("MMI is in **the greed zone**. It suggests investors are acting greedy... **See all Zones**") — always translates the raw number into an actionable sentence, never leaves the number to speak for itself.
- Below the fold: "Change in MMI vs NIFTY" comparison table, historical trend charts, methodology explainer.

**Adapt for Tradl AI:** a single-purpose page for Tradl's signature metric/gauge, built to be shared (view count + share icon + "Live on [brand]" badge), is a low-cost, high-leverage growth and brand-recall mechanic worth designing in from day one.

### 3.6 Sign-up / login flow
Triggered from the persistent top-right "Sign Up / Login" button anywhere in the product (not a separate page — a centered modal overlay):
- Split two-panel modal: **left panel** = app download cross-sell (QR code + phone mockup + "Redefine your investing experience" headline reused verbatim from the homepage closing section — consistent brand line reinforced across touchpoints); **right panel** = the actual auth form.
- Auth form is deliberately minimal: country-code selector (+91 default) + a single phone-number field + one primary "Get OTP" button + a passive consent line ("By logging in, you agree to our Terms & Conditions") — no checkbox, no password field, no email at step one. Presumably OTP verification is step two.
- This is a **single-field, single-decision first step** — the lowest-friction possible entry, deferring any further data collection until after the user is already past the first hurdle.

**Adapt for Tradl AI:** mirror the "one field, one button, no password" first step if phone/OTP or magic-link auth fits Tradl's stack — every additional field or decision at step one measurably drops conversion. Reuse a single memorable brand headline (Tradl's own version of "Redefine your investing experience") consistently across hero, app-download panel, and login modal so it accrues recall rather than being written once and forgotten.

### 3.7 Blog / content hub (`/blog`)
Distinct sub-brand visual system (see §1): black nav bar with its own IA (Start Here / How to Invest / Current Events / Corporate Finance / More), white content canvas, flat 2-color line illustrations with dotted-circle backgrounds (used as generic article thumbnails when no photo exists), category eyebrow tags in small-caps ("STOCK STORIES", "MARKET EXPERTS"), date + read-time metadata, and a persistent bottom-right corner **product-cross-sell widget** ("Use 200+ filters to analyse your Stocks & MFs → Try Tickertape") that follows the reader down the page — content marketing explicitly funneling back to the tool.

**Adapt for Tradl AI:** if Tradl AI builds an educational/SEO content layer, deliberately differentiate its visual system from the product (lighter, editorial) while keeping a persistent, non-intrusive corner CTA back to the product — don't rely on in-article links alone.

---

## 4. Visual design language

| Aspect | Product surface (app/dashboard/screener/stock pages) | Content surface (blog) |
|---|---|---|
| Background | Near-black / dark navy (#0e0e10-ish), white card surfaces floating on it | Pure white |
| Primary accent | Indigo/violet-blue (used for CTAs, highlighted headline words, active states) e.g. pricing hero purple, "Identify red flags" accent word | Same brand indigo for links/CTAs, but sparingly |
| Semantic color | Strict red = negative/loss/sell, green = positive/gain/buy, orange/amber = neutral-caution (MMI "Greed", scorecard "warning" chips) | Same red/green convention where financial data appears |
| Typography | Clean grotesk sans-serif throughout; bold heavy-weight for numbers and headline stats; numbers get visual priority over labels (large price, smaller ticker) | Same family, more generous line-height/leading for long-form reading |
| Iconography | Small circular colored icon tiles (mega-menu), line icons for scorecard rows (lock, flag, arrow), lots of **status chips/pills** (rounded, colored-background, short label) | Flat, 2-tone line illustrations for topic thumbnails (finance metaphors: piggy bank, plant/growth, bull silhouette) |
| Data viz | Sparkline mini-charts everywhere (in rows, in hover cards), full interactive line charts with period toggles, the signature circular gauge/dial, bar/CAGR figures | Minimal — mostly illustrative, not functional charts |
| Density | Very high information density, terminal-like, comfortable for finance-literate power users | Low density, generous whitespace, editorial |
| Motion/microinteractions | Hover-triggered preview cards, scrollspy tab highlighting, live-updating tickers/marquee, loading skeleton shimmer on data cells | Standard content-site interactions |
| Trust signals | Repeated stat bar (users/AUM/downloads/rating) at multiple funnel points, "last updated" timestamps everywhere, freshness badges | Author/date/read-time metadata |
| Paywall treatment | Never hidden entirely — always visible label + lock icon + one-line promise of what's behind it | N/A |

**Adapt for Tradl AI:** the two most transferable *system-level* decisions (independent of specific colors) are (1) strict, consistent semantic color-coding wherever there's directional data — decide Tradl's own red/green/neutral convention once and apply it everywhere without exception, and (2) the "never hide, always tease" paywall pattern (label + lock + concrete promise) rather than blanking premium content outright — it builds desire without feeling punitive.

---

## 5. Component inventory (for a design system / Claude Design component library)

Reusable atomic and composite components observed, with suggested naming for a Tradl AI system:

1. **Entity row** — avatar/logo + primary label + secondary sub-label + trailing sparkline + trailing metric + trailing action icon (bookmark/save). Used for stocks, funds, smallcases — i.e., any "list of things with a live number."
2. **Filter pill / tab group** — horizontal row of rounded toggle buttons (Gainers/Losers/Most Active…), single-select, dark-filled active state.
3. **Stat tile** — label (muted, small) over value (bold, large) + trend arrow/color; used solo and in 3–4-tile trust strips.
4. **Hover preview card** — floating card triggered on row hover, mini chart + key facts + primary CTA.
5. **Signature gauge/dial** — circular arc meter with needle, zone labels, live numeric readout, freshness timestamp, share affordance.
6. **Scorecard row (lockable)** — icon + title + severity chip + one-line verdict + optional lock overlay + "Go Pro" nudge.
7. **Pro/Con twin card column** — two side-by-side colored (green/red) card stacks with count badges, for AI-generated bull/bear or driver/challenge synthesis.
8. **AI narrative summary block** — labeled ("[Entity] Summary · [date]"), plain paragraph, expandable/collapsible.
9. **Sticky pricing/checkout card** — plan radio list + inline coupon module + sticky total bar.
10. **Grouped comparison table** — feature rows nested under outcome-based section headers, FREE/PRO (or tier) columns, checkmark-or-blank cells.
11. **Mega-menu (job-based)** — 3 labeled groups × icon-tile grid, "New" badges.
12. **Auth modal (split panel)** — app cross-sell left / minimal single-field form right.
13. **Ticker marquee** — always-on horizontal live-data strip pinned above the main nav.
14. **Freshness/live indicator** — small muted "Updated X minutes ago" / "last updated at HH:MM" text, used to reinforce real-time trust.
15. **Corner cross-sell widget** — persistent, dismissible bottom-corner card nudging from content → product.

---

## 6. Storytelling & narrative structure

Across every surface, Tickertape follows a repeatable narrative shape:

**Raw number → plain-language interpretation → actionable next step.**
Examples: MMI shows "58.06" but always pairs it with "MMI is in the greed zone. It suggests investors are acting greedy... See all Zones." The stock scorecard shows "Valuation: High" but always adds "Seems to be overvalued vs the market average." The AI sentiment block never just shows data — it narrates it as a summary paragraph, then structures the "why" into scannable driver/challenge cards.

This is the core storytelling technique worth carrying into Tradl AI: **never present a raw metric alone — always pair it with a one-line, plain-English translation**, especially for an AI product where "why did the model say this" is the primary trust question users will have.

The brand-level story is "we make sophisticated market intelligence effortless for the everyday investor" — reinforced structurally (free tier is genuinely useful; Pro adds *more depth*, not *the only useful bits*), which builds trust before asking for money.

---

## 7. Sign-up flow & growth loops (conversion mechanics)

1. **Value-before-ask**: full live product visible logged-out; login only required to *personalize/save* (portfolio linking, watchlists), not to *see* value. Classic reverse-funnel PLG.
2. **Low-friction first step**: single phone field, no password, no email at step one.
3. **Persistent, non-blocking upgrade nudges**: "Unlock Pro" appears contextually next to ads and locked scorecard rows, never as a hard paywall interstitial on the main content.
4. **Urgency-framed limited-time coupons** baked directly into the pricing card (not a separate banner) — reduces path-to-purchase to zero extra clicks.
5. **Shareable proprietary widgets** (MMI gauge with view-count + share icon + "Live on Tickertape" embeddable badge) — a growth loop where the product's own output is the acquisition asset.
6. **Cross-sell between content and product**: blog's persistent corner widget, "See All" links from home sections into the full screener/tool.
7. **App-install cross-sell baked into the login modal itself** (QR + mockup), not just a separate download page — every login moment doubles as an app-install moment.
8. **Repeated social proof** (60L+ users, ₹60,500 Cr tracked, 4.2★, 6.2M+ downloads) resurfaces at homepage close, pricing page, and implicitly reinforces trust right before every conversion ask.
9. **Consistent recurring brand headline** ("Redefine your investing experience") reused verbatim across homepage close and login modal — builds message memorability through repetition rather than novelty.

**Adapt for Tradl AI:** the single highest-leverage idea here for an AI product at alpha stage is #1 — let people experience real AI output before requiring signup, even a capped/sample version, since trust in an AI tool is earned through demonstrated output, not promised in copy. Combine with #2 (minimal first-step friction) and #5 (a shareable signature artifact) as the core acquisition loop.

---

## 8. Direct recommendations for Tradl AI's website (synthesis)

1. **Design one signature, proprietary visualization** (a gauge/dial/index) that becomes Tradl AI's visual shorthand — recur it on homepage hero, a dedicated deep-dive page, and as a shareable/embeddable widget with a live view-counter.
2. **Lead the homepage with real, working output** (sample AI analysis, live demo, or realistic product screenshot) rather than an abstract illustrated hero — pair every AI-generated number/verdict with a one-line plain-English interpretation, never show a raw score alone.
3. **Structure the primary nav as 3 job-based groups** (Products / AI Tools / Learn) with icon-tile mega-menus and "New" badges, instead of generic marketing nav labels.
4. **Use a green/red twin-column "drivers vs risks" (or "for vs against") card layout** wherever the AI needs to explain reasoning — this is the single most reusable component for an AI-native product needing to build explainability and trust.
5. **Make the pricing page a single focused plan** with a sticky total + inline urgency coupon, and a feature table grouped by user outcome, not internal feature names.
6. **Keep sign-up to one field / one primary action** at step one; put any secondary cross-sell (app install, newsletter) in the same modal rather than a separate flow.
7. **Never fully hide premium content** — tease with a label + lock icon + one concrete sentence about what unlocking reveals.
8. **If Tradl AI builds an education/content layer**, give it a deliberately different (lighter, editorial) visual register from the product, linked back via a persistent, dismissible corner widget.
9. **Repeat a small number of trust stats and one memorable brand headline verbatim** across multiple touchpoints (hero close, pricing, auth modal) rather than varying the copy — repetition builds recall, especially valuable pre-alpha when the brand has no existing recognition to lean on.

---

## 9. Screens captured during this scan (for reference)

- Homepage: top-of-page dashboard, mid-page smallcase/news modules, closing stats + footer
- Pricing page: hero + pricing card, grouped feature comparison table
- Mega-menu ("More" dropdown): full Products / Tools / Read-and-share grid
- Screener: filter rail + data grid + row hover preview card
- Stock detail page (Reliance Industries): Overview tab (scorecard, chart, tags) and Sentiment tab (AI summary + drivers/challenges cards)
- Market Mood Index page: full gauge + interpretation copy
- Sign Up / Login modal: split app-cross-sell + phone-OTP form
- Blog homepage: nav, article cards, illustration style, corner cross-sell widget

*(Screenshots were captured live in-session; re-scan closer to the Tradl AI build date if Tickertape ships a redesign, since fintech product UIs iterate frequently.)*
