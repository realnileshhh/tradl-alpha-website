# CLAUDE.md · Tradl AI · Alpha Launch Website

Marketing site for Tradl AI's alpha launch. Next.js App Router, React 19, TypeScript, Tailwind v4,
with a full 3D and scroll-choreography stack wired and waiting.

**There is no UI yet, on purpose.** `/` renders an empty `<main>`. The design starts from scratch.
Everything below is the rule layer and the map — read it before building, not after.

---

## Task management

For any prompt containing more than one task or a multi-step task,
always use the TodoWrite tool to create a checklist before starting.
- Break the work into discrete, verifiable items.
- Mark exactly one item as in_progress at a time.
- Mark each item completed immediately after finishing it.
- Do not batch completions or skip the checklist for multi-step work.

If `TodoWrite` is not available in the session, use the equivalent task tools
(`TaskCreate` / `TaskUpdate` / `TaskList`) under the same rules. The rule is the checklist
discipline, not the tool name.

---

## Repository map

```
tradl-alpha-website/
├── src/
│   ├── app/                    App Router. layout.tsx is a server component.
│   │   ├── page.tsx            Homepage. Empty. Start here.
│   │   └── dev/                404s in production. Deletable whole.
│   │       ├── design-system/  Living reference: tokens, icons, components.
│   │       └── stack/          Animation/3D proving ground.
│   ├── design-system/          The Figma mirror. See docs/DESIGN-SYSTEM.md.
│   │   ├── _figma-export/      Raw exports. Input, never edited.
│   │   ├── tokens/             GENERATED. Never hand-edit.
│   │   ├── extensions/         Ours, because Figma has no answer yet.
│   │   ├── marketing/          Site-only: the page ground and the measure.
│   │   └── provenance.json     What was read, when, and what is missing.
│   ├── components/
│   │   ├── providers/          Client providers, mounted once in layout
│   │   ├── three/              R3F canvas wrapper + post-processing chain
│   │   ├── motion/             reveal + split-words (GSAP), fade-in (Motion)
│   │   └── ui/                 Ported components, generated icons/ and brand/
│   ├── lib/                    gsap registration, scroll control, reduced motion, env, utils
│   ├── store/                  Zustand
│   └── styles/                 globals.css. The only global CSS.
├── scripts/                    The design-system generators. `npm run ds:build`.
├── docs/                       The brief (binding) + DECISIONS + DESIGN-SYSTEM + MOTION.
└── public/brand/               Logo SVGs, canvas rects stripped.
```

Import alias is `@/*` → `src/*`.

---

## The brief binds, and it is not in this repository

The specification is confidential. `docs/00-brief/`, `docs/01-inspiration/`,
`docs/02-product-context/` and `reference/` are gitignored and were removed from history before this
repository was made public. **If they are not on your disk, ask for them before writing anything
customer-facing.**

Everything below cites them precisely, and the citations are load-bearing: doc 01 §7 is the lexicon,
doc 01 §8 the compliance rails, doc 03 §3 the homepage section spec, doc 04 §5 the performance
budget. Do not reconstruct a rule from its citation. The whole point of the lexicon and the SEBI
perimeter is that they are exact, and an approximation of a compliance rail is worse than no rule at
all.

With the brief present: read `docs/README.md` for the tour, then, before writing any page,
`03-website-content-structure.md` for that page's section spec and `04-website-design-guidelines.md`
for how it should behave.

**Precedence:** `00-README.md` supersedes `06-master-prompt-source` (the founder PDF). The PDF
predates the package and carries a broking/licence narrative, a fundraise, and an F&O loss stat that
the package explicitly locks out. Use the PDF for market framing and reasoning; never for copy.

---

## Copy rules · doc 01 §7, enforced on every customer-facing string

Hard bans:

- No em-dashes or double hyphens.
- No emoji, anywhere, in design or copy.
- No exclamation marks.
- Banned words: reliable, guaranteed, accurate (as a bare adjective), target (in a price context),
  buy, sell, recommendation, tip, sure-shot, multibagger, alpha (as a returns promise; "alpha" as a
  release stage is fine), beat the market, get rich.
- No superlative without a number attached. "The fastest" is banned. "1.9s on a 3,000-stock scan"
  ships.

Positive rules:

- Body is sentence case and short declaratives. Labels are UPPERCASE. Titles are Title Case.
- One idea per sentence. If a sentence has "and" twice, split it.
- ₹ always, never "Rs". Indian units (lakh, Cr). No USD on the trader-facing site.
- Numbers carry the emotion, not adjectives.
- Warmth is allowed exactly once per page: a lowercase serif-italic beat. Everywhere else stays
  instrument-grade.

**Customer-facing includes metadata.** Page titles, meta descriptions, Open Graph and X card text,
image alt text, the web app manifest and JSON-LD are all read by people, and the RA perimeter does
not care that a string sits in a `<head>`. They live in `src/lib/site.ts`, taken verbatim from the
copy library in doc 05 §5 rather than paraphrased, because a locked string edited slightly is no
longer a locked string. `npm run check:copy` enforces the hard bans and flags the context-dependent
ones for a human; it runs as part of `npm run verify`.

## Compliance rails · doc 01 §8

- SEBI Research Analyst perimeter: computed and historical analytics only. Never a recommendation,
  price target, fair value, or buy/sell language.
- "Share price target" intent is served through implied expectations only ("At ₹X, the market is
  pricing in ~Y% revenue CAGR"). Never a target.
- The RA registration number sits in the footer sitewide. Data attribution (CMOTS, NSE, BSE) in the
  footer and on every data-bearing module.
- Anything AI-derived carries the ◈ mark and a basis line: what was checked, what was computed.

## Conversion anti-patterns · doc 03 §1.4, banned outright

Exit-intent popups, countdown timers, fake scarcity, newsletter interstitials, chat widgets,
cookie-banner-style CTA bars. The positioning converts through usefulness and proof density, never
pressure.

---

## The two registers · doc 04 §1

The site runs the product's design system in two registers, and the alternation is the design:

- **Instrument (default):** dense, hairline-bordered, numbers-forward. All proof elements, ledgers,
  tool frames, stock pages, chips. Identical to product surfaces on purpose — the marketing site
  should feel like the product leaking out.
- **Statement (rationed):** full-bleed typographic scenes, display headlines, the one serif-italic
  beat. Section openers and closes only.

**Statement register never exceeds ~30% of a page's scroll length.**

---

## Building a component · the surface rules

The construction language is `docs/SURFACES.md`. It governs material, strokes, elevation, glass,
layering and geometry. It governs **nothing** about colour or typography, which come from the Figma
mirror and are not open for reinterpretation.

The thesis: a surface is a translucent pane, lit from above by a 1px specular highlight, outlined by
a hairline stroke, blurred behind. Depth comes from stroke plus inner top highlight plus blur, never
from a big drop shadow.

- **Every surface carries a specular.** `shadow-spec`, or a stack containing one. Omit it and the
  component reads flat and unlike the rest of the site.
- **Hover moves the stroke or adds a wash. It never changes the fill.**
- **No raw hex in a component.** Colour is `--ds-*`. Enforced by `npm run check:surfaces`.
- **A `backdrop-blur` needs its own compositing layer**, or Safari drops it. Use the `glass` class.
  At most two blurred surfaces per viewport, against the LCP budget below.
- **Nested surfaces are concentric:** inner radius = outer radius minus padding.
- **Never animate layout.** Not `width`, `height`, `left`, `top`, `margin`, `padding` or `filter`.
  Blur a sibling and animate its opacity.
- **Pick a stack, not an atom**, from the elevation table. A sixth stack is a conversation.

---

## Design tokens

**The source of truth is the Figma file, and only the Figma file.**

| | |
|---|---|
| File | `Tradl Design System` |
| File key | `ZRYpUf3iulUMH0Rbdb68hk` |
| Pages | Components - General · Components - Tradl Guide · Components - Backtesting · Typography · Icons · Logos |
| Variable collections | `Primitives` · `Semantics` · `Shadows` |

The system is still evolving. It is read through the Figma MCP and regenerated into this repo. See
**Design system sync** below for the procedure and the rules that keep the mirror honest.

`reference/design-system/` is a **stale earlier export** from a different Figma file (the "Bento"
one). Its `--surface-l1…l5` / `--radius-xs…xl` naming does not exist in the live file. Treat it as
history. It is not a source, and values are never copied forward from it.

Dark is canonical (`:root`); light lives behind `[data-theme="light"]` on `<html>`.

> **The table below is stale.** It describes `src/styles/tokens/`, which came from the superseded
> "Bento" export. None of those custom property names (`--surface-l1`, `--radius-xs`, `--tradl-green`)
> exist in the live Figma file. It is kept only because it still accurately describes the code as it
> stands today, and it goes away when `src/design-system/tokens/` is generated. The `@theme` naming
> rule underneath it is permanent and applies to the new layer too.

`globals.css` maps tokens into Tailwind through `@theme inline`. **A `@theme` key must never repeat a
custom property the token files declare.** Tailwind emits its theme keys back into `:root`, so
`--radius-md: var(--radius-md)` lands after `effects.css` and resolves to itself — the value
collapses and the utility silently emits nothing. That is why the theme uses distinct suffixes:

| Token | Utility |
|---|---|
| `--surface-l1` … `--surface-l5` | `bg-l1` … `bg-l5` |
| `--text-primary`, `--text-positive`, … | `text-primary`, `text-positive`, … |
| `--border-subtle`, `--border-strong`, … | `border-subtle`, `border-strong`, … |
| `--radius-xs` … `--radius-xl` | `rounded-chip`, `rounded-control`, `rounded-card`, `rounded-panel`, `rounded-container` |
| `--shadow-xs` … `--shadow-xl` | `shadow-e1` … `shadow-e5` |
| `--font-sans` / `--font-num` | `font-text` / `font-number` |
| `--layout-max-width` | `max-w-content` (1040px) |

Anything unmapped is still reachable as a plain custom property: `var(--surface-badge)`.

Type: **Inter drives everything**, text and numbers both, because that is what every type variable in
the live Figma file says. The old IBM Plex Sans + Lato split came from the superseded "Bento" export;
see `docs/DECISIONS.md` 002. Use `.num` on any figure so it gets tabular
numerals; it no longer switches family.

**Ground.** The site runs dark, directly on the design system's one mode. There is no theme switch,
no inverted scale and no wrapper class: every token renders exactly as drawn. Do not author light
equivalents. The only value that is ours is `--page-ground` `#121212`, because the system's surfaces
are white overlays with no ground of their own and Figma has no `bg/base`. The two registers differ
by scale and density, not colour. See `docs/DECISIONS.md` 004.

---

## Design system sync · the five rules

The Figma system is live and **expected to grow**. This repo holds a **generated mirror** of it under
`src/design-system/`, refreshed after every push and every deploy. The full handbook, the extension
procedures and the sync log are in **`docs/DESIGN-SYSTEM.md`**. These five rules are the ones that
must be in context every session, because breaking any of them is silent and unrecoverable later.

**1 · One direction.** Figma → repo, never back. The Figma write tools (`use_figma`,
`create_new_file`, `generate_figma_design`, `upload_assets`, `add_code_connect_map`,
`send_code_connect_mappings`, `weave_*`) are off limits on this project. Read tools only. If
something is wrong in Figma, the design team changes it there and we re-sync.

**2 · Never write a value you did not just read.** Every colour, radius, spacing, shadow, type size
and asset in `src/design-system/tokens/` must trace to a Figma MCP response *from the current
session*. Not from `reference/design-system/`, not from an older token file, not from a screenshot,
not from memory. Do not infer a token because its siblings exist. Never eyedrop a colour out of a
PNG.

**3 · A gap is reported, never filled.** If the MCP is unreachable, a page will not enumerate, or a
node errors: stop and say so. Half a mirror with an honest gap list beats a complete one with three
invented values in it, because the invented ones are undetectable afterwards.

**4 · Three buckets, never mixed.**

```
src/design-system/
├── tokens/        MIRRORED.  Generated from Figma. Hand-editing it is always a bug.
├── extensions/    EXTENDED.  We invented it because Figma has no answer yet. Dated, with a why.
└── marketing/     SITE-ONLY. Right for a landing page, wrong for a product surface.
```

A value's bucket is visible from its import path, which is the point: once "is this from Figma?"
needs a lookup, the answer starts getting guessed.

**5 · Extending means refreshing an input, never editing a script.** The system will grow. Nothing
about its *contents* may be hard-coded in `scripts/`: not a token list, not an icon name, not a
canvas offset. Everything derives from the raw Figma responses in `_figma-export/`, so a new
variable, icon or collection is picked up by refreshing that input and re-running `npm run ds:build`.
A script that needs editing to accept a new token is a script that will silently drop the next one.
Procedures for each case are in `docs/DESIGN-SYSTEM.md` → Extending the system.

---

## The stack, and which library owns what

The division of labour is the point. Two libraries animating the same element's transform is the
failure mode this layout exists to prevent.

| Concern | Owner | Entry point |
|---|---|---|
| Scroll choreography: pinning, scrubbing, timelines | **GSAP + ScrollTrigger** | `@/lib/gsap` |
| Scroll reveals: content entering the viewport | **GSAP**, through one primitive | `components/motion/reveal` |
| Smooth scroll transport | **Lenis** | mounted app-wide in `providers/lenis-provider` |
| Moving, stopping, resuming the page | ours, over Lenis | `@/lib/scroll` |
| Mount entrance, hover, page transitions | **Motion** | `components/motion/fade-in` |
| Chrome that answers an input | **CSS transitions** | `--motion-chrome`, `--motion-ease` |
| Durations, easing, distances, budgets | ours | `design-system/extensions/motion.ts` |
| 3D scenes | **React Three Fiber + three** | `components/three/scene-canvas` |
| 3D helpers: cameras, loaders, environments, controls | **drei** | import directly |
| Bloom, grain, aberration, vignette | **@react-three/postprocessing** | `components/three/effects` |
| Physics | **@react-three/rapier** | import directly |
| State crossing the DOM ↔ R3F boundary | **Zustand** | `store/use-app-store` |
| Styling | **Tailwind v4** | `styles/globals.css` |

Rules that are easy to violate once and expensive to find later:

- **Import gsap and ScrollTrigger only from `@/lib/gsap`.** Importing from `"gsap"` directly gets you
  a second plugin instance after a bundler split, and then `ScrollTrigger.getAll()` returns half your
  triggers.
- **Use `useGSAP` with a `scope`**, not bare `useEffect`. It reverts tweens on unmount, which is what
  stops ScrollTrigger leaking across client-side navigation.
- **Wrap 3D scenes in `next/dynamic` with `ssr: false` at the call site.** three + drei +
  postprocessing is roughly 600KB gzipped. `SceneCanvas` is client-only but not itself lazy, so the
  dynamic boundary is what keeps that weight off routes that do not use 3D.
- **`SceneCanvas` defaults to `frameloop="demand"`.** A continuously animating scene must opt into
  `"always"` explicitly, so the battery cost is a decision rather than a default.
- **Read the store inside `useFrame` with `useAppStore.getState()`**, not the hook. A component that
  runs 60 times a second should not also re-render on store changes.
- **Content enters through `<Reveal>`, never a hand-rolled ScrollTrigger.** One trigger per group,
  `once: true`, `yPercent` and not pixels, pre-hidden in CSS. `<SplitWords>` is the statement-register
  variant, roughly once per page. A hand-rolled reveal re-declares the trigger point and the curve,
  which is the thing the vocabulary exists to prevent.
- **Never wrap the hero in `<Reveal>`.** It starts at `opacity: 0`, so it would make the LCP element
  wait for hydration. Development warns; treat the warning as an error.
- **Never retype a duration, curve or distance.** They come from
  `@/design-system/extensions/motion`. Motion values are an extension and not a token: Figma has not
  been read for them.
- **Move the page through `@/lib/scroll`**, never `scrollIntoView`, `scroll-behavior: smooth` or the
  Lenis instance. Overlays call `lockScroll()` / `unlockScroll()` in one effect, paired.
- **`data-lenis-prevent` on every iframe and third-party embed.** Ordinary nested scrollers are
  handled by `allowNestedScroll`.

Full handbook, with the numbers and what was deliberately discarded: **`docs/MOTION.md`**.

## Performance budget · doc 04 §5, and it is in tension with the stack

- **LCP under 2.0s on 4G mid-range Android.** This is the binding constraint, and the 3D stack is the
  main threat to it. A hero's first frame must be a painted static of the finished state; JS upgrades
  it to the live scene afterwards. Never let WebGL be the LCP element.
- Doc 04 §5 as written specifies CSS transitions plus IntersectionObserver. The heavier stack is a
  deliberate override of the technique, **not of the budget**. Every library added has to earn its
  bytes against the 2.0s number, and anything that cannot is cut before launch.
- Base64-embedded heavy assets are banned. All media through optimised static assets.
- Below-fold charts and video lazy-load. Video is muted and poster-first, never autoplaying with
  sound.
- Per page: at most 40 ScrollTriggers and at most 4 of them scrubbed. `<Reveal>` warns in
  development when either is passed.
- `prefers-reduced-motion` is honoured in three independent places, because any one can fail.
  `SceneCanvas` does not mount WebGL at all. `<Reveal>` and `<SplitWords>` set the final state and
  create no tween. Lenis is still constructed and honours the setting itself, forcing interpolation
  to 1 so scroll tracks the input device with nothing smoothed, which is what lets `@/lib/scroll`
  work without a branch (see `docs/DECISIONS.md` 005). Auto-advancing components render as static
  tabbed states.

## Accessibility floor · doc 04 §7

Visible keyboard focus everywhere. Expanders and docks fully keyboard-operable. Esc dismisses any
popup. Touch targets at least 44px.

---

## Commands

```bash
npm run dev          # localhost:4100, Turbopack
npm run typecheck    # tsc --noEmit
npm run check:copy   # lexicon rules (doc 01 §7) over customer-facing strings
npm run check:motion # fails if motion.css drifted from motion.ts
npm run check:surfaces # raw colour, uncomposited blur, click-eating overlays, layout transitions
npm run build        # production build
npm run verify       # typecheck + copy + motion + surfaces + build. Before every commit.

npm run ds:build     # regenerate tokens, icons, wordmark, favicons and share card
npm run ds:verify    # regenerate, then fail if the tree moved. Catches hand edits.
npm run ds:contrast  # WCAG report for every pairing the site actually uses
```

The design-system generators are documented in `docs/DESIGN-SYSTEM.md`. `ds:verify` is the one that
belongs in CI: the generators are deterministic, so a dirty tree after a rebuild means someone edited
a generated file by hand and is about to lose the change.

## Removing what does not ship

The stack was installed complete so each piece could be proven to interoperate. Anything unused at
delivery comes out:

```bash
rm -rf src/app/dev                                   # the proving ground
npm uninstall @react-three/rapier                    # if no physics ships
npm uninstall @react-three/postprocessing postprocessing
npm uninstall three @react-three/fiber @react-three/drei @types/three
npm uninstall gsap @gsap/react lenis
npm uninstall motion zustand
```

Delete the matching directory under `src/components/` with each one, and run `npm run verify`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
