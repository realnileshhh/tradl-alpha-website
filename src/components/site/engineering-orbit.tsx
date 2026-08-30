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
 * THE TIMELINE RE-ZEROES ITSELF UNTIL THE SCENE IS LIVE. While the still is on
 * screen there is one fixed pose to look at, so an angle banked during that time
 * would be spent the instant WebGL appeared, as a jump from the pose in the
 * picture to wherever the page had scrolled to. Instead the tween keeps moving
 * and the store keeps reading zero, and the offset the angle is measured from is
 * whatever it had reached when the model landed. In practice the model is loaded
 * a viewport and a half before the track even starts, so that offset is zero and
 * this costs nothing; on a slow connection it is the difference between a
 * hand-off and a glitch.
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

         `origin` is where the angle is measured from. See the note at the top
         of this file. */
      const turn = { angle: 0 };
      let origin = 0;

      /* Capturing `origin` at the exact frame the scene goes live, rather than
         letting the tween's own onUpdate leave it wherever it last ran. Those
         are not the same moment and the difference is visible: a reload parked
         inside this section restores the offset, scrubs the timeline to the
         middle of its travel, and then loads the model some seconds later with
         no scroll in between, so onUpdate has long since stopped firing. Reading
         the tween here, on the transition, is what makes the canvas's first
         frame the same pose as the still it replaces. */
      const unsubscribe = useAppStore.subscribe((state, previous) => {
        if (!state.bullLive || previous.bullLive) return;
        origin = turn.angle;
        if (useAppStore.getState().bullScroll !== 0) state.setBullScroll(0);
      });

      timeline.to(
        turn,
        {
          angle: FULL_TURN,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const store = useAppStore.getState();
            if (!store.bullLive) {
              origin = turn.angle;
              if (store.bullScroll !== 0) store.setBullScroll(0);
              return;
            }
            store.setBullScroll(turn.angle - origin);
          },
        },
        0,
      );

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

      /* useGSAP reverts the tweens it created; the store subscription is not
         one of them. */
      return unsubscribe;
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
    <div className="px-[var(--content-gutter)]">
      <div className="mx-auto max-w-content">
        <BullStage live={false} className="orbit-bull-still" />

        <Reveal
          stagger
          className="mt-[var(--ds-space-7)] grid gap-[var(--ds-space-5)] sm:grid-cols-2"
        >
          {ENGINEERING_PILLARS.map((pillar) => (
            <PillarCard key={pillar.code} pillar={pillar} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
