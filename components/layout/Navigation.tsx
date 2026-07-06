"use client";

// Floating translucent navbar.
// It starts fully transparent over the hero; once you scroll ~40px it gains
// a frosted-glass blur so links stay readable over photos.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, t, DEFAULT_LANGUAGE } from "../../data/content";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import type { Language } from "../../types";

// A link is "active" when the current URL is that page or a subpage of it
// (e.g. /objekte/reiheneckhaus-walldorf keeps "Objekte" active).
function isActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false; // anchor links have no active state
  return pathname === href || pathname.startsWith(href + "/");
}

const EASE = [0.22, 1, 0.36, 1] as const; // the one soft-deceleration curve

interface NavigationProps {
  lang?: Language;
  // Called when the user clicks DE or EN — the page swaps all copy.
  onLangChange?: (lang: Language) => void;
}

// Space-saving dropdown language switcher. Shows active lang; click to open menu.
function LanguageSwitcher({
  lang,
  onLangChange,
}: {
  lang: Language;
  onLangChange?: (lang: Language) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = () => setIsOpen(false);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" aria-label="Sprache / Language">
      <button
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-accent hover:text-brand-orange transition-colors duration-300 cursor-pointer"
      >
        {lang.toUpperCase()}
        <span className="text-[8px] opacity-60 translate-y-[0.5px]">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-24 bg-brand-surface border border-brand-text/10 shadow-2xl z-50 backdrop-blur-md">
          <div className="py-1">
            {(["de", "en"] as Language[])
              .filter((code) => code !== lang)
              .map((code) => (
                <button
                  key={code}
                  onClick={() => {
                    onLangChange?.(code);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2.5 font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-text/70 hover:text-brand-orange hover:bg-brand-bg/50 transition-colors duration-300 cursor-pointer"
                >
                  {code.toUpperCase()}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navigation({
  lang = DEFAULT_LANGUAGE,
  onLangChange,
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false); // has the page moved?
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu state
  const pathname = usePathname(); // current route, for active-link styling
  const prefersReduced = usePrefersReducedMotion(); // fade only, no curtain

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page behind the fullscreen menu while it's open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-editorial ${
        scrolled
          ? "bg-brand-bg/70 backdrop-blur-md border-b border-brand-text/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
        {/* Brand logo (SVG wordmark) */}
        <a href="/" aria-label="Veritali — Startseite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/veritali-logo-white.svg"
            alt="Veritali"
            className="h-7 md:h-9 w-auto"
          />
        </a>

        {/* Desktop links — label style: uppercase, wide tracking, subdued */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={`font-sans font-bold text-fs-label uppercase tracking-[0.18em] hover:text-brand-orange ${
                  isActive(pathname, link.href)
                    ? "text-brand-orange" // active page = the hover terracotta
                    : "text-brand-text/90"
                }`}
              >
                {t(link.label, lang)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: language switcher + CTA pill */}
        <div className="hidden md:flex items-center gap-8">
          <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
          <a
            href="/kontakt"
            className="font-display font-medium text-sm bg-brand-accent border border-brand-accent text-brand-bg px-6 py-2.5 hover:bg-brand-orange hover:border-brand-orange"
          >
            {lang === "de" ? "Gespräch vereinbaren" : "Arrange an inquiry"}
          </a>
        </div>

        {/* Mobile: switcher sits next to the burger */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher lang={lang} onLangChange={onLangChange} />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-brand-text transition-transform duration-500 ease-editorial ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-6 h-px bg-brand-text transition-transform duration-500 ease-editorial ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — FULLSCREEN curtain.
          The solid navy panel unclips from the top like a curtain dropping
          (clip-path inset animation, soft-deceleration curve). Each link
          then rises out of its own overflow mask, staggered — the same
          language as the SplitText headlines. Sits at z-40, below the
          header bar (z-50), so the burger stays visible and morphs to ×. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={prefersReduced ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={prefersReduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: prefersReduced ? 0.3 : 0.7, ease: EASE }}
            className="md:hidden fixed inset-0 z-[-1] h-[100dvh] bg-brand-bg flex flex-col justify-between px-6 pt-28 pb-10"
            style={{ zIndex: -1 }}
          >
            {/* Big menu links, rising one after another */}
            <nav>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={prefersReduced ? {} : { y: "110%" }}
                      animate={prefersReduced ? {} : { y: 0 }}
                      exit={prefersReduced ? {} : { y: "110%", transition: { duration: 0.3, ease: EASE } }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: 0.25 + idx * 0.07, // wait for the curtain, then cascade
                      }}
                      className="flex items-baseline gap-5 py-2"
                    >
                      <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green w-6">
                        0{idx + 1}
                      </span>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive(pathname, link.href) ? "page" : undefined}
                        className={`font-display font-medium text-4xl tracking-tight hover:text-brand-orange ${
                          isActive(pathname, link.href)
                            ? "text-brand-orange"
                            : "text-brand-text"
                        }`}
                      >
                        {t(link.label, lang)}
                      </a>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom: hairline, contact, CTA — fades up last */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              <div className="h-px w-full bg-brand-text/15 mb-8" />
              <a
                href="/kontakt"
                onClick={() => setMenuOpen(false)}
                className="block text-center font-display font-medium text-base bg-brand-accent text-brand-bg px-6 py-4"
              >
                {lang === "de" ? "Gespräch vereinbaren" : "Arrange an inquiry"}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
