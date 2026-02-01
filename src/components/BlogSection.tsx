"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt: string;
  };
  author: {
    name: string;
  };
  publishedAt: string;
  category: string;
}

interface BlogSectionProps {
  readonly articles: Article[];
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  environnement: { label: "Environnement", color: "bg-green-100 text-green-700" },
  education: { label: "Éducation", color: "bg-blue-100 text-blue-700" },
  sante: { label: "Santé", color: "bg-red-100 text-red-700" },
  agriculture: { label: "Agriculture", color: "bg-amber-100 text-amber-700" },
  actualites: { label: "Actualités", color: "bg-purple-100 text-purple-700" },
  evenements: { label: "Événements", color: "bg-pink-100 text-pink-700" },
};

export default function BlogSection({ articles }: BlogSectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-green-600 font-semibold tracking-wider text-sm uppercase">
            Notre Blog
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-2 text-slate-900">
            Actualités et Articles
          </h2>
          <p className="mt-4 text-slate-600">
            Découvrez nos dernières initiatives, événements et réflexions sur le développement durable au Tchad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.slice(0, 3).map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100"
            >
              <Link href={`/blog/${article.slug}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.featuredImage?.url || "/logo.jpg"}
                    alt={article.featuredImage?.alt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      categoryConfig[article.category]?.color || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {categoryConfig[article.category]?.label || article.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {article.author?.name || "Green-Chad"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
          >
            Voir tous les articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
