"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/overlay";
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
        arrow
        aria-hidden={!open}
        className={[
          "pointer-events-none absolute top-[calc(100%+var(--ds-item-spacing-10))] left-1/2 -translate-x-1/2",
          "transition-[opacity,translate] duration-[var(--motion-chrome)] ease-house",
          open ? "opacity-100" : "-translate-y-[var(--ds-space-2)] opacity-0",
        ].join(" ")}
      >
        {ALPHA_NOTICE}
      </Tooltip>
    </div>
  );
}
