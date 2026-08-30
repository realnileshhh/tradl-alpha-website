# docs

## The brief is not in this repository

The specification this site is built against is confidential and is **deliberately absent**. It was
removed from every commit before the repository was made public, and `.gitignore` keeps it out.

What is missing, and what it holds:

| Path | Contents |
|---|---|
| `docs/00-brief/` | The handover package: positioning, the narrative spine, voice and lexicon bans, the SEBI Research Analyst compliance rails, the conversion architecture, the design guidelines, and a naming freeze covering seven unreleased tools |
| `docs/01-inspiration/` | Eleven competitor teardowns |
| `docs/02-product-context/` | Product one-pagers |
| `reference/` | Prior design artefacts: prototypes, screenshots, and a superseded token export |

You will see this material cited constantly and precisely in the code and in the other documents
here: "doc 01 §7" is the lexicon, "doc 04 §5" the performance budget, "doc 03 §3" the homepage
section spec. Those citations are load-bearing. Without the brief they read as dangling references,
and that is the cost of publishing the code without publishing the strategy.

**If you are working on this repo and do not have the brief, ask for it.** Do not infer the rules
from the citations: the whole point of the lexicon and the compliance rails is that they are exact.

If you do have it, drop the four directories back in at the paths above. They are gitignored, so
they will not be committed by accident.

---

## What is here

These four files are **ours**, written during the build. They describe the code rather than the
strategy, which is why they are public.

| File | What it is | When you read it |
|---|---|---|
| `DECISIONS.md` | Append-only log of choices that constrain future work, with the reasoning | Onboarding, or when questioning why something is the way it is |
| `DESIGN-SYSTEM.md` | How the Figma system mirrors into the repo, what is in it, and every sync's diff | Any time you touch tokens, icons, or brand assets |
| `MOTION.md` | What owns each kind of movement, the numbers, and what was discarded | Any time you animate anything, or touch scroll |
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

Both `DECISIONS.md` and `DESIGN-SYSTEM.md` carry their own scaling threshold at the top, saying when
to split, so a future session does not have to invent structure under pressure.
