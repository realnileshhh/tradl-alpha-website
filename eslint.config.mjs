import next from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * ESLint was installed but never configured, so `npm run lint` had never worked:
 * `next lint` was removed in Next 16 and parsed as `next <directory>`, failing
 * with "Invalid project directory ... /lint". The `eslint-disable-next-line`
 * comment in the dev reference page was inert for the same reason.
 *
 * This catches a different class of problem from the repo's own checkers.
 * check-copy reads customer-facing strings, check-surfaces reads CSS technique,
 * check-motion compares two files. None of them know about hooks rules, unused
 * bindings, or Next's own image and script correctness.
 *
 * Generated output is excluded. Linting 84 machine-written icon components tells
 * you about the generator, not the code, and the generator is verified by
 * `verify-icons` instead.
 */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      // Not in the repository: confidential source material and prior
      // artefacts, gitignored and present only on a local checkout. Linting
      // someone else's prototypes reports on them, not on this codebase.
      "docs/00-brief/**",
      "docs/01-inspiration/**",
      "docs/02-product-context/**",
      "reference/**",
      // Generated from Figma. Fix the generator, not its output.
      "src/components/ui/icons/**",
      "src/components/ui/brand/**",
      "src/design-system/tokens/**",
      "src/design-system/_figma-export/**",
    ],
  },
  ...next,
  ...nextTypescript,
];

export default config;
