import { AccentWord } from "@/components/ui/accent-word";
import {
  CLOSE_BEAT_ACCENT,
  CLOSE_BEAT_LEAD,
  CLOSE_PROOF_ITEMS,
  CLOSE_TITLE_BEAT,
  CLOSE_TITLE_LEAD,
  CLOSE_TITLE_TAIL,
  HERO_NOTE,
  START_FREE_LABEL,
} from "@/lib/site";
import { EmailCapture } from "./email-capture";
import { ParticleField } from "./particle-field";

/**
 * H9 · The close, doc 03 §3. Statement register, and the last thing on the page.
 *
 * WHAT CHANGED AND WHY. The first version was a headline, a line, a button and
 * a grey caption, floating in a lot of black. Two things were wrong with it.
 * The button was a smaller ask than the hero's: a visitor who scrolled the whole
 * page arrived at a control that did less than the one they had already passed.
 * And the proof was a single dim sentence, which is how three separate,
 * checkable claims get read as a caption and skipped.
 *
 * So the close now repeats the hero's own control, the single field and its
 * button, which is the low-friction form the conversion pattern for this kind
 * of page asks for; and the three facts are three chips, because that is what
 * they are.
 *
 * The scene is sealed top and bottom rather than fading into the footer: a
 * fading rule above, the dot field behind, and a warm beat under the headline.
 *
 * The beat is the page's one warm line, doc 01 §7. The rule asks for serif
 * italic; there is no serif on this site (docs/DECISIONS.md 002), so it is
 * italic Inter and the gap is reported rather than solved by loading a face for
 * one line.
 *
 * NO SCARCITY. The prototype closes with "Claim your seat · {n} left". Doc 03
 * §1.4 bans fake scarcity outright and there is no real number, so the ask is
 * the locked CTA and the facts under it are already true.
 */
export function CloseSection() {
  return (
    <section className="relative isolate overflow-hidden py-[128px] text-center">
      <ParticleField className="absolute inset-0 -z-10" />

      <div className="divider-fade absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="px-[var(--content-gutter)]">
        <h2 className="mx-auto max-w-[18ch] text-statement font-medium tracking-[var(--statement-tracking)] text-balance text-fg">
          {CLOSE_TITLE_LEAD} <AccentWord>{CLOSE_TITLE_BEAT}</AccentWord> {CLOSE_TITLE_TAIL}
        </h2>

        <p className="mt-[var(--ds-space-5)] text-lg text-fg-3 italic">
          {CLOSE_BEAT_LEAD} <span className="text-accent-2">{CLOSE_BEAT_ACCENT}</span>
        </p>

        <EmailCapture label={START_FREE_LABEL} className="mt-[var(--ds-space-7)]" />

        <p className="mt-[var(--ds-space-4)] text-xs text-fg-3">{HERO_NOTE}</p>

        {/* Three chips, not one line. Each is a separate claim a visitor can go
            and check, and the dot is the only ornament: instrument register, so
            no icons and no colour beyond the accent. */}
        <ul className="mt-[var(--ds-space-7)] flex flex-wrap items-center justify-center gap-[var(--ds-space-3)]">
          {CLOSE_PROOF_ITEMS.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-[var(--ds-space-3)] rounded-full border border-line bg-surface px-[var(--ds-space-5)] py-[var(--ds-space-2)] text-xs text-fg-2 shadow-spec"
            >
              <span
                aria-hidden="true"
                className="size-[5px] rounded-full [background-color:var(--ds-accent-secondary)]"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
