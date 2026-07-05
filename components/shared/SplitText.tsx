"use client";

// Word-by-word headline reveal (CLAUDE.md §5A).
// How it works, simply: each word sits inside a little "window" (a span with
// overflow-hidden). The word starts BELOW the window (y: 110%) so you can't
// see it. On scroll-into-view, each word slides up into its window, one after
// another (the stagger), like blinds opening.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  delay?: number; // wait before the cascade starts (for composite headlines)
}

export default function SplitText({
  text,
  className = "",
  staggerDelay = 0.08, // delicate wave cascade between words
  delay = 0,
}: SplitTextProps) {
  const words = text.split(" ");
  const prefersReduced = usePrefersReducedMotion();

  // triggerOnce: true — animate exactly once, never re-run on scroll (Rule).
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-15% 0px" });

  // Accessibility bypass: render plain, static text with zero motion.
  if (prefersReduced) {
    return <span className={`inline-block ${className}`}>{text}</span>;
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 }, // hidden below its window
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] }, // soft deceleration
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block flex-wrap overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em] -my-[0.1em]"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block origin-bottom font-medium"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
