import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { env } from "@/lib/env";
import * as Icons from "@/components/ui/icons";
import { Wordmark } from "@/components/ui/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardBody, CardIcon, CardTitle } from "@/components/ui/card";
import { Badge, StatusPill } from "@/components/ui/badge";
import {
  IconAdjustments,
  IconArrowPointRight,
  IconMorningDecode,
} from "@/components/ui/icons";

/**
 * Design system reference. NOT part of the site. 404s in production, and
 * `rm -rf src/app/dev` removes it whole.
 *
 * It reads tokens.css from disk at build time rather than listing tokens by
 * hand, so it cannot drift from the mirror: regenerate the tokens and this page
 * tells the truth on the next build. A reference page that has to be maintained
 * separately is a reference page that quietly starts lying.
 */

type Token = { name: string; value: string };

function readTokens(): Token[] {
  const css = readFileSync(
    join(process.cwd(), "src/design-system/tokens/tokens.css"),
    "utf8"
  );
  const out: Token[] = [];
  for (const m of css.matchAll(/^\s*(--ds-[\w-]+):\s*([^;]+);/gm)) {
    const [, name, value] = m;
    if (name && value) out.push({ name, value: value.trim() });
  }
  return out;
}

const isColour = (v: string) => /^#|^rgb|^linear-gradient/.test(v);

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-lg font-medium text-fg">{title}</h2>
      {note ? <p className="mt-1 max-w-2xl text-sm text-fg-3">{note}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  if (env.isProduction) notFound();

  const tokens = readTokens();
  const colours = tokens.filter((t) => isColour(t.value));
  const scalars = tokens.filter((t) => !isColour(t.value));
  const iconEntries = Object.entries(Icons).sort(([a], [b]) => a.localeCompare(b));

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-content flex-col gap-12 px-6 py-16">
        <header>
          <p className="text-xs uppercase tracking-widest text-fg-3">Tradl Design System</p>
          <h1 className="mt-2 text-2xl font-medium text-fg">Reference</h1>
          <p className="mt-2 max-w-2xl text-sm text-fg-2">
            Generated from Figma. {tokens.length} mirrored tokens, {iconEntries.length} icons.
            Everything on this page reads the same files the app does, so it cannot drift.
            See docs/DESIGN-SYSTEM.md for the sync procedure and the current gap list.
          </p>
        </header>

        <Section
          title="Registers"
          note="One mode, and it is the design system's own. The two registers differ by scale and density, not by colour: statement is full-bleed and typographic, instrument is dense and numbers-forward."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-md border border-line p-6">
              <p className="text-xs uppercase tracking-widest text-fg-3">Statement</p>
              <p className="mt-3 text-lg text-fg">Agentic trading starts here.</p>
              <p className="mt-2 text-sm text-fg-2">
                Section openers and closes only, and never more than about 30 per cent of a
                page&apos;s scroll length.
              </p>
            </div>
            <div className="rounded-md border border-line bg-surface p-6">
              <p className="text-xs uppercase tracking-widest text-fg-3">Instrument</p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="num text-lg text-fg">3,000</span>
                <span className="num text-sm text-accent-2">+1.9%</span>
                <span className="num text-sm text-negative">-3.2%</span>
              </div>
              <p className="mt-2 text-sm text-fg-2">
                Dense, hairline-bordered, tabular figures. Identical to product surfaces.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Brand">
          <div className="flex flex-wrap items-center gap-10">
            <div className="rounded-md border border-line p-6">
              <Wordmark className="h-8 w-auto text-fg" />
            </div>
            <div className="rounded-md border border-line bg-surface p-6">
              <Wordmark className="h-8 w-auto text-accent-2" />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/tradl-app-mark.svg" alt="Tradl app mark" width={64} height={64} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/tradl-glyph.svg" alt="Tradl glyph" width={38} height={30} />
          </div>
        </Section>

        <Section
          title="Buttons"
          note="Figma nodes 63:201, 357:2566, 359:2583. The sm size is design-system exact at 30px; lg is a marketing extension that meets the 44px touch floor."
        >
          <div className="flex flex-col gap-6">
            {(["sm", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-3">
                <span className="w-8 text-xs text-fg-3">{size}</span>
                <Button size={size} iconStart={<IconArrowPointRight />}>
                  Go to playground
                </Button>
                <Button size={size}>Apply</Button>
                <Button size={size} disabled>
                  Apply
                </Button>
                <Button size={size} variant="secondary" iconStart={<IconAdjustments />}>
                  Insert Text
                </Button>
                <Button size={size} variant="tertiary">
                  Insert Text
                </Button>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Card" note="Figma node 409:1316.">
          <Card className="max-w-[405px]">
            <CardIcon>
              <IconMorningDecode className="size-8 text-fg-3" />
            </CardIcon>
            <CardTitle>Morning Decode</CardTitle>
            <CardBody>
              Six stocks decoded before every open, in text and audio. Yesterday&apos;s calls
              graded in public, misses kept.
            </CardBody>
            <CardAction href="#" icon={<IconArrowPointRight />}>
              Learn how
            </CardAction>
          </Card>
        </Section>

        <Section
          title="Badges and status pills"
          note="Figma node 346:464. The 8px type is the design system's real value. The LIVE and PREVIEW tints are derived at 12 per cent, pending the full Highlights collection."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Beta</Badge>
            <StatusPill status="live" />
            <StatusPill status="preview" />
            <StatusPill status="private" />
          </div>
        </Section>

        <Section title="Colour" note={`${colours.length} colour tokens, read from tokens.css at build time.`}>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {colours.map((t) => (
              <div key={t.name} className="flex items-center gap-3 rounded-sm border border-line p-2">
                <span
                  className="size-8 shrink-0 rounded-sm border border-line"
                  style={
                    t.value.startsWith("linear-gradient")
                      ? { backgroundImage: t.value }
                      : { backgroundColor: t.value }
                  }
                />
                <span className="min-w-0">
                  <span className="block truncate text-xs text-fg">{t.name.replace("--ds-", "")}</span>
                  <span className="num block truncate text-xs text-fg-3">{t.value}</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Scalars" note={`${scalars.length} radii, spacing, type and effect tokens.`}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {scalars.map((t) => (
              <div key={t.name} className="flex justify-between gap-3 border-b border-line py-1">
                <dt className="truncate text-xs text-fg-2">{t.name.replace("--ds-", "")}</dt>
                <dd className="num shrink-0 text-xs text-fg-3">{t.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          title="Type scale"
          note="Inter throughout. The system's bold styles resolve to weight 500; only the display step is 700."
        >
          <div className="flex flex-col gap-4">
            {(
              [
                ["text-xs", "10 / 14"],
                ["text-sm", "12 / 16"],
                ["text-base", "14 / 20"],
                ["text-lg", "18 / 24"],
                ["text-display", "42"],
              ] as const
            ).map(([cls, spec]) => (
              <div key={cls} className="flex items-baseline gap-4 border-b border-line pb-3">
                <span className="w-24 shrink-0 text-xs text-fg-3">{cls}</span>
                <span className="w-16 shrink-0 num text-xs text-fg-3">{spec}</span>
                <span className={`${cls} truncate text-fg`}>We compute, we don&apos;t predict</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Icons"
          note={`${iconEntries.length} components, split from the Icons page export. Monochrome ink is currentColor, so they inherit their context.`}
        >
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {iconEntries.map(([name, Icon]) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-sm border border-line p-3 text-fg-2"
              >
                <Icon className="size-4" />
                <span className="w-full truncate text-center text-xs text-fg-3" title={name}>
                  {name.replace("Icon", "")}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}
