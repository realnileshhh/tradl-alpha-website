"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { Wordmark } from "@/components/ui/brand/wordmark";
import Image from "next/image";
import { scrollTo } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * The logo, which behaves differently depending on where you already are.
 *
 * On any other page it is an ordinary link home. On the home page the nav's
 * copy takes you to the top instead, because a link home from the home page is
 * a dead control in the most prominent position on the site. The footer's copy
 * opts out of that with `scrollToTop={false}`.
 *
 * It stays an <a href="/"> either way: the href is what a middle click, a
 * "copy link", a crawler and a keyboard user all read, and only the plain
 * left click is intercepted. Modified clicks fall through to the browser, so
 * cmd-click still opens the home page in a new tab from the home page.
 *
 * The move goes through @/lib/scroll rather than window.scrollTo, because Lenis
 * owns the scroll position and a native jump would fight it.
 */
/** The nav size and the footer size. The proportions are the packaged lockup's
    either way: the wordmark is 0.63 of the tile's height. */
const SIZE = {
  sm: { tile: 26, wordmark: "h-[16px]" },
  lg: { tile: 36, wordmark: "h-[22px]" },
} as const;

export function BrandLink({
  size = "sm",
  scrollToTop = true,
}: {
  size?: keyof typeof SIZE;
  /**
   * Whether a click on the home page returns to the top.
   *
   * True for the nav, which is pinned to the top of the screen and is where a
   * visitor looks for that. False for the footer: someone who has scrolled all
   * the way down did not do it by accident, and firing them back to the top is
   * a thing that happens to them rather than something they asked for. The
   * footer mark stays an ordinary link home, which is what it is for on every
   * other page.
   */
  scrollToTop?: boolean;
}) {
  const pathname = usePathname();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!scrollToTop) return;
    if (pathname !== "/") return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    scrollTo(0);
  };

  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex items-center rounded-sm text-fg transition-[opacity] duration-[var(--motion-chrome)] ease-house hover:opacity-70"
    >
      {/* The full logo, composed rather than taken from
          public/brand/tradl-lockup.svg: that file is the light-ground lockup and
          its wordmark ink is #010101, which is invisible here. The tile ships as
          its own asset, the letterforms take currentColor, and the proportions
          are the packaged lockup's own: the wordmark is 0.63 of the tile's
          height and the gap between them is 0.13 of it. */}
      <Image
        src="/brand/tradl-app-mark.svg"
        alt=""
        width={SIZE[size].tile}
        height={SIZE[size].tile}
        priority={size === "sm"}
        style={{ width: SIZE[size].tile, height: SIZE[size].tile }}
        className="rounded-6"
      />
      <Wordmark className={cn("ml-[var(--ds-space-2)] w-auto", SIZE[size].wordmark)} />
    </Link>
  );
}
