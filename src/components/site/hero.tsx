import { IconPlay } from "@/components/ui/icons";
import { AccentWord } from "@/components/ui/accent-word";
import { Frame, FrameInner } from "@/components/ui/surface";
import {
  DEMO_PLACEHOLDER,
  DOCTRINE_LABEL,
  HERO_DEK,
  HERO_NOTE,
  HERO_TITLE_BEAT,
  HERO_TITLE_LEAD,
  SEE_IT_COMPUTE_HREF,
  SEE_IT_COMPUTE_LABEL,
  START_FREE_LABEL,
} from "@/lib/site";
import { EmailCapture } from "./email-capture";
import { HeroChoreography } from "./hero-choreography";
import { ParticleField } from "./particle-field";
import { SparkButton } from "./spark-button";

/**
 * H1, doc 03 §3. Statement register, and the only statement scene above the
 * fold: everything below it returns to instrument.
 *
 * NOT wrapped in <Reveal>, and it never should be. Reveal starts its subject at
 * opacity 0, which would make the headline, the page's LCP element, wait for
 * hydration before it paints. Doc 04 §5 wants the first screen painted as a
 * finished static and the JavaScript to upgrade it afterwards. Everything in
 * this file paints in the first frame; the scroll choreography in
 * <HeroChoreography> only starts once the page moves.
 *
 * Centred rather than the split layout doc 05 §5's W1 prompt describes, because
 * the right half of that layout is the Playground terminal and the Playground
 * does not exist yet. A centred column with a demo frame under it is the honest
 * version of the same hierarchy; when the terminal lands, this becomes the left
 * column and the frame becomes the right one.
 *
 * The type treatment carries the emotion, since the lexicon will not let
 * adjectives do it. One accent word at the end of the headline, one hairline
 * eyebrow above it, and nothing else coloured in the whole scene.
 *
 * Two data attributes are load-bearing. `data-hero-copy` and `data-hero-frame`
 * are what the choreography moves, and they are attributes rather than refs
 * because this stays a server component: only the wrapper hydrates.
 */
export function Hero() {
  return (
    <HeroChoreography>
      <section className="spill-top border-b border-line">
        {/* Gutter outside, measure inside, so the demo frame's edges land on
            the same verticals as the nav pane above it, not 24px inside them. */}
        <div className="px-[var(--content-gutter)]">
          <div className="mx-auto max-w-content pt-[var(--ds-space-7)] pb-[72px] text-center sm:pt-[72px]">
            <div data-hero-copy>
              {/* The doctrine, as a label. No glyph: the ◈ is the brief's mark
                  for AI-derived content, and this line is a statement of
                  principle rather than a derived number, so the mark was
                  decorating rather than marking. */}
              <p className="inline-flex items-center rounded-full border px-[var(--ds-space-4)] py-[var(--ds-space-2)] text-xs tracking-[0.16em] text-accent-2 uppercase [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_35%,transparent)]">
                {DOCTRINE_LABEL}
              </p>

              <h1 className="mx-auto mt-[var(--ds-space-6)] max-w-[16ch] text-statement font-medium tracking-[var(--statement-tracking)] text-balance text-fg">
                {HERO_TITLE_LEAD}{" "}
                <AccentWord>{HERO_TITLE_BEAT}</AccentWord>
              </h1>

              <p className="mx-auto mt-[var(--ds-space-6)] max-w-[62ch] text-lg leading-[var(--dek-line)] text-balance text-fg-2">
                {HERO_DEK}
              </p>

              {/* The action cluster, standing in its own field of dots. */}
              <div className="relative isolate">
                <ParticleField className="absolute -inset-x-[18%] -inset-y-[45%] -z-10" />

                {/* The same control the close uses, so the page asks the
                    same way twice. See components/site/email-capture. */}
                <EmailCapture label={START_FREE_LABEL} className="mt-[var(--ds-space-7)]" />

                <p className="mt-[var(--ds-space-4)] text-xs text-fg-3">{HERO_NOTE}</p>

                <div className="mt-[var(--ds-space-6)]">
                  <SparkButton href={SEE_IT_COMPUTE_HREF}>{SEE_IT_COMPUTE_LABEL}</SparkButton>
                </div>
              </div>
            </div>

            {/* The demo frame. Empty on purpose: doc 05 §6 lists the Playground
                presets and the re-recorded demos as assets that do not exist
                yet, and a frame that says so is worth more than one filled with
                a stock loop.

                `bezel` rather than the default frame: a thick housing around a
                screen, concentric by construction. Static, so it can never
                become the LCP element's problem, and it is what the scroll
                choreography carries to the centre of the viewport. */}
            {/* Full measure, so its edges land on the same verticals as the
                nav pane above it. At 16:9 that is about 700px tall including
                the bezel, which still leaves air above and below when the
                choreography parks it in the centre of a laptop viewport. */}
            <Frame size="bezel" data-hero-frame className="mt-[64px] w-full text-left">
              <FrameInner size="bezel" className="relative aspect-video">
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-[var(--ds-space-4)]">
                  <span className="grid size-14 place-items-center rounded-full border border-line bg-surface text-fg-2 shadow-spec">
                    <span className="grid size-6 place-items-center">
                      <IconPlay />
                    </span>
                  </span>
                  <span className="text-sm text-fg-3">{DEMO_PLACEHOLDER}</span>
                </span>
              </FrameInner>
            </Frame>
          </div>
        </div>
      </section>
    </HeroChoreography>
  );
}
