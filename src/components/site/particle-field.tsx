"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The field of dots behind the hero's call to action.
 *
 * Three layers at three depths, each a tiled set of radial gradients: no image,
 * no canvas, no per-particle DOM. The whole field is three elements and three
 * paints, which is what makes it affordable above the fold.
 *
 * TWO KINDS OF MOTION, and they are deliberately different in character.
 *
 * The twinkle is CSS. Each layer breathes on its own period, and the three
 * periods are chosen not to share a common factor, so the field never pulses in
 * unison the way a single animation would. It is opacity only: nothing here
 * moves, so nothing here can cause a layout.
 *
 * The parallax is JavaScript, and it is the only thing this component hydrates
 * for. A pointer move writes two numbers onto the container as custom
 * properties; CSS multiplies them by each layer's depth and translates. The
 * work per event is two `setProperty` calls behind a requestAnimationFrame, so
 * a fast mouse costs one write per frame rather than one per event. The near
 * layer travels furthest, which is what reads as depth.
 *
 * The transition on the translate is doing the smoothing. Without it the field
 * snaps to the pointer and reads as a jitter; with a chrome-length ease the
 * layers trail the cursor and settle, which is the difference between dust in
 * the room and a texture glued to the mouse.
 *
 * REDUCED MOTION: no listener is attached and the twinkle collapses to its
 * mid-brightness keyframe under the global rule, so the field is simply a
 * static field of dots. Nothing is half-animated and nothing follows the
 * pointer.
 *
 * Inert by construction: aria-hidden, pointer-events: none, and it sits behind
 * its siblings. It can never take a click meant for the button in front of it.
 */
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

export function ParticleField({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = container.current;
    if (!el) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const write = () => {
      frame = 0;
      el.style.setProperty("--pointer-x", x.toFixed(3));
      el.style.setProperty("--pointer-y", y.toFixed(3));
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      /* -1 to 1 from the field's own centre, so the parallax is about where the
         pointer is relative to this field rather than to the window, and
         clamped so a pointer two screens away does not drag the layers further
         than a pointer at the field's own edge. */
      x = clamp((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
      y = clamp((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
      if (!frame) frame = requestAnimationFrame(write);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return (
    <div ref={container} aria-hidden="true" className={cn("particle-field", className)}>
      <span className="particle-layer particle-layer-near" />
      <span className="particle-layer particle-layer-mid" />
      <span className="particle-layer particle-layer-far" />
    </div>
  );
}
