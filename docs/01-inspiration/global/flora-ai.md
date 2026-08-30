# FLORA (flora.ai) — Inspiration Handoff File
**Prepared for:** Tradl AI website revamp (Claude Design project) — alpha release target: end of Aug 2026
**Source studied:** https://flora.ai — "Generative AI Canvas for Creative Teams"
**Scan date:** Aug 17, 2026
**Note on relevance:** Flora is not a fintech competitor — it's an AI-native creative tool. It's useful here as a reference for how an AI product sells "control + power" without sounding like generic AI marketing, and for canvas/workspace UI patterns. Pull the *system* (structure, pacing, tone), not the *skin* (fashion imagery, green accent) directly into Tradl.

---

## 1. Snapshot

| | |
|---|---|
| Category | Generative AI creative canvas / tool marketplace |
| Positioning | "Your creative workspace" — a power tool for professional creatives, explicitly positioned against both "unintuitive traditional tools" and "AI slop generators" |
| Primary CTA | "Get started for free" (email/OAuth signup, no credit card) |
| Secondary CTA | "Talk to sales" / "Contact sales" (enterprise motion runs in parallel throughout) |
| Pricing model | Free / Starter $18 / Pro $50 / Max $200 per seat per month, plus a shared metered usage pool on top of seats |
| Site framework signals | Custom build, heavy client-side rendering, canvas/WebGL elements, Framer-style scroll-triggered reveals |

---

## 2. Brand & Visual Identity

**Name logic:** "FLORA" — plant metaphor stated explicitly in their manifesto: *"We are called FLORA because creation should feel natural. Plant your ideas. Watch them grow."* The logo mark is a 4-square grid icon (like a seed/pixel motif) next to a serif wordmark set in small caps with wide tracking.

**Tone of voice:** Confident, short sentences, no hedging. Copy reads like a manifesto more than a landing page — e.g. *"Current AI creative tools are made by non-creatives for other non-creatives to feel creative."* They pick a fight (against "AI slop" and against legacy tools) rather than listing generic benefits. Feature copy is consistently structured as **verb + object + outcome** ("Recolor a garment while its shape, texture, and fit stay intact") — mechanical and specific, not adjective-heavy.

**Visual identity pillars:**
- **Black canvas, editorial imagery.** Pure black (`#000000`) background used as a gallery wall — the product's own AI-generated fashion/campaign imagery does the talking. Very little illustration or iconography; photography and generated visuals carry the brand.
- **Serif display + grotesk UI.** A soft editorial serif (their custom "Redaction" font, condensed/italic accents) for headlines gives a fashion-magazine feel; a clean geometric sans (Geist) handles all UI chrome, labels, and buttons. This split (editorial serif for emotion, functional sans for utility) is the single most portable idea for Tradl.
- **One accent color, used sparingly.** A muted sage/mint green (`rgb(113,208,131)`) is the *only* saturated color on an otherwise monochrome (black/white/gray) site. It appears almost exclusively on primary CTA buttons and small success/live indicators — never used decoratively. This restraint is what makes the accent feel premium rather than "branded."
- **Imagery over graphics.** No abstract 3D blobs or generic AI-gradient art. Every hero visual is a real (or AI-generated-but-photoreal) product shot — bags, shoes, models, campaign stills — arranged in an asymmetric collage. It signals "output quality" instantly, which is the product's actual value prop.

---

## 3. Design Tokens (extracted from computed styles)

### Color
| Token | Value | Usage |
|---|---|---|
| Background / base | `#000000` | Page background, nearly universal |
| Text primary | `rgb(244,244,242)` (off-white, not pure white) | Headlines, primary copy |
| Text secondary | `rgb(180,180,180)` / `rgb(152,152,152)` / `rgb(123,123,123)` | Subheads, captions, nav links — a 3-step gray ramp for hierarchy |
| Accent (brand) | `rgb(113,208,131)` sage green; darker variant `rgb(73,196,112)` | Primary CTA fill, links-as-action, live/status dots |
| Accent secondary (rare) | `rgb(153,238,255)` pale cyan | Occasional highlight/link in editorial content only |
| Surface (cards/panels) | `rgb(17,17,17)` / `rgb(18,18,18)` / `rgb(28,28,28)` / `rgb(19,20,22)` | Card backgrounds, dropdown menus, input fields — near-black grays, not pure black, to create subtle depth |
| Light surface (rare, for contrast blocks) | `rgb(250,249,245)` off-white, `rgb(238,238,238)` light gray | Used sparingly to break the black canvas (e.g. feature comparison table) |

### Typography
| Token | Value |
|---|---|
| Display / headline font | Custom serif ("Redaction 10"), regular weight, tight letter-spacing (`-2.08px` at 52px), often mixing roman + italic within one headline for emphasis (e.g. "Your *creative* workspace") |
| UI / body font | Geist (geometric grotesk sans) |
| H1 size (desktop) | ~52px / 62.4px line-height |
| Button/label text | 12–14px, regular weight, not bold — weight comes from color contrast and button fill, not font-weight |

### Components
| Token | Value |
|---|---|
| Button radius | 12px (soft-rounded rectangle, not pill) |
| Button border | 1px solid `rgba(255,255,255,0.11)` on secondary/outline buttons |
| Primary button | Solid sage green fill, near-black text (`rgba(0,0,0,0.95)`) — high contrast, only colored surface on the page |
| Secondary button | Transparent/black fill, white text, thin white-alpha border ("Talk to sales" pattern — always paired next to the primary CTA) |
| Motion | Scroll-triggered fade/slide-ins, marquee/auto-scrolling logo strips, drag-to-pan gallery ("press and drag" canvas), hover-reveal on technique/model cards |

---

## 4. Sitemap

```
flora.ai/
├── / (Home)
├── /pricing
├── /product-technique          → "Techniques" product deep-dive (marketing page)
├── /techniques                 → Full techniques library/marketplace (100+ items, filterable by category)
├── /studio/fashion             → Fashion Studio (vertical/industry product page)
├── /gallery                    → User-generated output showcase (drag-to-pan canvas, filterable: Fashion / Brand / Film-VFX / Ads)
├── /compare                    → Comparison pages (vs. competitors)
├── /updates                    → Changelog / product updates feed
├── /contact                    → Sales contact form
├── /partners                   → Affiliates
├── /careers
├── /blog
│   └── /blog/manifesto         → Founder manifesto / brand story (also a normal blog post entry)
├── docs.flora.ai                → Product documentation (subdomain)
├── app.flora.ai/community       → Community (subdomain, gated)
├── trust.flora.ai               → Trust center (subdomain)
└── status.flora.ai              → System status (subdomain)

Auth:
└── Sign in / Sign up modal (overlay, not a separate page) — Google / Microsoft SSO + email
```

**Global nav structure (mega-menu, opens as full-screen overlay on click):**
- **Product** ▾ — Canvas, Studio, Techniques
- **Solutions** ▾ — organized as two sub-groups:
  - *By industry:* Fashion Retail & Apparel, E-Commerce, Creative Agencies, Media & Entertainment, Technology
  - *By use case:* Concepting & Moodboards, Brand Identity, Product Visualization, Ad & Campaign Creative, Social Content, Video & Storyboards
- **Enterprise** (standalone link)
- **Pricing** (standalone link)
- **Resources** ▾ — FLORA Academy, FLORA for Education, Support, Docs, Blog, Changelog, Careers, Manifesto
- Utility: **Sign in** / **Contact sales** / **Get started for free** (primary button, always visible)

**Footer structure (4-column + legal bar):**
- **Company** — Blog, Careers, Community, Manifesto
- **Product** — Canvas, Fashion Studio, Techniques, MCP/API, All Techniques, Updates, Docs
- **Pricing** — Pricing, Sales, Affiliates
- **Resources** — Gallery, Articles, Comparisons
- **Support** — Trust Center, Status, Privacy Notice, Terms of Service
- Bottom bar: Copyright line only, no newsletter signup

**Takeaway on IA:** Nav is organized two ways simultaneously — *by product* (what the tool does) and *by solution* (who it's for / what job it does). For Tradl, this maps to: Product (Screener, Alerts, Terminal, etc.) vs Solutions (Intraday traders, Swing traders, F&O traders, Beginners) — worth testing a similar dual-axis mega-menu instead of a single flat nav.

---

## 5. Page-by-Page Wireframes & Content Flow

### 5.1 Homepage (`/`)
Vertical scroll, ~14 distinct sections, alternating "explain" and "prove" blocks:

1. **Hero** — Off-center headline "Your *creative* workspace" + one-line subhead + dual CTA (primary filled / secondary outline), framed by an asymmetric collage of real output images bleeding off-screen at the edges (not a centered hero image — images anchor the four corners, text owns the center).
2. **Social proof strip** — "Trusted by top creatives at" + auto-scrolling logo marquee (Netflix, R/GA, Brex, Dentsu, etc.) — appears *immediately* after hero, before any feature explanation. Trust-first, not value-prop-first.
3. **Featured vertical callout** — "Introducing Fashion Studio" banner card with its own CTA, mid-homepage — used to cross-sell a specific vertical product without a full page scroll.
4. **Technique grid (10 cards)** — Each card = short imperative title ("Sketch to Render," "Model Try-On") + one-sentence outcome description + "Try it now →" link. This is the core repeatable content unit across the whole site (also reused in Techniques library and Fashion Studio page).
5. **"Take your work further" module** — canvas capability pitch with dual CTA repeated.
6. **3-step framework: Ideate → Iterate → Scale** — numbered (01/02/03), each step = short label + 1-sentence description + 1-sentence elaboration. This is their core narrative spine, referenced again in nav/marketing language elsewhere.
7. **Case-study logo wall** ("Pentagram to Lionsgate") + CTA — repeats social proof with named brands + category tags (Visual Effects, Fashion, Advertising, Photography, Concepting, Branding, Motion, Architecture) as a filter-like tag row (not clickable filters here, just visual variety signaling breadth).
8. **Techniques marketplace teaser** — "Start from proven creative workflows," featured technique cards attributed to named creators (not just FLORA) — establishes a UGC/creator ecosystem, not just a vendor tool.
9. **Model marketplace strip** — logos/names of 30+ underlying AI models (Nano Banana, Veo3, GPT-5.4, Kling, etc.) presented as included inventory — "one subscription to rule them all" framing turns a technical dependency list into a value prop.
10. **Case studies (3-card row)** — named companies + one-line result headline, category-tagged (Print & Product Design, Brand System Design, Architecture).
11. **Press wall** — outlet name + headline + tiny author byline, 6 items (TechCrunch, Business Insider, Adweek, CNET, etc.) — third-party validation, positioned late in the page (after product belief is already established).
12. **Closing CTA band** — "A new medium needs a new canvas." + dual CTA. Every major section closes on the same CTA pair, reinforcing without being pushy (text varies, buttons don't).
13. **Footer.**

### 5.2 Pricing (`/pricing`)
1. Hero: "Your team's new all-in-one creative solution" + Monthly/Annual toggle (20% off annual badge).
2. **4-tier card row**: Free / Starter / Pro (marked "Most Popular") / Max — each card: price, one-line persona description ("Full collaboration and workflow power"), bullet feature list, single CTA button. Launch-offer badges ("Applies through Aug 31") create urgency without a countdown timer.
3. **Cross-sell module**: "The all new Fashion Studio, included in every plan" — reinforces that verticals aren't upsells, they're bundled (reduces plan-comparison anxiety).
4. **"Pricing built around the work" explainer** — 4-icon grid explaining the *usage pool* mechanic (a genuinely novel pricing concept here — seats + shared metered dollar pool), because this is the one thing a pure table can't self-explain.
5. **Full feature comparison table** — grouped by category (Canvas & Editor / Models & Generation / Techniques & Automations / Collaboration & Sharing / Assets & Elements / Export & Publish / API & Integrations / Admin & Security), checkmarks + tier-specific values, light-background table (only place the site switches to a light surface — improves table scannability against 4 columns).
6. **FAQ accordion** — "Any questions?" + link to full FAQ + Contact sales.

### 5.3 Vertical product page — Fashion Studio (`/studio/fashion`)
This is the template worth studying closest, since Tradl AI likely needs similar vertical/persona pages (e.g. "Tradl for Options Traders," "Tradl for Beginners"):
1. Hero: "INTRODUCING" eyebrow + product name in display serif + one-line value + dual CTA + trusted-by logo strip (industry-specific logos: Skechers, ASOS, Levi's — not the generic homepage logos).
2. **3-pillar value block** (numbered 01/02/03): "3x faster from first sketch," "Get it right before it's real," "Every SKU gets its shot" — each pillar = bold claim + 2-sentence proof.
3. **Workflow-stage walkthrough (3 stages: Concept → Refine → Showcase)** — each stage gets its own mini-hero (stage label, headline, description, "Explore →" link) followed by 2–4 relevant tool cards. This mirrors the homepage's Ideate/Iterate/Scale spine but re-skinned for the vertical's actual workflow — **the narrative arc is reused, the labels are domain-specific.**
4. **Customer quotes** — 2 short testimonials, name + company only (no photo), placed mid-page between workflow stages, not bunched at the bottom.
5. **Full tool catalog** — same 3-stage grouping (Concept/Refine/Showcase), exhaustive list including "SOON" tagged upcoming tools (transparent roadmap signaling inside the product page itself).
6. **Integration teaser** — "Connect to Shopify," plus "SOON" tagged Tech Pack / Import-Export — shows ecosystem ambition even where unbuilt.
7. **FAQ accordion** (5 Q&As, written in first-person plain language, e.g. "Do I own what I create, and can I use it commercially? — Yes.") — direct answers, no corporate hedging.
8. **Closing CTA band** — tone-shift tagline ("Fashion is pain. FLORA is seamless.") + dual CTA.

### 5.4 Techniques library (`/techniques`)
A searchable/browsable marketplace, not a features page:
1. Hero: short headline + description + "Built by creators from" logo strip (NYU, Pentagram, etc. — credibility via creator pedigree, not customer logos).
2. **Featured Techniques** — 8-card horizontal highlight row, each attributed to a named individual creator + their studio/company.
3. **All Techniques**, grouped into 10 named categories (Essentials, Brand & Visual Design, Product Visualization, Marketing & Ads, Video & Animation, Space & Architecture, Print/Film/VFX, Fashion/Apparel/Editorial, Content & Packaging, Fun & Inspiration) — each item: title, 1-line description, creator credit, "Try Technique" CTA.
4. **"Request a Technique"** module — user-generated backlog / roadmap input, mid-page.
5. **"Build your own Techniques"** — points power users to a builder tool inside the canvas app.

This is essentially a **creator marketplace bolted onto a SaaS product** — every technique is credited to a person, which does double duty as social proof and community-building. Direct analogue for Tradl: a "Strategies" or "Screeners" library where community-built screens/strategies are credited to the trader who built them.

### 5.5 Gallery (`/gallery`)
Not a standard grid — an infinite drag-to-pan canvas ("press and drag" hint shown on load) of output thumbnails, category-filterable (Fashion / Brand / Film-VFX / Ads), each tile labeled with a project type + creator name. This turns the gallery itself into a demo of "canvas" as the product's core metaphor — the marketing page *is* a small version of the product.

### 5.6 Manifesto / Brand story (`/blog/manifesto`)
Structured as a dated blog post (not a static "About" page) — dateline, single-author byline (Founder & CEO), short paragraphs (2–4 sentences each), ends with a one-line signature move ("Plant your ideas. Watch them grow.") that ties back to the brand name. Placed under Company > Manifesto in both nav and footer — treated as core brand content, not buried.

### 5.7 Auth / Sign-in (overlay modal, triggered from any "Get started" CTA)
Not a full page — a centered modal card over a dimmed background:
- Left half: "Sign in to FLORA" headline, Google button, Microsoft button, divider ("OR"), email input + "Continue with email," "Don't have an account? Sign up" toggle link, Terms/Privacy footer links.
- Right half: full-bleed atmospheric brand visual (macro botanical/leaf shot with warm-color glow) — reinforces the "Flora" plant metaphor even at the point of highest friction (signup), rather than defaulting to a blank/generic auth screen.
- No password field shown until email is entered (progressive disclosure, reduces initial form intimidation).

---

## 6. Signup / Conversion Loop

```
Any page → "Get started for free" (appears in: nav bar, hero, every section-closing CTA band, pricing cards, vertical product pages)
   ↓
Auth modal (overlay, not page nav — no context loss, background page still visible/dimmed)
   ↓
Google / Microsoft OAuth  (fastest path, 1 click)
        or
Email → Continue with email → (presumably password/OTP step, not observed — requires account creation)
   ↓
[Not observed further — would require creating an account]
```

**Loop mechanics worth noting even without going further:**
- **CTA repetition, not CTA aggression.** "Get started for free" appears 10+ times on the homepage alone, but always paired with a softer "Talk to sales" option and always framed by fresh context (never a popup/interstitial). Repetition drives conversion; the *pairing* with a low-commitment secondary CTA keeps it from feeling pushy.
- **Free tier is real, not a trial.** Free plan explicitly says "Up to 17 generations free" with the cost math shown transparently in a footnote — removes the "what happens after trial ends" anxiety.
- **Modal-based auth keeps momentum.** Because sign-up is an overlay, a visitor never leaves the marketing page's context — reduces the "where am I" drop-off that a full-page redirect can cause.
- **Enterprise motion runs in parallel throughout**, never gating the self-serve path — "Contact sales" is always secondary, never forced.
- **Launch-offer urgency without a timer** — pricing badges say "Applies through Aug 31" (a real date) rather than a countdown clock, which reads as credible rather than manipulative.

---

## 7. Content & Storytelling Pattern (the reusable part)

Across every page, Flora repeats one narrative machine:

**[Numbered stage] → [Bold 3–6 word claim] → [1-sentence outcome-focused proof] → [Relevant tool/feature cards] → [Try it CTA]**

This exact pattern shows up as:
- Homepage: Ideate → Iterate → Scale
- Fashion Studio: Concept → Refine → Showcase
- Pricing page usage explainer: 4 parallel benefit blocks (no numbering, but same shape)

It's a single template reused at every altitude (whole-product, single-vertical, single-feature), which is why the site feels cohesive despite covering a huge tool catalog (100+ techniques, 30+ models, 4 pricing tiers, multiple verticals). **This is the most portable structural idea for Tradl AI** — pick one 3-step narrative spine (e.g., "Discover → Decide → Act," or "Screen → Analyze → Trade") and reuse it verbatim across homepage, any persona pages, and any feature deep-dives, only changing the specific claims underneath.

Other repeatable tone rules observed:
- Every feature description is a **complete outcome sentence**, never a noun-phrase fragment (not "Real-time collaboration" alone — instead "Iterate in real-time with the whole team").
- Testimonials are short (1 sentence), attributed by name + company only, no headshots, no star ratings — de-emphasizes "review" framing, emphasizes "practitioner said this."
- Numbers are used sparingly but concretely ($42M raised, 17 free generations, 60+ models, 3x faster) — never vague ("thousands of users").

---

## 8. Responsive Notes

At mobile width (~430px): hero headline drops to 3 stacked lines, edge-anchored collage images shrink but stay partially visible (peeking in from screen edges rather than disappearing) to preserve the "gallery wall" feel, dual CTA buttons stack full-width side by side (not stacked vertically) to save space, and the trusted-by logo strip continues to scroll horizontally beneath the fold.

---

## 9. Adaptation Matrix — Flora → Tradl AI

| Flora pattern | Direct port? | Tradl AI translation |
|---|---|---|
| Black canvas + editorial imagery as brand carrier | Partial | Trading UI is data-dense; can't go full black-canvas everywhere, but the *homepage/marketing* pages could adopt a darker, higher-contrast palette than typical fintech (most Indian broker sites — Groww, Upstox, INDmoney — already lean white/light; a darker, more premium palette would differentiate) |
| Serif display + grotesk UI type split | Yes | Gives Tradl's marketing pages a "considered/premium" feel vs. the generic-SaaS-sans-everywhere look most trading platforms share |
| Single sparing accent color on CTAs only | Yes | Directly applicable — pick one accent (not necessarily green, which is fintech-coded already; consider avoiding pure green/red given trading UP/DOWN color conventions) and use it *only* for primary action, nowhere else |
| Dual-axis mega-menu (Product vs Solutions/personas) | Yes | Product (Screener, Alerts, AI Signals, Terminal) × Solutions (Intraday, Swing, F&O, Beginners) |
| 3-step reusable narrative spine (Ideate→Iterate→Scale) | Yes | e.g. "Discover → Decide → Act" or "Screen → Signal → Execute" reused across homepage + persona pages + feature pages |
| Vertical/persona landing page template (Fashion Studio structure) | Yes | Build "Tradl for [Options/Intraday/Swing] Traders" pages using the same skeleton: hero+logos → 3-pillar value → workflow-stage walkthrough → testimonials mid-page → full feature catalog → FAQ → closing CTA |
| Creator-credited marketplace (Techniques library) | Yes, high value | A community-contributed screener/strategy library, each credited to the trader who built it — mirrors what's already a pattern in Tradl's space (smallcase does creator-credited model portfolios) but Flora's execution (10 named categories, "Request a Technique," "Build your own") is more generous/open than typical fintech marketplaces |
| Drag-to-pan visual gallery as a demo of the product | No (too niche) | Skip — Tradl's "gallery" equivalent (e.g. screenshots of AI signals, sample alerts) is better served by a standard grid; a canvas metaphor doesn't map to trading data |
| Manifesto as dated blog post, not static About page | Yes | Publish Tradl's founding story/thesis as a blog post under Company, cross-linked from footer + nav — treat it as content, not corporate boilerplate |
| Modal-based auth (not full-page redirect) | Yes | Keep signup as an overlay from any CTA — for a regulated trading product this also needs KYC-flow entry points, which Flora doesn't have, but the *first* click (create account) can still be frictionless/modal before KYC begins |
| Real, non-time-boxed free tier with transparent usage math | Yes | If Tradl has a free tier, show the real limits + cost math up front (Flora's "17 generations free, here's the math" footnote) rather than a vague "free trial" |
| Launch-offer badges with real dates, no countdown timers | Yes | Applicable to any alpha/launch pricing Tradl runs |
| Feature comparison table switches to light background | Yes | A dense comparison table (Free/Starter/Pro/Max equivalent for Tradl plans) reads better on light background even inside an otherwise dark site — worth a deliberate exception |

---

## 10. Open Questions / What Wasn't Observed
- The actual post-signup onboarding flow (KYC-equivalent steps, first-run product tour) — not accessible without creating a real account, and account creation is out of scope for this research pass.
- A/B or seasonal variants — this is a single snapshot (Aug 17, 2026); Flora likely iterates its homepage frequently given the "Special launch offer" framing.
- Backend CMS/framework specifics — not relevant to design inspiration, not investigated.

---

*This file is written as a working reference for feeding into the Claude Design project — pull specific sections (design tokens, narrative spine, adaptation matrix) directly into prompts rather than the whole document at once.*
