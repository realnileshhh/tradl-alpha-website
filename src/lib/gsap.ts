/**
 * The one place GSAP plugins and the house ease are registered.
 *
 * `gsap.registerPlugin` is idempotent, but importing ScrollTrigger from
 * scattered modules is how you end up with two plugin instances after a
 * bundler split, and then `ScrollTrigger.getAll()` returns half the
 * triggers. Import gsap and ScrollTrigger from here, never from "gsap"
 * directly.
 *
 * CustomEase is registered so the site's curve is defined once, as control
 * points in the motion vocabulary, and consumed identically by GSAP, Motion
 * and CSS. Without it GSAP would need a named approximation like power3.out
 * beside the exact bezier CSS uses, and the two would be visibly different on
 * a long reveal.
 *
 * Client-only: ScrollTrigger touches `window` at import time.
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { EASE, EASE_PATH } from "@/design-system/extensions/motion";

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

CustomEase.create(EASE, EASE_PATH);

export { gsap, ScrollTrigger, useGSAP };
