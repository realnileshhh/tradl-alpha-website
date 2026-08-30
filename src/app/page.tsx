/**
 * Homepage. Intentionally empty — the design starts here from scratch.
 *
 * What is already wired and waiting, so none of it needs rebuilding:
 *   Smooth scroll .......... active app-wide via components/providers/lenis-provider
 *   Scroll choreography .... import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
 *   3D ..................... <SceneCanvas> in components/three/scene-canvas
 *   Post-processing ........ <Effects> in components/three/effects
 *   Micro-interaction ...... <FadeIn> in components/motion/fade-in
 *   Cross-tree state ....... useAppStore in store/use-app-store
 *   Tokens ................. utilities like bg-l2, text-secondary, rounded-panel
 *
 * See /dev/stack for a working example of each, and CLAUDE.md for the rules
 * that bind the copy and the performance budget.
 */
export default function HomePage() {
  return <main />;
}
