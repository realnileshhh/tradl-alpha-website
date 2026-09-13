"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, Color, type ShaderMaterial } from "three";
import { SceneCanvas } from "@/components/three/scene-canvas";

/**
 * The dust in the close scene's shaft of light.
 *
 * WHAT IT IS. About four hundred points drifting upward through a box, swaying
 * as they go, fading in at the bottom of the box and out at the top. No model,
 * no lights, no post-processing: one draw call of additive points, which is
 * roughly the cheapest thing WebGL can be asked to do and is the reason this
 * can run continuously at the bottom of a marketing page without being a
 * battery decision anyone has to defend.
 *
 * THE LOOP IS SEAMLESS BY CONSTRUCTION, not by a timed restart. Height is a
 * `mod` of elapsed time in the vertex shader, so a point that leaves the top of
 * the box re-enters at the bottom on the same frame, and the edge fade means it
 * is invisible at both ends while it does. The sway is a sine of the same
 * clock. There is no loop point to land on, so there is nothing to see.
 *
 * NOTHING IS WRITTEN FROM JAVASCRIPT PER FRAME. The positions are uploaded once
 * and every frame after that moves a single float uniform. A version that
 * updated the position array on the CPU would re-upload a buffer sixty times a
 * second to produce the same picture.
 *
 * THE COLOUR IS NOT IN THIS FILE. It is read off the wrapper's resolved `color`,
 * which CSS sets from --close-dust in marketing/ground.css. A hex typed into a
 * shader is a colour the design system does not know about, and it is exactly
 * the kind that survives three redesigns because nothing can find it.
 */

/* The box the dust lives in, in world units at the camera distance below. Wide
   and tall enough to cover the section at any viewport the site serves; the
   camera sees a slice of it and the rest is the depth that makes the near
   points read as out of focus. */
const FIELD_WIDTH = 16;
const FIELD_HEIGHT = 11;
const FIELD_DEPTH = 9;

/* Sparse on purpose. The first pass ran 420 points at 0.55 opacity and the
   section read as a snowstorm: the reference is a nearly empty frame with a few
   specks catching the light, and the distance between the two is entirely count
   and alpha. */
const COUNT = 160;

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uHeight;

  attribute float aScale;
  attribute float aSpeed;
  attribute float aPhase;

  varying float vFade;

  void main() {
    vec3 p = position;

    /* Rise and wrap. The offset keeps the modulo positive for any elapsed
       time, and the subtraction re-centres the box on the origin. */
    p.y = mod(p.y + uTime * aSpeed + uHeight * 0.5, uHeight) - uHeight * 0.5;

    /* A slow lateral drift, out of phase per point so the field never moves
       as one sheet. Amplitude is small: this is air, not wind. */
    p.x += sin(uTime * 0.09 + aPhase) * 0.42;
    p.z += cos(uTime * 0.07 + aPhase) * 0.3;

    vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;

    /* Perspective size attenuation, so depth reads as depth. The near points
       are large and dim, which is what makes them look out of focus without a
       depth-of-field pass. */
    gl_PointSize = aScale * uPixelRatio * (55.0 / -viewPosition.z);

    /* Fade at both ends of the box so the wrap is never witnessed, and again
       with distance so the far wall does not read as a flat sheet of specks. */
    float edge = 1.0 - abs(p.y) / (uHeight * 0.5);
    float depth = smoothstep(-14.0, -3.0, viewPosition.z);
    vFade = smoothstep(0.0, 0.4, edge) * mix(0.08, 1.0, depth);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;

  varying float vFade;

  void main() {
    /* A soft round sprite from the point's own coordinates. Squaring the
       falloff puts the weight in the middle, which is what stops an additive
       point from reading as a hard disc once several overlap. */
    float d = length(gl_PointCoord - 0.5);
    float mask = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uColor, mask * mask * vFade * uOpacity);
  }
`;

/**
 * The field itself, built once at module scope and never again.
 *
 * IT IS NOT RANDOM, it is seeded, and both halves of that matter. Module scope
 * because the field does not depend on a prop and React 19's purity rule is
 * right that generating it during render is a bug waiting to happen: a
 * re-render would deal a new sky. Seeded because `Math.random` would still give
 * a different field on every reload, and a scene that cannot be reproduced
 * cannot be tuned, screenshotted, or compared against yesterday's.
 *
 * mulberry32: one multiply-xor-shift round per call, uniform enough for a dust
 * field and short enough to read.
 */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIELD = (() => {
  const random = seeded(0x7261_646c);

  const positions = new Float32Array(COUNT * 3);
  const scales = new Float32Array(COUNT);
  const speeds = new Float32Array(COUNT);
  const phases = new Float32Array(COUNT);

  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (random() - 0.5) * FIELD_WIDTH;
    positions[i * 3 + 1] = (random() - 0.5) * FIELD_HEIGHT;
    /* Biased towards the back. An even spread puts too many large near points
       in front of the headline. */
    positions[i * 3 + 2] = -random() * FIELD_DEPTH - 2;

    /* A few large motes among many small ones, rather than one size with noise
       on it: the reference has obvious grains and a haze, not a field of
       identical specks. */
    scales[i] = random() < 0.09 ? 4 + random() * 5 : 0.9 + random() * 1.8;
    speeds[i] = 0.06 + random() * 0.16;
    phases[i] = random() * Math.PI * 2;
  }

  return {
    position: new BufferAttribute(positions, 3),
    aScale: new BufferAttribute(scales, 1),
    aSpeed: new BufferAttribute(speeds, 1),
    aPhase: new BufferAttribute(phases, 1),
  };
})();

function Dust({ color }: { color: string }) {
  const material = useRef<ShaderMaterial>(null);
  const pixelRatio = useThree((state) => state.viewport.dpr);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uHeight: { value: FIELD_HEIGHT },
      uColor: { value: new Color(color) },
      uOpacity: { value: 0.22 },
    }),
    [color]
  );

  /* Written through the material rather than through the memoised object above.
     The object is created during render and React 19 is right to say that
     values created during render are not ours to mutate afterwards; the
     material is a three object behind a ref, which is.

     Delta rather than the absolute clock: a tab left in the background for ten
     minutes comes back without the field travelling ten minutes in one frame. */
  useFrame((_, delta) => {
    const current = material.current;
    if (!current) return;
    current.uniforms.uTime!.value += delta;
    current.uniforms.uPixelRatio!.value = pixelRatio;
  });

  return (
    <points>
      <bufferGeometry>
        <primitive attach="attributes-position" object={FIELD.position} />
        <primitive attach="attributes-aScale" object={FIELD.aScale} />
        <primitive attach="attributes-aSpeed" object={FIELD.aSpeed} />
        <primitive attach="attributes-aPhase" object={FIELD.aPhase} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export function DustScene({ color, active }: { color: string; active: boolean }) {
  return (
    <SceneCanvas
      /* `always` while the scene is on screen and `never` once it is not.
         SceneCanvas defaults to `demand` so that a continuously animating scene
         has to say so, and this one does; what it must not do is keep saying so
         after the reader has scrolled past. R3F reads this prop on every render,
         so the loop stops and restarts with the observer in <CloseScene>. */
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 5], fov: 50 }}
      /* No fallback: reduced motion renders nothing here and the CSS glow under
         the canvas is the whole scene, which is the still version of the same
         picture rather than a substitute for it. */
      /* `antialias: false` because points are round sprites with their own
         soft falloff and nothing here has an edge to smooth, so the sample
         buffer would be spent on nothing.
      
         POWER PREFERENCE IS LEFT ALONE, and that is a correction. It asked for
         `low-power`, which is the honest description of this scene and the
         wrong thing to say on a page that also runs the bull at
         `high-performance`: two contexts asking for two different adapters is
         how a machine with both ends up switching between them, and a GPU
         switch takes every live context with it. One preference per page.
         SceneCanvas's default is the bull's, so the default is what this
         inherits. */
      gl={{ antialias: false }}
    >
      <Dust color={color} />
    </SceneCanvas>
  );
}
