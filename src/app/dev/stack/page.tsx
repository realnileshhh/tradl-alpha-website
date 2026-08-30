import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { env } from "@/lib/env";
import { PinnedPanel } from "./pinned-panel";
import { Readouts } from "./readouts";
import { Reveals } from "./reveals";
import { SceneMount } from "./scene-mount";

/**
 * Stack proving ground. NOT part of the site.
 *
 * It exists so every library in package.json is demonstrably wired and
 * interoperating on this exact set of versions, rather than merely
 * installed. It renders nothing the visitor ever sees: the route 404s in
 * production, and `rm -rf src/app/dev` removes it whole with no other
 * file needing an edit.
 *
 * Delete it once the real pages exist.
 */
export default function StackPage() {
  if (env.isProduction) notFound();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-content px-6 py-16">
        <FadeIn>
          <h1 className="font-sans text-2xl font-bold">Stack check</h1>
          <p className="mt-2 text-fg-2">
            Scroll: motion is smooth (lenis). The panel below pins and scrubs sideways
            (gsap + ScrollTrigger). The cube spins, a ball drops and bounces (fiber, drei,
            rapier), under bloom and grain (postprocessing). Numbers update live (zustand).
            Further down, the reveal layer, the scroll control surface and the lock.
          </p>
        </FadeIn>

        <div className="mt-10 h-[60vh] overflow-hidden rounded-lg border border-line bg-surface">
          <SceneMount />
        </div>

        <div className="mt-10 rounded-card border border-line bg-surface p-6">
          <Readouts />
        </div>

        <FadeIn delay={0.1}>
          <p className="mt-24 text-fg-3">Keep scrolling for the pinned section.</p>
        </FadeIn>

        <div className="mt-10 -mx-6">
          <PinnedPanel />
        </div>

        <p className="py-32 text-fg-3">Pin released.</p>

        <Reveals />

        <p className="py-32 text-fg-3">End.</p>
      </div>
    </main>
  );
}
