"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import type { Mesh } from "three";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { Effects } from "@/components/three/effects";
import { useAppStore } from "@/store/use-app-store";

function SpinningKnot() {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.45;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.9, 0.28, 160, 32]} />
        <meshStandardMaterial color="#3FCF8E" roughness={0.15} metalness={0.85} />
      </mesh>
    </Float>
  );
}

function FallingBall() {
  return (
    <RigidBody colliders="ball" restitution={0.75} position={[1.6, 3, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#818CF8" roughness={0.3} metalness={0.4} />
      </mesh>
    </RigidBody>
  );
}

function Floor() {
  return (
    <RigidBody type="fixed" colliders="cuboid" position={[0, -2, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color="#161616" roughness={0.9} />
      </mesh>
    </RigidBody>
  );
}

function ReadySignal() {
  const setSceneReady = useAppStore((s) => s.setSceneReady);
  // One-shot: flips the shared store the first frame the scene renders,
  // which is what a real hero would use to hand off from its static frame.
  useFrame(() => setSceneReady(true));
  return null;
}

/**
 * Proves, in one mount, that fiber + drei + postprocessing + rapier + three
 * all agree on the same React 19 reconciler. `frameloop="always"` because
 * physics and the spin both need a continuous clock; the SceneCanvas
 * default of "demand" is correct for static scenes.
 */
export function DemoScene() {
  return (
    <SceneCanvas
      frameloop="always"
      shadows
      camera={{ position: [0, 0.5, 6], fov: 45 }}
      fallback={
        <div className="grid h-full place-items-center text-tertiary">
          reduced motion: WebGL not mounted
        </div>
      }
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 3]} intensity={2} castShadow />
      <Environment preset="city" />

      <SpinningKnot />

      <Physics gravity={[0, -9.81, 0]}>
        <FallingBall />
        <Floor />
      </Physics>

      <ReadySignal />
      <OrbitControls enablePan={false} enableZoom={false} />
      <Effects />
    </SceneCanvas>
  );
}
