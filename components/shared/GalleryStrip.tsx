"use client";

// Object photo gallery: horizontal slider + manual navigation + lightbox.
//
// DESKTOP: a horizontal flex container showing multiple large images at a time.
// Navigation is done via manual left (‹) and right (›) arrows.
// MOBILE: a simple vertical stack.
// CLICK any photo → LIGHTBOX. Next/prev uses a zoom-crossfade.

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage, Language } from "../../types";
import { DEFAULT_LANGUAGE } from "../../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

// Slide transition variants for mobile swiping
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : dir < 0 ? "-100%" : 0,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : dir < 0 ? "100%" : 0,
    opacity: 0,
    scale: 0.95
  })
};

// Zoom-crossfade variants for desktop
const zoomVariants = {
  enter: {
    x: 0,
    opacity: 0,
    scale: 0.88
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: {
    x: 0,
    opacity: 0,
    scale: 0.88
  }
};

// Room label badge — dark brand panel, light text
function RoomBadge({ label }: { label: string }) {
  return (
    <span className="absolute bottom-4 right-4 bg-brand-bg/90 backdrop-blur-sm px-3.5 py-2 font-sans font-medium text-xs text-brand-text pointer-events-none">
      {label}
    </span>
  );
}

export default function GalleryStrip({
  images,
  alt,
  lang = DEFAULT_LANGUAGE,
}: {
  images: GalleryImage[];
  alt: string;
  lang?: Language;
}) {
  const scrollRef = useRef<HTMLDivElement>(null); // sliding row
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track if we can scroll left/right to show/hide arrows
  const [scrollState, setScrollState] = useState({ isStart: true, isEnd: false });

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollState({
        isStart: scrollLeft <= 15,
        isEnd: scrollLeft + clientWidth >= scrollWidth - 15,
      });
    }
  };

  // Run scroll state check on mount and window resize
  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Scroll by 600px smoothly
      const offset = direction === "left" ? -600 : 600;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  /* ---- Lightbox keyboard controls + scroll lock ---- */
  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") {
        setDirection(1);
        setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      }
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
      }
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, images.length]);

  return (
    <>
      {/* ---- MOBILE: simple vertical stack ---- */}
      <div className="md:hidden flex flex-col gap-4 px-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              if (e.detail > 0) e.currentTarget.blur();
              setDirection(0);
              setLightbox(idx);
            }}
            className="relative block w-full focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={`${alt} — ${img.label[lang]}`}
              className="w-full aspect-[4/3] object-cover"
            />
            <RoomBadge label={img.label[lang]} />
          </button>
        ))}
      </div>

      {/* ---- DESKTOP: horizontal slider with manual navigation ---- */}
      <div className="hidden md:block relative w-full px-6 md:px-12 py-12 bg-brand-bg group/gallery select-none">
        {/* Left Arrow */}
        {!scrollState.isStart && (
          <button
            onClick={() => scroll("left")}
            aria-label="Zurück scrollen"
            className="absolute left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-accent/55 bg-brand-bg/90 backdrop-blur-md flex items-center justify-center text-brand-accent hover:border-brand-orange hover:text-brand-orange transition-colors duration-300 shadow-xl cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {/* Slider container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                if (e.detail > 0) e.currentTarget.blur();
                setDirection(0);
                setLightbox(idx);
              }}
              className="group relative h-[480px] aspect-[3/2] flex-shrink-0 overflow-hidden focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              aria-label={`${alt} — ${img.label[lang]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={`${alt} — ${img.label[lang]}`}
                className="w-full h-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
              />
              {/* Photo counter (bottom-left) + room label (bottom-right) */}
              <span className="absolute bottom-4 left-4 font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/70 bg-brand-bg/50 px-2 py-1 rounded-sm">
                0{idx + 1} / 0{images.length}
              </span>
              <RoomBadge label={img.label[lang]} />
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        {!scrollState.isEnd && (
          <button
            onClick={() => scroll("right")}
            aria-label="Weiter scrollen"
            className="absolute right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-accent/55 bg-brand-bg/90 backdrop-blur-md flex items-center justify-center text-brand-accent hover:border-brand-orange hover:text-brand-orange transition-colors duration-300 shadow-xl cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>

      {/* ---- LIGHTBOX ---- */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-md"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-20 overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={lightbox}
                  src={images[lightbox].src}
                  alt={`${alt} — ${images[lightbox].label[lang]}`}
                  onClick={(e) => e.stopPropagation()}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    const swipedLeft = info.offset.x < -60 || info.velocity.x < -400;
                    const swipedRight = info.offset.x > 60 || info.velocity.x > 400;
                    if (swipedLeft) {
                      setDirection(1);
                      setLightbox((lightbox + 1) % images.length);
                    } else if (swipedRight) {
                      setDirection(-1);
                      setLightbox((lightbox - 1 + images.length) % images.length);
                    }
                  }}
                  custom={direction}
                  variants={isMobile ? slideVariants : zoomVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={
                    isMobile
                      ? {
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.35 }
                        }
                      : { duration: 0.65, ease: EASE }
                  }
                  className="absolute max-h-[82vh] max-w-[88vw] object-contain cursor-grab active:cursor-grabbing touch-none"
                />
              </AnimatePresence>
            </div>

            {/* Room label — bottom right, dark panel */}
            <motion.span
              key={`label-${lightbox}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="absolute bottom-6 right-6 md:bottom-10 md:right-12 bg-brand-surface border border-brand-text/10 px-4 py-2.5 font-sans font-medium text-sm text-brand-text"
            >
              {images[lightbox].label[lang]}
            </motion.span>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              aria-label="Schließen / Close"
              className="absolute top-6 right-6 md:top-8 md:right-12 font-display text-3xl text-brand-text/70 hover:text-brand-orange"
            >
              ×
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDirection(-1);
                setLightbox((lightbox - 1 + images.length) % images.length);
              }}
              aria-label="Zurück / Previous"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 font-display text-4xl text-brand-text/60 hover:text-brand-orange p-4 z-10"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDirection(1);
                setLightbox((lightbox + 1) % images.length);
              }}
              aria-label="Weiter / Next"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 font-display text-4xl text-brand-text/60 hover:text-brand-orange p-4 z-10"
            >
              ›
            </button>

            {/* Counter */}
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/60">
              0{lightbox + 1} / 0{images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
