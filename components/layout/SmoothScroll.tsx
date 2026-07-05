"use client";

// Global Lenis smooth-scroll provider (agent.md §4A).
// Think of Lenis as replacing the browser's "instant" scroll with a
// weighted, gliding scroll so the page feels physically grounded.
// It is initialized ONCE here and never again in any component.

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Accessibility: users who prefer reduced motion get native scrolling.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2, // how long the scroll "glide" lasts
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // soft expo ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // 1:1 with user input — no scroll-jacking
    });

    lenisRef.current = lenis;

    // Lenis needs a "heartbeat": every animation frame we tell it the time
    // so it can move the page a tiny bit closer to where you scrolled.
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // clean up when the app unmounts
    };
  }, []);

  return <>{children}</>;
}
