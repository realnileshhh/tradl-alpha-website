"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipCaret } from "@/components/ui/overlay";
import { ALPHA_NOTICE, SIGN_UP_HREF, SIGN_UP_LABEL } from "@/lib/site";

/**
 * The primary CTA, with the alpha access notice attached to it.
 *
 * The notice announces itself once on every page load rather than waiting to be
 * hovered: the fact that access is open right now is the one thing a first-time
 * visitor should not have to discover. It then retires on its own and behaves
 * like an ordinary tooltip for the rest of the visit, on hover and on focus.
 *
 * It is NOT a conversion device. Doc 03 §1.4 bans exit-intent popups, countdown
 * timers, fake scarcity and cookie-banner CTA bars outright, and the line
 * between those and this one is that this states a fact, sits on the control it
 * describes, never covers content, cannot be clicked, and goes away by itself.
 * No seat count, no clock, no dismissal the visitor has to perform. If it ever
 * grows one of those, it has become the thing the brief bans.
 *
 * Timing. It waits 600ms so it reads as arriving rather than as part of the
 * first paint, then holds for six seconds, which is roughly twice the time the
 * line takes to read.
 *
 * The animation is CSS, not Motion. This is chrome answering an input for most
 * of its life, and the stack table gives that to CSS transitions. Opacity and
 * translation only, so it composites and never runs layout. The transition
 * names `translate`, not `transform`: Tailwind v4's translate utilities set the
 * `translate` property, and a transition on `transform` would not see them.
 *
 * Accessibility, doc 04 §7: the notice is `aria-describedby` on the link only
 * while it is up, so a screen reader hears the label and then the note rather
 * than a description of something invisible. Escape dismisses it, as it must
 * dismiss any popup. It is inert to the pointer, so it can never eat the click
 * on the button it is describing.
 */

const APPEAR_DELAY_MS = 600;
const HOLD_MS = 6000;
const NOTICE_ID = "alpha-notice";

/**
 * WHERE THE NOTICE HANGS, and why it is right-aligned rather than centred.
 *
 * The chip is 276px wide and the button it describes is 61px, sitting at the
 * right end of a nav pane that is capped at the measure. Centred on the button,
 * the chip's right edge lands 138px past the button's centre, which is past the
 * page's right gutter on every viewport this site serves. Measured: at 1440 it
 * reached x=1410 against a 1416 limit, six pixels of clearance; at 1280 it
 * reached 1330 against a 1256 limit; at 1024, 1090 against 1000. On the last
 * two the notice was visibly cut off by the edge of the window, and on the
 * first it was one type change away from being.
 *
 * Right-aligning the chip to the button's own right edge fixes it at every
 * width at once, because the button already sits inside the gutter by
 * construction: the chip can never reach further right than the control it
 * belongs to.
 *
 * THE CARET IS THEN A SEPARATE ELEMENT, and it has to be. `arrow` centres the
 * caret on the CHIP, and the chip is no longer centred on the button, so the
 * point would land about 100px to the left of the control. Rendered here
 * instead, as a sibling inside the button's own positioning context, it takes
 * `left-1/2` off the BUTTON and lands on its middle whatever the label is. No
 * measured button width anywhere, so nothing here drifts if the label changes.
 *
 * The two drops below are 6px apart, which is CARET_OVERLAP in
 * components/ui/overlay and is derived there: it lands the caret's base line on
 * the chip's top edge, with the skirt that covers the chip's border 2px inside
 * it. The caret is drawn rather than folded out of a rotated square now, which
 * is what let the stroke stop at the boundary while the fill carries on past
 * it. Both halves of that are what a join with no break needs.
 *
 * AND THE CARET IS RENDERED AFTER THE CHIP, which is not a formatting choice.
 * Neither element carries a z-index, so paint order is document order: the
 * caret has to be painted last or the chip's own top border draws across its
 * base and the point reads as a separate object stuck to a line. Written first,
 * that is exactly what it did.
 *
 * Both are written out in full rather than built from a shared fragment.
 * Tailwind reads source as text, so a class assembled in a template literal is
 * a class it never sees, and the utility is silently never emitted.
 */
const NOTICE_TOP = "top-[calc(100%_+_var(--ds-item-spacing-10))]";
const CARET_TOP = "top-[calc(100%_+_var(--ds-item-spacing-10)_-_6px)]";

/** Both pieces fade and rise together, as one object. */
const NOTICE_MOTION = "transition-[opacity,translate] duration-[var(--motion-chrome)] ease-house";

export function SignUpCta() {
  const [announced, setAnnounced] = useState(false);
  const [pointed, setPointed] = useState(false);
  const open = announced || pointed;

  /* Every load, with no memory of the last one: the notice is about the state
     of the alpha, not about this visitor. */
  useEffect(() => {
    const appear = window.setTimeout(() => setAnnounced(true), APPEAR_DELAY_MS);
    const retire = window.setTimeout(() => setAnnounced(false), APPEAR_DELAY_MS + HOLD_MS);
    return () => {
      window.clearTimeout(appear);
      window.clearTimeout(retire);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setAnnounced(false);
      setPointed(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="relative">
      <Button
        href={SIGN_UP_HREF}
        aria-describedby={open ? NOTICE_ID : undefined}
        onMouseEnter={() => setPointed(true)}
        onMouseLeave={() => setPointed(false)}
        onFocus={() => setPointed(true)}
        onBlur={() => setPointed(false)}
      >
        {SIGN_UP_LABEL}
      </Button>

      <Tooltip
        id={NOTICE_ID}
        size="lg"
        tone="accent"
        aria-hidden={!open}
        className={[
          "pointer-events-none absolute right-0",
          NOTICE_TOP,
          NOTICE_MOTION,
          open ? "opacity-100" : "-translate-y-[var(--ds-space-2)] opacity-0",
        ].join(" ")}
      >
        {ALPHA_NOTICE}
      </Tooltip>

      <TooltipCaret
        tone="accent"
        className={[
          "pointer-events-none left-1/2 -translate-x-1/2",
          CARET_TOP,
          NOTICE_MOTION,
          open ? "opacity-100" : "-translate-y-[var(--ds-space-2)] opacity-0",
        ].join(" ")}
      />
    </div>
  );
}
