import { IconExpand } from "@/components/ui/icons/icon-expand";
import { AccentWord } from "@/components/ui/accent-word";
import {
  VIEWPORT_GATE_BODY,
  VIEWPORT_GATE_TITLE_BEAT,
  VIEWPORT_GATE_TITLE_LEAD,
} from "@/lib/site";

/**
 * The small-screen notice. Below 1024px this is the whole site.
 *
 * THREE THINGS: an icon, a line, and a line under it. Somebody who cannot use
 * the site does not want a paragraph about why.
 *
 * DESKTOP IS UNTOUCHED, and that is the constraint this component is built
 * around rather than a hope. It renders on every viewport, but `.viewport-gate`
 * is `display: none` at rest and only turns on inside a `max-width` query, so
 * above the breakpoint it contributes no box, no stacking context and no
 * layout. The rule that hides the rest of the page lives in the same query.
 * Nothing here can reach a wide screen.
 *
 * NO JAVASCRIPT, and no media query in React. A `useMediaQuery` branch would
 * have to guess on the server, and whichever way it guessed would be wrong for
 * half the visitors: guess narrow and every desktop ships the notice as its
 * first paint, guess wide and every phone ships the whole homepage before
 * replacing it. CSS answers the question at parse time, before the first frame,
 * and it answers it correctly for both.
 *
 * `display: none` rather than an overlay, for the page behind. A fixed pane over
 * a hidden-but-present document leaves the entire site in the accessibility
 * tree, so a screen reader on a phone would read a homepage that is not on
 * screen, underneath a message saying it is not available. Taken out of the box
 * tree it is out of that tree too.
 *
 * Deliberately not dismissible and deliberately not a conversion surface. See
 * the note above the copy in @/lib/site, and docs/DECISIONS.md 009.
 */
export function ViewportGate() {
  return (
    <div className="viewport-gate" role="status">
      <div className="viewport-gate-inner">
        {/* The house surface at tile size: hairline, specular, lit fill. The
            expand glyph is the only one in the set that says "this wants to be
            bigger", which is the whole message in one mark. */}
        <span className="viewport-gate-tile surface surface-lit" aria-hidden="true">
          <IconExpand width={22} height={22} className="text-accent-2" />
        </span>

        <h1 className="mt-[var(--ds-space-7)] text-display font-medium tracking-[var(--section-tracking)] text-balance text-fg">
          {VIEWPORT_GATE_TITLE_LEAD} <AccentWord>{VIEWPORT_GATE_TITLE_BEAT}</AccentWord>
        </h1>

        <p className="mt-[var(--ds-space-5)] text-base leading-[1.7] text-pretty text-fg-3">
          {VIEWPORT_GATE_BODY}
        </p>
      </div>
    </div>
  );
}
