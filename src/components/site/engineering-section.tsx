import { AccentWord } from "@/components/ui/accent-word";
import {
  ENGINEERING_DEK,
  ENGINEERING_EYEBROW,
  ENGINEERING_TITLE_BEAT,
  ENGINEERING_TITLE_LEAD,
} from "@/lib/site";
import { EngineeringOrbit } from "./engineering-orbit";
import { SectionOpener } from "./section-opener";

/**
 * The engineering underneath. Sits between the founders and the FAQ.
 *
 * NOT IN DOC 03 §3. The homepage spec runs H0 to H9 and this is not one of them;
 * it comes from the v2 home prototype, which puts it exactly here, and the
 * substance is doc 02's backtesting one-pager. The placement is the argument:
 * the founders have just claimed the engine never flatters you, and this is the
 * six places it refuses to.
 *
 * REGISTER. Instrument, despite the size of the scene. The two registers differ
 * by scale and density, not by colour or by whether something moves (doc 04 §1),
 * and what is on screen here is six hairline-bordered cards of dense technical
 * copy. The bull is the section's one piece of atmosphere and it carries no
 * claim, which is why it can be that large without the section becoming a
 * statement scene. The page's statement budget is still spent where it was: the
 * hero and the close.
 *
 * NO `overflow: hidden` ON THIS SECTION. The orbit's stage is `position: sticky`
 * and a clipping ancestor silently turns sticky back into static. That is the
 * kind of bug that looks like a broken animation rather than like a CSS
 * property, so it is worth the comment.
 *
 * NO FOOTER KICKER. The prototype closes the section with "Deliberately
 * conservative. Deterministic to the last paisa. Descriptive, never advisory."
 * It was built and then cut on review: the six cards already say all three
 * things in their own words, and a line restating them under a rule reads as a
 * caption apologising for the section above it. Doc 04 §2 makes the kicker
 * optional and this is a section that does not need one. The compliance
 * substance is not lost either way, since the RA perimeter is stated in full in
 * the footer sitewide.
 */
export function EngineeringSection() {
  return (
    <section id="engineering" className="relative border-t border-line pt-[96px] pb-[96px]">
      <SectionOpener
        eyebrow={ENGINEERING_EYEBROW}
        dek={ENGINEERING_DEK}
        title={
          <>
            {ENGINEERING_TITLE_LEAD} <AccentWord>{ENGINEERING_TITLE_BEAT}</AccentWord>
          </>
        }
      />

      <div className="mt-[56px]">
        <EngineeringOrbit />
      </div>
    </section>
  );
}
