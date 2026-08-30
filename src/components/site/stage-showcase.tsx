import { SHOWCASE_PLACEHOLDER_NOTE, SHOWCASE_STAGES } from "@/lib/site";

/**
 * The lifecycle band, doc 03 §3 H5: Discover, Analyse, Act, one panel each.
 *
 * Pointing at a panel widens it, dims the other two and brings up a second line
 * of copy inside it. Nothing here is clickable, and that is a decision rather
 * than an omission: the panels describe how the product is used, and the thing
 * a visitor should click is the toolkit underneath, where every tool has a name
 * and a state. A panel that looked like a link and went nowhere would be worse
 * than one that plainly does not.
 *
 * Because there is nothing to click there is also nothing to hydrate: the whole
 * interaction is `:has()` in globals.css, so this stays a server component and
 * ships no JavaScript. The full reasoning, including why `flex-grow` is the one
 * animated layout property on the site, is in the STAGE SHOWCASE block there.
 *
 * The media wells are a fixed height rather than an aspect ratio. On an aspect
 * ratio the panel that widens also gets taller, so the row's height changes as
 * the pointer moves across it and the text below jumps; a fixed height means
 * widening is the only thing that happens. Each says what it will hold rather
 * than sitting blank.
 */
export function StageShowcase() {
  return (
    <div className="px-[var(--content-gutter)]">
      <div className="stage-panels mx-auto flex max-w-content flex-col gap-[var(--ds-space-5)] lg:flex-row">
        {SHOWCASE_STAGES.map((stage) => (
          <article
            key={stage.index}
            className="stage-panel glass surface-lit flex min-w-0 flex-col rounded-container border border-line p-[var(--ds-padding-card-lg)] shadow-card backdrop-blur-panel"
          >
            {/* The number is set at the title's size and left dim, so the pair
                reads as one line of type with two weights of attention rather
                than as a label above a heading. */}
            <p className="flex items-baseline gap-[var(--ds-space-4)]">
              <span className="num text-display font-medium tracking-[var(--section-tracking)] text-fg-disabled">
                {stage.index}
              </span>
              <span className="text-display font-medium tracking-[var(--section-tracking)] text-fg">
                {stage.title}
              </span>
            </p>

            {/* The well. Textured rather than empty, so a large dark rectangle
                reads as a surface waiting for content instead of as a hole. */}
            <div className="texture-scanline mt-[var(--ds-space-6)] grid h-[240px] place-items-center rounded-md border border-line bg-elevated">
              <div className="text-center">
                <p className="text-xs tracking-[0.12em] text-fg-3 uppercase">{stage.placeholder}</p>
                <p className="mt-[var(--ds-space-2)] text-sm text-fg-disabled">
                  {SHOWCASE_PLACEHOLDER_NOTE}
                </p>
              </div>
            </div>

            <div className="mt-[var(--ds-space-6)]">
              <p className="text-base font-medium text-fg">{stage.headline}</p>
              <p className="mt-[var(--ds-space-3)] text-sm leading-[1.65] text-fg-2">{stage.dek}</p>
              {/* Always in the DOM and always taking its space, so widening a
                  panel never changes the row's height. Only its opacity moves. */}
              <p className="stage-panel-more mt-[var(--ds-space-4)] text-sm leading-[1.65] text-fg-3">
                {stage.more}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
