/**
 * The market strip under the nav.
 *
 * Instrument register, and the densest thing on the page on purpose: this is
 * the product leaking out. Symbols are labels, figures are tabular, direction
 * is carried by the accent and negative tokens rather than by a word.
 *
 * THE FIGURES ARE ILLUSTRATIVE. They are the prototype's placeholder set
 * (reference/canvas/Tradl Home Proto v2), kept in their brace notation, which
 * is now the only thing on screen saying so: the "ILLUSTRATIVE PRICES" cell was
 * removed on request, 30 Aug 2026.
 *
 * That leaves an open item rather than a solved one. Doc 01 §8 wants attribution
 * on every data-bearing module, and this module currently carries none. The
 * braces are a convention a designer reads and a visitor does not. When the feed
 * lands the strip needs its CMOTS, NSE and BSE line, and until then the honest
 * placement for the disclosure is the footer, which is not built yet.
 *
 * The loop is CSS, not JavaScript. The list is rendered twice and the track
 * travels exactly half its own width, so the seam falls on an identical frame.
 * Nothing here hydrates and nothing here measures, which is what keeps a strip
 * that never stops moving off the LCP path in doc 04 §5.
 *
 * It carries no fill of its own. On a near-black ground a translucent black
 * slab is invisible and a translucent white one competes with the nav pane
 * above it, which is the surface that is supposed to be lifted. Two hairlines
 * on the ground read as a rule ruled across the page, which is what this is.
 *
 * Reduced motion, doc 04 §5: the global rule collapses the animation to a
 * single 0.01ms pass, which parks the track at -50 per cent. That is the start
 * of the second copy, which is the frame the strip starts on, so a reduced
 * motion visitor gets the same complete strip standing still. Pointing at it
 * pauses it for everyone else, because a moving number is one you cannot read.
 */
import { cn } from "@/lib/utils";

type Direction = "up" | "down";

type Quote = {
  symbol: string;
  /** Braced on purpose. The notation is the prototype's placeholder marker. */
  price: string;
  change: string;
  direction: Direction;
};

const QUOTES: Quote[] = [
  { symbol: "NIFTY 50", price: "{24,812}", change: "+0.6%", direction: "up" },
  { symbol: "BANKNIFTY", price: "{51,240}", change: "+0.4%", direction: "up" },
  { symbol: "SENSEX", price: "{81,655}", change: "+0.5%", direction: "up" },
  { symbol: "RELIANCE", price: "{2,981}", change: "+1.2%", direction: "up" },
  { symbol: "HDFCBANK", price: "{1,714}", change: "-0.3%", direction: "down" },
  { symbol: "TCS", price: "{4,102}", change: "+0.8%", direction: "up" },
  { symbol: "INFY", price: "{1,866}", change: "-0.2%", direction: "down" },
  { symbol: "INDIA VIX", price: "{13.4}", change: "-2.1%", direction: "down" },
];

const CELL =
  "flex shrink-0 items-center gap-[var(--ds-space-3)] border-r border-line px-[var(--ds-space-6)]";

/* Geometric triangles, not emoji. Doc 01 §7 bans emoji anywhere; these are
   glyphs from the same family as the ◈ mark the brief uses for derived content. */
const MARK: Record<Direction, string> = { up: "▲", down: "▼" };

function Quotes({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex" aria-hidden={ariaHidden || undefined}>
      {QUOTES.map((quote) => (
        <div key={quote.symbol} className={CELL}>
          <span className="text-xs tracking-[0.06em] text-fg-3">{quote.symbol}</span>
          <span className="num text-sm text-fg">{quote.price}</span>
          <span
            className={cn(
              "num text-xs",
              quote.direction === "up" ? "text-accent-2" : "text-negative"
            )}
          >
            {MARK[quote.direction]} {quote.change}
          </span>
        </div>
      ))}
    </div>
  );
}

export function TickerStrip() {
  return (
    <div
      className="mask-fade-x overflow-hidden border-y border-line py-[var(--ds-space-3)]"
      role="region"
      aria-label="Illustrative market snapshot"
    >
      <div className="ticker-track flex w-max">
        <Quotes />
        {/* The second pass exists to make the seam invisible, and says nothing a
            screen reader has not already been given. */}
        <Quotes ariaHidden />
      </div>
    </div>
  );
}
