"use client";

// Tiny hook that answers one question:
// "Did this visitor tell their operating system they want LESS animation?"
// Every animated component checks this and, if true, skips its transitions.

import { useEffect, useState } from "react";

export default function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    // Keep listening in case the user flips the OS setting mid-visit.
    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReduced(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
