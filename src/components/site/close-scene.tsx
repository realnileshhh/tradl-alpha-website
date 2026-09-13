"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The close's ambient scene: a shaft of green light with dust turning in it.
 *
 * It replaces the background video that was here (<CloseVideo>, still intact
 * behind SHOW_CLOSE_VIDEO in lib/flags). The video was 1600x900 of loop that
 * had to be fetched, decoded and kept in memory to show a slow drift; this is
 * one draw call of additive points and about 4KB of shader.
 *
 * TWO LAYERS, AND THE SPLIT IS THE DESIGN.
 *
 *   the glow   CSS, always painted, never animated. It is the still version of
 *              the scene and it is also the whole scene wherever WebGL does not
 *              run: reduced motion, a refused context, the frames before the
 *              chunk arrives. There is no state in which this section is
 *              missing its background rather than simply not moving.
 *   the dust   WebGL, fetched lazily but early, and running only near the
 *              section. See WHEN IT LOADS below.
 *
 * THE LAZY BOUNDARY HAS TO BE HERE. `next/dynamic` with `ssr: false` is
 * rejected inside a Server Component, and three is roughly 600KB gzipped: this
 * is what keeps it off the initial bundle for a section most readers meet after
 * several screens of scrolling.
 *
 * WHEN IT LOADS, AND WHY IT IS NOT THE OBSERVER'S JOB.
 *
 * It was: one observer 40 per cent of a viewport out both mounted the canvas
 * and ran it. That is the right shape for a video and the wrong one for this.
 * A few hundred KB of encoded loop can be fetched in the time it takes to cross
 * a third of a screen; three is roughly 600KB and then has to boot a context
 * and compile a shader, so the reader arrived at the section first and watched
 * it appear a second or two later. The lead was the bug, not the gate.
 *
 * So the two are separated and each gets the signal it actually needs:
 *
 *   mount  on idle, once, wherever the reader happens to be. This is the LAST
 *          section on the page, so a reader who gets here has scrolled several
 *          screens since the chunk was asked for and it has been cached the
 *          whole time. `requestIdleCallback` means it waits behind anything
 *          still parsing rather than competing with it, and the timeout is the
 *          ceiling for a page that never goes idle.
 *   run    on approach, three quarters of a viewport out, which is what puts
 *          the dust already drifting before the section edges in rather than
 *          starting as it lands.
 *
 * Mounted but not running costs a context and one clear. Scrolled past, it
 * costs nothing but its memory.
 *
 * REDUCED MOTION NEVER MOUNTS IT. <SceneCanvas> refuses WebGL on its own, but
 * it cannot refuse a chunk that has already been fetched to render it, so the
 * decision is taken here too and three is never requested at all.
 *
 * THE COLOUR COMES FROM CSS. The wrapper's `color` is set from --close-dust in
 * marketing/ground.css, and it is read here as a resolved `rgb()` and handed to
 * the shader. Reading the custom property directly would return the unresolved
 * `color-mix(...)` token; reading `color` off a real element makes the browser
 * do the resolving, which is the only way to get a value a shader can use
 * without copying the number into the code.
 */

const DustScene = dynamic(() => import("./close/dust-scene").then((m) => m.DustScene), {
  ssr: false,
  /* Doc 04 §5: a painted static, never a spinner. Here it is nothing at all,
     because the glow beneath is already the finished still. */
  loading: () => null,
});

/**
 * The ceiling on waiting for an idle moment. Same figure and same reasoning as
 * the video gate in components/site/background-video: a page that never goes
 * idle still gets its scene.
 */
const IDLE_TIMEOUT_MS = 2000;

/**
 * How far out the loop starts, as a share of viewport height. Three quarters of
 * a screen, so the dust is already moving when the section's top edge arrives.
 * Long enough to never be caught starting; short enough that a reader parked
 * two screens above is not paying for frames.
 */
const RUN_MARGIN = "75% 0px";

export function CloseScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState<string | null>(null);

  /* Read the dust colour whatever else happens: it is one computed style and it
     has to be in hand before the scene mounts. */
  useEffect(() => {
    const el = wrapper.current;
    if (el) setColor(getComputedStyle(el).color);
  }, []);

  /* Mount on idle, not on approach. See WHEN IT LOADS above. */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const want = () => setMounted(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(want, { timeout: IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(want, IDLE_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  /* Run on approach. A margin on the root box, so `isIntersecting` is already
     true while the section is still below the fold. */
  useEffect(() => {
    const el = wrapper.current;
    if (!el || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setActive(entry.isIntersecting);
      },
      { rootMargin: RUN_MARGIN }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    /* `close-scene` carries the glow and the dust colour. -z-10 puts it behind
       the section's content, and the section's own `isolate` is what keeps it
       from going behind the page instead. */
    <div
      ref={wrapper}
      aria-hidden="true"
      className="close-scene pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {mounted && color ? <DustScene color={color} active={active} /> : null}
    </div>
  );
}
