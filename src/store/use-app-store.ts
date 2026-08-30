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
};

export const useAppStore = create<AppState>((set) => ({
  sceneReady: false,
  setSceneReady: (sceneReady) => set({ sceneReady }),

  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
}));
