import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LOG_IN_HREF, LOG_IN_LABEL, NAV_ITEMS } from "@/lib/site";
import { BrandLink } from "./brand-link";
import { SignUpCta } from "./signup-cta";
import { TickerStrip } from "./ticker-strip";

/**
 * The persistent site header: doc 03 §3 H0, plus the market strip beneath it.
 *
 * Two pieces, and only one of them sticks. The nav is a floating pane inset
 * from the page edges and capped at the measure; the strip runs full bleed
 * underneath it and scrolls away like any other content, passing under the pane
 * on its way out.
 *
 * They are siblings rather than nest, and that is load-bearing: `position:
 * sticky` is confined to its own containing block, so a nav inside a <header>
 * that also held the strip would come unstuck the moment that header's bottom
 * edge left the viewport. Sticking to the whole page means being a child of the
 * page.
 *
 * Register: instrument. Hairline borders, one glass tier, no display type. The
 * strip is the only thing here carrying figures and they are tabular.
 *
 * THE HOVER, which is the whole gesture (see the Raycast reference the design
 * cites): pointing at the nav dims every label one step and the pointed-at one
 * goes to full white. It is one CSS custom property, set on the list and read
 * by every item, rather than a state hook and four class swaps:
 *
 *   list          --nav-ink: text/secondary, and on hover text/tertiary
 *   item          colour: var(--nav-ink)
 *   item:hover    colour: text/primary, which outranks the variable
 *
 * All three steps are real tokens and the dim step stops at text/tertiary
 * rather than text/disabled: the unhovered labels are still being read, and a
 * transient hover is no reason to drop them below a legible contrast.
 *
 * Nothing here opens. Doc 03 §3 H0 specifies a Product dropdown over the Edge
 * overview and the four tool pages; the panel is not designed yet, so the item
 * ships flat. See the note on NAV_ITEMS in @/lib/site.
 */
export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-50">
      {/* The pane sits above the strip so the alpha notice, which hangs below
          the CTA, floats over it rather than being painted on by it. The
          bottom padding is space/7 rather than space/4 for the same reason:
          the notice needs a band of ground to land in. */}
      <div className="relative z-10 px-[var(--content-gutter)] pt-[var(--ds-space-4)] pb-[var(--ds-space-7)]">
        {/* The pane. bg/elevated behind a chrome-tier blur: enough that the page
            softens as it passes underneath, not so much that it disappears. One
            of the two blurred surfaces doc 04 §5 allows per viewport. */}
        <nav
          aria-label="Primary"
          className="glass mx-auto flex h-14 max-w-content items-center rounded-container border border-line bg-surface shadow-chrome backdrop-blur-chrome"
        >
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-[var(--ds-space-6)] px-[var(--ds-space-5)]">
            <div className="flex items-center">
              <BrandLink />
            </div>

            <ul className="hidden items-center gap-[var(--ds-space-6)] [--nav-ink:var(--ds-text-secondary)] hover:[--nav-ink:var(--ds-text-tertiary)] md:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-8 items-center rounded-sm text-base text-[color:var(--nav-ink)] transition-[color] duration-[var(--motion-chrome)] ease-house hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-[var(--ds-space-3)]">
              <Button href={LOG_IN_HREF} variant="tertiary">
                {LOG_IN_LABEL}
              </Button>
              <SignUpCta />
            </div>
          </div>
        </nav>
      </div>

      </header>

      <TickerStrip />
    </>
  );
}
