# docs · what is in here and where it came from

Everything under `docs/` and `reference/` is **source material**, copied on 30 Aug 2026 from
`~/Downloads/Personal/Tradl AI/New Website - Alpha Launch`. That folder is left untouched and stays
the archival original. Nothing here is authored by the build — files are verbatim, only renamed and
re-nested.

Read order for a cold start: `00-brief/00-README.md` → `01-brand-identity-book` → `03-website-content-structure`
→ `04-website-design-guidelines` → `05-claude-design-handover`.

---

## `00-brief/` · the handover package (binding)

The five-document package dated 16 Aug 2026. This is the specification the site is built against.

| File | What it settles |
|---|---|
| `00-README.md` | Package manifest, the locked decisions, four open flags |
| `01-brand-identity-book.md` | Positioning, narrative spine, voice, **lexicon bans**, compliance rails |
| `02-visual-storytelling-guidelines.md` | The one feeling, five devices, imagery + motion + chart doctrine, scenes S1–S6, kill list |
| `03-website-content-structure.md` | Conversion architecture, CTA ladder, P0/P1 site map, per-section specs, signup instrumentation |
| `04-website-design-guidelines.md` | Two registers, layout system, component behaviour, performance budgets, a11y floor |
| `05-claude-design-handover.md` | W0–W9 build prompts, gates G1–G4, mock data contracts, copy library, asset gaps, naming freeze, QA checklist |
| `06-master-prompt-source.md` | Verbatim transcription of the founder PDF. **Context only — see the precedence note in its header.** |
| `06-master-prompt-source.pdf` | The original, kept for fidelity |

### Precedence

`00-README.md` supersedes `06-master-prompt-source`. The PDF predates the package and carries a
broking/licence narrative and a fundraise that the package explicitly locks out. When the two
disagree, 00–05 is what ships.

## `01-inspiration/` · 11 competitor teardowns

Renamed from the original handoff filenames to slugs. Split by market because the Indian set shares
regulatory framing and density conventions the global set does not.

| Now | Was |
|---|---|
| `india/fyers.md` | `FYERS_Inspiration_Handoff.md` |
| `india/groww-915.md` | `groww915inspirationhandoff.md` |
| `india/indmoney.md` | `indmoneyinspirationhandoff.md` |
| `india/powerup-money.md` | `powerupmoneyinspirationhandoff.md` |
| `india/sahi.md` | `sahiinspirationhandoff.md` |
| `india/smallcase.md` | `tradlaiinspirationsmallcase.md` |
| `india/tickertape.md` | `tickertapeinspirationhandoff.md` |
| `india/upstox.md` | `upstoxinspirationhandoff.md` |
| `global/flora-ai.md` | `uploads/floraaiinspirationhandoff.md` |
| `global/public-com.md` | `publiccominspirationhandoff.md` |
| `global/robinhood.md` | `ROBINHOOD_DESIGN_INSPIRATION_TRADL_AI.md` |

## `02-product-context/` · what the product actually does

| Now | Was |
|---|---|
| `backtesting-one-pagers.md` | `uploads/Tradl_Backtesting_Module_One_Pagers.md` |
| `explore-surface-one-pagers.md` | `uploads/Tradl_Explore_Surface_One_Pagers (1).md` |

---

## What we author

Everything above is **received** material, copied in verbatim and never edited. The four files below
are **ours**, written during the build. They are separate from the brief so it stays a clean record
of what arrived rather than what we decided afterwards.

| File | What it is | When you read it |
|---|---|---|
| `DECISIONS.md` | Append-only log of choices that constrain future work, with the reasoning | Onboarding, or when questioning why something is the way it is |
| `DESIGN-SYSTEM.md` | How the Figma system mirrors into the repo, what is in it, and every sync's diff | Any time you touch tokens, icons, or brand assets |
| `MOTION.md` | What owns each kind of movement, the numbers, and what was discarded from the source spec | Any time you animate anything, or touch scroll |
| `SURFACES.md` | How a component is built: material, strokes, elevation, glass, layering, geometry | Any time you build or restyle a component |

Five surfaces total, split by **lifecycle and reader**, not by topic:

- **`CLAUDE.md`** is loaded into context every session, so it carries rules only. No procedure, no
  history. Every line there costs tokens on every single request, which is the discipline that keeps
  it short.
- **`docs/DECISIONS.md`** is append-only and rarely re-read in full.
- **`docs/DESIGN-SYSTEM.md`** is a handbook plus a log, read on demand.
- **`docs/MOTION.md`** and **`docs/SURFACES.md`** are handbooks, read on demand. They are separate
  because they answer different questions and are opened by different work: one is "how does this
  move", the other is "how is this built".

Machine-written state lives in `src/design-system/provenance.json` and never in prose, because prose
records of machine state go stale silently.

`DECISIONS.md` carries its own scaling threshold at the top (when to split by year), so a future
session does not have to invent structure under pressure.

---

## `reference/` · non-binding artefacts

Kept out of `docs/` because none of it is a specification — it is prior output and raw assets.

- **`reference/canvas/`** — the 10 Claude Design `.dc.html` prototypes plus `support.js`. Self-contained
  pages; they fetch React and Babel from a CDN, so they need network to open. Re-importable into
  Claude Design.
- **`reference/screens/`** — 17 pasted screenshots referenced by the wireframe canvas.
- **`reference/design-system/`** — the Figma-derived token export
  (`tradl-ai-design-system-7cfe07d6…`): `tokens/{colors,typography,spacing,effects,fonts}.css`,
  `_ds_manifest.json`, `_ds_bundle.js`, and an oxlint adherence config. **This is the upstream source
  of truth for tokens.** The app consumes a copy at `src/styles/tokens/`; when Figma changes, re-export
  here first, then sync forward.

---

## What was dropped in the copy, and why

The source folder had 78 files; 58 landed here. The 20 that did not:

- `Tradl AI Website Wireframe/uploads/Landing Page Inspirations/*` — 10 files, byte-identical to the
  top-level `Landing Page Inspirations/` (verified by checksum).
- `Tradl AI Website Wireframe/uploads/files (7)/*` — 5 files, byte-identical to the handover package.
- `Tradl_Backtesting_Module_One_Pagers-f02ec3a6.md`, `Tradl_Explore_Surface_One_Pagers (1)-a3f04881.md`
  — hash-suffixed duplicates of the files kept.
- `.DS_Store`, `.thumbnail` — macOS and Claude Design cruft.

No unique content was dropped.
