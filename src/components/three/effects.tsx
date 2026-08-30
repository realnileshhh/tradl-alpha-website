"use client";

import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

/**
 * The house post-processing chain: bloom, a hair of chromatic aberration,
 * film grain, vignette. Order is the render order, and it matters —
 * grain and vignette last so they sit over the bloom rather than being
 * bloomed themselves.
 *
 * Every value here is deliberately restrained. Post-processing is what
 * reads as "expensive" when it is barely perceptible and as a screensaver
 * when it is not. If an effect is noticeable in a still screenshot, it is
 * turned up too far.
 *
 * Cost: one full-screen pass per effect. On the LCP-critical hero, mount
 * this only after first paint.
 */
export function Effects() {
  return (
    <EffectComposer>
      <Bloom
        // Only genuinely bright pixels bloom, so the whole frame does not
        // haze over.
        luminanceThreshold={0.85}
        luminanceSmoothing={0.3}
        intensity={0.6}
        mipmapBlur
      />
      <ChromaticAberration
        // Sub-pixel at 1080p. Felt, not seen.
        offset={new Vector2(0.0004, 0.0004)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.15} darkness={0.6} />
    </EffectComposer>
  );
}
