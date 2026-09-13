import { Reveal } from "@/components/motion/reveal";
import { StatusPill } from "@/components/ui/badge";
import {
  STAGE_LABEL,
  VISIBLE_TOOLS,
  VISIBLE_TOOL_STAGES,
  toolCountLabel,
  type Tool,
  type ToolStage,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import { TOOL_ICONS } from "./tool-icons";

/**
 * The toolkit as a bento, one labelled group per lifecycle stage.
 *
 * WHY THIS REPLACED THE TABBED EXPLORER. The explorer put a segmented control
 * between the visitor and the tools: to see the four in Analyse you first had to
 * know Analyse existed, decide it was the one you wanted, and click it. That is
 * a decision asked before any information is given, which is the shape Hick's
 * law penalises and the shape a marketing page can least afford, because the
 * thing being sold IS the breadth of the list. Everything is on screen now and
 * there is nothing to choose.
 *
 * It also cost about five viewports of pinned scroll to walk ten cards. The
 * explorer is intact behind SHOW_TOOLKIT_EXPLORER in lib/flags and can be put
 * back with one boolean; what it is not is the default.
 *
 * TWO GROUPS, NOT TEN CARDS. Ten equal tiles is a list a reader has to hold in
 * their head; six and four, each under its own name and count, is two facts.
 * The grouping is the argument the section is making, so it is drawn rather than
 * implied: each stage is a labelled region with a rule closing it off, which is
 * what makes the tiles inside it read as one set (the gestalt common-region and
 * proximity rules, and Miller on why the chunk is the unit that survives).
 *
 * THE SIZES ARE THE HIERARCHY. Every tile is built identically and only its
 * footprint changes, so the set reads as one family and the largest tile reads
 * as the way in rather than as a different kind of object. Discover opens on a
 * full-measure tile and steps down through an asymmetric pair to a row of three;
 * Analyse is four equal halves, quieter on purpose, because it is the second
 * argument rather than the first. First and last are what a reader keeps
 * (the serial-position effect), so the sequence starts on the biggest tile and
 * ends on an even row rather than trailing off into an orphan.
 *
 * NOTHING HERE IS CLICKABLE, and the tiles are built not to look it: no
 * interactive stroke, no hover state, no chevron. There is no per-tool page to
 * open yet, and a card that invites a click and does nothing is worse than one
 * that plainly sits still. The same argument is on <StageShowcase>.
 *
 * The wells are empty and textured rather than blank. Each one holds the
 * interface capture for its tool when those exist (doc 05 §6 lists them as
 * assets still to come); a scanline over bg/elevated reads as a surface waiting
 * for content, where flat black reads as a hole.
 */

/* -----------------------------------------------------------------------------
   The bento

   Twelve columns, whole-number spans, and nothing fractional: the arrangement
   has to resolve to an obviously simple shape at a glance or it reads as an
   accident rather than as a composition.

   WIDTH IS THE VARIABLE. HEIGHT IS NOT.

   Each tile used to carry its own min-height, four unrelated figures typed
   beside four column spans, and the grid paid for it twice. The wells inside
   them landed anywhere between 2.4:1 and 5:1, so ten tiles built identically
   still did not read as one set; and there was no answer to "how tall is the
   next one", because the existing heights did not imply one. Adding a tool
   meant guessing.

   Nothing here sets a height now. A tile is a well over a text block, the text
   block is the same on every tile by construction, and the only thing authored
   is which of two steps the well takes: --tile-well, or twice it. Every
   standard tile therefore comes out the same height whatever its span, and the
   feature tile comes out exactly one step taller. The derivation for the unit
   itself is on the token in marketing/ground.css.

   A tool added to lib/site inherits all of that. It picks a width.
   -------------------------------------------------------------------------- */

const SPAN_FULL = "lg:col-span-12";
const SPAN_TWO_THIRDS = "lg:col-span-8";
const SPAN_HALF = "lg:col-span-6";
const SPAN_THIRD = "lg:col-span-4";

/** A well at the base step, or at twice it. There is no third option. */
const WELL = "min-h-[var(--tile-well)]";
const WELL_TALL = "min-h-[var(--tile-well-tall)]";

type TileShape = {
  /** How much of the twelve-column measure this tile takes. */
  span: string;
  /** The one tile in a group that opens it. Everything else is the base step. */
  tall?: boolean;
};

/**
 * The shape of each group, indexed by a tool's position within its stage.
 *
 * The counts are the wireframe's and the brief's: six in Discover, four in
 * Analyse, two in Act. Discover opens on the full measure and steps down to a
 * two-thirds pair and a row of three; Analyse is four halves, quieter on
 * purpose. Only Discover's first tile takes the tall well, because a group can
 * only have one way in.
 *
 * A stage that grows past its row falls back to a half tile at the base step,
 * so adding a tool to lib/site lands somewhere sensible rather than dropping
 * out of the grid.
 */
const STAGE_LAYOUT: Record<ToolStage, readonly TileShape[]> = {
  discover: [
    { span: SPAN_FULL, tall: true },
    { span: SPAN_TWO_THIRDS },
    { span: SPAN_THIRD },
    { span: SPAN_THIRD },
    { span: SPAN_THIRD },
    { span: SPAN_THIRD },
  ],
  analyse: [
    { span: SPAN_HALF },
    { span: SPAN_HALF },
    { span: SPAN_HALF },
    { span: SPAN_HALF },
  ],
  act: [{ span: SPAN_HALF }, { span: SPAN_HALF }],
};

const FALLBACK: TileShape = { span: SPAN_HALF };

function ToolTile({ tool, shape }: { tool: Tool; shape: TileShape }) {
  const Icon = TOOL_ICONS[tool.icon];

  return (
    /* Concentric by construction, docs/SURFACES.md: radius/input 20 outside,
       space/4 12 of padding, radius/md 8 inside. It is the same pairing the
       demo frame's `bezel` uses, and the one radius on the scale that leaves a
       well with a soft enough corner to read as a screen.

       NO HEIGHT ON THE TILE. It is exactly as tall as the well plus the text
       block, which is what makes every standard tile agree without any of them
       being told to. */
    <article
      className={cn("surface surface-lit flex flex-col rounded-input p-[var(--ds-space-4)]", shape.span)}
    >
      {/* The well carries the height for the whole tile.

          `flex-1` as well as the minimum, so a tile that is stretched by a
          taller neighbour in its grid row gives the extra space to the picture
          rather than leaving a gap under the text. The minimum is what it is
          worth on its own; the grow is what keeps a row honest. */}
      <div
        aria-hidden="true"
        className={cn(
          "texture-scanline flex-1 rounded-md border border-line bg-elevated",
          shape.tall ? WELL_TALL : WELL
        )}
      />

      <div className="mt-[var(--ds-space-5)]">
        {/* THE STATUS SITS NEXT TO THE NAME, not at the far end of the row.
            
            It was `flex-1` on the name with the pill pushed right, which is the
            reflex for a card header and is wrong at this range of widths: on the
            full-measure tile it put "LIVE" 1,000px from the words it qualifies,
            reading as a corner ornament rather than as that tool's state, while
            on a third-width tile the same markup put it right beside the name.
            One rule, two unrelated-looking results.
            
            Clustered left, the three pieces are one object at every tile size,
            which is what proximity is for. `flex-wrap` is the safety net: at
            1024 the narrowest tile is 315px and the longest cluster measures
            about 271px, so it does not wrap today, and if a longer tool name
            lands it drops the pill to a second line instead of overflowing. */}
        <div className="flex flex-wrap items-center gap-x-[var(--ds-space-4)] gap-y-[var(--ds-space-3)]">
          <span className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-surface text-fg-2 shadow-spec">
            {Icon ? (
              <span className="grid size-4 place-items-center">
                <Icon />
              </span>
            ) : null}
          </span>

          <h4 className="text-base font-medium text-fg">{tool.name}</h4>

          <StatusPill status={tool.status} className="shrink-0" />
        </div>

        {/* TWO LINES OF ROOM, ALWAYS, so a row of tiles stays aligned.
            
            The text block sits at the bottom of the tile and the well takes what
            is left, so a tagline that wraps to two lines pushes that tile's name
            row up and its well down while its neighbours' stay put. Measured at
            1024, the narrowest viewport the site serves: the longest tagline is
            54 characters and wraps to two lines in a 291px column while the
            other five in that group hold one, and the row read as three cards
            that had been nudged.
            
            So the space is reserved rather than earned. It is a minimum and not
            a clamp: nothing is ever truncated, because these are customer-facing
            lines from the copy library and a clipped one is a changed one. A
            tagline long enough to need a third line would grow its own tile and
            misalign exactly as before, which is the honest failure and is a
            reason to shorten the tagline rather than to hide it. */}
        <p className="mt-[var(--ds-space-3)] min-h-[calc(2*1.6*var(--ds-font-size-sm))] text-sm leading-[1.6] text-pretty text-fg-3">
          {tool.tagline}
        </p>
      </div>
    </article>
  );
}

export function ToolkitGrid() {
  return (
    <div className="px-[var(--content-gutter)]">
      <div className="mx-auto flex max-w-content flex-col gap-[var(--section-gap)]">
        {VISIBLE_TOOL_STAGES.map((stage) => {
          const tools = VISIBLE_TOOLS.filter((tool) => tool.stage === stage.value);
          const layout = STAGE_LAYOUT[stage.value];

          return (
            <section key={stage.value} aria-labelledby={`toolkit-${stage.value}`}>
              {/* The group header. Name, count, then a rule that runs out to the
                  measure and fades: the same device the section opener uses one
                  level up, at the quieter end of the type scale and without the
                  accent stop, so it reads as a subdivision of that section
                  rather than as a new one. See .group-rule in globals.css.

                  The count is there because it is the fact the header is making.
                  A visitor who reads "Discover · 6 tools" knows the size of what
                  follows before scanning it, which is the whole job of a label
                  over a grid. */}
              <div className="flex items-center gap-[var(--ds-space-5)]">
                <h3
                  id={`toolkit-${stage.value}`}
                  className="shrink-0 text-lg font-medium text-fg"
                >
                  {STAGE_LABEL[stage.value]}
                </h3>

                <span className="num shrink-0 text-sm text-fg-3">
                  {toolCountLabel(tools.length)}
                </span>

                <span aria-hidden="true" className="group-rule min-w-0 flex-1" />
              </div>

              {/* One trigger for the whole group, staggered across the tiles.
                  Ten tiles on ten triggers would spend a quarter of the page's
                  budget (doc 04 §5 caps a page at forty) on one section. */}
              <Reveal
                stagger
                className="mt-[var(--ds-space-6)] grid grid-cols-1 gap-[var(--ds-space-5)] lg:grid-cols-12"
              >
                {tools.map((tool, position) => (
                  <ToolTile key={tool.name} tool={tool} shape={layout[position] ?? FALLBACK} />
                ))}
              </Reveal>
            </section>
          );
        })}
      </div>
    </div>
  );
}
