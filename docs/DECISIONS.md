# Decisions

Append-only. One section per decision, newest first, numbered in the order taken. A decision is
recorded here when it constrains future work and the reasoning is not recoverable from the code.

Supersede rather than rewrite: if a decision changes, add a new entry and mark the old one
`superseded by NNN`. The record of what we used to think is the useful part.

**Scaling:** split into `docs/decisions/YYYY.md` when this passes ~50 entries. Not before, because
one greppable file is worth more than tidy folders until then.

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

One value stays ours: `--page-ground` `#121212`. The system's surfaces are white at 5 to 10 per cent,
so they are overlays with no ground of their own, and there is no `bg/base` variable to mirror.
`#121212` is the canvas fill every component is composed on in Figma, so a component rendered on it
composites to the value the designer saw. If a `bg/base` ever lands in Figma, this is the first thing
to delete.

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
