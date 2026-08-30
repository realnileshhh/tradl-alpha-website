# PowerUp Money — Inspiration Handoff File
**For: Tradl AI website revamp ("Claude design" project) — Alpha launch, Aug 2026**
**Source studied: https://www.powerup.money/ (+ /powerage, /calculators, /blog, /documents) — captured 17 Aug 2026**
**Platform #5 in the inspiration series** (after Groww 915, Public.com, INDmoney, Upstox)

---

## 0. What PowerUp Money is, in one line

A SEBI-registered Investment Adviser app for Indian retail investors that reviews, ranks, and rebalances your **mutual fund** portfolio — pitched as "expert-like planning/learning, all on your own." No direct trading; it's an advisory/decision-support layer, which makes its UX patterns for **trust-building, decision-simplification, and "AI-copilot-adjacent" positioning** unusually close to what Tradl AI needs to say for a trading co-pilot.

**Why this one matters more than the others studied so far:** PowerUp is SEBI-regulated (RIA, not broker), India-only, retail-first, and its entire value prop — "you be the expert, we do the analysis" — is structurally the same pitch Tradl AI needs to make for stock trading instead of mutual funds. Its compliance-page architecture, trust badges, and "in-house expert" framing are a near-direct template for a SEBI-registration-in-progress brand.

---

## 1. Sitemap

```
powerup.money/                          [Home — "Power Mutual Funds" product]
├── /powerage                           [Power Age — financial-freedom-age calculator/planner, product #2]
├── /calculators                        [Calculators hub]
│   ├── /calculators/sip
│   ├── /calculators/lumpsum
│   ├── /calculators/cagr
│   ├── /calculators/rent-vs-buy
│   ├── /calculators/[loan calculators — EMI, Home Affordability]
│   └── /calculators/life-insurance
├── /blog  (separate sub-app / different header)    [Content hub — magazine grid, category filter pills]
│   └── /blog/[slug]
├── /documents                          [Compliance & legal hub, sidebar-nav layout]
│   ├── ?docsType=POWER_UP                          Platform Terms & Conditions
│   ├── ?docsType=POWERUP_MONEY_WEALTH_MANAGEMENT... Investment Advisory Agreement
│   ├── ?docsType=GRIEVANCE                          Grievance Redressal Policy
│   ├── /docs/powerup_mf_methodology.pdf             Mutual Fund Rating Methodology (PDF)
│   ├── ?docsType=AUDIT_STATUS                       Audit Status
│   ├── Uni Wealth Privacy Policy, Disclosures, Investor Charter, Mitra, Investor Complaint
├── mailto: po@ / mridul.mimansa@ / care@powerup.money
└── Social: YouTube, Instagram, LinkedIn — external, footer + blog only
```

**Structural read:** Two products live under one nav (Power Mutual Funds = the flagship; Power Age = a viral-loop-shaped planning tool). Calculators exist purely as **SEO/content-marketing surface area** feeding into the same lead form. Blog runs on what looks like a separate front-end (different header, different type system) — a common pattern when marketing/content teams ship faster than the core app. Documents is a first-class nav-adjacent destination, not a buried footer link — notable for a regulated entity.

---

## 2. Page-by-page wireframe & content flow

### 2.1 Home (`/`) — the flagship product page

A single long-scroll page that is essentially **one continuous product demo**, broken into ~9 sections, each pairing a short marketing headline with a real (but staged) phone-screen UI mock. Structure:

1. **Header (sticky):** Logo left ("PowerUp˙ Money" wordmark with a small dot), 4 nav items right (Power Mutual Funds / Power Age / Calculators / Blogs), no visible login/signup button in the header at all — the CTA lives in the persistent bottom bar instead.
2. **Hero (blue gradient, full-bleed):** H1 "India's trusted Mutual Fund Advisory App" (India-first trust claim in the H1 itself) → subhead "Review, select, and rebalance your mutual funds effortlessly" → floating 3D phone mockup with cascading/fanned fund cards behind it, faint animated arc/wave lines in the background for motion.
3. **"Research you can trust"** — short trust statement + a literal **embossed silver coin/seal graphic** stamped "SEBI RIA INA000019798" — turns a compliance number into a piece of brand iconography instead of hiding it in the footer.
4. **Feature block 1 — Portfolio Performance:** eyebrow label → H2 → subhead → phone mock showing a 4-tier status list (In-form / On-track / Off-track / Out-of-form, color-coded green→amber→red).
5. **Feature block 2 — Fund Performance:** "Know exactly what to do with each fund" → Start SIP / Pause SIP / Exit as literal action labels shown inside the mock.
6. **Feature block 3 — Past Trends:** phone mock shows a **swimlane/timeline chart** — each fund's status plotted across months against the same 4 tiers, so users see fund trajectory, not just a snapshot.
7. **Feature block 4 — Portfolio Tracking:** benchmark comparison card ("My Portfolio +23.35%" vs "NIFTY 50 +12.55%") with a line chart — the classic "beat the index" proof moment.
8. **Feature block 5 — Monthly Reports:** two-column layout, status-shift cards ("Level Up" / "Level Down" tags on individual funds).
9. **"PowerUp Elite" upsell section — full dark/black background with gold-cream (#FFF2DF-ish) accent text and laurel-wreath iconography:** "Manage your portfolio like the top 1%" → 3-step value ladder (Selection → Review → Rebalancing) each tied to a named sub-feature (Power Rank, Rank Trends, Power Rebalancing). This is the one section that breaks the light/blue palette entirely — dark mode reserved exclusively for the premium tier, a deliberate "this feels expensive" signal.
10. **Team section:** horizontal carousel of grayscale circular headshots, Name / Title / years-of-experience / one-line personal mission statement. Explicit prev/next arrow controls, not just swipe.
11. **FAQ:** dark/black full-bleed section, three pill-tabs (Product Overview / Features & Plans / Security & Compliance) filtering an accordion list below.
12. **Footer (black):** legal entity name + RIA/BSE/CIN numbers, SEBI warning line, document links, social links, **"Site map" as a literal labelled block** (accessibility/SEO habit worth copying), two separate registered addresses (company + SEBI regional office), named Principal Officer & Compliance Officer with direct emails, final regulatory disclaimer.
13. **Persistent bottom bar (every page, all breakpoints):** phone-number input + "Analyse my portfolio" button + required marketing-consent checkbox, pre-checked. This is the site's *entire* primary CTA — there is no separate "Sign up" page; the lead form travels with the user everywhere.

### 2.2 Power Age (`/powerage`) — the acquisition/virality product

Different tone entirely — feels like a landing page for a standalone growth tool grafted onto the main site:

1. **Hero (black bg):** two large **chat-bubble-shaped statement pills** ("Am I making good returns on my portfolio?" / "Where should I invest? MF, Stocks, FD, PPF, P2P, Bonds?") — literally rendering the user's internal monologue back at them before offering the product as the answer. Copy: "It's your money. You be the expert." → "Discover your Power Age" CTA.
2. **"Your Power Age" concept intro:** light gradient section, defines the mechanic (2-minute quiz → your financial-freedom age + required corpus) — positions itself as "first-of-its-kind."
3. **Product walkthrough carousel** ("Power Age: A comprehensive planner, not just a number") — Previous/Next controls, phone mock showing editable assumptions (Portfolio Returns 13% p.a., an "Edit" affordance) and a bar chart of projected wealth by age, plus a captioned auto-playing video ("Watch Power Age in action," with a "Hide captions" toggle) for a 2-minute product demo embedded directly in the page.
4. **Power Academy teaser:** same carousel pattern, positioned as "get there faster" — content/education is framed as the *next step* after planning, not a separate destination.
5. Team, FAQ, footer — identical components reused from Home (proof of a shared design system, not one-off pages).
6. **Persistent bottom bar changes shape here:** "Download PowerUp Money" + Google Play / App Store buttons — because Power Age is an app-only feature, the CTA correctly swaps from "leave your number" to "download the app," per page intent.

### 2.3 Calculators (`/calculators`) — SEO/content utility hub

1. Simple header (no hero) — H1 "Calculators" + one-line subhead.
2. Grouped card grid by category: **Investment Calculators** (SIP, Lumpsum, CAGR), **Finance Calculators** (Rent vs Buy), **Loan Calculators** (EMI, Home Affordability), + Life Insurance. Each card: icon, name, one-line description, circular arrow button.
3. Individual calculator pages (e.g. `/calculators/sip`) run a **three-column app-like layout**: left sidebar (calculator switcher), center (sliders + live-updating inputs + donut chart with Principal/Returns/Total breakdown), right rail (Download-app card + "Related Blogs" cards). Below the fold: plain-language educational copy explaining the concept (SEO body copy).
4. No sticky lead-capture bar variant tested here — calculators are pure self-serve utility, not gated.

### 2.4 Blog (separate front-end, `/blog`)

1. Different header entirely (nav reads "PowerUp Money / Calculators / Blogs" — inverted hierarchy from the main nav, confirming it's a separately shipped surface).
2. Hero carousel with custom illustrated art per slide (3 dots, auto-rotating) — e.g. "Track your family's portfolios on PowerUp."
3. Horizontal scrollable **category pill bar**: Bond, Investment Portfolio, Mutual Funds, Newsletter, P2P Lending, Personal Finance, PowerUp Elite… (overflow with a right-chevron affordance).
4. Masonry/asymmetric article grid — each card is a full-bleed custom illustration (not stock photography — flat, brand-colored, friendly character-based art) with headline overlaid.

### 2.5 Documents (`/documents`) — trust/compliance hub

Left sidebar with 8 legal destinations (Investment Advisory Agreement, Privacy Policy, Disclosures, Grievance Redressal, Investor Charter, "Mitra," Investor Complaint…), main pane renders an **embedded PDF viewer** with a "download or open in a new tab" fallback link. Treated as a real section of the site, reachable from main nav → footer → page itself, not an afterthought.

---

## 3. Brand & visual identity

**Wordmark:** "PowerUp" (bold) + small superscript dot + "Money" (regular weight) — the dot is a recurring brand mark, reappears as a bullet/accent throughout (nav active-state dot, small brand flourish next to the logo).

**Typography:** Two custom/licensed webfonts loaded via Next.js font optimization —
- Headlines: a geometric, slightly rounded display face (rendered as `__norse_*` in the DOM) — H1 at 72px/450 weight on desktop, big and confident but not heavy.
- Body: a humanist sans (`__hando_*`) for paragraph copy, labels, UI text.
- This "one distinctive display face + one clean workhorse body face" split — rather than a single system font — is a large part of why the site doesn't read as a generic fintech template.

**Color system (sampled from live computed styles):**
| Role | Hex (approx) | Usage |
|---|---|---|
| Primary blue | `#0062C3` | Hero gradient, primary CTA accents, links, active nav dot |
| Blue-light tint 1 | `#E8F4FF` | Section backgrounds (Portfolio Performance etc.) |
| Blue-light tint 2 | `#E2EEF9` | Alternating section backgrounds |
| Teal-ink (headings) | `#2F4853` | Primary heading color on light sections (not pure black — softer) |
| Cream/gold | `#FFF2DF` | PowerUp Elite dark-section accent text — the one "premium" color |
| Near-black | `#141413` | Elite section + FAQ + footer backgrounds |
| Status green | in-form/on-track tiers | Positive fund performance |
| Status amber | off-track tier | Caution |
| Status red | out-of-form tier | Negative/exit signal |
| Neutral grays | `#404040`–`#999` range | Body copy, secondary text, borders |

**Status-tier color language is the single most reusable idea here:** a consistent 4-step traffic-light taxonomy (In-form → On-track → Off-track → Out-of-form) used identically across the portfolio snapshot, the fund-level cards, the timeline chart, and the monthly-shift cards. One vocabulary, reused everywhere, never redefined per-screen.

**Iconography & illustration:** Flat, rounded, friendly icon set for calculators/features (line-weight ~2px, single accent color per icon). Blog uses custom flat-illustration characters (rounded people, coins, briefcases) rather than photography or 3D renders — keeps the whole brand feeling approachable rather than "trading terminal serious." The SEBI-seal coin graphic on the homepage is the one deliberately more textured/3D asset — used specifically to make a compliance number feel like an award.

**Motion:** Subtle throughout — floating/parallax phone mockups, faint animated wave-lines in hero backgrounds, carousel auto-rotation, section fade/slide-ins on scroll. Notably, the site ships a **user-facing "Pause Animations" toggle** (floating pill, bottom-right, persistent on every page) — an explicit accessibility/user-control affordance rarely seen on marketing sites; worth considering for Tradl AI given a trading audience that may want a calmer, less animated experience while reading numbers.

**Imagery:** Phone-mockup-driven throughout — almost every section pairs copy with a real (staged) app screen inside a device frame, rather than abstract stock photography. This does double duty as product demo + visual interest.

---

## 4. UI/UX component inventory (reusable patterns)

- **Persistent, context-aware bottom bar** — the site's only "signup" surface. Swaps content by page intent (phone-number lead form on Home/Power Age; app-download buttons on Power Age/Calculators/Blog). Never a modal, never a separate route — always present, low friction, single field.
- **Status-tier badge/pill system** — 4-state color taxonomy reused across every product surface (see above).
- **Eyebrow label → H2 → subhead → visual proof** — the atomic unit repeated ~7 times down the homepage. Extremely consistent rhythm; never breaks pattern until the Elite section (intentional break = signals "this is different/premium").
- **Device-framed feature mock** paired with every claim — no feature is described in text alone.
- **Dark-mode section reserved for the premium tier** — color/theme itself is used as a pricing-tier signal.
- **Tabbed FAQ** (Product Overview / Features & Plans / Security & Compliance) — segments trust questions from feature questions from plan questions instead of one long undifferentiated list.
- **Team carousel with explicit prev/next arrows** (not swipe-only) — accessible, and doubles as a trust signal ("named humans built this").
- **Sidebar-navigated compliance hub** — legal/trust content given the same navigational respect as product pages.
- **Category pill filter bar with overflow chevron** — used on blog; scales to many categories without a dropdown.
- **Multi-tool calculator shell** (sidebar switcher + live chart + related-content rail) — turns individual calculators into a mini-app rather than one-off static pages.
- **User-facing "Pause/Play Animations" control** — accessibility-forward, unusual and memorable.

---

## 5. Storytelling & content architecture

**Core narrative spine:** *"It's your money. You be the expert."* Every product (Power Mutual Funds, Power Age, Power Academy) is framed as a tool that gives the user **expert-level clarity without needing to become an expert or hire one** — "expert-like planning/learning, all on your own" is used verbatim as a section eyebrow twice. This is the same emotional promise an AI trading co-pilot needs to make (confidence + control, minus the jargon/cost of a human advisor).

**Headline pattern:** Problem-as-question or problem-as-statement → simple declarative solution. E.g. "See what's in-form & what's out-of-form in your portfolio," "Know exactly what to do with each fund," "Get a clear view of any shifts in your portfolio." Every H2 answers a specific, narrow anxiety a mutual-fund investor actually has — never abstract ("Powerful analytics") but always concrete ("Start SIP, Pause SIP, or Exit").

**Trust-building narrative layer (distinct from feature narrative):** "20+ years of data," "9L+ investors," SEBI RIA number surfaced as hero-section imagery (not just footer text), named Principal/Compliance Officers with direct emails, full registered + SEBI regional-office addresses, an entire dedicated Documents hub. For a company (Tradl AI) that is *becoming* SEBI-registered, this is the most directly transferable section of the whole site — it shows exactly how much regulatory/trust scaffolding a serious Indian fintech surfaces on the public site itself, not just in app.

**Power Age's acquisition narrative is worth separating out as its own case study:** it opens by literally rendering the user's own unspoken question as a chat bubble before saying anything about the product — reframes "we built a calculator" as "we read your mind." This "mirror the user's internal question back to them" technique is a strong pattern for a Tradl AI landing moment (e.g., "Should I sell this position?" / "Am I sizing this trade right?" as opening chat-bubble hooks).

---

## 6. Signup / conversion flow & growth loops

1. **Primary loop — phone-number capture, zero friction:** Single field (phone), one checkbox (pre-checked marketing consent), one button ("Analyse my portfolio"), present on literally every scroll position of the core product pages via the sticky bottom bar. No email, no password, no account creation visible pre-app-download — the entire web funnel exists to collect a warm lead, not to run a self-serve web app. Actual portfolio analysis clearly happens after a callback/app-download step, not in-browser.
2. **Secondary loop — app-download CTA:** swapped in wherever the feature described (Power Age, calculators) is app-only. Same bottom-bar real estate, different content — a single component doing two jobs based on page context rather than maintaining two different UI patterns.
3. **Tertiary loop — content/SEO funnel:** Calculators + Blog exist purely to capture organic search intent ("SIP calculator," "home loan tax benefits," etc.) and funnel back into the same phone-capture bar via the Download-app card sitting in every calculator's right rail, plus "Related Blogs" cross-links.
4. **Virality/hook loop — Power Age:** framed as a shareable, curiosity-driven mini-tool ("discover your Power Age in 2 minutes") — this is the site's most acquisition-optimized surface, structurally similar to quiz/calculator lead magnets that outperform generic "sign up" pages because they promise a personalized payoff (a number) instead of an account.
5. **No visible self-serve login/signup on desktop nav** — deliberate: the web presence's job is lead generation and trust-building, not onboarding; the mobile app is where account creation actually happens. Worth deciding explicitly whether Tradl AI's website should mirror this (marketing-only web + app-only onboarding) or run a full web onboarding flow, since that's a fundamentally different information architecture decision.

---

## 7. Strengths worth borrowing for Tradl AI

- The **status-tier color taxonomy** (4-state, consistently applied everywhere) is directly portable to a trading co-pilot: e.g. a "Strong Buy-hold / Hold / Watch / Exit" or similar signal language, reused identically across dashboard, alerts, and reports — one vocabulary, not five different badge systems per screen.
- **Compliance-as-brand-asset**: turning the SEBI registration number into a hero-section visual (seal/coin) rather than hiding it in the footer is a strong trust move for a company mid-way through becoming SEBI-registered — worth a Tradl AI equivalent once registration lands.
- **The persistent, context-aware bottom CTA bar** is a simpler and arguably higher-converting pattern than a traditional header "Sign Up" button + separate signup page, especially for a mobile-first Indian retail audience.
- **"Mirror the user's own question back to them"** hero copy technique (Power Age) — very applicable to a trading-anxiety audience ("Should I hold or sell?" "Am I overexposed to one sector?").
- **Dedicated, nav-level Documents/compliance hub** — necessary groundwork to have ready before/at SEBI broker registration, and a credibility signal even before that's finalized.
- **Named team with photos + roles + one-liner mission**, not just logos/investor badges — humanizes a regulated-finance brand.
- **User-facing animation toggle** — a small, distinctive accessibility touch that also reads as "we respect that you're here to look at serious numbers, not a light show."

## 8. Gaps / things to do differently for Tradl AI

- PowerUp's web funnel captures a phone number and defers everything else to the app/a human follow-up — fine for advisory, but likely too much friction for Tradl AI if any part of the trading co-pilot experience should be demoable/self-serve directly on web (worth deciding deliberately, not by default).
- The blog running on a visibly different front-end/header is a seams-showing rough edge — Tradl AI should keep content and product on one consistent design system if possible.
- Calculators are useful SEO surface but are fairly generic (every fintech has an SIP/EMI calculator) — for Tradl AI, the equivalent "utility hub" should probably be trading-specific (position-size calculator, R:R calculator, brokerage/tax calculator) to stay differentiated rather than copying category-generic tools.
- Elite/premium tier is signaled only by a color/theme switch with no visible pricing on the page itself — fine for advisory, but a trading co-pilot audience will likely want to see plan/pricing structure more explicitly given the SEBI broker transition Tradl AI is making.

---

*Compiled for insertion into the Tradl AI "Claude design" project as inspiration-context. Companion files: Groww 915, Public.com, INDmoney, Upstox handoffs.*
