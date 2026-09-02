/**
 * The model's URL, in a module of its own so two callers can agree on it
 * without one of them pulling in the other's chunk.
 *
 * `bull-scene.tsx` loads it, and `bull-stage.tsx` starts it downloading long
 * before that scene is asked for. If the stage imported the constant from the
 * scene it would import the scene, which is 600KB of three, drei and the
 * post-processing chain, and the whole point of the head start is to move the
 * bytes without mounting anything.
 */
export const MODEL_URL = "/models/bull.glb";
