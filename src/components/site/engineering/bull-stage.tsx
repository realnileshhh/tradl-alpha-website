"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { ENGINEERING_STAGE_ALT, ENGINEERING_STAGE_LABEL } from "@/lib/site";
import { useAppStore } from "@/store/use-app-store";
import type { BullPalette } from "./bull-scene";
import { useBullTurntable } from "./use-bull-turntable";

/**
 * The stage the bull turns on, and the three gates that keep it cheap.
 *
 * 1 · THE LAZY BOUNDARY. three + drei + postprocessing is about 600KB gzipped
 *     and the model is another 968KB. `next/dynamic` with `ssr: false` is what
 *     keeps all of it off every route that does not render a scene, and it has
 *     to live in a client component because opting out of SSR is a decision the
 *     server cannot make.
 *
 * 2 · THE IDLE GATE. Everything after the boundary happens on one idle callback
 *     taken at mount, from the top of the page: the tokens are read, the scene
 *     renders, the chunk is fetched, the model follows it, the context is made
 *     and the materials compile. By the time a reader reaches this section,
 *     however fast they got here, the bull is already standing there.
 *
 * 3 · THE STILL IS THE FIRST FRAME. Doc 04 §5 wants a painted static of the
 *     finished state, never a spinner, so `bull-still.webp` is rendered from
 *     this very scene at its opening pose and painted immediately. The moment
 *     the model is in the scene the two swap, in one frame and with no
 *     cross-fade: see the note on `.bull-still` in globals.css. If the scene
 *     never arrives at all, what stays on screen is a picture of a bull rather
 *     than a hole in the layout.
 *
 * Under `prefers-reduced-motion`, and wherever the caller passes `live={false}`,
 * the still is the whole component: the chunk is never requested and WebGL is
 * never mounted. `SceneCanvas` would refuse to mount it under reduced motion
 * anyway, but paying 1.5MB to be told that is not a saving, and the narrow
 * layout has no reason to pay it at all.
 *
 * COLOUR CROSSES THE BOUNDARY AS A PROP. `npm run check:surfaces` bans a raw hex
 * in a component and it is right to: three.js cannot read a CSS custom property,
 * so the tokens are resolved here, on the DOM side, where they are still the
 * mirrored values, and handed in. A hex typed into the scene would be the design
 * system's second source of truth.
 *
 * DRAGGING IS GATED ON `live`, and so is the cursor and the tab stop. The still
 * is a picture at one fixed pose: a grab cursor over it is a promise the page
 * cannot keep, a tab stop that does nothing is worse than no tab stop, and a
 * drag before the model lands would move nothing and then hand over to a canvas
 * at a pose the picture never showed. The same flag goes into the store, which
 * is how the section's timeline knows the still is gone and it may start writing
 * real angles. See `use-bull-turntable.ts` and `engineering-orbit.tsx`.
 */

const BullScene = dynamic(() => import("./bull-scene").then((m) => m.BullScene), {
  ssr: false,
  /* Nothing, deliberately. The still underneath is already the placeholder, and
     a second one would cross-fade with it. */
  loading: () => null,
});

/**
 * The ceiling on waiting for an idle moment, in milliseconds.
 *
 * 1200, not 3000. A ceiling is only a floor while it is never reached, and on a
 * page being hydrated and flung at the same time it was reached every time.
 */
const IDLE_TIMEOUT_MS = 1200;

/**
 * How close the section has to be at mount to skip the wait entirely, in
 * viewports. A restored reload or a deep link can land here with no scroll
 * coming, and idle is the wrong signal for a reader who is already looking at
 * the section.
 */
const NEAR_VIEWPORTS = 4;

/** The mirrored tokens the scene is lit with. Names, not values. */
const PALETTE_TOKENS = {
  base: "--ds-color-grey-750",
  accent: "--ds-accent-secondary",
  deep: "--ds-accent-primary",
  fill: "--ds-color-grey-300",
} as const;

export function BullStage({
  live: wantsLive = true,
  className,
}: {
  /**
   * Whether this stage should ever upgrade to WebGL. False in the narrow
   * layout, which shows the still and nothing else: the section is decorative
   * there, and doc 04 §5's binding constraint is the device that would pay for
   * it. A prop rather than a media query inside this component, so the decision
   * sits with the layout that already made it.
   */
  live?: boolean;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [palette, setPalette] = useState<BullPalette | null>(null);
  const [live, setLive] = useState(false);

  /**
   * THE GATE. Whichever of three signals arrives first, and all three are here
   * because each one covers a case the others miss.
   *
   * WHAT IT USED TO BE, AND WHY EACH VERSION FAILED.
   *
   * First an IntersectionObserver four viewports out, which also read the
   * palette and so also gated the WebGL mount. A reader who flings covers four
   * viewports in well under a second, so the observer fired with them almost on
   * top of the section and the whole chain ran while they watched.
   *
   * Then a single idle callback at mount, which fixed the ordinary case and not
   * the one being reported. Measured on a throttled cold load with an immediate
   * fling: at 1.9 seconds there was still no canvas at all. `requestIdleCallback`
   * does not fire while the main thread is busy, and hydrating a page while
   * someone flings it is exactly busy; the 3s timeout, meant as a floor, became
   * the actual start time. Three seconds of nothing, before a byte was asked for.
   *
   * SO THE SIGNALS ARE THREE, AND THE FIRST ONE WINS.
   *
   *   near    the section is already within reach at mount. A reload restores
   *           mid-page and a deep link lands there, and in both cases there is
   *           no scroll coming and no reason to wait for idle.
   *   scroll  the first one, whatever its size. It is the cheapest possible
   *           read on intent: a reader who has moved the page at all is heading
   *           somewhere, and nothing on this page is more urgent than the 1.5MB
   *           this section needs. It fires within a frame of a fling.
   *   idle    for the reader who has not moved and is not near, which is the
   *           case the LCP budget is about. Doc 04 §5 binds 2.0s to the LCP
   *           element and an idle callback runs when nothing more urgent is
   *           pending; the timeout is now 1200ms rather than 3000, because a
   *           ceiling that high stopped being a floor and became the behaviour.
   *
   * The rest of the chain is unchanged and still serial: setting the palette is
   * what renders <BullScene>, `next/dynamic` asks for the chunk on that render,
   * the chunk evaluates, and its own `useGLTF.preload` starts the model. There
   * is no second request to make. An earlier pass fetched the model here as
   * well, to overlap it, and production returned two entries in resource timing
   * at 777KB each: a response the origin marks `max-age=0` cannot be shared
   * between an in-flight fetch and the loader's own.
   *
   * MEASURED. On a fast machine none of this shows: the chunk starts at 296ms
   * with no scroll and 317ms with a fling, because idle is free and fires at
   * once. The signal earns its place under pressure. At a 6x CPU throttle with
   * an immediate fling it starts at 1580ms, bounded by hydration rather than by
   * the ceiling, where the old 3000ms timeout was the start time and a probe at
   * 1.9s found no canvas at all.
   *
   * What none of the three can do is make 1.5MB arrive faster than the link
   * allows. On a throttled 4G cold load a flinging reader still gets there
   * first and sees the still, which is the state this component is built to sit
   * in; what changes is how the model behaves when it lands, and that is
   * SNAP_DEBT in engineering-orbit.
   *
   * Reading the tokens in the callback rather than at mount also keeps
   * `getComputedStyle`, which forces a style recalculation, off the critical
   * path.
   */
  useEffect(() => {
    if (!wantsLive || prefersReducedMotion) return;

    let done = false;
    const teardown: Array<() => void> = [];

    const start = () => {
      if (done) return;
      done = true;
      for (const off of teardown) off();

      const styles = getComputedStyle(document.documentElement);
      const read = (token: string) => styles.getPropertyValue(token).trim();

      setPalette({
        base: read(PALETTE_TOKENS.base),
        accent: read(PALETTE_TOKENS.accent),
        deep: read(PALETTE_TOKENS.deep),
        fill: read(PALETTE_TOKENS.fill),
      });
    };

    /* 1 · already near. Cheap enough to do inline: one rect on an element that
       has just been laid out. */
    const el = host.current;
    if (el && el.getBoundingClientRect().top < window.innerHeight * NEAR_VIEWPORTS) {
      start();
      return;
    }

    /* 2 · the first scroll. Passive and once: it never blocks the gesture and
       it never runs twice. */
    window.addEventListener("scroll", start, { passive: true, once: true });
    teardown.push(() => window.removeEventListener("scroll", start));

    /* 3 · idle. Safari only shipped requestIdleCallback in 17; a short timeout
       is the same intent on the versions that predate it. */
    if (typeof requestIdleCallback === "function") {
      const idle = requestIdleCallback(start, { timeout: IDLE_TIMEOUT_MS });
      teardown.push(() => cancelIdleCallback(idle));
    } else {
      const idle = window.setTimeout(start, IDLE_TIMEOUT_MS);
      teardown.push(() => clearTimeout(idle));
    }

    return () => {
      done = true;
      for (const off of teardown) off();
    };
  }, [wantsLive, prefersReducedMotion]);

  /* Stable, so the scene's ready effect fires once rather than on every render
     of this component. The store flag is what tells the section's timeline it
     may stop re-zeroing and start writing real angles. */
  const handleReady = useCallback(() => {
    useAppStore.getState().setBullLive(true);
    setLive(true);
  }, []);

  /* The section can be navigated away from with the scene mounted. Left true,
     the timeline on the next page would bank an angle against a bull that is
     not there, and the one after that would arrive already turned. */
  useEffect(() => () => useAppStore.getState().setBullLive(false), []);

  /**
   * A LOST CONTEXT PUTS THE STILL BACK.
   *
   * A browser can take a WebGL context away at any time and does: a GPU switch
   * on a laptop with two of them, a driver reset, another tab claiming the
   * device, too many contexts on one page. Nothing about it is an error and
   * there is no exception to catch. What is left on screen without this is a
   * canvas holding the last frame it managed, which is a bull that has stopped
   * turning and will never start again.
   *
   * So a loss is treated as the scene simply not being there, which is a state
   * this component already knows how to be in: `live` goes false, the still
   * comes back over the dead canvas in one frame, and the store flag goes with
   * it so the orbit's timeline stops writing angles at something that cannot
   * receive them. `preventDefault` is what makes a restore possible at all;
   * without it the browser never fires `webglcontextrestored`.
   *
   * On restore three rebuilds its own resources and the model is still in
   * drei's cache, so there is nothing to re-fetch: the flag goes back up and
   * the still steps aside again.
   */
  /* `live` is a dependency as well as `palette`, and it has to be: the palette
     is set before the chunk has arrived, so on that first run there is no canvas
     to listen to yet. The run that matters is the one after the scene reports
     ready, which is the first moment the element exists. */
  useEffect(() => {
    if (!palette) return;

    const canvas = host.current?.querySelector("canvas");
    if (!canvas) return;

    const onLost = (event: Event) => {
      event.preventDefault();
      useAppStore.getState().setBullLive(false);
      setLive(false);
    };

    const onRestored = () => {
      useAppStore.getState().setBullLive(true);
      setLive(true);
    };

    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [palette, live]);

  useBullTurntable({ host, enabled: live });

  return (
    <div
      ref={host}
      className={cn("bull-stage", className)}
      /* Focusable and labelled only once it is actually operable. A tab stop
         that does nothing is worse than no tab stop, and a still image is not a
         control. */
      {...(live
        ? { tabIndex: 0, role: "group", "aria-label": ENGINEERING_STAGE_LABEL }
        : {})}
      data-live={live ? "" : undefined}
    >
      <Image
        src="/models/bull-still.webp"
        alt={ENGINEERING_STAGE_ALT}
        width={1400}
        height={1400}
        className="bull-still"
        data-hidden={live ? "" : undefined}
      />

      {palette ? (
        <div aria-hidden="true" className="bull-canvas" data-ready={live ? "" : undefined}>
          <BullScene palette={palette} onReady={handleReady} />
        </div>
      ) : null}
    </div>
  );
}
