/**
 * Homepage. The shell is in: the persistent nav (doc 03 §3 H0) and the market
 * strip under it. Everything below them is still to come.
 *
 * What is already wired and waiting, so none of it needs rebuilding:
 *   Design tokens .......... src/design-system/tokens/, generated from Figma
 *   Icons .................. 84 components in @/components/ui/icons
 *   Brand marks ............ public/brand/*.svg
 *   Smooth scroll .......... active app-wide via components/providers/lenis-provider
 *   Scroll control ......... scrollTo, lockScroll, unlockScroll from "@/lib/scroll"
 *   Scroll reveals ......... <Reveal> and <SplitWords> in components/motion
 *   Motion vocabulary ...... design-system/extensions/motion.ts. Never retype a duration.
 *   Scroll choreography .... import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap"
 *   3D ..................... <SceneCanvas> in components/three/scene-canvas
 *   Post-processing ........ <Effects> in components/three/effects
 *   Mount entrance ......... <FadeIn> in components/motion/fade-in
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
 * The hero does not animate in. Doc 04 §5 wants the first screen painted as a
 * finished static, and everything <Reveal> touches starts at opacity 0.
 *
 * See docs/DECISIONS.md 004 and 005, docs/DESIGN-SYSTEM.md and docs/MOTION.md.
 *
 * Browse the system at /dev/design-system. See /dev/stack for the animation
 * stack, and CLAUDE.md for the rules that bind the copy and the budget.
 */
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Hero } from "@/components/site/hero";
import { CloseSection } from "@/components/site/close-section";
import { EngineeringSection } from "@/components/site/engineering-section";
import { FaqSection } from "@/components/site/faq-section";
import { FoundersSection } from "@/components/site/founders-section";
import { PeekSection } from "@/components/site/peek-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { ToolkitSection } from "@/components/site/toolkit-section";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <ToolkitSection />
        <PeekSection />
        <FoundersSection />
        <EngineeringSection />
        <FaqSection />
        <CloseSection />
      </main>

      <SiteFooter />
    </>
  );
}
