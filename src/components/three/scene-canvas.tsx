"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type SceneCanvasProps = Omit<CanvasProps, "children"> & {
  children: ReactNode;
  /**
   * Painted before WebGL is ready, and the whole output when the visitor
   * has asked for reduced motion. Doc 04 §5 requires the first frame to be
   * a static of the finished state, so this should be a real image or a
   * styled block, never a spinner.
   */
  fallback?: ReactNode;
};

/**
 * The single entry point for 3D. Import this, never `<Canvas>` directly.
 *
 * It carries the three rules that are easy to forget once and expensive to
 * find later:
 *
 * 1. `dpr` is capped at 2. Uncapped, a 3x phone renders nine times the
 *    pixels of a 1x screen for no visible gain and a large thermal cost.
 * 2. `frameloop="demand"` — the loop renders on change instead of at 60fps
 *    forever. A scene that animates continuously must opt back in with
 *    `frameloop="always"`, which makes the battery cost a deliberate
 *    choice rather than the default.
 * 3. Reduced motion renders `fallback` and never mounts WebGL at all.
 *
 * This component is client-only but not itself lazy. Wrap the *scene* in
 * `next/dynamic` at the call site so three.js stays out of the initial
 * bundle for pages that do not use it.
 */
export function SceneCanvas({ children, fallback = null, ...props }: SceneCanvasProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{fallback}</>;

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
