import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - ONG Green-Chad",
  description: "Actualités, articles et événements de l'ONG Green-Chad pour le développement durable au Tchad.",
};

const categoryColors: Record<string, string> = {
  environnement: "bg-green-100 text-green-700",
  education: "bg-blue-100 text-blue-700",
  sante: "bg-red-100 text-red-700",
  agriculture: "bg-amber-100 text-amber-700",
  actualites: "bg-purple-100 text-purple-700",
  evenements: "bg-pink-100 text-pink-700",
};

async function getArticles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles?where[status][equals]=published&sort=-publishedAt&limit=100&depth=2`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.docs || [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const articles = await getArticles();

  /* Helper to fix image URLs from Payload */
  const getImageUrl = (media: any) => {
    if (!media?.url) return "/logo.jpg";
    if (media.url.startsWith('/api/media/file')) {
      return media.url.replace('/api/media/file', '/uploads');
    }
    return media.url;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Notre Blog</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Découvrez nos actualités, articles et événements autour du développement durable au Tchad.
          </p>
        </div>
      </div>

      <div className="container-custom py-16">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-600 text-lg">Aucun article publié pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-slate-100"
              >
                <Link href={`/blog/${article.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={getImageUrl(article.featuredImage)}
                      alt={article.featuredImage?.alt || article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category] || "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {/* @ts-ignore */}
                        {article.author?.name || "Anonyme"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}
