import Link from "next/link";
import {
  COMPLIANCE_LINES,
  FOOTER_COLUMNS,
  FOOTER_LEGAL,
  FOOTER_TAGLINE,
  RISK_LINE,
} from "@/lib/site";
import { BrandLink } from "./brand-link";

/**
 * The footer, and the compliance block is the reason it exists in this form.
 *
 * Doc 01 §8 requires the SEBI Research Analyst registration number in the
 * footer sitewide and the data attribution beside it; doc 05 §5.8 gives the
 * wording. The registration number is a braced placeholder, matching the
 * convention the ticker uses for staged figures: it is not known here, and an
 * invented one that looks plausible is the single worst string that could ship
 * on this site.
 *
 * The risk line is the statutory sentence and is flagged in @/lib/site as the
 * one string legal has to confirm before launch rather than after.
 *
 * The logo is the full lockup at footer scale, the same component the nav uses,
 * with the scroll-to-top behaviour switched off: someone who has read to the
 * bottom of the page did not do it by accident, and throwing them back to the
 * top is something that happens to them rather than something they asked for.
 * It stays a link home, which is what it does on every other page.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="px-[var(--content-gutter)] py-[64px]">
        <div className="mx-auto max-w-content">
          <div className="grid gap-[var(--ds-space-7)] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <BrandLink size="lg" scrollToTop={false} />
              <p className="mt-[var(--ds-space-4)] max-w-[30ch] text-sm text-fg-3">
                {FOOTER_TAGLINE}
              </p>
            </div>

            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <p className="text-xs tracking-[0.14em] text-fg-disabled uppercase">
                  {column.heading}
                </p>
                <ul className="mt-[var(--ds-space-4)] flex flex-col gap-[var(--ds-space-3)]">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-fg-2 transition-[color] duration-[var(--motion-chrome)] ease-house hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-[56px] border-t border-line pt-[var(--ds-space-6)]">
            <div className="flex flex-col gap-[var(--ds-space-2)] text-xs leading-[1.7] text-fg-disabled">
              {COMPLIANCE_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="max-w-[92ch]">{RISK_LINE}</p>
            </div>

            <p className="mt-[var(--ds-space-6)] text-xs text-fg-disabled">{FOOTER_LEGAL}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
