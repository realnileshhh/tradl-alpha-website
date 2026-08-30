import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * A product window lifted onto the page: the frame the Playground and the
 * product demos sit inside.
 *
 * NOT from Figma. The design system draws what goes *in* a window, not the
 * window chrome for a marketing page, so this is built from the surface
 * language. See docs/SURFACES.md.
 *
 * The elevation stack is the whole trick, and all three layers are doing work:
 *
 *   drop-wide     lifts it off the page
 *   ring-contact  a 0.5px black hairline OUTSIDE the stroke. This is what
 *                 actually separates the pane from a busy backdrop; without it
 *                 the edge dissolves into whatever is behind
 *   spec-high     a bright 0.5px inner top edge. This is what reads as glass
 *
 * The stroke is grey at 20 per cent rather than white. A white stroke reads as
 * a highlight; a desaturated one reads as the edge of a pane, and it is the
 * detail most often missed when this look is copied.
 */

export function Window({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative grid overflow-hidden rounded-base",
        "grid-rows-[auto_1fr_auto]",
        "bg-elevated shadow-window backdrop-blur-window",
        "border [border-color:var(--ds-color-grey-750-20)]",
        // Its own compositing layer, or Safari drops the backdrop-filter and
        // Chrome smears it during scroll.
        "[transform:translate(0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** The title strip. 56px in the design system's window proportions. */
export function WindowHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center gap-[var(--ds-space-3)] px-[var(--ds-padding-nav)]",
        "border-b [border-color:var(--ds-color-grey-750-20)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** The scrolling body. Textured so a large dark area does not read as empty. */
export function WindowBody({
  textured = true,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { textured?: boolean }) {
  return (
    <div className={cn("min-h-0 overflow-auto", textured && "texture-scanline", className)} {...props}>
      {children}
    </div>
  );
}

/**
 * The action bar along the bottom. Blurred harder than the window itself:
 * nesting a stronger blur inside an already-blurred pane is what makes the bar
 * read as a separate sheet of glass rather than as part of the same one.
 *
 * No fill of its own. The border and the blur do all the work.
 */
export function WindowBar({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-10 shrink-0 items-center gap-[var(--ds-space-3)] px-[var(--ds-padding-nav)]",
        "border-t [border-color:var(--ds-color-grey-750-20)]",
        "backdrop-blur-bar [transform:translate(0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** A short vertical rule between action groups. Not a full-height separator. */
export function WindowSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-3 w-0.5 shrink-0 rounded-full bg-line-2", className)}
      {...props}
    />
  );
}
