# Decisions

Append-only. One section per decision, newest first, numbered in the order taken. A decision is
recorded here when it constrains future work and the reasoning is not recoverable from the code.

Supersede rather than rewrite: if a decision changes, add a new entry and mark the old one
`superseded by NNN`. The record of what we used to think is the useful part.

**Scaling:** split into `docs/decisions/YYYY.md` when this passes ~50 entries. Not before, because
one greppable file is worth more than tidy folders until then.

---

## 009 · Phones and tablets get a notice instead of the site, and that is temporary

`31 Aug 2026` · Nilesh · **accepted** · expected to be reverted

Every section has a narrow arrangement and they work: the toolkit stacks, the peek carriage becomes
tabbed states, the engineering scene falls back to a painted still. What does not exist is a design
pass over the whole page at phone and tablet width, and shipping the alpha with an unreviewed one is
worse than shipping a note that says come back on a laptop. So on a phone or a tablet the document is
one screen and nothing else.

**Width alone does not identify a tablet, and the first version of this got that wrong.** It gated on
`max-width: 1023.98px` and every tablet in landscape walked straight through: an iPad is 1024, 1180
or 1366 points wide on its side, which is also a laptop. Three conditions, any of which gates:

| Condition | Catches |
|---|---|
| `max-width: 1023.98px` | phones, and tablets held in portrait |
| `(hover: none) and (pointer: coarse)` | any touch-primary device at any width, so a tablet on its side |
| `html[data-narrow]` | an iPad driven by a trackpad, which CSS cannot see at all |

The third exists because the second has one blind spot and it is not a rare one. An iPad with a Magic
Keyboard reports `pointer: fine` and `hover: hover`, exactly as a laptop does, because at that moment
it is being driven exactly as a laptop is; and since iPadOS 13 Safari there also reports itself as a
Mac, so the user agent cannot be asked either. What it cannot hide is the touchscreen, and a Mac has
none, so "claims to be a Mac and reports more than one touch point" is the test. It only ever adds an
attribute: a Mac reports zero touch points, and a Windows laptop with a touchscreen fails both the Mac
test and the tablet user-agent match. Verified against both of those, and against a Windows machine
reporting ten touch points, which still gets the site.

**Three things on it: an icon, a line, a line under it.** Somebody who cannot use the site does not
want a paragraph about why. An earlier pass carried the wordmark, an eyebrow label, a fading rule and
a warm beat, which is a section opener rather than a notice.

**CSS, not React, and `display: none`, not an overlay.** A `useMediaQuery` branch has to guess on the
server and whichever way it guesses is wrong for half the visitors: guess narrow and every desktop
ships the notice as its first paint, guess wide and every phone downloads the whole homepage before
replacing it. A media query answers at parse time and answers correctly for both. And the rest of the
page is taken out of the box tree rather than covered, because a fixed pane leaves the entire site in
the accessibility tree, so a screen reader on a phone would read a homepage that is not on screen,
underneath a message saying it is not available.

**Desktop is untouched, by construction.** `.viewport-gate` is `display: none` at rest and every
other rule sits inside the `max-width` query, so above the breakpoint the element contributes no box,
no stacking context and no layout. The breakpoint pair is 1023.98 / 1024 rather than 1023 / 1024,
because a viewport can be a fractional CSS pixel on a scaled display and the integer pair leaves a
gap that matches neither rule.

**The cost, stated plainly: this is bad for search, so the site is noindex while it stands.** Google
indexes mobile-first, so a crawler rendering at phone width sees a page with no content on it, and
being in an index as an empty page is a worse starting position than not being there at all. So
`robots` in `app/layout.tsx` now takes two gates rather than one: the environment, as before, and
`VIEWPORT_GATED`, a constant in the same file. Delete that constant in the same commit that deletes
the notice and indexing turns itself back on. This is the reason the entry exists rather than a
commit message: the notice is easy to remove and the robots line is easy to leave behind.

**Rejected:** a fixed overlay over a live page (accessibility, and it keeps hydrating and observing
behind a pane nobody can see); a React branch on a media query (a wrong first paint for half of all
visitors); raising the width breakpoint until it covered landscape tablets, which would have taken
every 1366x768 laptop with it; `(any-pointer: coarse)` as the touch test, which is true of any laptop
with a touchscreen; shipping the unreviewed narrow layouts as they are.

---

## 008 · The bull is a re-materialised 98k-triangle mesh, turned by hand, and mobile never sees it

`31 Aug 2026` · Nilesh · **accepted**

The engineering section stands a 3D bull at the centre of a sticky stage while six construction rules
assemble around it on scroll. Four decisions inside that are not recoverable from the code and
constrain anything else 3D that lands on this site.

**The asset is reduced by two orders of magnitude, offline, and the recipe is recorded.** The
supplied `green bull 3d model.glb` was 57.4MB and 1,958,349 triangles, from a generative modeller
that ships raw float32 geometry. That is not a marketing-page asset at any bitrate. Reduced with
gltf-transform 4.4.2:

```
weld     in.glb  b1.glb
simplify b1.glb  b2.glb  --ratio 0.05 --error 0.0015
resize   b2.glb  b3.glb  --width 1024 --height 1024
webp     b3.glb  b4.glb  --quality 82
meshopt  b4.glb  out.glb --level medium
```

968KB and 97,913 triangles, which holds the silhouette, the horns and the muscle break at every size
this section renders at. **Meshopt and not Draco**, because drei's `useGLTF` defaults its Draco
decoder to a Google CDN and meshopt's ships inside three-stdlib: same compression, no third-party
request. The source file is not in this repository, which is why the recipe is here.

**The geometry is theirs, the material is ours.** The model arrives with a base colour that has its
lighting baked in, in a duller and yellower green than `accent/secondary`. Rendered as authored it
reads as an imported asset sitting on the page rather than as part of it. So the base colour map is
dropped, the normal and roughness maps are kept because that is where the anatomy lives, and the
surface is rebuilt as `grey/750` under an accent key, a cool fill, a deep back light and a fresnel
rim injected into the standard shader. All four colours are read from the mirrored tokens on the DOM
side and passed across the `<Canvas>` boundary as props, because three.js cannot read a custom
property and `npm run check:surfaces` is right to ban the hex that would otherwise appear.

**Below 768px there is no WebGL at all.** Doc 04 §5's binding constraint is a mid-range Android on
4G, and three plus drei plus a 968KB model is not a cost that device should pay for a turn it has no
room to see: six cards orbiting a bull at 390px is not a layout. The narrow arrangement is a 14KB
painted still above a single-column stack, and the still is a screenshot of the real scene at its
opening pose, captured by `scripts/capture-bull-still.mjs` against a dev-only route. Wide viewports
paint the same still first and swap to WebGL in one frame when the model arrives; they do not
cross-fade, because the still is at the opening pose and the canvas is at whatever pose the visitor
has already scrolled to, and fading between them shows two bulls at two angles.

**Two inputs turn it and they add.** Scroll carries it one full revolution across the track, which is
what the scrubbed timeline writes; a drag is an offset the visitor holds on top of that. The scene
sums the two, so neither writer has to know the other's value, and neither surface moves the other:
the pointer is captured for the length of a drag so turning the bull never scrolls the page, and the
timeline never writes the drag value so scrolling never undoes a pose set by hand. Horizontal only,
because a free tumble reaches poses that are upside down, edge-on and unlit with no way back but a
reload. `touch-action: pan-y` keeps vertical panning with the browser. Arrow keys do the same job at
15 degrees a press, per doc 04 §7.

**The rotation the model owes while it loads is spent, not written off.** This took two goes. Until
the model has downloaded the bull on screen is a photograph and cannot turn, so the timeline holds
the written angle at zero and records how far ahead it has got. The first version then discarded that
debt, measuring every later angle from wherever the timeline stood when the model landed. On a warm
load that is zero and costs nothing, which is exactly why it survived review. On a cold load over 4G
the model arrives about five and a half seconds in, by which time a reader is already a third of the
way down the track, and a third of the revolution had been deleted; scroll faster than that and the
whole revolution went, which is a bull that never turns at all. Reported as "it does not rotate the
first time, then it does after a refresh", and that is precisely the shape of a cache. The debt is
now tweened to zero over up to 1.1 seconds when the scene appears, so the canvas still arrives at the
pose the still was showing and then turns itself to where the page actually is.

**The angle tween is a `fromTo`, because `invalidateOnRefresh` re-reads start values.** That flag is
right for anything measured off the DOM and wrong for a plain number: a `to` re-reads `angle` as
whatever it currently is and silently re-bases the revolution from there. Refreshes are not rare and
on a cold load they are late, since `document.fonts.ready` fires one and a font still downloading
fires it after the reader is inside the section. Pinning the start at zero made a cold load's pose
match a warm one at the same scroll position to within measurement noise, where before it did not.

**The timeline measures its angle from the frame the scene goes live.** While the painted still is on
screen there is one fixed pose to look at, so an angle banked during that time is spent all at once
the instant WebGL appears, as a jump from the pose in the picture to wherever the page had scrolled
to. So the timeline re-zeroes until then, and the origin is captured on the `bullLive` transition
rather than left wherever the tween's own `onUpdate` last ran: those are not the same moment, and a
reload parked inside the section is exactly where they diverge, since it restores the offset, scrubs
to the middle of the travel, and then loads the model seconds later with no scroll in between. With
the poses guaranteed equal the hand-off can be a 240ms dissolve rather than a cut, which covers the
one difference left, that a WebP of a render is not the render.

**The six cards are glass, which costs two house rules.** They sit over a lit model, the one place on
this site where a backdrop blur has something real to diffuse, so above 1024 they take a menu-tier
blur over `bg/elevated`, Figma's own glass-pane fill, and hovering fades in an opaque backing so the
card being read stops being a window. That breaks the two-blurred-surfaces-per-viewport ceiling in
docs/SURFACES.md, scoped as tightly as it can be: never on the narrow layout, where the ground is
flat and a blur is an expensive no-op. And it breaks "hover moves the stroke, never the fill", which
here is the interaction rather than an oversight. `bg/elevated` is black at 60 per cent and not a
white overlay for a reason that is not aesthetic: `bg/surface` composites to the same pixel over the
page ground as the opaque state does, so a card built on it has no glass state to be in, and a fill
that darkens rather than lightens keeps body copy legible over a lit model.

**The still is cut out, and the script asserts it.** `omitBackground` removes the browser's own
default white backdrop and nothing else, so the explicit `background-color` globals.css sets on
`<body>` was painted and captured like any other pixel: the first version shipped with no alpha
channel at all, an opaque near-black square that punched a hole through the section's bloom for as
long as it was on screen. The fix is one stylesheet line in the capture; the reason it is worth a
paragraph is that the failure is invisible in review, because flattened against the page ground for a
look, an opaque still and a transparent one are the same picture. The script now fails if less than a
tenth of the frame comes back transparent.

**The still is captured twice and the two passes must agree.** The capture drives a dev server, and a
dev server will serve a page compiled from the module graph as it was before the edit that prompted
the re-capture. That failure is silent and it lasts: the still goes stale, the scene moves on, and
the only symptom is a bull that changes pose the instant WebGL loads. It happened once during this
build. Two passes across a reload catch it.

**Rejected:** shipping the model as authored (57.4MB); Draco (a CDN request for the decoder);
free-tumble orbit controls (unlit and upside-down poses, no way home);
rendering the mesh as a wireframe, which fits the section's name but is noisy at 98k triangles and
needs a second, coarser mesh; and `ScrollTrigger`'s `pin`, which injects a spacer and changes the
document height every other trigger measured against, where `position: sticky` does the same job in
CSS for nothing.

---

## 007 · The marketing ground is deeper than the Figma canvas

`30 Aug 2026` · Nilesh · **accepted** · supersedes the ground clause of 004

**`--page-ground` is `#07080a`.** 004 set it to `#121212` on the grounds that the Figma canvas fill
is the value every component was composed on, so a component rendered on it composites to what the
designer saw. That argument is still true, and it is now outranked by a design call: the alpha site
wants a deeper ground than the product shell, because the whole page is chrome floating on it and a
near-black ground is what makes a hairline read as a hairline.

**What it costs, stated plainly.** Every `bg/*` and `border/*` overlay is white at 5 to 10 per cent,
so all of them composite one step darker here than on the Figma canvas: `bg/surface` lands on
`#16171a` rather than `#1e1e1e`. Nothing changes hue, no token is replaced or invented, and every
text pairing gains contrast rather than losing it. `npm run ds:contrast` is the check on that claim.

**What it does not change.** The ground is still ours, still site-only, still the one value in
`marketing/`. A product surface must not read it: the product's ground is the app shell. If a
`bg/base` variable ever lands in Figma it becomes the product ground, and this stays the marketing
one rather than being deleted, because the two are now genuinely different values rather than one
value copied twice.

The three places that cannot read CSS keep their copies asserted against it by
`npm run check:surfaces`: the viewport `themeColor` in `app/layout.tsx`, and `background_color` and
`theme_color` in `app/manifest.ts`.

---

## 006 · A named surface language, built on the tokens we already mirror

`30 Aug 2026` · Nilesh · **accepted**

Figma gives colour, type, radii, spacing and two glass effect styles. It does not say how a surface
is *lit*: where the highlight sits, how a pane separates from what is behind it, what a hover does,
how deep a blur goes for a nav versus a popover. Without a named answer every component invents one,
and a site whose whole positioning is instrument-grade consistency ends up with six card treatments.

**`docs/SURFACES.md` is now that answer**, with the values in
`src/design-system/extensions/surface.css` and the construction classes in the `components` layer of
`globals.css`.

**It cost almost no new colour, which was the surprise.** The alphas that carry a dark glass
interface are white at 6 per cent and white at 10 per cent, and those are already
`--ds-border-subtle` and `--ds-border-default`. The glass fill is `--ds-bg-elevated`. The popover
fill is `--ds-bg-surface-raised`. The contact ring is `--ds-color-black-60`. The default drop shadow
is `--ds-shadow-glass-surface`. What was genuinely missing is the specular highlight, the wide bloom,
the hero-scale drop, blur tiers above 4px, the fading divider and the panel texture, and that is the
whole of the extension. Everything else in it is an achromatic alpha of pure white or black, which is
light and shadow rather than palette, or a length.

**Adopted, with one correction.** The nesting rule is written as *inner radius = outer radius minus
padding*, because that is what makes two corner arcs concentric. The formulation this was drawn from
said the padding equals the radius delta and then gave an example where it does not.

**Deliberately not adopted.** Focus stays an `outline` rather than becoming a spread `box-shadow`: an
outline avoids layout shift just as well and additionally survives forced-colors mode, where shadows
are dropped entirely, and an ancestor with `overflow: hidden`, which clips a shadow ring and leaves a
focused control with no visible focus. Every surface here has `overflow: hidden`. Buttons keep a real
`border` for the same class of reason: ours is Figma-specified and 1px in every state, so there is no
shift to design around.

**Reported rather than invented.** Figma's two surface steps are 6 per cent and 5 per cent, one point
apart, so the directional two-stop fill is nearly invisible. A pronounced version needs a real pair
in Figma. Deriving one here would have been inventing colour.

**Enforced, because all of it fails silently.** `npm run check:surfaces` catches a raw hex in a
component, a backdrop blur with no compositing layer, an overlay pseudo-element that swallows clicks,
a transition on a layout property, and an unprefixed mask. It also asserts that the three copies of
the page ground agree, replacing a comment that asked humans to keep them in step.

---

## 005 · Motion is a vocabulary, and the transport is always mounted

`30 Aug 2026` · Nilesh · **accepted** · amends the reduced-motion rule in CLAUDE.md

Four choices taken together while building the scroll system. The full handbook is `docs/MOTION.md`;
this records the reasoning that will not be recoverable from the code.

**One. The scroll feel is `lerp: 0.12`, not `duration`.** The provider used to pass
`duration: 1.1` with an easing function, which puts Lenis in fixed-time mode: every throw takes the
same wall-clock time regardless of distance. Short flicks feel slow, long throws feel slow in a
different way, and the code comment claiming it was "roughly one screen of travel per gesture" was
describing something the option does not do. `lerp` is exponential damping instead, so distance and
time relate the way a physical object does, and the settle time is the same on a 60Hz and a 120Hz
display because the per-frame factor derives from `deltaTime`.

0.12 rather than the 0.10 that agency sites run at. At 0.10 the rendered position trails the pointer
by roughly 85 to 170px during a continuous scroll, which is the "magnetic" quality people are
describing when they like this effect. It is also lag, and the thing under the pointer on this site
is a table of numbers someone is trying to read. 0.12 keeps the tail and gives back about 20 per
cent of the trail. Below 0.075 on a page with this much text, visitors report the page as broken.

**Two. Lenis is constructed under `prefers-reduced-motion`, not skipped.** CLAUDE.md said the
provider does not construct it at all. That was right when it was written and is not any more:
Lenis 1.3 has `respectReducedMotion`, on by default, which forces the interpolation to 1 so scroll
tracks the input device with no smoothing and makes programmatic scrolls instant.

Skipping construction cost more than it bought. With no instance there is no `scrollTo`, no `stop`
and no `start`, so every overlay, anchor and back-to-top control needed a branch, and the branch that
only runs for reduced-motion visitors is the branch nobody tests. `@/lib/scroll` now carries native
fallbacks anyway, so the always-mounted instance is a convenience rather than a load-bearing
assumption: if a reduced-motion visitor ever reports discomfort, the provider can go back to
skipping construction and no call site changes.

**Three. `<Reveal>` owns scroll entrance, and Motion gives up `whileInView`.** `FadeIn` used
Motion's `whileInView`, which made it a second scroll-reveal system beside GSAP with its own trigger
point, its own curve and no shared budget. CLAUDE.md's stack table already assigns scroll
choreography to GSAP; this makes the code agree. `FadeIn` is now a mount entrance, and both read
their duration and curve from the same vocabulary, so the two libraries move with one hand.

**Four. Statement text splits by word, not by character.** The reference implementation this was
drawn from wraps one `<div>` per character: 148 of them on a page, each holding a compositor layer,
staggered fast enough that the effect stops reading, and the text destroyed for anyone using a
screen reader or selecting to copy. Word masks carry the same idea at a twentieth of the cost, and
`aria-label` on the wrapper keeps one readable string where the DOM has many.

**The numbers live in `src/design-system/extensions/motion.ts`, as an extension and not a token.**
Figma was not read for motion variables in this session, so this is recorded as a gap rather than as
a claim that the system has none. If motion variables exist or land later, the Figma values win and
the extension is deleted. The CSS half is hand-kept and drift-checked by `npm run check:motion`,
which now runs in `verify`.

**Rejected:** a scroll-reveal hook instead of a component (every call site then re-declares the
trigger point and the curve, which is the problem the vocabulary exists to solve); a third register
between instrument and statement (a request for a third register is a design decision, not a prop);
generating `motion.css` from `motion.ts` through `ds:build` (two values do not justify a generator,
and the drift check is nine lines).

---

## 004 · The site runs dark, on the system's own mode

`30 Aug 2026` · Nilesh · **accepted** · supersedes 001

Decision 001 put the page on a white ground and confined the design system to dark "instrument"
modules. That was a workaround for a system with one mode, and it cost more than it bought: an
invented ink scale, an invented hairline, an invented alternate band, a light accent selection rule,
and a `.instrument` class every module had to remember to wear or silently render white on white.

**The site runs dark, directly on the design system's one mode.** No theme switch, no inverted
scale, no wrapper class. Every token renders exactly as drawn.

What this deletes: `--ink-primary`, `--ink-secondary`, `--ink-tertiary`, `--hairline`,
`--hairline-strong`, `--accent-on-light`, `--page-ground-alt`, `--module-ground`, and the
`.instrument` mechanism. `marketing/` is down to two things Figma genuinely does not define for a
marketing page: the ground the overlays composite against, and the measure.

**The two registers survive, and now differ by scale and density rather than by colour**, which is
closer to what doc 04 §1 actually describes. Statement is full-bleed and typographic; instrument is
dense, hairline-bordered and numbers-forward. The alternation is still the design.

One value stays ours: `--page-ground`, at the time `#121212` and since moved to `#07080a` by 007. The system's surfaces are white at 5 to 10 per cent,
so they are overlays with no ground of their own, and there is no `bg/base` variable to mirror.
`#121212` is the canvas fill every component is composed on in Figma, so a component rendered on it
composites to the value the designer saw. That reasoning is superseded by 007, which trades the exact
composite for a deeper marketing ground and states what the trade costs.

Consequences worth knowing, all measured by `npm run ds:contrast`: `accent/secondary` is the text
accent at 9.4:1, `accent/primary` is a fill and scores 3.25:1 as text; `border/strong` is the only
border that clears 3:1 for a control boundary; and `placeholder` at 2.51:1 is a genuine gap in the
system, raised with design rather than patched here.

---

## 003 · One canonical Figma library

`30 Aug 2026` · Nilesh · **accepted**

Three libraries are attached to the design system file: `Tradl Design System` (last updated 28 Aug,
where the six working pages live), `Tradl AI • Dev Handover` (12 Aug, defines the *same* token names
with older values), and `Backtest` (text and effect styles, duplicated).

**`Tradl Design System` is the only source.** The other two are ignored.

Two libraries defining `text/primary`, `bg/surface` and `radius/card` with different values is how a
design system silently forks: a search returns both, and whichever one a session happens to read
becomes that session's truth. If a needed token exists only in `Dev Handover`, it is reported as a
gap in `provenance.json`, never quietly pulled in, because a value present in one library and absent
from the other is usually a rename we have not spotted.

Detaching the stale libraries in Figma would be cleaner, but that is a Figma change and therefore the
design team's call.

---

## 002 · The typeface is Inter

`30 Aug 2026` · Nilesh · **accepted**

Two sources disagreed. Figma: every type variable in the Typography collection is Inter, from
`text-xs/regular` 10/14 up to `Display XXXL` Bold 42/100. This repo and
`docs/00-brief/01-brand-identity-book.md`: IBM Plex Sans for text, Lato for numbers.

**Inter, everywhere, text and numbers both.** Where the brand book and Figma disagree on a
token-layer fact, Figma wins, because Figma is the design system and the brand book is a dated
handover document.

The IBM Plex + Lato pairing came from the superseded "Bento" export under `reference/design-system/`,
which is a different file and not the live system. Numbers keep `font-variant-numeric: tabular-nums`,
which was the real reason for the Lato split; the split itself goes away. One family instead of two
is also a straight win against the LCP budget in doc 04 §5.

`docs/00-brief/` is a verbatim archive and is **not** edited. This entry supersedes it on the
typeface question.

Still open: Figma's largest type token is 42px, which is not a hero size. A display scale for the
statement register is an `extensions/` entry.

---

## 001 · Light page ground, dark instrument modules

`30 Aug 2026` · Nilesh · **superseded by 004**

> Kept for the reasoning, not the outcome. The constraint it describes is still true and still worth
> understanding: the design system has exactly one mode. 004 resolves it by running on that mode
> instead of working around it.

The site runs on a white background. The design system in Figma has exactly one mode and it is dark.
Every semantic colour assumes a dark ground:

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `text/primary` | `#ffffff` | | `bg/surface` | `#ffffff0f` (white 6%) |
| `text/secondary` | `#bababa` | | `bg/surface-raised` | `#ffffff0d` |
| `border/subtle` | `#ffffff0f` | | `bg/elevated` | `#00000099` |
| `border/default` | `#ffffff1a` | | `bg/toolbar` | `#393939cc` |

On white these do not degrade, they disappear: white text on white, surfaces and borders resolving
to a few percent of white over white. There is no light mode to mirror, and authoring one would mean
inventing ~25 colour values no designer has approved.

**The page ground is white and the statement register is light. Every instrument module renders in
the design system's native dark tokens, unmodified** — Playground, ledgers, proof chips, cards,
tables, tool grid, charts.

This maps onto the two registers already defined in doc 04 §1 and onto its stated intent that the
marketing site should feel like the product leaking out. The product is dark; dark modules on a white
page make that literal. Cost is zero invented colour, so the mirror stays honest.

The light-side values the statement register needs (page ground, ink, hairline) are a small bounded
set living in `src/design-system/marketing/`. They are marketing values, not light-mode tokens, and
must never be promoted into Figma as such.

One consequence worth knowing: `accent/secondary` `#3fcf8e` scores 1.9:1 on white and fails AA, while
`accent/primary` `#18744b` scores 5.9:1 and passes. On light ground the accent is green-700. Both are
real tokens, so this is a selection rule, not an invention.

**Rejected:** authoring a full light palette in code (25 unapproved values, drifting from day one,
undetectable as invented later); adding a Light mode in Figma first (cleanest, but contradicts the
standing rule that this repo never causes a Figma change, and blocks the homepage).
