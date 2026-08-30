/**
 * Site-wide constants that appear in customer-facing output.
 *
 * Everything here is bound by the lexicon rules in doc 01 §7 and the SEBI
 * Research Analyst perimeter in §8, exactly as page copy is: a meta description
 * and a share-card title are read by people, and the RA perimeter does not care
 * that a string lives in a <head>.
 *
 * The strings below are taken VERBATIM from the copy library in
 * docs/00-brief/05-claude-design-handover.md §5, which is linter-clean by
 * construction. They are not paraphrased and not composed into new sentences,
 * because a locked string edited slightly is no longer a locked string.
 *
 * Deliberately NOT sourced from reference/canvas/Website Copy.dc.html. That deck
 * is later thinking but it is unresolved against the brief on ten points and it
 * violates the em-dash ban throughout. See the open rulings noted in
 * docs/DECISIONS.md.
 */

/** Doc 01 §4: "Tradl AI" in full on first mention, "Tradl" thereafter. */
export const SITE_NAME = "Tradl AI";

/** Doc 01 §2, the category we say publicly at alpha. */
export const SITE_CATEGORY = "Agentic trading intelligence";

/**
 * Doc 05 §5.1, the hero dek, verbatim. 125 characters, inside the ~160 a search
 * result will render.
 *
 * A longer, more SEO-shaped description mentioning NSE coverage and India would
 * read better in results, but it would be a new customer-facing string and needs
 * approval rather than invention.
 */
export const SITE_DESCRIPTION =
  "Ask in plain language. Tradl writes the analysis as code, runs it on live market data, and shows you every number it computed.";

/** Doc 01 §10, the permanent doctrine line. Badge-grade, once per page maximum. */
export const DOCTRINE_LINE = "We compute, we don't predict.";

/** Doc 05 §5.1. The alpha campaign line. */
export const LAUNCH_LINE = "Agentic trading starts here.";

/** Indian English, Indian market. Drives og:locale and the manifest language. */
export const SITE_LOCALE = "en_IN";
export const SITE_LANG = "en-IN";
