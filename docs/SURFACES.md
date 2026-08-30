# Surfaces

How a component is built: material, strokes, elevation, glass, layering and geometry.

Colour and typography are **not** here. Those come from the Figma mirror and nothing in this
document changes them. See `docs/DESIGN-SYSTEM.md`. Motion has its own handbook in `docs/MOTION.md`;
what appears below is only the part that belongs to a surface.

- [The thesis](#the-thesis)
- [Where the values live](#where-the-values-live)
- [Strokes](#strokes)
- [Elevation](#elevation)
- [Glass](#glass)
- [Fills and texture](#fills-and-texture)
- [Layering](#layering)
- [Geometry](#geometry)
- [Motion on a surface](#motion-on-a-surface)
- [Components](#components)
- [Checklist](#checklist)
- [Deviations](#deviations)

---

## The thesis

**A surface is a translucent pane, lit from directly above by a 1px specular highlight, outlined by a
hairline stroke, floating on an ambient shadow, blurred behind.**

Depth is never communicated by a big drop shadow. It is communicated by **stroke plus inner top
highlight plus blur**.

Four ingredients, always in this order, and the fourth is the one that gets left out:

```
1. blur behind        backdrop-filter
2. translucent fill   bg-surface, bg-raised, bg-elevated
3. hairline stroke    border-line
4. top specular       shadow-spec
```

Omit 4 and the surface reads flat. Replace 4 with a soft outer shadow and it reads like a card from
any other site.

## Where the values live

| | |
|---|---|
| Colour, type, radii, spacing, the two glass effects | `tokens/` — mirrored from Figma, never invented |
| Specular, rings, blooms, washes, blur tiers, textures | `extensions/surface.css` — ours |
| The ground and the measure | `marketing/` — site-only |
| The construction classes | `src/styles/globals.css`, `components` layer |

**No new colour.** Every value in `surface.css` is either a real `--ds-*` token, an achromatic alpha
of pure white or pure black (light and shadow, not palette), or a length. Nothing introduces a hue.
`npm run check:surfaces` fails the build on a raw hex in a component.

### What Figma already gave us

Worth knowing before reaching for an extension: the two alphas that carry most of a dark glass
interface are white at 6 per cent and white at 10 per cent, and they are already
`--ds-border-subtle` and `--ds-border-default`. So are the fills. The mapping is close to exact:

| Needed | Real token |
|---|---|
| Default surface edge | `--ds-border-subtle` `#ffffff0f` |
| Interactive or emphasised edge | `--ds-border-default` `#ffffff1a` |
| Specular highlight, default | `--ds-color-white-10` `#ffffff1a` |
| Hover wash | `--ds-color-white-6` |
| Glass pane fill | `--ds-bg-elevated` (black at 60 per cent) |
| Popover fill | `--ds-bg-surface-raised` (white at 5 per cent) |
| Contact ring, menu shadow | `--ds-color-black-60` |
| Default drop shadow | `--ds-shadow-glass-surface` |

Genuinely missing, and therefore the whole of the extension: the specular highlight, the wide bloom,
the hero-scale drop, blur tiers above 4px, the fading divider, and the panel texture.

## Strokes

Five techniques. Pick by intent.

**Plain hairline** — `border border-line`. The default, and correct for most things.

**Three-sided** — `.stroke-top-lit`. The bottom border is omitted so the surface reads as lit from
above and resting on the page rather than floating in a box. Use on tracks and toolbars.

**Double, sub-pixel** — the `--elevation-window` stack. A dark contact ring outside and a bright
specular inside, both at 0.5px. This is what makes a pane read as glass rather than as a panel.

**Fading rule** — `.divider-fade`, `.divider-fade-soft`, or `<Divider />`. A section rule dissolves
at both ends. A hard line boxes a section in; a fading one reads as the edge of a lit area, which is
the story the specular tells everywhere else. Uses `border-image`, which **disables border-radius on
that element**, so it belongs on straight rules only.

**Gradient ring** — `.ring-gradient`. A gradient on the 1px border with no fill, via mask
compositing. Both `-webkit-mask-composite: xor` and `mask-composite: exclude` are required: same
operation, different keywords, and the linter checks for the pair.

## Elevation

Shadows are composed from a fixed menu, not invented per component. Pick a **stack**, not an atom.

| Utility | Stack | For |
|---|---|---|
| `shadow-spec` | specular only | the atom, when a stack is wrong |
| `shadow-card` | specular | a resting card. Most things |
| `shadow-chrome` | soft specular + Figma drop | nav, sticky bars |
| `shadow-window` | wide drop + contact ring + high specular | a product window |
| `shadow-frame` | bloom + high specular, no drop | a hero frame: lit, not lifted |
| `shadow-inner` | tight halo + specular | a frame inside a frame |
| `shadow-menu` | drop with negative spread | popovers and menus |
| `shadow-aura` | three accent shadows at 5 per cent | a selected or recommended card |

Rules of thumb. Outer glow is white at 3 to 5 per cent with a very large blur and a large spread; it
is a haze, never a visible ring. Never stack a strong bloom and a strong drop on the same element
unless it is the page's one hero. The negative spread on `shadow-menu` is what stops a popover
looking like it is glowing.

## Glass

Blur radius is semantic: how much of what is behind should survive.

| Utility | Radius | For |
|---|---|---|
| `backdrop-blur-glass` | 4px | anything Figma drew with its glass effect |
| `backdrop-blur-chrome` | 5px | nav: softens without obscuring |
| `backdrop-blur-panel` | 10px | banners, cards over imagery |
| `backdrop-blur-menu` | 24px | popovers, dropdowns, toasts |
| `backdrop-blur-window` | 36px | a full product window |
| `backdrop-blur-bar` | 48px | a bar nested inside an already-blurred window |

**Two non-negotiable companions.** Every blurred element needs its own compositing layer
(`transform: translate(0, 0)`) or Safari drops the blur entirely and Chrome smears it during scroll;
and `isolation: isolate` if it contains a blended child, or the blend reaches the page behind. The
`.glass` class carries both, which is why the `glass` prop on `<Surface>` exists rather than leaving
it to the call site. The linter fails a `backdrop-blur` without one.

**Never blur over a flat colour.** Backdrop blur only reads as glass when there is structure behind
it. Over an empty ground it is an expensive no-op.

**Budget.** Backdrop blur forces a compositing layer and repaints on scroll. Doc 04 §5 caps LCP at
2.0s on mid-range Android. Treat **two blurred surfaces per viewport** as the ceiling, and prefer an
opaque fill wherever the blur is not doing visible work.

## Fills and texture

**Directional fill** — `.surface-lit` or `<Surface lit>`. A two-stop gradient on the same diagonal as
the specular, so the lighter corner sits under the highlight.

> **Open with design.** Figma's two surface steps are 6 per cent and 5 per cent, one point apart, so
> this gradient is almost invisible. That is faithful and it is why the effect is understated here.
> A pronounced lit fill needs a real pair in Figma. Deriving one would be inventing colour.

**Top-lit radial** — `.fill-top-lit`. For controls under about 64px: keycaps, chips, the thumb of a
segmented control. Anchored to the top edge so the light source agrees with the specular. A centred
radial fights it and reads as a bubble.

**Ambient spill** — `.spill-top`, or `<Section>`. A wide, very low-alpha radial under a section
divider: light bleeding in from above. The fading rule plus this spill is the recipe that carries most
of the page's rhythm.

**Panel texture** — `.texture-scanline`. A 1px repeating gradient rather than an SVG noise filter. It
costs nothing, it survives backdrop blur, and it needs no asset. Used inside window bodies so a large
dark area does not read as an empty rectangle. **Do not reach for `feTurbulence`**: it is expensive
per frame. If real grain is wanted, it belongs in an image.

**`.fill-to-edge`** sets `background-origin: border-box` so a fill starts at the outer edge of the
border, which removes the 1px seam between a gradient and its stroke.

## Layering

A surface is a z-ordered sandwich, and each layer has one job:

```
z: -1   ::before   gradient ring or glow          negative-margin, inherits radius
z:  0   element    fill + blur + stroke + specular
z:  0   children   content
z:  1   ::after    hover wash or vignette         pointer-events: none, opacity only
z:  2   overlay    focus ring, badges
```

**Hover changes the stroke or adds a wash. It never changes the fill.** A card that lightens on hover
reads as a button; a card whose edge sharpens reads as a card that knows you are there.

- `.hover-wash` — the simple version. A transparent overlay that fades to `--wash-hover`.
- `.hover-vignette` — darkens the edges and leaves the centre readable, through `soft-light`. Needs
  its own stacking context or the blend reaches the page.

**Blend modes always go on a pseudo-element, never on the component itself.**

**Edge fading.** Content fades out rather than being clipped, which is most of why a page reads as
soft-edged rather than as a stack of rectangles. `.mask-fade-b` for the bottom of a tall frame,
`.mask-fade-x` for both ends of a horizontal scroller. Both prefixes are required and checked.

## Geometry

Radii, spacing and the measure all come from Figma and doc 04. Nothing here overrides them.

**The nesting rule: inner radius = outer radius − padding.** That is what makes the two corner arcs
concentric. Get it wrong by a pixel and the inner panel looks pasted on rather than seated. `<Frame>`
is 16 outer, 4 gap, 12 inner. Never nest two surfaces at the same radius.

Our radius ladder has clean 4px deltas at the top (16 → 12 → 8 → 4), so a step down is always one
token down.

Content width is `max-w-content` (1200px, doc 04 §2). Breakpoints stay Tailwind's defaults: the grid
is deliberately boring so the surfaces do the work.

## Motion on a surface

The vocabulary is in `docs/MOTION.md`. Three parts belong to surfaces:

**`.press`** carries the whole transition set for anything that answers a pointer, plus a 100ms
scale on an overshooting curve. It is one class on purpose: a Tailwind `transition-*` utility
**replaces** the transition property outright, so a separate press class and a separate hover class
silently cancel each other. Do not add `transition-*` next to `.press`.

**`.stagger-item`** with an inline `--delay` for chrome that opens: menu rows, a dock's contents.
Not for scroll-triggered content, which belongs to `<Reveal>`.

**Never animate** `left`, `right`, `top`, `bottom`, `width`, `height`, `margin`, `padding`, or
`filter` on a large element. Blur a sibling and animate its opacity instead (`<GlowLayer>`). The
linter fails a transition on any of them.

## Components

| Component | Source |
|---|---|
| `Button`, `Card`, `Badge`, `StatusPill` | Figma, with the specular and press added |
| `Input`, `Tooltip`, `SegmentedControl` (tab) | Figma |
| `Surface`, `Frame`, `Divider`, `Section`, `GlowLayer` | ours, from this language |
| `Window`, `WindowHeader`, `WindowBody`, `WindowBar` | ours |
| `Popover`, `Toast`, `Keycap` | ours |

Every file records its Figma node and measured spec in its header, so a port can be checked without
opening Figma. Browse them all at `/dev/design-system`.

## Checklist

- [ ] There is a `shadow-spec` or a stack containing one. **Always.**
- [ ] There is a `border-line` hairline, not a heavier stroke reaching for attention
- [ ] Hover moves the stroke or adds a wash; the fill does not change
- [ ] `backdrop-blur` is paired with a compositing transform, and there are at most two per viewport
- [ ] Nested surfaces are concentric: inner radius = outer radius − padding
- [ ] Section dividers fade at both ends; no solid edge-to-edge rules
- [ ] Every overlay pseudo-element has `pointer-events: none` and `border-radius: inherit`
- [ ] Nothing animates layout: only transform, opacity, box-shadow, border-color, background-position
- [ ] No raw hex anywhere in a component
- [ ] `npm run check:surfaces` passes

## Deviations

Where this system deliberately differs from the pattern it was drawn from, and why.

**Focus stays an `outline`, not a spread shadow.** The fashionable choice is a `box-shadow` ring, on
the argument that it avoids layout shift. An `outline` avoids layout shift too, and it survives two
things a shadow does not: forced-colors mode, where shadows are dropped entirely and outlines are
remapped to the system highlight, and an ancestor with `overflow: hidden`, which clips a shadow ring
and leaves a focused control with no visible focus at all. Every surface here has `overflow: hidden`.
`--focus-ring` exists for the one case that needs a ring inside a clipping ancestor.

**The nesting rule is stated as inner = outer − padding.** The source formulation said the padding
equals the radius *delta*, then gave an example where it does not (16 outer, 8 padding, 12 inner).
Concentric corners are what the eye actually reads, so the rule is written the way that produces
them.

**Radius, spacing and measure are ours.** The source has its own scales; we have Figma's and doc 04's.
Only the *nesting relationship* is adopted, not the numbers.

**Buttons keep a real `border`.** The source makes button strokes spread shadows so a ring can
thicken without layout shift. Our border is Figma-specified and stays 1px in every state, so there is
no shift to avoid and no reason to move a drawn property into a shadow.

**The window stroke is our grey, not a violet-grey.** The idea is right and adopted: a big glass pane
gets a desaturated stroke rather than a white one, because white reads as a highlight and grey reads
as an edge. The value is `--ds-color-grey-750-20`, a real token, rather than a hue we do not have.

**The directional fill is understated.** See the note under Fills. A faithful gradient between
Figma's two surface steps is nearly invisible; the alternative was inventing colour.
