"use client";

import { useAppStore } from "@/store/use-app-store";

/** Live view of the shared store, so the R3F → store → DOM path is visible. */
export function Readouts() {
  const sceneReady = useAppStore((s) => s.sceneReady);
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  return (
    <dl className="grid grid-cols-2 gap-2 text-fg-2">
      <dt>zustand · sceneReady</dt>
      <dd className="num text-fg">{String(sceneReady)}</dd>
      <dt>zustand · scrollProgress</dt>
      <dd className="num text-fg">{scrollProgress.toFixed(3)}</dd>
    </dl>
  );
}
