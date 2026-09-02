"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconSoundOff, IconSoundOn } from "@/components/ui/icons-sound";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import { SOUND_OFF_LABEL, SOUND_ON_LABEL } from "@/lib/site";

/**
 * The hero's background video, its scrim, and the control that unmutes it.
 *
 * THE STILL IS THE FIRST FRAME, and this is the whole reason the component is
 * shaped the way it is. Doc 04 §5 gives the site an LCP budget of 2.0s on a
 * mid-range Android over 4G and says in the same breath that the hero's first
 * frame must be a painted static which JavaScript upgrades afterwards. A
 * `<video>` is the single easiest way to lose that budget, so nothing here
 * requests a byte of video during the first paint:
 *
 *   1  The server renders `hero-still.webp`, an 11KB picture of the video's
 *      opening frame, and nothing else. If it is the LCP element, the LCP
 *      element is 11KB.
 *   2  The <video> ships with `preload="none"` and NO sources. A video element
 *      with no source loads nothing, so the element itself is free.
 *   3  After the page goes idle, the sources mount, `load()` runs, and the
 *      video crosses over the still on a statement-length fade.
 *
 * If the network never delivers it, or the browser refuses to autoplay, what
 * stays on screen is the first frame of the video rather than a hole. That is
 * the same contract `bull-stage` keeps with its still, for the same reason.
 *
 * WHY THE STILL AND THE VIDEO ARE TWO ELEMENTS rather than one `poster`
 * attribute: a poster is painted BY the video element, so fading the video in
 * would fade the poster in with it and the first paint would be empty. Two
 * elements let the still be opaque from the first frame and the video arrive
 * over the top of it.
 *
 * MUTED BY DEFAULT, and it has to be: autoplay with sound is refused by every
 * browser and banned by doc 04 §5 besides. The control is the only thing that
 * can start the audio, which means the audio only ever starts because somebody
 * asked for it.
 *
 * IT STOPS WHEN IT LEAVES THE SCREEN. An observer pauses the video once the
 * hero is out of the viewport and resumes it on the way back. Muted, this is a
 * battery decision. Unmuted it is a correctness one: audio playing from a scene
 * that is four sections above the reader, with its control off screen, is the
 * kind of thing people close the tab over.
 *
 * REDUCED MOTION, doc 04 §5: the sources never mount, so no video is fetched
 * and no WebGL-scale work happens. The still is the whole component and the
 * sound control is not rendered, because there is nothing playing to unmute.
 *
 * COMPOSITING. The video and the veil are two siblings in one layer behind the
 * content, and the only property that ever animates is opacity. Nothing here
 * transitions a layout property or a filter (docs/SURFACES.md), and the veil is
 * one gradient rather than a stack, so the whole background costs two paints.
 */

const STILL = "/video/hero-still.webp";
const SOURCES = [
  { src: "/video/hero-loop.webm", type: "video/webm" },
  { src: "/video/hero-loop.mp4", type: "video/mp4" },
] as const;

/**
 * How long to wait for an idle moment before asking for the video at all.
 *
 * `requestIdleCallback` with a timeout rather than a bare timer: on a fast
 * connection the video starts about as soon as the page settles, and on a slow
 * one it waits behind whatever is still parsing rather than competing with it.
 * The timeout is the ceiling, so a page that never goes idle still gets its
 * video within two seconds.
 */
const IDLE_TIMEOUT_MS = 2000;

/**
 * The control's distance from the top of the section.
 *
 * The hero is pinned by its scroll choreography, which means for one viewport
 * of scrolling the section's top edge sits under the sticky nav. The nav pane
 * ends 68px down (12px of header padding plus its own 56px), the header keeps
 * another 32px below it for the alpha notice that hangs off the sign-up button,
 * and 16px of air after that clears both. A control that slid under a blurred
 * nav pane for the length of the pin would read as a bug.
 */
const CONTROL_TOP = "116px";

export function HeroVideo() {
  const prefersReducedMotion = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [wanted, setWanted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  /* Ask for the video once the page has nothing better to do. Reduced motion
     never gets here, so it never costs a request. */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const want = () => setWanted(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(want, { timeout: IDLE_TIMEOUT_MS });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(want, IDLE_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion]);

  /* The sources are in the tree now, but a <video> that gained children after
     mount does not notice them on its own. `load()` is what makes it look. */
  useEffect(() => {
    const element = video.current;
    if (!wanted || !element) return;

    element.load();
    void element.play().catch(() => {
      /* Autoplay refused, which is a legitimate browser state and not an
         error. The still is already on screen and stays there. */
    });
  }, [wanted]);

  /* Off screen is off. Resuming on the way back rather than restarting, so a
     reader who scrolls up finds the scene where they left it. */
  useEffect(() => {
    const element = video.current;
    if (!wanted || !element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [wanted]);

  /**
   * The element is the source of truth for muting, not React state: a click
   * has to reach `element.muted` inside the gesture for the browser to accept
   * it. State follows, to label the button.
   */
  const toggleSound = useCallback(() => {
    const element = video.current;
    if (!element) return;

    const next = !element.muted;
    element.muted = next;
    if (!next) void element.play().catch(() => {});
    setMuted(next);
  }, []);

  return (
    <>
      {/* The background layer. Inert by construction: behind its siblings, out
          of the accessibility tree, and unable to take a pointer.

          ONE VIEWPORT TALL, not the whole section, and that is a composition
          decision rather than a performance one. The hero section runs about
          1,500px on a laptop; `object-cover` over a box that tall crops a
          1920x1080 source by nearly half its width and throws away the framing
          the shot was generated for. Held to `100svh` the crop is about a
          tenth, so the desk stays a desk. The section below the first screen is
          clean ground, which is where the demo frame wants to sit anyway. The
          outer box clips, so this can never bleed into the section beneath. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-svh">
        <Image
          src={STILL}
          /* Decorative. The scene carries no information the copy does not,
              and a described background under a headline is noise to read. */
          alt=""
          width={1600}
          height={900}
          /* The LCP candidate, so it gets the preload link. */
          priority
          /* Already optimised, and the optimiser makes it worse: this is a
             hand-encoded 11KB webp rendered from the video's own first frame,
             and running it back through /_next/image returns 20KB of JPEG. One
             fixed decorative asset at one size has nothing to gain from a
             resizing pipeline and a round trip. */
          unoptimized
          className="size-full object-cover"
        />

        <video
          ref={video}
          className={cn(
            "absolute inset-0 size-full object-cover",
            "transition-opacity duration-[var(--motion-statement)] ease-house",
            playing ? "opacity-100" : "opacity-0",
          )}
          preload="none"
          muted
          loop
          playsInline
          autoPlay
          tabIndex={-1}
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        >
          {wanted
            ? SOURCES.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))
            : null}
        </video>

          <div className="hero-veil absolute inset-0" />
        </div>
      </div>

      {/* The control, on the measure's right edge so it lands on the same
          vertical as the nav pane above it rather than 24px outside it. The
          rail is inert and only the button takes the pointer, so it can never
          swallow a click meant for the headline behind it. */}
      {wanted ? (
        <div
          className="pointer-events-none absolute inset-x-0 z-10 px-[var(--content-gutter)]"
          style={{ top: CONTROL_TOP }}
        >
          <div className="mx-auto flex max-w-content justify-end">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              /* No backdrop blur, deliberately. Doc 04 §5 allows two blurred
                 surfaces per viewport and the nav pane already spends one; a
                 36px control is not worth the second. bg/elevated over a dark
                 video reads the same and costs nothing. */
              className={cn(
                "press touch-target pointer-events-auto grid size-9 place-items-center",
                "rounded-full border border-line bg-elevated text-fg-2 shadow-spec",
                "hover:border-line-2 hover:text-fg",
              )}
            >
              <span className="grid size-[12px] place-items-center">
                {muted ? <IconSoundOff /> : <IconSoundOn />}
              </span>
              <span className="sr-only">{muted ? SOUND_ON_LABEL : SOUND_OFF_LABEL}</span>
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
