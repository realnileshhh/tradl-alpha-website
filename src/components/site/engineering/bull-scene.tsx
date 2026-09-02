"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import {
  Box3,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  type Object3D,
} from "three";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { useAppStore } from "@/store/use-app-store";

/**
 * The turning bull.
 *
 * THE ASSET. `public/models/bull.glb`, 968KB. The supplied model was 57.4MB and
 * 1.96 million triangles, which is a figure a phone cannot hold and a number no
 * marketing page should ever ship. It was reduced with gltf-transform 4.4.2, in
 * this order, and the command is recorded here because the source file is not in
 * the repository and nobody should have to re-derive the ratio:
 *
 *   gltf-transform weld     in.glb  b1.glb
 *   gltf-transform simplify b1.glb  b2.glb  --ratio 0.05 --error 0.0015
 *   gltf-transform resize   b2.glb  b3.glb  --width 1024 --height 1024
 *   gltf-transform webp     b3.glb  b4.glb  --quality 82
 *   gltf-transform meshopt  b4.glb  out.glb --level medium
 *
 * 98k triangles survive, which holds the silhouette, the horns and the muscle
 * break at every size this section renders at. See docs/DECISIONS.md 008.
 *
 * MESHOPT, NOT DRACO. `useGLTF`'s `useDraco` argument defaults to true, and that
 * default constructs a DRACOLoader pointed at a Google CDN. Meshopt's decoder
 * ships inside three-stdlib, so the compression costs no third-party request.
 * Hence the explicit `false, true`.
 *
 * THE MATERIAL IS OURS, THE GEOMETRY IS THEIRS. The model arrives with a green
 * base colour that has its lighting baked in, and it is a duller, yellower green
 * than the brand accent. Rendered as authored it reads as an imported asset
 * sitting on the page. So the base colour map is dropped and the surface is
 * rebuilt as dark graphite lit by an accent key, keeping the normal and
 * roughness maps, which is where the anatomy actually lives. The rim is a
 * fresnel term injected into the standard material, so the silhouette edge
 * lights up in the brand green as the body turns away from the camera.
 *
 * NO RAW COLOUR HERE. Every colour is read from the mirrored tokens on the DOM
 * side and handed in as a prop, which is also what `npm run check:surfaces`
 * requires. See `bull-stage.tsx`.
 *
 * FRAMELOOP DEMAND. The scene has no clock of its own: it renders when the
 * turntable angle changes and at no other time, which for most of this section's
 * life means not at all. The angle arrives through the store rather than through
 * props, because it changes on every frame of a drag and a prop would re-render
 * the React tree each time to produce the same elements.
 */

/* Shared with bull-stage.tsx, which starts this downloading before the scene
   is ever asked for. See ./bull-asset. */
export { MODEL_URL } from "./bull-asset";
import { MODEL_URL } from "./bull-asset";

/** Height the model is normalised to, in world units, before the camera frames it. */
const MODEL_HEIGHT = 1;

/**
 * The resting pose, in radians, added to whatever the page and the visitor have
 * turned it to.
 *
 * Dead-on is the pose a model arrives in and the least flattering one it has:
 * the body is hidden behind the head, the horns read as a single mass, and the
 * lit side and the shadow side are symmetric, so nothing describes the shape.
 * Minus 54 degrees is a three-quarter, which shows the shoulder, the flank and
 * the near horn at once, and puts the accent key across the front of the animal
 * rather than down one edge.
 *
 * The offset lives here rather than in the store, which means the store's zero
 * is this pose. Two things fall out of that and both are wanted:
 * `bull-still.webp` is captured at it without the capture harness needing to
 * know the number, and, because the timeline re-zeroes itself until the scene is
 * live, this is also the first angle the canvas ever renders. The still and the
 * scene therefore agree exactly at the moment they swap.
 */
const REST_ANGLE = -0.3 * Math.PI;

export type BullPalette = {
  /** The body. `--ds-color-grey-750`, the opaque structural grey. */
  base: string;
  /** Key light and fresnel rim. `--ds-accent-secondary`, the visible brand green. */
  accent: string;
  /** Back light. `--ds-accent-primary`, deep enough not to halo the horns. */
  deep: string;
  /** Fill, opposite the key. Achromatic, so the key stays the only hue. */
  fill: string;
};

export function BullScene({
  palette,
  onReady,
}: {
  palette: BullPalette;
  /** Fired on the first frame the model is actually in the scene. */
  onReady: () => void;
}) {
  return (
    <SceneCanvas
      /* Transparent, so the section's own scrim and the page ground show
         through. A <color attach="background"> here would paint a rectangle
         over both. */
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.04, 2.5], fov: 30 }}
      /* Reduced motion never reaches here: the stage renders the painted still
         instead and this module is not even imported. Passing null keeps the
         fallback contract explicit. */
      fallback={null}
    >
      <ambientLight intensity={0.32} />

      {/* Key, upper left, in the brand accent. This is what makes the model
          belong to the page rather than to the file it came out of. */}
      <directionalLight position={[-3.2, 3.4, 2.6]} intensity={2.4} color={palette.accent} />

      {/* Fill, lower right, cool and weak. Enough to keep the shadow side from
          going to pure black, not enough to flatten the key. */}
      <directionalLight position={[3.6, 0.6, 2.2]} intensity={1.6} color={palette.fill} />

      {/* Back light, behind and above, which is what separates the horns from
          the ground behind them at every angle in the turn. */}
      <directionalLight position={[0.4, 2.6, -3.4]} intensity={2.6} color={palette.deep} />

      {/* Specular structure, built from lightformers rather than fetched. drei's
          `preset` environments are downloads from a third-party CDN; three
          rectangles rendered once into a 128px cube give the metal something to
          reflect for no network cost at all. `frames={1}` bakes it and stops it
          re-rendering with the demand loop. */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2.4} color={palette.accent} position={[-2, 2, 1]} scale={[3, 2, 1]} />
        <Lightformer intensity={1.1} color={palette.fill} position={[2.4, 0.4, 1]} scale={[2, 3, 1]} />
        <Lightformer intensity={0.8} color={palette.fill} position={[0, -2, 1]} scale={[4, 1, 1]} />
      </Environment>

      <Bull palette={palette} onReady={onReady} />
    </SceneCanvas>
  );
}

function Bull({ palette, onReady }: { palette: BullPalette; onReady: () => void }) {
  const group = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  /* Draco off, meshopt on. See the note above. */
  const { scene } = useGLTF(MODEL_URL, false, true);

  /**
   * Centre the model on the origin and scale it to a known height, so the camera
   * framing is a constant rather than a number tuned to whatever units the model
   * happened to be exported in. Re-materialise in the same pass.
   *
   * IT MUST BE IDEMPOTENT, and that is not a nicety. drei's GLTF cache hands
   * back the same object every time, and React runs a memo twice under
   * StrictMode, so this body will be applied to an already-transformed scene.
   * Measuring without resetting first reads the box it produced last time, which
   * computes a scale of 1, undoes the fit and drops the model half a body height
   * out of frame. Resetting the transform before measuring is what makes running
   * it twice the same as running it once.
   *
   * The original material is parked in `userData` for the same reason: on a
   * second pass `object.material` is already ours, and re-deriving from it would
   * compound.
   */
  const model = useMemo(() => {
    scene.position.set(0, 0, 0);
    scene.scale.setScalar(1);

    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    const centre = new Vector3();
    box.getSize(size);
    box.getCenter(centre);

    const scale = MODEL_HEIGHT / size.y;
    scene.scale.setScalar(scale);
    scene.position.set(-centre.x * scale, -centre.y * scale, -centre.z * scale);

    scene.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;

      const source = (object.userData.sourceMaterial ??=
        object.material) as MeshStandardMaterial;

      object.material = machined(source, palette);
      object.castShadow = false;
      object.receiveShadow = false;
    });

    return scene;
  }, [scene, palette]);

  /**
   * The turntable. `subscribe` is the vanilla store API, so this runs outside
   * React entirely: the angle lands on the object and the frame is requested by
   * hand. Reading the same values with `useAppStore(s => s.bullScroll)` would
   * re-render this component on every frame of a scroll or a drag to produce an
   * identical tree.
   *
   * The two contributions are added here rather than merged by their writers,
   * because they have two owners and neither should have to know the other's
   * current value. Scroll turns the model as the section passes; a drag is an
   * offset the visitor holds on top of that.
   */
  useEffect(() => {
    const apply = (scroll: number, drag: number) => {
      if (!group.current) return;
      group.current.rotation.y = REST_ANGLE + scroll + drag;
      invalidate();
    };

    const initial = useAppStore.getState();
    apply(initial.bullScroll, initial.bullDrag);

    return useAppStore.subscribe((state) => apply(state.bullScroll, state.bullDrag));
  }, [invalidate]);

  /* Suspense holds this component until the GLTF has resolved, so the first run
     of this effect is the first moment there is something to look at. That is
     when the still underneath is allowed to go. */
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <group ref={group}>
      <primitive object={model} />
    </group>
  );
}

/**
 * The model's PBR maps, on our surface.
 *
 * `map` is deliberately dropped rather than tinted. The supplied base colour has
 * ambient occlusion painted into it, so multiplying a graphite over it darkens
 * the creases twice and the animal loses its form. The normal map carries the
 * same creases as geometry, which survives relighting; the roughness map keeps
 * the horns polished and the hide matte, which is most of what makes it read as
 * a made object.
 *
 * Metalness sits at 0.45: high enough that the lightformers show as rolling
 * highlights across the flank during the turn, low enough that the diffuse
 * accent key still describes the shape.
 */
function machined(source: MeshStandardMaterial, palette: BullPalette): MeshStandardMaterial {
  const material = new MeshStandardMaterial({
    color: new Color(palette.base),
    normalMap: source.normalMap ?? null,
    roughnessMap: source.roughnessMap ?? null,
    metalnessMap: source.metalnessMap ?? null,
    metalness: 0.32,
    roughness: 0.62,
    envMapIntensity: 0.6,
  });

  const rim = new Color(palette.accent);

  /**
   * The fresnel rim, injected into the standard shader rather than added as a
   * second inverted-hull mesh. The hull trick would double the draw call and the
   * geometry; this costs three lines of GLSL and one uniform.
   *
   * `vViewPosition` points from the fragment to the camera, so the dot with the
   * vertex normal is 1 face-on and 0 at the silhouette. The vertex normal is
   * used rather than the mapped one on purpose: a normal-mapped rim sparkles on
   * every crease instead of drawing the outline.
   */
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = { value: rim };
    shader.uniforms.uRimPower = { value: 3.6 };
    shader.uniforms.uRimStrength = { value: 1.1 };

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         uniform vec3 uRimColor;
         uniform float uRimPower;
         uniform float uRimStrength;`,
      )
      .replace(
        "#include <opaque_fragment>",
        `float rimFacing = saturate(dot(normalize(vNormal), normalize(vViewPosition)));
         totalEmissiveRadiance += uRimColor * pow(1.0 - rimFacing, uRimPower) * uRimStrength;
         #include <opaque_fragment>`,
      );
  };

  return material;
}

/* Warms the cache the moment this chunk is evaluated, which only happens once
   the section is within a viewport and a half of the fold. See bull-stage.tsx. */
useGLTF.preload(MODEL_URL, false, true);
