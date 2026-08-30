/**
 * Homepage. Intentionally empty — the design starts here from scratch.
 *
 * What is already wired and waiting, so none of it needs rebuilding:
 *   Design tokens .......... src/design-system/tokens/, generated from Figma
 *   Icons .................. 84 components in @/components/ui/icons
 *   Brand marks ............ public/brand/*.svg
 *   Smooth scroll .......... active app-wide via components/providers/lenis-provider
 *   Scroll choreography .... import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
 *   3D ..................... <SceneCanvas> in components/three/scene-canvas
 *   Post-processing ........ <Effects> in components/three/effects
 *   Micro-interaction ...... <FadeIn> in components/motion/fade-in
 *   Cross-tree state ....... useAppStore in store/use-app-store
 *
 * The site runs dark, on the design system's own and only mode. There is no
 * theme switch: every token renders exactly as drawn.
 *
 * Two registers, and the alternation is the design (doc 04 §1). They differ by
 * scale and density, not by colour:
 *   Statement   full-bleed typographic scenes. text-statement, generous space,
 *               one idea. Section openers and closes only, and never more than
 *               about 30 per cent of a page's scroll length.
 *   Instrument  the default. Dense, hairline-bordered, numbers-forward:
 *               bg-surface, border-line, text-fg-2, .num on every figure.
 *               Identical to product surfaces on purpose.
 *
 * See docs/DECISIONS.md 004 and docs/DESIGN-SYSTEM.md.
 *
 * Browse the system at /dev/design-system. See /dev/stack for the animation
 * stack, and CLAUDE.md for the rules that bind the copy and the budget.
 */
export default function HomePage() {
  return <main />;
}
