import dynamic from "next/dynamic";
import { getPayload } from "payload";
import config from "@payload-config";
import Hero from "@/components/Hero";
import BlogSection from "@/components/BlogSection";

const About = dynamic(() => import("@/components/AboutSection"), { loading: () => null });
const Activities = dynamic(() => import("@/components/ActivitiesSection"), { loading: () => null });
const TeamSection = dynamic(() => import("@/components/TeamSection"), { loading: () => null });
const Partners = dynamic(() => import("@/components/PartnersSection"), { loading: () => null });
const Contact = dynamic(() => import("@/components/ContactSection"), { loading: () => null });

export const revalidate = 60;

async function getFeaturedArticles() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "articles",
      where: { status: { equals: "published" } },
      sort: "-publishedAt",
      limit: 3,
      depth: 1,
      draft: false,
    });
    return docs.map((a) => ({
      id: String(a.id),
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || "",
      featuredImage: {
        url: (a.featuredImage && typeof a.featuredImage === "object" && a.featuredImage.url) || "/logo.jpg",
        alt: (a.featuredImage && typeof a.featuredImage === "object" && a.featuredImage.alt) || a.title,
      },
      author: {
        name: (a.author && typeof a.author === "object" && a.author.name) || "Green-Chad",
      },
      publishedAt: a.publishedAt || new Date().toISOString(),
      category: a.category || "actualites",
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const articles = await getFeaturedArticles();

  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Activities />
      <BlogSection articles={articles} />
      <TeamSection />
      <Partners />
      <Contact />
    </div>
  );
}
