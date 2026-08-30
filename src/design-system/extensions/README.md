# extensions

Values we needed and Figma does not have yet. Every entry is a **promotion candidate**: when the
design team adds it to Figma, the Figma value wins, the extension is deleted, and the swap is logged
in `docs/DESIGN-SYSTEM.md`.

Nothing here is a token. Anything in this directory is our invention and is treated with suspicion
until a designer signs it off.

| Entry | File | Status | Added |
|---|---|---|---|
| Display scale above 42px | `display-scale.css` | **proposed**, awaiting sign-off | 30 Aug 2026 |
| Motion vocabulary | `motion.ts` + `motion.css` | **proposed**, awaiting sign-off | 30 Aug 2026 |
| Surface and elevation | `surface.css` | **proposed**, awaiting sign-off | 30 Aug 2026 |
| Serif italic for the warm beat | not written | **proposed**, not wired | 30 Aug 2026 |

---

## Display scale above 42px

**Why.** Figma's largest type token is `Display XXXL`, Inter Bold 42px. That is a product-surface
display size. Doc 03 §3 puts a full-bleed statement hero (H1) and a full-bleed typographic close
(H9) on the homepage, and 42px does not carry either at desktop width.

**What.** One fluid step above the Figma scale, plus a section-opener step that reuses the real
42px token rather than inventing a second size near it. Deliberately minimal: one invented size, not
a parallel type system.

**Open question for design.** `Display XXXL` reports `lineHeight: 100` from Figma. Every other token
reports line height in px, which would make this 100px on a 42px face. The superseded Bento export
recorded the equivalent as `100%`. Until that is confirmed, `--line-height-display-xxxl` is withheld
from `tokens/` and the statement scale sets its own leading.

---

## Motion vocabulary

**Why.** Doc 04 §4 describes how the site should move and doc 04 §5 caps what that may cost, but
neither names a curve, a duration or a distance. Without a named set, every component invents its
own, and a site whose whole positioning is instrument-grade consistency ends up with nine easing
curves in it.

**What.** One house curve as control points, three durations split by what is moving (chrome,
instrument content, statement content), two reveal presets keyed to the two registers in doc 04 §1,
and a per-page ScrollTrigger budget. `motion.ts` is the source; `motion.css` carries the two values
CSS needs and is drift-checked by `npm run check:motion`.

**Gap, not a claim.** Figma was not queried for motion variables when this was written. The seven
collections recorded in `provenance.json` carry no motion names and `get_motion_context` was not
run, so this is reported as unread rather than as absent. Every value here is a promotion candidate.

**Open question for design.** Whether the product surfaces already move to a defined curve. If they
do, the marketing site should use it rather than this one, and the whole entry is deleted.

---

## Surface and elevation

**Why.** Figma defines colour, type, radii, spacing and two glass effect styles. It does not define
how a surface is lit: where the highlight sits, how a pane separates from what is behind it, what a
hover does, how deep a blur goes for a nav versus a popover. Every component was answering that
question for itself.

**What.** A specular highlight ladder, shadow atoms and six canonical stacks, bloom, a hover wash,
five blur tiers, a directional fill, top-lit radials, a panel texture, fading dividers, and two
keycap elevations. The handbook is `docs/SURFACES.md`.

**Smaller than it sounds.** Most of the alphas this language needs already exist in the mirror:
`--ds-border-subtle` and `--ds-border-default` are the two strokes, `--ds-color-white-10` is the
default specular, `--ds-bg-elevated` is the glass fill, `--ds-color-black-60` is the contact ring,
and `--ds-shadow-glass-surface` is the drop. What is invented here is the specular, the bloom, the
hero-scale drop, the blur tiers, the divider and the texture. Everything else references a token.

**No colour.** Every invented value is an achromatic alpha of pure white or pure black, which is
light and shadow rather than palette, or a length or an angle. `npm run check:surfaces` fails the
build on a raw hex in a component.

**Open question for design.** The directional fill uses Figma's two surface steps, which are 6 per
cent and 5 per cent. One point apart makes the gradient nearly invisible. A pronounced lit fill needs
a real `bg/surface-lit` pair in Figma; deriving one here would be inventing colour.

**Second open question.** Whether the product surfaces already have a specular convention. If they
do, the marketing site should use theirs and this entry shrinks to the marketing-only parts.

---

## Serif italic for the warm beat

**Why.** Doc 01 §7 allows warmth exactly once per page, as a lowercase serif-italic beat
("the market, finally *intelligent*"). The design system has one family, Inter, and no serif.

**Proposal.** Instrument Serif, italic, 400 only, latin subset. It is a display serif with a real
italic, it sits comfortably beside Inter's geometry, and one style is roughly 15KB.

**Not wired.** No font is loaded for this yet. It costs bytes against the LCP budget in doc 04 §5 for
a single line per page, so it does not ship until someone approves the trade. Ask before using.
