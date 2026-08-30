---
project: Tradl AI — Website Revamp (Claude Design)
source: INDmoney (indmoney.com)
captured: 2026-08-17
purpose: Inspiration handoff file for Claude Design input feeding — third reference platform after Groww 915 and Public.com
---

# INDmoney — Website Inspiration & Handoff File

## 1. Snapshot

INDmoney positions itself as a "money operating system," not just a broker. The stock/US-stock/mutual-fund trading products are the entry point, but the site's real pitch is aggregation: net worth tracking, family accounts, tax filing, and portfolio analytics layered on top of investing. This is a useful contrast to Groww (execution-speed terminal) and Public (social/community investing) — INDmoney's angle is **consolidation and control**, not speed or community.

Key stats the site leans on for trust: 2Cr+ downloads, 20L+ investors (homepage) vs. 10M+ investors, 3M+ US-stock users (deeper pages) vs. founded-2019 / 2.5B+ saved (about page) — numbers vary by page, reused as social proof wherever a CTA appears.

Relevant to Tradl AI specifically: INDmoney has already shipped an "Ask Claude About Your Portfolio" feature (INDmoney MCP) — a read-only Claude integration that answers portfolio questions in plain English. Worth studying directly since it's the same surface Tradl AI would compete in.

## 2. Sitemap

```
indmoney.com/
├── / (Home)
├── /us-stocks              — product landing page
├── /stocks                 — Indian stocks product landing page
├── /etfs                   — product landing page
├── /mutual-funds           — product landing page
├── /ipo                    — product landing page
├── /features               — cross-product feature index (net worth, analytics, tax, MCP)
├── /pricing                — tabbed pricing calculator (asset-class tabs)
├── /about                  — company, mission/vision, timeline, team, awards
├── /blog                   — content marketing
├── /learn                  — educational hub (per-product "Learn Chapters" link back here)
├── /customer-service
├── /sitemap                — literal HTML sitemap (SEO)
├── /login (modal, not a page — see §7)
└── Footer SEO cluster (see below)
```

Global nav (desktop, always visible, no dropdown mega-menu): `US Stocks · Indian Stocks · ETFs · Mutual Funds · IPO | Features · Pricing` — then `Login` (outline pill) and `Open Demat Account` (filled green pill) on the right. Product links come first, utility links (Features/Pricing) are separated by a thin vertical divider — a small but clear signal of "these are not products."

Footer is doing double duty as sitemap + SEO net:
- **Products** column: US Stocks, Indian Stocks, Mutual Funds, Futures & Options, IPO, ETFs
- **Company** column: About Us, Blog, Learn, Customer Service, Fraud Awareness, Sitemap
- **Legal & Regulatory** column: Privacy Policy, Terms & Conditions, Legal & Regulatory, Grievance Redressal Policy
- Below that: a huge SEO link farm tabbed by *Indian Share Market / US Stocks / Mutual Funds / ETFs / Indices / Calculators*, sub-grouped into Popular Stocks, Sectors, Themes, Groups, Screens, "Share Market Today" — dozens of internal links (Tata Motors, Reliance, AI Stocks, EV Stocks, Adani Group, Large Cap Stocks, 52-Week High, etc.)
- Then full regulatory fine print: SEBI/NSE/BSE/MCX registration numbers, depository participant ID, RA registration, compliance officer names and emails, standard risk disclaimers.

Takeaway: the footer is not an afterthought — it's a second sitemap aimed at SEO long-tail traffic (stock names, sector names, calculators), sitting directly above mandatory financial-services legal disclosure. For Tradl AI this is a pattern worth deliberately deciding on: how much of the footer should be growth/SEO surface area vs. how minimal to keep it at alpha stage.

## 3. Brand & Visual Identity

**Logo/wordmark:** "INDmoney" lockup — circular black badge with white "IND" monogram + "money" in lowercase sans-serif next to it. Sub-brand "INDstocks" uses the same badge system with its own dark circular icon, shown together on the About page as two related-but-distinct products under one house.

**Typography:** Inter (with system-ui/-apple-system/Open Sans fallback) used everywhere — headlines and body both. No serif, no display face, no second typeface for numbers. H1 on the homepage renders at 54px / weight 700 / color `#121313` (near-black, not pure black). Stat numbers (the "4.7 / 2Cr+ / 20L+" row) are set smaller (~24px) at weight 500 in the same near-black, with the label underneath in a lighter grey — numbers get size, not color, for emphasis.

**Color palette (measured from live CSS, not guessed):**
- Primary green: `rgb(8, 153, 88)` / `#089958` — every primary CTA ("Open Free Account," "Open Demat Account," "Invest Now!") uses this exact green, no secondary accent color competing with it.
- Text: near-black `#121313`, not `#000000` — softer than pure black.
- Backgrounds: white `#FFFFFF` for content sections, alternating with a very light grey (`#F5F6F7`-ish, used for the "Top Rated" stat band and feature card backgrounds) to separate sections without borders.
- Footer: near-black `#191C1F` with white text — the one dark section on an otherwise all-white site, used to visually mark "you've left the sales pitch, this is the legal/reference zone."
- One outlier: the pricing page CTA button ("Invest Now!") is blue, not green — likely a legacy/unmerged component rather than a deliberate second accent. Worth noting as an inconsistency to avoid replicating.

**Shape language:** Buttons are true pills — `border-radius: 9999px` on primary CTAs, `24px` on the header's secondary CTA. Cards use much smaller radii (roughly 12–16px) with soft grey borders, no shadows. Nothing on the site uses drop shadows for elevation — separation comes from background-color contrast and whitespace, not shadow depth. This is a flatter, more restrained visual language than Public.com's more illustrated/textured approach (per prior research).

**Iconography & illustration:** Two distinct icon systems coexist:
1. **Product-grid icons** (US Stocks, Mutual Funds, F&O, Commodities, IPO, ETFs, NPS, Indian Stocks) — flat, filled, slightly playful mono-color glyphs (a coin, a rising bar chart, an oil barrel/commodity icon, a rocking chair for NPS/retirement, a potted plant for ETFs/growth). Whimsical rather than literal — the rocking chair for retirement (NPS) is a good example of a metaphor-driven icon over a literal one.
2. **Line-art isometric illustrations** — used in the "Track your investments" cards and hero graphics on product pages (a stack of coins, ascending bar chart with company logos wrapped as 3D blocks for US Stocks hero). These are outlined/unfilled, single-color (grey/black stroke), no gradients or photography anywhere on the site. No stock photography, no human faces — 100% iconographic/illustrative, which keeps the site feeling like a tool rather than a lifestyle brand.

**Data visualization motif:** The homepage hero uses a small animated-looking sparkline pair (Indian market "Day - 9:15 AM ☀" and US market "Night - 7:00 PM 🌙") with a dot marker and tooltip-style label — this single graphic does a lot of narrative work, visually explaining the "trade round the clock, both markets" pitch without needing a paragraph of copy.

## 4. Design System / UI Components (recurring patterns)

- **Hero CTA block**: headline (left, ~55% width) + phone-number input with country-code dropdown + green pill button, paired with a right-side illustration. This exact block is reused verbatim on the homepage, US Stocks, Mutual Funds, and (presumably) every other product landing page — same copy shape: "[Open Free X Account] in 3 Minutes."
- **Stat bar**: a thin horizontal strip of 3–5 numbers with a divider between each, no icons, no cards — just number (bold, colored) + label (grey, smaller) stacked. Used directly under every hero.
- **Icon-grid product switcher**: 4-across, 2-row grid of asset classes (US Stocks, Indian Stocks, Mutual Funds, F&O, Commodities, IPO, ETFs, NPS) as clickable cards — this is effectively the sitemap rendered as a visual component on the homepage itself.
- **3-step "Get started" block**: numbered steps (1. Create account → 2. Add money → 3. Buy) each with a one-line description — used on product pages to compress the entire funnel into a scannable strip before the deeper feature content starts.
- **Feature card grid**: 2-column grid of bordered, light-grey cards, each with a small line icon, bold title, 1–2 sentence description, and a text link ("Explore Now →") — not a button, a link, which reads as lower-commitment/exploratory rather than transactional.
- **Chip/pill link clusters**: "Popular US Stocks," "Trending Themes," "By Market Cap," "By Industry," "Invest Like Famous Investors" — rows of plain text links, no styling beyond spacing, functioning as both content and internal-linking SEO surface.
- **Tabbed pricing calculator**: top-level tabs by asset class (Indian Stocks / Commodity / US Stocks / Mutual Funds / Fixed Deposits / NPS), then within a tab, 4 big stat-style numbers (₹0 account opening, 0.1% brokerage, etc.), then a second tab set for charge breakdowns (Regulatory / Depository / Other), rendered as a dense comparison table.
- **Accordion FAQ**: closed-by-default question list at the bottom of every major page — reused as both a UX aid and an SEO/schema-markup opportunity (the FAQ content doubles as long-tail search bait, e.g. "What is TCS on US stock remittances?").
- **Breadcrumbs**: `Home > [Page]` on every sub-page, small grey text, top-left under nav — minor but consistent, useful for a growing multi-page site.
- **Dark footer** as the fixed "you're now in reference/legal territory" visual boundary, discussed above.

## 5. Page-by-Page Wireframes & Content Flow

### Homepage (`/`)
```
[Nav: logo | product links | Features Pricing | Login | Open Demat Account]
[Hero: H1 "Trade & Invest in Indian & US Markets from One App"
        subhead "Trade round the clock..."
        phone input + green CTA]
        [right: dual-market sparkline illustration]
[Stat band: 4.7 iOS · 4.6 Android · 2Cr+ Downloads · 20L+ Investors]  (light-grey bg)
[H2 "Trade and Invest Across from one App"
   4x2 icon grid: US Stocks / Indian Stocks / Mutual Funds / F&O /
                  Commodities / IPO / ETFs / NPS]
[H2 "More than an Investing App — Your Money Operating System"
   sub: "Track all your investments, manage family accounts..."
   3 rotating/stacked cards: Track Investments / Track Net Worth / Track Family]
[App download band: "Download the All-in-One INDmoney App" + QR code]
[Footer: dark, product/company/legal columns → SEO link farm → legal fine print]
```
Notably short for a fintech homepage — no testimonials section, no logo wall of press mentions, no "as seen in" bar, no video. All the persuasion work is done through numbers (stat bars) and the icon-grid making the breadth of the product obvious at a glance. The story is told in four moves: *what it does (hero) → proof it's used (stat band) → how wide the product is (icon grid) → why it's more than a broker (money OS pitch)* — then straight to download/footer.

### Product Landing Page template (using `/us-stocks` as the fullest example)
```
[Breadcrumb: Home > US Stocks]
[Hero: H1 + one-line value prop with pipe-separated feature list
        "Buy 10,000+ US stocks... | Start with $1 | Free A/C | Regulated by IFSCA | ..."
        phone input + CTA, "in 3 minutes"]
        [right: isometric ascending-bars illustration w/ company logo cubes]
[Stat band: 10,000+ Stocks & ETFs · INR-USD best rates · Zero annual fee ·
            IFSCA Regulated · $500K SIPC Protected]
[Regulatory credibility strip: IFSCA license numbers, link to "what this means" explainer]
[3-step onboarding: Create account → Add money → Buy stocks]
[CTA: Open Your Free US Stocks Account]
[H2 "Why invest in US stocks from India?" — 3 short persuasive blocks
   (currency+stock dual advantage, diversification, access to non-India sectors)]
[H2 "Why 3 Million+ Indians choose INDmoney" — 6 feature blocks, each with a
   headline, 2-3 sentence explanation, and "Explore [Feature] →" link]
[H2 "Built for Serious Investors" — 6-card feature grid: 10,000+ stocks,
   automated SIP, extended hours, limit/stop-loss orders, watchlists, fractional shares]
[Discovery chips: Popular Stocks / Trending Themes / By Market Cap / By Industry /
   "Invest Like Famous Investors" (Buffett, Dalio, Soros, Cathie Wood portfolios)]
[Pricing table: fee structure, zero-fee items highlighted, brokerage %]
[Tax explainer block: capital gains rule, dividend/DTAA, TCS — each as a mini card
   with a "Read Complete Guide →" link out to /learn content]
[Regulatory/safety block: LRS explainer, IFSCA explainer, SIPC protection,
   "your money moves within India's regulated system"]
[Learn more: 2-column list of linked articles — "Getting started" / "Tax & Compliance"]
[Accordion FAQ: ~20 questions, from basic ("Can Indians invest in US stocks legally?")
   to deep ("What is FIFO methodology used while buying & selling of US shares?")]
[Closing CTA: repeat of hero — headline + phone input + green button]
```
This page is essentially a long-form sales page disguised as a product page — trust-building (regulation, custodian, SIPC) is interleaved with feature-selling roughly every 2-3 sections, never left to a single "trust" section at the bottom. Tax/compliance content is treated as a selling point ("fully managed for you"), not just fine print — a deliberate choice for a category (investing) where compliance anxiety is a real conversion blocker.

### Features page (`/features`)
```
[Breadcrumb: Home > Features]
[Hero: H1 "INDmoney Features" + 1-paragraph "operating system for your money" framing]
[4-word stat labels: Unified Net Worth View / Advanced Trading Tools /
   Free Income Tax Filing / Smart Portfolio Analytics]
[H2 "Track Your Net Worth" — 8-card grid, each one linked external-account type:
   Bank Accounts, Stocks Across Brokers, Mutual Funds, EPFO, ESOPs,
   Credit Card Bills, Goals, NPS — each "Explore Now →"]
[Family net worth callout block: icon + headline + CTA]
[H2 "Understand Portfolio Performance" — 3 analytics cards
   (Indian Stock / US Stock / Mutual Fund analytics)]
[H2 "File Taxes Seamlessly" — Tax Centre + Income Tax Filing cards]
[Callout: "Ask Claude About Your Portfolio" — INDmoney MCP, explicitly framed
   as read-only, plain-English Q&A over real portfolio data]
[H2 "Why Choose INDmoney?" — 4 reassurance points: quick onboarding,
   paperless, zero AMC, single-app]
[Accordion FAQ — notably answers "Can Claude trade or move money through
   INDmoney MCP?" with a hard "No" up front]
```
This page is the clearest expression of the "money OS, not just a broker" positioning — it's organized by *job the user is trying to do* (track net worth, understand performance, file taxes, ask questions) rather than by product/asset class. Good model for how Tradl AI could structure a "Features" page organized around trader jobs-to-be-done rather than a feature list.

### Pricing page (`/pricing`)
```
[Sub-nav tabs: Indian Stocks (default) / Commodity / US Stocks /
   Mutual Funds / Fixed Deposits / NPS]
[4 big-number stat cards: ₹0 account opening & AMC / 0.1% equity brokerage
   (or ₹20/order, whichever lower) / ₹20 F&O brokerage / ₹0 margin pledge]
[Banner: "ZERO hidden charges — Simple, Easy and Fast" + CTA button]
[Sub-tabs: Regulatory Charges (default) / Depository Charges / Other Charges]
[Dense comparison table: Equity Delivery/Intraday vs. F&O Futures/Options,
   broken into Exchange charges, STT, Stamp Duty, SEBI charges, IPFT charges]
[Expandable "Charges explained" section — plain-language explanation of every
   line item with worked numeric examples ("Example 1: Say you execute
   5 delivery sell orders...")]
[Accordion FAQ specific to billing/settlement mechanics]
```
Pricing is treated as a trust/transparency surface, not just a rate card — the worked examples ("Example 1... Example 2...") are a strong pattern: instead of just stating a formula, they show it applied to a concrete scenario. Good candidate to borrow directly for Tradl AI's own pricing/fee pages if applicable.

### About page (`/about`)
```
[Dark hero band: "Our Company" + 1-paragraph description + "Made in India ❤️"
   + "India's independent Super Finance App" tagline]
[Two sub-brand badges shown side by side: INDmoney / INDstocks by INDmoney]
[Mission + Vision, each as a single bold sentence]
[3-stat band: 2019 Founded / 10m+ Investors / 2.5b+ Saved by users]
[Team grid: photo-less(?) name + role cards — Founder, CEO-Stocks, Chief of
   Staff, Co-founder, CTO, and product/design leads named individually
   (including a named UX & Design lead and a Design & UX Architect)]
[Careers callout: "Join Us" + CTA]
[Awards strip: logos/text — NASSCOM India Fintech 2021, WealthTech Startup
   2021, CBInsights Top 250 Fintech 2020]
```
Notable: naming individual design/UX leads by name and title on the About page is a small but deliberate credibility signal ("real people build this, including designers") — worth considering for Tradl AI's own About/Company page once team size allows it.

## 6. Storytelling & Copy Patterns

- **Headline formula**: category + differentiator + outcome, almost always. "Trade & Invest in Indian & US Markets from One App," "Invest in US Stocks from India," "Invest in Direct Mutual Funds With Zero Commission" — every H1 leads with the verb (Trade/Invest), not the brand name.
- **The "X minutes" promise** ("Open Your Free Investment Account in 3 Minutes") appears on nearly every hero — friction-reduction is stated as a number, not an adjective ("fast," "easy").
- **Pipe-separated feature lists** in subheads pack multiple proof points into one line without needing bullet points: "Buy 10,000+ US stocks & Global ETFs directly from India | Start with just $1 | Free A/C | Regulated by IFSCA | Fast Remittance | Fast and Free Withdrawals."
- **Reassurance-first tone on regulatory topics.** Sentences about tax, TCS, custodianship, and regulation are written in short, declarative, non-hedging sentences ("This is completely legal," "INDmoney handles this for you") — compliance complexity is acknowledged, then immediately defused.
- **No hype adjectives.** Scanning the whole site, there's a near-total absence of words like "revolutionary," "game-changing," "seamless" (seamless appears once, in "File Taxes Seamlessly," as a section title rather than loose copy). Copy is closer to a spec sheet than a pitch deck.
- **FAQ as content strategy.** FAQs go well beyond "how do I reset my password" — they answer genuinely technical/nuanced questions (FIFO methodology, W-8BEN forms, GAP authorisation) in full paragraphs. This functions simultaneously as SEO content, objection-handling, and a trust signal ("we're not hiding the complexity from you").

## 7. Signup / Onboarding Flow & Growth Loops

**Entry points to signup are everywhere and identical in shape.** Every hero, most mid-page CTAs, and the page footer all use the same two-field pattern: country-code dropdown (defaults to +91 India, full international list available) + phone number input + green "Open Free Account" button. This is the single conversion mechanism repeated 5-10+ times per page rather than varied.

**Login/Signup modal** (triggered from the "Login" nav button): a single modal handles both signup and login (unified as "Sign up / Login") —
```
[Modal: "Welcome to INDmoney" + close (X)]
[Left: QR code to download the app, "2 Crore+ Downloads · 3 Lakh+ reviews",
   Google Play / App Store badges with star ratings]
[Divider: "Or"]
[Right: country-code dropdown + phone number field,
   "You will receive an OTP on this number",
   T&C consent line,
   green pill "Sign up / Login" button]
```
Two things worth borrowing: (1) social proof (download count, review count, star ratings) is placed *inside the signup modal itself*, not just on marketing pages — reducing last-second doubt at the exact decision point; (2) app-download and web-signup are presented as equally valid parallel paths rather than funneling everyone toward one channel.

**Stated onboarding steps** (from Features-page FAQ and product-page 3-step blocks): mobile number → OTP → PAN + Aadhaar eKYC (paperless, no branch visit) → account active "in minutes," zero account-opening fee, zero AMC. The friction-removal messaging (paperless, zero fee, minutes-not-days) is repeated at every stage of the funnel, not just the first CTA.

**Mobile-specific loop**: a persistent bottom sticky bar reading "Start Investing Now" (green, full-width) stays pinned while scrolling on narrower viewports — effectively a second, always-visible CTA that doesn't require scrolling back to the hero. This is a meaningful pattern for Tradl AI's mobile web experience: the hero CTA disappears on scroll, the sticky bar doesn't.

**Repetition as strategy, not redundancy**: the exact same hero CTA block (headline + phone input + button) reappears at the very bottom of long pages like `/us-stocks` — after 15+ sections of content, the user is handed the identical, familiar entry point rather than a new "ready to get started?" variant. Low novelty, low cognitive cost.

*(Note: I stopped short of actually submitting a phone number into these forms during this research — that would trigger a real OTP text message. Everything above is reconstructed from the visible UI and the site's own FAQ copy, not from completing the flow.)*

## 8. Mobile Patterns

- Nav does not appear to collapse into a hamburger menu at common breakpoints tested (~390-812px) — product links remain horizontally scrollable/visible rather than hidden, prioritizing product discoverability over a clean minimal header.
- The dual-market sparkline hero illustration and stat band both persist on mobile, just stacked vertically — nothing is dropped, only reflowed.
- The sticky bottom "Start Investing Now" bar (green, full-bleed) is the one mobile-only addition — a strong, deliberate pattern for keeping the CTA in the thumb zone at all times.

## 9. Trust, Compliance & Credibility Signals

Given INDmoney operates as a SEBI-registered broker/depository participant, the site treats regulatory disclosure as a first-class design element, not boilerplate:
- Registration numbers (SEBI, NSE, BSE, MCX, CDSL DP ID, RA registration) are shown as a labeled stat-style row near the footer, in the same visual language as marketing stats — regulation is presented with the same confidence as product stats.
- IFSCA/GIFT City regulation for the US-stocks product gets its own dedicated explainer block on the US Stocks page, plus a linked deep-dive article — trust content is treated as conversion content, not just legal cover.
- SIPC protection ($500K) is stated as a stat-band item, same size/weight as "10,000+ stocks."
- Compliance officer names + emails are listed per-entity (INDstocks vs. INDmoney Tech) in the footer's "About" expandable section — an unusually granular level of named accountability.

For Tradl AI (an AI-trading-intelligence platform, not itself a broker), the direct analog isn't identical registration numbers, but the underlying pattern — *state your regulatory/data/AI-accuracy posture as confidently and prominently as your feature stats, don't bury it* — is transferable, especially for an "alpha" launch where new users will be evaluating trust before capability.

## 10. Takeaways for Tradl AI

**Worth borrowing directly:**
- Single, unrelenting primary CTA shape (one field type, one button color, repeated everywhere) instead of varying CTA copy/design per section — reduces decision fatigue and reinforces the "one action to take" message.
- Icon-grid-as-sitemap on the homepage: showing full product breadth as a clickable grid rather than a nav dropdown.
- Social proof placed inside the signup modal itself, not just on marketing pages.
- Worked numeric examples for anything fee/calculation-related ("Example 1: Say you execute 5 delivery sell orders...") — concrete beats abstract for financial mechanics.
- FAQ-as-content: deep, specific, technical questions answered in full — doubles as trust-building and SEO.
- Mobile sticky CTA bar.
- Organizing a features/capabilities page around user jobs-to-be-done (track net worth, understand performance, file taxes) rather than a flat feature list.

**Worth noting as a contrast/caution:**
- The homepage is thin on narrative/storytelling compared to Public.com's more editorial approach (per earlier research) — INDmoney relies almost entirely on stats + breadth, with no testimonials, no press wall, no video. For an AI-trading-intelligence brand where *trust in the AI's judgment* is the harder sell than trust in execution, Tradl AI likely needs more explanation/proof-of-reasoning content than INDmoney's homepage has — stats alone may not be enough to build confidence in an AI recommendation engine.
- The blue "Invest Now!" button on the pricing page breaking from the site-wide green is a visible inconsistency — a reminder to lock a single accent color system before scaling to many product pages.
- Compliance-heavy footer/SEO link farm is a mature-stage pattern (hundreds of internal links); not something to replicate at alpha stage, but useful to know as the eventual ceiling if Tradl AI later invests in SEO surface area.
- INDmoney's "Ask Claude About Your Portfolio" (INDmoney MCP) is a direct competitive reference point — worth a dedicated look (their MCP docs/positioning) if Tradl AI's own AI-assistant surface is a differentiator, since INDmoney has explicitly and publicly staked out "read-only, cannot trade" as the trust boundary for their Claude integration.

## Research method note

Captured by scanning the live site (desktop ~1366px and mobile ~390-812px viewports): homepage, /features, /pricing, /us-stocks, /mutual-funds, /about, plus the login/signup modal (viewed, not submitted — no OTP was requested). Colors and typography were read directly from computed CSS, not estimated visually. Full per-page text content was extracted for copy-pattern analysis; large verbatim blocks were paraphrased above rather than reproduced.
