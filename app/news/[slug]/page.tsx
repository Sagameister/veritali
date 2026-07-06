"use client";

// Dynamic news detail route: /news/expansion-heidelberg-mannheim etc.

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import type { Language, NewsArticle } from "../../../types";
import { getNewsArticleBySlug } from "../../../lib/news";
import Navigation from "../../../components/layout/Navigation";
import Footer from "../../../components/layout/Footer";
import NewsDetail from "../../../components/views/NewsDetail";

export default function NewsDetailPage() {
  const [lang, setLang] = useState<Language>("de"); // German default
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    if (params.slug) {
      getNewsArticleBySlug(params.slug).then((res) => {
        setArticle(res);
        setLoading(false);
      });
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="bg-brand-bg min-h-screen text-brand-text flex items-center justify-center font-sans font-medium text-sm">
        {lang === "de" ? "Wird geladen..." : "Loading..."}
      </main>
    );
  }

  if (!article) notFound(); // unknown slug → 404 page

  return (
    <main>
      <Navigation lang={lang} onLangChange={setLang} />
      <NewsDetail article={article} lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
