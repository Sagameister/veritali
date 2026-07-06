"use client";

// The NewsDetail view — editorial split screen with sticky left column.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getNewsArticles } from "../../lib/news";
import type { Language, NewsArticle } from "../../types";
import { t } from "../../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NewsDetail({
  article,
  lang,
}: {
  article: NewsArticle;
  lang: Language;
}) {
  const [related, setRelated] = useState<NewsArticle[]>([]);

  useEffect(() => {
    getNewsArticles().then((all) => {
      // Filter out current article and show up to 2 latest ones
      const filtered = all.filter((item) => item.slug !== article.slug).slice(0, 2);
      setRelated(filtered);
    });
  }, [article.slug]);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const paragraphs = t(article.body, lang).split("\n\n");

  return (
    <div className="bg-brand-bg min-h-screen pt-40 pb-20">
      {/* Editorial Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 px-6 md:px-12 pb-28 border-b border-brand-text/10">
        
        {/* LEFT COLUMN: Sticky Date, Title & Back link */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start pr-0 lg:pr-12">
          {/* Back button */}
          <a
            href="/news"
            className="inline-flex items-center gap-2 font-sans font-bold text-fs-label uppercase tracking-[0.18em] text-brand-accent hover:text-brand-orange transition-colors duration-300 mb-8"
          >
            ← {lang === "de" ? "ZURÜCK ZUR ÜBERSICHT" : "BACK TO OVERVIEW"}
          </a>

          {/* Date */}
          <div className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-4">
            {formatDate(article.date)}
          </div>

          {/* Large Sticky Headline */}
          <h1 className="font-display font-medium text-3xl md:text-5xl lg:text-5.5xl leading-tight text-brand-text tracking-tight mb-8">
            {t(article.title, lang)}
          </h1>
        </div>

        {/* RIGHT COLUMN: Cover photo and scrolling text */}
        <div className="lg:col-span-7 lg:col-start-6">
          {/* Cover image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative w-full aspect-[16/10] overflow-hidden bg-brand-surface mb-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.coverImage}
              alt={t(article.title, lang)}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Body paragraphs */}
          <div className="max-w-2xl">
            {paragraphs.map((p, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: idx * 0.08 }}
                className="font-sans font-medium text-fs-body text-brand-text/80 leading-relaxed mb-8 whitespace-pre-line"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* Related News (Footer Section) */}
      {related.length > 0 && (
        <section className="px-6 md:px-12 pt-20 pb-10">
          <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-10">
            {lang === "de" ? "Weitere Artikel" : "More Articles"}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group flex flex-col sm:flex-row gap-6 border-b border-brand-text/10 pb-8 hover:border-brand-orange transition-colors duration-500"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/2] sm:w-48 overflow-hidden bg-brand-surface flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImage}
                    alt={t(item.title, lang)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <span className="font-sans font-medium text-xs uppercase tracking-[0.18em] text-brand-green block mb-2">
                      {formatDate(item.date)}
                    </span>
                    <h3 className="font-display font-medium text-xl text-brand-text transition-colors duration-500 group-hover:text-brand-orange">
                      {t(item.title, lang)}
                    </h3>
                  </div>
                  <span className="font-sans font-bold text-xs uppercase tracking-[0.18em] text-brand-accent mt-4 block">
                    {lang === "de" ? "LESEN →" : "READ →"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
