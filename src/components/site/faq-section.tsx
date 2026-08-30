import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { IconAdd, IconArrowPointRight } from "@/components/ui/icons";
import {
  FAQS,
  FAQ_EYEBROW,
  FAQ_LEAD,
  FAQ_LINK_HREF,
  FAQ_LINK_LABEL,
  FAQ_TITLE,
} from "@/lib/site";

/**
 * The FAQ, doc 03 §5 T6's pattern on the homepage.
 *
 * TWO COLUMNS, because one was wrong. A single centred stack left the headline
 * alone at the top of a very wide band with nothing beside it, and the
 * questions read as a list of hairlines rather than as a part of the page. The
 * heading now holds the left column and sticks while the questions scroll past
 * it, which is the standard reference-document shape and the one place on this
 * page where that shape is right: these are things a visitor scans for, not
 * things they read in order.
 *
 * The rows are surfaces now rather than rules. Each question is a card in the
 * instrument register, so the section is made of the same material as the rest
 * of the page, and opening one moves its stroke to the visible step, which is
 * the hover language every other surface here speaks.
 *
 * STILL <details> AND <summary>, with no JavaScript. A hand-rolled accordion
 * has to reimplement four things the browser already does: focus, Enter and
 * Space, the expanded state announced to a screen reader, and find-in-page
 * reaching text inside a collapsed panel. Doc 04 §7 requires the first three.
 * `name` makes it exclusive in one attribute; where a browser does not support
 * that yet, the panels open independently, which is a fine answer.
 *
 * The first is open on arrival. A wall of five closed rows asks the visitor to
 * work before it gives them anything, and the first answer is the one that
 * matters most: no, this is not advice.
 *
 * It opens smoothly, through `::details-content` and `interpolate-size` in
 * globals.css rather than a wrapper div and a state hook. A browser without
 * those falls back to opening instantly, which is what it did before.
 */
export function FaqSection() {
  return (
    <section className="border-t border-line py-[96px]">
      <div className="px-[var(--content-gutter)]">
        <Reveal
          register="instrument"
          className="mx-auto grid max-w-content gap-[var(--ds-space-7)] lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-[80px]"
        >
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <p className="text-xs tracking-[0.18em] text-accent-2 uppercase">{FAQ_EYEBROW}</p>

            <h2 className="mt-[var(--ds-space-5)] text-display font-medium tracking-[var(--section-tracking)] text-fg">
              {FAQ_TITLE}
            </h2>

            <p className="mt-[var(--ds-space-5)] max-w-[38ch] text-base leading-[1.7] text-fg-2">
              {FAQ_LEAD}
            </p>

            <Link
              href={FAQ_LINK_HREF}
              className="group mt-[var(--ds-space-6)] inline-flex items-center gap-[var(--ds-space-3)] text-sm text-accent-2"
            >
              {FAQ_LINK_LABEL}
              <span
                aria-hidden="true"
                className="grid size-[14px] place-items-center transition-[translate] duration-[var(--motion-chrome)] ease-house group-hover:translate-x-[var(--ds-space-1)]"
              >
                <IconArrowPointRight />
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-[var(--ds-space-3)]">
            {FAQS.map((faq, index) => (
              <details
                key={faq.question}
                name="homepage-faq"
                open={index === 0}
                className="faq-item group rounded-container border border-line bg-surface shadow-card transition-[border-color] duration-[var(--motion-chrome)] ease-house hover:border-line-2 open:border-line-2"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-[var(--ds-space-5)] p-[var(--ds-padding-card)] text-base font-medium text-fg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid size-[18px] shrink-0 place-items-center rounded-sm text-accent-2 transition-[rotate] duration-[var(--motion-chrome)] ease-house group-open:rotate-45"
                  >
                    <IconAdd />
                  </span>
                </summary>

                <p className="max-w-[62ch] px-[var(--ds-padding-card)] pb-[var(--ds-padding-card)] text-base leading-[1.7] text-fg-2">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
