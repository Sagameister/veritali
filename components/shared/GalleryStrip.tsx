"use client";

// Object photo gallery: horizontal scroll-lock strip + lightbox.
//
// DESKTOP: when the gallery reaches the top of the screen, GSAP "pins" it
// and converts vertical scrolling into a sideways sweep through the photos.
// A round "SCROLL" badge glides after the cursor as a hint.
// Each photo carries a ROOM LABEL badge (bottom-right, dark panel) —
// the label data lives in data/content.ts and will come from the CMS later.
// MOBILE: a simple vertical stack.
// CLICK any photo → LIGHTBOX. Next/prev uses a zoom-crossfade:
// the outgoing photo shrinks and fades away while the incoming one
// grows from slightly small up to full size — both at the same time.

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import type { GalleryImage, Language } from "../../types";
import { DEFAULT_LANGUAGE } from "../../data/content";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

// Room label badge — dark brand panel, light text (CMS-driven later).
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
  const containerRef = useRef<HTMLDivElement>(null); // pinned section
  const scrollRef = useRef<HTMLDivElement>(null); // sliding row
  const prefersReduced = usePrefersReducedMotion();

  // Which photo the lightbox shows (null = closed).
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* ---- "Scroll" cursor badge (desktop) ---- */
  const [cursorVisible, setCursorVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const badgeX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.4 });
  const badgeY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  /* ---- Horizontal scroll-lock (desktop only) ---- */
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.innerWidth < 768;
      if (reduced || isMobile || !scrollRef.current) return;

      const totalScrollWidth = scrollRef.current.scrollWidth;
      const windowWidth = window.innerWidth;

      gsap.to(scrollRef.current, {
        x: () => -(totalScrollWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth - windowWidth}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  /* ---- Lightbox keyboard controls + scroll lock ---- */
  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + images.length) % images.length));
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
              // e.detail > 0 = real mouse/touch click → drop focus so no
              // outline lingers. Keyboard "clicks" (Enter/Space) have
              // detail 0 and KEEP focus, so keyboard users don't lose
              // their place (WCAG 2.4.7).
              if (e.detail > 0) e.currentTarget.blur();
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

      {/* ---- DESKTOP: pinned horizontal strip ---- */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
        className="hidden md:block relative w-full h-screen overflow-hidden bg-brand-bg cursor-none"
      >
        <div ref={scrollRef} className="flex h-full w-max items-center gap-8 pl-12 pr-48">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                // Mouse/touch clicks (detail > 0) blur → no lingering line.
                // Keyboard activations keep focus (WCAG 2.4.7).
                if (e.detail > 0) e.currentTarget.blur();
                setLightbox(idx);
              }}
              className="group relative h-[72vh] flex-shrink-0 cursor-none overflow-hidden focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
              aria-label={`${alt} — ${img.label[lang]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={`${alt} — ${img.label[lang]}`}
                className="h-full w-auto object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
              />
              {/* Photo counter (bottom-left) + room label (bottom-right) */}
              <span className="absolute bottom-4 left-4 font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-text/70">
                0{idx + 1} / 0{images.length}
              </span>
              <RoomBadge label={img.label[lang]} />
            </button>
          ))}
        </div>
      </div>

      {/* ---- "SCROLL" cursor badge ---- */}
      <AnimatePresence>
        {cursorVisible && lightbox === null && !prefersReduced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ x: badgeX, y: badgeY }}
            className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
            aria-hidden="true"
          >
            <div className="-translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center">
              <span className="font-sans font-medium text-[10px] uppercase tracking-[0.18em] text-brand-bg">
                Scroll
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            {/* Photo stage. Images are absolutely stacked so the outgoing
                and incoming photo overlap during the zoom-crossfade:
                  leaving  → shrinks to 88% while fading out
                  entering → grows from 88% up to 100% while fading in
                Both run simultaneously on the soft-deceleration curve.

                SWIPE: the photo is horizontally draggable (touch or mouse).
                A swipe past ~80px — or a quick flick — advances to the
                next/previous photo; a small drag just springs back. */}
            <div className="absolute inset-0 flex items-center justify-center p-8 md:p-20 overflow-hidden">
              <AnimatePresence initial={false}>
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
                    const swipedLeft = info.offset.x < -80 || info.velocity.x < -500;
                    const swipedRight = info.offset.x > 80 || info.velocity.x > 500;
                    if (swipedLeft) {
                      setLightbox((lightbox + 1) % images.length);
                    } else if (swipedRight) {
                      setLightbox((lightbox - 1 + images.length) % images.length);
                    }
                  }}
                  initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.65, ease: EASE }}
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
