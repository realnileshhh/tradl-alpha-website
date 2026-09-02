import { AccentWord } from "@/components/ui/accent-word";
import { SectionOpener } from "./section-opener";
import { StageShowcase } from "./stage-showcase";
import { ToolkitExplorer } from "./toolkit-explorer";
import { TOOLKIT_DEK, TOOLKIT_EYEBROW, TOOLKIT_TITLE_BEAT, TOOLKIT_TITLE_LEAD } from "@/lib/site";

/**
 * H4 · The toolkit, doc 03 §3. The opener, the status filter and the tool list;
 * the lifecycle band and the real interface captures land on top of this later.
 *
 * The headline no longer repeats the lifecycle triple, because the control
 * directly below it now carries those three words. It makes the section's claim
 * instead, and its last word takes the same brand gradient the hero's does,
 * through the shared <AccentWord>.
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

      <div className="mt-[var(--section-gap)]">
        <StageShowcase />
      </div>

      <div className="mt-[var(--section-gap)]">
        <ToolkitExplorer />
      </div>
    </section>
  );
}
