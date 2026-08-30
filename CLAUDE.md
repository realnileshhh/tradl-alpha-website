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
│   │   └── dev/stack/          Proving ground. 404s in production. Deletable.
│   ├── components/
│   │   ├── providers/          Client providers, mounted once in layout
│   │   ├── three/              R3F canvas wrapper + post-processing chain
│   │   ├── motion/             Component-level transitions
│   │   └── ui/                 Empty. Real components go here.
│   ├── lib/                    gsap registration, reduced motion, env, utils
│   ├── store/                  Zustand
│   └── styles/                 globals.css + tokens/
├── docs/                       The brief. Binding. See docs/README.md.
├── reference/                  Prior artefacts. Not binding.
└── public/
```

Import alias is `@/*` → `src/*`.

---

## The brief binds

`docs/00-brief/` is the specification, dated 16 Aug 2026. Read `docs/README.md` for the tour.
Before writing any page, read `03-website-content-structure.md` for that page's section spec and
`04-website-design-guidelines.md` for how it should behave.

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

## Design tokens

`src/styles/tokens/` is a copy. The source of truth is `reference/design-system/tokens/`, exported
from Figma. When Figma changes: re-export into `reference/`, then sync forward. Never edit the copy
alone.

Dark is canonical (`:root`); light lives behind `[data-theme="light"]` on `<html>`.

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

Type: IBM Plex Sans drives all text, Lato drives all numbers. The split is from the design system,
not taste. Use `.num` on any figure so it gets Lato and tabular numerals.

---

## The stack, and which library owns what

The division of labour is the point. Two libraries animating the same element's transform is the
failure mode this layout exists to prevent.

| Concern | Owner | Entry point |
|---|---|---|
| Scroll choreography: pinning, scrubbing, timelines | **GSAP + ScrollTrigger** | `@/lib/gsap` |
| Smooth scroll | **Lenis** | mounted app-wide in `providers/lenis-provider` |
| Component transitions, hover, page transitions | **Motion** | `components/motion/` |
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
- `prefers-reduced-motion` is honoured globally, in CSS and in JS. `SceneCanvas` does not mount WebGL
  at all under it; `LenisProvider` does not construct Lenis; auto-advancing components render as
  static tabbed states.

## Accessibility floor · doc 04 §7

Visible keyboard focus everywhere. Expanders and docks fully keyboard-operable. Esc dismisses any
popup. Touch targets at least 44px.

---

## Commands

```bash
npm run dev        # localhost:4100, Turbopack
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run verify     # typecheck + build. Run before every commit.
```

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
