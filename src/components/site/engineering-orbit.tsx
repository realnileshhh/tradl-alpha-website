"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EASE } from "@/design-system/extensions/motion";
import { Reveal } from "@/components/motion/reveal";
import { useAppStore } from "@/store/use-app-store";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ENGINEERING_PILLARS } from "@/lib/site";
import { BullStage } from "./engineering/bull-stage";
import { PillarCard } from "./engineering/pillar-card";

/**
 * The orbit: a bull turning at the centre of the screen while the six rules
 * assemble around it.
 *
 * TWO ARRANGEMENTS, ONE OWNER EACH. Above 1024px the section is a tall track with
 * a sticky stage inside it, and one scrubbed ScrollTrigger brings the six cards
 * in around the model. Below it, and for anyone who asked for reduced motion,
 * the section is ordinary document flow, the bull is a painted still, and the
 * cards enter through <Reveal> like the rest of the page.
 *
 * TWO INPUTS TURN THE BULL AND THEY ADD. Scroll turns it through one full
 * revolution across the track, which is what this timeline writes; a drag is an
 * offset the visitor holds on top of that, written by the pointer in
 * `engineering/use-bull-turntable.ts`. Neither cancels the other, and neither
 * moves the other's surface: dragging the model never scrolls the page, and
 * scrolling the page never fights a pose somebody set by hand, it carries it.
 *
 * THE CATCH-UP, and it is the part that took two goes to get right.
 *
 * Until the model has downloaded, the bull on screen is a photograph. It cannot
 * turn, so the timeline holds the written angle at zero and records how far
 * ahead it has got as a debt. That much was always true.
 *
 * What the first version then did was write that debt off: it measured every
 * later angle from wherever the timeline happened to be when the model landed.
 * On a fast connection that is zero and costs nothing. On a cold load over 4G
 * the model arrives around five seconds in, by which time a reader is already
 * a third of the way down the track, and a third of the revolution had simply
 * been deleted. Scroll far enough while it loads and the whole revolution went,
 * which is a bull that never turns at all: exactly the bug that was reported,
 * and exactly why it went away on the second load, where the model was cached.
 *
 * So the debt is spent rather than discarded. The canvas still appears at the
 * pose the still was showing, because the offset is still whole at that instant;
 * then it is tweened to zero over up to 1.1 seconds, and the model turns itself
 * to where the page actually is. After that the mapping is exact and the section
 * delivers its full revolution however slowly it loaded.
 *
 * The breakpoint is 1024 and not 768 because the orbit needs a model worth
 * turning, two columns wide enough for four lines of body copy, and a gutter to
 * push the middle row out into; below 1024 those three only fit by taking from
 * each other. See the note in globals.css.
 *
 * The split is real markup rather than CSS because the two are genuinely
 * different documents: one has a sticky viewport-height stage, the other does
 * not. It is also the rule in docs/MOTION.md made structural. No element is ever
 * animated by two systems, so a card is either the timeline's or <Reveal>'s, and
 * which one is decided before it is rendered rather than fought over afterwards.
 * `useMediaQuery` reports false on the server, so the HTML that ships is always
 * the cheap arrangement and the wide one is an upgrade.
 *
 * STICKY, NOT PINNED. ScrollTrigger's `pin` injects a spacer and changes the
 * document height, which invalidates every trigger measured before it; the hero
 * pays that cost because it has to, since it moves its own contents through the
 * viewport. Here nothing needs to move relative to the stage, so `position:
 * sticky` does the same job in CSS, with no spacer, no refresh and nothing for
 * Lenis to disagree with.
 *
 * ONE SCRUBBED TRIGGER. Doc 04 §5 allows four per page and the hero already
 * spends one. This is the second and the last: all six entries live on a single
 * timeline rather than on a trigger each.
 *
 * THE HOUSE CURVE, ON A SCRUBBED TIMELINE. `ease: "none"` is the rule for
 * anything that maps scroll position continuously onto a property, because a
 * curve there reads as the page slipping under the finger. These are not that:
 * each card is a discrete arrival occupying a fifth of the track, and an arrival
 * with no deceleration does not land, it stops. `scrub: 0.6` supplies the
 * smoothing, the same figure the hero uses.
 */

/**
 * How long the sticky stage holds, as a multiple of the viewport.
 *
 * One full revolution is mapped onto it, so it has to be long enough that the
 * turn reads as deliberate rather than as a spin: 260vh is 160vh of travel, a
 * little over a screen and a half per revolution. The six cards are all in by
 * two thirds of the way down, which leaves the last third as a hold, and a hold
 * is exactly the room a reader needs to read six cards and turn the model by
 * hand while they do it.
 */
const TRACK_HEIGHT = "260vh";

/** A full turn, clockwise seen from above, which is negative about Y in three. */
const FULL_TURN = -Math.PI * 2;

/** Timeline position of each row's entry, in a timeline exactly 1 unit long. */
const ROW_ENTRY = [0.12, 0.3, 0.48] as const;

/** How much of the track one card spends arriving. */
const ENTRY_DURATION = 0.18;

/**
 * Where a card comes from, as a share of its own size.
 *
 * Percentages rather than pixels for the same reason <Reveal> uses `yPercent`:
 * the cards are fluid, and a 90px slide that reads as a glide at 1440 reads as a
 * jump at 900. The left column arrives from the left, the right from the right,
 * and the top and bottom rows carry a vertical component as well, so all six
 * read as having been thrown outward by the turn rather than typed into a grid.
 */
const ENTRY_FROM = [
  { xPercent: -18, yPercent: -14 }, // row 1, left
  { xPercent: 18, yPercent: -14 }, // row 1, right
  { xPercent: -26, yPercent: 0 }, // row 2, left
  { xPercent: 26, yPercent: 0 }, // row 2, right
  { xPercent: -18, yPercent: 14 }, // row 3, left
  { xPercent: 18, yPercent: 14 }, // row 3, right
] as const;

export function EngineeringOrbit() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();

  return wide && !prefersReducedMotion ? <OrbitLayout /> : <StackLayout />;
}

/* -----------------------------------------------------------------------------
   Wide: the sticky stage and the scrubbed timeline.
   -------------------------------------------------------------------------- */

function OrbitLayout() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-orbit-item]", root);
      if (cards.length === 0) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      /* The angle is tweened on a plain object rather than written from the
         trigger's `onUpdate`, so it inherits the scrub smoothing: a trigger
         reports raw scroll progress, a tween inside the timeline reports the
         eased-out position the timeline is actually at.

         `offset` is the debt the model owes the scroll: how far behind the
         timeline it is being held. See THE CATCH-UP at the top of this file. */
      const turn = { angle: 0 };
      const offset = { value: 0 };
      let catchUp: gsap.core.Tween | null = null;

      const write = () => useAppStore.getState().setBullScroll(turn.angle - offset.value);

      /* `fromTo`, not `to`, and the explicit zero is load-bearing.
         `invalidateOnRefresh` below clears every tween's recorded start value so
         it is re-read on the next render, which is right for anything measured
         off the DOM and wrong for a plain number: a `to` would re-read `angle`
         as whatever it currently is and silently re-base the whole revolution
         from there. Refreshes are not rare either, and on a cold load they are
         late: `document.fonts.ready` fires one, and a font that is still
         downloading fires it after the reader is already inside this section.
         Pinning the start at zero makes the mapping from scroll to angle the
         same on every refresh, and therefore the same on a cold load as on a
         warm one. */
      timeline.fromTo(
        turn,
        { angle: 0 },
        {
          angle: FULL_TURN,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            /* Before the model exists the visible bull is a photograph and
               cannot turn, so the offset tracks the timeline exactly and the
               angle written stays zero. Nothing is lost: the debt is recorded
               and paid the moment there is something to pay it to. */
            if (!useAppStore.getState().bullLive) offset.value = turn.angle;
            write();
          },
        },
        0,
      );

      /* THE HAND-OFF. Fires on the frame the canvas takes over, which is not the
         frame `onUpdate` last ran: a visitor can arrive with the section already
         on screen and stand still while the model downloads, and a reload parked
         inside the section does exactly that. Reading the tween here rather than
         relying on the last scroll update is what makes the canvas's first frame
         the same pose as the still it replaces. */
      const unsubscribe = useAppStore.subscribe((state, previous) => {
        if (state.bullLive === previous.bullLive) return;

        /* Going the other way, which happens when the stage unmounts with the
           section still on screen. Whatever is left of a correction has to stop:
           from here the timeline is re-zeroing itself again, and a tween still
           writing into `offset` would be arguing with it. */
        if (!state.bullLive) {
          catchUp?.kill();
          catchUp = null;
          return;
        }

        /* ON EVERY EDGE, NOT ONLY THE FIRST. This used to latch after one
           hand-off, which is right for the load the section was written for and
           wrong for every later one. A stage that goes live, unmounts and comes
           back leaves the timeline re-zeroing against a canvas that is on screen
           and able to turn: the written angle stays at zero for the rest of the
           page's life and the model never moves again. Re-arming costs one
           comparison and removes a state the section cannot recover from. */
        catchUp?.kill();

        const debt = Math.abs(offset.value);
        if (debt < 0.01) {
          offset.value = 0;
          write();
          return;
        }

        /* Spend the debt as motion rather than discarding it. Longer for a
           larger correction, so half a revolution does not snap, and capped so
           the model is never still turning by the time the reader has moved on.
           The house curve, because this is a thing arriving, not a thing being
           dragged by the scrollbar. */
        catchUp = gsap.to(offset, {
          value: 0,
          duration: Math.min(1.1, 0.3 + (debt / (Math.PI * 2)) * 0.9),
          ease: EASE,
          onUpdate: write,
        });
      });

      cards.forEach((card, index) => {
        timeline.fromTo(
          card,
          { ...ENTRY_FROM[index], opacity: 0 },
          {
            xPercent: 0,
            yPercent: 0,
            opacity: 1,
            duration: ENTRY_DURATION,
            ease: EASE,
          },
          ROW_ENTRY[Math.floor(index / 2)],
        );
      });

      /* useGSAP reverts the tweens created inside its own synchronous run. The
         store subscription is not one, and neither is the catch-up, which is
         created later from a callback. */
      return () => {
        unsubscribe();
        catchUp?.kill();
      };
    },
    { scope },
  );

  return (
    <div ref={scope} className="orbit-scroll" style={{ height: TRACK_HEIGHT }}>
      <div className="orbit-stage">
        {/* The light the fresnel rim sits against. Without it the green edge has
            nothing to separate from and the model reads as a cut-out. */}
        <span aria-hidden="true" className="orbit-core-glow" />

        <BullStage className="orbit-bull" />

        <div className="orbit-grid">
          {ENGINEERING_PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.code} pillar={pillar} orbiting slot={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------------
   Narrow, and reduced motion: the still and a stack.
   -------------------------------------------------------------------------- */

/**
 * No WebGL at all, which is what `live={false}` buys: the dynamic chunk is never
 * requested and the model is never fetched. Doc 04 §5's binding constraint is a
 * mid-range Android on 4G, and three plus drei plus a 968KB model is not a cost
 * that device should pay for a decorative turn it has no room to see. The still
 * is the same scene, rendered once at its opening pose, at 14KB.
 *
 * The cards enter through <Reveal stagger>: one trigger for all six, `once:
 * true`, the house curve. Nothing here is hand-rolled, and under reduced motion
 * <Reveal> sets the final state and creates no tween.
 */
function StackLayout() {
  return (
    <div className="px-(--content-gutter)">
      <div className="mx-auto max-w-content">
        <BullStage live={false} className="orbit-bull-still" />

        <Reveal
          stagger
          className="mt-(--ds-space-7) grid gap-(--ds-space-5) sm:grid-cols-2"
        >
          {ENGINEERING_PILLARS.map((pillar) => (
            <PillarCard key={pillar.code} pillar={pillar} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
