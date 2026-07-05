"use client";

// Scroll-driven text highlight.
// How it works, simply: every word starts dim (15% opacity). As the
// paragraph moves up through the viewport, your scroll position acts
// like a reading cursor — each word brightens to full opacity in
// sequence, left to right, line by line. Scrolling back dims them again
// (the effect is tied 1:1 to scroll, like a scrubber, not a one-shot).
//
// Opacity only, zero movement — the layout stays physically stable.

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

// One word whose opacity is driven by the overall scroll progress.
// (Each word needs its own tiny component because the opacity mapping
// is a React hook, and hooks can't be called inside a loop directly.)
function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // When scroll progress enters this word's slice of [0..1],
  // its opacity ramps from 0.15 → 1.
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

export default function ScrollHighlightText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const words = text.split(" ");

  // Progress goes 0 → 1 while the paragraph travels between
  // "its top hits 65% of the viewport" and "its bottom hits 35%".
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.35"],
  });

  // Accessibility bypass: fully readable static text, no dimming.
  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((word, idx) => (
        <Word
          key={idx}
          word={word}
          progress={scrollYProgress}
          // Each word owns an equal slice of the scroll progress.
          range={[idx / words.length, (idx + 1) / words.length]}
        />
      ))}
    </span>
  );
}
