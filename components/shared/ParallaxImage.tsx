"use client";

// Full-width parallax image band.
// How it works, simply: the photo is taller than its window (130%).
// As you scroll the page, the photo drifts vertically inside the window
// at a slightly different speed than the page itself — so it feels like
// looking through a window at something farther away. Vertical only,
// tied 1:1 to scroll, and static for reduced-motion users.

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

export default function ParallaxImage({
  src,
  alt,
  caption,
  heightClassName = "h-[55vh] md:h-[75vh]",
}: {
  src: string;
  alt: string;
  caption?: string;
  heightClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // 0 → 1 while the band travels through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The oversized photo slides from -12% to +12% inside its window.
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <figure ref={ref} className="w-full my-4">
      <div className={`relative w-full overflow-hidden ${heightClassName}`}>
        {prefersReduced ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <motion.img
            src={src}
            alt={alt}
            style={{ y }}
            className="absolute left-0 top-[-15%] w-full h-[130%] object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="px-6 md:px-12 mt-3 font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
