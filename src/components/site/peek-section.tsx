import { Reveal } from "@/components/motion/reveal";
import { AccentWord } from "@/components/ui/accent-word";
import {
  PEEK_DEK,
  PEEK_EYEBROW,
  PEEK_PLACEHOLDER,
  PEEK_SURFACES,
  PEEK_TITLE_BEAT,
  PEEK_TITLE_LEAD,
} from "@/lib/site";
import { PeekCarousel } from "./peek-carousel";
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
    <section className="relative isolate overflow-hidden border-t border-line py-[var(--section-pad)]">
      <SectionOpener
        eyebrow={PEEK_EYEBROW}
        dek={PEEK_DEK}
        title={
          <>
            {PEEK_TITLE_LEAD} <AccentWord>{PEEK_TITLE_BEAT}</AccentWord>
          </>
        }
      />

      <Reveal register="instrument" className="mt-[var(--section-gap)]">
        {/* One panel per surface, in PEEK_SURFACES' order, still rendered here
            on the server and handed to the client carousel: the carousel is the
            only interactive part and nothing in a panel belongs in its bundle.
            Drawings of the four screens stood here until 2 Sep 2026; see the
            note on PEEK_PLACEHOLDER for why they came out. */}
        <PeekCarousel panels={PEEK_SURFACES.map((surface) => <PeekPanel key={surface.name} />)} />
      </Reveal>
    </section>
  );
}

/**
 * The well inside a window.
 *
 * Textured rather than blank, the same way the lifecycle band's wells are: a
 * large dark rectangle with nothing in it reads as a hole, and with the scanline
 * over it reads as a surface waiting for its content. The window's own bar names
 * the surface and its caption says what it does, so this line is the only thing
 * left to say.
 */
function PeekPanel() {
  return (
    <div className="texture-scanline grid h-full place-items-center px-[var(--ds-space-6)]">
      <p className="text-center text-sm text-fg-disabled">{PEEK_PLACEHOLDER}</p>
    </div>
  );
}
