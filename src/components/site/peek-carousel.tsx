"use client";

import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { IconArrowPointLeft, IconArrowPointRight } from "@/components/ui/icons";
import { Frame, FrameInner } from "@/components/ui/surface";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  PEEK_GROUP_LABEL,
  PEEK_NEXT_LABEL,
  PEEK_PREV_LABEL,
  PEEK_SHOW_LABEL,
  PEEK_SURFACES,
} from "@/lib/site";

/**
 * The sneak peek carriage: four product windows on a rail, advancing on their
 * own once the section is on screen.
 *
 * THE TRACK IS THREE COPIES OF THE FOUR AND IT NEVER ENDS. The carriage starts
 * in the middle copy; when it runs off either end it is put back a whole copy
 * with the transition switched off, and because the window it lands on is the
 * identical window nothing is visible. That is what buys a wrap which animates
 * in the direction it was already going, instead of the whole rail flying back
 * to the start after the fourth window. Only three windows are ever mounted:
 * the live one and its two neighbours.
 *
 * THE METER IS THE CLOCK. There is no interval in this file. The current dot's
 * fill runs a `--motion-dwell-slide` keyframe and the carriage advances on that
 * animation's end, so the bar and the slideshow are one mechanism rather than
 * two that agree until something pauses one of them. Hover, focus and touch set
 * `data-peek-hold`, CSS pauses the keyframe, and the slideshow holds exactly
 * where the bar holds, resuming from there rather than from the top.
 *
 * ONE TRIGGER, AND IT ONLY EVER STARTS THINGS. It fires once, the first time
 * the section reaches the fold, and from then on the carriage runs for the life
 * of the page. Nothing stops it: an arrow or a dot moves it and restarts the
 * dwell, exactly as the earlier build does, and scrolling away does not pause
 * it either. Waiting until the section is on screen is the only gate, because a
 * slideshow that runs three screens above the fold has already finished by the
 * time anyone arrives.
 *
 * A POINTER OVER THE SECTION DOES NOT HOLD IT. Pausing on hover is the usual
 * carousel reflex and it is wrong here: this is a timed peek at four surfaces
 * rather than something to read in place, and a reader whose cursor happens to
 * rest on the page would silently never see the other three. KEYBOARD focus is
 * the one thing that holds the meter, because a reader who has tabbed into the
 * carriage is working through it deliberately and the controls under their
 * fingers should not move on their own.
 *
 * `:focus-visible`, not `:focus`, and the difference is the whole behaviour.
 * Clicking a button focuses it, so a plain focus test made every click on an
 * arrow or a dot freeze the meter at nothing: the carriage moved once and then
 * sat there with an empty bar until the visitor clicked somewhere else. The
 * browser already knows which focus came from a keyboard, so it is asked.
 *
 * That leaves focus as the only pause on the row, which is a deliberate reading
 * of doc 04 §7 and WCAG 2.2.2 rather than an oversight: a separate stop control
 * is the belt-and-braces answer, and it is one flag away.
 *
 * UNDER REDUCED MOTION NOTHING ADVANCES AND NOTHING ANIMATES. No trigger is
 * created and `data-peek-auto` is never set, so the keyframe is never applied
 * and the section is four buttons and a rail. That is deliberate rather than
 * incidental: the global CSS floor collapses animations to 0.01ms, and an
 * advance fired off the end of one would run all four windows inside a frame.
 */

const COUNT = PEEK_SURFACES.length;
const COPIES = 3;
/** The carriage starts in the middle copy, so it can run either way at once. */
const OFFSET = COUNT;
const TRACK = Array.from({ length: COUNT * COPIES }, (_, k) => k % COUNT);

/** Pixels of travel before a touch counts as a swipe rather than a tap. */
const SWIPE = 48;

/** The keyframe in globals.css whose end advances the carriage. */
const PROGRESS_ANIMATION = "peek-progress";

const mod = (n: number, m: number) => ((n % m) + m) % m;
const pad = (n: number) => String(n).padStart(2, "0");

export function PeekCarousel({ panels }: { panels: ReactNode[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [pos, setPos] = useState(OFFSET);
  /** True for the one frame the wrap is applied, with the transition off. */
  const [snap, setSnap] = useState(false);
  /** Bumped on every move. It is the fill's key, so the meter restarts. */
  const [stamp, setStamp] = useState(0);
  /** Latched the first time the section reaches the fold, and never unset. */
  const [started, setStarted] = useState(false);
  /** Keyboard focus is inside the carriage, so the clock holds. */
  const [held, setHeld] = useState(false);


  const index = mod(pos, COUNT);
  const auto = started && !prefersReducedMotion;

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const root = scope.current;
      if (!root) return;

      /* Not scrubbed, and it animates nothing: it starts the clock. `onToggle`
         only ever sets the latch true, and the progress check covers the case
         where the page is restored below this section, where the trigger has
         already been passed and would never fire again. */
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 75%",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) setStarted(true);
        },
      });

      if (trigger.progress > 0 || trigger.isActive) setStarted(true);
    },
    { scope, dependencies: [prefersReducedMotion] },
  );

  const advance = useCallback(() => {
    setSnap(false);
    setPos((p) => p + 1);
    setStamp((s) => s + 1);
  }, []);

  /* Moving the carriage by hand restarts the dwell rather than ending it: the
     meter goes back to empty and the window a visitor just chose gets its full
     seven seconds before the next one arrives. */
  const go = useCallback((delta: number) => {
    setSnap(false);
    setPos((p) => p + delta);
    setStamp((s) => s + 1);
  }, []);

  const jump = useCallback((n: number) => {
    setSnap(false);
    setPos(OFFSET + n);
    setStamp((s) => s + 1);
  }, []);

  /** The wrap, applied the moment the slide transition finishes. */
  const onTransitionEnd = useCallback(() => {
    setPos((p) => {
      if (p >= OFFSET && p < OFFSET + COUNT) return p;
      setSnap(true);
      return OFFSET + mod(p, COUNT);
    });
  }, []);

  const id = useId();
  const slideId = (n: number) => `${id}-slide-${n}`;
  const dotId = (n: number) => `${id}-dot-${n}`;

  return (
    <div
      ref={scope}
      role="group"
      aria-roledescription="carousel"
      aria-label={PEEK_GROUP_LABEL}
      tabIndex={0}
      /* React's focus events bubble, so this one pair covers every control
         inside the carriage. There is deliberately no pointer equivalent, and
         the `:focus-visible` test is what keeps a click from counting as one:
         a mouse click focuses the button it lands on, which would otherwise
         stop the meter dead the moment anyone used an arrow. */
      onFocus={(event) => {
        const target = event.target as HTMLElement;
        setHeld(typeof target.matches === "function" && target.matches(":focus-visible"));
      }}
      onBlur={() => setHeld(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        else if (event.key === "ArrowLeft") go(-1);
        else return;
        event.preventDefault();
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const from = touchX.current;
        const to = event.changedTouches[0]?.clientX ?? null;
        touchX.current = null;
        if (from === null || to === null) return;
        const travelled = to - from;
        if (Math.abs(travelled) >= SWIPE) go(travelled < 0 ? 1 : -1);
      }}
    >
      {/* Full bleed, and it has to be: the neighbours sit outside the measure
          and the page edge is what clips them. */}
      <div className="peek-viewport">
        <div
          className="peek-track"
          data-peek-snap={snap}
          style={{ "--peek-index": String(pos) } as React.CSSProperties}
          onTransitionEnd={onTransitionEnd}
        >
          {TRACK.map((surfaceIndex, n) => {
            const surface = PEEK_SURFACES[surfaceIndex]!;
            const live = n === pos;
            /* Only the live window and its two neighbours are in the DOM. A
               product miniature is a few hundred nodes; twelve of them is a
               page's worth of markup nobody will ever see. */
            const mounted = Math.abs(n - pos) <= 1;

            return (
              <div
                key={n}
                className="peek-slide"
                data-active={live}
                id={slideId(n)}
                role="group"
                aria-roledescription="slide"
                aria-label={surface.name}
                aria-hidden={!live || undefined}
              >
                <Frame size="bezel" className="flex h-full w-full flex-col">
                  <FrameInner size="bezel" className="flex min-h-0 flex-1 flex-col">
                    {/* The window's own bar: the surface and its claim on the
                        left, which of the four this is on the right. It used to
                        carry a STAGED badge as well, for the figures in the
                        drawings that used to be under it. There are no figures
                        now, so there is nothing for it to declare. */}
                    <div className="flex shrink-0 items-center justify-between gap-[var(--ds-space-4)] border-b border-line bg-toolbar px-[var(--ds-space-5)] py-[var(--ds-space-4)]">
                      <span className="truncate text-xs tracking-[0.12em] text-fg-3 uppercase">
                        {surface.chrome}
                      </span>
                      <span className="num shrink-0 text-xs text-fg-disabled">
                        {pad(surfaceIndex + 1)} / {pad(COUNT)}
                      </span>
                    </div>

                    {/* The panel. Rendered on the server and handed in. */}
                    <div className="min-h-0 flex-1 overflow-hidden">
                      {mounted ? panels[surfaceIndex] : null}
                    </div>

                    <p className="shrink-0 border-t border-line px-[var(--ds-space-5)] py-[var(--ds-space-4)] text-xs leading-[1.5] text-fg-3">
                      {surface.caption}
                    </p>
                  </FrameInner>
                </Frame>
              </div>
            );
          })}
        </div>
      </div>

      {/* The controls, in the earlier build's arrangement: the two directions
          flanking the name of what you are looking at, and the meter under it. */}
      <div className="mt-[26px] px-[var(--content-gutter)]">
        <div className="flex items-center justify-center gap-[var(--ds-space-5)]">
          <button
            type="button"
            aria-label={PEEK_PREV_LABEL}
            onClick={() => go(-1)}
            className="press grid size-11 place-items-center rounded-full border border-line bg-surface text-fg-2 shadow-spec hover:border-line-2 hover:text-fg"
          >
            <span aria-hidden="true" className="grid size-4 place-items-center">
              <IconArrowPointLeft width="100%" height="100%" />
            </span>
          </button>

          {/* Live only while focus is inside the carriage, which is exactly
              when a visitor is driving it: an arrow or a dot changes this text
              and nothing moves focus, so without a live region a keyboard user
              gets no confirmation at all. Left live the rest of the time it
              would announce a new surface every seven seconds, for the life of
              the page, to a reader who never asked for any of them. */}
          <p
            aria-live={held ? "polite" : "off"}
            className="flex min-h-11 min-w-[220px] items-center justify-center rounded-full border border-line px-[var(--ds-space-6)] text-center text-sm tracking-[0.12em] text-fg uppercase"
          >
            {PEEK_SURFACES[index]!.name}
            <span className="sr-only">
              , {index + 1} of {COUNT}
            </span>
          </p>

          <button
            type="button"
            aria-label={PEEK_NEXT_LABEL}
            onClick={() => go(1)}
            className="press grid size-11 place-items-center rounded-full border border-line bg-surface text-fg-2 shadow-spec hover:border-line-2 hover:text-fg"
          >
            <span aria-hidden="true" className="grid size-4 place-items-center">
              <IconArrowPointRight width="100%" height="100%" />
            </span>
          </button>
        </div>

        {/* The meter. Four dots, the current one open and filling for as long
            as the window is held. */}
        <div
          className="mt-[var(--ds-space-3)] flex justify-center"
          data-peek-auto={auto}
          data-peek-hold={held}
          /* Motion off: the meter is painted whole. A bar that will never move
             reads better full than permanently empty. */
          data-peek-still={prefersReducedMotion}
          onAnimationEnd={(event) => {
            if (!auto) return;
            if (event.animationName !== PROGRESS_ANIMATION) return;
            advance();
          }}
        >
          {PEEK_SURFACES.map((surface, n) => (
            <button
              key={surface.name}
              type="button"
              id={dotId(n)}
              aria-label={`${PEEK_SHOW_LABEL} ${surface.name}`}
              aria-current={n === index}
              onClick={() => jump(n)}
              data-peek-dot=""
              data-current={n === index}
              className="peek-dot-button group flex h-11 items-center px-[var(--ds-space-3)]"
            >
              <span className="peek-dot">
                <span className="peek-dot-idle" />
                <span className="peek-dot-track">
                  {/* Keyed on the move counter, so every advance is a fresh
                      element and the keyframe starts from nothing again. */}
                  {n === index ? <span key={stamp} className="peek-fill" /> : null}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
