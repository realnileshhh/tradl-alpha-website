import { AccentWord } from "@/components/ui/accent-word";
import { SHOW_LIFECYCLE_BAND, SHOW_TOOLKIT_EXPLORER } from "@/lib/flags";
import { SectionOpener } from "./section-opener";
import { StageShowcase } from "./stage-showcase";
import { ToolkitExplorer } from "./toolkit-explorer";
import { ToolkitGrid } from "./toolkit-grid";
import { TOOLKIT_DEK, TOOLKIT_EYEBROW, TOOLKIT_TITLE_BEAT, TOOLKIT_TITLE_LEAD } from "@/lib/site";

/**
 * H4 · The toolkit, doc 03 §3. The opener and the explorer: the stage control,
 * the tool list and the frame the real interface captures land in later.
 *
 * The headline no longer repeats the lifecycle wording, because the control
 * directly below it carries those words itself. It makes the section's claim
 * instead, and its last word takes the same brand gradient the hero's does,
 * through the shared <AccentWord>.
 *
 * THREE FLAGS FROM lib/flags REACH THIS SECTION.
 *
 *   SHOW_LIFECYCLE_BAND    off, so the numbered panel row that sat between the
 *                          opener and the tools does not render at all.
 *                          <StageShowcase> and everything under it is intact.
 *   SHOW_TOOLKIT_EXPLORER  off, so the tools are the bento grid rather than the
 *                          pinned tabbed explorer. A toggle, not a hide: one of
 *                          the two is always on the page.
 *   SHOW_ACT_STAGE         off, so whichever presentation is showing carries
 *                          Discover and Analyse only, and the dek's instrument
 *                          count follows it.
 *
 * No particle field. The dots belong to the hero, where they give the call to
 * action something to stand in; repeated behind every section they stop being
 * atmosphere and become wallpaper, and they compete with the rule's own bloom.
 *
 * From `lg` up the section is exactly one viewport tall and its contents are
 * sized to fit inside it, because this is the block the toolkit sequence pins.
 * The top padding is the height of the floating nav, since a pinned scene that
 * centres in the viewport centres under the nav as well, and the eyebrow rule
 * is the first thing that disappears behind it.
 * A pinned scene taller than the screen crops itself: the frame's bottom edge
 * sits below the fold for the whole sequence and no amount of centring recovers
 * it. Below `lg` the columns stack, the section is as tall as its content, and
 * nothing pins.
 */
export function ToolkitSection() {
  return (
    <section className="relative py-[var(--section-pad)]">
      <SectionOpener
        eyebrow={TOOLKIT_EYEBROW}
        dek={TOOLKIT_DEK}
        title={
          <>
            {TOOLKIT_TITLE_LEAD} <AccentWord>{TOOLKIT_TITLE_BEAT}</AccentWord>
          </>
        }
      />

      {/* The lifecycle band. Off, and its spacing goes with it: the wrapper is
          inside the condition rather than around it, so the explorer moves up
          to sit one gap under the opener instead of two. */}
      {SHOW_LIFECYCLE_BAND && (
        <div className="mt-[var(--section-gap)]">
          <StageShowcase />
        </div>
      )}

      <div className="mt-[var(--section-gap)]">
        {SHOW_TOOLKIT_EXPLORER ? <ToolkitExplorer /> : <ToolkitGrid />}
      </div>
    </section>
  );
}
