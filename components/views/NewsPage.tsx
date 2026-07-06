"use client";

// The NewsPage view — overview listing of all company news.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getNewsArticles } from "../../lib/news";
import type { Language, NewsArticle } from "../../types";
import { t } from "../../data/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NewsPage({ lang }: { lang: Language }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewsArticles().then((res) => {
      setArticles(res);
      setLoading(false);
    });
  }, []);

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

  if (loading) {
    return (
      <div className="bg-brand-bg min-h-screen text-brand-text flex items-center justify-center font-sans font-medium text-sm">
        {lang === "de" ? "Wird geladen..." : "Loading..."}
      </div>
    );
  }

  return (
    <section className="bg-brand-bg min-h-screen pt-40 pb-28 px-6 md:px-12">
      {/* Header section */}
      <header className="mb-20 max-w-4xl">
        <p className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-4">
          {lang === "de" ? "Aktuelles" : "News & Insights"}
        </p>
        <h1 className="font-display font-medium text-45xl md:text-fs-display leading-none text-brand-text mb-6">
          {lang === "de" ? "Einblicke & Entwicklungen" : "Insights & Updates"}
        </h1>
        <p className="font-sans font-medium text-fs-body text-brand-text/60 max-w-2xl leading-relaxed">
          {lang === "de"
            ? "Bleiben Sie auf dem Laufenden über Marktentwicklungen, Neuigkeiten unseres Unternehmens und den Fortschritt unserer sozialen Hilfsprojekte im Kongo."
            : "Stay updated on real estate market trends, boutique studio announcements, and structural updates regarding our social school projects in the Congo."}
        </p>
      </header>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {articles.map((article, idx) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: idx * 0.1 }}
            className="group flex flex-col"
          >
            <a href={`/news/${article.slug}`} className="flex flex-col h-full">
              {/* Photo Box */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-brand-surface mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverImage}
                  alt={t(article.title, lang)}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-editorial group-hover:scale-[1.03]"
                />
              </div>

              {/* Date */}
              <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-green mb-3">
                {formatDate(article.date)}
              </span>

              {/* Title */}
              <h2 className="font-display font-medium text-2xl tracking-tight text-brand-text mb-3 transition-colors duration-500 ease-editorial group-hover:text-brand-orange">
                {t(article.title, lang)}
              </h2>

              {/* Excerpt */}
              <p className="font-sans font-medium text-fs-small text-brand-muted leading-relaxed mb-6 flex-grow">
                {t(article.excerpt, lang)}
              </p>

              {/* Read More link */}
              <div className="flex items-center justify-between border-t border-brand-text/10 pt-4 mt-auto">
                <span className="font-sans font-medium text-fs-label uppercase tracking-[0.18em] text-brand-accent group-hover:text-brand-orange transition-colors duration-500 ease-editorial">
                  {lang === "de" ? "WEITERLESEN" : "READ ARTICLE"}
                </span>
                <span className="text-brand-accent group-hover:text-brand-orange transition-transform duration-700 ease-editorial group-hover:translate-x-1.5">
                  →
                </span>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
