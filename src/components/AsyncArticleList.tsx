
import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import BlogPagination from "./BlogPagination";

const categoryColors: Record<string, string> = {
    environnement: "bg-green-100 text-green-700",
    education: "bg-blue-100 text-blue-700",
    sante: "bg-red-100 text-red-700",
    eauHygieneAssainissement: "bg-amber-100 text-amber-700",
    actualites: "bg-purple-100 text-purple-700",
    evenements: "bg-pink-100 text-pink-700",
    securiteAlimentaire: "bg-yellow-100 text-yellow-700",
    formation: "bg-orange-100 text-orange-700",
    violence: "bg-red-100 text-red-700",
    paix: "bg-green-100 text-green-700",
};

const categoryLabels: Record<string, string> = {
    environnement: "Environnement",
    education: "Éducation",
    sante: "Santé",
    eauHygieneAssainissement: "L'eau, l’hygiène et l'assainissement",
    actualites: "Actualités",
    evenements: "Événements",
    securiteAlimentaire: "Sécurité alimentaire",
    formation: "Formation",
    violence: "Violence (VBG)",
    paix: "Paix",
};

async function getArticles(page: number, category?: string) {
    try {
        const queryParams = new URLSearchParams({
            'sort': '-publishedAt',
            'limit': '9', // 9 items per page
            'page': page.toString(),
            'depth': '2',
            'where[status][equals]': 'published',
        });

        if (category && category !== 'all') {
            queryParams.append('where[category][equals]', category);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles?${queryParams.toString()}`, {
            next: { revalidate: 60 },
            cache: 'no-store' // Ensure dynamic fetching for filters
        });

        if (!res.ok) return { docs: [], totalPages: 1 };
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return { docs: [], totalPages: 1 };
    }
}

interface AsyncArticleListProps {
    page: number;
    category?: string;
}

export default async function AsyncArticleList({ page, category }: AsyncArticleListProps) {
    const data = await getArticles(page, category);
    const articles = data.docs || [];
    const totalPages = data.totalPages || 1;

    if (articles.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-600 text-lg">Aucun article trouvé pour cette sélection.</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {articles.map((article: any) => (
                    <article
                        key={article.id}
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
                                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category] || "bg-slate-100 text-slate-700"
                                        }`}
                                >
                                    {categoryLabels[article.category] || article.category}
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
                                        {article.author?.name || "Green-Chad"}
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

            <BlogPagination currentPage={page} totalPages={totalPages} />
        </>
    );
}
