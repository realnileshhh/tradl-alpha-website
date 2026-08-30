# Design system

How the Figma system gets into this repo, what is in it right now, and what each sync changed.

The four non-negotiable rules live in `CLAUDE.md` because they must be in context every session.
Everything else is here.

- [Source](#source)
- [Layout](#layout)
- [Where a value goes](#where-a-value-goes)
- [The sync run](#the-sync-run)
- [Commands](#commands)
- [Current state](#current-state)
- [Brand assets](#brand-assets)
- [Icons](#icons)
- [Extending the system](#extending-the-system)
- [Accessibility findings](#accessibility-findings)
- [Sync log](#sync-log)

---

## Source

| | |
|---|---|
| File | [Tradl Design System](https://www.figma.com/design/ZRYpUf3iulUMH0Rbdb68hk/Tradl-Design-System) |
| File key | `ZRYpUf3iulUMH0Rbdb68hk` |
| Pages | Components - General · Components - Tradl Guide · Components - Backtesting · Typography · Icons · Logos |
| Collections | Charts colors 18 · Heatmap 7 · Highlights 11 · Primitives 42 · Semantics 48 · Shadows 5 · Typography 23 |
| Canonical library | `Tradl Design System` only — see decision 003 |

Page node ids are recorded in `src/design-system/provenance.json` and are **required**:
`get_metadata` without a node id lists only the page open in the caller's own Figma session, so a
cold session sees just "Cover" and would conclude the file is empty.

`reference/design-system/` is a stale export from a *different* Figma file (the "Bento" one). Its
`--surface-l1…l5` and `--radius-xs…xl` names exist nowhere in the live system. History, not a source.

## Layout

```
src/design-system/
├── _figma-export/      Raw exports, verbatim. Input, never edited. Underscore = not ours.
├── tokens/             MIRRORED.  Generated. Hand-editing it is always a bug.
├── extensions/         EXTENDED.  We invented it. Dated, with a why.
├── marketing/          SITE-ONLY. Right for a landing page, wrong for a product surface.
└── provenance.json     What was read, from where, when, and what is still missing.
```

## Where a value goes

One question: **did Figma tell me this?**

| Situation | Bucket | Example |
|---|---|---|
| Read from a Figma variable this session | `tokens/` | `bg/surface` `#ffffff0f` |
| Needed it, Figma has no answer | `extensions/` | display scale above 42px |
| Only ever right on a marketing page | `marketing/` | the page ground, content width |
| Not sure | **stop and ask** | |

Every `extensions/` entry carries a one-line why and a date, because they are promotion candidates
and the design team needs to read them as a list. When a sync finds Figma has since defined one, the
Figma value wins: move it to `tokens/`, delete the extension, log the swap.

Do not edit `tokens/` by hand. The next sync overwrites it, your change vanishes, and the diff reads
as though Figma changed when it did not. Change it in Figma, then re-sync.

## The sync run

After every push and every deploy:

1. `get_libraries` on the file key. Confirm `Tradl Design System` is still canonical; note any new
   library.
2. For each page node id in `provenance.json`: `get_metadata`, then `get_variable_defs` on the
   variable-bearing nodes.
3. Diff against `provenance.json`. Classify every change: added / changed / removed / renamed.
4. Apply to `tokens/`. A **removed** token is never deleted silently — find its consumers and report
   them first, because a removal in Figma is usually a rename we have not spotted.
5. Re-export changed assets (`node scripts/extract-icons.mjs`, logos via `download_assets`).
6. Reconcile `extensions/` against the new `tokens/`.
7. `npm run verify`.
8. Append a dated entry to the [sync log](#sync-log) below.

**If step 1 or 2 fails, stop there and report.** Do not carry partial data into step 3: a partial
read is indistinguishable from a deletion, and step 4 would then strip live tokens out of the repo.

## Commands

| | |
|---|---|
| `npm run ds:build` | Regenerate tokens, icons and the wordmark from the recorded export |
| `npm run ds:tokens` | Tokens only |
| `npm run ds:icons` | Icons, then verify every viewBox frames its geometry |
| `npm run ds:brand` | The wordmark component |
| `npm run ds:contrast` | WCAG report for every pairing the site actually uses |
| `npm run ds:verify` | Regenerate, then fail if the working tree moved. Catches hand edits to generated files. |
| `npm run verify` | typecheck + build |

`ds:verify` is the one that matters in CI. The generators are deterministic, so a non-empty diff
after a rebuild means someone edited a generated file by hand and their change is about to be lost.

## Current state

**Partial.** 86 of 154 variables mirrored. The semantic layer, which is what components actually
consume, is 45 of 48.

The gap is structural rather than an oversight. Figma variable collections are not addressable as
nodes, and `get_variable_defs` resolves only the variables a given layer *uses* — so a variable no
component consumes cannot be reached through the MCP at all. `provenance.json` lists every gap.

Missing: all 18 Charts colors, plus unreferenced entries in Primitives, Typography, Highlights and
Shadows. **Unblocked by** a one-time variables-to-JSON plugin export dropped at
`src/design-system/_figma-export/variables.json`, which then becomes the generation source and
demotes the MCP harvest to a cross-check.

## Brand assets

`public/brand/`, exported as SVG and post-processed to strip Figma's canvas background rect. Figma
bakes an opaque `#121212` fill behind every export; leaving it in would give each mark an opaque box
that cannot sit on a surface, a tint or anything but that exact colour.

| File | Node | Contents |
|---|---|---|
| `tradl-lockup.svg` | `361:2619` | App mark, wordmark, AI TRADING INTELLIGENCE tagline |
| `tradl-wordmark.svg` | `361:2588` | Wordmark only: `trad` in ink, `l.` in green |
| `tradl-tagline.svg` | `361:2595` | The AI TRADING INTELLIGENCE line, outlined |
| `tradl-app-mark.svg` | `384:580` | Rounded square tile, white `t`, green slash and dot |
| `tradl-glyph.svg` | `343:391` | Green slash and dot, no letterform |

**Known inconsistency, recorded not reconciled:** the lockup, wordmark and app mark use `#00AF79`;
the glyph uses `#3FCF8E`. `#3FCF8E` is the `color/green-400` primitive. `#00AF79` exists nowhere in
the variable system. Raised 30 Aug 2026, awaiting a design call. Do not "fix" either file.

## Icons

84 components in `src/components/ui/icons/`, generated by `scripts/extract-icons.mjs` from the whole
Icons page exported as one SVG.

Why that route: the icons sit loose on the canvas rather than inside frames, `download_assets` caps
at 20 SVGs per node, and canvases are not addressable by `get_variable_defs` — so there is no bulk
pull. Exporting the page as a single SVG and splitting it locally is the only way to get all of them
in one read.

Each icon's viewBox is derived from its Figma page coordinates plus a constant offset of
`(+169, -14)`, which comes from the page content bounds (x `-169..717` = 886 wide, y `14..404` = 390
tall) matching the export viewBox exactly. `scripts/verify-icons.mjs` checks the arithmetic rather
than trusting it: it pulls absolute move-to points out of every path and asserts they land inside the
declared box. Run it after any re-export.

Monochrome ink (`#BABABA`, `#F5F5F5`, white) becomes `currentColor` so one file works on both the
dark instrument modules and the light statement register. `#8A38F5` and `#3FCF8E` are deliberate
semantic colour in the source and are left alone.

## Extending the system

The Figma system is expected to grow. This section is the contract for what happens when it does.

**The principle: everything derives from the inputs.** `_figma-export/` holds raw Figma responses.
Tokens, icons, the wordmark and the app icons are all generated from those files. Nothing about the
system's *contents* is hard-coded in a script, so extending it means refreshing an input and
re-running, never editing code.

That is a property worth protecting. The first version of the icon extractor held a hand-typed table
of 84 names and coordinates plus a hard-coded canvas offset. Adding one icon in Figma would have
dropped it silently and, if the canvas bounds moved, shifted every existing viewBox by the same wrong
amount. Both now derive from `icons-metadata.xml`, and the two icon inputs are cross-checked against
each other so a half-refresh fails loudly instead of producing 84 subtly wrong icons.

### You added or changed a variable

Nothing to do in code.

1. Refresh the variable input. Best case: re-export `variables.json` from the plugin. Until that
   exists, add the value to `variables.mcp-harvest.json` in the group its name prefix belongs to.
2. `npm run ds:tokens`.
3. `npm run ds:contrast` if it is a colour, to see how it scores where it will be used.

A brand new **collection** needs no code either: an unrecognised top-level group is emitted
generically as `--ds-<group>-<name>` and reported in the script's output, so its values are usable
immediately. Give it a proper section in `build-tokens.mjs` only if it needs specific formatting,
such as typography does.

### You added an icon

1. Re-fetch **both** icon inputs, together, from the Icons canvas (`2:83`):
   `get_metadata` into `icons-metadata.xml`, and `download_assets` (svg) into `icons-page.svg`.
2. `npm run ds:icons`.

The new icon appears as `icon-<name>.tsx` with an `Icon<Name>` export, and `index.ts` regenerates.
Refreshing only one of the two inputs is caught: the script compares the metadata's computed canvas
bounds against the SVG's viewBox and refuses to run if they disagree.

Two names that normalise to the same file also fail loudly rather than one overwriting the other.

### You added or changed a component

Components are ports, not generated, so this one has a human step.

1. `get_design_context` on the component node. Load the `figma-design-to-code` guidance first; its
   MCP requires it.
2. Write or update the component in `src/components/ui/`, using `--ds-*` tokens and the existing
   utility vocabulary. Never a raw hex.
3. Record the Figma node id and the measured spec in the file header, the way the existing ones do.
   That header is what lets the next person check the port without opening Figma.
4. Add it to the Components table below and to `/dev/design-system`.

### You added a page in Figma

Add its node id to `provenance.json` under `pages`. Page ids are not discoverable: `get_metadata`
without a node id lists only the page open in the caller's own Figma session, so a page nobody
recorded is a page a cold session cannot find.

### What fails loudly, and what to watch

Loud, by design: mismatched icon exports · duplicate icon names · a generated CSS comment that would
break the stylesheet · unbalanced braces in generated CSS · a hand-edit to any generated file
(`npm run ds:verify`) · an unexpected contrast regression · a banned word in customer-facing copy.

Still quiet, and worth knowing: a variable **removed** in Figma looks identical to a variable we
simply failed to read, which is why the sync run classifies removals separately and reports their
consumers before deleting anything.

## Accessibility findings

From `npm run ds:contrast`, measured rather than eyeballed, all against the real page ground with
translucent surfaces composited first. These are properties of the design system, not of our port.

The report has three verdicts, not two. A pairing we have reasoned about and chosen not to use reads
as `note`, not `FAIL`, so a genuine regression stands out instead of hiding in familiar red. It exits
non-zero only on an **unexpected** failure.

Everything the site actually uses passes. Four documented exceptions:

- **`placeholder` scores 2.51:1 on a surface. This one is a real gap.** Placeholder text is not
  exempt under WCAG 1.4.3 the way a disabled control is, so `#5e5e5e` on `bg/surface` does not clear
  AA. Recorded and raised with design rather than patched here, because the fix belongs in Figma.
- **`accent/primary` is a fill, not a text colour.** `#18744b` scores 3.25:1 as text on the ground,
  while `accent/secondary` `#3fcf8e` scores 9.39:1. White on the deep green fill is 5.77:1, and on
  the button gradient's darkest stop 5.86:1. So: green-700 fills, green-400 writes.
- **Only `border/strong` can carry a control boundary.** `border/subtle` reaches 1.15:1 and
  `border/medium` 1.62:1, both under the 3:1 WCAG 1.4.11 asks of a boundary that identifies a
  control. `border/strong` reaches 9.65:1. As decorative separators the first two are fine and are
  reported unjudged; as the only affordance on an input they are not.
- **The button is 30px and the touch floor is 44px.** Doc 04 §7 sets 44px. Rather than redraw the
  control, `.touch-target` extends the hit area with a pseudo-element on coarse pointers only, so
  the button keeps its specified size and the finger gets its area.

Also worth knowing: **the badge sets 8px type.** That is the design system's real value, reproduced
exactly. It is a product-density figure, and a marketing surface that needs a readable status chip
should treat that as a design decision rather than a number to nudge.

---

## Sync log

Newest first. Change classes: **added** · **changed** · **removed** · **renamed** · **gap** (declared
in Figma but unreachable) · **stripped** (junk excluded from the mirror).

**Scaling:** keep the last 20 runs here; archive older ones to `docs/design-system-log/YYYY.md`.

### 2026-08-30 · initial read

First read. No prior state to diff against.

**established**
- Canonical library fixed to `Tradl Design System` (decision 003).
- Six page node ids recorded, without which a cold session sees only "Cover".
- 86 of 154 variables harvested via `get_variable_defs` on seven consuming nodes, plus one gradient
  recovered from `get_design_context`.
- Every mirrored property carries a `--ds-` prefix. Figma names radii `radius/card` and primitives
  `color/green-400`, which land exactly on Tailwind's own `--radius-*` and `--color-*` theme
  namespaces; a `@theme` key repeating a declared property resolves to itself and the utility
  silently emits nothing. The prefix also makes provenance readable at the point of use.

**read**
- Semantics 45/48: full text, icon, bg, border, accent, radius, space, padding sets.
- Typography 11/23, all Inter. `text-xs` 10/14 through `text-lg` 18/24, plus `Display XXXL` Bold
  42/100. Note that `*/bold` tokens resolve to weight **500**, not 700; only `Display XXXL` is 700.
- Heatmap 6/7, Highlights 3/11, Primitives 18/42, Shadows 1/5.
- Effect styles `glass/surface` (drop shadow `#00000059` 0/12 blur 12, plus glass radius 4) and
  `glass/table` (glass radius 4).

**gap**
- All 18 Charts colors, plus 24 Primitives, 12 Typography, 8 Highlights, 4 Shadows. Cause: no
  component on the six pages consumes them.

**stripped**
- Six `var(--sds-*)` variables (`--sds-size-space-100/200/300`, `--sds-size-radius-200`,
  `--sds-color-text-neutral-default`, `--sds-color-icon-default-default`), left over from Figma's
  stock Simple Design System template.
- Bare duplicate aliases (`grey-300`, `grey-700`, `grey-750-80`) shadowing their `color/`-prefixed
  originals.

**resolved**
- `accent/gradient` returned an empty string from `get_variable_defs`, as gradient variables always
  do. Its stops were recovered from `get_design_context` on the primary button, which paints with
  it: `linear-gradient(180deg, #0f8f63 0%, #0b7350 100%)`. Read, not inferred. `border/glass` is
  still unresolved by the same mechanism and is not emitted.

**assets**
- Four logo SVGs to `public/brand/`, canvas rects stripped. Flagged: two greens across the files,
  `#00AF79` absent from the variable system.
- 84 icon components generated and geometrically verified.
- Wordmark generated as a component with `currentColor` ink so it works in both registers.



**app**
- Token layer replaced wholesale. `src/styles/tokens/` (the old Bento copy) deleted; nothing
  imported it any more.
- Flipped to Inter. `/dev/stack` migrated to the new utility names. (The light ground introduced here
  was reversed the same day; see the entry above.)
- Verified in the built CSS that every mapped utility emits a real declaration and that no custom
  property resolves to itself.
