import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The one word in a headline that carries the brand gradient.
 *
 * Doc 04 §1 lets the statement register be typographic and nothing else, so the
 * emotion in a headline has to come from the type rather than from adjectives
 * the lexicon bans. This is that device, and it is a component so it stays one
 * device: the same gradient, the same fallback, on every title that uses it.
 *
 * Use it once per headline, on the word the sentence lands on. Twice in one
 * line and it stops being emphasis.
 */
export function AccentWord({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("text-brand-gradient", className)}>{children}</span>;
}
