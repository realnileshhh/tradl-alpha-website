type ClassValue = string | false | null | undefined;

/**
 * Join class names, dropping falsy entries. Accepts nested arrays so a
 * conditional branch can group several classes without being flattened into an
 * unreadable template string at the call site.
 *
 * Deliberately not `clsx` + `tailwind-merge`: nothing in the app relies on the
 * merge semantics yet, and adding them changes what a later class in the list
 * means. Add the real pair when a component genuinely needs to override a
 * utility passed in from outside.
 */
export function cn(...parts: Array<ClassValue | ClassValue[]>): string {
  return parts.flat().filter(Boolean).join(" ");
}
