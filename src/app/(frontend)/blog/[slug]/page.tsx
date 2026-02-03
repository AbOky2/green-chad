import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getArticle(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/articles?where[slug][equals]=${slug}&where[status][equals]=published`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data.docs?.[0] || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article non trouvé - ONG Green-Chad",
    };
  }

  return {
    title: `${article.title} - ONG Green-Chad`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: article.featuredImage?.url ? [article.featuredImage.url] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-slate-900">
        <Image
          src={article.featuredImage?.url || "/logo.jpg"}
          alt={article.featuredImage?.alt || article.title}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 text-white">
          <div className="container-custom max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm mb-4 hover:text-green-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {/* @ts-ignore */}
                {article.author?.name || "Anonyme"}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-16">
        <div
          className="prose prose-lg prose-slate max-w-none"
        >
          <RichText content={article.content} />
        </div>
      </div>

      <div className="bg-slate-50 py-12">
        <div className="container-custom max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Vous souhaitez en savoir plus ?</h3>
          <p className="text-slate-600 mb-6">
            Contactez-nous pour découvrir comment vous pouvez soutenir nos actions.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
