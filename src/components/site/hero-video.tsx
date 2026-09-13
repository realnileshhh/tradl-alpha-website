import { SHOW_HERO_DEMO_SCENE } from "@/lib/flags";
import { BackgroundVideo } from "./background-video";

/**
 * The hero's background video: one desk in the hour before the open.
 *
 * The mechanics all live in <BackgroundVideo>. What is decided here is the
 * four things this scene does differently from the close:
 *
 *   fill      how tall the picture is, and it follows the scene's height. See
 *             below.
 *   idle      it is on screen at first paint, so it loads as soon as the page
 *             has nothing better to do.
 *   sound     this is the one video on the page with audio, so it is the one
 *             that gets the mute control. The close is silent by design.
 *   placement which corner that control takes, and it follows the layout rather
 *             than being a preference. See below.
 */

/**
 * HOW TALL THE PICTURE IS, and why it is no longer held to one viewport.
 *
 * `viewport` was right while the demo scene pinned this section: the hero ran
 * about 1,500px on a laptop, and `object-cover` over a box that tall crops a
 * 1920x1080 source by nearly half its width and throws away the framing the
 * shot was generated for.
 *
 * Without the pin the section is about a screen tall by construction: it takes
 * a minimum of the viewport less --hero-chrome and centres its content in it.
 * `section` is then the honest fill. Measured at 1440x900 the box becomes
 * 1440x721, which covers from a 1920x1080 source at full width with 89px of
 * vertical crop, against the 160px of horizontal crop the viewport box was
 * taking. More of the frame, and the scrim's stops land where they were tuned
 * to land, because --hero-veil is a percentage gradient over this box: held to
 * a viewport inside a shorter section, only the top half of it ever painted.
 *
 * It flips back with the demo scene, for the same reason it was `viewport`
 * before.
 */
const FILL = SHOW_HERO_DEMO_SCENE ? "viewport" : "section";

/**
 * WHERE THE MUTE CONTROL GOES, and why it is tied to a flag.
 *
 * The hero is two columns now, and the right one is the media pane, which runs
 * from the top of the content to within 56px of the section's bottom edge. The
 * control used to sit at the top right of the measure; measured at 1440x900
 * that put a 36px button at x 1284-1320, y 295-331, inside a pane spanning
 * 748-1320 by 251-612. It was not near the pane, it was on it, and it would
 * have been on the product screenshot the moment one landed.
 *
 * Bottom left is clear of both columns. It is only correct while nothing pins
 * this section: the placement is anchored to the section's bottom edge, and a
 * pinned section's bottom edge is a viewport or more below the fold for the
 * whole of the pin, which would park the control off screen.
 *
 * The pin comes back with the demo scene, so the flag is the condition. When
 * SHOW_HERO_DEMO_SCENE goes true this returns to `top-right` on its own, and
 * the collision with the media pane comes back with it: that is the second look
 * the flag's own note asks for, and it is a composition question rather than a
 * placement one.
 */
const CONTROL_PLACEMENT = SHOW_HERO_DEMO_SCENE ? "top-right" : "bottom-left";

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
      fill={FILL}
      gate="idle"
      sound
      controlPlacement={CONTROL_PLACEMENT}
    />
  );
}
