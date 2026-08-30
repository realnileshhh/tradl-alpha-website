# Inspiration Handoff — Public.com
**Prepared for:** Tradl AI website revamp (Claude Design project)
**Reference platform:** Public.com — "Investing for those who take it seriously"
**Category fit:** Direct comparable — US multi-asset AI-powered brokerage vs. Tradl AI's AI-powered trading intelligence platform for Indian retail traders. High relevance for layout patterns, AI-feature storytelling, and trust-building on a financial product.
**Captured:** August 2026

---

## 1. Snapshot — What Public Is Selling

Public positions itself as the serious, grown-up alternative to gamified trading apps (implicit dig at Robinhood). The entire site reinforces three claims, repeated in different words on almost every page:

1. **We are the most advanced platform** — multi-asset (stocks, options, crypto, bonds, treasuries, ETFs), AI-native, agentic.
2. **We are the most trustworthy platform** — regulated, insured, encrypted, transparent about fees, headquartered in the US.
3. **We pay you more / charge you less** — options rebates, high APY, low margin rates, 1% IRA match.

Every feature block on the site follows this same rhetorical shape: *plain-language benefit headline → one-sentence explanation → proof element (number, comparison table, or live-looking product UI) → "Learn more" link.* That repeatable rhythm is the single most reusable pattern for Tradl AI.

---

## 2. Sitemap

```
Public.com
│
├── Home (/)
│
├── Products (mega-menu, 4 columns + promo tile)
│   ├── Assets
│   │   ├── Stocks            /invest/stocks
│   │   ├── Crypto            /invest/crypto
│   │   ├── ETFs               /invest/etfs
│   │   ├── Options Trading    /invest/options-trading
│   │   └── Bonds              /invest/bonds
│   ├── Custom Strategies
│   │   ├── Direct Indexing    /direct-indexing
│   │   ├── Generated Assets   /generated-asset
│   │   ├── Trading API        /api
│   │   └── Public MCP [New]   /mcp-trading
│   ├── Yield Accounts
│   │   ├── Bond Account            /bond-account
│   │   ├── High-Yield Cash Account /high-yield-cash-account
│   │   └── Treasuries               /invest/treasuries
│   └── Account Types
│       ├── Margin                       /invest/margin
│       ├── Traditional & Roth IRAs      /ira
│       ├── Crypto IRAs [New]            /invest/crypto-ira
│       ├── Trust Accounts [Soon]
│       └── Corporate Accounts [Soon]
│
├── Agents (flagship product, own nav item)     /ai-agents
│   └── How Agents work                          /ai-agents/how-it-works
│
├── Tools & Resources (mega-menu, 2 columns + promo tile)
│   ├── Options Trading Rebate Program   /options-rebate-explained
│   ├── Margin Interest Calculator       /tools/margin-interest-calculator
│   ├── Insights and Essentials (blog)   /learn
│   ├── Prompt Hub                        /ai-agents/how-it-works (prompt library)
│   ├── Bond Screener                     /bonds/screener
│   └── API Documentation                 /api/docs
│
├── Company (mega-menu, 2 columns + promo tile)
│   ├── About                 /about-us
│   ├── Public Concierge      /concierge
│   ├── Careers               /careers
│   ├── Have questions? (mailto support)
│   ├── Newsroom              /newsroom
│   └── The Rundown (podcast) /the-rundown
│
├── Utility
│   ├── Log in                /login
│   └── Sign up (deep-linked, app-store aware)  /signup
│
└── Footer (5 columns)
    ├── Products   (Stocks, ETFs, Crypto, Crypto IRA, Options, Margin, Bonds, Direct Indexing…)
    ├── Resources  (About Us, Learn, Careers, Fee Schedule)
    ├── Quick Links (MCP Server, Investment Themes, Investing Glossary, Fixed Income Glossary,
    │               Options Glossary, Transfer your Portfolio, Treasury Yield Curve, Margin Calculator)
    ├── Contact Us (Help, FAQ, support@, press@)
    └── Brand block (logo, regulatory/FINRA link, social icons, app store badges)
```

**Observations for Tradl AI:**
- Primary nav is only **4 items** (Products, Agents, Tools & Resources, Company) plus Log in / Sign up — the flagship AI feature ("Agents") gets promoted out of the Products menu into its own top-level nav item. Tradl AI could do the same for its core differentiator (e.g., a standalone "AI Signals" or "Copilot" nav item instead of burying it under Products).
- Every mega-menu ends in a **dark promo tile** ("Get started in under 5 minutes") — the sign-up CTA is never more than one dropdown away, anywhere on the site.
- A dedicated **content/media arm** (The Rundown podcast + Learn blog) lives in Company/Tools nav, not hidden — content marketing is treated as a core product surface, not an afterthought.

---

## 3. Page-Type Wireframes

Public.com is built from a small number of repeating page templates. Documenting the template, not just the page, is what makes this transferable to Tradl AI.

### 3.1 Homepage wireframe

```
┌─────────────────────────────────────────────────────────┐
│ NAV: logo | Products▾ Agents Tools▾ Company▾   Log in [Sign up]│
├─────────────────────────────────────────────────────────┤
│  HERO                                                     │
│  Large serif H1 (2 lines) — emotional positioning line    │
│  3 inline icon+label trust chips (Multi-asset / AI / APY) │
│                                     [Get started →] (pill) │
│  Full-width product screenshot (device mock, angled 3D)   │
├─────────────────────────────────────────────────────────┤
│  ASSET TICKER STRIP — all products as plain text list,    │
│  separated by dots, small black pill badges for promos    │
│  (e.g. "5.66% yield*", "1% MATCH")                         │
├─────────────────────────────────────────────────────────┤
│  SECTION: "AI for investors" (eyebrow + serif H2)          │
│    → 1 large feature card (Agents) full width              │
│    → 2-column card grid (Market briefing / Key moments)    │
│    → 1 large card (Generated Assets)                       │
│    → 2-column card grid (Earnings summaries / Research)    │
│  Each card: label, 1-sentence benefit copy, "Learn more →",│
│  and a realistic in-app UI screenshot anchored to one side │
├─────────────────────────────────────────────────────────┤
│  DARK SECTION: "The new standard. For active trading."     │
│  eyebrow "public active trading" (2-tone wordmark)          │
│  3-column card grid, dark cards, each with a proof visual: │
│   - comparison table (Public vs Robinhood vs Fidelity...)  │
│   - stat + bar chart (margin rate comparison)               │
│   - code snippet (API)                                     │
├─────────────────────────────────────────────────────────┤
│  SECTION: "Five nerdy features you'll love" (playful copy) │
│  2-col + full-width alternating card grid, light-gray bg   │
├─────────────────────────────────────────────────────────┤
│  STAT BANNER: icon + "$250,000 in instant buying power"    │
├─────────────────────────────────────────────────────────┤
│  DARK CARD: "Public Concierge" — exclusivity/VIP upsell     │
│  benefit checklist + glowing gradient art + Apply CTA       │
├─────────────────────────────────────────────────────────┤
│  DARK SECTION: "Secure by design. Transparent by choice."   │
│  2×3 trust grid (regulation, insurance, encryption, HQ,     │
│  fee transparency, uptime %) — logos (FINRA/SIPC/FDIC)      │
├─────────────────────────────────────────────────────────┤
│  FINAL CTA (dark, full-bleed device photo)                  │
│  "Fund your account in 5 minutes or less" [Sign up]          │
│  star rating + review quote + "10K+ reviews" badge           │
├─────────────────────────────────────────────────────────┤
│  FOOTER: 5-column link grid + brand/social/app-store block  │
└─────────────────────────────────────────────────────────┘
```

**Narrative arc:** emotional hook → prove the product is powerful (AI) → prove it's cheaper/better than competitors → prove it's generous (features, buying power, concierge) → prove it's safe → ask for the sign-up, twice, with social proof attached both times.

### 3.2 Product / feature page wireframe (e.g. `/invest/stocks`, `/ai-agents`)

```
┌─────────────────────────────────────────────┐
│ NAV (same global nav)                         │
├─────────────────────────────────────────────┤
│ Small category pill badge ("Stocks")          │
│ Large serif H1, 2 lines, benefit statement     │
│ 1-sentence gray subhead                        │
│ [Primary CTA — filled black pill]              │
│ [Secondary CTA — outline pill] ("Explore X")   │
├─────────────────────────────────────────────┤
│ "Essentials" eyebrow + H2                      │
│ 3×2 grid of small text-only feature bullets    │
│ (icon + label, no long copy — a checklist feel)│
├─────────────────────────────────────────────┤
│ "Key features" — 2-column alternating cards,   │
│ each with real in-app screenshot + short copy  │
├─────────────────────────────────────────────┤
│ Category-specific proof section                │
│ (e.g. logo wall of 300+ int'l stocks for       │
│ Stocks page; live agent list for Agents page)  │
├─────────────────────────────────────────────┤
│ Reused: "AI for investors" module (same as home)│
├─────────────────────────────────────────────┤
│ Reused: "Secure by design" trust grid           │
├─────────────────────────────────────────────┤
│ Reused: final CTA band + reviews                │
├─────────────────────────────────────────────┤
│ FAQ accordion — "Have questions? Find answers." │
│ (1 open by default, rest collapsed)             │
├─────────────────────────────────────────────┤
│ FOOTER                                          │
└─────────────────────────────────────────────┘
```

Note the deliberate **reuse of the AI module, trust grid, and CTA band across every page** — these three blocks appear near-verbatim on the homepage, the stocks page, and (in adapted form) the Agents page. This is a componentized design system, not bespoke pages. **Directly applicable to Tradl AI:** build 3–4 "hero modules" (AI/intelligence proof, trust/regulatory proof, final CTA) as reusable blocks and drop them into every product page instead of writing new content per page.

### 3.3 Flagship-feature landing page wireframe (`/ai-agents`)

This is the richest template on the site and the one most relevant to an AI trading product like Tradl AI:

```
Hero: "Agents. For your portfolio." + 1-line explanation + [Request access]
   → uses "request access" not "sign up" = manufactured scarcity/exclusivity
Legal disclosure line directly under the CTA (small, gray, always visible — not hidden in a modal)
"How it works" — 3-step numbered explainer (Prompt → Refine → Activate)
Embedded product demo video
"Agents can do a lot. Here's a start." — auto-scrolling horizontal carousel of
   real example prompts as cards (status badge: Active / Coming Soon, tag chips
   for category e.g. "Market Monitoring", "Risk Management")
"Agent Skills" — capability checklist grouped into 4 categories (Trading strategies,
   Indicators, Data sources, Cash management), including items marked "(soon)"
   — radical transparency about what's NOT built yet
"Designed for safety" — 3-column trust grid specific to AI (Transparency /
   Security / Control), separate from the generic regulatory trust grid
"Infrastructure" — 3-column technical credibility grid (real-time data,
   instant execution, no API keys required)
Closing manifesto line: "Public is the world's first Agentic Brokerage."
Final CTA: "Agents have arrived. Request access."
FAQ accordion
```

**This is the single best template to borrow for Tradl AI's AI-features page** — the combination of (a) real example prompts shown as trust-building product truth rather than marketing copy, (b) an explicit "here's what still isn't built" capability list, and (c) a dedicated safety/control trust section for the AI feature specifically (separate from generic brokerage trust) is a strong pattern for any AI-driven financial product trying to earn credibility.

### 3.4 About / brand story page (`/about-us`)

```
Eyebrow "About us" + mission-statement H1 (large serif, centered)
Large soft-gradient dome/orb graphic (abstract, not literal)
2-column: product screenshot | mission paragraph + "In 2019 we launched..." origin story
Vertical company timeline, year-by-year milestones (2019 → 2024), each with
   a 1-2 sentence story, not just a date — reads like a founder's letter
"Our investors" — logo wall (VC firms) + name wall of individual/celebrity
   angel investors (Will Smith, Maria Sharapova, Casey Neistat, etc.) — social
   proof via association, not just numbers
Trust grid (reused)
Closing: "Let's give people every opportunity to grow their wealth. We're hiring."
```

**Storytelling technique worth copying:** the milestone timeline frames every past feature launch as evidence of momentum ("first to do X", "one of the first to do Y") — it's simultaneously a brand story and a stealth trust/credibility section. Tradl AI's about page could use the same device: turn its product roadmap history into a "firsts and milestones" timeline for Indian retail investors.

### 3.5 Content / community hub (`/the-rundown`, `/learn`)

Public treats content as a growth channel with its own sub-brand:

- **The Rundown** — a daily 2-tone-branded (mint-on-black) market-intelligence podcast/newsletter with a named, personality-driven host (Zaid Admani, "100M+ views across social media"), a fixed weekly schedule (Mon–Fri daily briefing, Sat deep dive, Sun interview), guest bios, listener star-ratings/testimonials, and a newsletter capture form at the bottom. Every episode page ends with "Brought to you by Public" + a sign-up CTA. This is a lead-gen engine disguised as editorial content.
- **Learn** — a conventional SEO/education blog (Investing Insights and Essentials) organized by topic tag (Stock Market, Options, Investing, Direct Indexing), "Newest" and "Top Articles" rails, standard blog-card grid below.

**Applicable to Tradl AI:** a branded, personality-led daily/weekly market-briefing content series (audio, video, or newsletter) is a strong, low-cost trust and retention loop for a trading-intelligence brand — arguably more relevant to Tradl AI's mission than a generic SEO blog, since it demonstrates the AI/analyst voice the product itself is selling.

### 3.6 Sign-up flow entry screen

```
┌───────────────────┬─────────────────────────────┐
│ DARK PANEL (40%)   │ LIGHT PANEL (60%)             │
│ Logo                │ "Start investing in 5 minutes  │
│ Large serif H1      │  or less."                     │
│ ("Investing for     │ "Already have an account? Log  │
│  those who take it  │  in"                            │
│  seriously")        │ [Single field: Phone number]   │
│ 4 trust bullets      │ Legal microcopy under field     │
│  (icon + label)      │ [Continue] (disabled until      │
│ Grid of product      │  filled)                        │
│  chips as tags       │                                 │
│  (Stocks✓ Options✓...│                                 │
│ Disclosures footnote │                                 │
│  (fine print, always │                                 │
│  visible, not hidden)│                                 │
└───────────────────┴─────────────────────────────┘
```

**Key UX decision:** the sign-up form asks for **one field only** (phone number) before "Continue" — friction is deferred, not front-loaded. The brand promise and trust signals are repeated one more time on this exact screen (people abandon signup forms at the point of commitment, so this is where trust repetition matters most). Directly transferable to a Tradl AI onboarding flow.

### 3.7 404 / error page

On-brand even when broken: same dark cosmic-gradient background used elsewhere on the site, oversized serif "404", plain-language copy ("Sorry, we can't find the page you're looking for"), single pill CTA ("Return home"). No dead ends, no generic browser-style error page.

---

## 4. Visual Design Language

Captured via computed styles, not guesswork — these are Public's actual production values.

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display / headlines (H1, H2) | **"Denton"** (serif, falls back to Times New Roman) | Weight 300 (light), large sizes (32–90px+), tight/normal letter-spacing. Used for every emotional or benefit-led headline. Gives the brand an editorial, "financial newspaper" gravitas that plain sans-serif fintech UIs (Robinhood, most Indian trading apps) don't have. |
| Body copy | **Inter** (sans-serif) | 16px base, black or slate-gray, high legibility, standard for fintech. |
| Buttons / UI labels | **"Invest Pro"** (custom sans-serif) | Distinct from body font — buttons get their own type voice. |
| Numerals/data (stock prices, %) | Inter / tabular figures | Monospaced alignment implied by grid layouts in tables (Queue, comparison tables). |

**Big signal for Tradl AI:** pairing a **serif display face** with a **clean grotesque sans-serif** for everything else is what separates Public visually from every "gamified trading app" aesthetic. If Tradl AI wants to signal seriousness/credibility to Indian retail traders (echoing the "for those who take it seriously" positioning), a serif+sans pairing is a strong, differentiated move versus competitors (Groww, Zerodha, Upstox) who mostly use sans-serif-only, rounded, consumer-app type systems.

### Color palette (extracted from computed CSS)
| Swatch | Approx. hex | Usage |
|---|---|---|
| `rgb(0,0,0)` / `#000000` | Pure black | Primary text, primary button fill, headlines |
| `rgb(255,255,255)` / `#FFFFFF` | Pure white | Base background |
| `rgb(250,249,245)` / `#FAF9F5` | Warm off-white | Alternate section background (softer than pure white) |
| `rgb(243,246,249)` / `#F3F6F9` | Cool light gray | Card backgrounds, feature grid sections |
| `rgb(20,20,19)` / `#141413` and `rgb(27,34,44)` / `#1B222C` | Near-black, slightly warm/cool variants | Dark section backgrounds ("active trading", trust grid, concierge, final CTA) |
| `rgb(0,39,179)` / `#0027B3` and `rgb(0,0,238)` / `#0000EE` | Saturated blue | Link color, small accent icons/eyebrow text |
| `rgb(81,104,128)` / `#516880` and `rgb(86,110,140)` / `#566E8C` | Muted slate blue-gray | Secondary/supporting body copy (subheads, descriptions) |
| `rgb(82,255,255)` / `#52FFFF` | Bright cyan/mint | "The Rundown" sub-brand accent only — used to differentiate the content arm from the core brand |
| `rgb(149,208,255)` / `#95D0FF`, `rgb(255,179,209)` / `#FFB3D1` | Pastel blue, pastel pink | Small illustration/data-viz accent colors (chart lines, decorative dots), not core brand |
| `rgb(220,226,234)` / `#DCE2EA` | Light border gray | Dividers, card borders |

**Palette logic:** the core brand is almost monochrome (black/white/warm-gray) — color is rationed and used only for (a) one saturated blue for interactive/link elements, (b) muted slate for secondary text, and (c) a couple of soft pastel accents strictly inside data visualizations. Dark (near-black) full-bleed sections are used specifically to mark "serious"/premium content (trust, active trading, concierge) — light sections are used for the primary product/feature explanations. This restraint is what keeps a feature-dense site feeling calm rather than cluttered.

### Buttons & shape language
- Buttons are **fully pill-shaped** (`border-radius: 100px`), generous horizontal padding (`0 40px`).
- Primary CTA = black fill, white text. Secondary CTA = white/outline with black border or text link with an arrow (`→`).
- Arrows (`→`) are a consistent affordance on nearly every link/CTA across the site ("Learn more →", "Get started →") — signals forward motion/progress, reinforced everywhere.
- Small status/promo badges (e.g. "5.66% yield*", "1% MATCH", "New", "Soon") are small black or colored pill chips — same shape language as buttons, just miniaturized. This creates visual consistency between interactive and informational elements.

### Imagery style
- No stock photography of people. All hero imagery is **product UI itself** — angled 3D device mockups (laptop/phone) shown against dark, softly-lit backgrounds with light bloom/glow effects, or clean flat screenshots of the real app.
- Abstract 3D render accents (glass/chrome spheres, gradient blobs, glowing dot grids) are used sparingly in dark sections (Concierge, Secure-by-design) to add premium/tech texture without literal illustration.
- Data visualizations (line charts, bar charts, allocation tables) are treated as **hero visual content**, not just supporting detail — they're large, colored, and central to almost every feature card. This is core to convincing a finance-savvy audience: showing real, plausible-looking data > showing marketing illustrations.

### Motion / interaction cues observed
- Auto-scrolling/looping horizontal carousels for repeatable content (agent examples, testimonials).
- Mega-menus slide down as full-width panels with a dark promo tile anchored to the right — every nav dropdown doubles as a micro-conversion surface.
- Hover states on nav items dim sibling items (focus effect) rather than just underlining the active one.

---

## 5. Content & Storytelling Patterns

1. **Headline formula:** short, confident, declarative sentence fragments — "The new standard. For active trading." / "Secure by design. Transparent by choice." / "Agents. For your portfolio." Two short clauses, period-separated, almost always contrastive or additive. This is copy written to be read in under 2 seconds, then backed up by detail underneath.
2. **Category-first framing:** the brand doesn't say "we have great customer support," it says "Public earns high marks for ease-of-use" **and cites the reviewer** (Nerdwallet, 10K+ reviews). Every trust claim is externally sourced or numerically specific (99.994% uptime, $0.06–$0.18 rebate, 4.90% base rate, 300+ international companies) rather than vague marketing adjectives.
3. **Named comparison, not implied comparison:** the margin-rate and options-rebate sections literally name Robinhood, Fidelity, TD Ameritrade in a comparison table. Confidence-by-specificity — bold for a regulated fintech, but very persuasive.
4. **Radical transparency as a selling point:** disclosures are never hidden in fine print links only — key limitations ("Certain capabilities... not yet available") and legal disclaimers sit directly beneath the relevant claim, in the main content flow, not just the footer. This paradoxically increases trust rather than undermining the pitch.
5. **AI feature copy avoids hype language.** Nothing is called "revolutionary" or "game-changing." Copy stays mechanical and specific: "Ask any question about any stock to access real-time and historical insights on price, financials, earnings, competitors, analyst ratings." This is a deliberate register — confident, factual, almost dry — consistent with "investing for those who take it seriously."
6. **Personality is outsourced to a human host**, not the brand voice itself. The brand copy stays formal/serious; "The Rundown" podcast is where warmth, humor, and personality live (via Zaid Admani). This lets Public have both gravitas and relatability without diluting either.

---

## 6. Signup / Conversion & Growth Loops

| Mechanism | How it works on Public | Where it appears |
|---|---|---|
| **Low-friction entry** | Single-field (phone number) sign-up form; account funding promised in "5 minutes or less" | Signup page, repeated as a headline on homepage + every product page footer CTA |
| **Everywhere CTA** | "Sign up" / "Get started" button in nav (always visible), every mega-menu promo tile, end of every content module, every product page, every FAQ block | Global |
| **Manufactured scarcity/exclusivity** | Agents feature uses "Request access" instead of "Sign up" — implies a waitlist/beta, increasing perceived value | `/ai-agents` |
| **Tiered upsell / VIP loop** | "Public Concierge" — a visible, aspirational tier for $500k+ accounts with white-glove support, exclusive events — turns high-value users into an aspirational marketing surface for everyone else | Homepage, Company nav |
| **Referral/monetary incentive** | "1% MATCH" on IRA contributions; footer mentions "Transfer your portfolio and earn an uncapped 1% match" — directly monetizes account-transfer growth loop | Footer, Rundown page |
| **Rebate-as-growth-loop** | Options trading rebates ($0.06–$0.18/contract) reframe a cost center (trading) as a reason to trade *more* and stay loyal — an unusual "usage rewards" loop for a brokerage | Homepage, Stocks page, dedicated rebate page |
| **Content-to-product loop** | The Rundown podcast/newsletter → every episode ends with a Public sign-up CTA; newsletter capture form mid-page captures email even if user isn't ready to open a brokerage account (lower-commitment first step) | `/the-rundown` |
| **Social proof loop** | Star rating + review snippet + "10K+ reviews" badge (Nerdwallet-sourced) placed directly next to the final signup CTA — proof appears at the exact decision moment, not just on a separate testimonials page | Homepage, product pages |
| **App-store aware deep linking** | Sign-up buttons in the nav route through a smart deep-link (Branch/Sngine-style link) that opens the native app if installed, or falls back to the web signup — removes app-vs-web friction | Global nav "Sign up" |
| **Progressive disclosure of complexity** | Product pages start with a 2-line benefit headline and dual CTA (Sign up / Explore) before showing any features — complexity (fees, mechanics, FAQs) is pushed to the bottom of the page, after trust and desire are established | All product pages |

**Loop worth prioritizing for Tradl AI:** the **content → capture → convert** loop (Rundown/Learn) is probably the most transferable growth mechanic — for an Indian retail-trading audience that is still being educated about markets, a personality-led daily briefing (could be Hindi/English bilingual, WhatsApp/YouTube-native) doubles as both a trust-building tool and a low-commitment funnel top before asking for full sign-up.

---

## 7. UI/UX Component Inventory

Reusable components observed, worth replicating as a component library for Tradl AI's design system:

- **Pill button** (primary filled / secondary outline / text-link-with-arrow)
- **Eyebrow + serif H2 section header** (small label above every major section, sets context before the big headline)
- **Benefit card** (icon or screenshot + short headline + 1-sentence copy + "Learn more →") — the atomic content unit of the entire site
- **Comparison table** (brand row highlighted/bolded vs. competitor rows in gray)
- **Trust grid** (icon + label + 1-sentence copy, repeated 3–6 times in a row/grid, always ending with a regulator logo)
- **Stat callout** (oversized number + short label, e.g. "4.90% Base rate")
- **Status/category chip** (rounded mini-badge: "New", "Soon", "1% MATCH", category tags on agent cards)
- **FAQ accordion** (first item open by default)
- **Mega-menu with promo tile** (multi-column nav dropdown ending in a dark CTA tile)
- **Split-screen auth/signup layout** (dark brand panel + light form panel)
- **Timeline / milestone list** (year markers + short narrative, used on About page)
- **Horizontal auto-scroll carousel** (used for logo walls, agent examples, review quotes)
- **Live-data-styled mock UI cards** (fake but realistic portfolio/price/chart screenshots used as hero imagery instead of illustrations)

---

## 8. Direct Recommendations for Tradl AI's Website (Claude Design Input)

Translating the above into starting points for Tradl AI, an AI-powered trading intelligence platform for Indian retail traders on NSE/BSE:

1. **Adopt a serif-display + sans-body type pairing** to visually differentiate from Groww/Zerodha/Upstox's all-sans-serif, rounded consumer-app aesthetic and signal "serious tool," not "gamified app." (This is exactly the positioning wedge Public used against Robinhood — the same wedge is open in the Indian market.)
2. **Give the AI feature its own top-level nav item and dedicated flagship landing page**, using the `/ai-agents` template: how-it-works steps, real example outputs, an explicit capability/roadmap checklist (including "coming soon" items), and a *feature-specific* trust section (transparency/security/control) separate from generic brokerage trust.
3. **Build 3 reusable page modules** (AI-proof module, trust/regulatory module, final-CTA-with-social-proof module) and reuse them verbatim across every product page rather than custom-building each page.
4. **Keep the color system near-monochrome** (black/white/warm-gray) with one saturated accent color reserved for links/interactivity, and use full dark sections specifically to mark "premium/trust/serious" content blocks — this creates a lot of implied hierarchy without needing many colors.
5. **Treat disclosures/limitations as content, not legal boilerplate** — show them inline near the relevant claim. For a SEBI-regulated or SEBI-adjacent product this both builds trust and is likely good compliance practice.
6. **Consider a personality-led daily/weekly market-briefing content series** (audio/video/WhatsApp) as the top-of-funnel growth loop, mirroring The Rundown — this is likely more culturally resonant and lower-cost than a traditional SEO blog for an Indian retail-trader audience.
7. **Single-field-first sign-up entry** (e.g., phone/mobile number only, matching how most Indian fintech onboarding already works via OTP) with brand/trust reinforcement on the same screen, not a separate marketing page.
8. **Use real (or highly realistic) product screenshots as hero imagery everywhere**, not illustrations or stock photography — for a trading intelligence product, showing actual data/UI is itself a trust signal.

---

## Appendix — Pages Captured

| Page | URL | Purpose captured |
|---|---|---|
| Homepage | public.com/ | Full-page structure, hero, all major sections, footer |
| Stocks product page | public.com/invest/stocks | Product-page template |
| AI Agents flagship page | public.com/ai-agents | Flagship feature template, AI trust pattern |
| About Us | public.com/about-us | Brand story, milestone timeline, investor social proof |
| The Rundown | public.com/the-rundown | Content/media growth loop, sub-brand system |
| Learn | public.com/learn | SEO/education blog hub |
| Sign-up entry | public.com/signup | Onboarding flow, split-screen auth pattern |
| Products mega-menu | (homepage nav) | Sitemap, IA |
| Tools & Resources mega-menu | (homepage nav) | Sitemap, IA |
| Company mega-menu | (homepage nav) | Sitemap, IA |
| 404 page | public.com/transfer-your-portfolio (broken link) | Error-state brand consistency |
| Mobile homepage | public.com/ (390×844 viewport) | Responsive behavior |

*Typography and color values were extracted directly from the live site's computed CSS (not estimated from screenshots), so they can be used as accurate reference values.*
