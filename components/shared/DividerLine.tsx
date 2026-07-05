"use client";

// Animated grid line (design.md "animated-divider").
// A 1px line that "draws" itself into place when scrolled into view —
// horizontally (left to right) or vertically (top to bottom).

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface DividerLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
}

export default function DividerLine({
  orientation = "horizontal",
  className = "",
  delay = 0,
}: DividerLineProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  const isHorizontal = orientation === "horizontal";

  // Static line for reduced-motion users.
  if (prefersReduced) {
    return (
      <div
        className={`${isHorizontal ? "w-full h-px" : "w-px h-full"} bg-brand-text/15 ${className}`}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`${isHorizontal ? "w-full h-px origin-left" : "w-px h-full origin-top"} bg-brand-text/15 ${className}`}
      initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
      animate={
        inView
          ? { scaleX: 1, scaleY: 1 }
          : { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }
      }
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
    />
  );
}
