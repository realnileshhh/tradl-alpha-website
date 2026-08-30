"use client";

import { create } from "zustand";

/**
 * Global UI state shared between the React tree and the R3F render loop.
 *
 * This is deliberately small. Zustand earns its place here because a
 * component inside <Canvas> lives in a separate React reconciler from the
 * DOM tree — Context does not cross that boundary, but a store read does.
 * State that only one DOM subtree cares about belongs in that subtree,
 * not here.
 *
 * Read inside useFrame with `useAppStore.getState()` rather than the hook,
 * so a store change does not re-render a component that runs 60 times a
 * second anyway.
 */
type AppState = {
  /** True once the first meaningful 3D scene has finished loading. */
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  /** Normalised scroll progress, 0 at page top and 1 at page bottom. */
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  /**
   * The engineering section's turntable, in radians, as two independent
   * contributions that the scene adds together.
   *
   * This is the crossing this store exists for. Both writers live in the DOM
   * tree and the reader is a mesh inside <Canvas>, which is a separate React
   * reconciler that context does not reach into; and both values change every
   * frame of a gesture, so neither may go through a React render. The scene
   * subscribes with the vanilla `useAppStore.subscribe`, writes the sum straight
   * onto the object and calls `invalidate()`. Nothing re-renders.
   *
   * TWO FIELDS AND NOT ONE SUM, because they have two different owners and a
   * single field would mean each writer had to know the other's current value to
   * avoid clobbering it. `scroll` belongs to the section's scrubbed timeline,
   * `drag` to the pointer. Added, they compose: turn the bull by hand and it
   * keeps that offset as the page carries on rotating it.
   */
  bullScroll: number;
  setBullScroll: (radians: number) => void;

  bullDrag: number;
  setBullDrag: (radians: number) => void;

  /**
   * True once WebGL has taken over from the painted still.
   *
   * The timeline reads it to decide whether it is writing an angle or only
   * recording where the angle would have been. Until the scene is live the
   * still is on screen, and the still is one fixed pose: if the timeline banked
   * rotation during that time, the canvas would appear at whatever angle the
   * page had scrolled to and the hand-off would be a visible jump. Instead the
   * timeline keeps re-zeroing itself until this flips, so the first angle the
   * canvas ever renders is exactly the pose the still was showing.
   */
  bullLive: boolean;
  setBullLive: (live: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  sceneReady: false,
  setSceneReady: (sceneReady) => set({ sceneReady }),

  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  bullScroll: 0,
  setBullScroll: (bullScroll) => set({ bullScroll }),

  bullDrag: 0,
  setBullDrag: (bullDrag) => set({ bullDrag }),

  bullLive: false,
  setBullLive: (bullLive) => set({ bullLive }),
}));
