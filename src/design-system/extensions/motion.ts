/* =============================================================================
   MOTION VOCABULARY. Not from Figma. PROPOSED, awaiting design sign-off.

   The single source for every duration, curve, distance and trigger point the
   site animates with. GSAP, Motion and CSS all read from here, so the house
   curve is one curve rather than three that drifted apart.

   Figma was NOT queried for motion variables in the session that wrote this.
   The live file's collections (Primitives, Semantics, Shadows, Typography,
   Charts colors, Heatmap, Highlights) carry no motion names, and
   `get_motion_context` was not run. That is a reported gap, not a claim that
   Figma has nothing: if motion variables exist or land later, every value below
   is a promotion candidate and the Figma value wins.

   The CSS half lives in motion.css and is checked against this file by
   `npm run check:motion`, because two hand-kept copies of the same curve is
   exactly how a design system forks quietly.

   Added 30 Aug 2026. See src/design-system/extensions/README.md and docs/MOTION.md.
   ============================================================================= */

/**
 * The house curve, as control points. An ease-out with a long tail: it leaves
 * fast and lands slowly, which is what makes a reveal read as arriving rather
 * than as sliding.
 *
 * Consumed three ways, all from this one array:
 *   GSAP    registered as CustomEase under EASE in @/lib/gsap
 *   Motion  passed straight through as a `transition.ease` tuple
 *   CSS     mirrored into --motion-ease in motion.css, drift-checked
 */
export const EASE_POINTS = [0.22, 1, 0.36, 1] as const;

/** The registered GSAP ease name. Registration happens once in @/lib/gsap. */
export const EASE = "tradl-out";

/** SVG path form of EASE_POINTS, which is what CustomEase.create consumes. */
export const EASE_PATH = `M0,0 C${EASE_POINTS[0]},${EASE_POINTS[1]} ${EASE_POINTS[2]},${EASE_POINTS[3]} 1,1`;

/** cubic-bezier() form, for anywhere a string is needed at runtime. */
export const EASE_CSS = `cubic-bezier(${EASE_POINTS.join(", ")})`;

/**
 * The press curve. Overshoots past 1 and settles back, which is what makes a
 * button feel like it has a spring under it rather than a fade.
 *
 * CSS-facing only, and deliberately so. Press feedback is chrome: it answers a
 * pointer directly, it lasts 100ms, and routing it through GSAP would put a
 * JavaScript frame between the finger and the response for no gain. Nothing in
 * the reveal layer should use it.
 *
 * The second control point is above 1 on purpose. That is the overshoot; a
 * bezier clamped to 1 cannot express it and reads as a plain ease-out.
 */
export const EASE_PRESS_POINTS = [0.34, 1.56, 0.64, 1] as const;
export const EASE_PRESS_CSS = `cubic-bezier(${EASE_PRESS_POINTS.join(", ")})`;

/**
 * Seconds. Doc 04's rule, made numeric: chrome reacts faster than content
 * reveals, so a nav bar or a chip never feels like it is waiting for the page.
 *
 *   press       tap and active feedback. Must land inside the ~100ms window
 *               where a response still reads as caused by the finger
 *   chrome      nav, chips, hover, docks, anything that answers an input
 *   instrument  the default content reveal: dense modules, ledgers, tables
 *   statement   full-bleed typographic scenes, section openers and closes
 */
export const DURATION = {
  press: 0.1,
  chrome: 0.3,
  instrument: 0.5,
  statement: 0.8,
} as const;

/**
 * Reveal presets, one per register (doc 04 §1). The register is the only
 * variant that exists on purpose: a third one is a request to invent a third
 * register, which is a design decision and not a prop.
 *
 * `rise` is yPercent, never pixels. The type scale is fluid clamp(), so a
 * statement headline at 68px and a caption at 12px must travel proportionally
 * or the small one looks broken at desktop width and the big one at mobile.
 *
 * `start` is a ScrollTrigger start string. 88% fires as the element's top
 * crosses just inside the fold, which leaves the whole rise visible. Statement
 * scenes start marginally later because they are taller and travel further.
 */
export const REVEAL = {
  instrument: {
    rise: 12,
    duration: DURATION.instrument,
    stagger: 0.06,
    start: "top 88%",
  },
  statement: {
    rise: 25,
    duration: DURATION.statement,
    stagger: 0.09,
    start: "top 85%",
  },
} as const;

export type Register = keyof typeof REVEAL;

/**
 * Per-page ScrollTrigger budget, enforced by eye in review and by
 * `assertScrollBudget()` in development.
 *
 * `scrubbed` is the one that matters. A scrubbed trigger recalculates on every
 * scroll frame for the element's entire pass through the viewport; a one-shot
 * reveal fires once and, with `once: true`, kills itself. Doc 04 §5's LCP
 * budget is what these numbers protect.
 */
export const SCROLL_BUDGET = {
  triggers: 40,
  scrubbed: 4,
} as const;
