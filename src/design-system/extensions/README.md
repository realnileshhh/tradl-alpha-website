# extensions

Values we needed and Figma does not have yet. Every entry is a **promotion candidate**: when the
design team adds it to Figma, the Figma value wins, the extension is deleted, and the swap is logged
in `docs/DESIGN-SYSTEM.md`.

Nothing here is a token. Anything in this directory is our invention and is treated with suspicion
until a designer signs it off.

| Entry | File | Status | Added |
|---|---|---|---|
| Display scale above 42px | `display-scale.css` | **proposed**, awaiting sign-off | 30 Aug 2026 |
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

## Serif italic for the warm beat

**Why.** Doc 01 §7 allows warmth exactly once per page, as a lowercase serif-italic beat
("the market, finally *intelligent*"). The design system has one family, Inter, and no serif.

**Proposal.** Instrument Serif, italic, 400 only, latin subset. It is a display serif with a real
italic, it sits comfortably beside Inter's geometry, and one style is roughly 15KB.

**Not wired.** No font is loaded for this yet. It costs bytes against the LCP budget in doc 04 §5 for
a single line per page, so it does not ship until someone approves the trade. Ask before using.
