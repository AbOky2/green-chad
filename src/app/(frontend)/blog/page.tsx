import { Metadata } from "next";
import { Suspense } from "react";
import BlogFilter from "@/components/BlogFilter";
import BlogSkeleton from "@/components/BlogSkeleton";
import AsyncArticleList from "@/components/AsyncArticleList";

export const metadata: Metadata = {
  title: "Blog - ONG Green-Chad",
  description: "Actualités, articles et événements de l'ONG Green-Chad pour le développement durable au Tchad.",
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category || "all";

  // Create a logical key for Suspense based on params to trigger re-render and skeleton
  const suspenseKey = `blog-list-${category}-${page}`;

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
        <BlogFilter />

        <Suspense key={suspenseKey} fallback={<BlogSkeleton count={9} />}>
          <AsyncArticleList page={page} category={category} />
        </Suspense>
      </div>
    </div>
  );
}
