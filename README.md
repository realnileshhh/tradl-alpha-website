# Tradl AI · Alpha Launch Website

The marketing site for Tradl AI's alpha. One page, built on Next.js App Router with React 19,
TypeScript and Tailwind v4, styled from a generated mirror of the product's Figma design system, and
choreographed with GSAP, Lenis and three.js.

It runs dark, on one mode, at desktop widths. Every colour, radius, type size and shadow on the page
traces back to a token read out of Figma rather than typed into a component.

---

## Quick start

**You need:** Node.js 20.9 or newer (Next 16's own floor) and npm. Nothing else, no database, no
services, no keys.

```bash
git clone git@github.com:realnileshhh/tradl-alpha-website.git
cd tradl-alpha-website
npm install
npm run dev
```

Open **http://localhost:4100**. Port 4100 rather than 3000, and it is set in the `dev` script, so
nothing has to be passed on the command line.

The site gates itself below 1024px wide: on a phone or a tablet you get a page saying to come back on
a laptop. That is deliberate and temporary, and it is explained under [What is still standing
in](#what-is-still-standing-in). **If you are testing in a browser, give the window at least 1024px
or you will see the notice instead of the site.**

### Environment

One optional variable, and the app has a sensible default for it:

```bash
cp .env.example .env.local
```

```bash
# Public site origin. Used for canonical URLs and for resolving the Open Graph image.
NEXT_PUBLIC_SITE_URL=http://localhost:4100
```

Locally you can skip this entirely. On Vercel it is read from the deployment when it is not set. See
`src/lib/env.ts` for exactly how the origin is resolved.

### First run, what to expect

The first `npm run dev` compiles with Turbopack and is the slow one. After that, edits are near
instant.

Two things load lazily and are not in the first paint, by design:

- the **bull** in the engineering section, about 1.5MB of three.js and model, which starts fetching
  as soon as the page is idle or you scroll, whichever comes first;
- the **dust field** behind the closing section, which mounts when the browser is idle and only
  renders while the section is near the viewport.

If you set `prefers-reduced-motion` in your OS, neither is downloaded at all and you get the static
versions of both. That is worth trying once: it is a genuinely different page and it is meant to be a
good one.

---

## What is on the page

`/` is the whole site today, top to bottom:

| Section | What it is |
|---|---|
| **Announcement bar** | The company line. Scrolls away and does not come back. |
| **Nav and ticker** | A floating pane that sticks; the market strip runs full bleed and scrolls under it. The alpha access notice announces itself once per load, then behaves like an ordinary tooltip. |
| **Hero** | Two columns. The claim, the explanation and a single email field on the left; the pane the product image lands in on the right. A background video fills the first screen, with one mute control. |
| **Toolkit** | Section opener, then the tools as a labelled bento: one group per lifecycle stage, each tile a media well over the tool's name, state and one line. |
| **Founders** | Two quotes at equal weight, glass cards over an aura. |
| **Engineering** | A bull on a sticky stage, turned one revolution by the scroll and by however far you drag it, with six construction rules arriving around it as glass panes. Below 1024px it is a painted still and a two-up stack, with no WebGL at all. |
| **FAQ** | Two columns, native `<details>`, smooth disclosure, no JavaScript. |
| **Close** | A statement scene over a drawn shaft of green light with dust turning in it, the page's one warm beat, the same email control as the hero, and three proof chips. |
| **Footer** | Full lockup, four columns, the compliance block. |

### Switches

`src/lib/flags.ts` holds the surfaces that are built and currently not on the page. Each one is a
boolean with the reasoning written next to it, and turning any of them on is a one-line edit with no
other change:

| Flag | Brings back |
|---|---|
| `SHOW_DOCTRINE_PILL` | The "we compute, we don't predict" eyebrow above the hero headline |
| `SHOW_SEE_IT_COMPUTE` | The hero's second CTA, an outlined pill with a travelling edge light |
| `SHOW_HERO_DEMO_SCENE` | The full-measure demo frame and the pinned scroll choreography that carries it to the centre of the screen |
| `SHOW_LIFECYCLE_BAND` | The numbered panel row between the toolkit's opener and its tiles |
| `SHOW_ACT_STAGE` | The third lifecycle stage and its two tools, everywhere they appear |
| `SHOW_TOOLKIT_EXPLORER` | The tabbed, pinned tool explorer instead of the bento. A toggle: one of the two is always on the page |
| `SHOW_PEEK_SECTION` | The sneak peek section and its self-advancing carousel |
| `SHOW_CLOSE_VIDEO` | The close's background video instead of the drawn scene. Also a toggle |

Nothing behind a flag was deleted or unwound. The measured numbers, the bug fixes and the reasoning
are all still in those files, which is the point of a switch rather than a revert.

### What is still standing in

Marked in code at the place it sits, so none of it can ship by accident:

- **Below 1024px, in either orientation, the site is one page asking you to come back on a laptop.**
  The narrow layouts underneath are built and working; what is missing is a design pass over the whole
  page at that width. The gate is `src/components/site/viewport-gate.tsx` plus the tablet test in
  `src/lib/device.ts`, and it comes out in one commit. While it stands the site is `noindex`, because
  Google indexes mobile first and would store the notice rather than the page. The `VIEWPORT_GATED`
  constant in `src/app/layout.tsx` comes out in the same commit and indexing returns.
- The **SEBI Research Analyst registration number** is a braced placeholder. An invented one that
  looks plausible is the worst string that could ship on this site.
- The **ticker figures** are the prototype's staged set and carry no attribution line yet.
- The **hero media pane** and the toolkit's tile wells are labelled surfaces waiting for real
  interface captures.
- **`/edge`, `/stocks`, `/decode`, `/manifesto`, `/login` and `/start` do not exist.** The links are
  in place and go nowhere yet.
- Copy that is not taken from the brief's locked library is marked **`NEEDS SIGN-OFF`** at the
  constant that holds it.

---

## Project layout

| Path | What it is |
|---|---|
| `src/app/` | Routes. `page.tsx` composes the homepage; `layout.tsx` is a server component; `dev/` 404s in production |
| `src/components/site/` | The page itself, section by section |
| `src/components/ui/` | Ported design-system components, plus generated icons and brand marks |
| `src/components/motion/` | `Reveal` and `SplitWords` (GSAP), `FadeIn` (Motion). The only ways content enters |
| `src/components/three/` | The R3F canvas wrapper and the post-processing chain |
| `src/components/providers/` | Client providers, mounted once in the layout |
| `src/design-system/` | The Figma mirror: generated tokens, our extensions, site-only values |
| `src/lib/` | GSAP, scroll control, reduced motion, media queries, env, flags, and every customer-facing string |
| `src/store/` | Zustand, for state that crosses the DOM and R3F boundary |
| `src/styles/` | `globals.css`, the only global stylesheet |
| `scripts/` | The generators and the checkers, plus the bull still capture |
| `public/` | Brand SVGs, generated icons, video, textures, and the bull model |
| `docs/` | DECISIONS · DESIGN-SYSTEM · MOTION · SURFACES. Start at `docs/README.md` |

Imports are aliased: `@/*` resolves to `src/*`.

---

## Read this before you build

**`CLAUDE.md` is the rule layer** and it is the first thing to read. It carries what the brief binds,
the copy and compliance locks, which animation library owns which concern, the surface construction
rules, and the performance budget. It is written for anyone working in this repo, not only for an
assistant.

Then, per topic:

| Document | Covers |
|---|---|
| `docs/DESIGN-SYSTEM.md` | The Figma mirror, the sync procedure, how to extend it |
| `docs/SURFACES.md` | The construction language: material, strokes, elevation, glass, geometry |
| `docs/MOTION.md` | The motion vocabulary, the numbers, and what was deliberately discarded |
| `docs/DECISIONS.md` | The rulings, numbered, with the reasoning kept |

### The brief is not in this repository

`docs/00-brief/`, `docs/01-inspiration/`, `docs/02-product-context/` and `reference/` are gitignored
and were removed from history before this repository was made public.

If they are not on your disk, **ask for them before writing anything a visitor will read.** The
lexicon and the SEBI Research Analyst perimeter are exact, and an approximation of a compliance rail
is worse than no rule at all.

---

## The design system is a mirror

`src/design-system/tokens/` is generated from the live Figma file and is never hand-edited. Three
buckets, and a value's bucket is readable from its import path:

| Bucket | Means |
|---|---|
| `tokens/` | Mirrored from Figma. Editing it by hand is always a bug |
| `extensions/` | Ours, because Figma has no answer yet. Dated, with a reason |
| `marketing/` | Right for a landing page, wrong for a product surface |

Every mirrored custom property carries the `--ds-` prefix, which keeps the whole system clear of
Tailwind's `--color-*`, `--radius-*`, `--text-*`, `--shadow-*` and `--ease-*` namespaces. It also
means provenance is readable at the point of use: `var(--ds-bg-surface)` came from Figma and may
never be invented, `var(--page-ground)` is ours.

Regenerate with `npm run ds:build`. `npm run ds:verify` regenerates and then fails if the tree moved,
which is how a hand edit to a generated file gets caught before it is lost.

---

## Stack, and who owns what

The division of labour matters more than the list. Two libraries animating the same element's
transform is the failure this layout exists to prevent.

| Concern | Owner | Entry point |
|---|---|---|
| Framework | Next.js 16, App Router, Turbopack | `src/app/` |
| Styling | Tailwind CSS v4 | `src/styles/globals.css` |
| Scroll choreography: pinning, scrubbing, timelines | GSAP + ScrollTrigger | `@/lib/gsap` |
| Scroll reveals | GSAP, through one primitive | `components/motion/reveal` |
| Smooth scroll transport | Lenis | `providers/lenis-provider` |
| Moving, stopping and resuming the page | ours, over Lenis | `@/lib/scroll` |
| Mount entrance and hover | Motion | `components/motion/fade-in` |
| Chrome that answers an input | CSS transitions | `--motion-chrome` |
| Durations, easing, distances, budgets | ours | `design-system/extensions/motion.ts` |
| 3D scenes | React Three Fiber + three | `components/three/scene-canvas` |
| 3D helpers | drei | imported directly |
| State crossing DOM and R3F | Zustand | `store/use-app-store` |
| Hosting | Vercel | |

Two rules that are easy to break once and expensive to find later: **import GSAP only from
`@/lib/gsap`**, or a bundler split gives you a second plugin instance; and **wrap every 3D scene in
`next/dynamic` with `ssr: false` at the call site**, or three lands in the initial bundle for routes
that never render it.

`@react-three/postprocessing` and `@react-three/rapier` are installed and proven but not used by
anything on the page. `CLAUDE.md` has the removal commands for anything that does not ship.

### Dev routes

Three, all of which 404 in production, and `rm -rf src/app/dev` removes them whole:

| Route | What it is for |
|---|---|
| `/dev/design-system` | The living token reference: colour, type, icons, components |
| `/dev/stack` | Exercises every animation and 3D library at once |
| `/dev/bull-still` | The harness `scripts/capture-bull-still.mjs` screenshots |

---

## Commands

```bash
npm run dev              # dev server on http://localhost:4100
npm run build            # production build
npm run start            # serve the production build on :4100
```

### Checks

```bash
npm run typecheck        # tsc --noEmit
npm run lint             # eslint, flat config, generated output excluded
npm run check:copy       # the lexicon rules over customer-facing strings
npm run check:motion     # fails if motion.css drifted from motion.ts
npm run check:surfaces   # raw colour, uncomposited blur, click-eating overlays, layout transitions
npm run verify           # all of the above, then the build. Run before every commit
```

### Design system

```bash
npm run ds:build         # regenerate tokens, icons, brand marks, favicons, share card
npm run ds:verify        # regenerate, then fail if the tree moved
npm run ds:contrast      # WCAG report for every pairing the site actually uses
```

Not part of `ds:build`, because it needs a dev server and a real browser. Run it by hand, and only
when the bull scene's lighting or material actually changes:

```bash
npm run dev
node scripts/capture-bull-still.mjs   # re-renders public/models/bull-still.webp
```

### What the checks are guarding

| Check | Catches |
|---|---|
| `check:copy` | Em-dashes, emoji, exclamation marks, banned words, superlatives with no number, "Rs" instead of ₹. These are compliance-adjacent, not style |
| `check:motion` | A duration or curve edited in the CSS and not in the TypeScript, or the reverse |
| `check:surfaces` | A raw hex in a component, a backdrop blur with no compositing layer, an overlay that eats clicks, a transition on a layout property |
| `ds:verify` | A generated file edited by hand, which is a change about to be lost |
| `ds:contrast` | A text and background pairing that fails WCAG on the surface it is actually drawn on |

`check:copy` reports **warnings as well as errors**, and some warnings are expected rather than
pending. "Alpha" is banned as a returns promise and fine as a release stage; "recommendation" is
banned unless the sentence renounces it, which the compliance block does. Warnings are for a person
to confirm. Errors stop the build.

### CI

`verify`, `ds:verify` and `ds:contrast` run on every pull request and every push to `main`
(`.github/workflows/verify.yml`). **`verify` is a required check.**

`ds:verify` is the one that matters most there: the generators are deterministic, so a dirty tree
after a rebuild means a generated file was edited by hand and that change is about to be lost.

---

## Deploying

Vercel, connected to the repository. Every pull request gets a preview deployment and every push to
`main` goes to production.

Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables for production so canonical URLs
and the Open Graph image resolve against the real origin. Preview deployments resolve it from the
deployment URL on their own.

---

## Working in this repo

1. Read `CLAUDE.md`.
2. Ask for the brief if it is not on your disk.
3. Branch off `main`.
4. Build, then run `npm run verify` before you commit.
5. Open a pull request and let CI confirm it.

Two habits worth keeping, because both failures are silent: take colour, type and spacing from the
design system rather than typing a value, and take any customer-facing string from the copy library
rather than writing one. When a string genuinely has to be new, mark it `NEEDS SIGN-OFF` at the
constant so it can be found again.
