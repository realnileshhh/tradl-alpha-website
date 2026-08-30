# Tradl AI — Design System

**Tradl AI** ("AI Trading Intelligence") is an AI-powered markets/trading-intelligence
product for Indian equity & derivatives markets (NIFTY 50, Bank Nifty, options chains,
open interest, PnL, put-call ratio). The interface is a dense, dark, terminal-style
dashboard built for scanning numbers fast.

This design system is **foundations-first**: the source Figma defines a complete token
system and type/color/shadow specimens but **no component families** (see Sources). The
tokens, typography and specimen recreations are exact; a small set of components and one
dashboard UI kit are documented additions built strictly from those tokens.

---

## Sources
- **Figma:** "Design System Bento style.fig" (mounted VFS). Page-1 with three specimen
  frames — `Colors`, `Typography`, `Shadows` — plus one Figma Variable collection
  (20 variables). `/METADATA.md` reports **0 component families / 0 local components**.
- **Uploaded tokens:** `uploads/Dark.tokens.json`, `uploads/Light.tokens.json` (W3C
  design-token format, both theme modes) — the authoritative color values.
- **Uploaded logos:** `TRADL AI white-bg.png` (full wordmark lockup),
  `TRADL AI white-bg logomark.png` (app-icon mark). Copied into `assets/`.

## Brand at a glance
- **Name/tagline:** Tradl AI — "AI TRADING INTELLIGENCE".
- **Logo:** lowercase `trad` + a green `l.` where the "l" is a forward slash and the dot
  is a filled circle. Ships as a wordmark and a rounded-square app mark on black.
- **Accent:** emerald green (`#3FCF8E` / `#34D399`) on near-black surfaces.
- **Type:** IBM Plex Sans (all text) + Lato (all numbers).

---

## Content fundamentals
- **Tone:** terse, professional, numbers-forward — a trading terminal, not marketing.
  Labels are short and often **UPPERCASE** (`NIFTY 50`, `PCR (OI)`, `EXPIRY`).
- **Casing:** Title Case for headings/card titles ("Options Chain"), UPPERCASE for
  metric labels/eyebrows and key badges, sentence case for metadata/captions.
- **Numbers:** always monospace + tabular figures so columns align; PnL/percentages
  carry an explicit sign and ▲/▼ direction, colored positive/negative.
- **Voice:** neutral third-person / imperative ("Ask Tradl AI…"). No first-person, no
  hype, no exclamation.
- **Emoji:** not used. Direction is shown with ▲ ▼ ● and colored deltas, not emoji.

## Visual foundations
- **Theme:** dark is canonical (`:root`); a full light mode exists (`[data-theme="light"]`).
- **Surfaces:** layered near-blacks — L1 `#000` app bg, L2 `#161616` cards, L3 `#1E1E1E`
  raised rows, L4 `#232A28` tinted (subtle green cast). Light mode: `#F8F9FB → #FFF → #EFF1F4`.
- **Color logic:** semantic positive/negative/warning drive market state; three data
  **categories** — Column (indigo `#818CF8`), Metric (emerald `#34D399`), Rule (violet
  `#A78BFA`) — each with matched surface-tint / border / icon tokens.
- **Chart cells:** CE (call) columns get `--surface-chart-positive` green tint; PE (put)
  columns get `--surface-chart-negative` red tint.
- **Borders:** hairlines carry the UI — Subtle `rgba(255,255,255,.12)`, Subtle-2 `.04`,
  Faint `#16151A`. Strong/Medium greys for emphasis. 1px throughout.
- **Radius:** panels **10px** (source default), cards 8px, controls 6px, chips 3px, pills full.
- **Elevation:** restrained — subtle black shadows (alpha 0.12–0.55). Dark UI leans on
  borders + surface steps more than shadow. A faint inset hairline sits on dense cells.
- **Spacing:** 4px base; specimen panels use 32px gutters, 18–22px internal gaps.
- **Layout:** 1040px content max-width (source Variable `width/1040`); dense grids.
- **Animation / states:** minimal. Hover lifts to the next surface step (L2→L3) or shifts
  text secondary→primary; active/press darkens. No bounces or decorative motion.
- **Imagery:** none in source beyond the logo — this is a data UI. No photography,
  no gradients-as-decoration (only the one panel gradient specimen), no illustration.

## Iconography
- The source defines **icon color tokens** (Primary/Secondary/Tertiary + Column/Metric/Rule)
  but ships **no icon set**. It uses Unicode glyphs for direction/state: ▲ ▼ ● ⌕ ☾ ☀.
- **Recommendation (not in source):** pair with a thin-stroke line-icon set (e.g. Lucide
  via CDN) tinted with the `--icon-*` tokens if a fuller icon library is needed. Flagged
  as a substitution — no icon font exists in the provided files.
- Emoji are **not** used.

---

## Components (intentional additions)
The source defines **no** component families (0 in METADATA). These primitives were added
because they are named directly by the token system and are required to compose the trading
UI. Each is built only from the documented tokens.
- **Badge** (`components/core/Badge.jsx`) — neutral/green/yellow (source Badge tokens) + positive/negative.
- **Card** (`components/core/Card.jsx`) — L2/L3/L4 surface panel, hairline, optional category rail.
- **CategoryTag** (`components/core/CategoryTag.jsx`) — Column/Metric/Rule tinted pills.
- **Delta** (`components/data/Delta.jsx`) — signed PnL/% indicator (mono, tabular, ▲/▼).
- **StatTile** (`components/data/StatTile.jsx`) — KPI tile: label + big mono value + delta.

## Index / manifest
- `styles.css` — global entry (imports only).
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `assets/` — `tradl-logo-dark-full.png` (dark-mode full lockup: mark + wordmark + tagline), `tradl-logo-wordmark.png`, `tradl-logomark.png`, `tradl-wordmark-dark.png`, `tradl-mark-small.png`.
- `guidelines/*.card.html` — foundation specimen cards (Brand, Colors, Type, Spacing, Effects).
- `components/core|data/` — the primitives above (+ `.card.html` demos).
- `ui_kits/dashboard/index.html` — Markets Terminal UI kit (interactive; overview + options chain + AI signals).
- `templates/markets-terminal/MarketsTerminal.dc.html` — Markets Terminal starting template for consuming projects (index tiles + AI signal cards, composed from the DS components).
- `thumbnail.html` — homepage tile. `SKILL.md` — Agent-Skill wrapper.

## Caveats
- **Fonts** load from Google Fonts (`@import` in `tokens/fonts.css`); no self-hosted binaries
  were provided, so no `@font-face` rules ship. IBM Plex Sans + Lato are loaded from Google Fonts (updated from the
  source Figma’s Inter/JetBrains Mono at the brand team’s request).
- The **dashboard UI kit is an illustrative composition** of the foundations. The source
  contains no product screens, so it recreates the implied terminal from tokens + type,
  not a captured design.
