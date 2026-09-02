import { BackgroundVideo } from "./background-video";

/**
 * The hero's background video: one desk in the hour before the open.
 *
 * The mechanics all live in <BackgroundVideo>. What is decided here is the
 * three things this scene does differently from the close:
 *
 *   viewport  the picture is held to one screen rather than the whole section.
 *             The hero runs about 1,500px on a laptop and `object-cover` over a
 *             box that tall crops a 1920x1080 source by nearly half its width.
 *   idle      it is on screen at first paint, so it loads as soon as the page
 *             has nothing better to do.
 *   sound     this is the one video on the page with audio, so it is the one
 *             that gets the mute control. The close is silent by design.
 */

const STILL = "/video/hero-still.webp";

const SOURCES = [
  { src: "/video/hero-loop.webm", type: "video/webm" },
  { src: "/video/hero-loop.mp4", type: "video/mp4" },
] as const;

export function HeroVideo() {
  return (
    <BackgroundVideo
      still={STILL}
      stillWidth={1600}
      stillHeight={900}
      sources={SOURCES}
      veilClassName="hero-veil"
      fill="viewport"
      gate="idle"
      sound
    />
  );
}
