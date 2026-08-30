# Sahi.com — Design Inspiration Handoff
### Reference-site teardown for the Tradl AI website redesign (Claude Design input)
Prepared: 17 Aug 2026 · Source: https://www.sahi.com (live scan, desktop 1366×899)

---

## 0. Why Sahi, and how to use this file

Sahi is a SEBI-registered Indian F&O/stock broking platform ("a new-age broking platform with in-house charts, real-time AI intelligence, flat ₹10/order"). It is one of the closest structural analogs to Tradl AI: a fintech/trading product that has to simultaneously (a) look credible to a regulator-watched, skeptical, numbers-literate audience, and (b) feel fast, modern, and AI-native to win mindshare from younger active traders. That combination — trust + velocity — is exactly the tension a Tradl AI site will need to resolve, which is what makes this teardown useful as a raw material file rather than a style reference to copy verbatim.

Use this document as a **source-of-truth appendix**, not a spec. Feed relevant sections into Claude Design section by section (sitemap → wireframes → component inventory → visual system → storytelling → growth loop) rather than all at once, and translate patterns rather than lifting them — Sahi's specific palette, copy, and claims belong to Sahi.

---

## 1. Sitemap

```
sahi.com/
│
├── / (Home)
│
├── Products ▾
│   ├── /products/options-trading      (Futures & Options)
│   ├── /products/stocks               (Stocks)
│   ├── /products/ipo                  (IPO)
│   └── /products/etf                  (ETFs)
│
├── SAHI Advantage ▾
│   ├── /advantage/charts              (SAHI Charts — proprietary charting engine)
│   ├── /advantage/sahi-scalper        (SAHI Scalper)
│   ├── /products/sahiresearch         (SAHI Research)
│   ├── /products/options-buying       (Option Buyer)
│   └── /advantage/option-selling      (Option Seller)
│
├── News ▾
│   ├── /breaking-news
│   └── /market-updates
│
├── /partners                          (Partner program / referral)
│
├── /pricing                            (single flagship pricing page)
│
├── Learn ▾
│   ├── /courses                       (structured financial education)
│   ├── /blogs                         (SAHI Blogs)
│   ├── /video-guide                   (Video Guides)
│   └── /blogs/category/product-updates
│
├── /customer-support                  (help center: search + 20 categorized FAQ clusters)
│
├── /about                             (origin story, mission, founders, timeline)
│
├── Footer-only pages
│   ├── /careers
│   ├── /contact-us
│   ├── Legal: Privacy Policy, T&C, RMS Policy, AML Policy, MITC, Surveillance Policy,
│   │           Investor Charter, Regulatory Disclosures, Grievance/SCORES, Download Forms
│   └── Compare pages: Pricing comparison, Chart-based trading, Active intraday, Scalping
│
├── App download landing page (marketing → acquisition bridge)
│   └── sahi.onelink.me/… (AppsFlyer smart link — App Store / Google Play + QR code)
│
└── External auth
    ├── Login → sahi.onelink.me/…/website (web terminal login)
    └── Get Free Account → onelink smart link → app download page (account opening/KYC happens IN-APP only)
```

**Key structural takeaways for Tradl AI**
- Only **one canonical pricing page** — not scattered across product pages. Product pages link back to it with the same "₹10/order" motif repeated as a recurring visual anchor.
- **"Advantage" is a distinct top-level nav group** separate from "Products" — it houses the technology/IP story (charts, AI, scalper) rather than mixing it with plain product listings. This is a good pattern for Tradl AI: separate "what you can trade" from "why our tech is better."
- **Learn is a full content hub** (courses + blog + video + product changelog), signaling education-led trust-building, not just a blog afterthought.
- **The entire funnel terminates in the native app**, not a web signup form — see §6.

---

## 2. Wireframes (text schematics of key templates)

### 2.1 Homepage — full-page flow (dark → light → dark alternating rhythm)

```
┌────────────────────────────────────────────────────────────┐
│ NAV: logo | Products▾ SAHI Advantage▾ News▾ Partners        │  sticky, dark,
│      Pricing Learn▾ Support   [Get Free Account][Login]     │  translucent on scroll
├────────────────────────────────────────────────────────────┤
│                     HERO (dark, radial glow bg)              │
│              H1 serif-display: "Built for serious traders."  │
│              Subhead: category one-liner + product list      │
│              [Get Free Account →]  pill CTA                  │
│              Trust bar: ★4.5 | 23K ratings | award | 5M dl    │
│              ── large product screenshot (desktop app UI) ── │
├────────────────────────────────────────────────────────────┤
│         SECTION: rotating-category headline (light bg)       │
│   "Built for single-screen high performance across [X]"      │
│         phone mockup + feature bullets, tab-switch pattern   │
├────────────────────────────────────────────────────────────┤
│  FEATURE BLOCK (dark)  — repeats 4-5x down the page:          │
│     Centered H2 + 1-2 line description + "Learn More" pill   │
│     Full-width product screenshot / phone mockup below       │
│     (alternates dark/light background each block)            │
├────────────────────────────────────────────────────────────┤
│  TWO-COLUMN CARD PAIR (dark bg, white rounded cards)          │
│     [Card: headline+copy+link+phone mock] [Card: same]        │
│     used for "AI intelligence" vs "Option strategy builder"   │
├────────────────────────────────────────────────────────────┤
│  PRICING MOMENT (dark, spotlight glow)                        │
│     H2 "High Performance Trading at Incredible Value"         │
│     Giant numeral "₹10 / per order" as hero typographic motif │
│     [Explore Now]                                              │
├────────────────────────────────────────────────────────────┤
│  LATEST NEWS carousel (light bg)                               │
│     4-up card carousel, illustrated thumbnails, timestamp      │
│     "Add as preferred source on Google" + "View All"           │
├────────────────────────────────────────────────────────────┤
│  SOCIAL PROOF band (dark, grid/perspective bg)                 │
│     "Over 5 Million Downloads" + "Built by experienced          │
│     traders & technologists" + quote                           │
├────────────────────────────────────────────────────────────┤
│  Award badge strip → Final CTA band                             │
│     "Ready to Trade the SAHI Way?" [Open Free Account]          │
├────────────────────────────────────────────────────────────┤
│  MEGA FOOTER (dark, 5 columns)                                  │
│   Follow us(social) | Company | Products | SAHI Advantage |     │
│   News/Platforms | Useful Links/Compare                         │
│   Address block ×2 (legal entities) + Google-source CTA         │
├────────────────────────────────────────────────────────────┤
│  COMPLIANCE FOOTER (dark, small type, dense)                    │
│   CIN, risk disclosures (bulleted, with real loss statistics),  │
│   regulator notes, SEBI/exchange registration numbers,           │
│   grievance emails, 15+ legal document links, copyright line    │
└────────────────────────────────────────────────────────────┘
```

### 2.2 Product / Advantage page template (e.g. `/products/options-trading`, `/advantage/charts`)

```
┌───────────────────────────────────────────┐
│ NAV (same global nav)                       │
├───────────────────────────────────────────┤
│ Breadcrumb: Home > [Section]                │
│ H1 (large, gradient/dark hero)              │
│ Optional: stat row — 4 metric tiles          │
│   e.g. "6.61ms | 100+ indicators | 6 indices│
│   side by side | 200M+ orders executed"      │
│ Large annotated product screenshot (desktop  │
│   + phone overlapping, dark card frame)      │
├───────────────────────────────────────────┤
│ "Built for traders who..." intro statement   │
│ 3-6 feature cards, icon + heading + 1-2 line │
│   description (grid, light bg)               │
├───────────────────────────────────────────┤
│ Deep-dive subsection per capability:         │
│   H3 + paragraph + screenshot, repeated       │
│   ("How X works" explainer pattern)           │
├───────────────────────────────────────────┤
│ Proof/credibility insert (unique per page):  │
│   e.g. published latency dataset with link    │
│   "measured over 9,089,472 orders"             │
│   + disclaimer microcopy under it              │
├───────────────────────────────────────────┤
│ Pricing recall block (₹10/order, repeated     │
│   motif, [Explore Now])                        │
├───────────────────────────────────────────┤
│ FAQ accordion (5 visible + "View All")         │
├───────────────────────────────────────────┤
│ Mega footer (shared)                           │
└───────────────────────────────────────────┘
```

### 2.3 Pricing page template

```
Hero: H1 + subhead ("Trade Zero Brokerage for 30 days, then ₹10/order")
  → "Your First 30 Days: Brokerage Free" — 4 benefit chips
  → Giant "₹10/per order" typographic moment (glow, same motif as home)
  → "Detailed Breakdown" data table (Segment | Brokerage | What You Pay)
  → "Compare: SAHI vs Other Brokers" narrative + link
  → "Here's what you never pay" — 5-card negative-space grid
     (explicitly lists what's NOT charged — anti-surprise-fee framing)
  → "How SAHI Makes Money" — radical-transparency section, 4 reason
     cards explaining the business model in plain language
  → FAQ accordion
  → Final CTA band with the same ₹10 motif
```

### 2.4 About page template (origin story / brand narrative — see §5)

```
Hero: eyebrow badge ("Fintech Startup of the Year 2025") + H1 mission
  statement + subhead + dual CTA (primary "Start Trading Free",
  secondary text-link "Our Story")
  → stat strip: App Downloads | Trades Executed | Users | Price
  → "Our Story" — long-form founder narrative, first-person anecdote,
     pull-quote in italics, ending in a rhetorical question → answer
  → Horizontal/vertical timeline card (year: milestone), scroll-reveal
  → "The Problem" section — dark bg, 3 icon cards (Tool Gap / Speed
     Disadvantage / Cost Barrier) + a single shocking stat ("91% of
     Indian traders lose money — SEBI Report")
  → "Our Mission" — belief/promise/approach triplet, editorial tone
  → "Meet the Founders" — 2-up bio cards, credentials as pill tags
     (Ex-CTO Swiggy, Ex-Amazon, 17 Years Trading, MIT Manipal)
  → "What Makes Us Different" — 4 numbered differentiators (01-04)
```

### 2.5 Support / Help Center template

```
Hero: H1 "Get Answers to All Your Queries"
  → 3 contact-method cards (Email / Call / Chat) with hours
  → Central FAQ search bar ("Got questions?")
  → 20 categorized FAQ clusters in a responsive grid, each showing
    3 sample questions + "View All", category counts in parens
    e.g. "Account Opening (19)", "Options Scalper (67)"
  → Registered address + regulator membership line (NSE|BSE|CDSL)
```

---

## 3. Content-flow logic (the narrative arc, not just the layout)

Reading the whole site top to bottom, Sahi's content flow follows a consistent persuasion sequence that repeats at both the page level and the site level:

1. **Category claim** — a short, confident positioning line ("Built for serious traders").
2. **Proof of capability** — an actual product screenshot, not an illustration. Every hero and every feature block shows the real UI.
3. **Quantified credibility** — a number appears within the first two screens almost everywhere: ratings, downloads, latency in milliseconds, order counts, brokerage in rupees. Numbers substitute for adjectives.
4. **Feature explainer with a "Learn More"** — soft-commit CTA, not a hard sell, used repeatedly down the page instead of one.
5. **Anti-surprise transparency** — pages proactively state what you will NOT be charged/what won't happen, which reads as more trustworthy than only stating what you get.
6. **Human/founder story** — reserved for the About page but referenced elsewhere ("built by traders, for traders").
7. **Compliance close** — every page, no matter how playful the hero, ends in dense, honest regulatory text. This is non-negotiable for a financial product and is worth studying even though Tradl AI's compliance surface will differ.
8. **Repeated, singular CTA** — "Get Free Account" / "Open Free Account" / "Start Trading Free" — same destination, reworded per context, appearing 4-8 times per page.

---

## 4. Visual & brand identity system

### 4.1 Color

Extracted via computed styles (not guessed) from the live site:

| Role | Value | Notes |
|---|---|---|
| Primary background (dark) | `#0A0A0A` (body), `#070709` / `#151515` (section variants) | True near-black, not navy — gives a "trading terminal" feel |
| Primary accent (brand pink/magenta) | `#C80E7D` | Used for primary CTA fills, highlight numerals, active states |
| Secondary accent (violet) | `#695BB8` | Appears in gradients/glows and secondary UI accents |
| Light section background | `#E8E8F1` (lavender-grey), `#FAFAFC`, `#FAF9F5` (warm off-white for course cards) | Alternates with dark sections for pacing, never pure white |
| Text on dark | `#FFFFFF` / `#EDEDED` | High contrast |
| Chart/data colors | Teal-green (buy/up) vs red-pink (sell/down) | Standard candlestick convention, but tuned toward the brand's pink rather than generic red |
| CTA button (secondary) | White fill, black text, full pill radius | Used for header CTA against dark nav |

**Pattern to note:** backgrounds alternate dark → light → dark down a single page (not a static dark-mode site). This creates rhythm and lets the pink accent "pop" differently against each. A single unrelenting dark theme (common in AI product sites) can feel monotone by comparison — alternating background luminance is a deliberate pacing device worth considering for Tradl AI.

### 4.2 Typography

- **Display/headline font:** custom `sahiSeason` (serif-leaning display face, high-contrast strokes) — used only for H1/H2 hero statements. Gives the brand an editorial, slightly premium tone that contrasts with the technical subject matter.
- **UI/body font:** custom `sahiSans` — a clean grotesque sans, used for nav, body copy, buttons, tables, everywhere else.
- **Pairing logic:** serif display for *emotional/positioning* copy ("Built for serious traders", "We're Building the Trading Platform We Always Wanted"), sans for *functional* copy (features, tables, FAQ, legal). This is a deliberate two-voice system: one voice sells the dream, the other proves the mechanics.
- Base body size 16px; H1 around 60px on desktop.
- Numerals get special typographic treatment: the "₹10" pricing moment is rendered at a huge display size (essentially a hero visual, not just a stat) — numbers are treated as brand assets.

### 4.3 Shape & spacing

- **Full-pill buttons** everywhere (`border-radius: 9999px` effectively) — no sharp-cornered or slightly-rounded buttons anywhere observed.
- Cards use medium rounding (~16-24px), soft 1px borders on light backgrounds, subtle elevation rather than heavy shadow.
- Generous vertical rhythm — sections breathe with 80-160px of padding; nothing feels cramped despite information density (especially pricing/legal pages).
- Product screenshots are shown at near-native resolution inside minimal chrome (sometimes a subtle browser-frame or phone-frame), never wrapped in heavy decorative device mockups — this keeps the UI itself as the hero, not an illustration of it.

### 4.4 Iconography & imagery

- Feature icons: small, soft-gradient rounded-square app-icon-style glyphs (not line icons) — each looks like a mini app tile (chart icon, stopwatch, logo mark), giving a "product suite" feel to feature lists.
- News section uses warm, painterly AI-generated editorial illustrations (business/finance motifs) rather than stock photography — distinct visual register from the product screenshots, clearly separating "editorial content" from "product truth."
- No human photography on the marketing pages scanned (founders are represented via credential tags/bio cards, not headshots, in the captured viewport) — the product UI does the emotional work instead of lifestyle photography.
- QR codes are a recurring persistent UI element (bottom-right sticky "Scan to get started on SAHI") across nearly every page — a constant low-friction mobile-acquisition nudge for desktop visitors.

### 4.5 Motion

- Scroll-triggered fade/opacity reveal on cards and section content (confirmed via partially-opaque card states mid-scroll) — content stays hidden until scrolled into view, then fades to full opacity. Applied consistently, not just on hero.
- Subtle radial glow/spotlight behind key numerals and hero art on dark sections (ambient light effect, not animated gradients).
- Dropdown nav menus are simple, instant reveal — no elaborate mega-menu animation, keeping navigation utilitarian even though the rest of the page is expressive.

---

## 5. Storytelling, brand & visual identity (narrative devices worth adapting)

Sahi's brand voice is best described as **"confident insider talking to a peer,"** not "corporation talking to a customer." Concrete devices that produce this:

- **Origin story with a named villain-less conflict.** The About page doesn't invent a dramatic villain; the tension is a *structural* one ("the playing field isn't level" — institutions vs retail). This makes the mission feel earned rather than marketed.
- **First-person founder anecdote with a pull-quote.** "It actually points to a gap. People need a tool that can help them become better in their craft." Real quotes, attributed to a named person with a specific career history, land as more credible than mission-statement prose.
- **A timeline as proof of momentum**, not just history — 2007 (personal origin) → 2018 (career credibility) → 2023 (founding) → 2024 (launch) → 2025 (traction/funding/award). Each entry pairs a date with a number or proof point.
- **Radical transparency as a trust mechanic**, used twice: (1) "Here's what you never pay" — a page proactively naming the absence of hidden fees; (2) "How SAHI Makes Money" — publicly explaining the business model, disarming the obvious skeptical question before it's asked. **This is probably the single most transferable idea for Tradl AI**: if there's a question your target user is quietly suspicious about (data usage, AI accuracy, how the product actually makes decisions, cost sustainability), consider addressing it head-on as a named section rather than hoping it doesn't come up.
- **Published, falsifiable data as a credibility flex.** The charts page states "6.61ms P95 order latency... measured over 9,089,472 orders — every order plotted for anyone to inspect," with a link to the dataset. For an AI product, the equivalent move is publishing real benchmarks/evals rather than vague "blazing fast" or "state-of-the-art" claims.
- **Explicit anti-positioning.** "We don't gamify trading or make it feel like a casino. We build serious tools for serious traders." Naming what you refuse to be is as brand-defining as naming what you are — worth a deliberate line for Tradl AI (e.g., what kind of AI experience it explicitly is not).
- **Numbers as the primary adjective.** Nearly every claim on the site is backed by a specific figure (23K ratings, 5M downloads, ₹10, 6.61ms, 91% stat, 100+ indicators) rather than superlatives like "best" or "leading." This is a disciplined copy rule that reads as more credible in a regulated/skeptical category.

---

## 6. Sign-up / growth loop analysis

Traced live by following the primary CTA (`Get Free Account`) from the homepage:

```
Web marketing site (any page)
        │  "Get Free Account" — appears 6-8× per page, always same href
        ▼
AppsFlyer smart link (sahi.onelink.me/...)
        │  device-detected redirect
        ▼
App-download landing page (still on sahi.com nav/branding)
        │  H1: "Download the SAHI Trading App"
        │  Sub: "Account opening and KYC happen on the app.
        │        Once your account is active, you can also trade
        │        on the SAHI web terminal."
        │  [Get it on Google Play] [Download on the App Store]
        │  Persistent QR code (desktop users scan instead of click)
        │  Trust recap: 3M+ downloads | 4.6★ | SEBI registered | award
        ▼
Native mobile app (outside browser reach — onboarding/KYC happens here)
        ▼
Once account is active → web terminal login unlocked (separate onelink → /website)
```

**Growth-loop mechanics worth naming explicitly for Tradl AI's own design:**

1. **Single canonical CTA, repeated relentlessly, never diluted.** Every page — product, pricing, about, support — funnels to the exact same action with reworded microcopy ("Start Trading Free" / "Open Free Account" / "Ready to Trade the SAHI Way?"). There is no competing secondary conversion goal fighting for attention.
2. **Desktop-to-mobile handoff via QR, not a form.** Because the real product (and onboarding/KYC) lives in the app, the website's entire job is to get a phone in front of the QR code or tap the store badge — not to collect a lead-gen email. If Tradl AI's core product is mobile-first or app-first, this pattern (persistent sticky QR + store badges) is directly reusable; if Tradl AI's product is web-first, this pattern should NOT be copied and a native web signup flow is the better analog to study elsewhere.
3. **Friction is disclosed, not hidden, right before the ask.** The download page explicitly tells the user account opening/KYC happens in-app *before* they tap — reducing bait-and-switch feel and drop-off from surprise later.
4. **Every trust signal is restated at the exact moment of conversion**, not just earlier on the page (ratings, downloads, award, registration all repeat directly above the store badges) — the highest-intent moment gets the highest-density proof.
5. **Time-boxed incentive removes first-trade risk**, functioning as the activation hook: "Zero brokerage for 30 days" lowers the cost of trying the product to functionally zero, deferring monetization until habit is formed.

---

## 7. UI/UX component inventory

A checklist-style catalog of recurring components observed, useful as a build list when translating into Tradl AI's design system:

- **Sticky translucent dark nav bar** with dropdown mega-items (simple 1-column dropdown lists, not full mega-menus), two-tier CTA cluster (secondary "Login" outline pill + primary white/pill "Get Free Account").
- **Breadcrumb strip** (Home icon › Section) on every interior page, small and unobtrusive, sits just under the nav.
- **Hero pattern**: eyebrow badge (pill, dot + label) → serif H1 → sans subhead → primary CTA pill → trust-stat line → large real-UI screenshot.
- **Stat-tile row**: 4 equal dark cards, big number + small caption, used to open technical/product pages (e.g., latency, indicators, indices, orders).
- **Feature "Learn More" block**: centered H2/H3 + 1-2 line body + text/pill link, followed by a full-bleed screenshot — the site's most repeated content unit (used 8+ times across pages scanned).
- **Two-up comparison card**: white rounded card pair on dark background, each with heading/copy/link/phone-mockup — used to contrast two related capabilities side by side.
- **Giant numeral moment**: a single stat (price, latency) blown up to hero display size with a soft glow behind it — used as a full-width standalone section, not embedded in a paragraph.
- **Data table**: light background, header row shaded slightly darker, zebra-free, generous row padding — used for pricing and charge breakdowns.
- **"Never pay" negative-claim grid**: 5-card grid explicitly stating absent fees, staggered scroll-reveal.
- **"How we make money" reasoning grid**: 4-card grid pairing an operational claim with a plain-language justification.
- **FAQ accordion**: 5 visible questions + "View All" link, grouped by category on the support page (20+ categories, with counts).
- **News/blog carousel**: horizontal-scroll card row, illustration thumbnail + headline + 2-line summary + relative timestamp, arrow nav controls.
- **Timeline component**: vertical year-stamped list inside a bordered card, scroll-reveal per entry.
- **Founder bio card**: name, role, 2-3 sentence background paragraph, and a row of small credential pill-tags (not a bullet list).
- **Numbered differentiator list**: "01 / 02 / 03 / 04" oversized numerals paired with a short heading + 1-2 line description — used to close the About page.
- **Persistent QR acquisition widget**: fixed bottom-right dark card, "Scan to get started on SAHI" + QR, present across virtually the entire site without being obtrusive.
- **Mega footer**: 5-6 column link directory + social row + dual legal-entity address blocks + award badge + one more CTA band directly above it.
- **Compliance footer**: small-type, information-dense block — risk disclosure bullets with real statistics, regulator notices, registration numbers, grievance contacts, and 15+ legal document links, always last.
- **404 page**: on-brand, minimal — breadcrumb, headline, one line of copy, single "Go To Home" pill CTA. No dead-end feel.

---

## 8. Trust & regulatory-pattern notes (fintech-specific, evaluate relevance to Tradl AI)

Even if Tradl AI is not a SEBI-regulated broker, several of Sahi's trust-building mechanics generalize to any product making claims a skeptical, informed audience will interrogate:

- Real, dated, sourced statistics over adjectives (SEBI report citation with an exact percentage, not "many traders lose money").
- A visible human accountability chain (named compliance officer + two grievance emails + registration numbers) — for an AI product, the analog is naming who's accountable for the model/data and where to raise concerns.
- Risk/limitation disclosure placed voluntarily, not hidden in a linked PDF — e.g. "F&O trading carries significant risk. Educational information, not investment advice" appears inline directly under a technical claim. An AI product could adopt the same inline-disclaimer-at-point-of-claim pattern (e.g., directly under an AI-generated recommendation).
- Legal/company identity is fully exposed (CIN, registered office, two entity names) rather than tucked into a single "About" mention.

---

## 9. Direct translation notes for Tradl AI (working recommendations, not final decisions)

These are suggested *pattern* adaptations, not a copy of Sahi's specifics — treat as prompts for the Claude Design conversation rather than settled decisions:

1. **Two-voice typography system**: consider a distinct display face for positioning statements and a clean UI face for functional content, mirroring the sahiSeason/sahiSans split — gives room for an editorial hero without sacrificing legibility in dense product/data sections.
2. **Alternating dark/light section rhythm** instead of committing to one dark theme throughout — creates pacing and lets a single accent color read as more intentional.
3. **One number-driven hero moment** (a giant, glowing, single statistic) as a recurring section type — Tradl AI's equivalent might be a core metric (accuracy, speed, users, a price point) rather than "₹10."
4. **A named "how it actually works" or "here's what we don't do" section** — Sahi's radical-transparency device is highly reusable for any AI product facing the "is this actually good / is this actually safe" skepticism.
5. **A founder-story About page with a real timeline and a pull-quote**, not a generic mission paragraph — this is a high-leverage, low-cost storytelling upgrade many product sites skip.
6. **Single, repeated, unambiguous primary CTA** across the entire site with reworded microcopy per context, resisting the urge to add secondary competing CTAs.
7. **Decide deliberately whether Tradl AI is web-first or app-first before adopting the QR/app-store funnel** — it's the right pattern only if the core product genuinely lives in a native app; otherwise a direct web onboarding flow with the same "state the friction before the ask" honesty is the better analog.
8. **Component-level reuse candidates**: pill buttons throughout, stat-tile rows to open technical pages, FAQ-by-category structure for a help center, numbered differentiator closer for an About/why-us page.

---

## 10. Appendix — raw extracted copy (for tone/voice reference)

> "Built for serious traders." / "A new age Broking platform with in-house SAHI charts, real-time AI intelligence, and flat ₹10 per order brokerage."

> "SAHI keeps pricing simple so you can focus on trading, not calculating costs."

> "Many brokers advertise low brokerage but add surprise charges later. Here's what you'll never pay at SAHI."

> "You might wonder: if brokerage is only ₹10 per order, how does SAHI sustain itself? Here's the transparent answer."

> "Speed you can verify, not just trust... every order plotted for anyone to inspect."

> "SAHI was born from a simple belief: every trader deserves the tools to succeed. Built by traders, for traders."

> "It actually points to a gap. People need a tool that can help them become better in their craft." — Dale Vaz, Co-founder & CEO

> "The question isn't whether retail traders should trade. It's whether they have the right tools to succeed."

> "We don't gamify trading or make it feel like a casino. We build serious tools for serious traders."

> "91% of Indian traders lose money. SEBI Report - Not because they're not smart. Because they don't have the right tools."

---

*Compiled from a live scan of sahi.com on 2026-08-17 (screenshots, DOM inspection, computed CSS, and full nav traversal). All figures, prices, and claims quoted belong to Sahi/Aaritya Broking Private Limited and are reproduced here only as reference material for internal design study — not to be reused as Tradl AI's own claims.*
