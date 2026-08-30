import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Structural surfaces. NOT from Figma: these are marketing-page constructions
 * the design system has no component for, built from the surface language in
 * `src/design-system/extensions/surface.css`.
 *
 * Everything here follows the same four ingredients, in order: blur behind,
 * translucent fill, hairline stroke, top specular. The specular is the one that
 * matters. Omit it and the surface reads flat.
 *
 * See docs/SURFACES.md.
 */

/* -----------------------------------------------------------------------------
   Surface
   -------------------------------------------------------------------------- */

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Adds the hairline-to-visible stroke change on hover. Cards in a grid want this. */
  interactive?: boolean;
  /** Darkens the edges on hover and leaves the centre readable. Needs `interactive`. */
  vignette?: boolean;
  /** The directional two-stop fill. Understated: see the note in surface.css. */
  lit?: boolean;
  /** Blur what is behind. Costs a compositing layer, so keep it to two per viewport. */
  glass?: false | "chrome" | "panel" | "menu" | "window" | "bar";
};

const GLASS: Record<string, string> = {
  chrome: "backdrop-blur-chrome",
  panel: "backdrop-blur-panel",
  menu: "backdrop-blur-menu",
  window: "backdrop-blur-window",
  bar: "backdrop-blur-bar",
};

/**
 * The base pane. Every other surface on the site is a variation on it.
 *
 * Radius defaults to the design system's card radius and is overridable: this
 * class sits in the `components` layer, so any `rounded-*` utility wins.
 */
export function Surface({
  as: As = "div",
  interactive,
  vignette,
  lit,
  glass = false,
  className,
  children,
  ...props
}: SurfaceProps) {
  /* Cast to a concrete intrinsic element. `ElementType` resolves to a union
     whose props narrow to `never`, which is a TypeScript artefact of the
     polymorphic `as` pattern rather than a real constraint. */
  const Component = As as "div";
  return (
    <Component
      className={cn(
        "surface",
        interactive && "surface-interactive",
        vignette && "hover-vignette",
        lit && "surface-lit",
        glass && `glass ${GLASS[glass]}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* -----------------------------------------------------------------------------
   Frame
   -------------------------------------------------------------------------- */

/**
 * A wide translucent frame holding an inner panel. The gap between them is the
 * design, not padding you can tune freely.
 *
 * **The nesting rule: inner radius = outer radius minus padding.** That is what
 * makes the two corner arcs concentric; get it wrong by a pixel and the inner
 * panel looks pasted on. Here: 16 outer, 4 gap, 12 inner.
 *
 * Bloom and specular, deliberately no drop shadow. A frame should read as lit
 * rather than lifted; stacking a strong bloom and a strong drop on the same
 * element is what makes a hero look like a sticker.
 */
/**
 * The two frame sizes, and the pairing is the point: docs/SURFACES.md requires
 * concentric corners, inner radius = outer radius minus padding, and a radius
 * or a padding passed in through className cannot be checked against its
 * partner. Sizing is therefore a prop, and each row below is already concentric.
 *
 *   tight  radius/container 16, padding space/2 4  -> inner radius/base 12
 *   bezel  radius/input 20, padding space/4 12     -> inner radius/md 8
 *
 * `bezel` is the marketing one: a device-style surround for a demo frame, where
 * the border is thick enough to read as a housing rather than as a stroke.
 */
export type FrameSize = "tight" | "bezel";

const FRAME_SIZE: Record<FrameSize, string> = {
  tight: "rounded-container p-[var(--ds-space-2)]",
  bezel: "rounded-input p-[var(--ds-space-4)]",
};

const FRAME_INNER_SIZE: Record<FrameSize, string> = {
  tight: "rounded-base",
  bezel: "rounded-md",
};

export function Frame({
  size = "tight",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: FrameSize }) {
  return (
    <div
      className={cn(
        "relative border border-line",
        FRAME_SIZE[size],
        "bg-elevated shadow-frame backdrop-blur-glass",
        // Own compositing layer. Without it Safari drops the backdrop-filter.
        "[transform:translate(0,0)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** The panel inside a Frame. Halo instead of bloom, and the scanline texture. */
export function FrameInner({
  size = "tight",
  textured = true,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { textured?: boolean; size?: FrameSize }) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-line shadow-inner",
        FRAME_INNER_SIZE[size],
        textured && "texture-scanline",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -----------------------------------------------------------------------------
   Divider
   -------------------------------------------------------------------------- */

/**
 * A rule that dissolves at both ends. Never a plain solid border: a hard line
 * boxes a section in, a fading one reads as the edge of a lit area, which is the
 * same story the specular highlight tells everywhere else.
 *
 * `soft` is the quieter version, for rows inside a list rather than between
 * sections.
 *
 * Applied with border-image, which disables border-radius on the element, so
 * this belongs on straight rules only.
 */
export function Divider({
  soft,
  className,
  ...props
}: HTMLAttributes<HTMLHRElement> & { soft?: boolean }) {
  return (
    <hr
      className={cn(soft ? "divider-fade-soft" : "divider-fade", "border-0", className)}
      {...props}
    />
  );
}

/* -----------------------------------------------------------------------------
   Section
   -------------------------------------------------------------------------- */

/**
 * A page section with the house top edge: a fading rule with light spilling in
 * beneath it. This one recipe carries most of the page's rhythm, which is why
 * it is a component rather than a note in a doc.
 *
 * Set `edge={false}` for the first section on a page, where a top rule would be
 * drawing a line under the nav for no reason.
 */
export function Section({
  edge = true,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { edge?: boolean }) {
  return (
    <section
      className={cn(edge && "divider-fade spill-top", "relative", className)}
      {...props}
    >
      {children}
    </section>
  );
}

/* -----------------------------------------------------------------------------
   Glow
   -------------------------------------------------------------------------- */

/**
 * A blurred layer behind its parent, revealed on hover or focus.
 *
 * Why a sibling rather than a filter on the element: animating `filter` on a
 * large element repaints it every frame. Animating the opacity of a layer that
 * is already blurred does not, so this stays cheap at hero scale.
 *
 * The parent needs `glow-parent` and a stacking context.
 */
export function GlowLayer({
  image,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { image: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("glow-layer", className)}
      style={{ ["--glow-image" as string]: image }}
      {...props}
    />
  );
}

/** Wraps a target and its GlowLayer so the hover and focus selectors resolve. */
export function GlowParent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("glow-parent relative isolate", className)} {...props}>
      {children}
    </div>
  );
}
