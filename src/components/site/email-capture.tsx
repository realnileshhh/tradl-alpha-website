import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EMAIL_LABEL, EMAIL_PLACEHOLDER, SIGN_UP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The single-field start, doc 03 §8 step 1.
 *
 * One component, used by the hero and by the close, so the two are the same
 * control rather than two rows that drift apart. It submits as a plain GET to
 * /start, which means the address a visitor typed arrives with them and the row
 * works with JavaScript switched off.
 *
 * Both controls take the pill so the field and its button read as one object.
 * The field takes the `raised` tone and a border/medium stroke, neither of which
 * is the ported default: the design system's field is darker than its ground,
 * which on this near-black page leaves a control indistinguishable from the
 * page, and Figma paints the border with a gradient variable the MCP cannot
 * read, so the measured value is transparent.
 */
export function EmailCapture({
  label,
  className,
}: {
  /** The button's words. The hero and the close use the same locked CTA. */
  label: string;
  className?: string;
}) {
  return (
    <form
      action={SIGN_UP_HREF}
      method="get"
      className={cn(
        "mx-auto flex w-full max-w-[520px] flex-col gap-[var(--ds-space-3)] sm:flex-row",
        className
      )}
    >
      <Input
        type="email"
        name="email"
        required
        autoComplete="email"
        aria-label={EMAIL_LABEL}
        placeholder={EMAIL_PLACEHOLDER}
        shape="pill"
        tone="raised"
        containerClassName="h-11 flex-1 px-[var(--ds-space-5)] py-0 text-left [border-color:var(--ds-border-medium)]"
      />
      <Button type="submit" size="lg" shape="pill" className="sm:w-auto">
        {label}
      </Button>
    </form>
  );
}
