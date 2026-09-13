import { Frame, FrameInner } from "@/components/ui/surface";
import { HERO_MEDIA_PLACEHOLDER } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The hero's right column: the pane the product image lands in.
 *
 * NAMED FOR THE SLOT, NOT THE CONTENTS, and that is the whole design of this
 * file. What goes in here is undecided: an interface still, a rendered device
 * mockup, a short muted loop and a composed marketing shot are all live. A
 * component called HeroScreenshot would have to be renamed the day one of the
 * others won, and every import with it. So the frame is the component and the
 * asset is a fill.
 *
 * WHAT TO DO WHEN THE ASSET ARRIVES. Replace the placeholder span with the
 * image and change nothing else. The frame, the ratio and the column are
 * already right.
 *
 *   - `next/image` with `priority`, explicit `width` and `height`, and
 *     `className="size-full object-cover"`. This pane is above the fold on
 *     every viewport, so it is an LCP candidate: doc 04 §5 wants it painted in
 *     the first frame, never lazy-loaded, and never a WebGL canvas.
 *   - Give it real alt text, from doc 05 §5. Alt text is customer-facing copy
 *     and `npm run check:copy` reads it as such.
 *   - Drop `textured` on <FrameInner> if the scanline reads over the image. It
 *     is there to give an empty panel the character of a screen; a real screen
 *     does not need it.
 *
 * `tight` rather than the demo frame's `bezel`. A bezel is a device housing,
 * which is right for a recording that plays and wrong for a still: the housing
 * would compete with whatever interface chrome the image already has. Tight is
 * 16 outer, 4 gap, 12 inner, concentric by construction (docs/SURFACES.md).
 *
 * 16:10 rather than 16:9. The asset is an application window rather than a
 * video, and the taller box holds the left column's height without stretching
 * the measure of the copy beside it.
 *
 * STATIC ON PURPOSE. No reveal, no parallax, nothing that starts at opacity 0.
 * It shares the fold with the headline, and doc 04 §5 wants the first screen
 * painted as a finished state rather than assembled after hydration.
 */
export function HeroMedia({ className }: { className?: string }) {
  return (
    <Frame size="tight" className={cn("w-full", className)}>
      <FrameInner size="tight" className="relative aspect-[16/10]">
        <span className="absolute inset-0 grid place-items-center px-[var(--ds-space-6)] text-center">
          <span className="text-sm text-fg-3">{HERO_MEDIA_PLACEHOLDER}</span>
        </span>
      </FrameInner>
    </Frame>
  );
}
