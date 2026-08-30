# Tradl AI · Alpha Launch Website

Marketing site for Tradl AI's alpha launch. Next.js App Router, React 19, TypeScript, Tailwind v4,
on a generated mirror of the product's Figma design system.

```bash
npm install
npm run dev     # http://localhost:4100
```

Read **`CLAUDE.md`** before building anything. It carries the rule layer: what the brief binds, the
copy and compliance locks, which animation library owns which concern, and the performance budget.

---

## What is on the page

`/` is the homepage, top to bottom:

| Section | What it does |
|---|---|
| Announcement bar | The company line. Scrolls away and does not come back. |
| Nav + ticker | A floating pane that sticks; the market strip scrolls under it. |
| Hero | Doctrine badge, statement headline, single-field start, the spark CTA, and a demo frame the scroll carries to the centre of the screen. |
| Toolkit | Section opener, a three-panel lifecycle band, and a scroll-driven tool explorer with a stacked preview deck. |
| Sneak peek | Four product windows on one carriage, advancing themselves once the section is on screen. The progress rail is the clock and the navigation. |
| Founders | Two quotes at equal weight, glass cards over an aura. |
| Engineering | A bull on a sticky stage, turned one revolution by the scroll and by however far the reader drags it, with the six construction rules arriving around it as glass panes. Under 1024px it is a painted still and a two-up stack, with no WebGL at all. |
| FAQ | Two columns, native `<details>`, smooth disclosure, no JavaScript. |
| Close | Statement scene, the page's one warm beat, email capture, proof chips. |
| Footer | Full lockup, four columns, the compliance block. |

**It is not finished.** Everything below is a deliberate placeholder, marked in code where it sits:

- On phones and tablets, in either orientation, the site is one page saying to come back on a laptop.
  The narrow layouts underneath it are built and working; what is missing is a design pass over the
  whole page at that width. The gate is `src/components/site/viewport-gate.tsx` plus the tablet test
  in `src/lib/device.ts`, and it comes out in one commit. While it stands the site is `noindex`,
  because Google indexes mobile-first and would store the notice rather than the page; the
  `VIEWPORT_GATED` constant in `app/layout.tsx` comes out in the same commit and indexing returns.

- The SEBI Research Analyst registration number is a braced placeholder. An invented one that looks
  plausible is the worst string that could ship on this site.
- The ticker figures are the prototype's staged set and carry no attribution line yet.
- The demo frame and the four sneak peek windows are labelled wells waiting for real recordings.
- `/edge`, `/stocks`, `/decode`, `/manifesto`, `/login` and `/start` do not exist.
- Copy that is not from the brief's locked library is marked `NEEDS SIGN-OFF` at the constant.

## What is here

| Path | What it is |
|---|---|
| `src/app/` | Routes. `page.tsx` composes the homepage; `dev/` 404s in production. |
| `src/components/site/` | The page itself, section by section. |
| `src/components/ui/` | Ported design-system components, generated icons and brand marks. |
| `src/design-system/` | The Figma mirror: generated tokens, our extensions, site-only values. |
| `src/lib/` | GSAP, scroll control, reduced motion, media queries, env, and every customer-facing string. |
| `scripts/` | The generators and the checkers, plus the bull still capture. |
| `public/models/` | The bull, reduced from 57.4MB to 968KB, and the cut-out still it paints first. |
| `docs/` | DECISIONS · DESIGN-SYSTEM · MOTION · SURFACES. Start at `docs/README.md`. |

**The brief is not in this repository.** `docs/00-brief/`, `docs/01-inspiration/`,
`docs/02-product-context/` and `reference/` are gitignored and were removed from history before this
repository was made public. If they are not on your disk, ask for them before writing anything
customer-facing: the lexicon and the SEBI perimeter are exact, and an approximation of a compliance
rail is worse than no rule at all.

## The design system is a mirror

`src/design-system/tokens/` is generated from the live Figma file and is never hand-edited. Three
buckets, and a value's bucket is readable from its import path:

| Bucket | Means |
|---|---|
| `tokens/` | Mirrored from Figma. Editing it by hand is always a bug. |
| `extensions/` | Ours, because Figma has no answer yet. Dated, with a reason. |
| `marketing/` | Right for a landing page, wrong for a product surface. |

Every mirrored custom property carries the `--ds-` prefix, which keeps the whole system clear of
Tailwind's `--color-*`, `--radius-*`, `--text-*` and `--shadow-*` namespaces. `docs/DESIGN-SYSTEM.md`
has the handbook and the sync procedure; `docs/SURFACES.md` has the construction language.

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4, driven by the Figma-exported design tokens |
| Scroll choreography | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Micro-interaction | Motion |
| State | Zustand |
| 3D | three.js, React Three Fiber, drei |
| Post-processing | `@react-three/postprocessing` |
| Physics | `@react-three/rapier` |
| Hosting | Vercel |

three, React Three Fiber and drei ship: the engineering section renders the bull on them. Post-
processing and rapier are still installed and proven but unused, and anything that does not ship
comes out before delivery; `CLAUDE.md` has the removal commands.

Three dev routes, all of them 404 in production, and `rm -rf src/app/dev` removes them whole:
`/dev/design-system` is the living token reference, `/dev/stack` exercises every library at once, and
`/dev/bull-still` is the harness `scripts/capture-bull-still.mjs` screenshots.

## Commands

```bash
npm run dev             # dev server on :4100
npm run typecheck       # tsc --noEmit
npm run lint            # eslint, flat config
npm run check:copy      # the lexicon rules over customer-facing strings
npm run check:motion    # fails if motion.css drifted from motion.ts
npm run check:surfaces  # raw colour, uncomposited blur, layout transitions
npm run build           # production build
npm run verify          # all of the above. Run before every commit.

npm run ds:build        # regenerate tokens, icons, brand marks, favicons, share card
npm run ds:verify       # regenerate, then fail if the tree moved
npm run ds:contrast     # WCAG report for every pairing the site actually uses

# Not part of ds:build: it needs a dev server and a browser, so run it by hand,
# and only when the bull scene's lighting or material actually changes.
npm run dev
node scripts/capture-bull-still.mjs   # re-render public/models/bull-still.webp
```

`verify`, `ds:verify` and `ds:contrast` run in CI on every pull request and every push to `main`.
`verify` is a required check.

`check:copy` reports warnings as well as errors, and some are expected rather than pending: "alpha"
is banned as a returns promise and fine as a release stage, and "recommendation" is banned unless the
sentence renounces it, which the compliance block does. Warnings are for a human to confirm; errors
stop the build.
