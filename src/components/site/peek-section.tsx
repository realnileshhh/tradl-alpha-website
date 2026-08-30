import { Reveal } from "@/components/motion/reveal";
import { AccentWord } from "@/components/ui/accent-word";
import { PEEK_DEK, PEEK_EYEBROW, PEEK_TITLE_BEAT, PEEK_TITLE_LEAD } from "@/lib/site";
import { PeekCarousel } from "./peek-carousel";
import { SurfaceBacktest } from "./peek/surface-backtest";
import { SurfaceExplore } from "./peek/surface-explore";
import { SurfaceRotation } from "./peek/surface-rotation";
import { SurfaceScreens } from "./peek/surface-screens";
import { SectionOpener } from "./section-opener";

/**
 * H6 · The sneak peek, between the toolkit and the founders.
 *
 * The toolkit above argues that the tools share one memory; this shows what
 * four of them look like. It is the last instrument-register block before the
 * page turns to people and questions, so it stays a set of windows rather than
 * a scene: same bezel frame as the hero's demo and the toolkit's deck, so the
 * three read as the same object seen three times.
 *
 * `overflow-hidden` on the section is load-bearing. The carriage is wider than
 * the measure by design, and this is what clips the windows either side of the
 * active one at the page edge. Without it they push the document wider and the
 * whole page scrolls sideways.
 *
 * One <Reveal> around the whole block, not one per window: the windows are a
 * set, and a set that arrives in four beats reads as four separate things.
 */
export function PeekSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line py-[96px]">
      <SectionOpener
        eyebrow={PEEK_EYEBROW}
        dek={PEEK_DEK}
        title={
          <>
            {PEEK_TITLE_LEAD} <AccentWord>{PEEK_TITLE_BEAT}</AccentWord>
          </>
        }
      />

      <Reveal register="instrument" className="mt-[56px]">
        {/* The four surfaces are rendered here, on the server, and handed to
            the client carousel as children. A dense product miniature is a lot
            of markup and none of it is interactive, so none of it belongs in
            the JavaScript bundle. The order is PEEK_SURFACES' order. */}
        <PeekCarousel
          panels={[
            <SurfaceExplore key="explore" />,
            <SurfaceScreens key="screens" />,
            <SurfaceBacktest key="backtest" />,
            <SurfaceRotation key="rotation" />,
          ]}
        />
      </Reveal>
    </section>
  );
}
