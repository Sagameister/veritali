"use client";

// Cinematic image reveal (CLAUDE.md §5B).
// Simply put: the photo starts as if you're looking at it through a small
// centered window (clipped 20% on every side). On scroll-into-view, the
// window opens outward over 1.4s — like window shutters swinging open —
// until the full photo fills its frame.

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface ClipPathProps {
  src: string;
  alt: string;
  aspectRatioClassName?: string; // e.g. "aspect-[3/4]" or "aspect-video"
}

export default function ClipPathReveal({
  src,
  alt,
  aspectRatioClassName = "aspect-[3/4]",
}: ClipPathProps) {
  const prefersReduced = usePrefersReducedMotion();
  // triggerOnce — the shutters open once, then the layout stays stable.
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-20% 0px" });

  // Accessibility bypass: show the plain image, no clips or scaling.
  if (prefersReduced) {
    return (
      <div className={`overflow-hidden w-full bg-brand-surface relative ${aspectRatioClassName}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover pointer-events-none select-none absolute inset-0"
        />
      </div>
    );
  }

  const clipVariants = {
    hidden: {
      clipPath: "inset(20% 20% 20% 20% round 4px)", // cropped center state
      scale: 1.1,
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0% round 0px)", // fully open
      scale: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }, // cinematic pace
    },
  };

  return (
    <div ref={ref} className="overflow-hidden w-full bg-brand-surface">
      <motion.div
        variants={clipVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`w-full h-full relative ${aspectRatioClassName}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      </motion.div>
    </div>
  );
}
