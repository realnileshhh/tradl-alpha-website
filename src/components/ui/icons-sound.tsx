/**
 * The two speaker glyphs, hand-drawn. NOT from Figma, and deliberately not in
 * `components/ui/icons/`, which is generated: a hand-written file in there would
 * be erased by the next `npm run ds:build` and would break `ds:verify` before
 * it was.
 *
 * WHY THEY EXIST. The Icons page of the live Figma file carries 84 glyphs and
 * none of them is a speaker. The system has no answer here yet, so this is an
 * extension rather than a mirror, and the import path says so.
 *
 * WHY NOT A LIBRARY. Phosphor was the obvious reach and it is the wrong weight.
 * The generated set is drawn on a 12px grid with a 1px stroke, round caps and
 * round joins; a Phosphor glyph dropped beside it reads heavier and sits on a
 * different grid, which is visible the moment the button is next to the nav.
 * Two paths of our own cost nothing and match. If a speaker ever lands in the
 * Figma Icons page, this file is deleted and the generated one is imported.
 *
 * The geometry follows the set: viewBox on the 12px grid, `currentColor`,
 * `fill="none"`, and no size baked in beyond the 12px default, so the caller
 * sizes it with a wrapper the way every other icon here is sized.
 *
 * Added 2 Sep 2026. See docs/DESIGN-SYSTEM.md on extending the system.
 */
import type { SVGProps } from "react";

/** Speaker with two waves. The state where the hero video's audio is audible. */
export function IconSoundOn(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M5.4 2.9 3.4 4.6H1.9v2.8h1.5l2 1.7V2.9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.6 4.6a2 2 0 0 1 0 2.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 3.4a3.7 3.7 0 0 1 0 5.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The same speaker with the waves struck out. The waves are replaced rather
 * than crossed through, because a slash over two arcs at this size turns into a
 * smudge: at 12px the cross has to be the only thing to the right of the body.
 */
export function IconSoundOff(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        d="M5.4 2.9 3.4 4.6H1.9v2.8h1.5l2 1.7V2.9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.7 4.9 10.3 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3 4.9 7.7 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
