# Tradl AI · Alpha Launch Website

Marketing site for Tradl AI's alpha launch.

The app has **no UI yet, deliberately** — `/` renders an empty `<main>`. The stack underneath it is
complete and proven working, so design can start on a blank page without any plumbing left to do.

```bash
npm install
npm run dev     # http://localhost:4100
```

Read **`CLAUDE.md`** before building. It carries the rule layer: what the brief binds, the copy and
compliance locks, which animation library owns which concern, and the performance budget.

---

## What is here

| Path | What it is |
|---|---|
| `src/` | The Next.js app. Empty homepage, full provider and primitive layer. |
| `docs/` | The brief. **Binding.** Start at `docs/README.md`. |
| `reference/` | Prior artefacts: Claude Design prototypes, screenshots, the Figma token export. Not binding. |

`docs/` and `reference/` were copied on 30 Aug 2026 from
`~/Downloads/Personal/Tradl AI/New Website - Alpha Launch`, which is left untouched as the archival
original. `docs/README.md` records exactly what moved, what was renamed, and what was dropped as a
duplicate.

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS v4, driven by the Figma-exported design tokens |
| 3D | three.js, React Three Fiber, drei |
| Post-processing | `@react-three/postprocessing` — bloom, grain, aberration, vignette |
| Physics | `@react-three/rapier` |
| Scroll choreography | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Micro-interaction | Motion |
| State | Zustand |
| Hosting | Vercel |

Everything on that list was installed together so the versions could be proven to interoperate on
React 19, not merely to appear in `package.json`. Anything that does not ship comes out before
delivery — `CLAUDE.md` has the removal commands.

## Verifying the stack

`/dev/stack` renders one page that exercises every library at once: smooth scroll, a pinned section
that scrubs horizontally, a spinning knot and a bouncing ball under bloom and film grain, and live
readouts of shared state written from inside the render loop.

It **404s in production** and is not part of the site. Delete it when the real pages exist:

```bash
rm -rf src/app/dev
```

## Commands

```bash
npm run dev        # dev server on :4100
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run verify     # typecheck + build. Run before every commit.
```
