# Motion

How this site moves, what owns each kind of movement, and the numbers.

Reverse-engineered from a reference agency site (dialedweb.com, read from its live bundle on
30 Aug 2026), then amended for this repo: for a dense, numbers-forward, compliance-bound site with a
2.0s LCP budget, not a portfolio. Section 9 records what was taken, what was changed and what was
thrown out, because the discarded half is the part a future session will otherwise re-derive.

The rules that must be in context every session live in `CLAUDE.md`. Everything else is here.

- [The two layers](#the-two-layers)
- [The vocabulary](#the-vocabulary)
- [Transport: Lenis](#transport-lenis)
- [Reveals: GSAP](#reveals-gsap)
- [Chrome](#chrome)
- [Scroll control](#scroll-control)
- [Reduced motion](#reduced-motion)
- [The budget](#the-budget)
- [Checklist](#checklist)
- [What was taken, changed and discarded](#what-was-taken-changed-and-discarded)

---

## The two layers

The feel people describe as "buttery" is two independent systems. Roughly half of it is each, and
they are tuned separately.

| Layer | Owner | Job | Entry point |
|---|---|---|---|
| **Transport** | Lenis | Decouples the viewport from the input device. This is the weight. | `providers/lenis-provider` |
| **Reveals** | GSAP + ScrollTrigger | Content arrives as it enters. This is the choreography. | `components/motion/reveal` |

Two more, deliberately narrow:

| Concern | Owner | Entry point |
|---|---|---|
| Mount entrance, hover, page transition | Motion | `components/motion/fade-in` |
| Chrome that answers an input | CSS transitions | `--motion-chrome`, `--motion-ease` |

**No element is ever animated by two of these.** That is the whole reason the split is written down.
A nav bar transitioned in CSS and tweened in GSAP will fight on the frame they overlap, and the bug
looks like a rendering glitch rather than like a conflict.

## The vocabulary

Every number lives in `src/design-system/extensions/motion.ts`. Import it; do not retype a duration.

| Name | Value | For |
|---|---|---|
| `EASE_POINTS` | `[0.22, 1, 0.36, 1]` | The house curve, as control points |
| `EASE` | `"tradl-out"` | The GSAP name, registered from those points in `@/lib/gsap` |
| `DURATION.chrome` | 0.3s | Nav, chips, hover, docks |
| `DURATION.instrument` | 0.5s | The default content reveal |
| `DURATION.statement` | 0.8s | Full-bleed typographic scenes |
| `REVEAL.instrument` | rise 12%, 0.5s, stagger 0.06, `top 88%` | Dense modules, ledgers, cards |
| `REVEAL.statement` | rise 25%, 0.8s, stagger 0.09, `top 85%` | Section openers and closes |
| `SCROLL_BUDGET` | 40 triggers, 4 scrubbed | Per page |

One curve, three consumers. GSAP registers it through CustomEase, Motion takes the points as a tuple,
CSS mirrors it into `--motion-ease` in `motion.css`. The CSS copy is hand-kept and
`npm run check:motion` fails the build if it drifts from the TypeScript.

`motion.ts` is an **extension**, not a token: Figma was not read for motion variables. If the design
system defines motion later, the Figma values win and this file is deleted. See
`src/design-system/extensions/README.md`.

## Transport: Lenis

Mounted once, app-wide, in `LenisProvider`. Configured with five deviations from stock and nothing
else. Every option is commented at the call site; the reasoning that does not fit there is here.

### The one dial

`lerp: 0.12`.

Lenis does exponential damping, not a fixed-duration tween: each frame closes
`1 - e^(-lerp * 60 * dt)` of the distance still to travel. Because the factor is derived from
`deltaTime`, the settle time is identical at 60Hz and 120Hz. Do not reimplement this as
`value += (target - value) * 0.1`, which runs twice as fast on a 120Hz display and is the usual way
people get this wrong.

Time constant is `1 / (lerp * 60)`; a throw is done at about `5.3` time constants.

| `lerp` | Time constant | Settle | Reads as |
|--:|--:|--:|---|
| 0.20 | 83ms | 0.44s | Barely smoothed. Docs, dashboards. |
| **0.12** | **139ms** | **0.74s** | **This site.** Weight without drag. |
| 0.10 | 167ms | 0.88s | The agency default. Noticeably floaty. |
| 0.075 | 222ms | 1.18s | Cinematic, and unresponsive on a long page. |
| 0.05 | 333ms | 1.77s | Visitors think the page is broken. |

While you are scrolling continuously the rendered position trails the target by about
`delta / (1 - e^(-lerp * 60 * dt))`, which at 60Hz is roughly `8.8 x delta` at 0.12 against
`10.5 x delta` at 0.10. A trackpad emits 8 to 16px per event, so the page trails the fingers by
about 70 to 140px rather than 85 to 170px. That gap is what reads as magnetic. It is also what reads
as lag when the thing under the fingers is a table of numbers someone is trying to read, which is
why this site sits above the agency default rather than on it. See `docs/DECISIONS.md` 005.

Never set `duration`. It switches Lenis into fixed-time mode, where every throw takes the same
wall-clock time regardless of distance, which feels mechanical, and it silently disables `lerp`.

### The other four

- `autoRaf: false`, because GSAP's ticker steps Lenis. One clock. Also the library default in 1.3,
  stated rather than inherited because it is the assumption the ticker integration rests on.
- `anchors: true`, so a plain `<a href="#section">` goes through the virtual scroll instead of
  jumping past it.
- `stopInertiaOnNavigate: true`, so a route change does not land mid-glide on the new page.
- `allowNestedScroll: true`, so a gesture over an overflowing panel or a scrollable table scrolls
  that panel and not the page.

Touch stays native (`syncTouch: false`). iOS momentum and rubber-banding are already right, and
routing them through Lenis makes a phone feel laggy. Desktop feels engineered, mobile feels like the
phone, and that is correct rather than an inconsistency to fix.

### Ticker integration

`gsap.ticker` drives `lenis.raf`, `lenis.on("scroll")` drives `ScrollTrigger.update`, and
`lagSmoothing(0)` stops the ticker's own catch-up from fighting the damping. Without this the two
loops land on different frames and scrubbed elements show sub-pixel jitter.

No `scrollerProxy` is needed. Lenis drives the real window scroll position rather than transforming a
wrapper, so ScrollTrigger's default scroller already reads the right value.

### Refreshes

Every trigger's start and end are pixel measurements taken when it is created. Two things invalidate
them and both are handled in the provider:

- **`document.fonts.ready`.** The type scale is fluid `clamp()` on a font loaded with `display: swap`.
  The moment Inter lands, every headline changes height and every measurement below it is stale.
- **Route change.** `useGSAP` reverts the outgoing page's triggers and the incoming page creates its
  own, but the cached page height belongs to the page that just left.

## Reveals: GSAP

`<Reveal>` is the only way content enters on this site.

```tsx
<Reveal as="p">…</Reveal>                        {/* instrument, the default */}
<Reveal register="statement" as="section">…</Reveal>
<Reveal stagger className="grid gap-3">…</Reveal>  {/* one trigger, six children */}
<SplitWords as="h2" text="…" />                   {/* statement beat, word masks */}
```

The rules the components enforce, and why each one is a rule:

**One trigger per group.** `stagger` animates the container's direct children off a single
ScrollTrigger, so a twelve-card grid costs one trigger and not twelve.

**`once: true`, always.** The trigger destroys itself after firing. Cheaper than leaving it alive,
and it is the behaviour the design wants: scrolling back up leaves the page still. A page that
re-animates on the way back cannot be read twice.

**`yPercent`, never `y`.** The type scale is fluid `clamp()`. A 68px statement headline and a 12px
label have to travel proportionally, or one of them is wrong at every viewport except the one it was
tuned on.

**Pre-hidden in CSS, not in JavaScript.** `[data-reveal]` starts at `opacity: 0` in `globals.css`,
inside `@media (scripting: enabled)`. Setting the start state in JS means the element paints visible
for one frame and then blinks out. The media query is used instead of a class an inline script adds
because the failure mode is right: a browser too old for it shows the content and still animates,
whereas a script-gated class whose script never ran leaves the page blank forever.

**`will-change` released on complete.** Along with the transform itself, via `clearProps`. A
permanent `will-change` pins a compositor layer per element, and a leftover transform makes the
element a containing block for anything `position: fixed` inside it.

**Never above the fold.** Doc 04 §5 requires the LCP element painted in the first frame as a finished
static. Everything here starts at `opacity: 0`. Development builds warn when a `<Reveal>` mounts in
the top 90% of the viewport; treat the warning as an error.

**Words, not characters, in `SplitWords`.** The reference site splits per character: 148 wrappers on
one page, each holding a compositor layer, staggered so fast the effect stops reading, and the text
destroyed for anyone using a screen reader or selecting to copy. Word masks carry the same idea at a
twentieth of the cost. The whole string is announced once from `aria-label` and every generated span
is `aria-hidden`. Roughly one per page, statement register only.

### Scrubbing

`scrub` is for parallax and for pinned sections, and it is capped at 4 per page. A scrubbed trigger
recalculates on every scroll frame for the element's whole pass through the viewport; a one-shot
reveal fires once and then removes itself. If a page feels busy, this ratio is usually why.

Pinned sections use `useGSAP` with a `scope` and `invalidateOnRefresh: true`. See
`src/app/dev/stack/pinned-panel.tsx` for the working example.

## Chrome

Anything that answers an input directly, a nav bar changing height, a chip lighting up, a dock
sliding out, is a CSS transition on `--motion-chrome` and `--motion-ease`. Not GSAP, not Motion.

The rule underneath the numbers: **chrome reacts faster than content reveals.** 0.3s against 0.5s to
0.8s. Chrome that takes as long as a reveal feels like the interface is thinking.

## Scroll control

Everything that moves, stops or resumes the page goes through `@/lib/scroll`. No component reads the
Lenis instance directly.

```ts
scrollTo(target, options)   // string selector, element, or pixel offset
lockScroll()                // on overlay open
unlockScroll()              // on overlay close
```

`scrollTo` falls back to `window.scrollTo` and the lock falls back to a class on `<html>` when there
is no instance, so a call site never has to ask whether smooth scroll is running. It is a
module-level singleton rather than context because some callers live inside `<Canvas>`, which is a
separate React reconciler that context does not cross.

The lock is **reference counted**. Overlays nest: a dialog opens a popover, the popover closes, and a
naive implementation hands scrolling back to a page that is still covered. Only the outermost
release unlocks. Every `lockScroll()` needs exactly one `unlockScroll()`, which in practice means an
effect cleanup.

`overflow: hidden` on `<body>` is the usual approach and is wrong here: Lenis keeps scrolling its
virtual position underneath it, and on iOS it loses the visitor's place.

`element.scrollIntoView()` and `scroll-behavior: smooth` both fight the virtual scroll. There are no
call sites for either, and there should never be.

**Nested scrollers.** `allowNestedScroll: true` detects an overflowing element under the pointer and
hands the gesture back to it. `data-lenis-prevent` is the escape hatch for what detection cannot see
into, which in practice means iframes and third-party embeds. Put it on every one of those.

## Reduced motion

Three independent layers, because any one of them can be the one that fails.

1. **Lenis** honours it natively (`respectReducedMotion`, on by default in 1.3): interpolation is
   forced to 1, so scroll tracks the input device with no smoothing, and programmatic scrolls become
   instant. The instance is still constructed, which is what lets `@/lib/scroll` work unconditionally.
2. **`<Reveal>` and `<SplitWords>`** set the final state directly and create no tween and no trigger.
   The global CSS floor cannot do this job: it caps transition and animation durations, and GSAP
   writes inline styles rather than using either.
3. **`globals.css`** caps every CSS transition and animation, and un-hides `[data-reveal]` as a
   backstop in case the JS guard ever fails to run.

`SceneCanvas` does not mount WebGL at all. Auto-advancing components render as static tabbed states.

## The budget

Doc 04 §5: LCP under 2.0s on a mid-range Android on 4G. The whole motion stack is in tension with it
and has to keep earning its bytes.

| Limit | Value | Enforced by |
|---|---|---|
| ScrollTriggers per page | 40 | dev console warning in `<Reveal>` |
| Scrubbed triggers per page | 4 | same |
| Statement register | ~30% of scroll length | review, doc 04 §1 |
| Reveals above the fold | 0 | dev console warning in `<Reveal>` |
| `SplitWords` per page | ~1 | review |

## Checklist

Before a page is called done:

- [ ] Nothing above the fold is wrapped in `<Reveal>`; the first screen paints as a finished static
- [ ] No console warning from `[motion]` in development
- [ ] Every duration, ease and distance came from `motion.ts`
- [ ] Reveals use `yPercent`; no pixel offsets anywhere
- [ ] `data-lenis-prevent` on every iframe and third-party embed
- [ ] Every overlay pairs `lockScroll()` with `unlockScroll()` in the same effect
- [ ] Esc dismisses every overlay (doc 04 §7)
- [ ] Every anchor is a plain `href="#id"` or goes through `scrollTo`
- [ ] Reduced motion: content readable, nothing moves, no WebGL
- [ ] Settle time identical at 60Hz and 120Hz
- [ ] `npm run verify` passes

## What was taken, changed and discarded

The source was a reverse-engineered spec of an agency portfolio site. Recorded here so nobody
re-derives the discards.

### Taken as written

Exponential damping over fixed duration. `yPercent` over pixels. One trigger point as the default.
Play once, never reverse. Scrub kept to a small fraction of triggers. Pre-hide in CSS. Release
`will-change` on complete. `data-lenis-prevent` on nested scrollers. Native touch.

### Changed

| Source said | We do | Why |
|---|---|---|
| `lerp: 0.1` | `lerp: 0.12` | Dense numeric content. 100px of trail under a ledger reads as lag. |
| `start: "top 95%"` | `top 88%` / `top 85%` | Tuned for full-bleed sections. Our modules are small; 95% starts them before they are visible. |
| Split per character | Split per word, masked | 148 wrappers and 148 layers per page, and it destroys the text for assistive tech and for copy. |
| `<ReactLenis root>` in a client root layout | Server layout, client provider subtree | `layout.tsx` owns metadata and JSON-LD and stays a server component. |
| A `<noscript>` opacity override | `@media (scripting: enabled)` | Same result, no extra markup, and it also covers a script that loaded but threw. |
| `toggleActions` left at GSAP's default | `once: true` | Same visible behaviour, and the trigger destroys itself instead of staying alive for the session. |
| Its own ease and duration tallies | One curve, three durations | Seven eases and six durations is a description of a site that grew, not a system. |

### Discarded

- **Its Lenis defaults table (§3.4).** Written against an older version. Against the installed 1.3.26
  it is wrong on three counts: `autoRaf` defaults to `false` and not `true`, there is no
  `touchInertiaMultiplier` (it is `touchInertiaExponent`, default 1.7), and `respectReducedMotion`
  now exists and defaults to `true`. Read the option docs in `node_modules/lenis/dist/lenis.d.ts`
  rather than any table, including this one.
- **Manual `data-lenis-prevent` on every nested scroller.** `allowNestedScroll: true` does it. The
  attribute stays for iframes and embeds.
- **Manual `lenis.scrollTo` for in-page anchors.** `anchors: true` does it.
- **Its nav bar CSS.** Reference-specific values, and a blurred pill is a design decision, not a
  motion one. The rule underneath it, chrome faster than content, survives as `DURATION.chrome`.
- **Raising `wheelMultiplier`.** Overshoot on a page people are reading for numbers.
- **Its two hero parallax scrubs.** The hero is the LCP element. It does not move.
- **"Zero options, six lines."** True of the reference and not a goal. Six of this site's Lenis
  options exist because of things the reference site does not have: an App Router, a nested
  scroller, an accessibility floor and an LCP budget.
