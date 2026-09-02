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
 * The stage the bull turns on, and the four gates that keep it cheap.
 *
 * 1 · THE LAZY BOUNDARY. three + drei + postprocessing is about 600KB gzipped
 *     and the model is another 968KB. `next/dynamic` with `ssr: false` is what
 *     keeps all of it off every route that does not render a scene, and it has
 *     to live in a client component because opting out of SSR is a decision the
 *     server cannot make.
 *
 * 2 · THE VIEWPORT GATE. The boundary alone is not enough: `next/dynamic`
 *     fetches its chunk when the component mounts, and this component mounts
 *     with the page. So the scene is not rendered at all until the section is
 *     within a viewport and a half of the fold, at which point the chunk, the
 *     model and the decode all happen while the visitor is still reading the
 *     founders. By the time they arrive it is already standing there. The
 *     observer disconnects on the first hit; there is nothing to watch after.
 *
 * 3 · THE STILL IS THE FIRST FRAME. Doc 04 §5 wants a painted static of the
 *     finished state, never a spinner, so `bull-still.webp` is rendered from
 *     this very scene at its opening pose and painted immediately. The moment
 *     the model is in the scene the two swap, in one frame and with no
 *     cross-fade: see the note on `.bull-still` in globals.css. If the scene
 *     never arrives at all, what stays on screen is a picture of a bull rather
 *     than a hole in the layout.
 *
 * 4 · THE HEAD START. The gate decides when WebGL mounts, not when the bytes
 *     start moving. Those are started after `load` and an idle callback, from
 *     the top of the page, so the model is already in cache by the time the
 *     gate opens. The long note on the effect says why.
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

/** The mirrored tokens the scene is lit with. Names, not values. */
const PALETTE_TOKENS = {
  base: "--ds-color-grey-750",
  accent: "--ds-accent-secondary",
  deep: "--ds-accent-primary",
  fill: "--ds-color-grey-300",
} as const;

/**
 * How early the scene starts loading, as a share of the viewport height.
 *
 * 400, not 150, and the difference is measured rather than guessed. The chunk is
 * about 600KB and the model another 968KB; on the mid-range Android over 4G that
 * doc 04 §5 names as the binding device, the model lands about five and a half
 * seconds after the request. 150 per cent of a 900px viewport is 1350px of lead,
 * which a reader covers in a second or two, so the scene was routinely still
 * downloading well after the track had started. 400 per cent starts it around
 * the sneak peek, several sections earlier, which is enough on that connection
 * and still tied to a reader who is actually heading this way rather than being
 * spent on everyone who opens the page.
 */
const PRELOAD_MARGIN = "400%";

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
   * One effect, one external system, one state write, and the write happens in
   * the observer's callback rather than in the effect body. Reading the tokens
   * here rather than on mount also means `getComputedStyle`, which forces a
   * style recalculation, is never paid for on a page the visitor does not
   * scroll this far down.
   */
  useEffect(() => {
    if (!wantsLive || prefersReducedMotion || !host.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const styles = getComputedStyle(document.documentElement);
        const read = (token: string) => styles.getPropertyValue(token).trim();

        setPalette({
          base: read(PALETTE_TOKENS.base),
          accent: read(PALETTE_TOKENS.accent),
          deep: read(PALETTE_TOKENS.deep),
          fill: read(PALETTE_TOKENS.fill),
        });
      },
      { rootMargin: `${PRELOAD_MARGIN} 0px` },
    );

    observer.observe(host.current);
    return () => observer.disconnect();
  }, [wantsLive, prefersReducedMotion]);

  /**
   * 4 · THE HEAD START, which is the one that decides whether the bull turns at
   *     all on a first visit.
   *
   * The viewport gate above is the right shape and the wrong clock. It starts
   * the download when the reader is a few viewports away, and on a hard refresh
   * the chunk and the model together are about 1.5MB, so the reader routinely
   * arrives first. While they wait, the bull on screen is the still, the still
   * is one fixed pose, and the section's timeline holds the written angle at
   * zero: measured on a throttled cold load, the timeline advanced 2.5 radians,
   * two fifths of its whole revolution, with nothing on screen moving. That is
   * the "the bull is stuck" report, and the catch-up in `engineering-orbit.tsx`
   * repays it as a spin afterwards rather than preventing it.
   *
   * So the fetch is started from the top of the page instead, and the gate above
   * is left as the gate on mounting WebGL. Two conditions keep it honest against
   * doc 04 §5. It waits for `load`, so nothing here competes for bandwidth with
   * the LCP element, which is the only thing the 2.0s budget is about. And it
   * waits for an idle callback after that, so it yields to anything still
   * settling. By the time the reader has read the sections above, the model is
   * in drei's cache and `useGLTF` resolves in the same frame the scene mounts.
   *
   * Importing the module is the whole mechanism: `bull-scene.tsx` ends with
   * `useGLTF.preload`, so evaluating it starts the model download too. One
   * import warms both halves, and it is the same module specifier `next/dynamic`
   * uses above, so the two share a chunk rather than racing for two.
   */
  useEffect(() => {
    if (!wantsLive || prefersReducedMotion) return;

    let cancelled = false;
    let idle = 0;

    const warm = () => {
      const start = () => {
        if (!cancelled) void import("./bull-scene");
      };
      /* Safari only shipped requestIdleCallback in 17. A short timeout is the
         same intent on the versions that predate it: after the current work,
         not during it. */
      idle =
        typeof requestIdleCallback === "function"
          ? requestIdleCallback(start, { timeout: 2000 })
          : window.setTimeout(start, 200);
    };

    if (document.readyState === "complete") warm();
    else window.addEventListener("load", warm, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", warm);
      if (!idle) return;
      if (typeof cancelIdleCallback === "function") cancelIdleCallback(idle);
      else clearTimeout(idle);
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
