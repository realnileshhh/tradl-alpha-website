/**
 * The one place GSAP plugins are registered.
 *
 * `gsap.registerPlugin` is idempotent, but importing ScrollTrigger from
 * scattered modules is how you end up with two plugin instances after a
 * bundler split, and then `ScrollTrigger.getAll()` returns half the
 * triggers. Import gsap and ScrollTrigger from here, never from "gsap"
 * directly.
 *
 * Client-only: ScrollTrigger touches `window` at import time.
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
