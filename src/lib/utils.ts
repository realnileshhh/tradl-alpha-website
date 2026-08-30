/**
 * Join class names, dropping falsy entries.
 *
 * Deliberately not `clsx` + `tailwind-merge`: nothing in the app composes
 * conflicting utilities across component boundaries yet. Add the real
 * pair when a component library exists and actually needs the merge
 * semantics.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
