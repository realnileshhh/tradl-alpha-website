import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { AccentWord } from "@/components/ui/accent-word";
import { FOUNDERS, FOUNDERS_EYEBROW, FOUNDERS_TITLE_BEAT, FOUNDERS_TITLE_LEAD } from "@/lib/site";
import { SectionOpener } from "./section-opener";

/**
 * H8 · Why we're building this, doc 03 §3.
 *
 * Two quotes, at the same weight, in the same card. The temptation with a
 * founder section is to rank the founders, with one photo large and one small
 * or one quote leading; a two-up grid with identical cards says the thing the
 * company would say about itself, which is that these are two people rather
 * than a founder and a co-founder.
 *
 * The cards are glass, and the glow behind them is what makes that mean
 * anything. A backdrop blur over a flat black page blurs nothing: the effect
 * needs something behind it to diffuse. So a wide, very low alpha bloom sits
 * under the pair, one lobe per card, and the cards blur it. The rest is the
 * surface language unchanged: the directional lit fill, a hairline, a top
 * specular, and its own compositing layer through the `glass` class, without
 * which Safari drops the blur entirely.
 *
 * These are the only two blurred surfaces in this section, which is the ceiling
 * docs/SURFACES.md sets per viewport. They are also far below the fold, so the
 * cost lands nowhere near the LCP budget in doc 04 §5.
 *
 * The portraits are cropped square around the face and served as WebP at 512,
 * displayed at 56, so they stay sharp on a 3x screen and still cost 22KB each.
 * They sit at the bottom of the card, after the quote, because the argument is
 * the point and the face is the attribution.
 */
export function FoundersSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line py-[var(--section-pad)]">
      <SectionOpener
        eyebrow={FOUNDERS_EYEBROW}
        title={
          <>
            {FOUNDERS_TITLE_LEAD} <AccentWord>{FOUNDERS_TITLE_BEAT}</AccentWord>
          </>
        }
      />

      <div className="relative mt-[var(--section-gap)] px-[var(--content-gutter)]">
        {/* What the glass has to work with. Two lobes, sitting under the two
            cards, at an alpha low enough that it reads as depth rather than as
            a colour. */}
        <span aria-hidden="true" className="founders-aura" />

        <Reveal
          register="instrument"
          stagger
          className="relative mx-auto grid max-w-content gap-[var(--ds-space-6)] lg:grid-cols-2"
        >
          {FOUNDERS.map((founder) => (
            <article
              key={founder.name}
              className="glass surface-lit flex h-full flex-col rounded-container border border-line p-[var(--ds-padding-card-lg)] shadow-card backdrop-blur-panel"
            >
              <blockquote className="flex-1 text-base leading-[1.75] text-fg-2">
                {founder.quote}
              </blockquote>

              <div className="mt-[var(--ds-space-6)] flex items-center gap-[var(--ds-space-4)] border-t border-line pt-[var(--ds-space-5)]">
                <Image
                  src={founder.portrait}
                  alt={founder.name}
                  width={112}
                  height={112}
                  className="size-14 shrink-0 rounded-full border border-line object-cover shadow-spec"
                />
                <div>
                  <p className="text-base font-medium text-fg">{founder.name}</p>
                  <p className="mt-[var(--ds-space-1)] text-xs tracking-[0.12em] text-fg-3 uppercase">
                    {founder.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
