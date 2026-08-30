"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useAppStore } from "@/store/use-app-store";

/**
 * The bull's turntable, driven by the pointer and by nothing else.
 *
 * IT IS AN OFFSET, NOT THE ANGLE. The section's scrubbed timeline still turns
 * the model one full revolution as the page passes, and this adds to that rather
 * than replacing it. What the two together give is a model that turns on its own
 * as you read and that you can also reach in and turn, holding whatever offset
 * you set while the page carries on rotating it. The scene sums the two; neither
 * writer has to know the other's value.
 *
 * NEITHER SURFACE MOVES THE OTHER. The pointer is captured for the length of a
 * drag, so turning the bull never scrolls the page, and the timeline never
 * writes this value, so scrolling never undoes a pose set by hand.
 *
 * HORIZONTAL ONLY, and that is a constraint rather than an omission. The model
 * has a floor, a silhouette and a lit side; free-tumbling it produces poses that
 * are upside down, edge-on and unlit, and a visitor who reaches one has no way
 * back except to reload. One axis cannot be pointed anywhere wrong.
 *
 * `touch-action: pan-y` on the host is what makes this safe on a touch screen
 * with a wide enough window to see it: the browser keeps vertical panning, so
 * dragging up the page still scrolls the page, and only the horizontal component
 * is ours. Without it a finger on the bull would trap the page.
 *
 * THE ANGLE GOES THROUGH THE STORE, not through a prop. It changes every frame
 * of a drag and it is read by a mesh in a separate React reconciler; a prop
 * would re-render the tree on every pointer move to produce the same elements.
 *
 * A FLICK CARRIES. Release with speed and the model keeps turning and settles,
 * because a turntable that stops dead the instant you let go feels geared rather
 * than balanced. The decay runs on its own rAF and writes the same store value,
 * so the scene stays on `frameloop="demand"` and renders only while something is
 * actually moving.
 */

/** Radians per pixel of drag. A full turn is a little over half a screen. */
const RADIANS_PER_PIXEL = (Math.PI * 2) / 620;

/** Radians per arrow key press. 24 presses to the full turn. */
const RADIANS_PER_KEY = Math.PI / 12;

/** Per-frame velocity multiplier after release. */
const DECAY = 0.94;

/** Velocity below which the glide is over, in radians per frame. */
const STOP_BELOW = 0.0004;

/** Ceiling on release velocity, so a fast flick spins rather than teleports. */
const MAX_VELOCITY = 0.16;

export function useBullTurntable({
  host,
  enabled,
}: {
  host: RefObject<HTMLElement | null>;
  /** False until WebGL is actually on screen. Nothing turns a static image. */
  enabled: boolean;
}) {
  const angle = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const glide = useRef(0);

  useEffect(() => {
    const el = host.current;
    if (!enabled || !el) return;

    const write = () => useAppStore.getState().setBullDrag(angle.current);

    const stopGlide = () => {
      if (glide.current) cancelAnimationFrame(glide.current);
      glide.current = 0;
    };

    const step = () => {
      velocity.current *= DECAY;
      if (Math.abs(velocity.current) < STOP_BELOW) {
        velocity.current = 0;
        glide.current = 0;
        return;
      }
      angle.current += velocity.current;
      write();
      glide.current = requestAnimationFrame(step);
    };

    const onPointerDown = (event: PointerEvent) => {
      /* Secondary buttons belong to the browser's own menus. */
      if (event.button !== 0) return;
      stopGlide();
      velocity.current = 0;
      lastX.current = event.clientX;
      el.setPointerCapture(event.pointerId);
      el.dataset.dragging = "";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!el.hasPointerCapture(event.pointerId)) return;
      const dx = event.clientX - lastX.current;
      lastX.current = event.clientX;
      /* Drag right, the near side goes right, which about a Y axis is positive.
         The gesture and the object agree, so nobody has to learn it. */
      const delta = dx * RADIANS_PER_PIXEL;
      angle.current += delta;
      /* The last movement is the throw. Averaging a window of them reads as
         sluggish, because the finger has usually already decelerated. */
      velocity.current = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, delta));
      write();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (!el.hasPointerCapture(event.pointerId)) return;
      el.releasePointerCapture(event.pointerId);
      delete el.dataset.dragging;
      if (velocity.current !== 0) glide.current = requestAnimationFrame(step);
    };

    /* Doc 04 §7: anything operable by pointer is operable by keyboard. Arrows
       only, because the axis is the whole affordance. */
    const onKeyDown = (event: KeyboardEvent) => {
      const direction =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (direction === 0) return;
      event.preventDefault();
      stopGlide();
      velocity.current = 0;
      angle.current += direction * RADIANS_PER_KEY;
      write();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("keydown", onKeyDown);

    return () => {
      stopGlide();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("keydown", onKeyDown);
      delete el.dataset.dragging;
    };
  }, [host, enabled]);
}
