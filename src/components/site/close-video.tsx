import { BackgroundVideo } from "./background-video";

/**
 * The close's background video: dust turning in a shaft of green light.
 *
 * WHY THIS AND NOT ANOTHER DESK. The hero is one desk before the open: close,
 * intimate, preparation. This scene says "first generation", which is plural,
 * and it is the last thing read before the footer. Two videos of one desk on
 * one page read as a single asset stretched twice, so this one is abstract and
 * the two share only their grade.
 *
 * It also replaces <ParticleField> here rather than joining it. The dust in the
 * picture is doing the job the dot field was doing, and doc 02 §2.3 allows one
 * ambient element per viewport: a drifting video behind a twinkling dot field
 * is two.
 *
 * Three differences from the hero, all of them props:
 *
 *   section   this scene is already about a screen tall, so the picture fills
 *             it rather than being held to one viewport.
 *   approach  it is below the fold, so nothing is fetched until the reader is
 *             heading towards it. The still is lazy for the same reason: a
 *             preload here would compete with the content being read.
 *   no sound  the file carries no audio track at all. One mute control per
 *             page, and the hero has it.
 */

const STILL = "/video/close-still.webp";

const SOURCES = [
  { src: "/video/close-loop.webm", type: "video/webm" },
  { src: "/video/close-loop.mp4", type: "video/mp4" },
] as const;

export function CloseVideo() {
  return (
    <BackgroundVideo
      still={STILL}
      stillWidth={1600}
      stillHeight={900}
      sources={SOURCES}
      veilClassName="close-veil"
      fill="section"
      gate="approach"
    />
  );
}
