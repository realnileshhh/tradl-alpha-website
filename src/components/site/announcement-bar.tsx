import { IconArrowPointRight } from "@/components/ui/icons";
import { ANNOUNCEMENT_HREF, ANNOUNCEMENT_LABEL, ANNOUNCEMENT_TEXT } from "@/lib/site";

/**
 * The company line, above the nav.
 *
 * It scrolls away and does not come back. That is the point: this is news, and
 * news that follows you down a page has become a banner. The sticky header
 * begins below it, so the nav still pins to the top the moment this clears.
 *
 * It is also the only conversion-adjacent bar the brief allows. Doc 03 §1.4
 * bans cookie-banner-style CTA bars, countdown timers and fake scarcity
 * outright; a dated fact with a link to the detail is none of those, and the
 * test is that removing it costs the visitor information rather than pressure.
 *
 * No emoji, per doc 01 §7. The reference carries a party popper; the NEW pill
 * and the accent green say the same thing and survive the linter.
 *
 * THE BACKDROP. public/textures/announcement-sweep.webp, exported 30 Aug 2026
 * from Figma file 5HfrEw7icz4xPStagU1xOi, node 27:1169, in the alpha site file
 * rather than the design system file. It is a marketing asset, not a token, so
 * it lives in public/ and not in the mirror. 1440x73 at the source, 3.4KB as
 * WebP, which is a rounding error against the LCP budget in doc 04 §5.
 *
 * Two layers, and the order is the whole effect:
 *
 *   screen   the sweep against the page ground. Screen keeps whatever is
 *            lighter, so the artwork's near-black field disappears into the
 *            ground and only its light streaks survive. This is why the asset
 *            does not need an alpha channel or a cutout.
 *   color    the brand green over the result. The `color` blend takes hue and
 *            saturation from the wash and luminance from what is underneath, so
 *            the streaks are tinted rather than painted over: their shape and
 *            falloff are still the artwork's, only the colour is ours.
 *
 * `isolate` keeps both blends inside the bar. Without it they would composite
 * against the page behind and the bar would tint whatever it was sitting on.
 * The link is painted after both layers, so the text is never blended.
 */
export function AnnouncementBar() {
  return (
    <div className="relative isolate overflow-hidden border-b border-line bg-ground">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen [background-image:url('/textures/announcement-sweep.webp')]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55 mix-blend-color [background-color:var(--ds-accent-secondary)]"
      />

      <a
        href={ANNOUNCEMENT_HREF}
        className="group relative mx-auto flex min-h-11 max-w-content items-center justify-center gap-[var(--ds-space-4)] px-[var(--content-gutter)] py-[var(--ds-space-3)] text-center"
      >
        <span className="inline-flex h-[18px] shrink-0 items-center rounded-full border px-[var(--ds-space-3)] text-[10px] leading-none tracking-[0.14em] text-accent-2 [border-color:color-mix(in_srgb,var(--ds-accent-secondary)_45%,transparent)]">
          {ANNOUNCEMENT_LABEL}
        </span>

        <span className="text-sm text-fg-2 transition-[color] sm:text-base duration-[var(--motion-chrome)] ease-house group-hover:text-fg">
          {ANNOUNCEMENT_TEXT}
        </span>

        <span
          aria-hidden="true"
          className="grid size-[14px] shrink-0 place-items-center text-accent-2 transition-[translate] duration-[var(--motion-chrome)] ease-house group-hover:translate-x-[var(--ds-space-1)]"
        >
          <IconArrowPointRight />
        </span>
      </a>
    </div>
  );
}
