import { IconPlay } from "@/components/ui/icons";
import { AccentWord } from "@/components/ui/accent-word";
import { Frame, FrameInner } from "@/components/ui/surface";
import { SHOW_DOCTRINE_PILL, SHOW_HERO_DEMO_SCENE, SHOW_SEE_IT_COMPUTE } from "@/lib/flags";
import {
  DEMO_PLACEHOLDER,
  DOCTRINE_LABEL,
  HERO_DEK,
  HERO_NOTE,
  HERO_TITLE_BEAT,
  HERO_TITLE_LEAD,
  HERO_TITLE_TAIL,
  SEE_IT_COMPUTE_HREF,
  SEE_IT_COMPUTE_LABEL,
  START_FREE_LABEL,
} from "@/lib/site";
import { EmailCapture } from "./email-capture";
import { HeroChoreography } from "./hero-choreography";
import { HeroMedia } from "./hero-media";
import { HeroVideo } from "./hero-video";
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
 * THE SPLIT, which is what doc 05 §5's W1 prompt asked for in the first place.
 * The earlier version of this scene was a centred column with a demo frame
 * under it, and the file said why: the right half of the split was meant to be
 * the Playground terminal, and the Playground does not exist. It still does
 * not. What the right half holds now is the pane the product image lands in,
 * which is the same hierarchy the split was for, with an asset that can
 * actually arrive. See components/site/hero-media.
 *
 * So the reading order is the one a split hero is for: claim, then explanation,
 * then the ask, with the product beside them rather than below them. The email
 * row is the fold's only control.
 *
 * The type treatment carries the emotion, since the lexicon will not let
 * adjectives do it. One accent word in the headline, and nothing else coloured
 * in the whole scene. It sits on "proof" rather than on the last word, which is
 * a departure from the usual placement and a deliberate one: the sentence lands
 * on "guesswork", and putting the brand gradient on the thing the product is
 * not would colour the wrong half of the line.
 *
 * `items-center` rather than `items-start`. The two columns are close in height
 * and neither is the other's caption, so aligning their centres reads as one
 * object; aligning their tops leaves whichever is shorter hanging.
 *
 * ONE SCREEN, AND NOT A PIXEL LESS. The section takes a minimum height of the
 * viewport less the chrome above it (--hero-chrome, measured in
 * marketing/ground.css), and centres its content in whatever that comes to.
 *
 * The reason is the band this used to leave. Measured at 1440x900 the section
 * ran 179 to 668 inside a 900px screen, so the bottom 232px of the first paint
 * was the toolkit's top padding: a strip of bare ground under a scene whose
 * whole lower half is a background video. The video did not stop there because
 * it was meant to, it stopped because the section did.
 *
 * With the minimum in, the first screen is the hero end to end and the section
 * under it arrives on a scroll, which is what a full-bleed opening scene is
 * for. The padding stays as a floor rather than as the thing that sets the
 * height, so on a short viewport the content still gets its air and the section
 * simply grows past the fold.
 *
 * It is a MINIMUM and not a height. The demo scene, when it comes back, is
 * taller than a screen on its own and needs to be.
 *
 * THREE THINGS ARE HIDDEN HERE, not deleted, and every one of them is finished
 * code behind a flag in lib/flags: the doctrine pill above the headline, the
 * "See it compute" spark button under the ask, and the full-measure demo frame
 * with its scroll choreography. The reasoning for each is in that file, next to
 * the flag. Nothing about them was unwound to get them off the page.
 *
 * `data-hero-copy` and `data-hero-frame` are load-bearing. They are what the
 * choreography moves, and they are attributes rather than refs because this
 * stays a server component: only the wrapper hydrates. `data-hero-copy` stays
 * on the copy column while the demo scene is off, so turning it back on needs
 * no edit here.
 */
export function Hero() {
  return (
    <HeroChoreography>
      {/* `overflow-x: clip`, and it is a bug fix rather than housekeeping. An
          inset background layer is wider than the page on both edges. The
          section does not clip it, the pin spacer around this scene does not
          either, and the document ends up wider than the viewport: the whole
          page scrolls sideways. `clip` rather than `hidden` because `hidden`
          would make this a scroll container and the pin inside it would have
          nothing to pin against.

          `relative isolate` is what the video hangs off. The isolation matters
          as much as the positioning: the video layer sits at -z-10, and without
          a stacking context of its own here it would go behind the page rather
          than behind this section's content.

          NO BOTTOM BORDER, and it is not an oversight. This section carried
          `border-b border-line` and the rule was unanchored, because a border
          paints at the box edge and this box is pinned. Measured at 1440 by 900
          the line landed at y=1487 while the toolkit's headline did not start
          until 2048: a full-bleed hairline floating 560px above anything it
          could be separating. Worse, the distance is a function of viewport
          height, so on a shorter screen the same line lands inside the toolkit's
          cards and gets cut by them.

          The fix is not to move it. Doc 04 §2 puts hairline separators between
          instrument-register sections only and separates statement scenes by
          space, and this is the page's opening statement scene. Every other
          boundary on this page draws its rule as `border-t` on the section
          BELOW, which is a box nothing transforms. */}
      <section className="spill-top relative isolate flex min-h-[calc(100svh_-_var(--hero-chrome))] flex-col justify-center overflow-x-clip">
        {/* The background video, its scrim, and the control that unmutes it.
            Renders a still first and upgrades to the video after idle, so the
            hero's first paint is an 11KB picture and never a video decode.
            See components/site/hero-video. */}
        <HeroVideo />

        {/* Gutter outside, measure inside, so the media pane's edges land on
            the same verticals as the nav pane above it, not 24px inside them.

            `w-full` because the section is a flex column now: without it this
            child sizes to its content rather than to the section, and the
            measure inside it stops being centred. */}
        <div className="w-full px-[var(--content-gutter)]">
          <div className="mx-auto max-w-content pt-[var(--ds-space-7)] pb-[var(--section-gap)] sm:pt-[var(--section-pad)]">
            {/* One column until lg, and the order is the reading order: the
                claim and the ask come first on a phone, the picture follows.
                The gap is the section gap rather than a space token because at
                this scale it is separating two scenes, not two elements. */}
            <div className="grid items-center gap-[var(--section-gap)] lg:grid-cols-2">
              <div data-hero-copy>
                {/* The doctrine, as a label. No glyph: the ◈ is the brief's mark
                    for AI-derived content, and this line is a statement of
                    principle rather than a derived number, so the mark was
                    decorating rather than marking. */}
                {SHOW_DOCTRINE_PILL && (
                  <p className="inline-flex items-center rounded-full border px-[var(--ds-space-4)] py-[var(--ds-space-2)] text-xs tracking-[0.16em] text-accent-2 uppercase [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_35%,transparent)]">
                    {DOCTRINE_LABEL}
                  </p>
                )}

                {/* `max-w-[18ch]` holds the line to two at the top of the fluid
                    scale. Not `text-balance`: balancing a left-aligned headline
                    evens the line lengths, which pulls the second line in from
                    the margin the dek and the email row both sit on, and the
                    left edge is the whole structure of this column. */}
                <h1 className="max-w-[18ch] text-statement font-medium tracking-[var(--statement-tracking)] text-fg">
                  {HERO_TITLE_LEAD} <AccentWord>{HERO_TITLE_BEAT}</AccentWord>
                  {HERO_TITLE_TAIL}
                </h1>

                {/* 54ch rather than the centred version's 62: the column is
                    roughly half the measure now, and doc 04 §2's comfortable
                    line length is what decides this, not the column width. */}
                <p className="mt-[var(--ds-space-6)] max-w-[54ch] text-lg leading-[var(--dek-line)] text-pretty text-fg-2">
                  {HERO_DEK}
                </p>

                {/* The ask. The same control the close uses, so the page asks
                    the same way twice; `start` because this column is
                    left-aligned and the row is narrower than the column.
                    See components/site/email-capture. */}
                <EmailCapture
                  label={START_FREE_LABEL}
                  align="start"
                  className="mt-[var(--ds-space-7)]"
                />

                <p className="mt-[var(--ds-space-4)] text-xs text-fg-3">{HERO_NOTE}</p>

                {SHOW_SEE_IT_COMPUTE && (
                  <div className="mt-[var(--ds-space-6)]">
                    <SparkButton href={SEE_IT_COMPUTE_HREF}>{SEE_IT_COMPUTE_LABEL}</SparkButton>
                  </div>
                )}
              </div>

              {/* The pane the product image lands in. Named for the slot rather
                  than for whichever asset wins, and static, because it shares
                  the fold with the headline. */}
              <HeroMedia />
            </div>

            {/* The demo frame, and the scroll choreography that carries it to
                the centre of the viewport.

                OFF. See SHOW_HERO_DEMO_SCENE in lib/flags for why, and for what
                turning it back on restores. Everything below is exactly as
                built: `bezel` rather than the default frame, a thick housing
                around a screen, concentric by construction; static, so it can
                never become the LCP element's problem; full measure, so its
                edges land on the same verticals as the nav pane above it, which
                at 16:9 is about 700px tall including the bezel and still leaves
                air above and below when the choreography parks it in the centre
                of a laptop viewport.

                The placeholder inside it is empty on purpose: doc 05 §6 lists
                the Playground presets and the re-recorded demos as assets that
                do not exist yet, and a frame that says so is worth more than one
                filled with a stock loop. */}
            {SHOW_HERO_DEMO_SCENE && (
              <Frame
                size="bezel"
                data-hero-frame
                className="mt-[var(--section-gap)] w-full text-left"
              >
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
            )}
          </div>
        </div>
      </section>
    </HeroChoreography>
  );
}
