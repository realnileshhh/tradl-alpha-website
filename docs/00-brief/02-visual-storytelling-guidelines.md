# TRADL AI · VISUAL STORYTELLING GUIDELINES
### Alpha Launch Website · v1.0 · Aug 2026
Token layer (colors, type, spacing) lives in the bound design system inside Claude Design. This document governs what the visuals *say* and how scenes are staged.

---

## 1 · THE ONE FEELING

Within five seconds of landing, the visitor must feel:

> **"An intelligence is actively watching this market, and I can check its work."**

Every visual decision is tested against this sentence. If a visual makes the product look decorative, magical, or vague, it fails. If it makes the intelligence look *busy, specific, and auditable*, it passes.

---

## 2 · THE FIVE STORYTELLING DEVICES (the site's visual vocabulary)

### 2.1 The Playground (the hero device)
The single strongest product-truth artifact: plain-language prompt → syntax-coloured generated code → computed results with real tickers and timings ("7 matches · 1.9s"). Staged as a terminal window with chrome (LIVE · NSE pill). On the homepage this runs as an auto-playing, loopable choreography (see §4), and as an *actually operable* teaser where feasible. The Playground is where "We compute, we don't predict" stops being a claim.

### 2.2 The Ledger (proof as furniture)
Graded records rendered as ledgers: Decode's edition-by-edition scorecard, per-signal fire histories, insight grades with ✓ played-out markers. Losses render at full visual weight, never greyed or minimized. The red rows are the trust move. Ledgers appear as compact modules adjacent to claims, styled like instrument readouts, not like marketing stat blocks.

### 2.3 The Watching Field (ambient intelligence)
The visual metaphor for "always watching": orbit-field arrangements of tool icons around a stock, pulsing badge counts, live tally lines ("7 tools are watching this stock · 3 have something to say"), soft radial glows behind live elements. Motion here is slow, continuous, low-amplitude: surveillance calm, not dashboard chaos. Maximum one pulsing element per viewport.

### 2.4 The Real Surface (product truth)
Screenshots and embeds are always the real product with internally-consistent real-shaped data. No lorem, no blurred mock dashboards, no isometric illustrations of laptops. Where the real product isn't ready, the module doesn't ship. Demo subjects follow the hard-case doctrine: showing a loss-making small-cap handled honestly (the Ather pattern) is on-brand; showing only RELIANCE up-days is not.

### 2.5 The ◈ Mark (intelligence provenance)
Everything Tradl-derived carries the iris ◈ mark and, on hover/tap, a basis line. On the marketing site the ◈ doubles as a wayfinding motif: section eyebrows for intelligence features carry it, and the visitor learns the grammar (◈ = the machine derived this, here is its basis) before ever entering the product.

---

## 3 · IMAGERY POLICY

**Never:** stock photography, 3D robots, glowing brains, candlestick-chart wallpaper, hands-on-phones, hoodie-trader lifestyle shots, abstract "AI" particle heads.
**Founder/team photography:** only on the manifesto page, documentary style, if at all.
**Allowed image classes:**
1. Real product frames (device-true crops, honest data states).
2. Hand-built data visuals (SVG-native charts following the chart doctrine, §5).
3. Typographic scenes (the ASK. COMPUTE. ACT. treatment: full-bleed uppercase kinetic type).
4. The Watching Field ambient compositions.
5. Audio artifacts for Decode (waveform + Spotify chrome, real episode).

---

## 4 · MOTION DOCTRINE: COMPUTATION AS CHOREOGRAPHY

Motion on this site has one narrative job: to dramatize the compute cycle. The canonical loop, used in the hero and echoed in miniature across tool sections:

1. **Ask** · the prompt types itself (natural cadence, slight variable speed).
2. **Compute** · code streams in, a scan-line passes, a working state ticks (elapsed-time counter is real).
3. **Resolve** · results snap in as rows; numbers count up; signed deltas colorize last.
4. **Rest** · a held beat on the finished state (readable for 4–6s), then a soft reset.

**Rules:**
- Scroll-reveals are single-pass and subtle (opacity + ≤12px translate). Nothing bounces, nothing parallaxes.
- Charts animate on first intersection only; line draws and clip-wipe bars per the chart doctrine.
- Auto-advancing components pause on hover/touch; progress is always visible.
- `prefers-reduced-motion`: every choreography has a finished-state static equivalent; the site must be fully persuasive with motion off.
- Motion budget: one hero choreography + at most one ambient field per page. Everything else is micro (≤200ms state transitions).

---

## 5 · CHART DOCTRINE (hard-won rules, binding)

- **Area charts:** solid trend line (~2.4px) with a light gradient shade below (opacity ~.34 → .02). Never a flat single-color fill. No peak-number callouts when a y-axis exists.
- **Bar charts:** solid bars rising via clipPath wipe that initializes fully visible (rAF-throttle-proof). Never scaleY per-rect.
- **Comparative share stories:** dumbbell/inversion plots, not strips or stacked hbars.
- **Heatmaps:** percentage values only, no n columns, no highlight flags.
- **Toggles:** one metric visible at a time, never two % per row.
- **Honesty in axes:** ranges honest to actual data (no 10Y toggle on a 15-month listing); partial periods excluded from trends, stated in a footnote if their absence is visible.
- All charts hand-built inline SVG, uniform label styling, tabular numerals.

---

## 6 · SCENE STORYBOARDS (the key moments, staged)

**S1 · Homepage hero:** dark field, faint grid, headline + doctrine badge left; the Playground terminal right, running the canonical loop on a real screening prompt. One CTA pair beneath the headline. The first scroll pixel reveals a live proof strip (Decode scorecard chip · coverage chip · signals-fired-today chip).

**S2 · The lifecycle band (Discover · Analyse · Act):** three stage-coded columns populate with tool tiles as the user scrolls; Private Access tools render with a distinct badged state (present, desirable, gated) rather than "coming soon" grey.

**S3 · Tool deep-dive scenes (one per detail section):** each tool gets one signature demonstration frame, not a feature list. Pattern Sniper: the two-stage reveal (forming-pattern thumbnail → full evidence card with zones, flags, runway). Smart Stock Pages: the AI Toolkit dock summoning with badge semantics. AI Backtesting: parameters → equity curve drawing → the stats table resolving. Morning Decode: today's edition with yesterday's grades visible and the Spotify player inline.

**S4 · The honesty scene:** a dedicated module that shows a miss. A Decode call that went wrong, graded ✗, kept in the archive. Caption pattern: "Ed. 71 · 2 of 6 moved against the read. It stays on the record." This scene converts skeptics; it is not optional.

**S5 · Stock page as showcase:** the marketing site frames a real Smart Stock Page (hard-case stock) inside a device-true viewport with three annotated callouts max (◈ summary, live signal record, the Spine). Annotations use the eyebrow grammar, never speech bubbles.

**S6 · Sign-up moment:** the transition from marketing to product is staged as *entering the instrument*: background field persists, marketing chrome falls away, the form is terminal-calm (see doc 03 §8). No confetti, no celebratory illustration on success; success state = the product already working on something ("Your first scan is ready").

---

## 7 · RHYTHM & DENSITY

- Page rhythm alternates: full-bleed statement scene → dense proof module → full-bleed scene. Never two dense modules adjacent; never two statement scenes adjacent.
- Whitespace is the premium signal. Density is earned inside modules; the page around them breathes.
- Every scroll-depth of ~2 viewports must contain at least one number the visitor could screenshot and quote.
- Section eyebrows carry the diamond/◈ grammar consistently so the page scans as one instrument.

---

## 8 · WHAT FAILS REVIEW (kill list)

- Any adjective doing a number's job.
- Any chart that decorates rather than argues.
- Two pulsing elements in one viewport.
- A claim more than one viewport from its proof.
- Mock data that flatters (all-green states, round numbers, only large caps).
- "Coming soon" as visual dead weight; gated tools must look alive and desirable.
- Any visual implying order placement, execution, or broking.
