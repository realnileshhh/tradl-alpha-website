# TRADL AI · WEBSITE DESIGN GUIDELINES
### Alpha Launch · v1.0 · Aug 2026
Tokens (color, type faces, spacing scale, radii) come from the bound Tradl AI Design System deployed in Claude Design and are not redefined here. This document governs composition, behavior, states, and quality bars: how the tokens get used on a marketing + acquisition surface.

---

## 1 · TWO REGISTERS, ONE SYSTEM

The site runs the product's design system but in two registers:

- **Instrument register (default):** dense, hairline-bordered, numbers-forward modules. Used for all proof elements, ledgers, tool frames, stock pages, dock, chips. Identical to product surfaces, deliberately: the marketing site should feel like the product leaking out.
- **Statement register (rationed):** full-bleed typographic scenes, display-scale headlines, the single warm serif-italic beat per page. Used only for section openers and the H9/E6-class closes.

Rule: statement register never exceeds ~30% of any page's scroll length. The alternation rhythm (statement → instrument → statement) is defined in doc 02 §7.

---

## 2 · LAYOUT SYSTEM

- **Page grid:** 12-col, max content width ~1200–1280px for marketing sections; stock pages keep their locked 184/856/300 @1440 product grid untouched.
- **Section anatomy (marketing):** eyebrow (diamond/◈ + uppercase label) → headline (one line where possible) → one-sentence dek → content → optional footer kicker line above a hairline. Consistent top/bottom section padding; hairline separators between instrument-register sections only (statement scenes separate by space, not lines).
- **Header behaviors:** nav is sticky, blur-on-scroll; on stock pages the product's sticky ticker bar supersedes marketing nav past the hero.
- **Density toggle ambitions (Bloomberg bar):** not in P0 for marketing pages; reserved for product surfaces.

---

## 3 · COMPONENT BEHAVIOR SPECS

### 3.1 The Playground (hero component)
- Terminal chrome with LIVE·NSE pill; prompt line, code pane, results pane.
- Auto-loop per the four-beat choreography (doc 02 §4); loop length 18–24s; rest beat 4–6s.
- Operable mode: 3 preset prompts as chips; firing a preset plays a real cached-daily run (results must be true for that day, dated). Free-text input is NOT in the marketing hero (opens abuse/latency/compliance surface); free text lives in-product.
- Reduced-motion state: finished frame, static, with all three panes filled.

### 3.2 Proof chips & ledgers
- Chips: single-line, icon + fact + date, deep-link on click. Live chips may pulse (max one per viewport).
- Ledgers render ✓/✗ at equal visual weight; ✗ rows never reduced opacity. Every ledger has an "as of {date}" line and a link to the full archive.

### 3.3 The lifecycle band
- Three stage-coded columns; tool tiles use icon-tile grammar (thin-stroke SVG, tinted tile).
- Status chips: LIVE / PREVIEW / PRIVATE ACCESS, one normalized pill geometry sitewide.
- Private Access tiles: full color, badge, in-place expander (never route away, never grey-out). Expander: definition line + one frame + access line + [Start free].

### 3.4 The dock (stock pages, and its marketing echo)
- Product behavior per Stock Page 2.0 §5 (badge semantics: green live / iris unseen / amber time-boxed / none = nothing to say / dashed = structurally N/A; counts cap 9+; never red; one pulsing max).
- Marketing echo on /tools/stock-pages and H6: a staged dock summon, real badge grammar, annotated with ≤3 eyebrow-style callouts.

### 3.5 Carousels & auto-advance anywhere
- Viewport height must track the active slide (transitioned, with resize handler).
- Pause on pointerenter/touch; swipe threshold ~48px; per-slide progress bar; ~9s dwell.

### 3.6 Forms (signup, Decode capture)
- One field visible per step; inline validation; error text states the fix, never apologizes.
- Buttons name the outcome ("Get tomorrow's Decode," "Create account"), never "Submit."
- OTP step shows sender identity and resend timing; skippable steps say "Skip" plainly.

---

## 4 · CONTENT-STATE DOCTRINE (honesty register in UI)

- **Live vs EOD:** every price-bearing element states its state (LIVE pulse vs amber "as of close"). The marketing site inherits this; no undated numbers.
- **Absence:** absent data renders as a stated fact with ⓘ tooltip, never blank, never sample data.
- **AI provenance:** ◈ + basis line on all derived content; hover/tap reveals basis; basis lines are real, generated per item, never a template string pretending.
- **Gated states:** show the real shape of what's gated (a blurred nothing converts worse than a visible ledger with a "sign in to track" row appended).

---

## 5 · MOTION & PERFORMANCE BUDGETS

- LCP target < 2.0s on 4G mid-range Android (the ICP's second device); hero choreography must not block LCP: first frame is a painted static of the finished state, JS upgrades to loop.
- Real chart engine and demo videos lazy-load below the fold; videos are muted, poster-first, never autoplay with sound.
- Base64-embedded heavy assets are banned on the website (lesson from the 3,470-line hub); all media via optimized static assets/CDN.
- Animations: CSS transitions + IntersectionObserver triggers; the SVG gotchas are binding (clipPath wipes initialized visible; `transform-box: fill-box` if scaleY is ever unavoidable).
- `prefers-reduced-motion` honored globally; auto-advance components render as static tabbed states.

---

## 6 · RESPONSIVE RULES

- Breakpoint behavior priorities: the Playground stacks (prompt/code collapse to a tabbed pane, results always visible); lifecycle band columns → stage-tabbed single column; ledgers → horizontal scroll with edge fade, never truncation.
- Stock pages on mobile follow the owed Stock Page 2.0 mobile spec direction (left rail → chip scroller; dock → bottom sheet); marketing pages must not invent a competing mobile dock pattern.
- Touch targets ≥44px; sticky CTA on mobile is a single bottom-anchored contextual button (door-aware per doc 03 §1.3), collapsing on scroll-down, returning on scroll-up.

---

## 7 · ACCESSIBILITY & QUALITY FLOOR

- Visible keyboard focus everywhere; the dock and expanders fully keyboard-operable; Esc dismisses any popup.
- Color is never the only carrier of meaning (▲▼ glyphs + sign accompany all deltas).
- Contrast: body text and all chip text pass WCAG AA on their actual surfaces (verify tinted pills).
- All charts carry text equivalents (a one-line computed summary under each, which doubles as GEO-quotable content).
- Audio (Decode) has a text edition on the same URL, always.

---

## 8 · DO / DON'T LEDGER

| Do | Don't |
|---|---|
| Real product frames with dated, hard-case data | Isometric mockups, flattering mock data |
| One pulsing element per viewport | Ambient pulse fields everywhere |
| ✗ rows at full weight | Greyed or hidden misses |
| Gate the second unit of value | Gate the first pixel of value |
| "Fired 14× · 9 up in 10 sessions · 64%" | "Highly accurate signals" |
| Status chips: LIVE / PRIVATE ACCESS | "Coming soon" grey-outs |
| Contextual keep-CTAs on intent pages | "SIGN UP NOW" on a stock page |
| One warm serif beat per page | Serif italic as a general style |
| Sentence-case, terse microcopy | Exclamation marks, emoji, em-dashes |
| Stated absences ("Not in the F&O segment") | Blank cells, demo values |
